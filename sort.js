
var unpixelize = function(pixels) {
	return Number(pixels.slice(0,-2));
};

var settings = {
	width: d3.select(".sort").style("width"),
	height: d3.select(".sort").style("height"),
	min_radius: 20,
	n: 10,
};

settings.max_radius = unpixelize(settings.width)/(2*settings.n);
	// unpixelize(settings.height)/(2*settings.n)

console.log(settings);
var circleArray = [];

var circleGenerator = function(n) {
	var radius;
	var currX = 0;

	var generateRand = function() {
		return Math.floor(Math.random() * (settings.max_radius - settings.min_radius) + settings.min_radius);
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
var circles = d3.select(".sort").selectAll("svg.player");


var createCircles = function() {
	circles.data(circleArray).enter()
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

var bubbleSort = function() {
	// var newCircleArray = circleArray.slice(0);
	// var tmp = newCircleArray[0];
	// newCircleArray[0] = newCircleArray[1];
	// newCircleArray[1] = tmp;
	// console.log(circleArray);
	// console.log(newCircleArray);

	var generate = function(n, limit) {
		var result = [];
		for (var i =0; i < n; i++) {
			result.push(Math.floor(Math.random() * limit));
		}

		return result;
	}

	var arrR = generate(circleArray.length, settings.max_radius);

	d3.selectAll('circle').data(circleArray)
	.transition()
	// .attr('r', function(d, i) {
	// 	console.log(arrR[i]);
	// 	return arrR[i];
	// })
	// .attr('cy', function(d) {
	// 	return d.attr('cy');
	// })
	.attr('cx', function(d, i) {
		return generate(1, unpixelize(settings.width));
	})
	.duration(500);
	// var newCircleOne = {
	// 	radius: 20,
	// 	currentX: 20
	// };

	// var newCircleTwo = {
	// 	radius: 20,
	// 	currentX: 60
	// };
	// circles.data([newCircleOne, newCircleTwo]).transition();
};

// var bubbleSort = function(array) {
//   var end = circleArray.length;
//   var swapped = true;
//   var tmp;

//   while (swapped) {
//   	swapped = false;
//   	for (var j = 0; j < end; j++) {
//   		if (array[j] > array[j+1]) {
//   			tmp = array[j+1];
//   			array[j+1] = array[j];
//   			array[j] = tmp;
//   			swapped = true;
//   		}
//   	}
//   	end--;
//   }
//   return array;
// };

createCircles();