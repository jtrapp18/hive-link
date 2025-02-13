import { useMemo, useContext } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { PlotContainer } from '../MiscStyling';
import LazyPlot from './LazyPlot';
import { WindowWidthContext } from '../context/windowSize';

const TrendChart = ({ title, x, y, chartType = 'scatter' }) => {

  const { isMobile } = useContext(WindowWidthContext);
  const { width, height, ref } = useResizeDetector();
  const titleSize = isMobile ? 12 : 16;
  const labelSize = isMobile ? 10 : 14;

  if (!x?.data?.length || !y?.data?.length) {
    return <PlotContainer>Loading chart...</PlotContainer>;
  }

  const trace = useMemo(() => ({
    x: x.data,
    y: y.data,
    type: chartType,
    mode: chartType === 'scatter' ? 'markers' : undefined,
    name: title,
  }), [x.data, y.data, chartType, title]);

  const layout = useMemo(() => ({
    title: { 
      text: title,
      font: {
        size: titleSize
      }
    },
    xaxis: { title: { 
              text: x.label,
              font: {
                size: labelSize
              }
            }},
    yaxis: { title: { 
      text: y.label,
      font: {
        size: labelSize
      }
    }},
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