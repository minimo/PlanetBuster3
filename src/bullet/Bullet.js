/*
 *  PlanetBuster3
 *  Bullet.js
 *  enemy bullets & myship shot
 *  2013/06/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

/*
 * 敵弾管理
 */
MAX_BULLETS = 200;
pb3.bullets = [];
pb3.Bullet = tm.createClass({
    superClass: tm.app.Sprite,
    using: false,
    parent: null,
    type: 0,
    time: 0,
    init: function() {
        this.superInit("bullet1", 24, 24);
        this.setFrameIndex(0, 24, 24);

        this.blendMode = "lighter";

        this.collision = tm.app.CanvasElement().addChildTo(this);

        this.addEventListener("removed", function() {
            this.using = false;
        });
    },
    update: function() {
        if (this.time % 3 == 0) {
            this.setFrameIndex(~~(this.time/3)%8, 24, 24);
        }
        this.rotation+=5;
        this.time++;
    },
    //消失時エフェクト投入
    vanish: function() {
        var r = this.rotation * toRad;
        var s = this.speed;
        var vx =  Math.sin(r)*s;
        var vy = -Math.cos(r)*s;
        pb3.effects.enterEffect("vanish1", this.x, this.y, vx, vy);
        return this;
    },
});

//敵弾初期化
pb3.bullets.init = function(){
    for (var i = 0; i < MAX_BULLETS; i++ ){
        var b = new pb3.Bullet();
        this.push(b);
    }

   pb3.bullets.numUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var b = this[i];
            if (b.using) n++;
        }
        return n;
    }
   pb3.bullets.numNotUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var b = this[i];
            if (!b.using) n++;
        }
        return n;
    }

    //弾投入（通常）
    pb3.bullets.enter = function(parent, type, size, color) {
        type = type || 0;
        size = size || 16;
        color = color || 0;
        var b;
        for (var i = 0,len = this.length; i < len; i++) {
            b = this[i];
            if (!b.using){
                b.type = type;
                b.width = size;
                b.height = size;
                b.size = size;
                b.color = "hsl({0}, 50%, 50%)".format(color);
                b.using = true;
                b.parent = parent;
                app.currentScene.addChildToLayer(LAYER_BULLET, b);
                return b;
            }
        }
        return null;
    }

    //弾投入(BulletML用）
    pb3.bullets.enterToBulletML = function(parent, type, size, color) {
        type = type || 0;
        size = size || 16;
        color = color || 0;
        var b;
        for (var i = 0,len = this.length; i < len; i++) {
            b = this[i];
            if (!b.using){
                b.type = type;
                b.width = size;
                b.height = size;
                b.size = size;
                b.color = "hsl({0}, 50%, 50%)".format(color);
                b.using = true;
                b.parent = parent;
                return b;
            }
        }
        return null;
    }

    //Nway弾
    pb3.bullets.enterNWay = function(parent, type, size, color, target, speed) {
        var b = this.enter(type, size, color);
        if (b) {
        }
        return b;
    }

    //弾消去
    pb3.bullets.erace = function(parent) {
        parent = parent || null;
        for (var i = 0,len = this.length; i < len; i++) {
            var b = this[i];
            if (b.using) {
                if (b.parent == parent || parent == null){
                    b.vanish().remove();
                }
            }
        }
    }
    
    //リセット
    pb3.bullets.reset = function() {
        for (var i = 0,len = this.length; i < len; i++) {
            this[i].remove();
        }
    }
};

/*
 * 自機ショット管理
 */
MAX_SHOTS = 200;
pb3.shots = [];
pb3.Shot = tm.createClass({
    superClass: tm.app.Sprite,
    rad: 0,
    vx: 0,
    vy: 1,
    speed: 10,
    power: 10,
    using: false,
    init: function() {
        this.superInit("shot1", 16, 16);

        this.scaleX = 1.0;
        this.scaleY = 1.5;

        this.collision = tm.app.CanvasElement().addChildTo(this);

        this.addEventListener("removed", function() {
            this.using = false;
        });
    },
    update: function() {
        this.x+=this.vx*this.speed;
        this.y-=this.vy*this.speed;
        if (-10<this.x && this.x<SCREEN_WIDTH+10 && -10<this.y && this.y<SCREEN_HEIGHT+10) {
        } else {
            this.using = false;
            this.remove();
        }
    },
    vanish: function() {
        pb3.effects.enter('shotburn', this.x, this.y, 0, 0);
        this.remove();
    }
});

//自機ショット初期化
pb3.shots.init = function(){
    for (var i = 0; i < 200; i++ ){
        var s = new pb3.Shot();
        this.push(s);
    }

    //使用数
    pb3.shots.numUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var s = this[i];
            if (s.using) n++;
        }
        return n;
    }
    
    //未使用数
    pb3.shots.numNotUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var s = this[i];
            if (!s.using) n++;
        }
        return n;
    }

    //弾投入
    pb3.shots.enter = function(type, x, y, rot, power) {
        power = power || 1;
        var s;
        for (var i = 0,len = this.length; i < len; i++) {
            s = this[i];
            if (!s.using) {
                if (type == 0) {
                    s.image = tm.asset.AssetManager.get('shot1');
                    s.width = 16;
                    s.height = 16;
                    s.scaleX = 1.0;
                    s.scaleY = 1.5;
                    s.collision.x = -2;
                    s.collision.y = -2;
                    s.collision.width = 4;
                    s.collision.height = 4;
                } else {
                    s.image = tm.asset.AssetManager.get('shot2');
                    s.width = 16;
                    s.height = 32;
                    s.scaleX = 1.5;
                    s.scaleY = 1.0;
                    s.collision.x = -3;
                    s.collision.y = -2;
                    s.collision.width = 6;
                    s.collision.height = 4;
                }
                s.x = x;
                s.y = y;
                s.rad = rot*toRad;
                s.vx = Math.sin(s.rad);
                s.vy = Math.cos(s.rad);
                s.rotation = rot;
                s.using = true;
                s.power = power;
                s.blendMode = "lighter";
                app.currentScene.addChild(s);
                return s;
            }
        }
        return null;
    }
    
    //リセット
    pb3.shots.reset = function() {
        for (var i = 0,len = this.length; i < len; i++) {
            this[i].remove();
        }
    }
};
