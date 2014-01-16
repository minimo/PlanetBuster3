/*
 *  PlanetBuster3
 *  StageController.js
 *  ステージ管理
 *  2013/12/25
 *  @auther minimo
 *  This Program is MIT license.
 */

//ステージ管理クラス
//
//管理対象
//ＢＧＭ
//マップ
//スクロールパターン
//敵出現パターン
pb3.StageController = tm.createClass({
    init: function() {
        this.vx = 0;
        this.vy = 0;
        this.seq = pb3.StageSequencer();
    },
    update: function() {
        var data = this.seq.get(time);
        if (data) {
            if (typeof(data) === "function") {
                data.call(this);
            }
        }
        this.time++;
    },
});

//ステージシーケンサー
pb3.StageSequencer = tm.createClass({
    index: 0,
    data: null,
    init: function() {
        this.data = {};
    },
    add: function(frame, value) {
        this.data[frame] = value;
    },
    get: function(frame) {
        var d = this.data[frame];
        if (d === undefined)return null;
        return d;
    },
});
