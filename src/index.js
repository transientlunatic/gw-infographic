
import * as d3 from 'd3'

import {DetectionTree} from './tree.js';
import {DetectorPennant} from './pennants.js';
import {EventType} from './symbols.js';

var Globalize = require("globalize");

import './style.css';
// import RadicalsImage from './radicals.svg';

// import Events from './events.json';

const request = new XMLHttpRequest();
request.open("GET", "http://data.cardiffgravity.org/gwcat-data/data/gwosc_gracedb.json");
request.responseType = "json";
request.send();




function EventPanel(event){
    this.pane = d3.select("#infographic-pane")
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
	.text(event.name)
}

request.onload = function(){
    const Events = request.response;
    

    // Events.forEach(function(item, index){
    for( var item in Events.data){
	console.log(item);
	new EventPanel(Events.data[item]);
    };

}	      
