/*
 *  Bullet.js
 *  2014/07/16
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("pb3.Bullet", {
    superClass: "tm.bulletml.Bullet",
    layer: LAYER_BULLET,
    parentScene: null,
    player: null,

    param: null,
    id: -1,

    isVanish: false,
    isVanishEffect: true,

    speedRoll: 10,

    init: function(runner, param, id) {
        this.superInit(runner);

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;

        this.param = param;
        this.id = id || -1;

        //弾種別グラフィック
//        this.removeChildren();
        switch (param.type) {
            case "RS":
                tm.display.Shape(20, 20).addChildTo(this).canvas = pb3.bulletGraphic["NormalR-1"];
                tm.display.Shape(10, 10).addChildTo(this).setPosition(-2,-2).canvas = pb3.bulletGraphic["NormalR-2"];
                tm.display.Shape(10, 10).addChildTo(this).setPosition( 2, 2).canvas = pb3.bulletGraphic["NormalR-2"];
                break;
            case "BS":
                tm.display.Shape(20, 20).addChildTo(this).canvas = pb3.bulletGraphic["NormalB-1"];
                tm.display.Shape(10, 10).addChildTo(this).setPosition(-2,-2).canvas = pb3.bulletGraphic["NormalB-2"];
                tm.display.Shape(10, 10).addChildTo(this).setPosition( 2, 2).canvas = pb3.bulletGraphic["NormalB-2"];
                break;
            case "RL":
                tm.display.Shape(32, 32).addChildTo(this).canvas = pb3.bulletGraphic["NormalR-1"];
                tm.display.Shape(16, 16).addChildTo(this).setPosition(-3,-3).canvas = pb3.bulletGraphic["NormalR-2"];
                tm.display.Shape(16, 16).addChildTo(this).setPosition( 3, 3).canvas = pb3.bulletGraphic["NormalR-2"];
                break;
            case "BL":
                tm.display.Shape(32, 32).addChildTo(this).canvas = pb3.bulletGraphic["NormalB-1"];
                tm.display.Shape(16, 16).addChildTo(this).setPosition(-3,-3).canvas = pb3.bulletGraphic["NormalB-2"];
                tm.display.Shape(16, 16).addChildTo(this).setPosition( 3, 3).canvas = pb3.bulletGraphic["NormalB-2"];
                break;
            case "RE":
                tm.display.Shape(32, 32).addChildTo(this).canvas = pb3.bulletGraphic["NormalR-1"];
                tm.display.Shape(16, 16).addChildTo(this).setPosition(-3,-3).canvas = pb3.bulletGraphic["NormalR-2"];
                tm.display.Shape(16, 16).addChildTo(this).setPosition( 3, 3).canvas = pb3.bulletGraphic["NormalR-2"];
                this.scaleY = 0.8;
                break;
            case "BE":
                tm.display.Shape(32, 32).addChildTo(this).canvas = pb3.bulletGraphic["NormalB-1"];
                tm.display.Shape(16, 16).addChildTo(this).setPosition(-3,-3).canvas = pb3.bulletGraphic["NormalB-2"];
                tm.display.Shape(16, 16).addChildTo(this).setPosition( 3, 3).canvas = pb3.bulletGraphic["NormalB-2"];
                this.scaleY = 0.8;
                break;
            default:
                this.body = tm.display.Shape(32, 32).addChildTo(this);
                this.body.canvas = pb3.bulletGraphic["NormalR-1"];
                break;
        }

        this.on("enterframe", function(){
            this.rotation += this.speedRoll;

            //自機との当り判定チェック
            if (app.player.isCollision) {
                if (this.isHitElement(app.player) ) {
                    app.player.damage();
                    this.isVanish = true;
                }
            }

            //画面範囲外
            if (this.x<-32 || this.x>SC_W+32 || this.y<-32 || this.y>SC_H+323) {
                this.isVanish = true;
                this.isVanishEffect = false;
            }

            if (this.isVanish) this.remove();
        }.bind(this) );

        //リムーブ時
        this.on("removed", function(){
            if (this.isVanishEffect) pb3.Effect.BulletVanish(this).addChildTo(app.currentScene);
        }.bind(this));

        this.beforeX = this.x;
        this.beforeY = this.y;
    },
});

tm.define("pb3.ShotBullet", {
    superClass: "tm.display.Sprite",
    layer: LAYER_SHOT,
    parentScene: null,
    player: null,

    speed: 15,
    power: 1,
    defaultSpeed: 15,
    defaultPower: 1,

    init: function(rotation, power, type) {
        if (type == 0) {
            this.superInit("shot1", 16, 16);
            this.setScale(2);
        } else {
            this.superInit("shot2", 16, 32);
//            this.setScale(2);
        }

        this.rotation = rotation || 0;
        this.speed = this.defaultSpeed;
        this.power = power || this.defaultPower;

        this.alpha = 0.8;
        this.blendMode = "lighter";

        rotation-=90;
        this.vx = Math.cos(rotation*toRad) * this.speed;
        this.vy = Math.sin(rotation*toRad) * this.speed;

        //当り判定設定
        this.boundingType = "circle";
        if (type == 0) {
            this.radius = 6;
        } else {
            this.radius = 12;
        }

        this.beforeX = this.x;
        this.beforeY = this.y;
    },
    update: function() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x<-20 || this.x>SC_W+20 || this.y<-20 || this.y>SC_H+20) {
            this.remove();
        }

        //敵との当り判定チェック
        var s = [LAYER_OBJECT_UPPER, LAYER_OBJECT, LAYER_OBJECT_LOWER];
        for (var i = 0; i < 3; i++) {
            var layer = this.parentScene.layers[s[i]];
            layer.children.each(function(a) {
                if (a === app.player) return;
                if (this.parent && a.isCollision && a.isHitElement(this)) {
                    a.damage(this.power);
                    this.vanish();
                    this.remove();
                    return;
                }
            }.bind(this));
        }
    },

    vanish: function() {
        for (var i = 0; i < 5; i++) {
            var p = pb3.Effect.Particle(32, 1, 0.95).addChildTo(this.parentScene).setPosition(this.x, this.y);
            var x = rand(0, 30)-15;
            var y = rand(0, 50)*-1;
            p.tweener.moveBy(x, y, 1000, "easeOutCubic");
        }
    },
});


//弾の画像準備
pb3.setupBullets = function() {
    pb3.bulletGraphic = [];

    var c = 320;
    var color1 = tm.graphics.RadialGradient(16, 16, 0, 16, 16, 16)
        .addColorStopList([
            {offset:0.0, color: "hsla({0}, 50%, 50%, 0.0)".format(c)},
            {offset:0.9, color: "hsla({0}, 50%, 50%, 1.0)".format(c)},
            {offset:1.0, color: "hsla({0}, 50%, 50%, 0.0)".format(c)},
        ]).toStyle();

    var color2 = tm.graphics.RadialGradient(8, 8, 0, 8, 8, 8)
        .addColorStopList([
            {offset:0.0, color: "hsla({0}, 70%, 70%, 1.0)".format(c)},
            {offset:0.9, color: "hsla({0}, 50%, 50%, 0.5)".format(c)},
            {offset:1.0, color: "hsla({0}, 50%, 50%, 0.0)".format(c)},
        ]).toStyle();

    pb3.bulletGraphic["NormalR-1"] = tm.graphics.Canvas()
        .resize(32, 32).setFillStyle(color1).fillRect(0, 0, 32, 32);
    pb3.bulletGraphic["NormalR-2"] = tm.graphics.Canvas()
        .resize(16, 16).setFillStyle(color2).fillRect(0, 0, 16, 16);

    var c = 240;
    var color1 = tm.graphics.RadialGradient(16, 16, 0, 16, 16, 16)
        .addColorStopList([
            {offset:0.0, color: "hsla({0}, 50%, 50%, 0.0)".format(c)},
            {offset:0.9, color: "hsla({0}, 50%, 50%, 1.0)".format(c)},
            {offset:1.0, color: "hsla({0}, 50%, 50%, 0.0)".format(c)},
        ]).toStyle();

    var color2 = tm.graphics.RadialGradient(8, 8, 0, 8, 8, 8)
        .addColorStopList([
            {offset:0.0, color: "hsla({0}, 70%, 70%, 1.0)".format(c)},
            {offset:0.9, color: "hsla({0}, 50%, 50%, 0.5)".format(c)},
            {offset:1.0, color: "hsla({0}, 50%, 50%, 0.0)".format(c)},
        ]).toStyle();

    pb3.bulletGraphic["NormalB-1"] = tm.graphics.Canvas()
        .resize(32, 32).setFillStyle(color1).fillRect(0, 0, 32, 32);
    pb3.bulletGraphic["NormalB-2"] = tm.graphics.Canvas()
        .resize(16, 16).setFillStyle(color2).fillRect(0, 0, 16, 16);

    //ショット
    var shotPath = [
        [16,0], [32,24], [16,32], [0,24],
    ];
    pb3.bulletGraphic["shot"] = tm.graphics.Canvas()
        .resize(32, 32)
        .setColorStyle("hsla(250, 50%, 50%, 1.0)", "hsla(250, 50%, 50%, 1.0)")
        .setLineStyle(2)
        .beginPath()
        .moveTo(shotPath[0][0], shotPath[0][1]);
    for (var i = 1; i < shotPath.length; i++) {
        pb3.bulletGraphic["shot"].lineTo(shotPath[i][0], shotPath[i][1]);
    }
    pb3.bulletGraphic["shot"]
        .lineTo(shotPath[0][0], shotPath[0][1])
        .stroke()
        .fill()
        .closePath();
}

})();
