var circleArray = [];
var NUM_CIRCLES = 5;

var circleGenerator = function(n) {
	var radius;
	var currX = 0;

	var generateRand = function() {
		return Math.floor(Math.random() * 200);
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

circleGenerator(NUM_CIRCLES);
console.log(circleArray);

//var sortDiv = d3.select(".sort");
var circles = d3.select(".sort").selectAll("svg.player").data(circleArray);


var createCircles = function() {
	//var sortDivWidth = sortDiv.attr("width");
	//var sortDivHeight = sortDiv.attr("height");
	//debugger;
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
			return Number(d3.select(this.parentNode).style("height").slice(0,-2))/2;
		})
		.attr("cx", function(d){
			return d.currentX;
		});

};

createCircles();