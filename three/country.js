/**
 * Created by Administrator on 2016/6/21.
 */
define(['shaders'], function(shaders){
    // instantiate a loader
    var loader = new THREE.OBJLoader();

    // load a resource
    loader.load(
        // resource URL
        'data/map.json',
        // Function when resource is loaded
        function ( object ) {
            scene.add( object );
        }
    );


















    console.log('coutry.js');
    return {
        corona: corona,
        customUniforms: customUniforms
    }
});
