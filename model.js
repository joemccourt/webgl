"use strict";

function createShader(str, type) {
	var gl = WGL.gl;

	var shader = gl.createShader(type);
	gl.shaderSource(shader, str);
	gl.compileShader(shader);
	return shader;
}

function createProgram(vstr, fstr) {
	var gl = WGL.gl;

	var program = gl.createProgram();
	var vshader = createShader(vstr, gl.VERTEX_SHADER);
	var fshader = createShader(fstr, gl.FRAGMENT_SHADER);
	gl.attachShader(program, vshader);
	gl.attachShader(program, fshader);
	gl.linkProgram(program);
	return program;
}

WGL.clear = function() {
	var gl = WGL.gl;

	gl.clearColor(0.0,1.0,0.0,1.0);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	
	gl.clear(gl.COLOR_BUFFER_BIT);	
};

WGL.triangle = function() {
	var gl = WGL.gl;

	var vertexPosBuffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
	var vertices = [-0.5, -0.5, 0.5, -0.5, 0, 0.5];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	var vs = 'attribute vec2 pos;' +
		'void main() { gl_Position = vec4(pos,0,1); }';
	var fs = 'precision mediump float;' +
		'void main() { gl_FragColor = vec4(0,1,0,1); }';

	var program = createProgram(vs,fs);
	gl.useProgram(program);

	program.vertexPosAttrib = gl.getAttribLocation(program, 'pos');
	gl.enableVertexAttribArray(program.vertexPosAttrib);

	gl.vertexAttribPointer(program.vertexPosAttrib, 2, gl.FLOAT, false, 0, 0);

	gl.drawArrays(gl.TRIANGLES, 0, 3);
};

WGL.rectangle = function() {
	var gl = WGL.gl;

	var vs = 'attribute vec2 pos;' +
		'attribute vec4 a_vertexColor;' +
		'varying vec4 v_color;' +  
		'void main() { gl_Position = vec4(pos,0,1); v_color = a_vertexColor; }';
	var fs = 'precision mediump float;' +
		'varying vec4 v_color;' +
		'void main() { gl_FragColor = v_color; }';

	var program = createProgram(vs,fs);
	gl.useProgram(program);

	var vertexPosBuffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
	var vertices = [-0.5, -0.5, 0.5, -0.5, 0, 0.5];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	program.vertexPosAttrib = gl.getAttribLocation(program, 'pos');
	gl.enableVertexAttribArray(program.vertexPosAttrib);
	gl.vertexAttribPointer(program.vertexPosAttrib, 2, gl.FLOAT, false, 0, 0);

	var colors = [1,0.5,0,1,0,0,1,1,0,1,0,1];
	var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);	
	

	program.vertexColorLoc = gl.getAttribLocation(program, "a_vertexColor");
	gl.enableVertexAttribArray(program.vertexColorloc);


	gl.vertexAttribPointer(program.vertexColorLoc, 4, gl.FLOAT, false, 0, 0);

	gl.drawArrays(gl.TRIANGLES, 0, 3);
};