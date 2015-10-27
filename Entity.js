/**
 * Created by jamiecho on 10/23/15.
 */

var Entity = function(shaderProgram,surface,texture,specular){ //has surface, texture, position/rotation.

    this.surface = surface;
    this.texture = texture;//change later
    if(specular !== undefined)
        this.specular = specular;

    this.orientation = new Orientation();

    this.update = function(){
        mat4.identity(this["mMat"].buf);
        mat4.translate(this["mMat"].buf,[this.orientation.pos.x,this.orientation.pos.y,this.orientation.pos.z]);
        //mat4.rotate(this["mMat"].buf, angle, [0,1,0]);
        //ADDED ONLY TO SHOW THE LIGHT EFFECT!!

    };
    this.apply= function(){
        this.texture.apply();
        this.surface.apply();
        if(this.specular !== undefined)
            this.specular.apply();
        //this.orientation.apply();
        applyUniform(this.gl,this,"mMat",this.gl.FLOAT_MAT4);
        applyUniform(this.gl,this,"objColor",this.gl.FLOAT_VEC3);
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
            locateUniform(gl,this,shaderProgram,"objColor");
        }
        else{
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            initUniform(gl,this,shaderProgram,"mMat",gl.FLOAT_MAT4);
            initUniform(gl,this,shaderProgram,"objColor",gl.FLOAT_VEC3);

            if(Entity.objColor == undefined){
                Entity.objColor = [0,0,0];
            }

            Entity.objColor[2] += 0.1;
            if(Entity.objColor[2] >= 1){
                Entity.objColor[2] = 0;
                Entity.objColor[1] += 0.1;
                if(Entity.objColor[1] >= 1){
                    Entity.objColor[0] += 0.1;
                    Entity.objColor[1] = 0;
                }
            }
            vec3.set(Entity.objColor,this.objColor.buf);
        }
        this.surface.setProgram(gl,shaderProgram);
        this.texture.setProgram(gl,shaderProgram);
        if(this.specular !== undefined)
            this.specular.setProgram(gl,shaderProgram);
    };

    //this.setProgram(gl, shaderProgram);

};