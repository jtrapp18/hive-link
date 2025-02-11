import { useEffect, useState, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlotContainer } from "../MiscStyling";

const PieChartComponent = ({ title, label, valueData, selectedSlice, setSelectedSlice }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const chartRef = useRef(null);

  if (!label.data || !valueData) {
    return <PlotContainer><p>Loading...</p></PlotContainer>;
  }

  const handleOutsideClick = (event) => {
    if (chartRef.current && chartRef.current.contains(event.target)) {
      setSelectedSlice(null); // Reset the selection when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleClick = (eventData) => {
    const index = eventData.activeIndex;
    // const labelValue = label.data[index];
    console.log(eventData)
    
    setActiveIndex(index);
    setSelectedSlice({
      labelCol: label.label,
      labelFilter: eventData.name
    });
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00c49f'];

  // Grouping data by label and summing the values
  const aggregatedData = label.data.reduce((acc, currLabel, index) => {
    if (acc[currLabel]) {
      acc[currLabel] += valueData[index]; // Aggregate by adding the values
    } else {
      acc[currLabel] = valueData[index]; // Initialize with first value
    }
    return acc;
  }, {});

  // Convert aggregated data to a format suitable for Pie chart
  const pieData = Object.keys(aggregatedData).map((labelItem, index) => ({
    name: labelItem,
    value: aggregatedData[labelItem],
  }));

  return (
    <PlotContainer ref={chartRef}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#8884d8"
            onClick={handleClick}  // Handle slice clicks
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </PlotContainer>
  );
};

export default PieChartComponent;