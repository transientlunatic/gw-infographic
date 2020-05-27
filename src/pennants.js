import * as d3 from 'd3';

function DetectorPennant(detectors, pane) {

    var tooltip = d3.select("#tooltip");
    
    var mouseover = function(d) {
	tooltip.style("opacity", 1);
	d3.select(this)
	    .style("stroke", "white")
	    .style("stroke-width", "4px")
	    .style("opacity", 1);
    }
    var mousemove = function(d) {
	tooltip.html(`<h3>${pennants_data[d]['name']}</h3><p>${pennants_data[d]['abbreviation']}</p>` );
	tooltip.style("left", (d3.event.pageX > (window.innerWidth-200)) ? (20 + d3.event.pageX) : (d3.event.pageX - 170) + "px");
	tooltip.style("top", (20 + d3.event.pageY ) + "px");
    }
    var mouseleave = function(d) {
	tooltip.style("opacity", 0);
	d3.select(this)
	    .style("stroke", "none")
	    .style("opacity", 1.0)
    }

    this.detector_list = detectors;
    this.rosette = pane.append("g")
	.attr("class", "rosette")
	.attr("transform", "translate(100 0)");
    this.pennants = {"L": {"class": "livingston",
			   "type": "regular",
			   "abbreviation": "L1",
			    "name": "LIGO Livingston Observatory",
			    "x": "100"},
		     "H": {"class": "hanford",
			   "abbreviation": "H1",
			    "type": "regular",
			    "name": "LIGO Hanford Observatory",
			    "x": "0"},
		     "V": {"class": "virgo",
			    "type": "regular",
			   "name": "Virgo",
			   "abbreviation": "V1",
			    "x": "200"},
		     "G": {"class": "geo600",
			    "type": "invert",
			    "name": "GEO600",
			    "x": "-50"},
		     "I": {"class": "india",
			    "type": "invert",
			    "name": "LIGO India Observatory",
			    "x": "50"},
		     "K": {"class": "kagra",
			    "type": "invert",
			    "name": "KAGRA",
			    "x": "150"}
		    }

    this.pennant_paths = {"regular": "M0 0 L 100 0 L 50 50 Z",
			  "invert":  "M0 50 L 100 50 L 50 0 Z"}
    var pennants_data = this.pennants;
    var pennants_paths = this.pennant_paths;
    this.rosette.selectAll("g")
	.data(detectors)
	.enter()
	.append("g")
	.attr("class", "pennant")
	.attr("transform", function(d){return "translate("+pennants_data[d]['x']+" 0)";})
	.append("path")
	.attr("d", function(d){ return pennants_paths[pennants_data[d]['type']] })
	.attr("class", function(d){return pennants_data[d]['class']})
	.on("mousemove", mousemove)
	.on("mouseover", mouseover)
	.on("mouseleave", mouseleave)
    ;
    
    
}


export {DetectorPennant};
