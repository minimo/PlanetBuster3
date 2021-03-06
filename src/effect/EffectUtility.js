/*
 *  EffectUtility.js
 *  2014/08/08
 *  @auther minimo  
 *  This Program is MIT license.
 */

(function() {

//爆発エフェクト投入（標準）
pb3.Effect.enterExplode = function(parentScene, x, y, vx, vy, delay) {
    vx = vx || 0;
    vy = vy || 0;
    delay = delay || 0;
    pb3.Effect.Explode(delay).addChildTo(parentScene).setPosition(x, y).setVelocity(vx, vy, 0);

    var val = rand(5, 10);
    for (var i = 0; i < val; i++) {
        var rad = rand(0, 359) * toRad;
        var v = rand(5, 10);
        var vx2 = Math.cos(rad) * v;
        var vy2 = Math.sin(rad) * v;
        var delay2 = delay+rand(0, 10);
        var pattern = 0;
        if (i > val-2) pattern = rand(1, 3);
        pb3.Effect.Debri(pattern, delay2).addChildTo(parentScene).setPosition(x, y).setVelocity(vx2, vy2, 0.9);
    }
}

//爆発エフェクト投入（小）
pb3.Effect.enterExplodeSmall = function(parentScene, x, y, vx, vy, delay) {
    vx = vx || 0;
    vy = vy || 0;
    delay = delay || 0;
    pb3.Effect.Explode(delay).addChildTo(parentScene).setPosition(x, y).setVelocity(vx, vy, 0);

    var val = rand(3, 10);
    for (var i = 0; i < val; i++) {
        var rad = rand(0, 359) * toRad;
        var v = rand(5, 10);
        var vx2 = Math.cos(rad) * v;
        var vy2 = Math.sin(rad) * v;
        var delay2 = delay+rand(0, 10);
        var pattern = 0;
        if (i > val-2) pattern = rand(1, 3);
        pb3.Effect.Debri(pattern, delay2).addChildTo(parentScene).setPosition(x, y).setVelocity(vx2, vy2, 0.9);
    }
}

//爆発エフェクト投入（大）
pb3.Effect.enterExplodeLarge = function(parentScene, x, y, vx, vy, delay) {
    vx = vx || 0;
    vy = vy || 0;
    delay = delay || 0;
    pb3.Effect.ExplodeLarge(delay).addChildTo(parentScene).setPosition(x, y).setVelocity(vx, vy, 0);

    var val = rand(10, 20);
    for (var i = 0; i < val; i++) {
        var rad = rand(0, 359) * toRad;
        var v = rand(5, 10);
        var vx2 = Math.cos(rad) * v;
        var vy2 = Math.sin(rad) * v;
        var delay2 = delay+rand(0, 10);
        var pattern = rand(0, 3);
        pb3.Effect.Debri(pattern, delay2).addChildTo(parentScene).setPosition(x, y).setVelocity(vx2, vy2, 0.9);
    }
}

//爆発エフェクト投入（地上）
pb3.Effect.enterExplodeGround = function(parentScene, x, y, vx, vy, delay) {
    vx = vx || 0;
    vy = vy || 0;
    delay = delay || 0;
    pb3.Effect.ExplodeGround(delay).addChildTo(parentScene).setPosition(x, y).setVelocity(vx, vy, 0).setScale(2.0);

    var val = rand(5, 10);
    for (var i = 0; i < val; i++) {
        var rad = rand(0, 359) * toRad;
        var v = rand(5, 10);
        var vx2 = Math.cos(rad) * v;
        var vy2 = Math.sin(rad) * v;
        var delay2 = delay+rand(0, 10);
        var pattern = rand(0, 3);
        pb3.Effect.Debri(pattern, delay2).addChildTo(parentScene).setPosition(x, y).setVelocity(vx2, vy2, 0.9);
    }
}

//破片投入
pb3.Effect.enterDebrisSmall = function(parentScene, x, y, num, delay) {
    num = num || 5;
    delay = delay || 0;
    for (var i = 0; i < num; i++) {
        var rad = rand(0, 359) * toRad;
        var v = rand(5, 10);
        var vx2 = Math.cos(rad) * v;
        var vy2 = Math.sin(rad) * v;
        var delay2 = delay+rand(0, 10);
        var pattern = 0;
        pb3.Effect.Debri(pattern, delay2).addChildTo(parentScene).setPosition(x, y).setVelocity(vx2, vy2, 0.9);
    }
}

})();
