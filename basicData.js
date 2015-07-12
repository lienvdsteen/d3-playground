var dataset = [8, 48, 14, 31, 23];

svg = d3.select("body").append('svg').attr({
    width:600,
    height:400
});


// we always begin by selecting a set of elements, even if you still have to create the elements
// this might be confusing (and it is confusing at first)
// but the reason we're doing this is:
// sometimes you're going to want to use rectangles that are currently there, by selecting all of them, you can:
    //  use them all
    //  select a few of them
    //  use them all and create more

// if you have many different rectangles, you can select on rect.class / ...
svg.selectAll("rect")
    .data(dataset) // binds the data
    .enter() // creates placeholders for the missing rectangles for the datapoints
    .append("rect") // with append we add the missing rectangles
    .attr({
        x: function(d, i) {return i * 101;}, // move every rect 101 px right of the previous rectangle
        y: function(d, i) {return 400 - d * 5;},
        width: 100,
        height: function(d) {return d * 5;},
        fill: "orange"
    });

