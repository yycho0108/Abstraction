/**
 * Created by jamiecho on 10/23/15.
 */
var angle = 0;
var prevTime = new Date().getTime();

var Scene = function(){
    var that =this;
    this.light = [];
    this.obj = [];
    this.camera = null;

    this.draw = function(){
        var gl = this.gl;
        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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
            applyUniform(that.shaderProgram,"xFormMat",gl.FLOAT_MAT4,that["xFormMat"].buf);
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
        var curTime = new Date().getTime();
        angle += (curTime - prevTime)/50; // = 50 deg per sec
        prevTime = curTime;
        requestAnimationFrame(run);
        for(var i=0;i<that.obj.length;++i){
            if(!that.obj[i].texture.ready)
            return;
        }
        that.useTexture.buf = document.getElementById("useTexture").checked;
        that.shiny.buf = parseFloat(document.getElementById("shiny").value);
        applyUniform(that.shaderProgram,"useTexture",gl.BOOL,that["useTexture"].buf);
        applyUniform(that.shaderProgram,"shiny",gl.FLOAT,that["useTexture"].buf);

        that.obj[0].setPos(30*Math.cos(degToRad(angle)),0,30*Math.sin(degToRad(angle)));
        that.obj[1].setPos(5*Math.cos(degToRad(-angle*3)),0,5*Math.sin(degToRad(-angle*3)));

        if(document.getElementById("perFrag").checked){
            that.setProgram(that.gl,shader_2);
            that.camera.setProgram(gl,shader_2);
            that.light.forEach(function(l){l.setProgram(gl,shader_2);});
            that.obj.forEach(function(o){o.setProgram(gl,shader_2);});
            that.gl.useProgram(shader_2);
        }
        else{
            that.setProgram(that.gl,shader_1);
            that.camera.setProgram(gl,shader_1);
            that.light.forEach(function(l){l.setProgram(gl,shader_1);});
            that.obj.forEach(function(o){o.setProgram(gl,shader_1);});
            that.gl.useProgram(shader_1);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER,null);
        that.draw();
    };
    this.setProgram = function(gl,shaderProgram){
        if(this.gl != undefined){
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            /*locateUniform(this.shaderProgram,"xFormMat");
            locateUniform(this.shaderProgram,"useTexture");
            locateUniform(this.shaderProgram,"shiny");*/
        }
        else {
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            initUniform(this, this.shaderProgram, "xFormMat", gl.FLOAT_MAT4);
            initUniform(this, this.shaderProgram, "useTexture", gl.BOOL);
            initUniform(this, this.shaderProgram, "shiny", gl.FLOAT);
        }

    }
};