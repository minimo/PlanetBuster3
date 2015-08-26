/*
 *  GameoverScene.js
 *  2014/08/11
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
//タイトルシーン
tm.define("pb3.GameoverScene", {
    superClass: tm.app.Scene,

    result1: "",
    result2: "",

    //ラベル用パラメータ
    labelParam: {fontFamily: "Orbitron", align: "center", baseline: "middle", fontWeight: 500, outlineWidth: 2},

    init: function(stageNumber, boss, allclear) {
        this.superInit();
        app.background = "rgba(0, 0, 0, 0.5)";

        this.mask = tm.display.RectangleShape({width:SC_W*0.7, height:SC_H*0.5, fillStyle:"rgba(0,0,0,0.7)", strokeStyle:"rgba(0,0,0,0.7)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)

        //リザルト表示
        this.result1 = "SCORE: "+app.score;
        if (!allclear) {
            this.result2 = "Stage:"+stageNumber+(boss?" boss":"");
        } else {
            this.result2 = "(ALL CLEAR!!)";
        }

        //ゲームオーバー表示
        tm.display.OutlineLabel("GAME OVER", 30)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.4)
            .setParam(this.labelParam);

        tm.display.OutlineLabel(this.result1, 20)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .setParam(this.labelParam);

        tm.display.OutlineLabel("Press [Z] key or Touch", 20)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.60)
            .setParam(this.labelParam);

        //ハイスコア更新
        if (app.highScore<app.score) app.highScore = app.score;

        //１０秒経つと自動でタイトルへ
        this.timer = tm.app.Object2D().addChildTo(this).tweener.wait(10000).call(function(){this.exit()}.bind(this));

        this.time = 0;        
    },

    update: function() {
        //キーボード操作
        var kb = app.keyboard;
        if (this.time > 60 && app.keyboard.getKey("Z")) {
            this.exit();
        }
        this.time++;
    },

    ontouchstart: function(e) {
        this.exit();
    },

    exit: function() {
        //ナインリープの場合はスコア登録画面へ
        tm.social.Nineleap.postRanking(app.score, this.result1+"("+this.result2+")");

        app.replaceScene(pb3.TitleScene());
    },
});

