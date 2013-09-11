/*
 *  PlanetBuster3
 *  2013/06/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

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
    "SkyFish":      "assets/enemy_skyfish.png",
    "roter1":       "assets/enemy_roter.png",

    //ボス
//    "boss":         "assets/boss1b.png", 

    //敵弾
    "bullet1":      "assets/bullet1.png",
    "vanish1":      "assets/vanish1.png",

    //特殊効果
    "explode1":     "assets/explode1.png",
    "chip1":        "assets/chip1.png",
    "chip2":        "assets/chip2.png",
    "mask":         "assets/mask.png",
    "mask_w":       "assets/mask_w.png",

    //sounds
    "bomb1":        "assets/se_bomb1.mp3",
    "bomb2":        "assets/se_bomb2.mp3",
    "bomb3":        "assets/se_bomb3.mp3",
    "bomb4":        "assets/se_bomb4.mp3",
    "bomb5":        "assets/se_bomb5.mp3",
    "bomb6":        "assets/se_bomb6.mp3",
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
    mainScene: null,
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