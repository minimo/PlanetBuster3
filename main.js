/*
 *  PlanetBuster3
 *  main.js
 *  2013/06/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

//乱数発生器
var mt = new MersenneTwister(0);

//定数
//デバッグ
var _DEBUG = true;
if (_DEBUG) {
    DISP_DATA = true;
    DISP_COLLISION = false;
    DISP_ADVANCE = false;
}

//スクリーンサイズ
var SCREEN_WIDTH = 320;
var SCREEN_HEIGHT= 320;
var SCREEN_WIDTH_HALF = SCREEN_WIDTH/2;
var SCREEN_HEIGHT_HALF = SCREEN_HEIGHT/2;

var toRad = 3.14159/180;    //弧度法toラジアン変換
var toDeg = 180/3.14159;    //ラジアンto弧度法変換
var sec = function(s) { return ~ ~(60 * s) };               //秒からフレーム数へ変換
var rand = function(max) { return mt.nextInt(0, max); };    //乱数発生
//var rand = function(max) {return ~~(Math.random() * max);}

//アプリケーションメイン
tm.main(function() {
    app = pb3.PlanetBuster3("#world");
//    app.enableStats();
    app.run();
});
