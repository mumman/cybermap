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
                baseTexture: {type: "t", value: null},
                blend:{type:"f",value:0.0}
            },
            vertexShader:[
                'uniform float blend;',
                'varying vec2 vUv;',
                'void main()',
                '{',
                'vUv = uv;',
                'vec3 P = mix(position, normal, blend);',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( P, 1.0 );',
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
        }
    };

    console.log('shaders.js');
    return {
      shader:shader
    }
});