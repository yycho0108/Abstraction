/**
 * Created by jamiecho on 10/23/15.
 */
//dataArray contains
//vertices
//faces - target = elementarray
//normals
//texCoord

var Surface = function(dataObjs) {
    var that = this;
    this.names = Object.keys(dataObjs);
    this.update = function(){
    };
    this.set = function(name,val){

    };
    this.apply = function(){
        this.names.forEach(function(name){
            if(that[name].target != that.gl.ELEMENT_ARRAY_BUFFER)
                applyAttribute(that.shaderProgram,that,name,that[name].buf);
        });

    };
    this.draw = function(){
        var gl = this.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this["faces"].buf);
        gl.drawElements(gl.TRIANGLES,this["faces"].numItem*this["faces"].itemSize,gl.UNSIGNED_SHORT,0);
        //gl.drawArrays(gl.TRIANGLES,0,36);
    };
    this.setProgram = function(gl,shaderProgram){
        if(this.gl !== undefined){
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            /*this.names.forEach(function(name){
                var d = dataObjs[name];
                if((dataObjs[name].target != that.gl.ELEMENT_ARRAY_BUFFER)){
                    //locateAttribute(that.shaderProgram,d.name);

                }
                else{
                    //locateAttribute(that.gl,that,that.shaderProgram, d.name);
                }
            });*/
        }
        else{
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            this.names.forEach(function(name){
                var d = dataObjs[name];
                if((dataObjs[name].target != that.gl.ELEMENT_ARRAY_BUFFER)){
                    initAttribute(that.shaderProgram,that,d.name,d.val,d.target,d.numItem,d.itemSize);
                }
                else{
                    that[name] = initBuffer(d.val, d.target, d.numItem, d.itemSize);
                }
            });
        }

    };
    //this.setProgram(gl,shaderProgram);
};