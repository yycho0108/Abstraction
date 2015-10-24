/**
 * Created by jamiecho on 10/23/15.
 */
var angle = 0;

var Entity = function(gl,shaderProgram,surface,texture){ //has surface, texture, position/rotation.
    this.surface = surface
    this.texture = texture;//change later
    this.orientation = new Orientation();
    initUniform(gl,this,shaderProgram,"mMat",gl.FLOAT_MAT4);
    this.update = function(){
        mat4.identity(this["mMat"].buf);

        mat4.rotate(this["mMat"].buf, angle+=0.01, [0.1,1,0.5]);
        //ADDED ONLY TO SHOW THE LIGHT EFFECT!!
        mat4.translate(this["mMat"].buf,[this.orientation.pos.x,this.orientation.pos.y,this.orientation.pos.z]);
    };
    this.apply= function(){
        this.texture.apply();
        this.surface.apply();
        //this.orientation.apply();
        applyUniform(gl,this,"mMat",gl.FLOAT_MAT4);
    };
    this.draw = function(){
        gl.useProgram(shaderProgram);
        this.surface.draw();
    }
};