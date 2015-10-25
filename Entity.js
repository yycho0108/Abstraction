/**
 * Created by jamiecho on 10/23/15.
 */
var angle = 0;

var Entity = function(gl,shaderProgram,surface,texture){ //has surface, texture, position/rotation.
    this.gl = gl;
    this.surface = surface;
    this.texture = texture;//change later
    this.orientation = new Orientation();

    this.update = function(){
        mat4.identity(this["mMat"].buf);
        angle += 0.05;
        mat4.translate(this["mMat"].buf,[this.orientation.pos.x+ 3*Math.cos(angle),this.orientation.pos.y,this.orientation.pos.z + 3*Math.sin(angle)]);
        mat4.rotate(this["mMat"].buf, angle, [0,1,0]);
        //ADDED ONLY TO SHOW THE LIGHT EFFECT!!

    };
    this.apply= function(){
        this.texture.apply();
        this.surface.apply();
        //this.orientation.apply();
        applyUniform(gl,this,"mMat",gl.FLOAT_MAT4);
    };
    this.draw = function(){
        gl.useProgram(this.shaderProgram);
        this.surface.draw();
    }
    this.setProgram = function(gl, shaderProgram){
        this.shaderProgram = shaderProgram;
        initUniform(gl,this,shaderProgram,"mMat",gl.FLOAT_MAT4);
        this.surface.setProgram(gl,shaderProgram);
        this.texture.setProgram(gl,shaderProgram);
    }

    this.setProgram(gl, shaderProgram);

};