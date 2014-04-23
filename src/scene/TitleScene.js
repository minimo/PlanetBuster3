/*
 *  PlanetBuster3
 *  title.js
 *  2013/06/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

//タイトルシーン
tm.define("pb3.TitleScene", {
    superClass: tm.app.Scene,

    init: function() {
        this.superInit();
        this.time = 0;
        app.background = "rgba(0,0,0,0.2)";

        //バックグラウンドの追加
/*
        this.bg = tm.display.Sprite("bg1",3848, 1280).addChildTo(this);
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.originX = this.bg.originY = 0;
*/
        var baseY = 200;

        var t1 = this.title1 = tm.display.OutlineLabel("PlanetBuster3", 30).addChildTo(this);
        t1.x = 320;
        t1.y = baseY;
        t1.fontFamily = "'UbuntuMono'";
        t1.align     = "center";
        t1.baseline  = "middle";
        t1.fontSize = 70;
        t1.fontWeight = 700;
        t1.outlineWidth = 2;

        var ct = this.clickortouch = tm.display.OutlineLabel("Click or Touch", 30).addChildTo(this);
        ct.x = 320;
        ct.y = 500;
        ct.fontFamily = "'UbuntuMono'";
        ct.align     = "center";
        ct.baseline  = "middle";
        ct.fontSize = 40;
        ct.fontWeight = 700;
        ct.outlineWidth = 2;
    },

    update: function() {
/*
        this.bg.x -=0.5;
        if (this.bg.x < -2000)this.bg.x = 0;
*/
        this.time++;
    },

    ontouchend: function() {
        app.background = "rgba(0, 0, 0, 0.8)";
        app.replaceScene(app.gameScene);
    },
});

