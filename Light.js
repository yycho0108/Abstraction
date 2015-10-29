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
           /* switch(that.type){
                case "pt":
                    locateUniform(shaderProgram,"ptLightPos");
                    locateUniform(shaderProgram,"ptLightCol");
                    break;
                case "dir":
                    locateUniform(shaderProgram,"dirLightDir");
                    locateUniform(shaderProgram,"dirLightCol");
                    break;
                case "amb":
                    locateUniform(shaderProgram,"ambLightCol");
                    break;
            }*/
        }
        else{
            this.gl = gl;
            this.shaderProgram = shaderProgram;

            switch(that.type){
                case "pt":
                    initUniform(that,shaderProgram,"ptLightPos");
                    initUniform(that,shaderProgram,"ptLightCol");
                    break;
                case "dir":
                    initUniform(that,shaderProgram,"dirLightDir");
                    initUniform(that,shaderProgram,"dirLightCol");
                    break;
                case "amb":
                    initUniform(that,shaderProgram,"ambLightCol");
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
                applyUniform(this.shaderProgram,"dirLightDir",this["dirLightDir"].buf);
                applyUniform(this.shaderProgram,"dirLightCol",this["dirLightCol"].buf);
                break;
            case "pt":
                applyUniform(this.shaderProgram,"ptLightPos",this["ptLightPos"].buf);
                applyUniform(this.shaderProgram,"ptLightCol",this["ptLightCol"].buf);
                break;
            case "amb":
                applyUniform(this.shaderProgram,"ambLightCol",this["ambLightCol"].buf);
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