/*
 *  PlanetBuster3
 *  MainScene.js
 *  2013/06/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

//メインシーン
pb3.MainScene = tm.createClass({
    superClass: tm.app.Scene,
    init: function() {
        this.superInit();

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
        var pattern = tm.bulletml.AttackPattern(pb3.bulletPattern['test']);

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
                var b = pb3.bullets.enterBullet(null, 0, 16, 100);
                return b;
            },
            // 弾が画面内にあることを判定する関数
            isInsideOfWorld: function(b) {
                return -32<b.x && b.x<SCREEN_WIDTH+32 && -32<b.y && b.y<SCREEN_HEIGHT+32;
            }
        };

        // 敵を生成
        var enemy = tm.app.CircleShape(32, 32).setPosition(SCREEN_WIDTH/2, 100).addChildTo(this);
        // 弾発射関数を登録
        enemy.attack = pattern.createTicker(param);
        enemy.time = 0;
        enemy.update = function() {
            this.x = 160+Math.sin(this.time*toRad)*60;
//            if (this.time % 2 == 0)
            this.attack();
            this.time++;
        }
	    this.time = 0;
    },
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
    },
    update: function() {
		this.time++;
    },
    //オープニング処理開始
    opening: function() {
    },
    //ステージ開始
    stagestart: function() {
    },
    //ステージクリア
    stageclear: function() {
    },
});
