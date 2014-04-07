var svg = d3.select("body").append('svg').attr({
    width: window.innerWidth,
    height: window.innerHeight
});

var dataset = [1, 5, 2, 4, 3, 8];

var heightScale = d3.scale.linear() // y = mx + b
    .domain([0, d3.max(dataset)])
    .range([0, window.innerHeight - 40]);

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
