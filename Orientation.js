/**
 * Created by jamiecho on 10/23/15.
 */

var Orientation = function(){
    this.pos = {x:0.0,y:0.0,z:0.0};
    this.rot = {x:0.0,y:0.0,z:0.0};
    this.setPos = function(x,y,z){
        this.pos.x = x;
        this.pos.y = y;
        this.pos.z = z;
    };
    this.setRot = function(x,y,z){
        this.rot.x = x;
        this.rot.y = y;
        this.rot.z = z;
    };
    this.offsetPos = function(x,y,z){
        this.pos.x += x;
        this.pos.y += y;
        this.pos.z += z;

    };
    this.offsetRot = function(x,y,z){
        this.rot.x += x;
        this.rot.y += y;
        this.rot.z += z;
    }
}