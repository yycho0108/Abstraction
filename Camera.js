/**
 * Created by jamiecho on 10/23/15.
 */
var Camera = function(gl,shaderProgram){
    this.gl = gl;
    this.shaderProgram = shaderProgram;
    this.orientation = new Orientation();

    initUniform(gl,this,shaderProgram,"vMat",gl.FLOAT_MAT4);
    initUniform(gl,this,shaderProgram,"pMat",gl.FLOAT_MAT4);


    //for now
    this.fov = 45;
    this.near = 0.1;
    this.far = 100;
    //

    this.set = function(name,val){
        this[name] = val;
    };
    this.update = function(){
        var o = this.orientation;
        //mat4.identity(this["vMat"]);
        //mat4.rotateX(this["vMat"],degToRad(-o.rot.x));
        //mat4.rotateY(this["vMat"],degToRad(-o.rot.y));
        mat4.lookAt([0, 0, 1], [0, 0, 0], [0, 1, 0],this["vMat"].buf);
        mat4.translate(this["vMat"].buf, [o.pos.x,o.pos.y,o.pos.z]);
        mat4.perspective(this.fov,this.gl.viewportWidth/this.gl.viewportHeight,this.near,this.far,this["pMat"].buf);
    };
    this.apply = function(){

        var gl = this.gl;
        applyUniform(gl,this,"vMat",gl.FLOAT_MAT4);
        applyUniform(gl,this,"pMat",gl.FLOAT_MAT4);
    };
};

//may have to adjust locs based on what program is currently being used...
//but then, maybe Camera and Program are in 1:1 relationships,
//meaning that a single camera would only be used for a single program,
//and lightings for one scene would not be used for other.
