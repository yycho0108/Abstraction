/**
 * Created by jamiecho on 10/29/15.
 */
var freeLength = 1;
var springConst = 0.3;
var particleMass = 1;
var timeStep =.01;
function Particle(x,y,z,vx,vy,vz,ax,ay,az){
    this.x = x||0;
    this.y = y||0;
    this.z = z||0;
    this.vx = vx||0;
    this.vy = vy||0;
    this.vz = vz||0;
    this.ax = ax||0;
    this.ay = ay||0;
    this.az = az||0;
    return this;
}

function pToV(p){
    return [p.x, p.y, p.z] ;
}
function fToA(F,m){
    return vec3.scale(F,1/m); // F= ma, a = F/m
}
function springForce(k,p1,p2){
    if(p1&&p2)
    {
        var dp = vec3.subtract(pToV(p1),pToV(p2));
        var len = vec3.length(dp) - freeLength;
        vec3.normalize(dp);
        return vec3.scale(dp,-k*len);
    }
    else
        return [0,0,0];
}
function getForce(particles,x,y){
    x = Math.floor(x);
    y = Math.floor(y); //integer index
    var w = particles.width;
    var h = particles.height;

    var me = particles[x*h+y];
    var right =particles[(x+1)*h+y];
    var left = particles[(x-1)*h+y];
    var up = particles[x*h + y+1];
    var down = particles[x*h + y-1];

    var res = [0,0,0];
    if(x+1<w)
        vec3.add(res,springForce(springConst,me,right));
    if(x>=0)
        vec3.add(res,springForce(springConst,me,left));
    if(y+1<h)
        vec3.add(res,springForce(springConst,me,up));
    if(y-1>=0)
        vec3.add(res,springForce(springConst,me,down));
    return res;
}
function createClothes(w,h,freeLength){
    var x,y;
    var particles = [];
    for(x=-w/2;x<w/2;x+=freeLength){
        for(y=-h/2;y<h/2;y+=freeLength){
            particles.push(new Particle(x,y))
        }
    }
    particles.width = w;
    particles.height = h;
    faces = gl.createBuffer();
    var fCoord = [];
    for(x=0;x<w;++x){
        for(y=0;y<h;++y){
            if(y != h-1)
                fCoord = fCoord.concat([x*h+y, x*h+y+1]);
            if(x != w-1)
                fCoord = fCoord.concat([x*h+y, (x+1)*h+y]);
        }
    }
    faces.cnt = fCoord.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,faces);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(fCoord),gl.STATIC_DRAW);

    particles.freeLength = freeLength;
    return particles;
}

function applyForce(clothes){
    var windForce = [Math.random() - 0.5,Math.random()- 0.5,Math.random()- 0.5];
    var windPos = [10*Math.random() - 5,10*Math.random() - 5,10*Math.random() - 5];
    vec3.scale(windForce,1);

    var x,y;
    for(x=0;x<clothes.width;++x){
        for(y=0;y<clothes.height;++y){
            var p = clothes[x*clothes.height+y];
            var f = getForce(clothes,x,y);
            var r = vec3.length(vec3.subtract(pToV(p),windPos));
            var trueWind = vec3.create();
            vec3.scale(windForce,Math.min(1/(r*r),1.0),trueWind);
            vec3.add(f,trueWind);
            var a = fToA(f,particleMass);
            p.ax = p.ax *0.8 + a[0];// friction...etc.
            p.ay = p.ay *0.8 + a[1];
            p.az = p.az *0.8 + a[2];

        }
    }

}
function updateClothes(clothes){

    for(x=0;x<clothes.width;++x){
        for(y=0;y<clothes.height;++y){
            var p = clothes[x*clothes.height+y];
            p.vx += p.ax * timeStep;
            p.vy += p.ay * timeStep;
            p.vz += p.az * timeStep;

                p.x += p.vx * timeStep;
                p.y += p.vy * timeStep;
                p.z += p.vz  * timeStep;
        }
    }
}

var pMat = mat4.create();
var mvMat = mat4.create();

function drawClothes(clothes){
    gl.viewport(0,0,gl.viewportWidth,gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

    mat4.perspective(90, gl.viewportWidth / gl.viewportHeight, 0.1, 150.0, pMat);
    mat4.identity(mvMat);
    mat4.translate(mvMat,[0,0,-10.00]);
    mat4.rotateX(mvMat,Math.sin(degToRad(30)));
    mat4.rotateY(mvMat,Math.cos(degToRad(10)));
    //mat4.identity(pMat);

    applyUniform(shaderProgram,"mvMat",mvMat);
    applyUniform(shaderProgram,"pMat",pMat);

    gl.bindBuffer(gl.ARRAY_BUFFER,pNoiseBuf);
    gl.vertexAttribPointer(shaderProgram.loc["vPos"],3,gl.FLOAT,false,0,0);
    gl.drawArrays(gl.POINTS,0,pNoiseBuf.w*pNoiseBuf.h);
    var dat = [];
    var len = clothes.width * clothes.height;
    var i;

    for(i=0;i<len;++i)
    {
        dat = dat.concat(pToV(clothes[i]));
    }

    gl.bindBuffer(gl.ARRAY_BUFFER,buf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dat),gl.STATIC_DRAW);
    gl.vertexAttribPointer(shaderProgram.loc["vPos"],3,gl.FLOAT,false,0,0);
    gl.drawArrays(gl.POINTS,0,len);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,faces);
    gl.drawElements(gl.LINES,faces.cnt,gl.UNSIGNED_BYTE,0);

}
function simulate(clothes){
    applyForce(clothes);
    updateClothes(clothes);
    drawClothes(clothes);
    requestAnimationFrame(function(){simulate(clothes);});
}