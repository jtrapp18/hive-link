import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import { prepareDataForPlot } from './dataProcessing'
import styled from 'styled-components';

const StyledPlot = styled(Plot)`
  width: 100%;
  max-height: 40vh;
`

const TrendChart = ({ data, xCol, yCol }) => {

  const dates = Object.keys(data.antsPresent); // Assuming data is aligned by index (e.g., same number of entries)

  const trace = {
    x: Object.values(data[xCol]),
    y: Object.values(data[yCol]),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Ant Presence',
  };

  const layout = {
    title: 'Ant Presence Over Time',
    xaxis: {
      title: 'Date',
    },
    yaxis: {
      title: 'Presence (0 = No, 1 = Yes)',
    },
  };

  return (
    <StyledPlot
      data={[trace]}
      layout={layout}
      config={{ responsive: true }}
    />
  );
};

export default TrendChart;
