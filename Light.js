/**
 * Created by jamiecho on 10/23/15.
 */
//Light is applied across programs
//therefore it will keep multiple copies of the program.

var Light = function(type){
    var that = this;
    this.type = type;

    this.setProgram = function(gl,shaderProgram){
        if(this.gl !== undefined){
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            switch(that.type){
                case "pt":
                    locateUniform(that.gl,that,shaderProgram,"ptLightPos");
                    locateUniform(that.gl,that,shaderProgram,"ptLightCol");
                    break;
                case "dir":
                    locateUniform(that.gl,that,shaderProgram,"dirLightDir");
                    locateUniform(that.gl,that,shaderProgram,"dirLightCol");
                    break;
                case "amb":
                    locateUniform(that.gl,that,shaderProgram,"ambLightCol");
                    break;
            }
        }
        else{
            this.gl = gl;
            this.shaderProgram = shaderProgram;

            switch(that.type){
                case "pt":
                    initUniform(that.gl,that,shaderProgram,"ptLightPos", that.gl.FLOAT_VEC3);
                    initUniform(that.gl,that,shaderProgram,"ptLightCol", that.gl.FLOAT_VEC3);
                    break;
                case "dir":
                    initUniform(that.gl,that,shaderProgram,"dirLightDir", that.gl.FLOAT_VEC3);
                    initUniform(that.gl,that,shaderProgram,"dirLightCol", that.gl.FLOAT_VEC3);
                    break;
                case "amb":
                    initUniform(that.gl,that,shaderProgram,"ambLightCol", that.gl.FLOAT_VEC3);
                    break;
            }
        }
    };
    this.set = function(name,val){
            this[name].buf = val;
    };
    this.update = function(){
        //ONLY APPLIES TO THIS OCCASION.
        switch(this.type){
            case "dir":
                this.set("dirLightDir", [ parseFloat(document.getElementById("dirLightX").value),
                    parseFloat(document.getElementById("dirLightY").value),
                    parseFloat(document.getElementById("dirLightZ").value)]);
                this.set("dirLightCol", [ parseFloat(document.getElementById("dirLightR").value),
                    parseFloat(document.getElementById("dirLightG").value),
                    parseFloat(document.getElementById("dirLightB").value)]);
                break;
            case "amb":
                this.set("ambLightCol", [parseFloat(document.getElementById("ambLightR").value),
                    parseFloat(document.getElementById("ambLightG").value),
                    parseFloat(document.getElementById("ambLightB").value)]);
                break;
            case "pt":
                this.set("ptLightPos", [ parseFloat(document.getElementById("ptLightX").value),
                    parseFloat(document.getElementById("ptLightY").value),
                    parseFloat(document.getElementById("ptLightZ").value)]);
                this.set("ptLightCol", [ parseFloat(document.getElementById("ptLightR").value),
                    parseFloat(document.getElementById("ptLightG").value),
                    parseFloat(document.getElementById("ptLightB").value)]);
                break;
        }


        //TO BE WRITTEN LATER
    };
    this.push = function(name,val){
        this[name].push(val);
    };
    this.apply = function(){ //setting light for context
        var gl = that.gl;

        switch(that.type){
            case "dir":
                applyUniform(gl,this,"dirLightDir",gl.FLOAT_VEC3);
                applyUniform(gl,this,"dirLightCol",gl.FLOAT_VEC3);
                break;
            case "pt":
                applyUniform(gl,this,"ptLightPos",gl.FLOAT_VEC3);
                applyUniform(gl,this,"ptLightCol",gl.FLOAT_VEC3);
                break;
            case "amb":
                applyUniform(gl,this,"ambLightCol",gl.FLOAT_VEC3);
                break;
        }
    };
    this.destruct = function(){
        switch(type){
            case "pt":
                if(this.ptLightPos !== undefined)
                    endBuffer(this.gl,this.ptLightPos.buf);
                if(this.ptLightCol !== undefined)
                    endBuffer(this.gl,this.ptLightCol.buf);
                break;
            case "dir":
                if(this.dirLightDir !== undefined)
                    endBuffer(this.gl,this.dirLightDir.buf);
                if(this.dirLightCol !== undefined)
                    endBuffer(this.gl,this.dirLightCol.buf);
                break;
            case "amb":
                if(this.ambLightCol !== undefined)
                    endBuffer(this.gl,this.ambLightCol.buf);
                break;
        }
    }


};