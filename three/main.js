require(['earth', 'gui'], function(earth, gui){
    // some code here
    //基本
    var camera, scene, renderer, main;
    //时间
    var clock=new THREE.Clock();

    //
    /*var  customUniforms;*/
    //交互
    var overRenderer;


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
    var promise;

    function init(){
        main=document.getElementById('main');
        camera=new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 2000);
        camera.position.z=30;
        scene=new THREE.Scene();


        var ballGeometry=earth.geometry;
        var t_blur=new THREE.TextureLoader().load('textures/map_blur.jpg');

        var t_pattern=new THREE.TextureLoader().load('textures/pattern.png');
        t_pattern.wrapS=THREE.RepeatWrapping;
        t_pattern.wrapT=THREE.RepeatWrapping;


        promise=new Promise(function(resolve, reject){
            require(['shaders'], function(shaders){

                customUniforms=shaders.shader['grid'].uniforms;
                customUniforms.t_blur.value=t_blur;
                customUniforms.t_pattern.value=t_pattern;

                var customMaterial=new THREE.ShaderMaterial(
                    {
                        uniforms: customUniforms,
                        vertexShader: shaders.shader['grid'].vertexShader,
                        fragmentShader: shaders.shader['grid'].fragmentShader,
                        side: THREE.DoubleSide
                    });
                var ball=new THREE.Mesh(ballGeometry, customMaterial);
                ball.position.set(0, 0, 0);
                ball.rotation.set(0, -Math.PI/2, 0);
                scene.add(ball);
                resolve();
            });

        });


        /*

         var earth_ball=earth.earth;
         scene.add(earth_ball);
         */


        /*//灯
         scene.add(new THREE.AmbientLight(0xffffff));*/

        //渲染器
        renderer=new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        /*renderer.shadowMap.enabled = true;
         renderer.shadowMap.type = THREE.BasicShadowMap;*/
        main.appendChild(renderer.domElement);


        //事件监听
        window.addEventListener('resize', onWindowResize, false);

        //控制器
        var controls=new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.update();

        /*
         main.addEventListener('mousedown', onMouseDown, false);

         main.addEventListener('mousewheel', onMouseWheel, false);

         document.addEventListener('keydown', onDocumentKeyDown, false);*/

    }

    //监听函数
    function onWindowResize(){
        camera.aspect=window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    /*

     function onMouseDown(event){
     event.preventDefault();

     main.addEventListener('mousemove', onMouseMove, false);
     main.addEventListener('mouseup', onMouseUp, false);
     main.addEventListener('mouseout', onMouseOut, false);

     mouseOnDown.x= -event.clientX;
     mouseOnDown.y=event.clientY;

     targetOnDown.x=target.x;
     targetOnDown.y=target.y;

     main.style.cursor='move';
     }

     function onMouseMove(event){
     mouse.x= -event.clientX;
     mouse.y=event.clientY;

     var zoomDamp=distance/1000;

     target.x=targetOnDown.x+(mouse.x-mouseOnDown.x)*0.005*zoomDamp;
     target.y=targetOnDown.y+(mouse.y-mouseOnDown.y)*0.005*zoomDamp;

     target.y=target.y>PI_HALF ? PI_HALF : target.y;
     target.y=target.y< -PI_HALF ? -PI_HALF : target.y;
     }

     function onMouseUp(event){
     main.removeEventListener('mousemove', onMouseMove, false);
     main.removeEventListener('mouseup', onMouseUp, false);
     main.removeEventListener('mouseout', onMouseOut, false);
     main.style.cursor='auto';
     }

     function onMouseOut(event){
     main.removeEventListener('mousemove', onMouseMove, false);
     main.removeEventListener('mouseup', onMouseUp, false);
     main.removeEventListener('mouseout', onMouseOut, false);
     }

     function onMouseWheel(event){
     event.preventDefault();
     if(overRenderer){
     zoom(event.wheelDeltaY*0.3);
     }
     return false;
     }

     function onDocumentKeyDown(event){
     switch(event.keyCode){
     case 38:
     zoom(100);
     event.preventDefault();
     break;
     case 40:
     zoom(-100);
     event.preventDefault();
     break;
     }
     }

     function zoom(delta){
     distanceTarget-=delta;
     distanceTarget=distanceTarget>1000 ? 1000 : distanceTarget;
     distanceTarget=distanceTarget<350 ? 350 : distanceTarget;
     }
     */

    function animate(){
        requestAnimationFrame(animate);
        render();
    }

    function render(){
        var time=performance.now()*0.001;
        camera.lookAt(scene.position);
        var t=clock.getElapsedTime();


        /*   //切换平面
         if(gui.controls.switchPlane){
         promise.then(function(){
         if(customUniforms.blend.value<=1){
         customUniforms.blend.value+=0.01;
         }
         });
         }else{
         promise.then(function(){
         if(customUniforms.blend.value>=0){
         customUniforms.blend.value-=0.01;
         }
         });
         }
         //切换颜色
         if(gui.controls.changeColor){
         promise.then(function(){
         customUniforms.color0.value=new THREE.Vector3(0.07, 0.09, 0.07);
         customUniforms.color1.value=new THREE.Vector3(0.36, 0.41, 0.36);
         });

         }else{
         promise.then(function(){
         customUniforms.color0.value=new THREE.Vector3(0.93, 0.95, 0.93);
         customUniforms.color1.value=new THREE.Vector3(0.42, 0.48, 0.42);
         });
         }*/


        renderer.render(scene, camera);

    }


});
