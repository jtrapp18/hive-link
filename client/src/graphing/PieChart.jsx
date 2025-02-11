import { useEffect, useRef, useCallback, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { PlotContainer } from "../MiscStyling";
import LazyPlot from "./LazyPlot";

const PieChart = ({ title, label, valueData, selectedSlice, setSelectedSlice }) => {
  const { width, height, ref } = useResizeDetector();
  const containerRef = useRef(null);

  if (!label.data || !valueData) {
    return <PlotContainer><p>Loading...</p></PlotContainer>;
  }

  // ✅ Handles clicking on pie slices
  const handleClick = useCallback((eventData) => {
    if (eventData.points?.length) {
      const selected = eventData.points[0];

      let labelValue = selected.label;
      if (!isNaN(labelValue) && !isNaN(parseFloat(labelValue))) {
        labelValue = parseInt(labelValue, 10);
      }

      setSelectedSlice({
        labelCol: label.label,
        labelFilter: labelValue,
      });
    }
  }, [label.label, setSelectedSlice]);

  // ✅ Handles clicks inside the chart container but not on a slice
  useEffect(() => {
    const handleBackgroundClick = (event) => {
      if (
        containerRef.current &&
        containerRef.current.contains(event.target) && // Click is inside the container
        !event.target.closest(".slice") // But NOT on a pie slice
      ) {
        setSelectedSlice(null);
      }
    };

    document.addEventListener("click", handleBackgroundClick);
    return () => document.removeEventListener("click", handleBackgroundClick);
  }, [setSelectedSlice]);

  const trace = {
    labels: label.data,
    values: valueData,
    type: "pie",
    textinfo: "label+percent",
    hoverinfo: "label+percent+value",
    automargin: true,
  };

  const layout = {
    title: { text: title, font: { color: "black" } },
    showlegend: true,
    legend: {
      x: 1,
      y: 0.5,
      xanchor: "left",
      yanchor: "middle",
      title: { text: label.label, font: { color: "black" } },
    },
    width,
    height,
  };

  return (
    <PlotContainer ref={containerRef}>
      <LazyPlot
        data={[trace]}
        layout={layout}
        config={{ responsive: true }}
        onClick={handleClick}
        className="pie-chart"
        chartType="pie"
      />
    </PlotContainer>
  );
};

export default PieChart;