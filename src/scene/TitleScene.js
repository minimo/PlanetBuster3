/*
 *  PlanetBuster3
 *  title.js
 *  2013/06/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

//タイトルシーン
pb3.TitleScene = tm.createClass({
    superClass: tm.app.TitleScene,

    init: function() {
        this.superInit({
            title: "PlanetBuster",
            width: SC_W,
            height: SC_H
        });
        this.time = 0;
        app.background = "rgba(0,0,0,0.2)";
    },
    update: function() {
    },
    onnextscene: function() {
        app.background = "rgba(0, 0, 16, 0.8)";
        app.replaceScene(pb3.MainScene());
    }
});

//ゲーム結果シーン
pb3.ResultScene = tm.createClass({
    superClass: tm.app.ResultScene,

    init: function() {
        this.superInit({
            score: gamescore,
            msg: "Game Over",
        	width: SC_W,
            height: SC_H
        });
        // 9leap に投稿したときだけ反応します
        tm.social.Nineleap.postRanking(gamescore,"SCORE:"+gamescore);
    },
    onnextscene: function() {
        app.replaceScene(pb3.TitleScene);
    }
});
