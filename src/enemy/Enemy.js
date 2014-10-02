/*
 *  Enemy.js
 *  2014/08/10
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("pb3.Enemy", {
    superClass: "tm.display.CanvasElement",
    layer: LAYER_OBJECT,    //所属レイヤー
    parentScene: null,      //親シーン
    parentEnemy: null,      //親となる敵キャラ

    //各種フラグ
    isCollision: true,  //当り判定
    isDead: false,      //死亡
    isSelfCrash: false, //自爆
    isMuteki: false,    //無敵
    isBoss: false,      //ボス
    isOnScreen: false,  //画面内に入った
    isGround: false,    //地上フラグ
    isEnemy: true,      //敵機判別
    isAttack: true,     //攻撃フラグ

    //キャラクタ情報
    name: null,
    def: 0,
    defMax: 0,
    bulletPattern: null,
    nowBulletPattern: null,
    id: -1,
    enterParam: null,

    //機体用テクスチャ情報
    body: null,
    texName: null,
    texIndex: 0,
    texWidth: 32,
    texHeight: 32,

    data: null,

    beforeX: 0,
    beforeY: 0,

    init: function(name, x, y, id, param) {
        this.superInit();
        this.setPosition(x, y);
        this.id = id || -1;
        this.enterParam = param; //EnemyUnitからの投入時パラメータ

        this.name = name;
        var d = this.data = pb3.enemyData[name];
        if (!d) return false;

        this.bulletPattern = d.bulletPattern;
        this.def = this.defMax = d.def;

        this.width = d.width || 32;
        this.height = d.height || 32;
        this.layer = d.layer || LAYER_OBJECT;
        this.point = d.point || 0;

        this.setup = d.setup || this.setup;
        this.algorithm = d.algorithm || this.algorithm;
        this.dead = d.dead || this.defaultDead;
        this.changeColor = d.changeColor || this.changeColor;

        //機体用スプライト
        if (d.texName) {
            this.texName = d.texName;
            this.texIndex = d.texIndex;
            this.texWidth = d.texWidth;
            this.texHeight = d.texHeight;
            this.body = tm.display.Sprite(d.texName, d.texWidth, d.texHeight).addChildTo(this);
            this.body.setFrameIndex(this.texIndex);
        } else {
            //当り判定ダミー表示
            var that = this;
            this.texName = null;
            this.texWidth = this.width;
            this.texHeight = this.height;
            this.body = tm.display.Shape(this.width, this.height).addChildTo(this);
            this.body.renderRectangle({fillStyle: "rgba(255,255,0,1.0)", strokeStyle: "rgba(255,255,0,1.0)"});
            this.body.update = function() {this.rotation = -that.rotation;};
        }

        if (VIEW_COLLISION) {
            this.col = tm.display.Shape(this.width, this.height).addChildTo(this);
            this.col.renderRectangle({fillStyle: "rgba(255,255,0,0.5)", strokeStyle: "rgba(255,255,0,0.5)"});
            this.col.update = function() {this.rotation = -that.rotation;};
        }

        if (DEBUG) {
            //耐久力表示
            var df = this.defDisp = tm.display.OutlineLabel("[0/0]", 20).addChildTo(this);
            df.setParam({fontFamily:"'UbuntuMono'", align: "center", baseline:"middle", fontWeight:300, outlineWidth:2 });
            var that = this;
            df.update = function() {
                this.rotation = -that.rotation;
                this.text = "["+that.def+"/"+that.defMax+"]";
            }
        }

        //パラメータセットアップ
        this.parentScene = app.currentScene;
        this.setup(param);

        //弾幕定義
        if (this.bulletPattern instanceof Array) {
            this.nowBulletPattern = this.bulletPattern[0];
        } else {
            this.nowBulletPattern = this.bulletPattern;
        }

        //bulletML起動
        var bulletMLparams = {
            rank: this.parentScene.rank,
            target: app.player,
            createNewBullet: function(runner, attr) {
                if (!this.isAttack) return;
                pb3.Bullet(runner, attr, this.id).addChildTo(this.parentScene);
            }.bind(this)
        };
        this.startDanmaku(pb3.bulletPattern[this.nowBulletPattern], bulletMLparams);

        //当り判定設定
        this.boundingType = "rect";

        //remove時
        this.on('removed', this.release);

        this.time = 0;
    },

    setup: function(enterParam) {
    },

    update: function() {
        if (this.isDead) return;
        this.algorithm();

        //スクリーン内入った判定
        if (this.isOnScreen) {
            if (this.x < -100 || this.x > GS_W+100 || this.y < -100 || this.y > GS_H+100) {
                this.remove();
                this.isCollision = false;
            }
        } else {
            if (0 < this.x && this.x < GS_W && 0 < this.y && this.y < GS_H) this.isOnScreen = true;
        }

        //自機との当り判定チェック
        var player = app.player;
        if (this.isCollision && !this.isGround && player.isCollision && this.isHitElement(player)) {
            player.damage();
        }

        //親機が破壊された場合、自分も破壊
        if (this.parentEnemy && this.parentEnemy.isDead) this.dead();

        //瀕死
        if (this.def < this.defMax*0.2) this.nearDeath();

        //地上敵で自機に近い場合は弾を撃たない
        if (this.isGround) {
            if (distanceSq(this, app.player) < 4096)
                this.isAttack = false;
            else
                this.isAttack = true;
        }

        this.beforeX = this.x;
        this.beforeY = this.y;
        this.time++;
    },

    algorithm: function() {
    },

    damage: function(power, force) {
        if (this.isMuteki || this.isDead) return;
        this.def -= power;
        if (force) this.def = -1;
        if (this.def < 1) {
            //破壊パターン投入
            if (this.data.type == ENEMY_BOSS) {
                this.deadBoss();
                //ボスの場合はステージクリアを親シーンに通知
                this.parentScene.stageClear = true;
            } else {
                this.dead();
            }
            this.parentScene.enemyKill++;

            //親機に破壊を通知
            if (this.parentEnemy) this.parentEnemy.deadChild(this);

            //スコア加算
            app.score += this.data.point;

/*
            //得点表示
            var sc = tm.display.OutlineLabel(this.data.point, 30);
            sc.layer = LAYER_FOREGROUND;
            sc.addChildTo(this.parentScene).setPosition(this.x, this.y);
            sc.setParam({fontFamily:"'UbuntuMono'", align: "center", baseline:"middle", fontWeight:300, outlineWidth:2 });
            sc.tweener.to({x: this.x, y: this.y-50, alpha:0}, 1000).call(function(){this.remove()}.bind(sc));
 */
            return true;
        }

        //被ダメージ演出
        this.changeColor("White");
        this.body.tweener.clear().wait(1).call(function(){this.changeColor()}.bind(this));

        return false;
    },

    //瀕死状態
    nearDeath: function() {
        if (this.time % 30 == 0) {
            this.changeColor("Red");
        } else if (this.time % 30 == 5) {
            this.changeColor();
        }

        if (this.time % 35 == 0) {
            var w = this.width/2,         h = this.height/2;
            var x = this.x+rand(-w, w),   y = this.y+rand(-h, h);
            var vx = this.x-this.beforeX, vy = this.y-this.beforeY;
            pb3.Effect.enterExplode(this.parentScene, x, y, vx, vy);
        }
    },

    //色を赤or白くする
    changeColor: function(color) {
        if (!this.texName) return;
        if (color === undefined) {
            color = "";
        } else {
            if (color != "Red" && color != "White") color = "Red";
        }
        this.body.setImage(this.texName+color, this.texWidth, this.texHeight);
        this.body.setFrameIndex(this.texIndex);
    },

    //通常破壊パターン
    defaultDead: function() {
        this.isCollision = false;
        this.isDead = true;
        this.tweener.clear();
        this.stopDanmaku();

        var vx = this.x-this.beforeX;
        var vy = this.y-this.beforeY;
        if (this.data.explodeType == EXPLODE_SMALL) {
            pb3.Effect.enterExplode(this.parentScene, this.x, this.y, vx, vy);
            app.playSE("explodeSmall");
        }
        if (this.data.explodeType >= EXPLODE_MIDDLE) {
            var num = rand(20, 30)*this.data.explodeType;
            for (var i = 0; i < num; i++) {
                var x = this.x+rand(-this.width, this.width);
                var y = this.y+rand(-this.height, this.height);
                var delay = rand(0, 30);
                pb3.Effect.enterExplode(this.parentScene, x, y, vx, vy, delay);
            }
            app.playSE("explodeLarge");
        }

        //弾消し
        if (this.data.type == ENEMY_MIDDLE) {
            this.parentScene.eraseBullet(this);
        } else if (this.data.type == ENEMY_LARGE) {
            this.parentScene.eraseBullet();
            this.parentScene.timeVanish = 60;
        }
        this.remove();
    },

    deadBoss: function() {
        this.isCollision = false;
        this.isDead = true;
        this.tweener.clear();
        this.stopDanmaku();

        this.on("enterframe", function() {
            this.alpha *= 0.9;
            if (this.alpha < 0.02) this.remove();
        }.bind(this));

        var vx = this.x-this.beforeX;
        var vy = this.y-this.beforeY;
        for (var i = 0; i < 10; i++) {
            var x = rand(0, this.width)-this.width/2;
            var y = rand(0, this.height)-this.height/2;
            pb3.Effect.enterExplodeSmall(this.parentScene, x, y, vx, vy);
        }
        app.playSE("explodeLarge");

        //弾消し
        this.parentScene.eraseBullet();

        this.remove();
    },

    //親機のセット
    setParentEnemy: function(parent) {
        this.parentEnemy = parent;
    },

    //子機が破壊された場合に呼ばれるコールバック
    deadChild: function(child) {
    },

    //指定ターゲットの方向を向く
    lookAt: function(target) {
        target = target || app.player;

        //ターゲットの方向を向く
        var ax = this.x - target.x;
        var ay = this.y - target.y;
        var rad = Math.atan2(ay, ax);
        var deg = ~~(rad * toDeg);
        this.rotation = deg + 90;
    },

    //指定ターゲットの方向に進む
    moveTo: function(target, speed, look) {
        target = target || app.player;
        speed = speed || 5;

        //ターゲットの方向を計算
        var ax = this.x - target.x;
        var ay = this.y - target.y;
        var rad = Math.atan2(ay, ax);
        var deg = ~~(rad * toDeg);

        if (look || look === undefined) this.rotation = deg + 90;

        this.vx = Math.cos(rad+Math.PI)*speed;
        this.vy = Math.sin(rad+Math.PI)*speed;
        this.x += this.vx;
        this.y += this.vy;
    },

    release: function() {
        this.removeChildren();
    },
});

})();
