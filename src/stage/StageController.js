/*
 *  StageController.js
 *  2014/08/06
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

//ステージ制御
tm.define("pb3.StageController", {

    parentScene: null,
    player: null,
    time: 0,

    seq: null,
    index: 0,

    init: function(scene, player) {
        this.parentScene = scene;
        this.seq = [];
    },

    add: function(time, value, flag) {
        this.index += time;
        this.seq[this.index] = {
            value: value,
            flag: flag,
        }
    },

    get: function(time) {
        var data = this.seq[time];
        if (data === undefined) return null;
        return data;
    },

    clear: function() {
        this.seq = [];
        this.index = 0;
    },
});

})();
