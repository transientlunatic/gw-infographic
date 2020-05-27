
import * as d3 from 'd3';

import * as Isotope from 'isotope-layout';

import {saveSvgAsPng} from 'save-svg-as-png';

import {DetectionTree} from './tree.js';
import {DetectorPennant} from './pennants.js';
import {EventType} from './symbols.js';

var Globalize = require("globalize");

import './style.css';


var iso;
const request = new XMLHttpRequest();
request.open("GET", "http://data.cardiffgravity.org/gwcat-data/data/gwosc_gracedb.json");
request.responseType = "json";
request.send();



function FilterFunction(filterdata){
    console.log(filterdata);
    iso.arrange({filter: function(itemElem){
		var data = itemElem.dataset;
		console.log(data);
		return data.obsrun == filterdata.run;
    }});
}

function FilterButtons(){
    this.pane = d3.select("#infographic-pane");
    this.pane.append("h2").text(Globalize.formatMessage("filters-title"));
    let filters = [{run:"O1",
		    description: "The first observing run of the advanced detectors." },
		   {"run":"O2"},
		   {"run":"O3"}];
    var buttonbox = this.pane.append("div").attr("class", "filters button-group filter-button-group");
    var filterbox = buttonbox.selectAll("div").data(filters)
	.enter()
	.append("div")
	.attr("data-filter", function(d){return d.run;})
	.on("click", function(d,i){
	    FilterFunction(d);
	});
    filterbox.append("h3").text(function(d){return d.run;});
    filterbox.append("p").text(function(d){return d.description;});
}

function EventPanel(event){
    this.pane = d3.select("#event-grid")
	.append("div").classed(`event-item`, true)
	.attr("data-obsrun", event.obsrun.best)
	.append("svg")
	.attr("width", "200px")
	.attr("viewBox", "0 0 400 400");

    this.detection_box = this.pane.append("rect")
	.attr("width", "400px")
	.attr("height", "400px")
	.classed(`box ${event.obsrun.best}`, true);
    //
    if ( event.M1 ){
	let detection_tree = new DetectionTree(event.M1.best,
					       event.M2.best,
					       (event.Mfinal.best ? event.Mfinal.best : event.Mfinal.upper),
					       (event.Erad ? event.Erad.best : undefined),
					       this.pane, 200, 90, 2);
    }
    let pennants = new DetectorPennant(event.net.best, this.pane);
    if ((event.objType.best != "Terrestrial") && (event.objType.best != "")) {
	let eventsymbol = new EventType(event.objType.best, this.pane, 1, 6);
    }
    this.pane.append("text")
	.attr("y", "395")
	.classed("event-label", true)
	.text(event.name);
}


request.onload = function(){
    d3.select("#infographic-pane").append("div").attr("id", "event-grid");
    d3.select("#infographic-pane").append("div").attr("id", "tooltip"); 
    const Events = request.response;
    for( var item in Events.data){
	new EventPanel(Events.data[item]);
    };

    iso = new Isotope( '#event-grid', {
	itemSelector: 'div.event-item',
    });

    var buttons = new FilterButtons();

    d3.select("#infographic-pane").append("a").attr("id", "download").text("Download");
    d3.select("#download")
	.on('click', function(){
    // Get the d3js SVG element and save using saveSvgAsPng.js
    saveSvgAsPng(document.getElementsByTagName("svg")[0], "plot.png", {scale: 2, backgroundColor: "#FFFFFF"});
})
    
}

