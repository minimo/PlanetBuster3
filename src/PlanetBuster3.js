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

        //アセット読み込みシーン
        var loadingScene = pb3.LoadingScene({
            assets: pb3.assets,
            width: SC_W,
            height: SC_H,
            bgColor: "black",
            nextScene: function() {
                this._onLoadAssets();
                return pb3.TitleScene();
            }.bind(this),
        });

        this.replaceScene(loadingScene);
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

    playSE: function(asset, volume) {
        var se = tm.asset.AssetManager.get(asset).clone();
        if (se) {
            se.loop = false;
            se.volume = volume || this.volumeSE*0.34;
            se.play();
        }
        return se;
    },
});


//SpriteのsetFrameIndexをちょっと改造
tm.display.Sprite.prototype.setFrameIndex = function(index, width, height) {

    //テクスチャのトリミング設定
    var sx = this.frameTrimX || 0;
    var sy = this.frameTrimY || 0;
    var sw = this.frameTrimW || (this.image.width-sx);
    var sh = this.frameTrimH || (this.image.height-sy);

    var tw  = width || this.width;      // tw
    var th  = height || this.height;    // th
    var row = ~~(sw / tw);
    var col = ~~(sh / th);
    var maxIndex = row*col;
    index = index%maxIndex;

    var x   = index%row;
    var y   = ~~(index/row);
    this.srcRect.x = sx+x*tw;
    this.srcRect.y = sy+y*th;
    this.srcRect.width  = tw;
    this.srcRect.height = th;

    this._frameIndex = index;

    return this;
}

//トリミング開始位置設定
tm.display.Sprite.prototype.setFrameTrim = function(x, y, width, height) {
    this.frameTrimX = x || 0;
    this.frameTrimY = y || 0;
    this.frameTrimW = width || this.image.width - this.frameTrimX;
    this.frameTrimH = height || this.image.height - this.frameTrimY;
    return this;
}

})();
