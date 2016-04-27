/**
 * Created by Administrator on 2016/4/27.
 */

define(function(){
    var loader=new THREE.TextureLoader();

    var mesh= loader.load('textures/land_ocean_ice_cloud_2048.jpg', function(texture){
        var geometry=new THREE.SphereGeometry(200, 20, 20);
        var material=new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
        var mesh1=new THREE.Mesh(geometry, material);
        console.log(mesh1);
        return mesh1;
    });
    console.log(mesh);
    return {
        mesh:mesh

    }
});










