/**
 * Created by Administrator on 2016/5/3.
 */
define(function(){
   var controls=new function(){
       this.switchPlane=false;
       this.changeColor=false;
   };

    var gui = new dat.GUI();
    gui.add(controls,'switchPlane');
    gui.add(controls,'changeColor');


    console.log("gui.js");
    return {
        controls:controls

    }
});