/**
 * Created by jamiecho on 10/23/15.
 */
var Texture = function(name,type,src){ //color, or 2d img?
    var that = this;

    this.name=name;
    this.type=type;
    this.src=src;
    this.ready = false;
    this.img = new Image();
    this.img.onload = function(){
        that.ready = true;
    };
    this.apply = function(){
        var gl = this.gl;
        applyUniform(this.shaderProgram,this.name,gl.SAMPLER_2D,this[name].buf);
    };
    this.setProgram = function(gl, shaderProgram){
        if(this.gl !== undefined)
        {
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            //locateUniform(this.shaderProgram,this.name);
        }
        else {
            this.gl = gl;
            this.shaderProgram = shaderProgram;
            initUniform(this,this.shaderProgram,this.name,this.gl.SAMPLER_2D);

            if(this.ready){ // = already loaded
                var gl = this.gl;

                gl.bindTexture(gl.TEXTURE_2D, that[name].buf);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.img);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
                if (isPOT(this.img.width) && isPOT(this.img.height)) {
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
            }
        }

    };
    this.img.src = src;
};
