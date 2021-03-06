/*
 *  Effect.js
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 */
pb3.Effect = [];

(function() {

//汎用エフェクト
tm.define("pb3.Effect.EffectBase", {
    superClass: "tm.display.Sprite",
    layer: LAYER_EFFECT_UPPER,

    //インデックス更新間隔
    interval: 2,

    //開始インデックス
    startIndex: 0,

    //最大インデックス
    maxIndex: 8,

    //現在インデックス
    index: 0,

    //遅延表示フレーム数
    delay: 0,

    //ループフラグ
    loop: false,

    //シーンから削除フラグ
    isRemove: false,

    //加速度
    velocityX: 0,   //Ｘ座標方向
    velocityY: 0,   //Ｙ座標方向
    velocityD: 0,   //減衰率

    //相対地上座標
    groundX: 0,
    groundY: 0,

    //地上エフェクトフラグ
    ifGround: false,

    time: 0,

    init: function(tex, width, height, interval, startIndex, maxIndex, delay) {
        this.superInit(tex, width, height);
        this.interval = interval || 4;
        this.startIndex = startIndex || 0;
        this.maxIndex = maxIndex || 8;
        this.delay = delay || 0;
        if (this.delay < 0) this.delay *= -1;
        this.time = -this.delay;

        this.index = this.startIndex;
        this.setFrameIndex(this.index);

        this.parentScene = app.currentScene;

        this.on("enterframe", this.defaultEnterFrame);
    },

    defaultEnterFrame: function() {
        if (this.time < 0) {
            this.visible = false;
            this.time++;
            return;
        }
        if (this.time == 0) this.visible = true;

        //地上物現座標調整
        if (this.isGround) {
            var x = this.groundX-this.parentScene.ground.x;
            var y = this.groundY-this.parentScene.ground.y;
            this.x-=x;
            this.y-=y;
            this.groundX = this.parentScene.ground.x;
            this.groundY = this.parentScene.ground.y;
        }

        if (this.time % this.interval == 0) {
            this.setFrameIndex(this.index);
            this.index++;
            if (this.index > this.maxIndex) {
                if (this.loop) {
                    this.index = this.startIndex;
                } else {
                    this.isRemove = true;
                }
            }
        }
        //画面範囲外
        if (this.x<-32 || this.x>SC_W+32 || this.y<-32 || this.y>SC_H+32) {
            this.isRemove = true;
        }

        this.addVelocity();
        this.time++;
        if (this.isRemove) {
            this.removeChildren();
            this.remove();
        }
    },

    //現在の座標に加速度を加算
    addVelocity: function() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityX *= this.velocityD;
        this.velocityY *= this.velocityD;
    },

    //加速度の設定
    setVelocity: function(x, y, decay) {
        this.velocityX = x;
        this.velocityY = y;
        this.velocityD = decay;
        return this;
    },

    //ループ設定
    setLoop: function(b) {
        this.loop = b;
        return this;
    }
});

//爆発エフェクト（標準）
tm.define("pb3.Effect.Explode", {
    superClass: "pb3.Effect.EffectBase",
    layer: LAYER_EFFECT_UPPER,

    init: function(delay) {
        this.superInit("effect", 64, 64, 2, 0, 17, delay);
    },
});

//爆発エフェクト（小）
tm.define("pb3.Effect.ExplodeSmall", {
    superClass: "pb3.Effect.EffectBase",
    layer: LAYER_EFFECT_UPPER,

    init: function(delay) {
        this.setFrameTrimming(256, 256, 128, 32);
        this.superInit("effect", 16, 16, 4, 8, 15, delay);
    },
});

//爆発エフェクト（極小）
tm.define("pb3.Effect.ExplodeSmall2", {
    superClass: "pb3.Effect.EffectBase",
    layer: LAYER_EFFECT_UPPER,

    init: function(delay) {
        this.setFrameTrimming(256, 256, 128, 32);
        this.superInit("effect", 16, 16, 4, 0, 7, delay);
    },
});

//爆発エフェクト（大）
tm.define("pb3.Effect.ExplodeLarge", {
    superClass: "pb3.Effect.EffectBase",
    layer: LAYER_EFFECT_UPPER,

    init: function(delay) {
        this.setFrameTrimming(0, 192, 192, 96);
        this.superInit("effect", 48, 48, 4, 0, 7, delay);
    },
});

//爆発エフェクト（地上）
tm.define("pb3.Effect.ExplodeGround", {
    superClass: "pb3.Effect.EffectBase",
    layer: LAYER_EFFECT_LOWER,
    isGround: true,

    init: function(delay) {
        this.setFrameTrimming(256, 192, 256, 48);
        this.superInit("effect", 32, 48, 4, 0, 7, delay);

        this.groundX = this.parentScene.ground.x;
        this.groundY = this.parentScene.ground.y;
    },
});

//破片
//num:0=小  1-3=中
tm.define("pb3.Effect.Debri", {
    superClass: "pb3.Effect.EffectBase",
    layer: LAYER_EFFECT_UPPER,

    init: function(num, delay) {
        num = num || 0;
        num = Math.clamp(num, 0, 3);
        if (num == 0) {
            this.setFrameTrimming(192, 128, 64, 48);
            this.superInit("effect", 8, 8, 2, 0, 8, delay);
        } else {
            num--;
            this.setFrameTrimming(384, 128, 128, 48);
            this.superInit("effect", 16, 16, 4, num*8, (num+1)*8-1, delay);
        }
    },
});

//爆発エフェクト（プレイヤー）
tm.define("pb3.Effect.ExplodePlayer", {
    superClass: "pb3.Effect.EffectBase",
    layer: LAYER_EFFECT_UPPER,

    init: function(delay) {
        this.setFrameTrimming(0, 288, 384, 48);
        this.superInit("effect", 48, 48, 4, 0, 7, delay);
    },
});

//ショット着弾エフェクト
tm.define("pb3.Effect.ShotImpact", {
    superClass: "pb3.Effect.EffectBase",
    layer: LAYER_EFFECT_UPPER,

    init: function() {
        this.setFrameTrimming(256, 240, 128, 16);
        this.superInit("effect", 16, 16, 2, 0, 7);
    },
});

//汎用パーティクル
tm.define("pb3.Effect.Particle", {
    superClass: "tm.display.Shape",
    layer: LAYER_EFFECT_UPPER,

    alpha: 1.0,
    alphaDecayRate: 0.85,
    size: 0,

    image: null,
    isEffect: true,
    isUpper: true,

    init: function(size, initialAlpha, alphaDecayRate, color) {
        size = size || 32;
        color = color || 0;
        this.superInit({width:size, height:size});

        if (initialAlpha === undefined) initialAlpha = 1;
        if (alphaDecayRate === undefined) alphaDecayRate = 0.9;

        this.size = size;
        this.alpha = initialAlpha;
        this.alphaDecayRate = alphaDecayRate;
        this.blendMode = "lighter";

        var c = this.canvas;
        c.setFillStyle(
            tm.graphics.RadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
                .addColorStopList([
                    {offset:0.0, color: "hsla({0}, 60%, 50%, 1.0)".format(color)},
                    {offset:0.5, color: "hsla({0}, 60%, 50%, 0.5)".format(color)},
                    {offset:1.0, color: "hsla({0}, 60%, 50%, 0.0)".format(color)},
                ]).toStyle()
            ).fillRect(0, 0, size, size);

        this.on("enterframe", function() {
            this.alpha *= this.alphaDecayRate;
            if (this.alpha < 0.01) {
                this.remove();
                return;
            } else if (1.0 < this.alpha) {
                this.alpha = 1.0;
            }
        }.bind(this));
    },
});

//敵弾消滅エフェクト
tm.define("pb3.Effect.BulletVanish", {
    superClass: "tm.display.Shape",
    layer: LAYER_EFFECT_UPPER,

    alpha: 1.0,
    alphaDecayRate: 0.9,
    size: 0,

    image: null,
    isEffect: true,
    isUpper: true,

    deltaX: 0.0,    //水平方向速度
    deltaY: 0.0,    //垂直方向速度
    deltaA: 1.0,    //速度減衰率

    init: function(bullet) {
        var size = bullet.size || 16;
        var type = bullet.param.type || "RL";
        this.superInit({width:size, height:size});

        this.size = size;
        this.blendMode = "lighter";
        this.deltaX = bullet.runner.deltaX;
        this.deltaY = bullet.runner.deltaY;
        this.deltaA = 0.9;
        this.setPosition(bullet.x, bullet.y);

        var color = 0;
        switch (type) {
            case "RS":
            case "RL":
            case "RE":
                color = 320;
                break;
            case "BS":
            case "BL":
            case "BE":
                color = 240;
                break;
        }

        var c = this.canvas;
        c.setFillStyle(
            tm.graphics.RadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
                .addColorStopList([
                    {offset:0.0, color: "hsla({0}, 60%, 50%, 0.0)".format(color)},
                    {offset:0.9, color: "hsla({0}, 60%, 50%, 1.0)".format(color)},
                    {offset:1.0, color: "hsla({0}, 60%, 50%, 0.0)".format(color)},
                ]).toStyle()
            ).fillRect(0, 0, size, size);

        this.on("enterframe", function() {
            this.x += this.deltaX;
            this.y += this.deltaY;
            this.deltaX *= this.deltaA;
            this.deltaY *= this.deltaA;
        }.bind(this));

        this.tweener.clear()
            .to({scaleX: 3, scaleY: 3, alpha: 0.0}, 800, "easeOutQuad")
            .call(function() {
                this.remove();
            }.bind(this));
    },
});

//衝撃波
tm.define("pb3.Effect.ShockWave", {
    superClass: "tm.display.Shape",
    layer: LAYER_EFFECT_UPPER,

    init: function(size, alphaDecayRate) {
        size = size || 64;
        this.superInit({width:size, height:size});

        if (alphaDecayRate === undefined) alphaDecayRate = 0.9;

        this.width = this.height = this.size = size;
        this.alphaDecayRate = alphaDecayRate;
        this.blendMode = "lighter";

        var c = this.canvas;
        c.setFillStyle(
            tm.graphics.RadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
                .addColorStopList([
                    {offset:0.0, color: "hsla(0, 100%, 100%, 0.0)"},
                    {offset:0.8, color: "hsla(0, 100%, 100%, 1.0)"},
                    {offset:1.0, color: "hsla(0, 100%, 100%, 0.0)"},
                ]).toStyle()
            ).fillRect(0, 0, size, size);
    },

    update: function() {
        if (this.alpha < 0.01) {
            this.remove();
            return;
        } else if (1.0 < this.alpha) {
            this.alpha = 1.0;
        }
    },
});

})();