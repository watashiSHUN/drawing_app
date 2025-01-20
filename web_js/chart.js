// Create a dictionary: {drawing_name: style}
display_style = {
  car: "grey",
  fish: "red",
  house: "yellow",
  tree: "green",
  bicycle: "cyan",
  guitar: "blue",
  pencil: "magenta",
  clock: "lightgray",
};

/*
metadata = [
{
  id: 0,
  drawing: "car",
  student_name: "Radu",
  student_id: 1663053145814,
  features: [5, 883],
},
...
]*/
function drawChart(columns, metadatas, options) {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(() => {
    const data = new google.visualization.DataTable();
    data.addColumn("number", columns[0]);
    data.addColumn("number", columns[1]);
    data.addColumn({ type: "string", role: "style" });
    data.addRows(
      metadatas.map((s) => [...s.features, display_style[s.drawing]])
    );

    const chart = new google.visualization.ScatterChart(chart_container);
    chart.draw(data, options);
  });
}
