/*
 *  MainScene.js
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */
(function() {

tm.define("pb3.MainScene", {
    superClass: tm.app.Scene,

    //マルチタッチ補助クラス
    touches: null,
    touchID: -1,

    //タッチ情報
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    beforeX: 0,
    beforeY: 0,

    //経過時間
    time: 0,
    absTime: 0,

    //ステージ制御
    nowStage: 1,    //現在ステージ番号
    maxStage: 1,    //最大ステージ番号
    stage: null,    //ステージコントローラー
    enemyID: 0,     //敵投入ＩＤ
    timeVinish: 0,  //敵弾強制消去
    boss: false,    //ボス戦中フラグ
    stageClear: false,  //ステージクリアフラグ
    stageMiss: 0,   //ステージ内ミス回数
    rank: 0,        //ゲームランク

    //敵投入数と撃破数
    enemyCount: 0,
    enemyKill: 0,

    //バックグラウンド
    ground: null,

    //プレイヤー情報
    life: 2,    //初期残機
    bomb: 2,    //初期ボム

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 1.0)";

        //マルチタッチ初期化
        this.touches = tm.input.TouchesEx(this);

        //最下位マスク
        this.mask = tm.display.RectangleShape({width:SC_W, height:SC_H, fillStyle:"rgba(0,0,0,0.5)", strokeStyle:"rgba(0,0,0,0.1)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)

        //レイヤー作成
        this.base = tm.app.Object2D().addChildTo(this).setPosition(0, 0);
        this.layers = [];
        for (var i = 0; i < LAYER_SYSTEM+1; i++) {
            this.layers[i] = tm.app.Object2D().addChildTo(this.base);
        }

        //プレイヤー
        this.player = pb3.Player().addChildTo(this);
        this.player.stageStartup();
        app.player = this.player;

        //操作用ポインタ
        this.pointer = pb3.PlayerPointer().addChildTo(this);
        app.pointer = this.pointer;

        //システム表示ベース
        this.systemBase = tm.app.Object2D().addChildTo(this).setPosition(0, 0);

        //スコア表示ラベル
        app.score = 0;
        var sc = this.scoreLabel = tm.display.OutlineLabel("SCORE:0", 20)
            .addChildTo(this.systemBase)
            .setPosition(0, 0)
            .setParam({fontFamily: "Orbitron", align: "left", baseline: "top", fontWeight: 700, outlineWidth: 2});
        sc.update = function() {
            this.text = "SCORE:"+app.score;
        };

        //残機表示
        this.dispLife = tm.app.Object2D().addChildTo(this.systemBase);
        this.dispLife.players = [];
        this.dispLife.life = 0;
        this.dispLife.inc = function() {
            this.life++;
            this.players[this.life] = pb3.PlayerDisp().addChildTo(this).setPosition(this.life*36-20, 40);
        }
        this.dispLife.dec = function() {
            if (this.life == 0) return;
            this.players[this.life].remove();
            this.life--;
        }
        for (var i = 0; i < this.life; i++) this.dispLife.inc();

        //ボス耐久力ゲージ
        this.bossGauge = pb3.BossGauge().addChildTo(this.systemBase).setPosition(0, -24);

        //最上位マスク
        this.maskTop = tm.display.RectangleShape({width:SC_W, height:SC_H, fillStyle:"rgba(255,255,255,1.0)", strokeStyle:"rgba(255,255,255,1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
        this.maskTop.alpha = 0

        //ステージ制御
        this.initStage();
    },

    update: function() {
        //ステージ進行
        var event = this.stage.get(this.time);
        if (event) {
            if (typeof(event.value) === 'function') {
                event.value.call(this);
            } else {
                this.enterEnemyUnit(event.value);
            }
        }

        //敵弾強制消去
        if (this.timeVanish > 0) this.eraseBullet();

        //ステージクリア検知
        if (this.stageClear) {
            this.stageClear = false;
            //ボス耐久ゲージ隠し
            this.systemBase.tweener.clear().moveBy(0, -24, 1000).call(function(){this.bossGauge.setTarget(null)}.bind(this));

            //５秒後にステージクリアメッセージ投入
            tm.app.Object2D().addChildTo(this).tweener.wait(5000).call(function(){this.enterStageClear()}.bind(this));
        }

        //エクステンド検知
        if (app.extendNumber < app.extendScore.length) {
            if (app.score > app.extendScore[app.extendNumber]) {
                app.extendNumber++;
                this.dispLife.inc();
            }
        }

        //ゲームオーバー検知
        if (this.life == -1) {
            this.life = -99;
            var tmp = tm.app.Object2D().addChildTo(this);
            tmp.tweener.clear().wait(3000).call(function(){app.replaceScene(pb3.GameoverScene(this.nowStage, this.boss))}.bind(this));
        }
        this.time++;
        this.absTime++;
        this.timeVanish--; 
    },

    //ボム投下
    enterBomb: function(x, y) {
    },

    //敵ユニット単位の投入
    enterEnemyUnit: function(name) {
        var unit = pb3.enemyUnit[name];
        if (unit === undefined)return;

        var len = unit.length;
        for (var i = 0; i < len; i++) {
            var e = unit[i];
            var en = pb3.Enemy(e.name,e.x, e.y, this.enemyID, e.param).addChildTo(this);
            if (en.data.type == ENEMY_BOSS) {
                this.bossGauge.setTarget(en);
                this.systemBase.tweener.clear().moveBy(0, 32, 1000);
            }
            this.enemyID++;
            this.enemyCount++;
        }
    },

    //敵単体の投入
    enterEnemy: function(name, x, y, param) {
        this.enemyID++;
        this.enemyCount++;
        return pb3.Enemy(name, x, y, this.enemyID-1, param).addChildTo(this);
    },

    //弾の消去
    eraseBullet: function(target) {
        if (this.layers[LAYER_BULLET].length == 0)return;
        if (target) {
            //個別弾消し
            this.layers[LAYER_BULLET].children.each(function(a) {
                if (target.id == a.id) a.isVanish = true;
            });
        } else {
            //全消し
            this.layers[LAYER_BULLET].children.each(function(a) {
                a.isVanish = true;
            });
        }
    },

    //WARNING表示投入
    enterWarning: function() {
        this.boss = true;
        app.playBGM("warning", false);
        var wg = tm.display.OutlineLabel("WARNING!!", 60)
            .addChildTo(this)
            .setPosition(-SC_W, SC_H*0.5)
            .setParam({fontFamily: "Orbitron", align: "center", baseline: "middle", fontWeight: 800, outlineWidth: 2});
        wg.fillStyle = tm.graphics.LinearGradient(-SC_W*0.5, 0, SC_W*0.5, 64)
            .addColorStopList([
                { offset: 0.1, color: "hsla(230, 90%, 50%, 0.5)"},
                { offset: 0.5, color: "hsla(230, 80%, 90%, 0.9)"},
                { offset: 0.9, color: "hsla(230, 90%, 50%, 0.5)"},
            ]).toStyle();
        wg.shadowColor = "red";
        wg.shadowBlur = 10;
        wg.tweener
            .moveBy(SC_W*1.5, 0, 700, "easeInOutCubic")
            .fadeOut(700).fadeIn(1).wait(1000)
            .fadeOut(700).fadeIn(1).wait(1000)
            .fadeOut(700).fadeIn(1).wait(1000)
            .moveBy(SC_W*1.5, 0, 1000, "easeInOutCubic");
    },

    //ステージ初期化
    initStage: function() {
        if (this.ground) this.ground.remove();
        switch (this.nowStage) {
            case 1:
                this.stage = pb3.Stage1(this, app.player);
                this.ground = pb3.Stage1Ground().setPosition(0, -400).addChildTo(this);
                break;
            case 2:
                this.stage = pb3.Stage1(this, app.player);
                break;
            case 3:
                this.stage = pb3.Stage1(this, app.player);
                break;
        }
        this.time = 0;
        this.timeVanish = 0;
        this.enemyCount = 0;
        this.enemyKill = 0;
        this.stageMiss = 0;

        //ステージ番号表示
        var m1 = tm.display.OutlineLabel("STAGE "+this.nowStage, 50)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .setParam({fontFamily: "Orbitron", align: "center", baseline: "middle", fontWeight: 800, outlineWidth: 2});
        m1.alpha = 0;
        m1.tweener.wait(500).fadeIn(250).wait(1000).fadeOut(250).call(function(){this.remove()}.bind(m1));
    },

    //ステージクリア情報表示
    enterStageClear: function() {
        //リザルト表示
        var clearBonus = 100000*this.nowStage;
        var res = pb3.Result(this.nowStage, this.enemyCount, this.enemyKill, clearBonus, (this.stageMiss==0)?true:false).addChildTo(this);
        if (this.nowStage < this.maxStage) {
            res.tweener.wait(10000)
                .call(function() {
                    this.nowStage++;
                    this.initStage();
                    res.remove();
                }.bind(this));
        } else {
            //ゲームオーバー表示へ移行
            res.tweener.wait(10000)
                .call(function() {
                    app.replaceScene(pb3.GameoverScene(this.nowStage, this.boss, true));
                    res.remove();
                }.bind(this));
        }
    },

    //全ステージクリア情報表示
    enterAllStageClear: function() {
        var mask = tm.display.Shape({width:SC_W*0.8, height:SC_H*0.8}).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);
        mask.renderRectangle({fillStyle: "rgba(0,0,128,0.5)", strokeStyle: "rgba(128,128,128,0.5)"});
        mask.alpha = 0;

        var m1 = tm.display.OutlineLabel("ALL CLEAR!", 30).addChildTo(mask).setPosition(SC_W*0.4, SC_H*0.1);
        m1.fontFamily = "'Orbitron'"; m1.align = "center"; m1.baseline  = "middle"; m1.fontWeight = 800; m1.outlineWidth = 2;

        //ゲームオーバー表示へ移行
        mask.tweener.fadeIn(1000).wait(5000).fadeOut(2000)
            .call(function(){
                app.replaceScene(pb3.GameoverScene(this.nowStage, this.boss, true))
            }.bind(this));
    },

    //タッチorクリック開始処理
    ontouchesstart: function(e) {
        if (this.touchID > 0)return;
        this.touchID = e.ID;

        var sx = this.startX = e.pointing.x;
        var sy = this.startY = e.pointing.y;
        this.moveX = 0;
        this.moveY = 0;

        this.beforeX = sx;
        this.beforeY = sy;
    },

    //タッチorクリック移動処理
    ontouchesmove: function(e) {
        if (this.touchID != e.ID) return;

        var sx = e.pointing.x;
        var sy = e.pointing.y;
        var moveX = Math.abs(sx - this.beforeX);
        var moveY = Math.abs(sx - this.beforeY);

        if (this.time % 10 == 0) {
            this.beforeX = sx;
            this.beforeY = sy;
        }
    },

    //タッチorクリック終了処理
    ontouchesend: function(e) {
        if (this.touchID != e.ID) return;
        this.touchID = -1;

        var sx = e.pointing.x;
        var sy = e.pointing.y;
    },

    //addChildオーバーライド
    addChild: function(child) {
        if (child.layer === undefined) {
            return this.superClass.prototype.addChild.apply(this, arguments);
        }
        child.parentScene = this;
        return this.layers[child.layer].addChild(child);
    },
});

})();
