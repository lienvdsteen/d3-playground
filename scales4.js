var svg = d3.select("body").append('svg').attr({
    width: window.innerWidth,
    height: window.innerHeight
});

var dataset = [
    {grade: "A+"},
    {grade: "B"},
    {grade: "A"},
    {grade: "B-"},
    {grade: "A"},
    {grade: "B+"},
    {grade: "A-"}
];

// discrete values, so the domain needs all the values from the dataset
var gradeScale = d3.scale.ordinal()
                    .domain(["A+", "A", "A-", "B+", "B", "B-"])
                    .range([100, 89, 84, 79, 76, 72]);

// because the values are close together we throw another linear scale on it too
// because we can
var scale = d3.scale.linear()
    .domain([72, 100])
    .range([20, 520]);

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr({
        "text-anchor": "middle",
        "font-size": 20,
        x: function(d) {return scale(gradeScale(d.grade));},
        y: function(d) {return scale(gradeScale(d.grade));}
    }).text(function(d) {
        return d.grade;
    });
