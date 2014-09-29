/*
 *  EnemyData.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

//敵小隊単位定義
pb3.enemyUnit = {

/*
 * 突撃ヘリ「ホーネット」
 */
"Hornet1-left": [
    { "name": "Hornet1", "x":GS_W*0.1, "y":-150 },
    { "name": "Hornet1", "x":GS_W*0.2, "y":-120 },
    { "name": "Hornet1", "x":GS_W*0.3, "y":-130 },
    { "name": "Hornet1", "x":GS_W*0.4, "y":-120 },
],

"Hornet1-right": [
    { "name": "Hornet1", "x":GS_W*0.6, "y":-110 },
    { "name": "Hornet1", "x":GS_W*0.7, "y":-120 },
    { "name": "Hornet1", "x":GS_W*0.8, "y":-100 },
    { "name": "Hornet1", "x":GS_W*0.9, "y":-150 },
],

"Hornet1-center": [
    { "name": "Hornet1", "x":GS_W*0.25, "y":-160 },
    { "name": "Hornet1", "x":GS_W*0.35, "y":-120 },
    { "name": "Hornet1", "x":GS_W*0.40, "y":-100 },
    { "name": "Hornet1", "x":GS_W*0.50, "y":-110 },
    { "name": "Hornet1", "x":GS_W*0.70, "y":-130 },
    { "name": "Hornet1", "x":GS_W*0.85, "y":-120 },
],

/*
 * 突撃ヘリ２「ホーネット」
 */
"Hornet2-left": [
    { "name": "Hornet2", "x":GS_W*0.1, "y":-100 },
    { "name": "Hornet2", "x":GS_W*0.2, "y":-120 },
    { "name": "Hornet2", "x":GS_W*0.3, "y":-130 },
    { "name": "Hornet2", "x":GS_W*0.4, "y":-120 },
],

"Hornet2-right": [
    { "name": "Hornet2", "x":GS_W*0.6, "y":-100 },
    { "name": "Hornet2", "x":GS_W*0.7, "y":-120 },
    { "name": "Hornet2", "x":GS_W*0.8, "y":-130 },
    { "name": "Hornet2", "x":GS_W*0.9, "y":-120 },
],

/*
 *  中型攻撃ヘリ「ジガバチ」
 */
"MudDauber-left": [
    { "name": "MudDauber", "x":-GS_W*0.2, "y":GS_H*0.4 },
],

"MudDauber-right": [
    { "name": "MudDauber", "x": GS_W*1.2, "y":GS_H*0.4 },
],

/*
 *  中型爆撃機「ビッグウィング」
 */
"BigWing-left": [
    { "name": "BigWing", "x":GS_W*0.2, "y":-100 },
],

"BigWing-right": [
    { "name": "BigWing", "x":GS_W*0.8, "y":-100 },
],

/*
 * アイテムキャリア「トイボックス」
 */

//パワーアップ
"ToyBox-p-left": [
    { "name": "ToyBox", "x":GS_W*0.2, "y":-GS_H*0.3, param:"power" },
],
"ToyBox-p-center": [
    { "name": "ToyBox", "x":GS_W*0.5, "y":-GS_H*0.3, param:"power" },
],
"ToyBox-p-right": [
    { "name": "ToyBox", "x":GS_W*0.8, "y":-GS_H*0.3, param:"power" },
],

//ボム
"ToyBox-b-left": [
    { "name": "ToyBox", "x":GS_W*0.2, "y":-GS_H*0.3, param:"bomb" },
],
"ToyBox-b-center": [
    { "name": "ToyBox", "x":GS_W*0.5, "y":-GS_H*0.3, param:"bomb" },
],
"ToyBox-b-right": [
    { "name": "ToyBox", "x":GS_W*0.8, "y":-GS_H*0.3, param:"bomb" },
],

//ステージ１中ボス 軌道走行列車「トールハンマー」
"ThorHammer": [
    { "name": "ThorHammer", "x":GS_W*0.5, "y":-100 },
],

//ステージ１ボス　局地制圧用大型戦車「トール」
"Thor": [
    { "name": "Thor", "x":GS_W*0.5, "y":-GS_H*0.2 },
],


}

})();
