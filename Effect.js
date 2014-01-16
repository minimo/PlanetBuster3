/*
 *  PlanetBuster3
 *  Effect.js
 *  エフェクト管理
 *  2013/07/01
 *  @auther minimo
 *  This Program is MIT license.
 */

//////////////////////////////////////////////////////////////////////////////
//エフェクトデータ
//添字      名称
//file      画像名
//w,h       画像サイズ
//start     アニメーション開始フレーム番号
//frame     アニメーションフレーム数
//wait      アニメーション更新間隔
//blend     アルファブレンド処理(default:'source-over')
//brake	    慣性移動ブレーキ係数(default:1.0)
//under	    下位レイヤへの追加(default:false)
//sound	    再生サウンド(default:無し)
//loop      フレーム再生ループフラグ(delault: false)
//////////////////////////////////////////////////////////////////////////////
var effectData = {
//自機系
'shotburn':     { file: 'shotburn', w:16, h:16, start: 0, frame: 8, wait: 3, blend: 'lighter', brake: 1 },

//敵特殊効果
'roter1':       { file: 'roter1', w:32, h:32, start: 0, frame: 4, wait: 1, blend: 'source-over', loop: true},

//弾消
'vanish1':  	{ file: 'vanish1', w:16, h:16, start: 0, frame: 8, wait: 3, blend: 'lighter', brake: 0.95 },

//爆発
'explode1':     { file: 'explode1', w:32, h:32, start: 0, frame: 8, wait: 3, blend: 'lighter', brake: 0.9, sound:'bomb1' },

//破片
'chip1':     { file: 'chip2', w: 8, h: 8, start:  0, frame: 8, wait: 3, blend: 'source-over', brake: 0.9 },
'chip2':     { file: 'chip2', w: 8, h: 8, start:  8, frame: 8, wait: 3, blend: 'source-over', brake: 0.9 },
'chip3':     { file: 'chip2', w: 8, h: 8, start: 16, frame: 4, wait: 3, blend: 'source-over', brake: 0.9 },
'chip4':     { file: 'chip1', w:16, h:16, start:  0, frame: 8, wait: 3, blend: 'source-over', brake: 0.9 },
'chip5':     { file: 'chip1', w:16, h:16, start:  8, frame: 8, wait: 3, blend: 'source-over', brake: 0.9 },
'chip6':     { file: 'chip1', w:16, h:16, start: 16, frame: 8, wait: 3, blend: 'source-over', brake: 0.9 },
}

//管理用
MAX_EFFECTS = 200;
pb3.effects = [];

pb3.Effect = tm.createClass({
    superClass: tm.app.Sprite,

    init: function() {
        this.superInit("vanish1", 32, 32);
        this.startFrame = 0;    //開始フレーム
        this.numFrame = 0;      //フレーム数
        this.nowFrame = 0;      //現在フレーム
        this.wait = 1;          //更新間隔
        this.brake = 1.0;       //慣性移動ブレーキ係数
        this.vx = 0;            //移動量
        this.vy = 0;            //移動量
        this.blendMode = "souece-over";
        this.time = 0;

        this.addEventListener("removed", function() {
            this.using = false;
        });
//        tm.app.CircleShape(32, 32).setPosition(0, 0).addChildTo(this);
    },
    update: function() {
        if (this.time < 0) {
            this.time++;
            return;
        }
        if (this.time == 0) this.visible = true;

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.brake;
        this.vy *= this.brake;
        if (this.time != 0 && this.time % this.wait == 0) {
            this.nowFrame++;
            if (this.nowFrame > this.numFrame+this.startFrame-1) {
                if (this.loop) {
                    this.nowFrame = this.startFrame;
                } else {
                    this.remove();
                    return;
                }
            }
            this.setFrameIndex(this.nowFrame, this.width, this.height);
        }
        this.time++;
    },
});

pb3.effects.init = function() {
    for (var i = 0; i < MAX_EFFECTS; i++ ){
        var e = new pb3.Effect();
        this.push(e);
    }

    pb3.effects.numUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var b = this[i]; 
            if (b.using) n++;
        }
        return n;
    }
    pb3.effects.numNotUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var b = this[i];
            if (!b.using) n++;
        }
        return n;
    }

    pb3.effects.enter = function(name, x, y, vx, vy, delay) {
        var data = effectData[name] || null;
        x = x || 160;
        y = y || 160;
        vx = vx || 0;
        vy = vy || 0;
        delay = delay || 0;

        var e;
        for (var i = 0,len = this.length; i < len; i++) {
            e = this[i];
            if (!e.using){
                //情報の初期化とコピー
                e.image = tm.asset.AssetManager.get(data.file);
                e.x = x;
                e.y = y;
                e.vx = vx;
                e.vy = vy;
                e.width = data.w;
                e.height = data.h;
                e.startFrame = data.start || 0;
                e.numFrame = data.frame || 1;
                e.nowFrame = data.start || 0;
                e.wait = data.wait || 3;
                e.blendMode = data.blend || 'source-over';
                e.brake = data.brake || 1;
                e.under = data.under || false;
                e.loop = data.loop || false;
                e.time = delay;
                if (e.time > 0)e.time *= -1;
                e.visible = false;
                e.particle = false;
                e.alpha = 1.0;
                e.using = true;
                if (data.sound)tm.asset.AssetManager.get(data.sound).clone().play();

                e.setFrameIndex(e.startFrame, e.width, e.height);

                var layer = LAYER_EFFECT_UPPER;
                if (data.under) layer = LAYER_EFFECT_UNDER;
                app.currentScene.addChildToLayer(layer, e);
                return e;
            }
        }
        return null;
    }

    //爆発エフェクト投入
    pb3.effects.enterExplode = function(level, x, y, vx, vy) {
        switch(level) {
            case 0:
                pb3.effects.enter("explode1", x, y, vx, vy);
                var num = rand(5)+3;
                for (var i = 0; i < num; i++) {
                    var rad = rand(360)*toRad;
                    var spd = rand(3)+2;
                    var vx2 = Math.sin(rad)*spd+vx;
                    var vy2 = Math.cos(rad)*spd+vy;
                    var ptn = "chip"+(rand(3)+1);
                    pb3.effects.enter(ptn, x, y, vx2, vy2);
                }
                break;
            case 1:
                break;
        }
    }
};
