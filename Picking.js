/**
 * Created by jamiecho on 10/26/15.
 */

function pick(scene,picker){
    var oldProgram = scene.shaderProgram;

    var gl = scene.gl;
    scene.setProgram(gl,shader_pick);
    scene.camera.setProgram(gl,shader_pick);
    scene.obj.forEach(function(o){o.setProgram(gl,shader_pick);});

    gl.useProgram(shader_pick);

    gl.bindFramebuffer(gl.FRAMEBUFFER,picker.frameBuffer);
    var beg = gl.getProgramParameter(shader_pick,gl.ACTIVE_ATTRIBUTES);
    var end = gl.getProgramParameter(oldProgram,gl.ACTIVE_ATTRIBUTES);

    for(var i=beg;i<end;++i){
        gl.disableVertexAttribArray(i);
    }
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, picker.width, picker.height);
    gl.enable(gl.DEPTH_TEST);

    scene.camera.update();
    scene.camera.apply();

    scene.obj.forEach(function(o){
        o.update();
        o.apply();
        o.draw();
    });


    scene.setProgram(gl,oldProgram);
    gl.useProgram(oldProgram);

    for(var i=beg;i<end;++i){
        gl.enableVertexAttribArray(i);

    }


}

function getDragObj(x,y){
    var pxls = new Uint8Array(4);
    gl.bindFramebuffer(gl.FRAMEBUFFER,picker.frameBuffer);
    gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pxls);
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);
    console.log(pxls[0] + "," + pxls[1] + "," + pxls[2] + "," + pxls[3]);

    var returnObj;
    if(pxls[0] >0 ||  pxls[1]>0 || pxls[2]>0){
        var col = [pxls[0]/255.0, pxls[1]/255.0, pxls[2]/255.0, pxls[3]/255.0];
        scene.obj.forEach(function(o){
            var objCol = o.objColor.buf;
            if(Math.abs(col[0]-objCol[0])<0.02 && Math.abs(col[1] - objCol[1])<0.02 && Math.abs(col[2] - objCol[2])<0.02){
                returnObj = o;
            }
        })
    }
    return returnObj;
}