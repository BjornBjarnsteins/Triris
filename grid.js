
function makeGrid() {
	createStrings();
	colorCube();
}

function colorCube()
{
    quadGrid( 1, 0, 3, 2 );
    quadGrid( 2, 3, 7, 6 );
    quadGrid( 3, 0, 4, 7 );
    quadGrid( 6, 5, 1, 2 );
    quadGrid( 4, 5, 6, 7 );
    quadGrid( 5, 4, 0, 1 );
}

function createStrings() {
	var xCoord = 3.01;
	var yCoord = 10.01;
	var zCoord = 3.01;
	
	var yChange = (gridY / 2)+0.01;
	var zChange = (gridZ / 2)+0.01;
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
    	
    	
    	yChange += gridY / 20;
	}
	
}


function quadGrid(a, b, c, d) 
{
	var xCoord = 3.02;
	var yCoord = 10.02;
	var zCoord = 3.02;
	
	var vertices = [
        vec3( -xCoord, -yCoord,  zCoord ),
        vec3( -xCoord,  yCoord,  zCoord ),
        vec3(  xCoord,  yCoord,  zCoord ),
        vec3(  xCoord, -yCoord,  zCoord ),
        vec3( -xCoord, -yCoord, -zCoord ),
        vec3( -xCoord,  yCoord, -zCoord ),
        vec3(  xCoord,  yCoord, -zCoord ),
        vec3(  xCoord, -yCoord, -zCoord )
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
