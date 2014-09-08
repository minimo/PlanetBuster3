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

    //当り判定サイズ
    width: 2,
    height: 2,

    control: true,  //操作可能フラグ
    shotON: true,   //ショットフラグ
    mouseON: false, //マウス操作中フラグ

    isCollision: false, //当り判定有効フラグ

    timeMuteki: 0, //無敵フレーム残り時間

    speed: 20,      //移動係数
    type: 0,        //自機タイプ(0:赤 1:緑 2:青)

    shotPower: 10,      //ショット威力
    shotInterval: 6,    //ショット間隔

    rollcount: 50,
    pitchcount: 50,

    parentScene: null,

    init: function() {
        this.superInit("gunship", 32, 32);
        this.setFrameIndex(4);
//        this.setScale(1.5);

        this.setupBody();

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 2;
        this.checkHierarchy = true;

        this.time = 0;
        return this;
    },

    //機体準備
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
        var p = app.pointing;
        if (p.getPointing()) {
            var pt = this.parentScene.pointer;
            this.x += (pt.x - this.x)/this.speed;
            this.y += (pt.y - this.y)/this.speed;

            this.mouseON = true;
        } else {
            this.mouseON = false;
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
            this.x = Math.clamp(this.x, 16, GS_W-16);
            this.y = Math.clamp(this.y, 16, GS_H-16);
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

    //被弾処理
    damage: function() {
        if (this.timeMuteki>0 || MUTEKI) return;

        pb3.burnParticlePlayer(this.x, this.y).addChildTo(this.parentScene);
        app.playSE("explodePlayer");

        this.parentScene.stageMiss++;
        this.parentScene.life--;
        this.parentScene.dispLife.dec();
        if (this.parentScene.life > -1) {
            this.startup();
            this.parentScene.eraseBullet();
            this.parentScene.eraseBulletTime = 60;
        } else {
            this.setPosition(GS_W*0.5, GS_H*3);
            this.control = false;
        }
    },

    //ショット発射
    enterShot: function() {
        var shotPower = 1;
        //自機から
        pb3.ShotBullet(0, shotPower, 0).addChildTo(this.parentScene).setPosition(this.x   , this.y-16);
        pb3.ShotBullet(0, shotPower, 0).addChildTo(this.parentScene).setPosition(this.x+24, this.y-16);
        pb3.ShotBullet(0, shotPower, 0).addChildTo(this.parentScene).setPosition(this.x-24, this.y-16);

        //ビットから
        var x = this.x + this.bits[0].x;
        var y = this.y + this.bits[0].y;
        pb3.ShotBullet(this.bits[0].rotation, shotPower).addChildTo(this.parentScene).setPosition(x, y-8);

        var x = this.x + this.bits[1].x;
        var y = this.y + this.bits[1].y;
        pb3.ShotBullet(this.bits[1].rotation, shotPower).addChildTo(this.parentScene).setPosition(x, y-8);

        var x = this.x + this.bits[2].x;
        var y = this.y + this.bits[2].y;
        pb3.ShotBullet(this.bits[2].rotation, shotPower).addChildTo(this.parentScene).setPosition(x, y-8);

        var x = this.x + this.bits[3].x;
        var y = this.y + this.bits[3].y;
        pb3.ShotBullet(this.bits[3].rotation, shotPower).addChildTo(this.parentScene).setPosition(x, y-8);
    },

    //ビット展開
    openBit: function() {
        this.bits[0].tweener.clear().to({ x: 24, y:  8, rotation:  5, alpha:1}, 300);
        this.bits[1].tweener.clear().to({ x:-24, y:  8, rotation: -5,  alpha:1}, 300);
        this.bits[2].tweener.clear().to({ x: 40, y: 16, rotation: 10, alpha:1}, 300);
        this.bits[3].tweener.clear().to({ x:-40, y: 16, rotation:-10, alpha:1}, 300);
    },

    //ビット収納
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
        this.x = GS_W/2;
        this.y = GS_H+128;
        this.tweener.clear()
            .wait(2000)
            .to({x: GS_W/2, y: GS_H-128}, 2000, "easeOutQuint")
            .call(function(){
                this.shotON = true;
                this.control = true;
                this.isCollision = true;
                this.timeMuteki = 180;
            }.bind(this));
        this.shotON = false;
        this.control = false;
        this.isCollision = false;
        this.parentScene.timeVanish = 300;
    },

    //ステージ開始時演出
    stageStartup: function() {
        this.x = GS_W/2;
        this.y = GS_H+128;
        this.tweener.clear()
            .to({x: GS_W/2, y: GS_H/2+32}, 1000, "easeOutCubic")
            .to({x: GS_W/2, y: GS_H-64  }, 1000)
            .call(function(){
                this.shotON = true;
                this.control = true;
                this.isCollision = true;
                this.timeMuteki = 180;
            }.bind(this));
        this.shotON = false;
        this.control = false;
        this.isCollision = false;
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

//プレイヤー操作用ポインタ
tm.define("pb3.PlayerPointer", {
    superClass: "tm.display.Shape",
    layer: LAYER_OBJECT_LOWER,

    init: function() {
        this.superInit(32, 32);
        this.canvas.lineWidth = 6;
        this.canvas.globalCompositeOperation = "lighter";
        this.canvas.strokeStyle = "rgb(255, 255, 255)";
        this.canvas.strokeArc(16, 16, 8, Math.PI*2, 0, true);
    },

    update: function() {
        if (this.player.control) {
            var p = app.pointing;
            if (p.getPointing()) {
                this.alpha = 0.5;
                this.x += p.position.x - p.prevPosition.x;
                this.y += p.position.y - p.prevPosition.y;
            } else {
                this.x = app.player.x;
                this.y = app.player.y;
                this.alpha = 0;
            }
        }
    },
});

})();