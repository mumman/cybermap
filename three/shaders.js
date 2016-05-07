/**
 * Created by Administrator on 2016/4/28.
 */
define(function(){
    var shader = {
        'earth':{
            uniforms:{
                baseTexture: {type: "t", value: null},
                mixAmount: {type: "f", value: 0.0}
            },
            vertexShader:[
                'uniform float mixAmount;',
                'varying vec2 vUv;',
                'void main()',
                '{',
                'vUv = uv;',
                'vec3 goalPosition = 200.0 * vec3( 0, uv.y, -uv.x ) + vec3(0.0, -100.0, 100.0);',
                'vec3 newPosition = mix( position, goalPosition, mixAmount );',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );',
                '}'
            ].join('\n'),
            fragmentShader:[
                'uniform sampler2D baseTexture;',
                'varying vec2 vUv;',
                'void main()',
                '{',
                'gl_FragColor = texture2D( baseTexture, vUv );',
                '}'
            ].join('\n')
        },

        'grid':{
            uniforms:{
                t_blur: {type: "t", value: null},
                t_pattern: {type: "t", value: null},

                color0:{type:'v3',value: new THREE.Vector3( 0.07, 0.09, 0.07 )},
                color1:{type:'v3',value: new THREE.Vector3( 0.36, 0.41, 0.36 )},

                blend:{type:"f",value:0.0},
                offset_x:{type:"f",value:0.0},

                pattern_scale:{type:'v2',value:new THREE.Vector2( 1440, 720 )},

            },

            vertexShader:[
                'attribute vec3 position2;',
                'uniform float blend;',
                'uniform float offset_x;',
                'varying vec2 v_texcoord;',
                'void main()',
                '{',
                'v_texcoord = uv;',
                'vec3 P = mix(position, position2, blend);',
                'P.x += offset_x;',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( P, 1.0 );',
                '}'
            ].join('\n'),
            fragmentShader:[
                'uniform sampler2D t_blur;',
                'uniform sampler2D t_pattern;',
                'uniform vec3 color0;',
                'uniform vec3 color1;',
                'uniform vec2 pattern_scale;',
                'varying vec2 v_texcoord;',
                'void main()',
                '{',
                    'float pattern = texture2D(t_pattern, pattern_scale * v_texcoord).r;',
                    'float blur = texture2D(t_blur, v_texcoord).r;',
                    'gl_FragColor.rgb = mix(color0, color1, blur) + vec3(pattern);',
                    'gl_FragColor.a = 1.0;',

                '}'
            ].join('\n')
        },
        'country':{
           /* attributes:{
                position2: {type: "v3", value: new THREE.Vector3( 0, 0, 0 )},
                normal2: {type: "v3", value: new THREE.Vector3( 0, 0, 0 )},

            },*/
            uniforms:{
                offset_x: {type: "f", value: 0.0},
                t_blur: {type: "t", value: null},
                blend: {type: "f", value: 0.0},
                light_pos: {type: "v3", value: new THREE.Vector3( 0, 0, 0 )},
                view_pos: {type: "v3", value: new THREE.Vector3( 0, 0, 0 )},
                color0: {type: "v3", value: new THREE.Vector3( 0.07, 0.09, 0.07 )},
                color1: {type: "v3", value: new THREE.Vector3( 0.07, 0.09, 0.07 )},
                tone: {type: "f", value: 0.0},
                c: {type: "f", value: 0.0},
                height: {type: "f", value: 0.0},


               /* attribute vec3 position;
                attribute vec3 normal;
                attribute vec3 position2;
                attribute vec3 normal2;
                attribute vec2 texcoord;
                varying vec3 v_normal;
                varying vec2 v_texcoord;
                varying vec3 v_light_vec;
                varying vec3 v_view_vec;
                uniform mat4 mvp;

*/
            },
            vertexShader:[
                'uniform float blend;',
                'uniform float offset_x;',
                'varying vec2 v_texcoord;',
                'varying vec3 v_normal',
                'varying vec3 v_light_vec',
                'varying vec3 v_view_vec',


                'void main()',
                '{',

                'vec3 P = mix(position, normal, blend);',
                'P.x += offset_x;',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( P, 1.0 );',



                '}'

            /*    vec3 P = mix(position, position2, blend);
                P.x += offset_x;

                v_normal = mix(normal, normal2, blend);
                P += height * v_normal;

                gl_Position = mvp * vec4(P, 1.0);

                v_texcoord = texcoord;
                v_light_vec = light_pos - P;
                v_view_vec = view_pos - P;*/


            ].join('\n'),
            fragmentShader:[
                'uniform sampler2D t_blur;',
                'uniform sampler2D t_pattern;',
                'uniform vec3 color0;',
                'uniform vec3 color1;',
                'uniform vec2 pattern_scale;',
                'varying vec2 v_texcoord;',
                'varying vec3 v_normal',
                'varying vec3 v_light_vec',
                'varying vec3 v_view_vec',
                'void main()',
                '{',
                'float pattern = texture2D(t_pattern, pattern_scale * v_texcoord).r;',
                'float blur = texture2D(t_blur, v_texcoord).r;',
                'gl_FragColor.rgb = mix(color0, color1, blur) + vec3(pattern);',
                'gl_FragColor.a = 1.0;',

                '}'
            ].join('\n')
        },














        'stars':{
            uniforms:{
                color:{type:'v4',value: new THREE.Vector4( 255, 255, 255,0.5)}

            },
            vertexShader:[
                'void main()',
                '{',
               /* 'gl_PointSize = position.w;',*/
                'gl_PointSize = 0.125;',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
                '}'
            ].join('\n'),
            fragmentShader:[
                'uniform vec4 color;',
                'void main()',
                '{',
                'gl_FragColor = color;',
                '}'
            ].join('\n')
        },




    /*    'corona1':{
            uniforms:{
                color0:{type:'v4',value:new THREE.Vector3(1,1,1,1)}
            },
            vertexShader:[
                'void main()',
                '{',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
                '}'
            ].join('\n'),
            fragmentShader:[
                'uniform vec4 color0;',
                'void main()',
                '{',
                'gl_FragColor = color0;',
                '}'
            ].join('\n')
        },*/















        'corona':{
            uniforms:{
                color0:{type:'v3',value:new THREE.Vector3(0.07, 0.25, 0.16)},
                color1:{type:'v3',value:new THREE.Vector3(0,0,0)},
                t_smoke:{type:'t',value:null},
                time:{type:'f',value:0.934},
                zoff:{type:'f',value:0.0},




                _SrcBlend:{type:'f',value:0.0},
                _DstBlend:{type:'f',value:0.0},


        },
        vertexShader:[
           /*     'uniform float zoff;',
                 'varying vec2 v_texcoord;',
            'attribute vec3 position;
                 'void main()',
                 '{',
                 'float s = 10.0 + (10.0 * position.w);',
                 'vec3 P = vec3(s * position.xy, zoff);',
                 'v_texcoord = position.zw;',
                 /!*'P = bill * P;',*!/
                 'gl_Position = projectionMatrix * modelViewMatrix * vec4(P, 1.0);',
                 '}'
*/
                'uniform float zoff;',
                'attribute vec4 positionW;',
                'varying vec2 v_texcoord;',
                'void main()',
                '{',
                'float s = 10.0 + (10.0 * positionW.w);',
                'vec3 p = vec3(s * positionW.xy, zoff);',
                'v_texcoord = positionW.zw;',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );',
                '}'

            ].join('\n'),
            fragmentShader:[
                'varying vec2 v_texcoord;',
                'uniform vec3 color0;',
                'uniform vec3 color1;',
                'uniform float time;',
                'uniform sampler2D t_smoke;',
                'void main()',
                '{',
                'vec2 uv1 = vec2(5.0*v_texcoord.x + 0.01*time, 0.8 - 1.5*v_texcoord.y);',
                'float smoke = texture2D(t_smoke, uv1).r;',
                'uv1 = vec2(3.0*v_texcoord.x - 0.007*time, 0.9 - 0.5*v_texcoord.y);',
                'smoke *= 1.5*texture2D(t_smoke, uv1).r;',
                'float t = pow(v_texcoord.y, 0.25);',
                'gl_FragColor.rgb = mix(color0, color1, t) + 0.3*smoke;',
                'gl_FragColor.a = 1.0;',
                '}'


               /*  'uniform vec3 color0;',
                 'void main()',
                 '{',
                 'gl_FragColor.rgb= color0;',
                 '}'*/

            ].join('\n')
        }


/*        // corona //
        attribute vec4 vertex;
    varying vec2 v_texcoord;
    uniform mat4 mvp;

    uniform mat3 bill;



    uniform vec4 color;
    uniform sampler2D t_smoke;
    uniform float time;

    uniform vec3 color0;
    uniform vec3 color1;
    uniform float zoff;

    // corona.vertex //
    void main() {
        float s = 10.0 + (10.0 * vertex.w);
        vec3 P = vec3(s * vertex.xy, zoff);
        P = bill * P;
        gl_Position = mvp * vec4(P, 1.0);
        v_texcoord = vertex.zw;
    }

    // corona.fragment //
    void main() {
        vec2 uv = vec2(5.0*v_texcoord.x + 0.01*time, 0.8 - 1.5*v_texcoord.y);
        float smoke = texture2D(t_smoke, uv).r;
        uv = vec2(3.0*v_texcoord.x - 0.007*time, 0.9 - 0.5*v_texcoord.y);
        smoke *= 1.5*texture2D(t_smoke, uv).r;

        float t = pow(v_texcoord.y, 0.25);
        gl_FragColor.rgb = mix(color0, color1, t) + 0.3*smoke;
        gl_FragColor.a = 1.0;
    }

        */

    /*    _SrcBlend ("SrcBlend", Int) = 5 // SrcAlpha
    _DstBlend ("DstBlend", Int) = 10 // OneMinusSrcAlpha
    _Fade ("Fade", Float) = 1.0*/





    };

    console.log('shaders.js');
    return {
      shader:shader
    }
});





