require(['earth'], function(earth){
    // some code here
    //基本
    var camera, scene, renderer, main, group;
    //时间
    var clock = new THREE.Clock();

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

    function init(){
        main=document.getElementById('main');
        camera=new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 2000);
        camera.position.z=500;

        scene=new THREE.Scene();
        group=new THREE.Group();
        scene.add(group);


        // earth
        /*

         var loader=new THREE.TextureLoader();
         loader.load('textures/land_ocean_ice_cloud_2048.jpg', function(texture){
         var geometry=new THREE.SphereGeometry(200, 20, 20);
         var material=new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
         var mesh=new THREE.Mesh(geometry, material);
         group.add(mesh);
         });
         */

        var ballGeometry=new THREE.SphereGeometry(60, 32, 16);

        var loader=new THREE.TextureLoader();

        // load a resource
        loader.load(
            // resource URL
            'textures/UV_Grid_Sm.jpg',
            // Function when resource is loaded
            function(texture){
                require(['shader'], function(shader){

                customUniforms=shader.shader['earth'].uniforms;
                customUniforms.baseTexture.value=texture;
                var customMaterial=new THREE.ShaderMaterial(
                    {
                        uniforms: customUniforms,
                        /*vertexShader: document.getElementById('vertexShader').textContent,
                        fragmentShader: document.getElementById('fragmentShader').textContent,*/

                        vertexShader:shader.shader['earth'].vertexShader,
                        fragmentShader:shader.shader['earth'].fragmentShader,


                        side: THREE.DoubleSide
                    });
                var ball=new THREE.Mesh(ballGeometry, customMaterial);
                ball.position.set(0, 0, 0);
                ball.rotation.set(0, -Math.PI/2, 0);
                scene.add(ball);

                });
            }
        );



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

        //控制器
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
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

        var t = clock.getElapsedTime();
        customUniforms.mixAmount.value = 0.5 * (1.0 + Math.sin(t));

        renderer.render(scene, camera);
    }


});
