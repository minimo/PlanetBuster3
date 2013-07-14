/*
 *  PlanetBuster3
 *  2013/06/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

DIFF_EASY   = 0;
DIFF_NORMAL = 1;
DIFF_HARD   = 2;
DIFF_HELL   = 3;

//アセット登録
var ASSETS = {
    //images
    //自機系
    "gunship1":     "assets/gunship1.png",
    "bit1":         "assets/bit1.png",
    "shot1":        "assets/shot1.png",
    "shot2":        "assets/shot2.png",
    "shotburn":     "assets/shotburn.png",
    
    //敵機
    "enemy1":       "assets/enemy1.png",

    //ボス
    "boss":         "assets/boss1b.png", 

    //敵弾
    "bullet1":      "assets/bullet1.png",
    "vanish1":      "assets/vanish1.png",

    //特殊効果
    "mask":         "assets/mask.png",
    "mask_w":       "assets/mask_w.png",

    //sounds
}

//namespace PlanetBuster3
pb3 = {
    core: null,
};

pb3.PlanetBuster3 = tm.createClass({
    superClass: tm.app.CanvasApp,
    score: 0,
    highScore: 0,       //ハイスコア
    highScoreStage: 0,  //ハイスコア時ステージ
    difficulty: 0,      //難易度(0-3)
    init: function(id) {
        this.superInit(id);

        pb3.core = this;
        this.resize(SCREEN_WIDTH, SCREEN_HEIGHT).fitWindow();
        this.fps = 60;
        this.background = "rgba(0, 0, 0, 0)";

        //DSL関数をロード
        BulletML.dsl(); 

        //弾幕パターン作成
        CreateBulletPattern();

        this.keyboard = tm.input.Keyboard(window);

        this.replaceScene(tm.app.LoadingScene({
            assets:ASSETS,
            nextScene: function() {
                this._onLoadAssets();
                return pb3.TitleScene();
            }.bind(this),
        }));
    },

    _onLoadAssets: function() {
    },

    exitApp: function() {
        this.stop();
        tm.social.Nineleap.postRanking(this.highScore, "");
    }
});