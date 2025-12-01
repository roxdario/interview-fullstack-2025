
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import SummaryCard from '../common/SummaryCard'

/**
 * Impact Chart Component with Stacked Bars
 * @param {Array} data - Chart data
 * @param {Object} impactMetrics - metrics
 * @param {number} height - Chart height
 */
const ImpactChart = ({ data, impactMetrics, height = 400 }) => {
  if (!data || data.length === 0) {
    return <div className="chart-empty">No chart data available</div>;
  }

  const { changing = {}, impacted = {}, amplification = {} } = impactMetrics || {};

  return (
    <div className="chart-wrapper">
      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="name"
            angle={-15}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 14 }}
          />
          <YAxis
            label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 14 }}
          />
          <Legend />
          <Bar dataKey="Regular" stackId="a" fill="#667EEA" />
          <Bar dataKey="Merge" stackId="a" fill="#764ba2" />
        </BarChart>
      </ResponsiveContainer>
      
      {/* Impact Metrics Summary - 3 Cards in One Raw */}
  <div className="impact-summary">
  <SummaryCard
    className="impact-card-direct"
    title="Direct Changes"
    items={[
      `Issues: ${changing.issues || 0}`,
      `Commits: ${changing.commits || 0}`,
      `Merges: ${changing.merges || 0}`,
    ]}
  />

  <SummaryCard
    className="impact-card-impacted"
    title="Impacted Changes"
    items={[
      `Issues: ${impacted.issues || 0}`,
      `Commits: ${impacted.commits || 0}`,
      `Merges: ${impacted.merges || 0}`,
    ]}
  />

  <SummaryCard
    className="impact-card-amplification"
    title="Amplification Ratio"
    items={[
      `Issue: x${amplification.issue || 0}`,
      `Commit: x${amplification.commit || 0}`,
      `Total: x${amplification.total || 0}`,
    ]}
  />
</div>
    </div>
  );
};

export default ImpactChart;