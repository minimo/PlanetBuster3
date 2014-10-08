/*
 *  main.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

//乱数発生器
var mt = new MersenneTwister(0);

//フォント読み込み検出
var fontLoadEnd = false;

//定数
//デバッグ
DEBUG = true;
MUTEKI = false;
VIEW_COLLISION = true;

//スクリーンサイズ
SC_W = 480;
SC_H = 480;

//ゲームスクリーンサイズ
GS_W = 320;
GS_H = 480;
GS_OFFSET = 80;

//難易度
DIFF_EASY   = 0;
DIFF_NORMAL = 1;
DIFF_HARD   = 2;
DIFF_HELL   = 3;

//レイヤー区分
LAYER_SYSTEM = 10;          //システム表示
LAYER_FOREGROUND = 9;       //フォアグラウンド
LAYER_EFFECT_UPPER = 8;     //エフェクト上位
LAYER_PLAYER = 8;           //プレイヤー
LAYER_OBJECT_UPPER = 6;     //オブジェクト上位
LAYER_BULLET = 5;           //弾    
LAYER_SHOT = 4;             //ショット
LAYER_OBJECT = 3;           //オブジェクト中間
LAYER_OBJECT_LOWER = 2;     //オブジェクト下位
LAYER_EFFECT_LOWER = 1;     //エフェクト下位
LAYER_BACKGROUND = 0;       //バックグラウンド

//敵タイプ定数
ENEMY_SMALL = 0;
ENEMY_MIDDLE = 1;
ENEMY_LARGE = 2;
ENEMY_MBOSS = 3;
ENEMY_BOSS = 4;
ENEMY_ITEM = 9;

//爆発タイプ定数
EXPLODE_SMALL = 0;
EXPLODE_MIDDLE = 1;
EXPLODE_LARGE = 2;
EXPLODE_MBOSS = 3;
EXPLODE_BOSS = 4;

var toRad = 3.14159/180;    //弧度法toラジアン変換
var toDeg = 180/3.14159;    //ラジアンto弧度法変換
var sec = function(s) { return ~~(60 * s) };               //秒からフレーム数へ変換
var rand = function(min, max) { return mt.nextInt(min, max); };    //乱数発生
//var rand = function(max) {return ~~(Math.random() * max);}
//距離計算
var distance = function(from, to) {
    var x = from.x-to.x;
    var y = from.y-to.y;
    return Math.sqrt(x*x+y*y);
}
//距離計算（ルート無し版）
var distanceSq = function(from, to) {
    var x = from.x-to.x;
    var y = from.y - to.y;
    return x*x+y*y;
}

//インスタンス
app = {};

//アプリケーションメイン
tm.main(function() {
    app = pb3.PlanetBuster3("#world");
//    app.enableStats();
    detectFontLoading("Orbitron");
    app.run();
});

//フォント読み込み終了検出
detectFontLoading = function(fontName) {
    var tester = document.createElement('span');
    tester.style.fontFamily = "'" + fontName + "', 'Adobe Blank'";
    tester.style.position = 'absolute';
    tester.style.top = '-100px';
    tester.appendChild(document.createTextNode('a'));
    document.body.appendChild(tester);

    var timerId = setInterval(checkWidth, 500);
    function checkWidth() {
        if (tester.offsetWidth > 0) {
            clearInterval(timerId);
            document.documentElement.className += ' ' + fontName.toLowerCase().replace(/\s/g, '_');
            fontLoadEnd = true;
            tester.parentNode.removeChild(tester);
        }
    }
}

