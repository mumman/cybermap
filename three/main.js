require(['earth', 'stars', 'corona','labels','gui'], function(earth, stars, corona, labels, gui){
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

    function init(){
        main=document.getElementById('main');
        camera=new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 2000);
        camera.position.z=30;
        scene=new THREE.Scene();
        scene.add(earth.earth);
        scene.add(stars.stars);
        scene.add(corona.corona);
        //scene.add(labels.labels);
        labels.labels.then(function(value){
            scene.add(value.labelsMesh);
        });









        /*  var geometry = new THREE.BoxGeometry( 10, 10, 10 );
          var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
          var cube = new THREE.Mesh( geometry, material );
          scene.add( cube );*/

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
        console.log('main.js');
    }

    //监听函数
    function onWindowResize(){
        camera.aspect=window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    /*
       控制
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




  /*  // labels切换尝试
    gui.controls.switchPlaneController.onChange(function(value){
        if(value){
            labels.labels.then(function(value){
                value.projectionName='ecef';
                value.load_label_data(function(){
                    value.render_labels("en");
                    value.project_labels(value.projectionName);
                    value.draw_labels(GTW.z);
                    scene.remove(value.labelsMesh);
                    scene.add(value.labelsMesh);
                });
            });
        }else{
            labels.labels.then(function(value){

                value.projectionName='mercator';
                value.load_label_data(function(){
                    value.render_labels("en");
                    value.project_labels(value.projectionName);
                    value.draw_labels(GTW.z);
                   scene.remove(value.labelsMesh);
                   scene.add(value.labelsMesh);
                });
            });
        }
    });
*/
    //labels切换尝试,修改
    gui.controls.switchPlaneController.onChange(function(content){
        if(content){
            labels.labels.then(function(value){
                value.render_labels();
                value.project_labels("ecef")

            });
        }else{
            labels.labels.then(function(value){
                value.render_labels();
                value.project_labels('mercator');

            });
        }
    });





    function animate(){
        requestAnimationFrame(animate);
        render();
    }

    function render(){
        camera.lookAt(scene.position);
        var time=performance.now()*0.001;
        var t=clock.getElapsedTime();
        //光晕云图动画
        corona.customUniforms.time.value=t;

        //球体切换平面
        if(gui.controls.switchPlane){
            if(earth.customUniforms.blend.value<=1){
                earth.customUniforms.blend.value+=0.01;
            }



        }else{
            if(earth.customUniforms.blend.value>=0){
                earth.customUniforms.blend.value-=0.01;
            }


        }

        //切换颜色
        if(gui.controls.changeColor){
            earth.customUniforms.color0.value=new THREE.Vector3(0.07, 0.09, 0.07);
            earth.customUniforms.color1.value=new THREE.Vector3(0.36, 0.41, 0.36);
            corona.customUniforms.color1.value=new THREE.Vector3(0,0,0);


        }else{
            earth.customUniforms.color0.value=new THREE.Vector3(0.93, 0.95, 0.93);
            earth.customUniforms.color1.value=new THREE.Vector3(0.42, 0.48, 0.42);
            corona.customUniforms.color1.value=new THREE.Vector3(1,1,1);
        }


        //固定光晕
        corona.corona.lookAt(camera.position);

        renderer.render(scene, camera);

    }


});
