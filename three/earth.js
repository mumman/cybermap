/**
 * Created by Administrator on 2016/4/27.
 */
define(['shaders'],function(shaders){
        /*var earth={};*/
        var e=1, t=10;
        var clamp=THREE.Math.clamp;
        var deg2rad=THREE.Math.degToRad;
        var project_mercator=function(r, n){
            var o=n.x,
                a=n.y,
                i=Math.PI*a/180,
                u=90/Math.PI*Math.log(Math.tan(0.25*Math.PI+0.5*i));

            r.x=-o/180*t;
            r.y=clamp(u/90, -1, 1)*t;
            r.z=-e*n.z*t;

        };
        var project_ecef=function(r, n){
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

        var geometry=new THREE.BufferGeometry();
        var widthSegments=360;
        var heightSegments=180;
        var vertexCount=( ( widthSegments+1 )*( heightSegments+1 ) );

        var positions=new THREE.BufferAttribute(new Float32Array(vertexCount*3), 3);
        var normals=new THREE.BufferAttribute(new Float32Array(vertexCount*3), 3);
        var uvs=new THREE.BufferAttribute(new Float32Array(vertexCount*2), 2);
        var index=0, vertices=[];


        //经纬度的方式构建地球
        var point=new THREE.Vector3();
        var point1=new THREE.Vector3();
        var offset=new THREE.Vector3(0, 0, -0.014);

        for(var l=-widthSegments/2; widthSegments/2>=l; l++){
            var verticesRow=[];
            /* var u=l/widthSegments;*/
            for(var s=-heightSegments/2; heightSegments/2>=s; s++){
                /* var v=s/heightSegments;*/

                var u=((l+180))/360;
                var v=1-(s+90)/180;

                offset.x=l;
                offset.y=s;
                project_mercator(point, offset);
                project_ecef(point1, offset);
                positions.setXYZ(index, point.x, point.y, point.z);
                normals.setXYZ(index, point1.x, point1.y, point1.z);
                uvs.setXY(index, u, v);
                verticesRow.push(index);
                index++;

            }
            vertices.push(verticesRow);
        }

        var indices=[];
        for(var y=0; y<widthSegments; y++){
            for(var x=0; x<heightSegments; x++){
                var v1=vertices[y][x+1];
                var v2=vertices[y][x];
                var v3=vertices[y+1][x];
                var v4=vertices[y+1][x+1];

                indices.push(v1, v2, v4);
                indices.push(v2, v3, v4);
            }
        }
        geometry.setIndex(new ( positions.count>65535 ? THREE.Uint32Attribute : THREE.Uint16Attribute )(indices, 1));
        geometry.addAttribute('position', positions);
        geometry.addAttribute('normal', normals);
        geometry.addAttribute('uv', uvs);
        geometry.computeBoundingSphere();
        geometry.rotateY(-Math.PI/2);


         // 测试


         var t_blur=new THREE.TextureLoader().load('textures/map_blur.jpg');

         var t_pattern=new THREE.TextureLoader().load('textures/pattern.png');
         t_pattern.wrapS=THREE.RepeatWrapping;
         t_pattern.wrapT=THREE.RepeatWrapping;


         var customUniforms=shaders.shader['grid'].uniforms;
         customUniforms.t_blur.value=t_blur;
         customUniforms.t_pattern.value=t_pattern;

         var customMaterial=new THREE.ShaderMaterial(
         {
         uniforms: customUniforms,
         vertexShader: shaders.shader['grid'].vertexShader,
         fragmentShader: shaders.shader['grid'].fragmentShader,
         side: THREE.DoubleSide
         });

         var earth=new THREE.Mesh(geometry, customMaterial);
         earth.position.set(0, 0, 0);
         earth.rotation.set(0, -Math.PI/2, 0);

         console.log("earth.js");
        return {
            earth: earth,
            customUniforms:customUniforms,
            geometry: geometry
        }



});










