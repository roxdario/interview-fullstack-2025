package com.aoi.model;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AoiData {
    private Aggregate aggregate;
    private Map<String, Object> aoi_graph;

    public Aggregate getAggregate() {
        return aggregate;
    }

    public void setAggregate(Aggregate aggregate) {
        this.aggregate = aggregate;
    }

    public Map<String, Object> getAoi_graph() {
        return aoi_graph;
    }

    public void setAoi_graph(Map<String, Object> aoi_graph) {
        this.aoi_graph = aoi_graph;
    }
}
