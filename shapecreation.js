var svg = d3.select('body').append('svg')
    .attr({
        width: window.innerWidth,
        height: window.innerHeight
    });

var parse = d3.time.format("%Y").parse;

// i lied, the .csv function can also take 3 parameters!
d3.csv('tut.csv', function(d) {d.year = parse(d.year); return d;}, function(data){

    // ooh new scale type!
    var yearScale = d3.time.scale()
        // d3.extent returns an array with min, max
        .domain(d3.extent(data, function(d) {return d.year;}))
        .range([50, window.innerWidth - 50]);

    var numberScale = d3.scale.linear()
        .domain([0, d3.max(data, function(d) {return d.number;})])
        .range([50, window.innerHeight - 50]);

    // let's add an axis, make it look pretty
    var yearAxis = d3.svg.axis().scale(yearScale)
        //
        .tickSize(100 - window.innerHeight)
        .orient('bottom');

    svg.append('g')
        .attr({
            'class': 'axis',
            'transform': "translate(" + [0, window.innerHeight - 50] + ")"
        }).call(yearAxis);

    // this is the line on top
    svg.append('line')
        .attr({
            x1: 50,
            y1: 50,
            x2: window.innerWidth - 50,
            y2: 50,
            fill: "none",
            stroke: 'black'
    });

    // append the path between the circles!
    var line = d3.svg.line()
        .x(function(d) {return yearScale(d.year);})
        .y(function(d) {return window.innerHeight - numberScale(d.number);});
    svg.append('path')
        .data([data])
        .attr({
            d: line,
            fill: 'none',
            stroke: '#78B446',
            'stroke-width': 3
        });

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr({
            cx: function(d) {return yearScale(d.year);},
            cy: function(d) {return window.innerHeight - numberScale(d.number);},
            r: 4,
            fill: '#fff',
            stroke: "#78B446",
            "stroke-width": 4
        });
});
