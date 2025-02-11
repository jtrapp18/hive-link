import { useMemo } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { PlotContainer } from '../MiscStyling';
import LazyPlot from './LazyPlot';

const TrendChart = ({ title, x, y, chartType = 'scatter' }) => {
  const { width, height, ref } = useResizeDetector();

  if (!x?.data?.length || !y?.data?.length) {
    return <p>Loading chart...</p>;
  }

  const trace = useMemo(() => ({
    x: x.data,
    y: y.data,
    type: chartType,
    mode: chartType === 'scatter' ? 'markers' : undefined,
    name: title,
  }), [x.data, y.data, chartType, title]);

  const layout = useMemo(() => ({
    title: { text: title },
    xaxis: { title: { text: x.label } },
    yaxis: { title: { text: y.label } },
    boxmode: chartType === 'box' ? 'group' : undefined,
    width,
    height,
  }), [title, x.label, y.label, chartType, width, height]);

  return (
    <PlotContainer ref={ref}>
      <LazyPlot data={[trace]} layout={layout} chartType={chartType}/>
    </PlotContainer>
  );
};

export default TrendChart;