/*
 *  PlanetBuster3
 *  MainScene.js
 *  2013/06/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

//レイヤー区分け
LAYER_FOREGROUND = 6;
LAYER_EFFECT_UPPER = 5;
LAYER_OBJECT_UPPER = 4;
LAYER_OBJECT = 3;
LAYER_OBJECT_UNDER = 2;
LAYER_EFFECT_UNDER = 1;
LAYER_BACKGROUND = 0;

//メインシーン
pb3.MainScene = tm.createClass({
    superClass: tm.app.Scene,
    init: function() {
        this.superInit();

        //通常表示レイヤー（数字が大きい程優先度が高い）
        this.layer = [];
        for (var i = 0; i < 7; i++) {
            var gr = tm.app.Object2D().addChildTo(this);
            this.layer.push(gr);
        }

        //スコア表示
        var sc = tm.app.Label("SCORE: 0");
        sc.fillStyle = "white";
        sc.fontSize = 15;
        sc.x = 0;
        sc.y = 13;
        sc.width = 200;
        sc.update = function() {
            this.text = "SCORE :"+app.score;
    	}
    	this.addChild(sc);

        //ステージ進行
        this.stageNum = 1;
        this.advance = 0;
        this.phase = 0;
        this.pattern = stagePattern1;
        this.stageData = stageData1;

        //デバッグ表示セットアップ
        if (_DEBUG) this.setupDebug();

        //プレイヤー投入
        this.player = new Player;
        this.player.addChildTo(this);
        pb3.player = this.player;

        //初期化
        pb3.shots.init();
        pb3.bullets.init();
        pb3.enemies.init();
        pb3.effects.init();

        // 攻撃パターンオブジェクトを作成
        var bulletPattern = tm.bulletml.AttackPattern(pb3.bulletPattern['test']);

        // 攻撃パターンのオプション設定
        var param = {
            // 狙う対象
            target: this.player,
            //発射地点オフセット
            offsetX: 0,
            offsetY: 0,
            updateProperties: true,
            // 弾生成関数
            bulletFactory: function(spec) {
                var b = pb3.bullets.enter(null, 0, 16, 100);
                return b;
            },
            // 弾が画面内にあることを判定する関数
            isInsideOfWorld: function(b) {
                return -32<b.x && b.x<SCREEN_WIDTH+32 && -32<b.y && b.y<SCREEN_HEIGHT+32;
            }
        };

/*
        // 敵を生成
        var enemy = tm.app.CircleShape(32, 32).setPosition(SCREEN_WIDTH/2, 100).addChildTo(this);
        // 弾発射関数を登録
        enemy.attack = bulletPattern.createTicker(param);
        enemy.time = 0;
        enemy.update = function() {
            this.x = 160+Math.sin(this.time*toRad)*60;
            this.attack();
            this.time++;
        }
 */
	    this.time = 0;
    },
    update: function() {
        //出現テーブルに従って敵を投入
        if (this.time > 180 && this.time % 180 == 0) {
            this.enterEnemy();
        }

        //当たり判定チェック
        //敵＞ショット＆自機
        for (var i = 0; i < MAX_ENEMIES; i++) {
            var e = pb3.enemies[i];
            if (!e.using || e.time < 0)continue;
            for (var j = 0; j < MAX_SHOTS; j++) {
                var s = pb3.shots[j];
                if (!s.using)continue;
                if (e.isHitElement(s)) {
                    e.def -= s.power;
                    s.vanish();
                }
            }
        }
		this.time++;
    },
    enterEnemy: function() {
        for (var i = 0; i < 5; i++) {
            var ad = this.stageData.charAt(this.advance);
            var pattern = this.pattern[ad];
            for( var j in pattern ){
                var obj = pattern[j];
                if (obj.name != 'nop') {
                    pb3.enemies.enter(obj.name, obj.x, obj.y, obj.delay);
                }
            }
            this.advance++;
        }
    },
    //オープニング処理開始
    opening: function() {
    },
    //イベント処理開始
    event: function() {
    },
    //ステージ開始
    stageStart: function() {
    },
    //ステージクリア
    stageClear: function() {
    },
    //デバッグ表示セットアップ
    setupDebug: function() {
        var d1 = tm.app.Label("bullets: 0/0");
        d1.fillStyle = "white";
        d1.fontSize = 15;
        d1.x = 0;
        d1.y = 100;
        d1.width = 200;
        d1.update = function() {
            this.text = "bullet:"+pb3.bullets.numUsing()+"/"+pb3.bullets.numNotUsing();
        }
        this.addChild(d1);

        var d2 = tm.app.Label("enemy: 0/0");
        d2.fillStyle = "white";
        d2.fontSize = 15;
        d2.x = 0;
        d2.y = 120;
        d2.width = 200;
        d2.update = function() {
            this.text = "enemy:"+pb3.enemies.numUsing()+"/"+pb3.enemies.numNotUsing();
        }
        this.addChild(d2);

        var d3 = tm.app.Label("shot: 0/0");
        d3.fillStyle = "white";
        d3.fontSize = 15;
        d3.x = 0;
        d3.y = 140;
        d3.width = 200;
        d3.update = function() {
            this.text = "shot:"+pb3.shots.numUsing()+"/"+pb3.shots.numNotUsing();
        }
        this.addChild(d3);

        var d4 = tm.app.Label("effect: 0/0");
        d4.fillStyle = "white";
        d4.fontSize = 15;
        d4.x = 0;
        d4.y = 160;
        d4.width = 200;
        d4.update = function() {
            this.text = "effect:"+pb3.effects.numUsing()+"/"+pb3.effects.numNotUsing();
        }
        this.addChild(d4);

        var d5 = tm.app.Label("stage:");
        d5.fillStyle = "white";
        d5.fontSize = 15;
        d5.x = 0;
        d5.y = 180;
        d5.width = 200;
        d5.parent = this;
        d5.update = function() {
            var num = this.parent.advance-5;
            this.text = "stage:";
            if (num < 0) {
                this.text += "0:";
                return;
            }
            this.text += (num/5+1)+":";
            for (var i = 0; i < 5; i++) {
                var ad = this.parent.stageData.charAt(num+i);
                this.text += ad;
            }
        }
        this.addChild(d5);
    },
    addChildToLayer: function(obj, layer) {
        layer = layer || LAYER_OBJECT;

        if (layer == LAYER_FOREGROUND) {
            this.foreground.addChild(obj);
            return;
        }
        if (layer == LAYER_BACKGROUND) {
            this.background.addChild(obj);
            return;
        }
        this.layer[layer].addChild(obj);
    },
});
