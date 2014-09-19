/*
 *  Ground.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("pb3.Ground", {
    superClass: "tm.app.Object2D",
    layer: LAYER_BACKGROUND,    //所属レイヤー
    parentScene: null,      //親シーン

    belt: false,    //繰り返し地形フラグ

    direction: 0,
    speed: 1,

    init: function() {
        this.superInit();
        this.mapBase = tm.app.Object2D().setPosition(0, 0).addChildTo(this);
    },

    update: function() {
        var rad = (this.direction+90)*toRad;
        var vx = Math.cos(rad)*this.speed;
        var vy = Math.sin(rad)*this.speed;

        this.mapBase.x+=vx;
        this.mapBase.y+=vy;
    },

    addLayer: function(name) {
    },

    setDirection: function(dir) {
        this.direction = dir;
        return this;
    },

    setSpeed: function(speed) {
        this.speed = speed;
        return this;
    },

    setPosition: function(x, y) {
        this.mapBase.x = x;
        this.mapBase.y = y;
        return this;
    },
});

pb3.Ground.prototype.accessor("x", {
    "get": function() { return this.mapBase.x; },
    "set": function(x) { this.mapBase.x = x;}
});
pb3.Ground.prototype.accessor("y", {
    "get": function() { return this.mapBase.y; },
    "set": function(y) { this.mapBase.x = y;}
});


})();
