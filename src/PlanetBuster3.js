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

    highScore: 0,
    score: 0,
    extendNumber: 0,
    extendScore: null,

    //演奏中ＢＧＭ
    bgm: null,

    //ＢＧＭ演奏フラグ
    bgmIsPlay: false,

    //ＢＧＭ音量
    volumeBGM: 1.0,

    //ＳＥ音量
    volumeSE: 1.0,

    init: function(id) {
        this.superInit(id);

        //エクステンドスコア配列
        this.extendScore = [];
        this.extendScore.push(100000);
        this.extendScore.push(200000);
        this.extendScore.push(300000);

        pb3.core = this;
        this.resize(SC_W, SC_H).fitWindow();
        this.fps = 60;
        this.background = "rgba(0, 0, 0, 1.0)";
        this.keyboard = tm.input.Keyboard(window);

        //サウンドセット
        this.sounds = tm.extension.SoundSet();

        //アセット読み込みシーン
        var loadingScene = pb3.LoadingScene({
            assets: pb3.assets["main"],
            width: SC_W,
            height: SC_H,
            bgColor: 'rgba(0, 0, 0, 1)',
            nextScene: function() {
                this._onLoadAssets();
                return pb3.TitleScene();
            }.bind(this)
        });

        this.replaceScene(loadingScene);
    },

    exitApp: function() {
        this.stop();
        tm.social.Nineleap.postRanking(this.highScore, "");
    },

    _onLoadAssets: function() {
        //アセット読み込み
        this.sounds.readAsset();

        [
            "tex1",
            "tex2",
            "boss1",
        ].forEach(function(name) {
            var tex = tm.asset.AssetManager.get(name);

            //瀕死用ビットマップ作成
            var canvas = tm.graphics.Canvas();
            canvas.resize(tex.width, tex.height);
            canvas.drawTexture(tex, 0, 0);

            var bm = canvas.getBitmap();
            bm.filter({
                calc: function(pixel, index, x, y, bitmap) {
                    bitmap.setPixelIndex(index, pixel[0], 0, 0);
                }
            });
            var cv = tm.graphics.Canvas();
            cv.resize(tex.width, tex.height);
            cv.drawBitmap(bm, 0, 0);
            tm.asset.AssetManager.set(name + "Red", cv);

            //ダメージ用ビットマップ作成
            var canvas = tm.graphics.Canvas();
            canvas.resize(tex.width, tex.height);
            canvas.drawTexture(tex, 0, 0);

            var bm = canvas.getBitmap();
            bm.filter({
                calc: function(pixel, index, x, y, bitmap) {
                    var r = (pixel[0]==0?0:128);
                    var g = (pixel[1]==0?0:128);
                    var b = (pixel[2]==0?0:128);
                    bitmap.setPixelIndex(index, r, g, b);
                }
            });
            var cv = tm.graphics.Canvas();
            cv.resize(tex.width, tex.height);
            cv.drawBitmap(bm, 0, 0);
            tm.asset.AssetManager.set(name + "White", cv);

            //ダメージ用ビットマップ作成２
            var canvas = tm.graphics.Canvas();
            canvas.resize(tex.width, tex.height);
            canvas.drawTexture(tex, 0, 0);

            var bm = canvas.getBitmap();
            bm.filter({
                calc: function(pixel, index, x, y, bitmap) {
                    bitmap.setPixelIndex(index, 0, 0, pixel[2]);
                }
            });
            var cv = tm.graphics.Canvas();
            cv.resize(tex.width, tex.height);
            cv.drawBitmap(bm, 0, 0);
            tm.asset.AssetManager.set(name + "Blue", cv);
        });
    },

    playBGM: function(asset) {
        this.sounds.playBGM(asset);
        return this;
    },

    stopBGM: function() {
        this.sounds.stopBGM();
        return this;
    },

    pauseBGM: function() {
        this.sounds.pauseBGM();
        return this;
    },

    resumeBGM: function() {
        this.sounds.resumeBGM();
        return this;
    },

    playSE: function(asset) {
        this.sounds.playSE(asset);
        return this;
    },

    setVolumeBGM: function(vol) {
        this.sounds.setVolumeBGM(vol);
        return this;
    },

    setVolumeSE: function(vol) {
        this.sounds.setVolumeSE(vol);
        return this;
    },
});

pb3.PlanetBuster3.prototype.accessor("volumeBGM", {
    "get": function() { return this.sounds.volumeBGM; },
    "set": function(vol) {
        this.setVolumeBGM(vol);
    }
});
pb3.PlanetBuster3.prototype.accessor("volumeSE", {
    "get": function() { return this.sounds.volumeSE; },
    "set": function(vol) {
        this.setVolumeSE(vol);
    }
});

})();
