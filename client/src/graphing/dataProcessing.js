
const prepareDataForPlot = (hives, explanatoryVar, target) => {
  const traces = [];

  // Create an object to track total deaths by date
  let xVar
  const runningTotal = {};

  // Loop through hives and their queens
  hives.forEach(hive => {
    if (explanatoryVar.table === 'hives') {
      xVar = hives[explanatoryVar.column]
    }

    hive.queens.forEach(queen => {
      // Loop through each inspection
      if (explanatoryVar.table === 'queens') {
        xVar = queens[explanatoryVar.variable]
      }

      queen.inspections.forEach(inspection => {
        const yVar = inspection[target.variable];

        if (explanatoryVar.table === 'inspections') {
          xVar = inspections[explanatoryVar.variable]
        }
        
        // If the queen's fate is 'dead', we count it
        if (yVar === target.value) {
          // If the date is not already in the runningTotal, initialize it
          if (!runningTotal[xVar]) {
            runningTotal[xVar] = 0;
          }
          // Increment the death count for the given date
          runningTotal[xVar]++;
        }
      });
    });
  });

  // Convert runningTotal object into x and y arrays for the plot
  const x = Object.keys(runningTotal).sort();  // Dates sorted in ascending order
  const y = x.map(xVar => runningTotal[xVar]);  // Total death counts for each date

  // Prepare the trace for the plot
  const deathTrace = {
    x: x,          // Dates
    y: y,          // Total death counts
    type: 'scatter', // Line plot
    mode: 'lines+markers', // Adding markers to each data point
    name: 'Total Death Count', // Label for the plot
  };

  // Push the trace into the traces array
  traces.push(deathTrace);

  return traces;
};

export { prepareDataForPlot };