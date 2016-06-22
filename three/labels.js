/**
 * Created by Administrator on 2016/6/21.
 */
define(['shaders'], function(shaders){
    /*   var labels= new THREE.Object3D();

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


     var labels = new THREE.Mesh( labelPlane, generateLabelMaterial('张 American' ) );
     labels.position.set( 0, 0, 0 );



     $.getJSON('data/labels.json', function(data) {

     /!*for(var key in data.cities){
     console.log("cities:"+key.name);

     }*!/
     //console.log(data.cities)
     $.each(data.cities,function(index,value){
     console.log(value.name.en);

     });

     });

     console.log(labels.js);
     return {
     labels:labels,
     //  customUniform:customUniform
     };*/


/*  --------------------------------------------------------------------------------------------------------
    // var GTW = GTW || {};
    var labels=function(){
        function e(){
            this.buffers={
                vert: null
            },
                this.programs={
                    label: webgl.getProgram('label')
                },
                this.texture=webgl.createTexture2D({
                    size: t,
                    mipmap: !0,
                    min: gl.LINEAR_MIPMAP_LINEAR,
                    aniso: 4,
                    format: gl.LUMINANCE
                }),
                gl.generateMipmap(gl.TEXTURE_2D),
                this.country_count=0,
                this.labels=[],
                this.geoip_iso2=null;
            var e=this;
            this.load_label_data(function(){
                e.render_labels('en'),
                    e.project_labels('ecef')
            })
        }

        var t=2048;
        e.prototype.load_label_data=function(e){
            var t=this;
            $.getJSON(GTW.resource_url('data/labels.json'), function(r){
                function n(){
                    var e=window.lang;
                    $.each(r.countries, function(t){
                        var r='MAP_COUNTRY_'+t.iso3.toUpperCase();
                        t.name=e.getText(r)
                    }),
                    $.each(r.cities, function(t){
                        var r='MAP_CITY_'+t.code.toUpperCase();
                        t.name=e.getText(r)
                    })
                }

                function o(){
                    this.coord=vec3.create(),
                    this.coord[2]=0.0001,
                    this.pos=vec3.create(),
                    this.mat=mat4.create(),
                    this.box=vec4.create(),
                    this.name='',
                    this.font_size=0
                }

                function a(e, r, n){
                    _.each(e, function(e){
                        if(r){
                            if(n && e.font_size<5) return;
                            if(!n && e.font_size>5) return
                        }
                        var a=new o;
                        vec2.copy(a.coord, e.coord),
                            a.coord[2]*=2,
                            a.name=e.name,
                            a.font_size=e.font_size,
                            r ? a.name=a.name.toUpperCase() : a.font_size=3,
                        e.iso2 && (a.iso2=e.iso2),
                            t.labels.push(a)
                    })
                }

                n(),
                    a(r.countries, !0, !0),
                    t.country_count=t.labels.length,
                    a(r.cities, !1, !1),
                    a(r.countries, !0, !1),
                    t.city_count=t.labels.length-t.country_count;
                var i=30*t.labels.length;
                t.buffers.vert=webgl.makeVertexBuffer(new Float32Array(i)),
                    e()
            })
        },


    }();
*/


    var labels;
    var geometry=new THREE.BufferGeometry();
    var vertexCount=0;














    var t=2048;

    function LabelObject(){
        this.vertexCount=0;
        this.country_count=0;
        this.city_count=0;
        this.labels=[];
        var e=this;
        this.load_label_data(function(){
            e.render_labels('en');
            //e.project_labels('ecef')
        });
    }
    LabelObject.prototype.load_label_data=function(callback){
        var labelObj=this;
        $.getJSON('data/labels.json', function(json){
            function TextInf(){  //这个对象 文字信息保存变量
                this.coord =new THREE.Vector3(); //vec3.create()
                this.coord.z = 0.0001; //z坐标
                this.pos = new THREE.Vector3(); //第二个摩卡多坐标?vec3.create()
                this.mat = new THREE.Matrix4();//mat4.create()
                this.box = new THREE.Vector4(); //这个盒子干嘛?
                this.name = '';
                this.font_size = 0
            }

            function setLabel(jsondata,r,n){
                $.each(jsondata, function(index,value){
                    if (r) { //干嘛要这么做啊?
                        if (n && labelObj.font_size < 5) return;
                        if (!n && labelObj.font_size > 5) return;
                    }
                    console.log(value.name.en);
                    var a = new TextInf(); //上面保存变量对象
                   // a.coord.copy(data.coord);//vec2.copy(a.coord, data.coord);//把e的坐标保存到a中
                   // a.coord.y *= 2;//z还要乘以2,毛病啊
                    a.name = value.name;
                    a.font_size = value.font_size;
                  //  r ? a.name = a.name.toUpperCase() : a.font_size = 3;//r意义什么啊?
                    labelObj.labels.push(a); //labels数组保存a对象.

                });

            }

           // setLabel(json.countries, !0, !0);
            labelObj.country_count = labelObj.labels.length;//国家数
            setLabel(json.cities, !1, !1);
           // setLabel(json.countries, !0, !1);
            labelObj.city_count = labelObj.labels.length - labelObj.country_count;//城市的数量
            labelObj.vertexCount = 30 * labelObj.labels.length;//buffer点数
            callback();//运行回调函数
        });
    };
    LabelObject.prototype.render_labels=function(e){ //e只英文.language
        var r = document.createElement('canvas');
        r.width = r.height = t;//2048
        var n = r.getContext('2d');
        n.fillStyle = '#000';//背景应该黑色且透明才对啊..?
        n.fillRect(0, 0, r.width, r.height);
        n.font = '30px Ubuntu Mono';
        n.fillStyle = 'white';
        n.textBaseline = 'top';
        var o = [0,0],//为不是coord啊?
            a = 35;
        $.each(this.labels, function(e) {//遍历labels
            var i = e.name,
                u = n.measureText(i).width;//获得文字的宽度
           // console.log(e.name);
            o[0] + u >= r.width && (o[0] = 0, o[1] += a);//当超出2018边界是变化坐标x=0,y+=35
            n.fillText(i, o[0], o[1] - 0);//写入label与坐标
           //  vec4.set(e.box, o[0], o[1], o[0] + u, o[1] + a);//干嘛用这个box?//这里使用的坐标修改?
          //  vec4.scale(e.box, e.box, 1 / t);//为了放大?
            o[0] += u; //这不是按顺写label,?坐标用在那里了?
        });

        var texture = new THREE.Texture( r );
        texture.needsUpdate = true;
        var material=new THREE.MeshBasicMaterial({map:texture,transparent:true});

        var geometryPlane=new THREE.BufferGeometry(2048,2048);
        labels=new THREE.Mesh(geometryPlane,material);
        labels.position.set( 0, 0, 0 );
        //console.log(labels);

    };


   var zp= new LabelObject();



















/*

    //buffer
    var vertices=new THREE.BufferAttribute(new Float32Array(vertexCount*3),3);
    var texcoord=new THREE.BufferAttribute(new Float32Array(vertexCount*2),2);


    geometry.addAttribute('position',vertices);
    geometry.addAttribute('a_texcoord',texcoord);


    var material=new THREE.MeshBasicMaterial({});
   // var material=new THREE.ShaderMaterial({});


    labels=THREE.Mesh(geometry,material);*/

























    return {
        labels: labels,
        //  customUniform:customUniform
    };


});




