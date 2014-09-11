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
 * 突撃ヘリ２
 */
"BigWing-left": [
    { "name": "square1", "x":GS_W*0.2, "y":-100 },
],

"BigWing-right": [
    { "name": "square1", "x":GS_W*0.8, "y":-100 },
],


/*
 * 突撃ヘリ２
 */
"square1-left": [
    { "name": "square1", "x":GS_W*0.2, "y":-100 },
],

"square1-right": [
    { "name": "square1", "x":GS_W*0.8, "y":-100 },
],

"triangle1-left": [
    { "name": "triangle1", "x":GS_W*0.1, "y":-GS_H*0.10, "param":"a" },
    { "name": "triangle1", "x":GS_W*0.2, "y":-GS_H*0.15, "param":"a" },
    { "name": "triangle1", "x":GS_W*0.3, "y":-GS_H*0.20, "param":"a" },
    { "name": "triangle1", "x":GS_W*0.4, "y":-GS_H*0.25, "param":"a" },
],

"triangle1-right": [
    { "name": "triangle1", "x":GS_W*0.9, "y":-GS_H*0.10, "param":"b" },
    { "name": "triangle1", "x":GS_W*0.8, "y":-GS_H*0.15, "param":"b" },
    { "name": "triangle1", "x":GS_W*0.7, "y":-GS_H*0.20, "param":"b" },
    { "name": "triangle1", "x":GS_W*0.6, "y":-GS_H*0.25, "param":"b" },
],

"triangle1-center": [
    { "name": "triangle1", "x":GS_W*0.3, "y":-GS_H*0.1, "param":"a" },
    { "name": "triangle1", "x":GS_W*0.4, "y":-GS_H*0.2, "param":"a" },
    { "name": "triangle1", "x":GS_W*0.6, "y":-GS_H*0.2, "param":"b" },
    { "name": "triangle1", "x":GS_W*0.7, "y":-GS_H*0.1, "param":"b" },
],

"triangle2-left": [
    { "name": "triangle2", "x":GS_W*0.2, "y":GS_H*-0.3 },
],

"triangle2-right": [
    { "name": "triangle2", "x":GS_W*0.8, "y":GS_H*-0.3 },
],

"mboss1": [
    { "name": "", "x":GS_W*0.5, "y":-100 },
],

//ステージ１ボス「四畳半」
"boss1": [
    { "name": "yojouhan-a", "x":GS_W*0.5, "y":-GS_H*0.2 },
],

}

})();
