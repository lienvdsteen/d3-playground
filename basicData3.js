var dataset = [8, 48, 14, 31, 23];

svg = d3.select("body").append('svg').attr({
    width:600,
    height:400
});

svg.selectAll("rect")
    .data(d3.range(5)) // will return [0,1,2,3,4]
    .enter()
    .append("rect")
    .attr({
        x: function(d, i) {return i * 101;},
        y: 100,
        width: 100,
        height: 100,
        fill: "474747"
    });

var moreData = d3.range(3);
var rects = svg.selectAll("rect").data(moreData);
rects.attr("fill", "#ccc");

// rects.exit().attr("fill", "#ececec");
rects.exit().remove();
