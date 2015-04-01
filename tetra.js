

function makeTetra(x,y,z) {
	gridCube.push([x, y, z]);
}

function kubbur(x, y, z)
{
	kubbaCount++;
	kubbaVertices += 36;
    tetraQuad( 1, 0, 3, 2, x, y, z );
    tetraQuad( 2, 3, 7, 6, x, y, z );
    tetraQuad( 3, 0, 4, 7, x, y, z );
    tetraQuad( 6, 5, 1, 2, x, y, z );
    tetraQuad( 4, 5, 6, 7, x, y, z );
    tetraQuad( 5, 4, 0, 1, x, y, z );
}

function tetraQuad(a, b, c, d, x, y, z) 
{
	x = ((x*width)-10);
	z = ((z*width) - 11);
	y = ((y*height)-20);
	
	
	var vertices = [
        vec3( x, y,  z+width ),
        vec3( x,  y+height,  z+width ),
        vec3(  x+width,  y+height,  z+width ),
        vec3(  x+width, y,  z+width ),
        vec3( x, y, z ),
        vec3( x,  y+height, z ),
        vec3(  x+width,  y+height, z ),
        vec3(  x+width, y, z )
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

function tetrarender(ctm, xTrs, yTrs) {
	var kubbaReset = kubbaStart;
	var ctmTetra = mult ( ctm, translate(xTrs, yTrs, 1.0));
	
	gl.uniformMatrix4fv(mvLoc, false, flatten(ctmTetra));
	for (var i = 0; i < kubbaCount; i++) {
		gl.drawArrays( gl.TRIANGLES, kubbaReset, NumVertices );
		kubbaReset += NumVertices;
		}
	
	/*var ctmTetra1 = mult (ctmTetra, translate(2.0, 0.0, 0.0));
	
	gl.uniformMatrix4fv(mvLoc, false, flatten(ctmTetra1));
	gl.drawArrays( gl.TRIANGLES, tetraStart, NumVertices );
	
	var ctmTetra2 = mult (ctmTetra, translate(2.0, 1.0, 0.0));
	
	gl.uniformMatrix4fv(mvLoc, false, flatten(ctmTetra2));
	gl.drawArrays( gl.TRIANGLES, tetraStart, NumVertices );*/
}
	