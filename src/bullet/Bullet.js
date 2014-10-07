/*
 *  Bullet.js
 *  2014/07/16
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

pb3.checkLayers = [LAYER_OBJECT_UPPER, LAYER_OBJECT, LAYER_OBJECT_LOWER];

tm.define("pb3.Bullet", {
    superClass: "tm.bulletml.Bullet",
    layer: LAYER_BULLET,
    parentScene: null,
    player: null,

    param: null,
    id: -1,

    isVanish: false,
    isVanishEffect: true,

    rollAngle: 10,

    init: function(runner, param, id) {
        this.superInit(runner);

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;

        this.param = param;
        this.id = id || -1;

        //弾種別グラフィック
//        this.removeChildren();
        var size = 20, pos = 2, gra = "R";
        switch (param.type) {
            case "RS":
                size = 16; pos = 2; gra = "R"
                break;
            case "BS":
                size = 16; pos = 2; gra = "B"
                break;

            case "RM":
                size = 20; pos = 3; gra = "R"
                break;
            case "BM":
                size = 20; pos = 3; gra = "B"
                break;

            case "RL":
                size = 32; pos = 3; gra = "R"
                break;
            case "BL":
                size = 32; pos = 3; gra = "B"
                break;

            case "RE":
                size = 24; pos = 3; gra = "RE"
                this.scaleY = 0.8;
                break;
            case "BE":
                size = 24; pos = 3; gra = "BE"
                this.scaleY = 0.8;
                break;

            case "RES":
                size = 24; pos = 3; gra = "RE"
                this.setScale(0.6);
                break;
            case "BES":
                size = 24; pos = 3; gra = "BE"
                this.setScale(0.6);
                break;

            default:
                size = 6; pos = 1; gra = "R"
                break;
        }
        if (gra != "RE" && gra != "BE") {
            //通常グラフィック
            var size_h = size/2;
            tm.display.Shape(size,  size  ).addChildTo(this).canvas = pb3.bulletGraphic[gra+"-1"];
            tm.display.Shape(size_h,size_h).addChildTo(this).setPosition(-pos,-pos).canvas = pb3.bulletGraphic[gra+"-2"];
            tm.display.Shape(size_h,size_h).addChildTo(this).setPosition( pos, pos).canvas = pb3.bulletGraphic[gra+"-2"];
        } else {
            //楕円弾
            tm.display.Sprite("bullet1", 24, 24).addChildTo(this);
            if (param.type != "RE") setFrameIndex(0);
            else if (param.type != "BE") setFrameIndex(16);
        }

        this.on("enterframe", function(){
            this.rotation += this.rollAngle;

            //自機との当り判定チェック
            if (app.player.isCollision) {
                if (this.isHitElement(app.player) ) {
                    app.player.damage();
                    this.isVanish = true;
                }
            }

            //画面範囲外
            if (this.x<-32 || this.x>GS_W+32 || this.y<-32 || this.y>GS_H+32) {
                this.isVanish = true;
                this.isVanishEffect = false;
            }

            if (this.isVanish) this.remove();
        }.bind(this) );

        //リムーブ時
        this.on("removed", function(){
            if (this.isVanishEffect) pb3.Effect.BulletVanish(this).addChildTo(app.currentScene);
            this.removeChildren();
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
            this.scaleX = 1.5;
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

        if (this.x<-20 || this.x>GS_W+20 || this.y<-20 || this.y>GS_H+20) {
            this.remove();
        }

        //敵との当り判定チェック
        for (var i = 0; i < 3; i++) {
            var layer = this.parentScene.layers[pb3.checkLayers[i]];
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
        pb3.Effect.ShotImpact().addChildTo(this.parentScene).setPosition(this.x, this.y);
        pb3.Effect.enterDebrisSmall(this.parentScene, this.x, this.y, 1);
        this.removeChildren();
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

    pb3.bulletGraphic["R-1"] = tm.graphics.Canvas().resize(32, 32).setFillStyle(color1).fillRect(0, 0, 32, 32);
    pb3.bulletGraphic["R-2"] = tm.graphics.Canvas().resize(16, 16).setFillStyle(color2).fillRect(0, 0, 16, 16);

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

    pb3.bulletGraphic["B-1"] = tm.graphics.Canvas().resize(32, 32).setFillStyle(color1).fillRect(0, 0, 32, 32);
    pb3.bulletGraphic["B-2"] = tm.graphics.Canvas().resize(16, 16).setFillStyle(color2).fillRect(0, 0, 16, 16);
}

})();
