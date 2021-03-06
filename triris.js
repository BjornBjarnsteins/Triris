var canvas;
var gl;

var NumVertices  = 36;
var stringVertices = 12 * 6 + 20 * 6;
var kubbaStart = stringVertices + NumVertices;

var yTrans = 0.0;
var xTrans = 0;
var zTrans = 0;

var gridZ = 6.0;
var gridY = 20.0;
var gridX = 6.0;

var points = [];
var colors = [];
var gridCube = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var zDist = -20.0;


var proLoc;
var mvLoc;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    makeGrid();
    makeKubbur();
	
	gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
    
    gl.enable(gl.CULL_FACE);
  	gl.cullFace(gl.FRONT);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );

    //event listeners for mouse
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault();         // Disable drag and drop
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
    	    spinY = ( spinY + (e.offsetX - origX) ) % 360;
            spinX = ( spinX + (origY - e.offsetY) ) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
        }
    } );
    
    // Event listener for keyboard
     window.addEventListener("keydown", function(e){
         switch( e.keyCode ) {
             case 32: //space
             	Manager.interval = 1;
             	break;
             case 38:	// upp ör
               // if (yTrans < 9.5)
                zTrans += 1;
                break;
            case 40:	// niður ör
                //if (yTrans > -9.5) 
                zTrans -= 1;
                break;
            case 37:	//vinstri ör
            	//if (xTrans <= 4.0) 
            	xTrans += 1;
            	break;
            case 39:	//hægri ör
            	//if (xTrans >= -4.0) 
            	xTrans -= 1;
            	break;
            case 65:    //a
                Manager.turn(Manager.xcw);
            	break;
            case 83:	//s
                Manager.turn(Manager.ycw);
            	break;
            case 68:	//d
                Manager.turn(Manager.zcw);
            	break;
            case 90:	//z
                Manager.turn(Manager.xccw);
            	break;
            case 88:	//x
                Manager.turn(Manager.yccw);
            	break;
            case 67:	//c
                Manager.turn(Manager.zccw);
            	break;
            case 75: //k
            	Manager.checkLevelCheat = true;
            	Manager.checkLevelFloor++;
            	break;
        	}
     }  );  

    // Event listener for mousewheel
     window.addEventListener("mousewheel", function(e){
         if( e.wheelDelta > 0.0 ) {
             zDist += 0.1;
         } else {
             zDist -= 0.1;
         }
     }  );  

    render();
}

///////////////////////////////////////////////////////
function makeKubbur() {
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function quad(a, b, c, d) 
{
	var vertices = [
        vec3( -1, -1,  0 ),
        vec3( -1,  0,  0 ),
        vec3(  0,  0,  0 ),
        vec3(  0, -1,  0 ),
        vec3( -1, -1, -1 ),
        vec3( -1,  0, -1 ),
        vec3(  0,  0, -1 ),
        vec3(  0, -1, -1 )
    ];

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices
    
    //vertex color assigned by the index of the vertex
    
    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        //colors.push( vertexColors[indices[i]] );
    
        // for solid colored faces use 
        colors.push(vertexColors[7]);    
    } 
}
//----------------------------------------------------------------------------
// Define the transformation scale here (two scale functions in MV.js)

function scale4( x, y, z )
{
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0][0] = x;
    result[1][1] = y;
    result[2][2] = z;

    return result;
}

/*function randomKubbur(x, y, z, check) {
	kubbur(x, y, z);
	
	var which = randomGen();
	var side = randomGen();

	if (which <= 2) {
		if (side <= 2.5) kubbur(x-1, y, z, true);
		else kubbur(x+1, y, z, true);
	}
	else if(which <= 3)
		if (side <= 2.5) kubbur(3.0, 18.0, 3.0, true);
		else kubbur(3.0, 20.0, 3.0, true);
	else {
		if (side <= 2.5) kubbur(3.0, 19.0, 4.0, true);
		else kubbur(3.0, 19.0, 2.0, true);
	}
}

function randomGen() {
	return Math.random() * (4 - 1) + 1;
}*/
	

function render()
{

    var proj = perspective( 60.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));
    
    var ctm = lookAt( vec3(0.0, 0.0, zDist), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    ctm = mult( ctm, rotate( parseFloat(spinX), [1, 0, 0] ) );
    ctm = mult( ctm, rotate( parseFloat(spinY), [0, 1, 0] ) );
    
    //makeTetra(xTrans, yTrans, zTrans); 
    
		
	//kubbaRender(ctm, xTrans, yTrans, zTrans);

    Manager.updateThenRender(ctm, xTrans, zTrans);
    
    xTrans = 0;
    zTrans = 0;
    Manager.interval = 1000;
    console.log(Manager.checkLevelCheat);
    Manager.checkLevelCheat = false;
    
	//console.log("xTrans = " + xTrans + " yTrans = "+ yTrans + " zTrans = " + zTrans);
    

    requestAnimFrame( render );
}
