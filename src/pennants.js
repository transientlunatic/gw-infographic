function DetectorPennant(detectors, pane) {

    this.detector_list = detectors;
    this.rosette = pane.append("g").attr("transform", "translate(100 0)");
    this.pennants = {"L1": {"class": "livingston",
			    "type": "regular",
			    "name": "LIGO Livingston Observatory",
			    "x": "100"},
		     "H1": {"class": "hanford",
			    "type": "regular",
			    "name": "LIGO Hanford Observatory",
			    "x": "0"},
		     "V1": {"class": "virgo",
			    "type": "regular",
			    "name": "Virgo",
			    "x": "200"},
		     "G1": {"class": "geo600",
			    "type": "invert",
			    "name": "GEO600",
			    "x": "-50"},
		     "I1": {"class": "india",
			    "type": "invert",
			    "name": "LIGO India Observatory",
			    "x": "50"},
		     "K1": {"class": "kagra",
			    "type": "invert",
			    "name": "KAGRA",
			    "x": "150"}
		    }

    this.pennant_paths = {"regular": "M0 0 L 100 0 L 50 50 Z",
			  "invert":  "M0 50 L 100 50 L 50 0 Z"}


    detectors.forEach(function(detector, index){
	// Draw each of the required pennants in the rosette
	this.rosette.append("g")
	    .attr("transform", "translate("+this.pennants[detector]['x']+" 0)")
	    .append("path").attr("d", this.pennant_paths[this.pennants[detector]['type']])
	    .classed(this.pennants[detector]['class'], true);
    }, this)
    
}


export {DetectorPennant};