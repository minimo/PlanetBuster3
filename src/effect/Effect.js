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

    interval: 2,
    maxIndex: 8,
    index: 0,

    velocity:{x:0, y:0, decay:0.9},

    time: 0,

    init: function(tex, width, height, interval, maxIndex, startIndex) {
        this.superInit(tex, width, height);
        this.interval = interval || 4;
        this.maxIndex = maxIndex || 8;
        this.startIndex = startIndex || 0;

        this.index = this.startIndex;
        this.setFrameIndex(this.startIndex);
    },

    update: function() {
        this.time++;
        if (this.time % this.interval == 0) {
            this.index++;
            if (this.index == this.maxIndex) this.remove();
            this.setFrameIndex(this.index);
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.x *= this.velocity.decay;
        this.velocity.y *= this.velocity.decay;
    },

    setVelocity: function(x, y, decay) {
        this.velocity.x = x;
        this.velocity.y = y;
        this.velocity.decay = decay;
        return this;
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
        this.superInit(size, size);

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
        this.superInit(size, size);

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
        this.superInit(size, size);

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