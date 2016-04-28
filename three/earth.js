/**
 * Created by Administrator on 2016/4/27.
 */

define(function(){


    var e=1, t=10;
    var project_mercator=function(r, n){
        var o=n[0],
            a=n[1],
            i=Math.PI*a/180,
            u=90/Math.PI*Math.log(Math.tan(0.25*Math.PI+0.5*i));
        r[0]=-o/180,
            r[1]=clamp(u/90, -1, 1),
            r[2]=-e*n[2],
            vec3.scale(r, r, t)
    };

    var project_ecef=function(r, n){
        var o=deg2rad(n[0]),
            a=deg2rad(n[1]),
            i=e*n[2],
            u=Math.cos(a),
            c=Math.sin(a),
            l=1,
            s=1;
        r[0]=-(l+i)*u*Math.cos(o),
            r[2]=(l+i)*u*Math.sin(o),
            r[1]=(s+i)*c,
            vec3.scale(r, r, t)
    };
    /*源代码*/
    var build_grid=function(){
        function t(e, t){
            return 181*e+t
        }

        var n=[],
            o=[],
            a=vec3.create();
        a[2]= -r;
        for(var i=vec3.create(), u=vec3.create(), c=vec2.create(), l=-180; 180>=l; l+=1)
            for(var s=-90; 90>=s; s+=1){
                vec2.set(a, l, s);
                vec2.set(c, (l+180)/360, 1-(s+90)/180);
                project_mercator(i, a);
                vec3.set(u, 0, 0, -1);
                e(n, i);//e(n, i, u);
                project_ecef(i, a);
                vec3.normalize(u, i);
                e(n, i);//e(n, i, u);
                e(n, c);
            }
        for(var f=0; 360>f; ++f)
            for(var v=0; 180>v; ++v){
                o.push(t(f, v), t(f+1, v), t(f+1, v+1), t(f+1, v+1), t(f, v+1), t(f, v));
            }
        this.buffers.grid.vert=webgl.makeVertexBuffer(new Float32Array(n)),
            this.buffers.grid.elem=webgl.makeElementBuffer(new Uint16Array(o)),
            this.grid_vert_count=n.length/50,
            this.grid_elem_count=o.length,
            this.grid_vert_stride_bytes=32
    };

//BufferGeometry的方式
   var geometry = new THREE.BufferGeometry();
   var radius=200;
   var widthSegments =360;
   var heightSegments = 180;
   var vertexCount = ( ( widthSegments + 1 ) * ( heightSegments + 1 ) );


    var positions = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );
    var uvs = new THREE.BufferAttribute( new Float32Array( vertexCount * 2 ), 2 );
    var index = 0, vertices = [];

    for ( var y = 0; y <= heightSegments; y ++ ) {
        var verticesRow = [];
        var v = y / heightSegments;
        for ( var x = 0; x <= widthSegments; x ++ ) {
            var u = x / widthSegments;

            var px = - radius * Math.cos( u * Math.PI * 2 ) * Math.sin( v * Math.PI );
            var py = radius * Math.cos( v * Math.PI );
            var pz = radius * Math.sin( u * Math.PI * 2 ) * Math.sin( v * Math.PI );

            positions.setXYZ( index, px, py, pz );

            uvs.setXY( index, u, 1 - v );

            verticesRow.push( index );
            index ++;
        }
        vertices.push( verticesRow );
    }



    //经纬度的方式构建地球



/*
  for (var l = -widthSegments/2; widthSegments/2 >= l; l++)
    {
        for (var s = -heightSegments/2; heightSegments/2 >= s; s++) // for (var s = -90; 90 >= s; s += 1)
        {
            a.x = l; a.y = s;

            c.x = (l + 180) / 360;
            c.y = 1 - (s + 90) / 180;

            var u=(l + 180) / 360;
            var v=1 - (s + 90) / 180;

            project_mercator( i, a); // GTW.project_mercator(i, a);
            u.x = 0; u.y = 0; u.z = -1; //vec3.set(u, 0, 0, -1);
            pos0.Add(i); // e(n, i, u);

            project_ecef( i, a); // GTW.project_ecef(i, a);
            pos1.Add(i); //e(n, i, u); //将i和u的数据加入n中
            //u = Vector3.Normalize(i); //vec3.normalize(u, i);
            //pos1.Add(i);
            tex0.Add(c); //e(n, c);
        }
    }
*/


/*

    var build_grid = function() {
        function t(e, t) {
            return 181 * e + t
        }

        var positions = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );
        var uvs = new THREE.BufferAttribute( new Float32Array( vertexCount * 2 ), 2 );
        var index = 0, vertices = [];

        var i = new THREE.Vector3();
        var u = new THREE.Vector3();
        var c = new THREE.Vector3();

        var n = [],
            o = [],
            a = vec3.create();
        a[2] = -r;


        for (var l = -180; 180 >= l; l++ )
            for (var s = -90; 90 >= s; s++ )
            { vec2.set(a, l, s);
                vec2.set(c, (l + 180) / 360, 1 - (s + 90) / 180);
                project_mercator(i, a);
                vec3.set(u, 0, 0, -1);
                e(n,i);//e(n, i, u);
                project_ecef(i, a);
                vec3.normalize(u, i);
                e(n,i);//e(n, i, u);
                e(n, c);
            }


        for (var f = 0; 360 > f; ++f)
            for (var v = 0; 180 > v; ++v)
            { o.push(t(f, v), t(f + 1, v), t(f + 1, v + 1), t(f + 1, v + 1), t(f, v + 1), t(f, v));}
        this.buffers.grid.vert = webgl.makeVertexBuffer(new Float32Array(n)),
            this.buffers.grid.elem = webgl.makeElementBuffer(new Uint16Array(o)),
            this.grid_vert_count = n.length / 50,
            this.grid_elem_count = o.length,
            this.grid_vert_stride_bytes = 32
    };
*/


    var indices = [];
    for ( var y = 0; y < heightSegments; y ++ ) {
        for ( var x = 0; x < widthSegments; x ++ ) {

            var v1 = vertices[ y ][ x + 1 ];
            var v2 = vertices[ y ][ x ];
            var v3 = vertices[ y + 1 ][ x ];
            var v4 = vertices[ y + 1 ][ x + 1 ];

            if ( y !== 0 ) indices.push( v1, v2, v4 );
            if ( y !== heightSegments - 1 ) indices.push( v2, v3, v4 );

        }

    }

    geometry.setIndex( new ( positions.count > 65535 ? THREE.Uint32Attribute : THREE.Uint16Attribute )( indices, 1 ) );
    geometry.addAttribute( 'position', positions );
    geometry.addAttribute( 'uv', uvs );

    geometry.computeBoundingSphere();

    console.log('earth.js');
    return {
        geometry:geometry

    }

 });










