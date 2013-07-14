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

pb3.Enemy = tm.createClass({
    superClass: tm.app.Sprite,

    init: function() {
        this.superInit("boss", 296, 80);
        this.attack = function(){}
        this.time = 0;

        this.colsize = 16;  //当たり判定サイズ

        this.addEventListener("removed", function() {
            this.using = false;
        });
    },
    update: function() {
        this.time++;
    },
});

pb3.enemies.init = function(){
    for (var i = 0; i < MAX_ENEMIES; i++ ){
        var e = new pb3.Enemy();
        this.push(e);
    }

    pb3.enemies.numUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var e = this[i];
            if (e.using) n++;
        }
        return n;
    }
    pb3.enemies.numNotUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var e = this[i];
            if (!e.using) n++;
        }
        return n;
    }
    pb3.enemies.enterEnemy = function(type,x,y) {
        type = type || 0;
        x = x || 0;
        y = y || 0;
        var e;
        for (var i = 0,len = this.length; i < len; i++) {
            e = this[i];
            if (!e.using){
                return e;
            }
        }
        return null;
    }
};


