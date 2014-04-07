var svg = d3.select("body").append('svg').attr({
    width: window.innerWidth,
    height: window.innerHeight
});

var padding = 10;
var radius = 4;
var dataset = d3.range(150);

var cxScale = d3.scale.pow().exponent(2)
    .domain([0, d3.max(dataset)])
    .range([padding + radius/2, window.innerWidth - padding - radius/2]);

var cyScale = d3.scale.linear()
    .domain([0, d3.max(dataset)])
    .range([window.innerHeight - padding - radius/2, padding + radius/2]);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr({
        cx: cxScale,
        cy: cyScale,
        r: radius
    });
