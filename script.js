const schema = "https://vega.github.io/schema/vega-lite/v5.json";
const data = "data.csv";

// Visualization
var donut = {
  "$schema": schema,
  "data": { "url": data },
  "description": "Donut Chart showing 'Rep' & 'Total'",
  "mark": {"type":"arc", "innerRadius": 40, "tooltip": true},
  "encoding": {
    "theta": {"field": "Total", "type": "quantitative", "aggregate": "sum"},
    "color": {"field": "Rep", "type": "nominal", "scale" : {"scheme":"category20"}, "legend": {"orient":"left"}}
  },
  "width":350, "height": 350
};


var corr = {
  "$schema": schema,
  "data": { "url": data },
  "description": "Correlation between 'Units' & 'Units-Cost' with a superimposed rectangular-brush",
  "params":
  [{
    "name": "brush",
    "select": "interval",
    "value": {"x": [20, 80], "y": [0, 50]}
  }],
  "mark": "point",
  "encoding": {
    "x": {"field": "Units", "type": "quantitative"},
    "y": {"field": "Unit Cost", "type": "quantitative"},
    "color":
    {
        "condition": {"selection": "brush", "field": "Item", "type": "nominal"},
        "value": "grey"
    }
  },
  "width":350, "height": 350
};

var streamGraph = {
  "$schema": schema,
  "data": { "url": data },
  "description":"StreamGraph showing how the 'Total' varied over time (for each 'Item')",
  "width": 300, "height": 200,
  "mark": "area",
  "encoding": {
    "x": {
      "timeUnit": "yearmonthdate", "field": "OrderDate",
      "axis": {"format": "%b %y"}
    },
    "y": {"aggregate": "sum", "field": "Total", "axis": null, "stack": "center"},
    "color": {"field": "Item", "scale": {"scheme": "dark2"}, "legend": {"orient":"left"}}
  },
  "width":350, "height": 350
};

var hist = {
  "$schema": schema,
  "data": { "url": data },
  "description": "Histogram of the 'Units' with an overlay of global-mean",
  "layer": [
    {
      "mark": "bar",
      "encoding": {
        "x": {"bin": true, "field": "Units"},
        "y": {"aggregate": "count", "field": "Units"},
        "color": {"value": "steelblue"}
      },
      "width":350, "height": 350
    },
    {
      "mark": "rule",
      "encoding": {
        "x": {"aggregate": "average", "field": "Units", "type": "quantitative"},
        "color": {"value": "red"},
        "size": {"value": 3}
      },
      "width":350, "height": 350
    }
  ]
};

var concat = {
  "$schema": schema,
  "columns": 2,
  "description": "Concatenated View",
  "concat": [donut, corr, streamGraph, hist],
  "resolve": {"scale": {"color": "independent"}}
};

vegaEmbed('#donut', donut);
vegaEmbed('#corr', corr);
vegaEmbed('#streamGraph', streamGraph);
vegaEmbed('#hist', hist);
vegaEmbed('#concat', concat);
