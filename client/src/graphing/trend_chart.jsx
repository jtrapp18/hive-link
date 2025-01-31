import React from 'react';
import Plot from 'react-plotly.js';
import { prepareDataForPlot } from './data_processing'

const TrendChart = ({ hivesData }) => {
  const data = prepareDataForPlot(hivesData);

  const layout = {
    title: 'Hive Trend Over Time',
    xaxis: {
      title: 'Date',
      type: 'date',  // This tells Plotly to treat the x-axis as time-based
    },
    yaxis: {
      title: 'Temperature (°C)',  // Change depending on what metric you're plotting
    },
  };

  return (
    <Plot
      data={data}
      layout={layout}
    />
  );
};

export default TrendChart;
