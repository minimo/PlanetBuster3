/*
 *  BulletPattern.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

pb3.bulletPattern = [];
var $ = bulletml.dsl;

//ゲーム難易度
$diff = 1;

//難易度ランク
$rank = 0;


//弾種
//小弾（赤）
var RS = function(action) { return $.bullet(action, {type: "RS"}); };
//小弾（青）
var BS = function(action) { return $.bullet(action, {type: "BS"}); };
//通常弾（赤）
var RM = function(action) { return $.bullet(action, {type: "RM"}); };
//通常弾（青）
var BM = function(action) { return $.bullet(action, {type: "BM"}); };
//大弾（赤）
var RL = function(action) { return $.bullet(action, {type: "RL"}); };
//大弾（青）
var BL = function(action) { return $.bullet(action, {type: "BL"}); };

//楕円弾（赤）(RedEllipsean)
var RE = function(action) { return $.bullet(action, {type: "RE"}); };
//楕円弾（青）(BlueEllipsean)
var BE = function(action) { return $.bullet(action, {type: "BE"}); };

//ランクを考慮したウェイト
var $interval = function(v) {v = v===undefined?1:v; return $.wait(~~(v-$rank))};

//速度
var $spd = function(v) { v = v===undefined?1:v; return $.speed($rank*0.1*v+v);};

//自機狙い弾
var $fireBS = function(spd, x, y) { return $.fire($.direction(0), $.speed(spd) || $spd, BS, $.offsetX(x), $.offsetY(y)) };
var $fireRS = function(spd, x, y) { return $.fire($.direction(0), $.speed(spd) || $spd, RS, $.offsetX(x), $.offsetY(y)) };

/**

    汎用弾幕定義

**/

//no operation
pb3.bulletPattern["nop"] = new bulletml.Root({top: $.action([$.wait(10000)])});

//Basic aim bullet
pb3.bulletPattern["basic-aim1"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $fireRS(3),
            $.wait("$rand * 60"),
        ]),
    ]),
});

pb3.bulletPattern["basic-aim2"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $fireRS(3),
            $.wait("$rand * 60"),
        ]),
    ]),
});

/** 自機狙いn-way弾 */
var $nway = function(way, rangeFrom, rangeTo, speed, bullet, offsetX, offsetY, autonomy) {
    return $.action([
        $.fire($.direction(rangeFrom), speed, bullet || RS, offsetX, offsetY, autonomy),
        $.bindVar("way", "Math.max(2, " + way + ")"),
        $.repeat("$way-1", [
            $.fire($.direction("((" + rangeTo + ")-(" + rangeFrom + "))/($way-1)", "sequence"), speed, bullet || RS, offsetX, offsetY, autonomy),
        ]),
    ]);
};
var $nwayVs = function(way, rangeFrom, rangeTo, bullet, offsetX, offsetY, autonomy) {
    return function(spd) {
        return $nway(way, rangeFrom, rangeTo, spd, bullet, offsetX, offsetY, autonomy);
    };
};

/** 絶対n-way弾 */
var $absoluteNway = function(way, rangeFrom, rangeTo, speed, bullet, offsetX, offsetY) {
    return $.action([
        $.fire($.direction(rangeFrom, "absolute"), speed, bullet || RS, offsetX, offsetY),
        $.bindVar("way", "Math.max(2, " + way + ")"),
        $.repeat("$way-1", [
            $.fire($.direction("((" + rangeTo + ")-(" + rangeFrom + "))/($way-1)", "sequence"), speed, bullet || RNS, offsetX, offsetY),
        ]),
    ]);
};
var $absoluteNwayVs = function(way, rangeFrom, rangeTo, bullet, offsetX, offsetY) {
    return function(spd) {
        return $absoluteNway(way, rangeFrom, rangeTo, spd, bullet, offsetX, offsetY);
    };
};

/**
 * ウィップ
 * @param {bulletml.Speed} baseSpeed 初回のスピード
 * @param {number} delta 2回目以降のスピード増分
 * @param {number} count 回数
 * @param {function(bulletml.Speed):bulletml.Action} スピードを受け取りActionを返す関数
 */
var $whip = function(baseSpeed, delta, count, actionFunc) {
    return $.action([
        actionFunc(baseSpeed),
        $.repeat(count + "-1", [
            actionFunc($.speed(delta, "sequence")),
        ]),
    ]);
};

/**

    固有弾幕定義

**/

/*
 * 突撃ヘリ「ホーネット」
 */
pb3.bulletPattern["Hornet1"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $fireRS(3),
            $.wait("$rand * 60"),
        ]),
    ]),
});

/*
 * 突撃ヘリ２「ホーネット」
 */
pb3.bulletPattern["Hornet2"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(3, [
            $fireRS(3),
            $.wait("$rand * 60"),
        ]),
    ]),
});

/*
 *  中型攻撃ヘリ「ジガバチ」
 */
pb3.bulletPattern["MudDauber"] = new bulletml.Root({
    top0: $.action([
        $.wait(90),
        $.repeat(999, [
            $.repeat(5, [
                $fireBS(3),
                $interval(10),
            ]),
            $interval(120),
        ]),
    ]),
    top1: $.action([
        $.wait(90),
        $.repeat(999, [
            $.repeat(3, [
                $.fire($.direction(180, "absolute"), $spd(3), BM, $.offsetX(-32)),
                $.fire($.direction(180, "absolute"), $spd(3), BM, $.offsetX( 32)),
                $interval(15),
            ]),
            $interval(60),
        ]),
    ]),
});

/*
 *  飛行艇「モーンブレイド」
 */
pb3.bulletPattern["MournBlade"] = new bulletml.Root({
    top0: $.action([
        $.wait(90),
        $.repeat(999, [
            $.repeat(5, [
                $fireBS(3),
                $interval(10),
            ]),
            $interval(120),
        ]),
    ]),
    top1: $.action([
        $.wait(90),
        $.repeat(999, [
            $.repeat(3, [
                $.fire($.direction(180, "absolute"), $spd(3), BM, $.offsetX(-32)),
                $.fire($.direction(180, "absolute"), $spd(3), BM, $.offsetX( 32)),
                $interval(15),
            ]),
            $interval(60),
        ]),
    ]),
});

/*
 *  中型爆撃機「ビッグウィング」
 */
pb3.bulletPattern["BigWing"] = new bulletml.Root({
    top0: $.action([
        $.wait(90),
        $.repeat(999, [
            $.repeat(5, [
                $absoluteNway(3, 200, 160, $spd(2), RM),
                $interval(10),
            ]),
            $interval(120),
        ]),
    ]),
    top1: $.action([
        $.wait(90),
        $.repeat(999, [
            $.repeat(3, [
                $.fire($.direction(180, "absolute"), $spd(3), BM, $.offsetX(-32)),
                $.fire($.direction(180, "absolute"), $spd(3), BM, $.offsetX( 32)),
                $interval(20),
            ]),
            $interval(60),
        ]),
    ]),
});

//ToyBox
pb3.bulletPattern["ToyBox"] = new bulletml.Root({
    top: $.action([
        $.wait(60),
        $.repeat(999, [
            $fireRS(3, 0, -42),
            $.wait("$rand*90"),
        ]),
    ]),
});

})();
