/*
 *  PlanetBuster3
 *  2014/09/04
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

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

    highScore: 0,
    score: 0,
    extendNumber: 0,
    extendScore: null,

    bgm: null,
    bgmIsPlay: false,
    volumeBGM: 1.0,
    volumeSE: 1.0,

    init: function(id) {
        this.superInit(id);

        this.extendScore = [];
        this.extendScore.push(1000000);
        this.extendScore.push(2000000);
        this.extendScore.push(2500000);

        pb3.core = this;
        this.resize(SC_W, SC_H).fitWindow();
        this.fps = 60;
        this.background = "rgba(0, 0, 0, 1.0)";

        this.keyboard = tm.input.Keyboard(window);

        var loadingScene = tm.ui.LoadingScene({
            assets: pb3.assets,
            width: SC_W,
            height: SC_H,
            bgColor: "black",
            nextScene: function() {
                this._onLoadAssets();
                return pb3.WaitScene();
            }.bind(this),
        });

        //弾セットアップ
        pb3.setupBullets();

        this.replaceScene(loadingScene);
    },

    _onLoadAssets: function() {
        [
            "enemy5",
        ].forEach(function(name) {
            //被ダメージ用の赤ビットマップ作成
            var tex = tm.asset.AssetManager.get(name);
            var canvas = tm.graphics.Canvas();
            canvas.resize(tex.width, tex.height);
            canvas.drawTexture(tex, 0, 0);

            var bmRed = canvas.getBitmap();
            bmRed.filter({
                calc: function(pixel, index, x, y, bitmap) {
                    bitmap.setPixelIndex(index, pixel[0], 0, 0);
                }
            });
            var cvRed = tm.graphics.Canvas();
            cvRed.resize(tex.width, tex.height);
            cvRed.drawBitmap(bmRed, 0, 0);
            tm.asset.AssetManager.set(name + "Red", cvRed);
        });
    },

    exitApp: function() {
        this.stop();
        tm.social.Nineleap.postRanking(this.highScore, "");
    },

    playBGM: function(asset, loop) {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.stop();
                this.bgmIsPlay = false;
            }
        }
        this.bgm = tm.asset.AssetManager.get(asset).clone();
        if (this.bgm) {
            this.bgm.loop = loop;
            this.bgm.volume = this.volumeBGM*0.34;
            this.bgm.play();
            this.bgmIsPlay = true;
        }
        return this.bgm;
    },

    stopBGM: function() {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.stop();
                this.bgmIsPlay = false;
            }
            this.bgm = null;
        }
    },

    pauseBGM: function() {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.pause();
                this.bgmIsPlay = false;
            }
        }
    },

    resumeBGM: function() {
        if (this.bgm) {
            if (!this.bgmIsPlay) {
                this.bgm.resume();
                this.bgm.volume = this.volumeBGM*0.34;
                this.bgmIsPlay = true;
            }
        }
    },

    playSE: function(asset) {
        var se = tm.asset.AssetManager.get(asset).clone();
        if (se) {
            se.loop = false;
            se.volume = this.volumeSE*0.34;
            se.play();
        }
        return se;
    },
});

})();