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

    init: function() {
        this.superInit("bullet1", 24, 24);
        this.setFrameIndex(0, 24, 24);

        this.blendMode = "lighter";
        this.rotation = 0;

        this.type = 0;
        this.parent = null;
        this.using = false;
        this.time = 0;
        
        this.colSize = 2;   //当たり判定サイズ
        
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

    pb3.bullets.enterBullet = function(parent, type, size, color) {
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
//                b.originX = ~~(size/2);
//                b.originY = ~~(size/2);
                b.color = "hsl({0}, 50%, 50%)".format(color);
                b.using = true;
                b.parent = parent;
                return b;
            }
        }
        return null;
    }

    pb3.bullets.vanish = function(parent) {
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
    init: function() {
        this.superInit("shot1", 16, 16);

        this.rad = 0;
        this.vx = 0;
        this.vy = 1;
        this.speed = 10;
        this.using = false;
        this.blendMode = "lighter";
        
        this.power = 10;

        this.scaleX = 1.0;
        this.scaleY = 1.5;
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
});

//自機ショット初期化
pb3.shots.init = function(){
    for (var i = 0; i < 200; i++ ){
        var s = new pb3.Shot();
        this.push(s);
    }

    pb3.shots.numUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var s = this[i];
            if (s.using) n++;
        }
        return n;
    }
    pb3.shots.numNotUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var s = this[i];
            if (!s.using) n++;
        }
        return n;
    }

    pb3.shots.enterShot = function(type, x, y, rot, power) {
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
                } else {
                    s.image = tm.asset.AssetManager.get('shot2');
                    s.width = 16;
                    s.height = 32;
                    s.scaleX = 1.0;
                    s.scaleY = 0.5;
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
    pb3.shots.reset = function() {
        for (var i = 0,len = this.length; i < len; i++) {
            this[i].remove();
        }
    }
};
