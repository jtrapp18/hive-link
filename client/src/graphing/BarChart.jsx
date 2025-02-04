import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import { PlotContainer } from '../MiscStyling';

const BarChart = ({ data, title, x, y }) => {
  // Prevent rendering if data is missing or empty
  if (!data || !data[x.dataCol] || !data[y.dataCol]) {
    return <p>Loading chart...</p>;
  }

  const trace = {
    x: data[x.dataCol],
    y: data[y.dataCol],
    type: 'bar',
    name: title,
  };

  const layout = {
    title: {
      text: title,
      font: { color: 'black' }
    },
    xaxis: {
      title: { text: x.label },
      font: { color: 'black' }
    },
    yaxis: {
      title: { text: y.label },
      font: { color: 'black' }
    },
    // paper_bgcolor: '#36454F',
    // plot_bgcolor: 'rgba(255, 255, 255, .7)',
  };

  return (
    <PlotContainer>
      <Plot
        key={JSON.stringify(data)} // Ensures re-render when data updates
        data={[trace]}
        layout={layout}
        config={{ responsive: true }}
      />
    </PlotContainer>
  );
};

export default BarChart;