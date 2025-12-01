
/**
 * Reusable data table
 * @param {Array} columns - Column definitions [{ key, label, render }]
 * @param {Array} data - Table data
 * @param {string} emptyMessage - No data available
 */
const DataTable = ({ columns, data, emptyMessage = 'No data available' }) => {
  if (!data || data.length === 0) {
    return <div className="table-empty">{emptyMessage}</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key} className={col.className}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default DataTable;
