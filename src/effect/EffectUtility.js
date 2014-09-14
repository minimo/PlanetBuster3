/*
 *  EffectUtility.js
 *  2014/08/08
 *  @auther minimo  
 *  This Program is MIT license.
 */

(function() {

//爆発エフェクト投入
pb3.Effect.enterExplodeSmall = function(parentScene, x, y, vx, vy, delay) {
    delay = delay || 0;
    pb3.Effect.ExplodeSmall(delay).addChildTo(parentScene).setPosition(x, y).setVelocity(vx, vy, 0);

    var val = rand(5, 10);
    for (var i = 0; i < val; i++) {
        var rad = rand(0, 359) * toRad;
        var v = rand(5, 10);
        var vx2 = Math.cos(rad) * v;
        var vy2 = Math.sin(rad) * v;
        var delay2 = delay+rand(0, 10);
        var pattern = 0;
        if (i > val-2) pattern = rand(1, 3)
        pb3.Effect.Chip(pattern, delay2).addChildTo(parentScene).setPosition(x, y).setVelocity(vx2, vy2, 0.9);
    }
}

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
