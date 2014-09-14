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

        this.add(1, function() {
            this.ground.tweener.clear().to({speed:1.5}, 3000, "easeInOutQuad");
        });

        this.add( 120, "BigWing-left");
        this.add( 120, "BigWing-right");

        //Stage data
        this.add( 180, "SkyFish1-left");
        this.add(   1, "SkyFish1-right");
        this.add( 180, "SkyFish1-center");

        this.add( 120, "SkyFish1-left");
        this.add(   1, "SkyFish1-right");
        this.add( 180, "SkyFish1-center");

        this.add(1, function() {
            this.ground.tweener.clear().to({scaleX:0.7, scaleY:0.7, speed: 0.5}, 3000, "easeInOutCubic");
        });

        this.add( 180, "SkyFish1-left");
        this.add(  20, "SkyFish1-right");
        this.add( 120, "SkyFish1-center");

        this.add( 180, "SkyFish2-left");
        this.add( 120, "SkyFish2-right");
        this.add( 120, "SkyFish2-center");

        this.add( 240, "BigWing-left");
        this.add( 240, "BigWing-right");

        this.add( 180, "SkyFish2-left");
        this.add(  20, "SkyFish2-right");
        this.add( 120, "SkyFish2-center");
    },
});

})();
