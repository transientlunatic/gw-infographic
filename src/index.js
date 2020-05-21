
import * as d3 from 'd3'

import {DetectionTree} from './tree.js';
import {DetectorPennant} from './pennants.js';
import {EventType} from './symbols.js';

var Globalize = require("globalize");

import './style.css';
// import RadicalsImage from './radicals.svg';

import Events from './events.json';



function EventPanel(event){
    this.pane = d3.select("#infographic-pane")
	.append("svg")
	.attr("width", "100px")
	.attr("viewBox", "0 0 400 400");

    this.detection_box = this.pane.append("rect")
	.attr("width", "400px")
	.attr("height", "400px")
	.classed(`box ${event.run}`, true);
    //
   
    let detection_tree = new DetectionTree(event.masses.primary,
					   event.masses.secondary,
					   event.masses.remnant,
					   event.masses.energy,
					   this.pane, 200, 90, 2);

    let pennants = new DetectorPennant(event.detectors, this.pane);

    let eventsymbol = new EventType(event.type, this.pane, 1, 6);

    this.pane.append("text")
	.attr("y", "395")
	.classed("event-label", true)
	.text(event.name);
}

Events.sort().reverse().forEach(function(item, index){
    new EventPanel(item);
}, this);
	      
