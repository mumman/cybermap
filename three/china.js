/**
 * Created by Administrator on 2016/7/4.
 */
define(['shaders'], function(shaders){

    var promise=new Promise(function(resolve, reject){
        var china=new function(){
            this.chinaMesh = null;
            this.customUniforms=null;
            this.chinaData={};

            this.vertexCount = 0;
            this.geometry=new THREE.BufferGeometry();
            this.indices=[]; //索引

            this.chinaProvincesMesh

            //加载资源
            this.load_resources=function(callback){
                var that=this;
                $.getJSON('data/ChinaDetailData.json',function(json){
                    that.vertexCount=json.vertex_mecator.length;//json.vertex_mecator.length;
                    that.indices=json.index_all;
                    that.chinaData=json;
                    callback();
                });

            };



            //创建几何体
            this.build_geometry=function(projection){
                var that=this;
                var r='ecef'==projection ? that.chinaData.vertex_ecef : that.chinaData.vertex_mecator;

                //buffer
                var vertices=new THREE.BufferAttribute(new Float32Array(that.vertexCount*3),3);
                var index=0;
                if(r){
                    $.each(r, function(key, value){
                        vertices.setXYZ(index, value.x, value.y, value.z);
                        index++;
                    });

                }

                var indices1=[];
                for(var i=0;i<that.vertexCount/4;i++){
                    var va=i*4;
                    var vb=i*4+1;
                    var vc=i*4+2;
                    var vd=i*4+3;

                    indices1.push(va, vb, vc);
                    indices1.push(vc, vb, vd);
                }

                var indices2=[];
                for(var i=0; i<that.vertexCount/3;i++){
                    var va=i*3;
                    var vb=i*3+1;
                    var vc=i*3+2;

                    indices2.push(va,vb,vc);
                }

                that.geometry.setIndex(new (that.vertexCount>65535 ? THREE.Uint32Attribute : THREE.Uint16Attribute )(that.indices, 1));
                that.geometry.addAttribute('position',vertices);

            };


            //渲染
            this.draw_china=function(){
                var that=this;

                var testMaterial=new THREE.MeshBasicMaterial({
                    color: 0xff8000,
                    side: THREE.DoubleSide,
                   // wireframe:true
                });
                that.chinaMesh=new THREE.Mesh(that.geometry, testMaterial);
                that.chinaMesh.position.set(0, 0, 0);

                resolve(that);
            };


            var e = this;
            this.load_resources(function(){
                e.build_geometry('ecef');
                e.draw_china();
            });














        };

    });













    console.log('china.js');
    return {
        china: promise
    }

});