/**
 * Created by Administrator on 2016/6/21.
 */
define(['shaders'],function(shaders){
    var labels= new THREE.Object3D();

    var labelPlane =new THREE.PlaneBufferGeometry( 2048, 2048 );


    function generateLabelMaterial( text ) {

        var x = document.createElement( "canvas" );
        var xc = x.getContext( "2d" );
        x.width = 128;
        x.height = 32;

        xc.fillStyle = "rgba( 0, 0, 0, 0.95 )";
        xc.fillRect( 0, 0, 128, 32 );

        xc.fillStyle = "white";
        xc.font = "12pt arial bold";
        xc.fillText( text, 10, 22 );

        var map = new THREE.Texture( x );
        map.needsUpdate = true;

        var material = new THREE.MeshBasicMaterial( { map: map, transparent: true } );
        return material;

    }

    $.getJSON('data/labels.json', function(data) {

        for(var key in data){


        }


    });













    console.log(labels.js);
    return {
        labels:labels,
        customUniform:customUniform
    }

});




