/*
 *  PlanetBuster3
 *  Effect.js
 *  エフェクト管理
 *  2013/07/01
 *  @auther minimo
 *  This Program is MIT license.
 */

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

    pb3.effects.enter = function(name, x, y, vx, vy) {
        var data = effectData[name] || null;
        x = x || 160;
        y = y || 160;
        vx = vx || 0;
        vy = vy || 0;

        var e;
        for (var i = 0,len = this.length; i < len; i++) {
            e = this[i];
            if (!e.using){
                //情報の初期化とコピー
                e.image = tm.asset.AssetManager.get(name);
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
                e.sound = data.sound;
                e.loop = data.loop || false;
                e.time = 0;
                e.particle = false;
                e.alpha = 1.0;
                e.using = true;

                e.setFrameIndex(e.startFrame, e.width, e.height);
                app.currentScene.addChild(e);
                return e;
            }
        }
        return null;
    }

    //爆発エフェクト投入
    pb3.effects.enterExplode = function(level, x, y, vx, vy) {
    }
};


//////////////////////////////////////////////////////////////////////////////
//エフェクトデータ
//添字      名称
//name      画像名
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
'shotburn':     { w:16, h:16, start: 0, frame: 8, wait: 3, blend: 'source-over', brake: 0.99 },

//敵特殊効果
'roter1':       { w:32, h:32, start: 8, frame: 4, wait: 1, blend: 'source-over', loop: true},

//弾消
'vanish1':  	{ w:16, h:16, start: 0, frame: 8, wait: 3, blend: 'lighter', brake: 0.99 },

//爆発
'explode1':  	{ w:16, h:16, start: 0, frame: 8, wait: 3, blend: 'lighter', brake: 0.99 },
}



