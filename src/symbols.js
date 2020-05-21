function EventType(eventtype, pane, cx=0, cy=0, scale=15){

    let types = {"BBH": {"primary": "black-hole",
			 "secondary": "black-hole",
			 "name": "Binary Black Hole",
			 "abbreviation": "BBH"},
		 "BNS": {"primary": "neutron-star",
			 "secondary": "neutron-star",
			 "name": "Binary Neutron Star",
			 "abbreviation": "BNS"},
		 "NSBH": {"primary": "black-hole",
			 "secondary": "neutron-star",
			 "name": "Neutron Star / Black Hole",
			 "abbreviation": "NSBH"},
		}
    this.type = types[eventtype];


    
    
    this.symbol = pane.append("g")
	.attr("transform", `scale(${scale}) translate(${cx} ${cy})`);

    this.symbol.append("circle")
	.attr("cx", "1").attr("cy", "1").attr("r", 1)
	.classed(this.type.primary, true);

    this.symbol.append("circle")
	.attr("cx", "3.5").attr("cy", "1").attr("r", 1)
	.classed(this.type.secondary, true);

    this.symbol.append("text")
	.attr("x", 5).attr("y", 2)
	.classed("logo-text", true)
	.text(this.type.abbreviation);
};

export {EventType};
