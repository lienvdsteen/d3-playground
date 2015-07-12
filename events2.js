var w = window.innerWidth;
var h = window.innerHeight;
var margin = {top: 40, right: 20, bottom: 20, left: 40};
var radius = 6;

var svg = d3.select("body").append('svg').attr({
    width: w,
    height: h
});

var dataset = [
    {x: 100, y: 110},
    {x: 83, y: 43},
    {x: 92, y: 28},
    {x: 49, y: 74},
    {x: 51, y: 10},
    {x: 25, y: 98},
    {x: 77, y: 30},
    {x: 20, y: 83},
    {x: 11, y: 63},
    {x: 4, y: 55},
    {x: 0, y: 0},
    {x: 85, y: 100},
    {x: 60, y: 40},
    {x: 70, y: 80},
    {x: 10, y: 20},
    {x: 40, y: 50}
];

var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {return d.x})])
    .range([margin.left, w - margin.right]);

var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {return d.y})])
    .range([margin.top, h - margin.bottom]);

var xAxis = d3.svg.axis().scale(xScale).orient("top");
var yAxis = d3.svg.axis().scale(yScale).orient("left");

var circleAttr = {
        cx: function(d) {return xScale(d.x);},
        cy: function(d) {return yScale(d.y);},
        r: radius
    };

// this is a svg group element
svg.append("g").attr({
    'class': "axis",
    transform: "translate(" + [0, margin.top] + ")"
}).call(xAxis);

svg.append("g").attr({
    'class': "axis",
    transform: "translate(" + [margin.left, 0] + ")"
}).call(yAxis);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr(circleAttr)
    .on('mouseover', handleMouseOver)
    .on('mouseout', handleMouseOut);

svg.on('click', function() {
    // this = svg element
    var coords = d3.mouse(this);
    var newData = {
        // because we have the pixel number and we need the data number we use invert
        x: Math.round(xScale.invert(coords[0])),
        y: Math.round(yScale.invert(coords[1]))
    };

    dataset.push(newData);

    // append the circle!
    svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr(circleAttr)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);
});

function handleMouseOver(d, i) {
        d3.select(this).attr({
            'fill': 'orange',
            r: radius * 2
        });

        svg.append("text")
            .attr({
                id: "t" + d.x + "-" + d.y + '-' + i,
                x: function() { return xScale(d.x) - 30; },
                y: function() { return yScale(d.y) - 15; },
            })
            .text(function() {
                return [d.x, d.y];
            });
    };

function handleMouseOut(d, i) {
        d3.select(this).attr({
            'fill': 'black',
            r: radius
        });

        d3.select('#t' + d.x + '-' + d.y + "-" + i).remove();
    }
