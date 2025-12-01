package com.aoi.service;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.aoi.model.AoiData;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

@Service
public class AoiService {
    private AoiData data;

    @PostConstruct
    public void init() {
        try {
            ObjectMapper mapper = new ObjectMapper();
           
            File dataFile = new File("/data/response_1763733965803.json");
            if (dataFile.exists()) {
                data = mapper.readValue(dataFile, AoiData.class);
            } else {
                InputStream inputStream = getClass().getResourceAsStream("/data/response_1763733965803.json");
                data = mapper.readValue(inputStream, AoiData.class);
            }
        } catch (Exception e) {
            e.printStackTrace();
            data = null;
        }
    }

    public Map<String, Object> getHealth() {
        Map<String,Object> result = new LinkedHashMap<>();
        result.put("status", "ok");
        result.put("data_loaded", hasData());
        return result;
    }

    public Map<String, Object> getAggregate() {
        if (!hasData()) return Map.of("error", "no data loaded");
        var aggregate = data.getAggregate();
        var changingIssues = orEmpty(aggregate.getChanging_issues());
        var changingCommits = orEmpty(aggregate.getChanging_commits());
        var impactedIssues = orEmpty(aggregate.getImpacted_issues());
        var impactedCommits = orEmpty(aggregate.getImpacted_commits());

        long mergeCount = changingCommits.stream()
                .filter(c -> Boolean.TRUE.equals(c.getOrDefault("is_merge", false))).count();

        var direct = Map.of(
                "issues_count", changingIssues.size(),
                "commits_count", changingCommits.size(),
                "merge_commits", mergeCount
        );
        var indirect = Map.of(
                "affected_issues", impactedIssues.size(),
                "affected_commits", impactedCommits.size()
        );
        var graph = data.getAoi_graph();

        return Map.of(
                "direct_changes", direct,
                "indirect_impact", indirect,
                "total_nodes", graph.getOrDefault("nodes", new ArrayList<>()) instanceof List ? ((List<?>)graph.get("nodes")).size() : 0,
                "total_edges", graph.getOrDefault("edges", new ArrayList<>()) instanceof List ? ((List<?>)graph.get("edges")).size() : 0
        );
    }

    public Map<String, Object> getCommits(int limit) {
        if (!hasData()) return Map.of("error", "no data loaded");
        var commits = orEmpty(data.getAggregate().getChanging_commits());
        var items = commits.subList(0, Math.min(limit, commits.size()));
        return Map.of(
                "total", commits.size(),
                "items", items,
                "returned", items.size()
        );
    }

    public Map<String, Object> getIssues() {
        if (!hasData()) return Map.of("error", "no data loaded");
        var aggregate = data.getAggregate();
        var changing = orEmpty(aggregate.getChanging_issues());
        var impacted = orEmpty(aggregate.getImpacted_issues());
        return Map.of(
                "changing", changing,
                "impacted", impacted,
                "total_impacted", impacted.size()
        );
    }

    public Map<String, Object> getAffinity(int limit) {
        if (!hasData()) return Map.of("error", "no data loaded");
        
        var graph = data.getAoi_graph();
        var nodes = (List<Map<String, Object>>) graph.get("nodes");
        if (nodes == null) nodes = new ArrayList<>();
        
        Map<String, Integer> affinityCount = new HashMap<>();
        
        try {
            var aggregate = data.getAggregate();
            if (aggregate != null) {
                var affinityMap = aggregate.getAffinity_count();
                if (affinityMap != null) {
                    affinityCount = (Map<String, Integer>) affinityMap;
                }
            }
        } catch (Exception e) {
            System.out.println("Error getting affinity_count: " + e.getMessage());
        }
        
        var enrichedAffinity = affinityCount.entrySet().stream()
            .sorted((a, b) -> b.getValue() - a.getValue())
            .limit(limit)
            .map(entry -> Map.of(
                "element", entry.getKey(),
                "affinity_count", (Object) entry.getValue()
            ))
            .toList();
        
        return Map.of(
            "total_unique_elements", nodes.size(),
            "top_affinity", enrichedAffinity
        );
    }

    public Map<String, Object> getStats() {
        if (!hasData()) return Map.of("error", "no data loaded");
        var aggregate = data.getAggregate();
        var commits = new ArrayList<>(orEmpty(aggregate.getChanging_commits()));
        commits.addAll(orEmpty(aggregate.getImpacted_commits()));
        Map<String, Integer> repos = new LinkedHashMap<>();
        List<String> allDates = new ArrayList<>();

        for (var commit : commits) {
            String repo = (String) commit.getOrDefault("repo_id", "Unknown");
            repos.put(repo, repos.getOrDefault(repo, 0) + 1);

            String date = (String) commit.getOrDefault("date", "");
            if (!date.isEmpty()) {
                allDates.add(date);
            }
        }

        String earliest = allDates.stream().min(String::compareTo).orElse(null);
        String latest = allDates.stream().max(String::compareTo).orElse(null);

        long regularCount = orEmpty(aggregate.getChanging_commits()).stream()
                .filter(c -> !Boolean.TRUE.equals(c.getOrDefault("is_merge", false))).count();
        long mergeCount = orEmpty(aggregate.getChanging_commits()).stream()
                .filter(c -> Boolean.TRUE.equals(c.getOrDefault("is_merge", false))).count();

        Map<String, Object> commitTypes = Map.of("regular", regularCount, "merges", mergeCount);

        return Map.of(
                "repositories", repos,
                "date_range", Map.of("earliest", earliest, "latest", latest),
                "commit_types", commitTypes
        );
    }

    public Map<String, Object> getImpactMetrics() {
        if (!hasData()) return Map.of("error", "no data loaded");
        
        var aggregate = data.getAggregate();
        if (aggregate == null) return Map.of("error", "aggregate is null");
        
       
        var changingIssuesList = orEmpty(aggregate.getChanging_issues());
        var changingCommitsList = orEmpty(aggregate.getChanging_commits());
        var impactedIssuesList = orEmpty(aggregate.getImpacted_issues());
        var impactedCommitsList = orEmpty(aggregate.getImpacted_commits());
        
        int changingIssues = changingIssuesList.size();
        int changingCommits = changingCommitsList.size();
        int impactedIssues = impactedIssuesList.size();
        int impactedCommits = impactedCommitsList.size();
        
        
        long changingMerges = changingCommitsList.stream()
            .filter(c -> Boolean.TRUE.equals(c.getOrDefault("is_merge", false)))
            .count();
        
        long impactedMerges = impactedCommitsList.stream()
            .filter(c -> Boolean.TRUE.equals(c.getOrDefault("is_merge", false)))
            .count();
        
        int changingRegular = changingCommits - (int) changingMerges;
        int impactedRegular = impactedCommits - (int) impactedMerges;
        
        double issueAmplification = changingIssues > 0 
            ? Math.round((double) impactedIssues / changingIssues * 10) / 10.0 
            : 0;
        
        double commitAmplification = changingCommits > 0 
            ? Math.round((double) impactedCommits / changingCommits * 10) / 10.0 
            : 0;
        
        double totalAmplification = (changingIssues + changingCommits) > 0
            ? Math.round((double) (impactedIssues + impactedCommits) / (changingIssues + changingCommits) * 10) / 10.0
            : 0;
        
        return Map.of(
            "changing", Map.of(
                "issues", changingIssues,
                "commits", changingRegular,
                "merges", (int) changingMerges
            ),
            "impacted", Map.of(
                "issues", impactedIssues,
                "commits", impactedRegular,
                "merges", (int) impactedMerges
            ),
            "amplification", Map.of(
                "issue", issueAmplification,
                "commit", commitAmplification,
                "total", totalAmplification
            )
        );
    }
    private boolean hasData() {
        return data != null && data.getAggregate() != null;
    }
    private List<Map<String, Object>> orEmpty(List<Map<String, Object>> list) {
        return list != null ? list : new ArrayList<>();
    }
    private Map<String,Object> mapOf(Object... kv) {
        Map<String,Object> map = new HashMap<>();
        for(int i=0;i+1<kv.length;i+=2) map.put((String)kv[i], kv[i+1]);
        return map;
    }
    



}