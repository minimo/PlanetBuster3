/*
 *  StageData.js
 *  2014/08/06
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

//ステージ１
tm.define("pb3.Stage1", {
    superClass: "pb3.StageController",

    init: function(parent, player) {
        this.superInit(parent, player);

        //初期化処理
        this.add(1, function() {
            this.ground.map.alpha = 0;
            this.ground.tweener.clear().to({scaleX:0.2, scaleY:0.2, speed:1.0, alpha:0}, 1, "easeInOutQuad");
            app.playBGM("stage1", true);
        });
        this.add(60, function() {
            this.ground.tweener.clear().to({scaleX:1.0, scaleY:1.0}, 5000, "easeInOutCubic");
            this.ground.map.tweener.clear().to({alpha:1}, 2000, "easeInOutQuad");
        });

//        this.add( 180, "Fragarach-center");

        //Stage data
        this.add( 180, "Hornet1-left");
        this.add(  60, "Hornet1-right");
        this.add(  60, "Hornet1-center");

        this.add( 120, "Hornet1-left");
        this.add(   1, "Hornet1-right");
        this.add(  60, "Hornet1-center");

        this.add( 120, "MudDauber-left");
        this.add(  60, "MudDauber-right");

        this.add(  90, "Hornet1-left");
        this.add(  20, "Hornet1-right");
        this.add( 120, "Hornet1-center");

        this.add(  90, "Hornet2-left");
        this.add( 120, "Hornet2-right");
        this.add( 120, "Hornet2-center");

        this.add(  30, "BigWing-left");
        this.add( 180, "BigWing-right");

        this.add( 120, "Hornet2-left");
        this.add(  20, "Hornet2-right");
        this.add( 120, "Hornet2-center");

        this.add( 120, "ToyBox-p-right");
    },
});

//ステージ１地形管理
tm.define("pb3.Stage1.Ground", {
    superClass: "pb3.Ground",

    init: function() {
        this.superInit();
        this.position.x = GS_W/2;
        this.position.y = GS_H/2;

        this.map = tm.display.Sprite("map1g").addChildTo(this.mapBase);
        this.map.alpha = 0;
    },
});

})();
