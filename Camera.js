/**
 * Created by jamiecho on 10/23/15.
 */
var Camera = function(){
    this.orientation = new Orientation();
    this.center = [0,0,0];
    //for now
    this.fov = 90;
    this.near = 0.1;
    this.far = 100;

    //temporary
    this.yawRate = 0;
    this.pitchRate = 0;
    this.speed = 0;

    this.set = function(name,val){
        this[name] = val;
    };

    this.update = function(){
        var o = this.orientation;
        if(isKeyDown[LEFT])
        {
            this.yawRate += 0.05;
        }
        if(isKeyDown[RIGHT]){
            this.yawRate -= 0.05;
        }
        if(isKeyDown[PGUP]){
            this.pitchRate += 0.05;
        }
        if(isKeyDown[PGDN]){
            this.pitchRate -= 0.05;
        }
        if(isKeyDown[UP]){
            this.speed -= 0.02;
        }
        if(isKeyDown[DOWN]){
            this.speed += 0.02;
        }
        this.yawRate *= 0.9;
        this.pitchRate *= 0.9;
        this.speed *= 0.8;

        o.offsetRot(this.pitchRate,this.yawRate,0.0);
        o.offsetPos(Math.sin(degToRad(o.rot.y))*this.speed,-Math.sin(degToRad(o.rot.x))*this.speed,Math.cos(degToRad(o.rot.y))*this.speed);

        mat4.identity(this["vMat"].buf);
        mat4.rotateX(this["vMat"].buf,degToRad(-o.rot.x));
        mat4.rotateY(this["vMat"].buf,degToRad(-o.rot.y));
        //mat4.translate(this["vMat"].buf,[])
        mat4.translate(this["vMat"].buf,[-o.pos.x, -o.pos.y, -o.pos.z]);

        /*
         mat4.lookAt([o.pos.x, o.pos.y, o.pos.z], [0, 0, 0], [0, 1, 0],this["vMat"].buf);

         */
        mat4.perspective(this.fov,this.gl.viewportWidth/this.gl.viewportHeight,this.near,this.far,this["pMat"].buf);
    };
    this.apply = function(){

        var gl = this.gl;
        applyUniform(gl,this,"vMat",gl.FLOAT_MAT4);
        applyUniform(gl,this,"pMat",gl.FLOAT_MAT4);
       // applyUniform(gl,this,"cPos",gl.FLOAT_VEC3);
    };
    this.setProgram = function(gl,shaderProgram){

        if(this.gl != undefined){
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            locateUniform(gl,this,shaderProgram,"vMat");
            locateUniform(gl,this,shaderProgram,"pMat");
            //locateUniform(gl,this,shaderProgram,"cPos");
        }
        else{
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            initUniform(gl,this,shaderProgram,"vMat",gl.FLOAT_MAT4);
            initUniform(gl,this,shaderProgram,"pMat",gl.FLOAT_MAT4);
            //initUniform(gl,this,shaderProgram,"cPos",gl.FLOAT_VEC3);
        }

    };

};

//may have to adjust locs based on what program is currently being used...
//but then, maybe Camera and Program are in 1:1 relationships,
//meaning that a single camera would only be used for a single program,
//and lightings for one scene would not be used for other.
