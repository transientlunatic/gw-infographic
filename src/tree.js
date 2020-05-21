function DetectionTree(primary, secondary, remnant, energy, pane, cx=0, cy=0, scale=1){

    this.getObjectSize = function(primary, secondary, remnant, maximum=25){
	let primary_size = Math.sqrt(maximum**2 * (primary / remnant));
	let secondary_size = Math.sqrt(
	    maximum**2 * (secondary / remnant));

	return {"primary": primary_size, "secondary": secondary_size, "remnant": maximum};
    }
    
    this.primary_mass = primary;
    this.secondary_mass = secondary;
    this.remnant_mass = remnant;
    this.energy = energy;
    
    this.sizes = this.getObjectSize(primary, secondary, remnant);
    

    this.detection_tree = pane.append("g").attr("transform", "translate("+cx+" "+cy+") scale("+scale+")");

    this.tree_outline = this.detection_tree.append("g").attr("id", "tree-outline");
    this.radiation = this.tree_outline.append("g").attr("id", "radiation");

    this.tree_lines = ["M25 10 L50 50", "M75 10 L50 50", "M50 50 L50 90"];
    this.radiation_circles = ["5", "8", "11"];

    this.tree_lines.forEach(function(item, index){
    	this.tree_outline.append("path")
    	    .classed("tree-line", true)
    	    .attr("d", item);
    }, this);

    this.radiation_circles.forEach(function(item, index){
    	this.radiation.append("circle")
    	    .classed("radiation-line", true)
    	    .attr("cx", "50")
    	    .attr("cy", "50")
    	    .attr("r", item);
    }, this);

    this.radiation.append("text")
	.classed("tree-label-invert", true)
	.attr("text-anchor", "middle")
	.attr("dominant-baseline", "middle")
	.attr("x", "25")
	.attr("y", "50")
	.text(this.energy);

    this.primary = this.detection_tree.append("g").classed("primary", true);
    this.primary.append("circle")
	.classed("black-hole", true)
	.attr("cx", "25")
	.attr("cy", "10")
	.attr("r", this.sizes.primary);
    this.primary.append("text")
	.classed("tree-label", true)
	.attr("text-anchor", "middle")
	.attr("dominant-baseline", "middle")
	.attr("x", "25")
	.attr("y", "10")
	.text(this.primary_mass);

    this.secondary = this.detection_tree.append("g").classed("secondary", true);
    this.secondary.append("circle")
	.classed("black-hole", true)
	.attr("cx", "75")
	.attr("cy", "10")
	.attr("r", this.sizes.secondary);
    this.secondary.append("text")
	.classed("tree-label", true)
	.attr("text-anchor", "middle")
	.attr("dominant-baseline", "middle")
	.attr("x", "75")
	.attr("y", "10")
	.text(this.secondary_mass);

    this.remnant = this.detection_tree.append("g").classed("remnant", true);
    this.remnant.append("circle")
	.classed("black-hole", true)
	.attr("cx", "50")
	.attr("cy", "90")
	.attr("r", this.sizes.remnant);

    this.remnant.append("text")
	.classed("tree-label", true)
	.attr("text-anchor", "middle")
	.attr("dominant-baseline", "middle")
	.attr("x", "50")
	.attr("y", "90")
	.text(this.remnant_mass);
    
};








export {DetectionTree};
