import { useState, useEffect } from 'react';
import { api } from '../services/api';

/**
 * Custom hook for fetching and managing impact analysis data
 * Transforms data for STACKED bar chart (Regular + Merge)
 * @returns {Object} { aggregate, impactMetrics, commits, issues, impactData, error, affinties}
 */
export const useImpactData = () => {
  const [aggregate, setAggregate] = useState(null);
  const [impactMetrics, setImpactMetrics] = useState(null);
  const [commits, setCommits] = useState([]);
  const [issues, setIssues] = useState([]);
  const [impactData, setImpactData] = useState([]);
  const [error, setError] = useState(null);
  const [affinties, setAffinties] = useState([]);


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      
      const [aggregateRes, metricsRes, commitsRes, issuesRes, affinityRes] = await Promise.all([
        api.aggregate(),
        api.impactMetrics(),
        api.commits(15),
        api.issues(),
        api.affinity()
      ]);

      setAggregate(aggregateRes);
      setImpactMetrics(metricsRes);
      setCommits(commitsRes.items || commitsRes || []);
      setIssues(issuesRes.changing || issuesRes || []);
      setAffinties(affinityRes.top_affinity || affinityRes || []);

      
      if (metricsRes) {
        const { changing = {}, impacted = {} } = metricsRes;
        
        const chartData = [
          {
            name: 'Direct Issues',
            Regular: changing.issues || 0,
            Merge: 0,
          },
          {
            name: 'Direct Commits',
            Regular: (changing.commits || 0) - (changing.merges || 0),
            Merge: changing.merges || 0,
          },
          {
            name: 'Impacted Issues',
            Regular: impacted.issues || 0,
            Merge: 0, 
          },
          {
            name: 'Impacted Commits',
            Regular: (impacted.commits || 0) - (impacted.merges || 0),
            Merge: impacted.merges || 0,
          },
        ];

        setImpactData(chartData);
      }
      
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading data:', err);
    } 
  };

  return {
    aggregate,
    impactMetrics,
    commits,
    issues,
    impactData,
    error,
    affinties,
    reload: loadData,
  };
};