/**
 * Created by Administrator on 2016/5/3.
 */
define(['labels'],function(labels){
   var controls=new function(){
       this.switchPlane=false;
       this.changeColor=false;
       this.switchPlaneController;
   };

    var gui = new dat.GUI();
    controls.switchPlaneController=gui.add(controls,'switchPlane');
    gui.add(controls,'changeColor');

  /*  controls.switchPlaneController.onChange(function(value){
       console.log(value);
    });
*/

    console.log("gui.js");
    return {
        controls:controls

    }
});