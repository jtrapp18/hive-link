const prepareDataForPlot = (hives) => {
  // Create a list for each queen with their respective inspection data
  const traces = [];
  
  hives.forEach(hive => {
    hive.queens.forEach(queen => {
      const queenData = {
        x: [],
        y: [],
        type: 'scatter', // line plot
        mode: 'lines+markers', // adding markers to each data point
        name: `Queen ${queen.id}`, // Label for the line in the legend
      };

      // Loop through each inspection and extract data
      queen.inspections.forEach(inspection => {
        const { date, temperature, mite_count } = inspection;
        queenData.x.push(date);  // Assuming 'date' is in a suitable format for x-axis
        queenData.y.push(temperature);  // or mite_count, or any other metric you're tracking
      });

      traces.push(queenData);
    });
  });

  return traces;
};

export { prepareDataForPlot }