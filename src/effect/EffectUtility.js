/*
 *  EffectUtility.js
 *  2014/08/08
 *  @auther minimo  
 *  This Program is MIT license.
 */

(function() {


pb3.Effect.enterExplodeSmall = function(parentScene, x, y, vx, vy) {
//    pb3.Effect.ExplodeSmall().addChildTo(parentScene).setPosition(x, y).setVelocity(vx, vy, 0.9);
    //破片をばら撒く
    for (var i = 0; i < 100; i++) {
        var rad = rand(0, 359)*toRad;
        var v = rand(10, 20);
        var vx2 = Math.cos(rad)*v;
        var vy2 = Math.sin(rad)*v;
        var n = rand(0, 3);
        if (n == 3) {
            pb3.Effect.ChipSmall().addChildTo(parentScene).setPosition(x, y).setVelocity(vx2, vy2, 1);
        } else {
            pb3.Effect.Chip(n).addChildTo(parentScene).setPosition(x, y).setVelocity(vx2, vy2, 1);
        }
    }
}

//爆発エフェクト（小）
tm.define("pb3.Effect.ExplodeSmall", {
    superClass: "pb3.Effect.EffectBase",
    layer: LAYER_EFFECT_UPPER,

    init: function() {
        this.superInit("explode1", 64, 64, 2, 0, 17);
    },
});

//破片
tm.define("pb3.Effect.Chip", {
    superClass: "pb3.Effect.EffectBase",
    layer: LAYER_EFFECT_UPPER,

    init: function(num) {
        num = num || 0;
        num = Math.clamp(num, 0, 2);
        this.superInit("chip1", 16, 16, 10, num*8, (num+1)*8-1);
    },
});

//破片
tm.define("pb3.Effect.ChipSmall", {
    superClass: "pb3.Effect.EffectBase",
    layer: LAYER_EFFECT_UPPER,

    init: function() {
        this.superInit("chip2", 8, 8, 10, 0, 23);
    },
});


//自機爆発パーティクル
pb3.burnParticlePlayer = function(x, y) {
    color = 200;

    var num = 60;
    var life = 2000;
    var base = tm.app.Object2D().setPosition(x, y);
    base.layer = LAYER_EFFECT_UPPER;
    for (var i = 0; i < num; i++ ) {
        var p = pb3.Effect.Particle(96, 1, 0.96, color).addChildTo(base);
        var r = rand(0, 618) / 100;
        var d = rand(80, 120);
        var x = Math.cos(r)*d;
        var y = Math.sin(r)*d;
        var w = rand(0, 300);
        p.tweener.moveBy(x+rand(-20,20), y+rand(-20,20), life, "easeOutCubic");
    }
    base.tweener.clear().wait(life).call(function(){this.removeChild();this.remove()}.bind(base));
    return base;
}

//衝撃波
pb3.ShockWave = function(size, x, y) {
}

})();
