/**
 * Created by jamiecho on 10/23/15.
 */
var angle = 0;

var Entity = function(shaderProgram,surface,texture){ //has surface, texture, position/rotation.

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
        applyUniform(this.gl,this,"mMat",this.gl.FLOAT_MAT4);
    };
    this.draw = function(){
        this.gl.useProgram(this.shaderProgram);
        this.surface.draw();
    };
    this.setProgram = function(gl, shaderProgram){

        if(this.gl !== undefined){
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            locateUniform(gl,this,shaderProgram,"mMat");
        }
        else{
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            initUniform(gl,this,shaderProgram,"mMat",gl.FLOAT_MAT4);
        }
        this.surface.setProgram(gl,shaderProgram);
        this.texture.setProgram(gl,shaderProgram);
    };

    //this.setProgram(gl, shaderProgram);

};