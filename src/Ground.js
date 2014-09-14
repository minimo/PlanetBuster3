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

    init: function(name) {
        this.superInit(name);

        this.map = tm.display.Sprite(name).addChildTo(this);

        this.width = this.map.width;
        this.height = this.map.height;
    },

    update: function() {
        var rad = (this.direction+90)*toRad;
        var vx = Math.cos(rad)*this.speed;
        var vy = Math.sin(rad)*this.speed;

        this.x+=vx;
        this.y+=vy;
    },

    setDirection: function(dir) {
        this.direction = dir;
    },
    setSpeed: function(speed) {
        this.speed = speed;
    },
});

})();
