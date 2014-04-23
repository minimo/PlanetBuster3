/*
 *  PlanetBuster3
 *  Enemy.js
 *  敵オブジェクト管理
 *  2013/06/21
 *  @auther minimo
 *  This Program is MIT license.
 */

//管理用
MAX_ENEMIES = 200;
pb3.enemies = [];

//敵オブジェクト本体
pb3.Enemy = tm.createClass({
    superClass: tm.app.Sprite,
    using: false,
    spec: null,
    time: 0,
    phase: 0,
    def: 0,
    point: 0,
    beforeX: 0,
    beforeY: 0,
    init: function() {
        this.superInit("SkyFish", 32, 32);

        this.collision = tm.app.CanvasElement().addChildTo(this);

        this.addEventListener("removed", function() {
            this.using = false;
            this.release();
        });
//        tm.app.CircleShape(32, 32).setPosition(0, 0).addChildTo(this);

        //攻撃ルーチン管理
        this.gunner = tm.app.CanvasElement().addChildTo(this);
        this.gunner.parent = this;
    },
    setup: function() {},
    algorithm: function() {},
    algorithmGunner: function() {},
    attack: function() {},
    dead: function() {},
    release: function() {},
    deadDefault: function() {
        var vx = this.x-this.beforeX, vy = this.y-this.beforeY;
        pb3.effects.enterExplode(this.burn, this.x, this.y, vx, vy);
    },
    update: function() {
        if (this.time < 0){
            this.time++;
            return;
        }
        if (this.time == 0)this.setup();

        this.algorithm();
        this.attack();

        if (this.def < 1) {
            this.dead();
            this.remove();
        }
        if (this.x < -128 || this.y < -128 || this.x > SC_W+128 || this.y > SC_H+128) {
            this.remove();
        }
        this.beforeX = this.x;
        this.beforeY = this.y;
        this.time++;
    },
});

//敵管理クラス初期化
pb3.enemies.init = function(){
    for (var i = 0; i < MAX_ENEMIES; i++ ){
        var e = new pb3.Enemy();
        this.push(e);
    }

    //配列使用量
    pb3.enemies.numUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var e = this[i];
            if (e.using) n++;
        }
        return n;
    }

    //配列未使用量
    pb3.enemies.numNotUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var e = this[i];
            if (!e.using) n++;
        }
        return n;
    }
    
    //敵投入
    pb3.enemies.enter = function(name, x, y, delay) {
        name = name || '';
        x = x || 0;
        y = y || 0;
        delay = delay || 0;
        for (var i = 0,len = this.length; i < len; i++) {
            var e = this[i];
            if (!e.using){
                var p = this.spec = pb3.EnemySpec[name];
                if (!p) return null;

                e.x = x;
                e.y = y;
                e.using = true;

                //性能諸元情報のコピー
                e.image = p.image;
                e.width = p.width;
                e.height = p.height;

                e.collision.x = p.colx;
                e.collision.y = p.coly;
                e.collision.width = p.colw;
                e.collision.height = p.colh;

                e.rotation = 0;
                e.phase = 0;
                e.scaleX = e.scaleY = 1;

                e.def = p.def;
                e.point = p.point;
                e.burn = p.burn;

                var emptyFunc = function(){};
                e.setup = p.setup || emptyFunc;
                e.algorithm = p.algorithm || emptyFunc;
                e.attack = p.attack || emptyFunc;
                e.dead = p.dead || e.deadDefault;
                e.release = p.release || emptyFunc;

                e.time = -delay;
                if (e.time > 0) e.time*=-1;

                app.currentScene.addChildToLayer(LAYER_OBJECT, e);
                return e;
            }
        }
        return null;
    }

    //スペックリスト初期化
    for (var i in pb3.EnemySpec) {
        var obj = pb3.EnemySpec[i];
        obj.image = tm.asset.AssetManager.get(obj.imagename);
    }
};

