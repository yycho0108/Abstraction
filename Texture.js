/**
 * Created by jamiecho on 10/23/15.
 */
var Texture = function(gl,shaderProgram,name,type,src){ //color, or 2d img?
    this.gl = gl;
    this.shaderProgram=shaderProgram;
    this.name=name;
    this.type=type;
    this.src=src;

    //currently only dealing with 2d-img scenario
    //ignores "type"
    initUniform(gl,this,shaderProgram,name,gl.SAMPLER_2D);

    this.img = new Image();

    var that = this;

    this.img.ready = false;

    this.img.onload = function(){
        var gl = that.gl;
        gl.bindTexture(gl.TEXTURE_2D, that["texSrc"].buf);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
        if (isPOT(this.width) && isPOT(this.height)) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.ready = true;
    };
    this.apply = function(){
        var gl = this.gl;
        applyUniform(gl,this,this.name,gl.SAMPLER_2D);
    };
    this.ready = function(){
        return this.img.ready;
    };
    this.img.src = src;
};
