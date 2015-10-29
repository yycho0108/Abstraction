/**
 * Created by jamiecho on 10/23/15.
 */

var Entity = function(surface,texture,specular){ //has surface, texture, position/rotation.

    this.surface = surface;

    this.texture = texture;//change later
    if(specular !== undefined)
        this.specular = specular;

    this.orientation = new Orientation();

    this.update = function(){
        this["mMat"].buf = this.localMat(); //now recursive!
        //Individual stuff...


        //mat4.identity(this["mMat"].buf);
        //mat4.translate(this["mMat"].buf,[this.orientation.pos.x,this.orientation.pos.y,this.orientation.pos.z]);
        //mat4.rotate(this["mMat"].buf, angle, [0,1,0]);
        //ADDED ONLY TO SHOW THE LIGHT EFFECT!!

    };
    this.localMat = function(){
        var m = mat4.create();
        var o = this.orientation;
        mat4.identity(m);
        mat4.rotateX(m, o.rot.x);
        mat4.rotateY(m, o.rot.y);
        mat4.translate(m,[o.pos.x,o.pos.y,o.pos.z]);

        if (this.parentEntity){
            return mat4.multiply(m,this.parentEntity.localMat()); //maybe reverse order?
        }else{
            return m;
        }

    };
    this.apply= function(){
        if(this.texture)
            this.texture.apply();
        this.surface.apply();
        if(this.specular !== undefined)
            this.specular.apply();
        //this.orientation.apply();
        applyUniform(this.shaderProgram,"mMat",this["mMat"].buf);
        applyUniform(this.shaderProgram,"objColor",this["objColor"].buf);
    };
    this.draw = function(){
        this.gl.useProgram(this.shaderProgram);
        this.surface.draw();
    };
    this.setProgram = function(gl, shaderProgram){
        if(this.gl !== undefined){
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            //locateUniform(shaderProgram,"mMat");
            //locateUniform(shaderProgram,"objColor");
        }
        else{
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            initUniform(this,shaderProgram,"mMat");
            this.objColor = {buf:vec3.create()};

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
        if(this.texture !== undefined)
            this.texture.setProgram(gl,shaderProgram);
        if(this.specular !== undefined)
            this.specular.setProgram(gl,shaderProgram);
    };
    this.setParent = function(obj){
        this.parentEntity = obj;
    };
    this.offsetPos = function(dx,dy,dz){this.orientation.offsetPos(dx,dy,dz);};
    this.setPos = function(x,y,z){this.orientation.setPos(x,y,z);}
    //this.setProgram(gl, shaderProgram);

};