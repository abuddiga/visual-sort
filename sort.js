var circleArray = [];

var unpixelize = function(pixels) {
	return Number(pixels.slice(0,-2));
};

var settings = {
	width: d3.select(".sort").style("width"),
	height: d3.select(".sort").style("height"),
	n: 10,
};

settings.max_radius = unpixelize(settings.width)/(2*settings.n);
	// unpixelize(settings.height)/(2*settings.n)

console.log(settings);

var circleGenerator = function(n) {
	var radius;
	var currX = 0;

	var generateRand = function() {
		return Math.floor(Math.random() * settings.max_radius);
	};

	for (var i = 0; i < n; i++) {
		var circle = {};
		radius = generateRand();
		console.log(radius);
		if (i !== 0) {
			currX = circleArray[i-1].currentX + circleArray[i-1].radius +radius;
		} else {
			currX = radius;
		}
		circle.radius = radius;
		circle.currentX = currX;
		circleArray.push(circle);
	}
};

circleGenerator(settings.n);

//var sortDiv = d3.select(".sort");
var circles = d3.select(".sort").selectAll("svg.player").data(circleArray);


var createCircles = function() {
	circles.enter()
		.append("svg")
		.attr("width", function(d) {
			return d3.select(this.parentNode).style("width");
		})
		.attr("height", function(d) {
			return d3.select(this.parentNode).style("height");
		})
		.classed("player", true)
		.append("circle")
		.attr("r", function(d,i){
			return d.radius;
		})
		.attr("cy", function(d){
			return unpixelize(d3.select(this.parentNode).style("height"))/2;
		})
		.attr("cx", function(d){
			return d.currentX;
		});

};

createCircles();