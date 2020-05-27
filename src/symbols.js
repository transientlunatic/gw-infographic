var Globalize = require("globalize");
import * as d3 from 'd3';

function EventType(eventtype, pane, cx=0, cy=0, scale=15){

    var tooltip = d3.select("#tooltip");
    
    var mouseover = function(d) {
	tooltip.style("opacity", 1);
	d3.select(this)
	    .style("stroke", "white")
	    .style("stroke-width", ".2px")
	    .style("opacity", 1);
    }
    var mousemove = function(d) {
	tooltip.html(`<h3>${d.name}</h3>` );
	tooltip.style("left", (d3.event.pageX > (window.innerWidth-200)) ? (20 + d3.event.pageX) : (d3.event.pageX - 170) + "px");
	tooltip.style("top", (20 + d3.event.pageY ) + "px");
    }
    var mouseleave = function(d) {
	tooltip.style("opacity", 0);
	d3.select(this)
	    .style("stroke", "none")
	    .style("opacity", 1.0)
    }
    
    let types = {"BBH": {"primary": "black-hole",
			 "secondary": "black-hole",
			 "name": Globalize.formatMessage("bbh-full"),
			 "abbreviation": Globalize.formatMessage("bbh-abbrev")},
		 "MassGap": {"primary": "black-hole",
			 "secondary": "black-hole",
			 "name": Globalize.formatMessage("bbh-full"),
			 "abbreviation": Globalize.formatMessage("bbh-abbrev")},
		 "BNS": {"primary": "neutron-star",
			 "secondary": "neutron-star",
			 "name": Globalize.formatMessage("bns-full"),
			 "abbreviation": Globalize.formatMessage("bns-abbrev")},
		 "NSBH": {"primary": "black-hole",
			 "secondary": "neutron-star",
			 "name":  Globalize.formatMessage("nsbh-full"),
			 "abbreviation":  Globalize.formatMessage("nsbh-abbrev")},
		}
    this.type = types[eventtype];

    
    
    this.symbol = pane.selectAll(".eventsymbol")
	.data([this.type])
	.enter()
	.append("g")
	.attr("class", "eventsymbol")
	.attr("transform", `scale(${scale}) translate(${cx} ${cy})`);

    this.symbol.append("circle")
	.attr("cx", "1").attr("cy", "1").attr("r", 1)
	.classed(function(d){return d.primary;}, true);

    this.symbol.append("circle")
	.attr("cx", "3.5").attr("cy", "1").attr("r", 1)
	.classed(function(d){return d.secondary;}, true);

    this.symbol.append("text")
	.attr("x", 5).attr("y", 2)
	.classed("logo-text", true)
	.text(function(d){return d.abbreviation;});

    this.symbol.on("mousemove", mousemove)
	.on("mouseover", mouseover)
	.on("mouseleave", mouseleave)
};

export {EventType};
