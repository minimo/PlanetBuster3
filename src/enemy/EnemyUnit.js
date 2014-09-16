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
 * 突撃ヘリ
 */
"SkyFish1-left": [
    { "name": "SkyFish1", "x":GS_W*0.1, "y":-150 },
    { "name": "SkyFish1", "x":GS_W*0.2, "y":-120 },
    { "name": "SkyFish1", "x":GS_W*0.3, "y":-130 },
    { "name": "SkyFish1", "x":GS_W*0.4, "y":-120 },
],

"SkyFish1-right": [
    { "name": "SkyFish1", "x":GS_W*0.6, "y":-110 },
    { "name": "SkyFish1", "x":GS_W*0.7, "y":-120 },
    { "name": "SkyFish1", "x":GS_W*0.8, "y":-100 },
    { "name": "SkyFish1", "x":GS_W*0.9, "y":-150 },
],

"SkyFish1-center": [
    { "name": "SkyFish1", "x":GS_W*0.25, "y":-160 },
    { "name": "SkyFish1", "x":GS_W*0.35, "y":-120 },
    { "name": "SkyFish1", "x":GS_W*0.40, "y":-100 },
    { "name": "SkyFish1", "x":GS_W*0.50, "y":-110 },
    { "name": "SkyFish1", "x":GS_W*0.70, "y":-130 },
    { "name": "SkyFish1", "x":GS_W*0.85, "y":-120 },
],

/*
 * 突撃ヘリ２
 */
"SkyFish2-left": [
    { "name": "SkyFish2", "x":GS_W*0.1, "y":-100 },
    { "name": "SkyFish2", "x":GS_W*0.2, "y":-120 },
    { "name": "SkyFish2", "x":GS_W*0.3, "y":-130 },
    { "name": "SkyFish2", "x":GS_W*0.4, "y":-120 },
],

"SkyFish2-right": [
    { "name": "SkyFish2", "x":GS_W*0.6, "y":-100 },
    { "name": "SkyFish2", "x":GS_W*0.7, "y":-120 },
    { "name": "SkyFish2", "x":GS_W*0.8, "y":-130 },
    { "name": "SkyFish2", "x":GS_W*0.9, "y":-120 },
],

/*
 * 中型機
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
"ToyBox-left": [
    { "name": "ToyBox", "x":GS_W*0.2, "y":-GS_H*0.3 },
],
"ToyBox-center": [
    { "name": "ToyBox", "x":GS_W*0.5, "y":-GS_H*0.3 },
],
"ToyBox-right": [
    { "name": "ToyBox", "x":GS_W*0.8, "y":-GS_H*0.3 },
],

//ステージ１中ボス「トールハンマー」
"ThorHammer": [
    { "name": "ThorHammer", "x":GS_W*0.5, "y":-100 },
],

//ステージ１ボス　局地制圧用大型戦車「トール」
"Thor": [
    { "name": "Thor", "x":GS_W*0.5, "y":-GS_H*0.2 },
],


}

})();
