/**
 * Created by Administrator on 2016/6/28.
 */
//全局对象
var GTW=GTW || {};
(function(){
    var e=1, t=10;
    var clamp=THREE.Math.clamp;
    var deg2rad=THREE.Math.degToRad;
    //墨卡托
    GTW.project_mercator=function(r, n){
        var o=n.x,
            a=n.y,
            i=Math.PI*a/180,
            u=90/Math.PI*Math.log(Math.tan(0.25*Math.PI+0.5*i));

        r.x=-o/180*t;
        r.y=clamp(u/90, -1, 1)*t;
        r.z=-e*n.z*t;
    };
    //地心
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
    //线性插值
    GTW.lerp= function (value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    };
    //夹紧限制
    GTW.clamp = function (value, min, max) {
        if (value < min) {
            return min;
        }
        else if (value > max) {
            return max;
        }

        return value;
    };

    GTW.z = {
        //camera: new GTW.Camera,
        //flash: function(e) {
        //    Te.flash(e)
        //},
        //high_quality: B,
        //orbit: {
        //    rotate: vec3.fromValues(deg2rad(15), 0, 0),
        //    translate: vec3.fromValues(0, 0, -20),
        //    pos: vec3.create(),
        //    dir: vec3.create()
        //},
        geocam: {
            coord: new THREE.Vector3(0, 0, 5),  //coord: vec3.fromValues(0, 0, 5),
            coord_target:new THREE.Vector3(0, 0, 2),  //coord_target: vec3.fromValues(0, 0, 2),
            coord_delta:new THREE.Vector3(),  // coord_delta: vec3.create(),
            lerp_speed: .2
        },
        //camera_mode: "geocam",
        //time: timeNow(),
        //demo_time_start: 0,
        //demo_time: 0,
        //pickRay: null,
        //light: {
        //    position: vec3.fromValues(20, 20, -20),
        //    position2: vec3.fromValues(20, -25, -20)
        //},
        project: function(e, t) {
            this.projection.blend < .5 ? GTW.project_mercator(e, t) : GTW.project_ecef(e, t)
        },
        projection: {
            blend: 1,
            dir: 1
        },
        //pick_required: !1,
        //pick_index: -1,
        //palette: "dark",
        //solo_system_id: 1,
        //draw_world: !0
    };

})();


