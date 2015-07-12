var svg = d3.select("body").append('svg').attr({
    width: window.innerWidth,
    height: window.innerHeight
});

var dataset = [1, 5, 2, 4, 3, 8];

// previously we did this to compute height:
    // height: function(d) {return d * 5;},
// this could cause problems if we get higher values
    // it could set it over an acceptable height
        // two bars would look like the same height
        // visualizing becomes a failure
var heightScale = d3.scale.linear() // y = mx + b
    .domain([0, d3.max(dataset)]) // domain goes from zero to the heighest element in our dataset
    .range([0, window.innerHeight - 40]); // values we want to map our output to

var color = d3.scale.linear()
    .domain([0, d3.max(dataset)])
    .range(["green", "red"]);

svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append("rect")
    .attr({
        height: heightScale,
        width: 100,
        x: function(d, i) {return i * 101;},
        y:  20,
        fill: color
    })
