import React from "react";
import Plot from "react-plotly.js";
import { PlotContainer } from "../MiscStyling";

const PieChart = ({ data, title, labelCol, valueCol }) => {

    if (!data || !data[labelCol] || !data[valueCol]) {
        return <p>Loading chart...</p>;
    }

  const trace = {
    labels: data[labelCol],
    values: data[valueCol],
    type: 'pie',
    textinfo: 'label+percent',
    hoverinfo: 'label+percent+value',
  };

  const layout = {
    title: {
      text: title,
      font: { color: 'black' }
    },
    // paper_bgcolor: '#36454F',
    showlegend: true,
    legend: {
        x: 0.8,
        y: 0.5,
        xanchor: 'left',
        yanchor: 'middle',
        title: {
            text: labelCol,
            font: { color: 'black' }
        }
    }
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

export default PieChart;
