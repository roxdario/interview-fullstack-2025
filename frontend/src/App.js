import React from 'react';
import { useImpactData } from './hooks/useImpactData';
import Header from './components/layout/Header';
import StatCard from './components/common/StatCard';
import Card from './components/common/Card';
import DataTable from './components/common/DataTable';
import ImpactChart from './components/charts/ImpactChart';
import { formatDate, truncate, getCommitType, getBadgeClass } from './utils/formatters';
import { TABLE_LIMITS } from './constants/config';
import './App.css';

function App() {
  const { aggregate, impactMetrics, commits, issues, impactData, error, affinties } = useImpactData();

  if (error) return <div className="error"> Error: {error}</div>;

  const stats = aggregate?.direct_changes || {};
  const impact = aggregate?.indirect_impact || {};

  const commitColumns = [
    {
      key: 'date',
      label: 'Date',
      render: (row) => formatDate(row.date),
    },
    {
      key: 'message',
      label: 'Message',
      render: (row) => truncate(row.message),
    },
    {
      key: 'repo',
      label: 'Repo',
      render: (row) => row.repo_id || 'N/A',
    },
    {
      key: 'type',
      label: 'Type',
      render: (row) => (
        <span className={getBadgeClass(row.is_merge ? 'merge' : 'regular')}>
          {getCommitType(row.is_merge)}
        </span>
      ),
    },
  ];

  const issueColumns = [
    {
      key: 'name',
      label: 'Issue',
      render: (row) => <strong>{row.name}</strong>,
    },
    {
      key: 'itype',
      label: 'Type',
      render: (row) => (
        <span className={getBadgeClass(row.itype)}>{row.itype}</span>
      ),
    },
    {
      key: 'severity',
      label: 'Severity',
      render: (row) => row.severity || 'unknown',
    },
    {
      key: 'summary',
      label: 'Summary',
      render: (row) => truncate(row.summary || '-', 60),
    },
  ];

  const affinityColumns = [
    {
      key: 'element',
      label: 'Element',
      render: (row) => <strong>{row.element}</strong>,
    },
    {
      key: 'affinity_count',
      label: 'Affinity Count',
      render: (row) => row.affinity_count,
    },
  ];


  return (
    <div className="app">
      {/* Header */}
      <Header
        title="Area Of Impact Dashboard"
      />

      {/* KPI */}
      <div className="stats-grid">
        <StatCard label="Direct Issues" value={stats.issues_count || 0} />
        <StatCard label="Direct Commits" value={stats.commits_count || 0} />
        <StatCard label="Affected Issues" value={impact.affected_issues || 0} />
        <StatCard label="Affected Commits" value={impact.affected_commits || 0} />
        <StatCard label="Merge Commits" value={stats.merge_commits || 0} />
        <StatCard label="Total Nodes" value={aggregate?.total_nodes || 0} />
      </div>

      {/* Impact Chart */}
      {impactData?.length > 0 && (
        <Card
          title="Impact Analysis"
          description="This chart shows how changes propagate through your codebase. Direct changes on the left lead to indirect impacts on the right, illustrating how a single modification can impact through dependencies and related areas."
        >
          <ImpactChart 
            data={impactData} 
            impactMetrics={impactMetrics}
            height={400} 
          />
        </Card>
      )}

      {/* Commits Table */}
      {commits.length > 0 && (
        <Card title="Direct Changes (Commits)">
          <DataTable
            columns={commitColumns}
            data={commits.slice(0, TABLE_LIMITS.commits)}
            emptyMessage="No commits found"
          />
        </Card>
      )}

      {/* Issues Table */}
      {issues.length > 0 && (
        <Card title="Affected Issues">
          <DataTable
            columns={issueColumns}
            data={issues.slice(0, TABLE_LIMITS.issues)}
            emptyMessage="No issues found"
          />
        </Card>
      )}

      {/* Co‑Change Affinity Table */}
      {affinties.length > 0 && (
        <Card title="Co‑Change Affinity (Top Elements)">
          <DataTable
            columns={affinityColumns}
            data={affinties.slice(0, TABLE_LIMITS.affinity || affinties.length)}
            emptyMessage="No affinity data found"
          />
        </Card>
      )}

    </div>
  );
}

export default App;