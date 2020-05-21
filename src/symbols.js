var Globalize = require("globalize");

function EventType(eventtype, pane, cx=0, cy=0, scale=15){

    let types = {"BBH": {"primary": "black-hole",
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
