import { lazy } from 'react';
import { useResizeDetector } from 'react-resize-detector'
import { PlotContainer } from '../MiscStyling';

const Plot = lazy(() => import('react-plotly.js'));

const TrendChart = ({ title, x, y }) => {
  // Prevent rendering if data is missing or empty
  if (!x.data || !y.data) {
    return <p>Loading chart...</p>;
  }

  const { width, height, ref } = useResizeDetector({})

  const trace = {
    x: x.data,
    y: y.data,
    type: 'scatter',
    mode: 'markers',
    name: title,
  };

  const layout = {
    title: {
      text: title,
    },
    xaxis: {
      title: { text: x.label },
    },
    yaxis: {
      title: { text: y.label },
    },
  };

  return (
    <PlotContainer ref={ref}>
      <Plot
        key={JSON.stringify(x.data)} // Ensures re-render when data updates
        data={[trace]}
        config={{ responsive: true }}
        style={{ width: '100%', height: '100%' }}
        layout={{
          ...layout, 
          ...{
            width: width, 
            height: height
          }
        }}
      />
    </PlotContainer>
  );
};

export default TrendChart;