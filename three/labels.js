/**
 * Created by Administrator on 2016/6/23.
 */
define(["shaders"], function(shaders){
    /*  require.js回调的处理方法
     var promise = new Promise(function(resolve, reject){
     sm2.soundManager.setup({
     url:'js/sm2/swf/',
     onready: function() {
     // 返回 sound
     try {
     var sound = sm2.soundManager.createSound({
     url: 'sound/sound1.mp3',
     autoLoad: true
     });
     // success return
     resolve(sound);
     } catch (ex) {
     // error return
     reject(new Error(ex))
     }
     }
     });
     */


    /*基础文字demo
     var promise=new Promise(function(resolve,reject){
     var labelPlane =new THREE.PlaneBufferGeometry( 2048, 2048 );
     //var labelBg = new THREE.PlaneBufferGeometry( 10, 5 );

     function generateLabelMaterial( text ) {

     var x = document.createElement( "canvas" );
     var xc = x.getContext( "2d" );
     x.width = 2048;
     x.height = 2048;

     xc.fillStyle = "rgba( 0, 0, 0, 0 )";
     xc.fillRect( 0, 0, 2048, 2048 );

     xc.fillStyle = "white";
     xc.font = "30px Ubuntu Mono";
     xc.fillText( text, 700, 1000 );

     var map = new THREE.Texture( x );
     map.needsUpdate = true;

     var material = new THREE.MeshBasicMaterial( { map: map, transparent: true } );
     return material;

     }






     $.getJSON('data/labels.json', function(data) {

     //console.log(data.cities)
     $.each(data.cities,function(index,value){
     console.log(value.name.en);
     var labels = new THREE.Mesh( labelPlane, generateLabelMaterial(value.name.en ) );
     labels.position.set( 0, 0, 0 );
     resolve(labels);

     });

     });


     });

     */

    //投影坐标变换
    var GTW=GTW || {};

    (function(){
        var e=1, t=10;
        var clamp=THREE.Math.clamp;
        var deg2rad=THREE.Math.degToRad;
        GTW.project_mercator=function(r, n){
            var o=n.x,
                a=n.y,
                i=Math.PI*a/180,
                u=90/Math.PI*Math.log(Math.tan(0.25*Math.PI+0.5*i));

            r.x=-o/180*t;
            r.y=clamp(u/90, -1, 1)*t;
            r.z=-e*n.z*t;
        };
        GTW.project_ecef=function(r, n){

            var o=deg2rad(n.x),
                a=deg2rad(n.y),
                i=e*n.z,
                u=Math.cos(a),
                c=Math.sin(a),
                l=1,
                s=1;

            r.x=-(l+i)*u*Math.cos(o)*t;
            r.z=(l+i)*u*Math.sin(o)*t;
            r.y=(s+i)*c*t;
        };
        GTW.lerp= function (value1, value2, amount) {
            amount = amount < 0 ? 0 : amount;
            amount = amount > 1 ? 1 : amount;
            return value1 + (value2 - value1) * amount;
        };

        GTW.clamp = function (value, min, max) {

            if (value < min) {
                return min;
            }
            else if (value > max) {
                return max;
            }

            return value;
        };

    })();


    var promise=new Promise(function(resolve, reject){
        var t=2048;

        var vectex_count=0;//顶点数量
        var labelsArray=[];
        var country_count=0;
        var city_count=0;


        /*===========*/
        var texture=null;
        var geometry=new THREE.BufferGeometry();

        //buffer
        var vertices=null;
        var texcoord=null;




        //获得数据并回调处理
        var load_label_data=function(callback){
            $.getJSON('data/labels.json', function(json){
                function TextInf(){  //这个对象 文字信息保存变量
                    this.coord=new THREE.Vector3(); //vec3.create()
                    this.coord.z=0.0001; //z坐标
                    this.pos=new THREE.Vector3(); //第二个摩卡多坐标?vec3.create()
                    this.mat=new THREE.Matrix4();//mat4.create()
                    this.box=new THREE.Vector4(); //这个盒子干嘛?
                    this.name={};//这里是对象才合理,而不是字符串
                    this.font_size=0
                }

                function setLabel(jsondata, r, n){
                    if(r){ //干嘛要这么做啊?
                        if(n && jsondata.font_size<5) return;
                        if(!n && jsondata.font_size>5) return;
                    }
                    $.each(jsondata, function(index, value){
                        var a=new TextInf(); //上面保存变量对象
                        a.coord.copy(value.coord);
                        a.coord.z*=2;
                        a.name=value.name;
                        a.font_size=value.font_size;
                        r ? a.name.en=a.name.en.toUpperCase() : a.font_size=3;
                        labelsArray.push(a); //labels数组保存a对象.
                    });
                }

                setLabel(json.countries, !0, !0);
                country_count=labelsArray.length;//国家数量
                setLabel(json.cities, !1, !1);
                setLabel(json.countries, !0, !1);
                city_count=labelsArray.length-country_count;//城市的数量
                vectex_count=30*labelsArray.length;
                callback();//运行回调函数

            });
        }
        //制作纹理
        var render_labels=function(e){
            var r=document.createElement('canvas');
            r.width=r.height=t;//2048
            var n=r.getContext('2d');
            n.fillStyle="rgba( 0, 0, 0, 0 )";//背景改成黑色透明,原先是只是黑色
            n.fillRect(0, 0, r.width, r.height);
            n.font='30px Ubuntu Mono';
            n.fillStyle='white';
            n.textBaseline='top';
            //n.fillText("zzz", 1000, 980);
            var o=[0, 500];//为不是coord啊?
            var a=35;

            $.each(labelsArray, function(index, value){//原来遍历的方法是另一种方法啊?遍历labels
                var i=value.name[e],
                    u=n.measureText(i).width;//获得文字的宽度
                o[0]+u>=r.width && (o[0]=0, o[1]+=a);//当超出2018边界是变化坐标x=0,y+=35
                n.fillText(i, o[0], o[1]-0);//写入label与坐标,减0做什么?

                value.box.set(o[0], o[1], o[0]+u, o[1]+a);
                value.box.multiplyScalar(1/t);
                o[0]+=u; //这不是按顺写label,?坐标用在那里了?

            });


            texture=new THREE.Texture(r);
            texture.needsUpdate=true;
        }

        //坐标转换投影
        var project_labels=function(projection){/*创建球面label的网格*/


            function t(t, r, i, u){ //干嘛?看不懂
                t.identity();//mat4.identity(t); //矩阵恒等?
                if('ecef'==projection){
                    n.divideScalar(r);    //vec3.normalize(n, r); 这个就是除以r???
                    o.set(0, 1, 0);   // vec3.set(o, 0, 1, 0);
                    o.cross(n);    //vec3.cross(o, n, o);
                    o.normalize();    //vec3.normalize(o, o);
                    a.crossVectors(o, n);     //vec3.cross(a, o, n);
                    t.elements;

                    t.elements[0]=o.x;
                    t.elements[1]=o.y;
                    t.elements[2]=o.z;
                    t.elements[4]=n.x;
                    t.elements[5]=n.y;
                    t.elements[6]=n.z;
                    t.elements[8]=a.x;
                    t.elements[9]=a.y;
                    t.elements[10]=a.z;
                    t.makeRotationX(Math.PI/2);     //mat4.rotateX(t, t, HALF_PI);
                }
                t.multiplyScalar([i, u, 1]);    //mat4.scale(t, t, [i,u,1]);
                t.elements[12]=r[0];
                t.elements[13]=r[1];
                t.elements[14]=r[2];
            }


            if(labelsArray.length){
                var r='ecef'==projection ? GTW.project_ecef : GTW.project_mercator;
                var n=new THREE.Vector3();    //n = vec3.create(),
                var o=new THREE.Vector3();     //o = vec3.create(),
                var a=new THREE.Vector3();    //a = vec3.create(),
               // var i=[];                 //buffer数组
                var u=new THREE.Vector3();   //u = vec3.create(),
                var c=[-1, -1, -1,
                    1, 1, 1,
                    -1, -1, 1,
                    1, 1, -1
                ];
                //l = this;
                var wtwtwt=new THREE.Matrix4();      // var wtwtwt = mat4.create();
                wtwtwt.identity();                 //wtwtwt = mat4.identity(wtwtwt);
                wtwtwt.makeRotationX(Math.PI/2);    //mat4.rotateX(wtwtwt, wtwtwt, HALF_PI);



                //attribute
                vertices=new THREE.BufferAttribute(new Float32Array(vectex_count*3),3);
                texcoord=new THREE.BufferAttribute(new Float32Array(vectex_count*2),2);


                var index=0;



                $.each(labelsArray, function(key, value){  //这里才是修改了之前的坐标?
                    // e.iso2 == l.geoip_iso2 ? e.coord[2] = 0.015 : e.coord[2] = 0.001,//用户位置,不要坐标点
                    r(value.pos, value.coord);//下面定义了以三维向量
                    var n=1*value.font_size;
                    t(value.mat, value.pos, n*(value.box.z-value.box.x), n*(value.box.w-value.box.y));//上面的t函数//转化成魔卡托坐标?

                    for(var o=0; o<c.length; o+=2){
                        u.x=c[o+0];
                        u.y=c[o+1];
                        u.z=0;
                        u.transformDirection(value.mat);         //vec3.transformMat4(u, u, e.mat);
                       // i.push(u.x, u.y, u.z); //position?
                        vertices.setXYZ(index, u.x, u.y, u.z);
                        u.x=0.5*(1+c[o+0]);
                        u.y=0.5*(1+c[o+1]);

                        u.x=GTW.lerp(value.box.z, value.box.x, u.x);
                        u.x=GTW.lerp(value.box.w, value.box.y, u.y);
                       // i.push(u.x, u.y);//uv?
                        texcoord.setXY(index, u.x, u.y);
                        index++;
                    }
                });

            }
        };

        //渲染labels
        var draw_labels=function(){




            geometry.addAttribute('position',vertices);
            geometry.addAttribute('a_texcoord',texcoord);






            //材质


            var customUniforms=shaders.shader['labels'].uniforms;
            customUniforms.t_color.value=texture;
            customUniforms.inside.value=true;
            customUniforms.color.value=new THREE.Vector4(0.0, 0.0, 0.0,0.0);
            customUniforms.circle_of_interest.value=new THREE.Vector4(0.0, 0.0, 0.0,0.0);

            var material=new THREE.ShaderMaterial({
                uniforms: customUniforms,
                vertexShader: shaders.shader['labels'].vertexShader,
                fragmentShader: shaders.shader['labels'].fragmentShader,
                transparent: true
            });
            labels=new THREE.Mesh(geometry, material);
            resolve(labels);

















            /*var material=new THREE.MeshBasicMaterial({map: texture, transparent: true});
            var labelPlane=new THREE.PlaneBufferGeometry(2048, 2048);

            var labels=new THREE.Mesh(labelPlane, material);
            labels.position.set(0, 0, 0);
            resolve(labels);*/








        };

        load_label_data(function(){
            render_labels("en");
            project_labels("ecef");
            draw_labels();
        })


    });

    console.log("labels.js");
    // 返回 promise 对象
    return {
        labels: promise

    }
});
