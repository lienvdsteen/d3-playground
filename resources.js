// d3.text
// d3.json
// d3.html
// d3.xml
// d3.csv
// d3.tsv

// always 2 parameters:
    // path to the file
    // and the callback function
d3.csv("/sales.csv", function(d) {
    d3.select('body').selectAll('p')
        .data(d)
        .enter()
        .append('p')
        .text(function(d) {
            return d.name + ":" + d.sales;
        });
});
