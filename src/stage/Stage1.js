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

        //Stage data
        this.add( 180, "SkyFish1-left");
        this.add(   1, "SkyFish1-right");
        this.add( 180, "SkyFish1-center");

        this.add( 120, "SkyFish1-left");
        this.add(   1, "SkyFish1-right");
        this.add( 180, "SkyFish1-center");

        this.add( 180, "SkyFish1-left");
        this.add(  20, "SkyFish1-right");
        this.add( 120, "SkyFish1-center");

        this.add( 180, "SkyFish2-left");
        this.add( 120, "SkyFish2-right");
        this.add( 120, "SkyFish2-center");

        this.add( 240, "triangle1-left");
        this.add( 240, "triangle1-right");

        this.add( 180, "SkyFish2-left");
        this.add(  20, "SkyFish2-right");
        this.add( 120, "SkyFish2-center");

        this.add( 240, "square1-right");

        this.add( 360, function(){});

        this.add( 120, "triangle1-center");
        this.add(  20, "SkyFish1-right");
        this.add(  20, "SkyFish1-left");
        this.add( 240, "triangle1-left");
        this.add( 120, "SkyFish1-center");
        this.add( 240, "triangle1-right");

        this.add( 120, "triangle1-left");
        this.add(  60, "triangle1-right");
        this.add(  60, "triangle1-center");

        this.add( 240, "square1-left");
        this.add(  20, "SkyFish1-right");

        this.add( 240, "triangle1-left");
        this.add( 120, "triangle1-right");

        this.add( 120, "SkyFish1-left");
        this.add(  20, "SkyFish1-right");
        this.add( 120, "SkyFish1-center");

        this.add( 240, function(){ this.enterWarning()});
        this.add( 360, "boss1");
    },
});

})();
