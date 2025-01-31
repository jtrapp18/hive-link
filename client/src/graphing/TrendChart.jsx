import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import { prepareDataForPlot } from './dataProcessing'
import styled from 'styled-components';

const StyledPlot = styled(Plot)`
  width: 100%;
  max-height: 40vh;
`

const TrendChart = ({ plotData, title, xInfo, yInfo }) => {

  const layout = {
    title: title,
    xaxis: {
      title: xInfo.title,
      type: xInfo.type,  // This tells Plotly to treat the x-axis as time-based
    },
    yaxis: {
      title: yInfo.title,  // Change depending on what metric you're plotting
    },
  };

  return (
    <StyledPlot
      data={plotData}
      layout={layout}
      config={{ responsive: true }}
    />
  );
};

export default TrendChart;
