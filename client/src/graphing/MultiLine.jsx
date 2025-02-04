import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import { PlotContainer } from '../MiscStyling';

const MultiLine = ({ data, title, x, prefix }) => {
  // Prevent rendering if data is missing or empty
  if (!data || !data[x.dataCol]) {
    return <p>Loading chart...</p>;
  }

  // Extract date and fate columns
  const dates = data[x.dataCol];
  const traces = [];

  // Filter columns that start with the prefix (e.g., 'fate_')
  const fateColumns = Object.keys(data).filter(col => col.startsWith(prefix));

  // Group columns by suffix (e.g., survived, died, etc.)
  const groupedData = fateColumns.reduce((acc, column) => {
    const suffix = column.split(`${prefix}_`)[1];  // Get the suffix (e.g., 'survived', 'died')
    
    if (!acc[suffix]) {
      acc[suffix] = [];
    }
    
    acc[suffix].push(column); // Add column to its corresponding group
    return acc;
  }, {});

  // Create traces for each group of fate data
  Object.entries(groupedData).forEach(([fate, columns]) => {
    // Count the number of `true` values for each fate
    const countTrueValues = dates.map((_, idx) => {
      return columns.reduce((count, col) => {
        return count + (data[col][idx] === true ? 1 : 0);
      }, 0);
    });

    const trace = {
      x: dates,
      y: countTrueValues, // The count of `true` values for each date
      type: 'scatter',
      mode: 'markers', // Line with markers for visibility
      name: fate.charAt(0).toUpperCase() + fate.slice(1), // Capitalize the first letter of the fate
    };
    traces.push(trace);
  });

  const layout = {
    title: {
      text: title,
    },
    xaxis: {
      title: { text: x.label },
    },
    yaxis: {
      title: { text: 'Count of True Values' }, // Labeling the y-axis to indicate it's a count
    },
  };

  return (
    <PlotContainer>
      <Plot
        key={JSON.stringify(data)} // Ensures re-render when data updates
        data={traces}
        layout={layout}
        config={{ responsive: true }}
      />
    </PlotContainer>
  );
};

export default MultiLine;
