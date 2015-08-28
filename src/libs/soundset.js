/*
 *  SoundSet.js
 *  2014/11/28
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.extension = tm.extension || {};

//サウンド管理
tm.define("tm.extension.SoundSet", {

    elements: null,

    bgm: null,
    bgmIsPlay: false,

    volumeBGM: 5,
    volumeSE: 5,

    init: function() {
        this.elements = [];
    },

    readAsset: function() {
        for (var key in tm.asset.Manager.assets) {
            var obj = tm.asset.Manager.get(key);
            if (obj instanceof tm.sound.WebAudio) this.add(key);
        }
    },

    add: function(name, url) {
        if (name === undefined) return null;
        url = url || null;

        var e = tm.Extension.SoundElement(name);
        if (!e.media) return false;
        this.elements.push(e);
        return true;
    },

    find: function(name) {
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].name == name) return this.elements[i];
        }
        return null;
    },

    playBGM: function(name) {
        if (this.bgm) {
            this.bgm.stop();
            this.bgmIsPlay = false;
        }
        var media = this.find(name);
        if (media) {
            media.play(true);
            media.setVolume(this.volumeBGM);
            this.bgm = media;
            this.bgmIsPlay = true;
        } else {
            if (this.add(name)) this.playBGM(name);
        }
        return this;
    },

    stopBGM: function() {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.stop();
                this.bgmIsPlay = false;
            }
            this.bgm = null;
        }
        return this;
    },

    pauseBGM: function() {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.pause();
                this.bgmIsPlay = false;
            }
        }
        return this;
    },

    resumeBGM: function() {
        if (this.bgm) {
            if (!this.bgmIsPlay) {
                this.bgm.volume = this.volumeBGM;
                this.bgm.resume();
                this.bgmIsPlay = true;
            }
        }
        return this;
    },

    setVolumeBGM: function(vol) {
        this.volumeBGM = vol;
        if (this.bgm) {
            this.bgm.pause();
            this.bgm.setVolume(this.volumeBGM);
            this.bgm.resume();
        }
        return this;
    },

    playSE: function(name) {
        var media = this.find(name);
        if (media) {
            media.setVolume(this.volumeSE);
            media.playClone();
        } else {
            if (this.add(name)) this.playSE(name);
        }
        return this;
    },

    setVolumeSE: function(vol) {
        this.volumeSE = vol;
        return this;
    },
});

//SoundElement Basic
tm.define("tm.Extension.SoundElement", {

    name: null,
    url: null,
    media: null,
    volume: 10,
    status: null,
    message: null,

    init: function(name) {
        this.name = name;
        this.media = tm.asset.AssetManager.get(name);
        if (!this.media) {
            console.warn("asset not found. "+name);
        }
    },

    play: function(loop) {
        if (!this.media) return this;
        this.media.loop = loop;
        this.media.play();
        return this;
    },

    playClone: function() {
        if (!this.media) return this;
        this.media.loop = false;
        this.media.clone().play();
        return this;
    },

    resume: function() {
        if (!this.media) return this;
        this.media.resume();
        return this;
    },

    pause: function () {
        if (!this.media) return this;
        this.media.pause();
    },

    stop: function() {
        if (!this.media) return this;
        this.media.stop();
        return this;
    },

    setVolume: function(vol) {
        if (!this.media) return this;
        if (vol === undefined) vol = 1;
        this.volume = vol;
        this.media.volume = this.volume*0.1;
        return this;
    },
});
