var gridZ = 12.0;
var gridY = 20.0;

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
	var yChange = 10.05;
	var zChange = 6.05;
	for (var i = 0; i < 6; i++) {
		//Horizontal
		points.push([-6.05, -10.05, gridZ - zChange ]);
   	 	points.push([ 6.05, -10.05, gridZ - zChange]);
   	 	points.push([-6.05,  10.05, gridZ - zChange ]);
   	 	points.push([-6.05, -10.05, gridZ - zChange]);
   	 	points.push([6.05,  10.05, gridZ - zChange ]);
   	 	points.push([6.05, -10.05, gridZ - zChange]);
   	 	points.push([6.05,  10.05, gridZ - zChange ]);
   	 	points.push([6.05, -10.05, gridZ - zChange]);
   	 	points.push([gridZ - zChange, 10.05, 6.05]);
    	points.push([gridZ - zChange, -10.05,6.05]);
    	points.push([gridZ - zChange, -10.05, 6.05]);
    	points.push([gridZ - zChange, -10.05,-6.05]);
   		
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
   		
   		zChange += 12/6;
   	}
   		
    
	//}
	//zChange = 5.0;
	for (var i = 0; i < 20; i++) {
		//Vertical
   		points.push([-6.01, gridY - yChange, -6.01]);
    	points.push([-6.01, gridY - yChange,  6.01]);
    	points.push([6.01, gridY - yChange, -6.01]);
    	points.push([6.01, gridY - yChange,  6.01]);
    	points.push([6.01, gridY - yChange,  6.01]);
    	points.push([-6.01, gridY - yChange, 6.01]);
    	
   		
   		colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	colors.push([ 0.0, 0.0, 0.0, 1.0 ]);
    	
    	
    	yChange += 1.0;
	}
	
}

function quad(a, b, c, d) 
{
	var vertices = [
        vec3( -6.05, -10.05,  6.05 ),
        vec3( -6.05,  10.05,  6.05 ),
        vec3(  6.05,  10.05,  6.05 ),
        vec3(  6.05, -10.05,  6.05),
        vec3( -6.05, -10.05, -6.05 ),
        vec3( -6.05,  10.05, -6.05 ),
        vec3(  6.05,  10.05, -6.05 ),
        vec3(  6.05, -10.05, -6.05 )
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