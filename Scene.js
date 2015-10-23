/**
 * Created by jamiecho on 10/23/15.
 */
var Scene = function(gl,shaderProgram){
    this.obj = [];
    this.light = [];
    this.gl = gl;
    this.camera = null;

    initUniform(gl,this,shaderProgram,"xFormMat",gl.FLOAT_MAT4);

    var that =this;

    this.draw = function(){
        var gl = this.gl;
        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT,gl.DEPTH_BUFFER_BIT);
        gl.viewport(0,0,gl.viewportWidth,gl.viewportHeight);
        gl.enable(gl.DEPTH_TEST);
        this.camera.update();
        this.camera.apply();

        this.light.forEach(function(l){
            l.update();
            l.apply();
        });

        this.obj.forEach(function(o){
            o.update();
            var tmp = new Float32Array(mat4.multiply(that.camera["vMat"].buf,o["mMat"].buf));
            that["xFormMat"].buf =  mat4.transpose(mat4.inverse(tmp));
            applyUniform(gl,that,"xFormMat",gl.FLOAT_MAT4);
            o.apply();
            o.draw();
        });
    };

    this.push = function(name,value){
        this[name].push(value);
    };
    this.set = function(name,value){
        this[name] = value;
    };
    this.run = function run(){
        requestAnimationFrame(run);
        for(var i=0;i<that.obj.length;++i){
            if(!that.obj[i].texture.ready())
            return;
        }
        that.draw();
    }
};