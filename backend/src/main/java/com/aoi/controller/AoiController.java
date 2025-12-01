package com.aoi.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aoi.service.AoiService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AoiController {

    @Autowired
    private AoiService service;

    @GetMapping("/health")
    public Object health() { return service.getHealth(); }

    @GetMapping("/aggregate")
    public Object aggregate() { return service.getAggregate();}

    @GetMapping("/commits")
    public Object commits(@RequestParam(defaultValue = "100") int limit) { return service.getCommits(limit); }

    @GetMapping("/issues")
    public Object issues() { return service.getIssues(); }

    @GetMapping("/affinity")
    public Object affinity(@RequestParam(defaultValue = "20") int limit) { return service.getAffinity(limit); }

    @GetMapping("/stats")
    public Object stats() { return service.getStats(); }
    
    @GetMapping("/impact-metrics")
    public Map<String, Object> getImpactMetrics() {return service.getImpactMetrics(); }
}
