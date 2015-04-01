Manager = {
    canvas : document.getElementById( "gl-canvas" ),

    interval : 1000,

    lastUpdateTime : Date.now(),

    // base inniheldur lenta kubba, á forminu yxz
    setup : function() {
        this.base = newArray();
        for (var i = 0; i < 20; i++) {
            this.base[i] = new Array();
            for (var j = 0; j < 6; j++) {
                this.base[i][j] = new Array();
                for (var k = 0; k < 6; k++) {
                    this.base[i][j][k] = 0;
                }
            }
        }
    },

    activeBlocks : null,

    generateBlock : function() {
        r = Math.random();

        // Beinn kubbur
        if (r < 0.5) {
            this.activeBlocks = [[19, 3, 3], [18, 3, 3], [17, 3, 3]];
        } else {
            this.activeBlocks = [[19, 3, 3], [18, 3, 3], [18, 3, 2]];
        }
    },

    drawBlockIn : function(x, y, z) {
       return; 
    }

    updateThenRender : function(ctm) {
        if (Date.now() - this.lastUpdateTime < this.interval) return;

        doMove = true;
        for (var i = 0; i < 3; i++) {
            var x = this.activeBlocks[i][0];
            var y = this.activeBlocks[i][1];
            var z = this.activeBlocks[i][2];

            if (this.base[x][y][z] === 1 || y === 0) {
                doMove = false;
            }
        }

        if (doMove) {

            for (var i = 0; i < 3; i++) {
                this.activeBlocks[i][0]--;
            }
        } else {
            for (var i = 0; i < 3; i++) {
                var x = this.activeBlocks[i][0];
                var y = this.activeBlocks[i][1];
                var z = this.activeBlocks[i][2];
                
                this.base[x][y][z] = 1;
            }
        }

        // Draw stuff
        
        for (var x = 0; x < 20; x++) {
            for (var y = 0; y < 6; y++) {
                for (var z = 0; z < 6; z++) {
                    //teikna kubb
                }
            }
        }

        this.lastUpdateTime = Date.now();
    }
};

Manager.setup();
