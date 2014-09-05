/*
 *  player.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("pb3.Player", {
    superClass: "tm.display.Sprite",
    layer: LAYER_OBJECT,

    width: 2,
    height: 2,

    control: true,  //操作可能フラグ
    shotON: true,   //ショットフラグ
    mouseON: false, //マウス操作中フラグ
    shieldON: false,//シールド有効フラグ

    isCollision: false, //当り判定有効フラグ
    isDemo: false,      //デモンストレーションフラグ

    timeMuteki: 0, //無敵フレーム残り時間

    speed: 7,       //移動速度
    type: 0,        //自機タイプ(0:赤 1:緑 2:青)

    power: 0,           //パワーチャージ
    powerMax: 120,      //パワーチャージ最大
    level: 0,           //ショットレベル
    levelMax: 5,        //ショットレベル
    shotPower: 1,       //ショット威力
    shotLimit: 0,       //ショットレベル上限
    shotInterval: 6,    //ショット間隔

    rollcount: 50,
    rollmax: 8,
    pitchcount: 0,
    pitchmax: 8,

    parentScene: null,

    init: function() {
        this.superInit("gunship", 32, 32);
        this.setFrameIndex(4);
        this.setScale(2);

        this.setupBody();

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;
        this.checkHierarchy = true;

        this.time = 0;
        return this;
    },

    setupBody: function() {
        //コア
        core = tm.display.Shape(16, 16).addChildTo(this);
        core.canvas.setFillStyle(
            tm.graphics.RadialGradient(8, 8, 0, 8, 8, 8)
                .addColorStopList([
                    {offset:0.0, color: "hsla(200, 60%, 70%, 1.0)"},
                    {offset:0.5, color: "hsla(240, 60%, 70%, 1.0)"},
                    {offset:1.0, color: "hsla(240, 60%, 50%, 0.0)"},
                ]).toStyle()
            ).fillRect(0, 0, 16, 16);
        core.tweener.clear();
        core.tweener.scale(1.0, 100, "easeInOutQuad").scale(0.5, 150, "easeInOutQuad").setLoop(true);

        //ビット
        this.bits = [];
        this.bits.status = 0; //0:close 1:open1 2:open2 3:rollingStanby 4:rollingReady
        this.bits.roll = 0;
        this.bits[0] = pb3.PlayerBit().addChildTo(this);
        this.bits[1] = pb3.PlayerBit().addChildTo(this);
        this.bits[2] = pb3.PlayerBit().addChildTo(this);
        this.bits[3] = pb3.PlayerBit().addChildTo(this);

        this.openBit();
    },

    update: function() {
        //操作系
        if (this.control && !this.isDemo) {
            var p = app.pointing;
            var dx = p.position.x - p.prevPosition.x;
            var dy = p.position.y - p.prevPosition.y;
            if (p.getPointing()) {
                this.x += Math.clamp(dx*1.3, -40, 40);
                this.y += Math.clamp(dy*1.3, -40, 40);
                this.mouseON = true;
            }else{
                this.mouseON = false;
            }
        }

        //機体ロール
        if (this.bx > this.x) {
            this.rollcount-=3;
            if (this.rollcount < 0) this.rollcount = 0;
        }
        if (this.bx < this.x) {
            this.rollcount+=3;
            if (this.rollcount > 80) this.rollcount = 80;
        }
        if (this.bx == this.x) {
            if (this.rollcount < 50) this.rollcount+=3;
            else this.rollcount-=3;
            if (this.rollcount < 0) this.rollcount = 0;
            if (this.rollcount > 80) this.rollcount = 80;
        }
        //機体ロール
        if (this.time % 2 == 0) {
            var i = ~~(this.rollcount/10);
            if (i < 0) i = 0;
            if (i > 8) i = 8;
            this.setFrameIndex(i,32,32);
        }

        //移動範囲の制限
        if (this.control) {
            this.x = Math.clamp(this.x, 16, SC_W-16);
            this.y = Math.clamp(this.y, 16, SC_H-16);
        }

        //タッチorクリック中
        if (this.mouseON && this.control) {
            //ショット
            if (this.shotON && this.time % this.shotInterval == 0) {
                this.enterShot();
            }
        }

        this.bx = this.x;
        this.by = this.y;
        this.time++;
        this.timeMuteki--;
    },

    damage: function() {
        if (this.timeMuteki>0 || MUTEKI || this.isDemo) return;

        pb3.burnParticlePlayer(this.x, this.y).addChildTo(this.parentScene);
        app.playSE("explodePlayer");

        this.power = 0;
        this.level = 0;
        this.shotInterval = 10;
        this.bits.status = 0;

        this.parentScene.stageMiss++;
        this.parentScene.life--;
        this.parentScene.dispLife.dec();
        if (this.parentScene.life > -1) {
            this.startup();
            this.parentScene.eraseBullet();
            this.parentScene.eraseBulletTime = 60;
        } else {
            this.setPosition(SC_W*0.5, SC_H*3);
            this.control = false;
        }
    },

    enterShot: function() {
        var shotPower = this.level>4?2:1;
        pb3.ShotBullet(0, shotPower).addChildTo(this.parentScene).setPosition(this.x, this.y-16);
        pb3.ShotBullet( 5, shotPower).addChildTo(this.parentScene).setPosition(this.x+16, this.y-16);
        pb3.ShotBullet(-5, shotPower).addChildTo(this.parentScene).setPosition(this.x-16, this.y-16);

        if (this.level > 0) {
            var x = this.x + this.bits[0].x;
            var y = this.y + this.bits[0].y;
            pb3.ShotBullet( 10, shotPower).addChildTo(this.parentScene).setPosition(x, y-8);
            var x = this.x + this.bits[1].x;
            var y = this.y + this.bits[1].y;
            pb3.ShotBullet(-10, shotPower).addChildTo(this.parentScene).setPosition(x, y-8);
        }
        if (this.level > 1) {
            var x = this.x + this.bits[2].x;
            var y = this.y + this.bits[2].y;
            pb3.ShotBullet( 10, shotPower).addChildTo(this.parentScene).setPosition(x, y-8);
            var x = this.x + this.bits[3].x;
            var y = this.y + this.bits[3].y;
            pb3.ShotBullet(-10, shotPower).addChildTo(this.parentScene).setPosition(x, y-8);
        }
    },

    //ビット展開
    openBit: function() {
        this.bits[0].tweener.clear().to({ x: 24, y:  8, rotation:  5, alpha:1}, 300);
        this.bits[1].tweener.clear().to({ x:-24, y:  8, rotation: -5,  alpha:1}, 300);
        this.bits[2].tweener.clear().to({ x: 40, y: 16, rotation: 15, alpha:1}, 300);
        this.bits[3].tweener.clear().to({ x:-40, y: 16, rotation:-15, alpha:1}, 300);
    },

    closeBit: function() {
        if (this.bits.status == 0) return;
        this.bits.status = 0;
        this.bits[0].tweener.clear().to({ x:0, y: 0, alpha:0}, 300);
        this.bits[1].tweener.clear().to({ x:0, y: 0, alpha:0}, 300);
        this.bits[2].tweener.clear().to({ x:0, y: 0, alpha:0}, 300);
        this.bits[3].tweener.clear().to({ x:0, y: 0, alpha:0}, 300);
    },

    //プレイヤー投入時演出
    startup: function() {
        this.x = SC_W/2;
        this.y = SC_H+128;
        this.tweener.clear()
            .wait(2000)
            .to({x: SC_W/2, y: SC_H-128}, 2000, "easeOutQuint")
            .call(function(){
                this.shotON = true;
                this.control = true;
                this.isCollision = true;
                this.timeMuteki = 180;
            }.bind(this));
        this.shotON = false;
        this.control = false;
        this.isCollision = false;
        this.shieldON = true;
        this.parentScene.timeVanish = 300;
    },

    //ステージ開始時演出
    stageStartup: function() {
        this.x = SC_W/2;
        this.y = SC_H+128;
        this.tweener.clear()
            .to({x: SC_W/2, y: SC_H/2+32}, 1000, "easeOutCubic")
            .to({x: SC_W/2, y: SC_H-64  }, 1000)
            .call(function(){
                this.shotON = true;
                this.control = true;
                this.isCollision = true;
                this.timeMuteki = 180;
            }.bind(this));
        this.shotON = false;
        this.control = false;
        this.isCollision = false;
        this.shieldON = true;
    },
});

//ビット
tm.define("pb3.PlayerBit", {
    superClass: "tm.display.Sprite",

    active: false,

    init: function() {
        this.superInit("bit", 32, 32);
        this.setScale(0.5);
        this.parentScene = app.currentScene;
        this.index = 0;

        this.alpha = 1;

        this.beforeX = 0;
        this.beforeY = 0;

        this.time = 0;
    },

    update: function() {
        if (this.time % 2 == 0) {
            this.index = (this.index+1)%9;
            this.setFrameIndex(this.index, 32, 32);
        }
        this.time++;
    },
});

//パワーゲージ
tm.define("pb3.PowerGauge", {
    superClass:  tm.display.CanvasElement,

    min: 0,
    max: 600,
    _value: 0,

    init: function() {
        this.superInit();
        this.alpha = 0;
        this.rotation = -90;

        this.toRad = (Math.PI*2)/this.max;
    },

    update: function() {
    },

    draw: function(canvas) {
        canvas.lineWidth = 15;
        canvas.globalCompositeOperation = "lighter";

        var rad = this._value*this.toRad;
        var color1 = "hsla({0}, 60%, 50%, 0.5)".format(240);
        var color2 = "hsla({0}, 60%, 50%, 0.5)".format(120);

        canvas.strokeStyle = color1
        canvas.shadowBlur = 15;
        canvas.strokeArc(0, 0, 80, Math.PI*2, rad, true);
        canvas.strokeStyle = color2;
        canvas.strokeArc(0, 0, 80, rad, 0, true);
    },
});

pb3.PowerGauge.prototype.accessor("value", {
    "get": function()   { return this._value; },
    "set": function(v)  { this._value = Math.clamp(v, this.min, this.max); }
});

//残機表示用
tm.define("pb3.PlayerDisp", {
    superClass: "tm.display.Sprite",

    init: function() {
        this.superInit("gunship", 32, 32);
        this.setFrameIndex(4);
        this.setScale(1);

        //コア
        core = tm.display.Shape(16, 16).addChildTo(this);
        core.canvas.setFillStyle(
            tm.graphics.RadialGradient(8, 8, 0, 8, 8, 8)
                .addColorStopList([
                    {offset:0.0, color: "hsla(200, 60%, 70%, 1.0)"},
                    {offset:0.5, color: "hsla(240, 60%, 70%, 1.0)"},
                    {offset:1.0, color: "hsla(240, 60%, 50%, 0.0)"},
                ]).toStyle()
            ).fillRect(0, 0, 16, 16);
        core.tweener.clear();
        core.tweener.scale(1.0, 100, "easeInOutQuad").scale(0.5, 150, "easeInOutQuad").setLoop(true);
    },
});

})();