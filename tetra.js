function kubbaRender(ctm, x, y, z) {
	x -= 2;
	y -= 9;
	z -= 2;

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
	