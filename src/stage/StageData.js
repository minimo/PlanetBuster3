/*
 *  PlanetBuster3
 *  stagedata.js
 *  ステージデータ
 *  2013/07/29
 *  @auther minimo
 *  This Program is MIT license.
 */


//////////////////////////////////////////////////////////////////////////////
//イベントテーブル
//５バイトで１グループ（後２バイトは高難易度用）
//１グループ３秒間隔で進行
//
//特殊フラグ
// R:ビット
// S:パワーアップ
// T:ボム
// U:１ＵＰ
// V:ステージフェーズ進行
// W:ワーニング表示
// X:中ボス１
// Y:中ボス２
// Z:ステージボス
//////////////////////////////////////////////////////////////////////////////
//                --1-- --2-- --3-- --4-- --5-- --6-- --7-- --8-- --9-- --10-
var stageData1 = "1____ _____ _____ _____ _____ _____ _____ _____ _____ _____ "+
                 "_____ _____ _____ _____ _____ _____ _____ _____ _____ _____ ";

stageData1 = stageData1.replace(/ /g, "");	//空白を削除

//////////////////////////////////////////////////////////////////////////////
//敵出現パターンテーブル
//name		敵名称
//x,y		出現位置
//rx,ry		出現位置ランダム範囲
//delay	    出現フレームオフセット（単位:フレーム）
//option	出現パターン設定用関数（省略可）
//////////////////////////////////////////////////////////////////////////////
var stagePattern1 = {
_: [{name: 'nop'}],

1:[
	{name: 'SkyFish', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
],
2:[
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
	{name: 'SkyFish2', x: rand(260)+30, y: -rand(64)-64,rx: 0, ry: 0, delay: rand(60)},
],
//ボス
X:[
{name: 'ThorHammer', x: 0, y: 0,rx: 0, ry: 0, offset: 0.0},
],
Z:[
{name: 'Garuda', x: 0, y: 0,rx: 0, ry: 0, offset: 0.0},
],

}

/*
//アイテムキャリア
I:[
	{name: 'Carrier', x: rand(120)+100, y: -100,rx: 0, ry: 0, offset: 0.0},
],
*/
