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
 * 突撃ヘリ「ホーネット」（パターン１）
 */
"Hornet1-left": [
    { "name": "Hornet", "x":SC_W*0.1, "y":-150, param:1 },
    { "name": "Hornet", "x":SC_W*0.2, "y":-120, param:1 },
    { "name": "Hornet", "x":SC_W*0.3, "y":-130, param:1 },
    { "name": "Hornet", "x":SC_W*0.4, "y":-120, param:1 },
],
"Hornet1-right": [
    { "name": "Hornet", "x":SC_W*0.6, "y":-110, param:1 },
    { "name": "Hornet", "x":SC_W*0.7, "y":-120, param:1 },
    { "name": "Hornet", "x":SC_W*0.8, "y":-100, param:1 },
    { "name": "Hornet", "x":SC_W*0.9, "y":-150, param:1 },
],
"Hornet1-center": [
    { "name": "Hornet", "x":SC_W*0.25, "y":-160, param:1 },
    { "name": "Hornet", "x":SC_W*0.35, "y":-120, param:1 },
    { "name": "Hornet", "x":SC_W*0.40, "y":-100, param:1 },
    { "name": "Hornet", "x":SC_W*0.50, "y":-110, param:1 },
    { "name": "Hornet", "x":SC_W*0.70, "y":-130, param:1 },
    { "name": "Hornet", "x":SC_W*0.85, "y":-120, param:1 },
],

/*
 * 突撃ヘリ「ホーネット」（パターン２）
 */
"Hornet2-left": [
    { "name": "Hornet", "x":SC_W*0.1, "y":-100, param:2 },
    { "name": "Hornet", "x":SC_W*0.2, "y":-120, param:2 },
    { "name": "Hornet", "x":SC_W*0.3, "y":-130, param:2 },
    { "name": "Hornet", "x":SC_W*0.4, "y":-120, param:2 },
],
"Hornet2-right": [
    { "name": "Hornet", "x":SC_W*0.6, "y":-100, param:2 },
    { "name": "Hornet", "x":SC_W*0.7, "y":-120, param:2 },
    { "name": "Hornet", "x":SC_W*0.8, "y":-130, param:2 },
    { "name": "Hornet", "x":SC_W*0.9, "y":-120, param:2 },
],

/*
 * 突撃ヘリ「ホーネット」（パターン３）
 */
"Hornet3-left": [
    { "name": "Hornet", "x":SC_W*0.1, "y":-100, param:3 },
    { "name": "Hornet", "x":SC_W*0.2, "y":-120, param:3 },
    { "name": "Hornet", "x":SC_W*0.3, "y":-130, param:3 },
    { "name": "Hornet", "x":SC_W*0.4, "y":-120, param:3 },
],
"Hornet3-right": [
    { "name": "Hornet", "x":SC_W*0.6, "y":-100, param:3 },
    { "name": "Hornet", "x":SC_W*0.7, "y":-120, param:3 },
    { "name": "Hornet", "x":SC_W*0.8, "y":-130, param:3 },
    { "name": "Hornet", "x":SC_W*0.9, "y":-120, param:3 },
],
"Hornet3-center": [
    { "name": "Hornet", "x":SC_W*0.25, "y":-160, param:3 },
    { "name": "Hornet", "x":SC_W*0.35, "y":-120, param:3 },
    { "name": "Hornet", "x":SC_W*0.40, "y":-100, param:3 },
    { "name": "Hornet", "x":SC_W*0.50, "y":-110, param:3 },
    { "name": "Hornet", "x":SC_W*0.70, "y":-130, param:3 },
    { "name": "Hornet", "x":SC_W*0.85, "y":-120, param:3 },
],

/*
 *  中型攻撃ヘリ「ジガバチ」
 */
"MudDauber-left": [
    { "name": "MudDauber", "x":-SC_W*0.2, "y":SC_H*0.4 },
],

"MudDauber-right": [
    { "name": "MudDauber", "x": SC_W*1.2, "y":SC_H*0.4 },
],

/*
 *  中型爆撃機「ビッグウィング」
 */
"BigWing-left": [
    { "name": "BigWing", "x":SC_W*0.2, "y":-SC_H*0.1 },
],

"BigWing-right": [
    { "name": "BigWing", "x":SC_W*0.8, "y":-SC_H*0.1 },
],

/*
 *  飛空艇「モーンブレイド」
 */
"MournBlade-left": [
    { "name": "MournBlade", "x": SC_W*0.9, "y":-SC_H*0.2 },
],

"MournBlade-left": [
    { "name": "MournBlade", "x":-SC_W*0.1, "y":-SC_H*0.2 },
],

/*
 *  中型戦車「フラガラッハ」
 */
"Fragarach-center": [
    { "name": "Fragarach", "x": SC_W*0.3, "y":-SC_H*0.1, param:"c" },
    { "name": "Fragarach", "x": SC_W*0.3, "y":-SC_H*0.2, param:"c" },
    { "name": "Fragarach", "x": SC_W*0.3, "y":-SC_H*0.3, param:"c" },
    { "name": "Fragarach", "x": SC_W*0.3, "y":-SC_H*0.4, param:"c" },

    { "name": "Fragarach", "x": SC_W*0.5, "y":-SC_H*0.35, param:"c" },
    { "name": "Fragarach", "x": SC_W*0.5, "y":-SC_H*0.25, param:"c" },
    { "name": "Fragarach", "x": SC_W*0.5, "y":-SC_H*0.45, param:"c" },

    { "name": "Fragarach", "x": SC_W*0.7, "y":-SC_H*0.1, param:"c" },
    { "name": "Fragarach", "x": SC_W*0.7, "y":-SC_H*0.2, param:"c" },
    { "name": "Fragarach", "x": SC_W*0.7, "y":-SC_H*0.3, param:"c" },
    { "name": "Fragarach", "x": SC_W*0.7, "y":-SC_H*0.4, param:"c" },
],
"Fragarach-left": [
    { "name": "Fragarach", "x":-SC_W*0.1, "y": SC_H*0.1, param:"l" },
    { "name": "Fragarach", "x":-SC_W*0.1, "y": SC_H*0.2, param:"l" },
    { "name": "Fragarach", "x":-SC_W*0.2, "y": SC_H*0.3, param:"l" },
    { "name": "Fragarach", "x":-SC_W*0.2, "y": SC_H*0.4, param:"l" },
],
"Fragarach-right": [
    { "name": "Fragarach", "x": SC_W*1.1, "y": SC_H*0.1, param:"r" },
    { "name": "Fragarach", "x": SC_W*1.1, "y": SC_H*0.2, param:"r" },
    { "name": "Fragarach", "x": SC_W*1.2, "y": SC_H*0.3, param:"r" },
    { "name": "Fragarach", "x": SC_W*1.2, "y": SC_H*0.4, param:"r" },
],

/*
 *  中型輸送機「トイボックス」
 */
//パワーアップ
"ToyBox-p-left": [
    { "name": "ToyBox", "x":SC_W*0.2, "y":-SC_H*0.3, param:"power" },
],
"ToyBox-p-center": [
    { "name": "ToyBox", "x":SC_W*0.5, "y":-SC_H*0.3, param:"power" },
],
"ToyBox-p-right": [
    { "name": "ToyBox", "x":SC_W*0.8, "y":-SC_H*0.3, param:"power" },
],
//ボム
"ToyBox-b-left": [
    { "name": "ToyBox", "x":SC_W*0.2, "y":-SC_H*0.3, param:"bomb" },
],
"ToyBox-b-center": [
    { "name": "ToyBox", "x":SC_W*0.5, "y":-SC_H*0.3, param:"bomb" },
],
"ToyBox-b-right": [
    { "name": "ToyBox", "x":SC_W*0.8, "y":-SC_H*0.3, param:"bomb" },
],

/*
 *
 *  １面中ボス
 *  装甲輸送列車「トールハンマー」
 *
 */
"ThorHammer": [
    { "name": "ThorHammer", "x":SC_W*0.5, "y": SC_H*1.3 },
],







}

})();
