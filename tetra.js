function tetra()
{
    tetraQuad( 1, 0, 3, 2 );
    tetraQuad( 2, 3, 7, 6 );
    tetraQuad( 3, 0, 4, 7 );
    tetraQuad( 6, 5, 1, 2 );
    tetraQuad( 4, 5, 6, 7 );
    tetraQuad( 5, 4, 0, 1 );
}

function tetraQuad(a, b, c, d) 
{
	var vertices = [
        vec3( -1.0, -0.5,  1.0 ),
        vec3( -1.0,  0.5,  1.0 ),
        vec3(  1.0,  0.5,  1.0 ),
        vec3(  1.0, -0.5,  1.0 ),
        vec3( -1.0, -0.5, -1.0 ),
        vec3( -1.0,  0.5, -1.0 ),
        vec3(  1.0,  0.5, -1.0 ),
        vec3(  1.0, -0.5, -1.0 )
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