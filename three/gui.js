/**
 * Created by Administrator on 2016/5/3.
 */
define(function(){
   var controls=new function(){
       this.switchPlane=false;
   };

    var gui = new dat.GUI();
    gui.add(controls,'switchPlane');

    console.log("gui.js");
    return {
        controls:controls

    }
});