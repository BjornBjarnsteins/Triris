var gridZ = 20.0;
var gridY = 40.0;

var NumVertices  = 36;
var stringVertices = 12 * 6 + 20 * 6;

function makeGrid() {
	createStrings();
	colorCube();
}

function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function createStrings() {
	var xCoord = 10.03;
	var yCoord = 20.03;
	var zCoord = 10.03;
	
	var yChange = (gridY / 2) + 0.3;
	var zChange = (gridZ / 2) + 0.3;
	for (var i = 0; i < 6; i++) {
		//Horizontal
		points.push([-xCoord, -yCoord, gridZ - zChange ]);
   	 	points.push([ xCoord, -yCoord, gridZ - zChange]);
   	 	points.push([-xCoord,  yCoord, gridZ - zChange ]);
   	 	points.push([-xCoord, -yCoord, gridZ - zChange]);
   	 	points.push([xCoord,  yCoord, gridZ - zChange ]);
   	 	points.push([xCoord, -yCoord, gridZ - zChange]);
   	 	points.push([xCoord,  yCoord, gridZ - zChange ]);
   	 	points.push([xCoord, -yCoord, gridZ - zChange]);
   	 	points.push([gridZ - zChange, yCoord, zCoord]);
    	points.push([gridZ - zChange, -yCoord,zCoord]);
    	points.push([gridZ - zChange, -yCoord, zCoord]);
    	points.push([gridZ - zChange, -yCoord,-zCoord]);
   		
   		colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
   		colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
   		colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
   		colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
   		colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
   		colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
   		colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
   		colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
   		colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
   		colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
   		
   		zChange += gridZ/6;
   	}
   		
    
	//}
	//zChange = 5.0;
	for (var i = 0; i < 20; i++) {
		//Vertical
   		points.push([-xCoord, gridY - yChange, -zCoord]);
    	points.push([-xCoord, gridY - yChange,  zCoord]);
    	points.push([xCoord, gridY - yChange, -zCoord]);
    	points.push([xCoord, gridY - yChange,  zCoord]);
    	points.push([xCoord, gridY - yChange,  zCoord]);
    	points.push([-xCoord, gridY - yChange, zCoord]);
    	
   		
   		colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	
    	
    	yChange += 2.0;
	}
	
}

function quad(a, b, c, d) 
{
	var vertices = [
        vec3( -10.05, -20.05,  10.05 ),
        vec3( -10.05,  20.05,  10.05 ),
        vec3(  10.05,  20.05,  10.05 ),
        vec3(  10.05, -20.05,  10.05),
        vec3( -10.05, -20.05, -10.05 ),
        vec3( -10.05,  20.05, -10.05 ),
        vec3(  10.05,  20.05, -10.05 ),
        vec3(  10.05, -20.05, -10.05 )
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
        colors.push(vertexColors[a]);    
    } 
}

function gridrender(ctm)	{
	gl.uniformMatrix4fv(mvLoc, false, flatten(ctm));
	
	gl.drawArrays( gl.LINES, 0, stringVertices);
	gl.drawArrays( gl.TRIANGLES, stringVertices, NumVertices );	
}