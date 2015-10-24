/**
 * Created by jamiecho on 10/23/15.
 */
var Light = function(gl,shaderProgram,type){
    this.gl = gl;
    this.shaderProgram = shaderProgram;
    this.type = type;

    switch(type){
        case "pt":
            initUniform(gl,this,shaderProgram,"ptLightPos", gl.FLOAT_VEC3);
            initUniform(gl,this,shaderProgram,"ptLightCol", gl.FLOAT_VEC3);
            break;
        case "dir":
            initUniform(gl,this,shaderProgram,"dirLightDir", gl.FLOAT_VEC3);
            initUniform(gl,this,shaderProgram,"dirLightCol", gl.FLOAT_VEC3);
            break;
        case "amb":
            initUniform(gl,this,shaderProgram,"ambLightCol", gl.FLOAT_VEC3);
            break;
    }

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
    this.apply = function(){ //setting light for context
        var gl = this.gl;
        switch(this.type){
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
    }
};