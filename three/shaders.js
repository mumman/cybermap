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
                'uniform float blend;',
                'uniform float offset_x;',
                'varying vec2 v_texcoord;',
                'void main()',
                '{',
                'v_texcoord = uv;',
                'vec3 P = mix(position, normal, blend);',
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
        }
    };

    console.log('shaders.js');
    return {
      shader:shader
    }
});





