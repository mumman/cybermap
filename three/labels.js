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


    //扩充函数
    THREE.Matrix4.prototype.GTWrotateX=function(theta){
        var n = Math.sin(theta),
            o = Math.cos(theta);
        var e=this.elements;

        var a = e[4],
            i = e[5],
            u = e[6],
            c = e[7],
            l = e[8],
            s = e[9],
            f = e[10],
            v = e[11];

        e[4] = a * o + l * n;
        e[5] = i * o + s * n;
        e[6] = u * o + f * n;
        e[7] = c * o + v * n;
        e[8] = l * o - a * n;
        e[9] = s * o - i * n;
        e[10] = f * o - u * n;
        e[11] = v * o - c * n;

        return this;

    };



//labels.js
    var promise=new Promise(function(resolve, reject){
        var t=2048;
        var vectex_count=0;//顶点数量
        var labelsArray=[];
        var geoip_iso2=null;//直接设置为null,用户位置
        var country_count=0;
        var city_count=0;

        var labels=new function(){
            this.projectionName="ecef";//ecef..mercator
            this.labelsMesh=null;
            this.customUniforms=null;

        };


        /*===========*/
        var texture=null;
        var geometry=new THREE.BufferGeometry();

        //buffer
        var vertices=null;
        var texcoord=null;

        //获得数据并回调处理
        labels.load_label_data=function(callback){
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
                    $.each(jsondata, function(index, value){
                        if(r){ //干嘛要这么做啊?
                            if(n && value.font_size<5){
                                return;
                            }
                            if(!n && value.font_size>5){
                                return;
                            }
                        }

                        var a=new TextInf(); //上面保存变量对象
                      //  a.coord.copy(value.coord);
                        a.coord.x=value.coord[0];
                        a.coord.y=value.coord[1];
                        a.coord.z*=2;
                        a.name=value.name;
                        a.font_size=value.font_size;
                        r ? a.name.en=a.name.en.toUpperCase() : a.font_size=3;
                        value.iso2 && (a.iso2 = value.iso2);
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
        labels.render_labels=function(e){
            var r=document.createElement('canvas');
            r.width=r.height=t;//2048
            var n=r.getContext('2d');
            n.fillStyle="#000";//n.fillStyle="rgba( 0, 0, 0, 0 )  #000"
            n.fillRect(0, 0, r.width, r.height);
            n.font='30px Ubuntu Mono';
            n.fillStyle='white';
            n.textBaseline='top';
            var o=[0, 0];//为不是coord啊?
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

            /*texture.format= THREE.LuminanceFormat;
            texture.type= THREE.UnsignedByteType;
            texture.generateMipmaps=true;*/
            texture.needsUpdate=true;
        };

        //坐标转换投影
        labels.project_labels=function(projection){/*创建球面label的网格*/


            function t(t, r, i, u){ //干嘛?看不懂
                t.identity();//mat4.identity(t); //矩阵恒等?
                if('ecef'==projection){
                    n.copy(r).normalize();//vec3.normalize(n, r); 这个就是除以r???
                    o.set(0, 1, 0);   // vec3.set(o, 0, 1, 0);
                    o.crossVectors(n, o);    //vec3.cross(o, n, o);
                    o.normalize();    //vec3.normalize(o, o);
                    a.crossVectors(o, n);     //vec3.cross(a, o, n);

                    t.elements[0]=o.x;
                    t.elements[1]=o.y;
                    t.elements[2]=o.z;
                    t.elements[4]=n.x;
                    t.elements[5]=n.y;
                    t.elements[6]=n.z;
                    t.elements[8]=a.x;
                    t.elements[9]=a.y;
                    t.elements[10]=a.z;
                    t.GTWrotateX(Math.PI/2);     //mat4.rotateX(t, t, HALF_PI);
                }
                t.scale(new THREE.Vector3(i, u, 1));    //mat4.scale(t, t, [i,u,1]);
                t.elements[12]=r.x;
                t.elements[13]=r.y;
                t.elements[14]=r.z;
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



                //buffer
                vertices=new THREE.BufferAttribute(new Float32Array(vectex_count*3),3);
                texcoord=new THREE.BufferAttribute(new Float32Array(vectex_count*2),2);
                var index=0;
                $.each(labelsArray, function(key, value){  //这里才是修改了之前的坐标?
                    value.iso2 == geoip_iso2 ? value.coord.z = 0.015 : value.coord.z = 0.001;//这个修改coord值
                    r(value.pos, value.coord);//下面定义了以三维向量
                    var n=1*value.font_size;
                    t(value.mat, value.pos, n*(value.box.z-value.box.x), n*(value.box.w-value.box.y));//上面的t函数//转化成魔卡托坐标?

                    for(var o=0; o<c.length; o+=2){
                        u.x=c[o+0];
                        u.y=c[o+1];
                        u.z=0;
                        u.applyProjection(value.mat);         //vec3.transformMat4(u, u, e.mat);
                       // i.push(u.x, u.y, u.z); //position?
                        vertices.setXYZ(index, u.x, u.y, u.z);
                        //console.log(vertices.array);
                        u.x=0.5*(1+c[o+0]);
                        u.y=0.5*(1+c[o+1]);

                        u.x=GTW.lerp(value.box.z, value.box.x, u.x);
                        u.y=GTW.lerp(value.box.w, value.box.y, u.y);
                       // i.push(u.x, u.y);//uv?
                        texcoord.setXY(index, u.x, u.y);
                        index++;
                    }
                });

                //var indices=[];
                // geometry.setIndex(new ( vertices.count>65535 ? THREE.Uint32Attribute : THREE.Uint16Attribute )(indices, 1));
                geometry.addAttribute('position',vertices);
                geometry.addAttribute('a_texcoord',texcoord);



            }
        };

        //渲染labels
        labels.draw_labels=function(e){
            var H = [-90, 30.0444];
            e.geocam.coord.setX(H[0]);
            e.geocam.coord.setY(H[1]);
            e.geocam.coord.setZ(3.53);
            var r=new THREE.Vector3();
            e.project(r, e.geocam.coord);
            var t = 3,
                n = 10,
                o = GTW.lerp(t, n, e.projection.blend);

            //材质
            labels.customUniforms=shaders.shader['labels'].uniforms;
            labels.customUniforms.t_color.value=texture;
            labels.customUniforms.inside.value=0;
            labels.customUniforms.color.value=new THREE.Vector4(255, 255, 255, 1.0);
            labels.customUniforms.circle_of_interest.value=new THREE.Vector4(r.x, r.y, r.z, o);

            var material=new THREE.ShaderMaterial({
                uniforms: labels.customUniforms,
                vertexShader: shaders.shader['labels'].vertexShader,
                fragmentShader: shaders.shader['labels'].fragmentShader,
                transparent: true,
                side:THREE.DoubleSide,
               // wireframe:true
            });
            labels.labelsMesh=new THREE.Mesh(geometry, material);
            labels.labelsMesh.position.set(0, 0, 0);
            resolve(labels);


           /* var material=new THREE.MeshBasicMaterial({map: texture,transparent: true});
           var labelPlane=new THREE.PlaneBufferGeometry(2048, 2048);
            labels.labelsMesh=new THREE.Mesh(labelPlane, material);
            labels.labelsMesh.position.set(0, 0, 0);
            resolve(labels);*/
        };

        //运行渲染
        labels.load_label_data(function(){
            labels.render_labels("en");
            labels.project_labels(labels.projectionName);
            labels.draw_labels(GTW.z);
        })

    });

    console.log("labels.js");
    // 返回 promise 对象
    return {
        labels: promise

    }
});
