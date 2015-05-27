/*
 *  TitleScene.js
 *  2014/08/11
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
//タイトルシーン
tm.define("pb3.TitleScene", {
    superClass: tm.app.Scene,

    init: function() {
        this.superInit();
        app.background = "rgba(0, 0, 0, 1.0)";

        this.mask = tm.display.RectangleShape({width:SC_W, height:SC_H, fillStyle:"rgba(0,0,0,0.5)", strokeStyle:"rgba(0,0,0,0.1)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)

        //タイトルロゴ
        var t1 = this.title1 = tm.display.OutlineLabel("2D DANMAKU Shooting", 25).addChildTo(this);
        t1.x = SC_W*0.5; t1.y = SC_H*0.4;
        t1.setParam({fontFamily:"'UbuntuMono'", align: "center", baseline:"middle", fontWeight:300, outlineWidth:2 });

        var t2 = this.title2 = tm.display.OutlineLabel("Planet Buster", 40).addChildTo(this);
        t2.x = SC_W*0.5; t2.y = SC_H*0.5;
        t2.setParam({fontFamily:"'Orbitron'", align: "center", baseline:"middle", fontWeight:800, outlineWidth:2 });
        t2.fillStyle = tm.graphics.LinearGradient(-SC_W*0.5, 0, SC_W*0.5, 64)
            .addColorStopList([
                { offset: 0.1, color: "hsla(230, 90%, 50%, 0.5)"},
                { offset: 0.5, color: "hsla(230, 80%, 90%, 0.9)"},
                { offset: 0.9, color: "hsla(230, 90%, 50%, 0.5)"},
            ]).toStyle();
        t2.shadowColor = "blue";
        t2.shadowBlur = 10;
        var t3 = this.title3 = tm.display.OutlineLabel("tmlib label", 25).addChildTo(this);
        t3.x = SC_W*0.5; t3.y = SC_H*0.6;
        t3.setParam({fontFamily:"'UbuntuMono'", align: "center", baseline:"middle", fontWeight:300, outlineWidth:2 });

        var ct = this.clickortouch = tm.display.OutlineLabel("Press[Z]key or touch", 20).addChildTo(this);
        ct.x = SC_W*0.5; ct.y = SC_H*0.8;
        ct.setParam({fontFamily:"'UbuntuMono'", align: "center", baseline:"middle", fontWeight:500, outlineWidth:2 });

        //スコア表示ラベル
        var sc = this.scoreLabel = tm.display.OutlineLabel("HIGHSCORE:"+app.highScore, 20).addChildTo(this);
        sc.setParam({fontFamily:"'Orbitron'", align: "left", baseline:"top", fontWeight:700, outlineWidth:2 });

        this.time = 0;
    },

    gameStart: function() {
        app.background = "rgba(0, 0, 0, 0.8)";
        app.score = 0;
        var loadingScene = pb3.LoadingScene({
            assets: pb3.assets["stage1"],
            width: SC_W,
            height: SC_H,
            bgColor: 'rgba(0, 0, 0, 1)',
            nextScene: function() {
                return pb3.MainScene();
            }.bind(this)
        });
        app.replaceScene(loadingScene);
    },

    update: function() {
        //キーボード操作
        var kb = app.keyboard;
        if (this.time > 30 && app.keyboard.getKey("Z")) {
            this.gameStart();
        }
        this.time++;
    },

    ontouchend: function() {
        this.gameStart();
    },
});

