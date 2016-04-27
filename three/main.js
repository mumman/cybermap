require(['earth'], function(earth){
// some code here
//基本
var camera, scene, renderer, main, group;

//交互
var curZoomSpeed=0;
var zoomSpeed=50;

var mouse={x: 0, y: 0}, mouseOnDown={x: 0, y: 0};
var rotation={x: 0, y: 0},
    target={x: Math.PI*3/2, y: Math.PI/6.0},
    targetOnDown={x: 0, y: 0};

var distance=100000, distanceTarget=100000;
var padding=40;
var PI_HALF=Math.PI/2;


init();
animate();

function init(){
    main=document.getElementById('main');
    camera=new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 2000);
    camera.position.z=500;

    scene=new THREE.Scene();
    group = new THREE.Group();
    scene.add(group);


    // earth

   var loader=new THREE.TextureLoader();
    loader.load('textures/land_ocean_ice_cloud_2048.jpg', function(texture){
        var geometry=new THREE.SphereGeometry(200, 20, 20);
        var material=new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
        var mesh=new THREE.Mesh(geometry, material);
        group.add(mesh);


        

    });



 /*       console.log(earth.mesh);
       group.add(earth.mesh);*/



    /*//灯
     scene.add(new THREE.AmbientLight(0xffffff));*/

    //渲染器
    renderer=new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    /*renderer.shadowMap.enabled = true;
     renderer.shadowMap.type = THREE.BasicShadowMap;*/
    main.appendChild(renderer.domElement);


    //事件监听
    window.addEventListener('resize', onWindowResize, false);

    /*  main.addEventListener('mousedown', onDocumentMouseDown, false);
     main.addEventListener('mousemove', onDocumentMouseMove, false);
     main.addEventListener('mouseup', onDocumentMouseUp, false);
     main.addEventListener('mousewheel', onDocumentMouseWheel, false);
     main.addEventListener('touchstart', onDocumentTouchStart, false);
     main.addEventListener('touchmove', onDocumentTouchMove, false);*/

}

//监听函数
function onWindowResize(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}


/*
 function onMouseDown(event) {
 event.preventDefault();

 container.addEventListener('mousemove', onMouseMove, false);
 container.addEventListener('mouseup', onMouseUp, false);
 container.addEventListener('mouseout', onMouseOut, false);

 mouseOnDown.x = - event.clientX;
 mouseOnDown.y = event.clientY;

 targetOnDown.x = target.x;
 targetOnDown.y = target.y;

 container.style.cursor = 'move';
 }

 function onMouseMove(event) {
 mouse.x = - event.clientX;
 mouse.y = event.clientY;

 var zoomDamp = distance/1000;

 target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
 target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

 target.y = target.y > PI_HALF ? PI_HALF : target.y;
 target.y = target.y < - PI_HALF ? - PI_HALF : target.y;
 }

 function onMouseUp(event) {
 container.removeEventListener('mousemove', onMouseMove, false);
 container.removeEventListener('mouseup', onMouseUp, false);
 container.removeEventListener('mouseout', onMouseOut, false);
 container.style.cursor = 'auto';
 }

 function onMouseOut(event) {
 container.removeEventListener('mousemove', onMouseMove, false);
 container.removeEventListener('mouseup', onMouseUp, false);
 container.removeEventListener('mouseout', onMouseOut, false);
 }

 function onMouseWheel(event) {
 event.preventDefault();
 if (overRenderer) {
 zoom(event.wheelDeltaY * 0.3);
 }
 return false;
 }

 function onDocumentKeyDown(event) {
 switch (event.keyCode) {
 case 38:
 zoom(100);
 event.preventDefault();
 break;
 case 40:
 zoom(-100);
 event.preventDefault();
 break;
 }
 }*/

function animate(){
    requestAnimationFrame(animate);
    render();
}

function render(){
    var time=performance.now()*0.001;


    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}


});
