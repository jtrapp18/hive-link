import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { PlotContainer } from '../MiscStyling';

const TrendChart = ({ title, x, y }) => {
  const data = x.data.map((_, index) => ({
    x: x.data[index],
    y: y.data[index],
  }));

  return (
    <PlotContainer>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x">
            <Label value={x.label} offset={0} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value={y.label} angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </PlotContainer>
  );
};

export default TrendChart;