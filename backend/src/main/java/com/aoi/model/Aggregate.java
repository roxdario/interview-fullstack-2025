package com.aoi.model;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties(ignoreUnknown = true)
public class Aggregate {
    private List<Map<String, Object>> changing_issues;
    private List<Map<String, Object>> changing_commits;
    private List<Map<String, Object>> impacted_issues;
    private List<Map<String, Object>> impacted_commits;
    private Map<String, Integer> affinity_count;

    public List<Map<String, Object>> getChanging_issues() {
        return changing_issues;
    }

    public void setChanging_issues(List<Map<String, Object>> changing_issues) {
        this.changing_issues = changing_issues;
    }

    public List<Map<String, Object>> getChanging_commits() {
        return changing_commits;
    }

    public void setChanging_commits(List<Map<String, Object>> changing_commits) {
        this.changing_commits = changing_commits;
    }

    public List<Map<String, Object>> getImpacted_issues() {
        return impacted_issues;
    }

    public void setImpacted_issues(List<Map<String, Object>> impacted_issues) {
        this.impacted_issues = impacted_issues;
    }

    public List<Map<String, Object>> getImpacted_commits() {
        return impacted_commits;
    }

    public void setImpacted_commits(List<Map<String, Object>> impacted_commits) {
        this.impacted_commits = impacted_commits;
    }

    public Map<String, Integer> getAffinity_count() {
        return affinity_count;
    }

    public void setAffinity_count(Map<String, Integer> affinity_count) {
        this.affinity_count = affinity_count;
    }
}
