"use strict";
var WGL = {};
WGL.demoFunction = "rectangle";
WGL.canvasID = "displayCanvas";

WGL.startSession = function() {
	WGL.canvas = document.getElementById(WGL.canvasID);
	WGL.gl = WGL.canvas.getContext("webgl");
	WGL.gl.viewport(0, 0, WGL.canvas.width, WGL.canvas.height);
};

WGL.main = function() {
	WGL.startSession();
	
	console.log("Run Function:",WGL.demoFunction);

	WGL[WGL.demoFunction]();
};

window.onload = WGL.main;