Manager = {
    canvas : document.getElementById( "gl-canvas" ),

    interval : 1000,

    lastUpdateTime : Date.now(),

    // base inniheldur lenta kubba, á forminu xyz
    setup : function() {
        this.base = new Array();
        for (var i = 0; i < 6; i++) {
            this.base[i] = new Array();
            for (var j = 0; j < 20; j++) {
                this.base[i][j] = new Array();
                for (var k = 0; k < 6; k++) {
                    this.base[i][j][k] = 0;
                }
            }
        }

        this.generateBlock();
    },

    activeBlocks : null,

    generateBlock : function() {
        r = Math.random();
        t = Math.random();
	
		if (t < 0.5) {
        // Beinn kubbur
       		if (r < 0.33) {
       	 	this.activeBlocks = [[3, 19, 3], [3, 18, 3], [3, 17, 3]];
      	 	} else if (r < 0.66) {
        	    this.activeBlocks = [[3, 19, 2], [3, 19, 3], [3, 19, 4]];
        	} else
       	 	this.activeBlocks = [[2, 19, 3], [3, 19, 3], [4, 19, 3]];
       		}
       	else {
       	//Hinsegin kubbur
       		
       	}
    },
    
    checkLevel : function() {
    	
    	checkLevel = 0;
    	
    	for (var i = 0; i < 20; i++) {
    		for (var j = 0; j < 6; j++) {
    			for (var k = 0; k < 6; k++) {
    				if (this.base[j][i][k] === 1) checkLevel++;
    			} 
    		}
    		if (checkLevel === 36)	{
    			checkLevel = 0;
    			eraseFloor(i);
    	}
    	}
    },	
    
    eraseFloor : function(j) {
    	for (var i = 0; i < 6; i++) {
    		for (var t = j; t < 20; t++) {
            	for (var k = 0; k < 6; k++) {
            	   if (t < 19) this.base[i][t][k] = this.base[i][t+1][k];
            	   else this.base[i][t][k] = 0;
            	}
        	}
        }	
    },

    updateThenRender : function(ctm, xtrans, ztrans) {
         
         
        var collCheckX = false; 
        var collCheckZ = false;
        
    	for (var i = 0; i < 3; i++) {
            if (!this.activeBlocks) break;
            var x = this.activeBlocks[i][0];
            var z = this.activeBlocks[i][2];
			
			if ((x + xTrans) < 0 || (x + xTrans) > 5) collCheckX = true;
			if ((z + zTrans) < 0 || (z + zTrans) > 5) collCheckZ = true;
		}
		
		for (var i = 0; i < 3; i++) {
          	if (!this.activeBlocks) break;
           	var x = this.activeBlocks[i][0];
           	var z = this.activeBlocks[i][2];
		
			if (!collCheckX) this.activeBlocks[i][0] += xtrans;
			if (!collCheckZ) this.activeBlocks[i][2] += ztrans;
		}
    
    if (Date.now() - this.lastUpdateTime >= this.interval) { 
    	
    	console.log("tick");
		
        doMove = true;
        for (var i = 0; i < 3; i++) {
            if (!this.activeBlocks) break;
            var x = this.activeBlocks[i][0];
            var y = this.activeBlocks[i][1];
            var z = this.activeBlocks[i][2];

            if (y === 0 || this.base[x][y-1][z] === 1 ) {
                doMove = false;
            }
        }

        if (doMove) {
            for (var i = 0; i < 3; i++) {
                if (!this.activeBlocks) break;
                this.activeBlocks[i][1]--;
            }
        } else {
            for (var i = 0; i < 3; i++) {
                if (!this.activeBlocks) break;
                var x = this.activeBlocks[i][0];
                var y = this.activeBlocks[i][1];
                var z = this.activeBlocks[i][2];
                
                this.base[x][y][z] = 1;
                checkLevel();
            } 
    		this.generateBlock();
        }

        this.lastUpdateTime = Date.now();
    }
    else {
    	// Draw stuff
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
         for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 6; x++) {
                for (var z = 0; z < 6; z++) {
                    if (this.base[x][y][z] === 1) {
                        kubbaRender(ctm, x, y, z);
                    }
                }
            }
        }
        
    	 for (var i = 0; i < 3; i++) {
            if (!this.activeBlocks) break;
            var x = this.activeBlocks[i][0];
            var y = this.activeBlocks[i][1];
            var z = this.activeBlocks[i][2];
           
            kubbaRender(ctm, x, y, z);
        }
        
        gridrender(ctm);
    
   	 }
    }
    
};

Manager.setup();
