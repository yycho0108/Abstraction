/**
 * Created by jamiecho on 10/26/15.
 */
function initFrameBuffer(){
    var rttFramebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, rttFramebuffer);
    rttFramebuffer.width = gl.viewportWidth;
    rttFramebuffer.height = gl.viewportHeight;

    var rttTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, rttTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, rttFramebuffer.width, rttFramebuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
   // gl.generateMipmap(gl.TEXTURE_2D);


    var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, rttFramebuffer.width, rttFramebuffer.height);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rttTexture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    var checkvalue = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if(checkvalue !=gl.FRAMEBUFFER_COMPLETE){
        alert("failed to create framebuffer!!");
        console.log(checkvalue);
    }
    return {
        frameBuffer : rttFramebuffer,
        texture : rttTexture,
        renderBuffer : renderbuffer,
        width : gl.viewportWidth,
        height : gl.viewportHeight
    };
}