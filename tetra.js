
function kubbaRender(ctm, x, y, z) {
	//var kubbaReset = kubbaStart;
	x = ((x * width) - 2);
	z = ((z * width) - 2);
	y = ((y * height) - 9);
	
	var ctmTetra = mult ( ctm, translate(x, y, z));
	
	gl.uniformMatrix4fv(mvLoc, false, flatten(ctmTetra));
	gl.drawArrays( gl.TRIANGLES, kubbaStart, NumVertices );


	
	/*var ctmTetra1 = mult (ctmTetra, translate(2.0, 0.0, 0.0));
	
	gl.uniformMatrix4fv(mvLoc, false, flatten(ctmTetra1));
	gl.drawArrays( gl.TRIANGLES, kubbaStart, NumVertices );
	
	var ctmTetra2 = mult (ctmTetra, translate(2.0, 1.0, 0.0));
	
	gl.uniformMatrix4fv(mvLoc, false, flatten(ctmTetra2));
	gl.drawArrays( gl.TRIANGLES, kubbaStart, NumVertices );*/
}
	