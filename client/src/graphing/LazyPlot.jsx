import { useState, useEffect } from "react";
import { ClipLoader } from 'react-spinners';

const LazyPlot = ({ data, layout, config, onClick }) => {
  const [Plot, setPlot] = useState(null);

  useEffect(() => {
    // Dynamically load Plotly from CDN
    const plotlyScript = document.createElement("script");
    plotlyScript.src = "https://cdn.plot.ly/plotly-latest.min.js";
    plotlyScript.onload = () => {
      // Once Plotly is loaded, dynamically load react-plotly.js factory
      import("react-plotly.js/factory").then(({ default: createPlotlyComponent }) => {
        setPlot(() => createPlotlyComponent(window.Plotly)); // Use window.Plotly from CDN
      });
    };
    document.body.appendChild(plotlyScript);

    return () => {
      // Clean up by removing the script when the component is unmounted
      document.body.removeChild(plotlyScript);
    };
  }, []);

  if (!Plot) return <ClipLoader />;

  return <Plot data={data} layout={layout} config={config} onClick={(event) => onClick?.(event)} />;
};

export default LazyPlot;