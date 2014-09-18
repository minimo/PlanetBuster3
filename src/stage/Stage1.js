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
            this.ground.tweener.clear().to({scaleX:0.5, scaleY:0.5, speed:1.5}, 1, "easeInOutQuad");
        });

        this.add( 120, "ToyBox-p-center");
        this.add( 120, "ToyBox-b-right");

        //Stage data
        this.add( 180, "Hornet1-left");
        this.add(   1, "Hornet1-right");
        this.add( 180, "Hornet1-center");

        this.add(1, function() {
            this.ground.tweener.clear().to({scaleX:1.0, scaleY:1.0}, 5000, "easeInOutCubic");
        });

        this.add( 120, "Hornet1-left");
        this.add(   1, "Hornet1-right");
        this.add( 180, "Hornet1-center");

        this.add( 180, "Hornet1-left");
        this.add(  20, "Hornet1-right");
        this.add( 120, "Hornet1-center");

        this.add( 180, "Hornet2-left");
        this.add( 120, "Hornet2-right");
        this.add( 120, "Hornet2-center");

        this.add( 240, "BigWing-left");
        this.add( 240, "BigWing-right");

        this.add( 180, "Hornet2-left");
        this.add(  20, "Hornet2-right");
        this.add( 120, "Hornet2-center");
    },
});

})();
