import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

const PlotContainer = styled.div`
  width: 100%;
  overflow: hidden;

  .gtitle {
    text-decoration: underline;
    font-weight: bold;
  }
`;

const TrendChart = ({ data, title, x, y }) => {
  // Prevent rendering if data is missing or empty
  if (!data || !data[x.dataCol] || !data[y.dataCol]) {
    return <p>Loading chart...</p>;
  }

  const trace = {
    x: data[x.dataCol],
    y: data[y.dataCol],
    type: 'scatter',
    mode: 'markers',
    name: title,
  };

  const layout = {
    title: {
      text: title,
      font: { size: 18 },
    },
    xaxis: {
      title: { text: x.label },
    },
    yaxis: {
      title: { text: y.label },
    },
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

export default TrendChart;