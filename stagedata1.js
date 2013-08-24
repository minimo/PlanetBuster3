/*

	PlanetBuster2
	Stage 1 Data
	2012/07/02
	This program is MIT lisence.

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
// V:ステージフェーズ切替
// W:ワーニング表示
// X:中ボス１
// Y:中ボス２
// Z:ステージボス
//////////////////////////////////////////////////////////////////////////////
//                --1-- --2-- --3-- --4-- --5-- --6-- --7-- --8-- --9-- --10-
var stageData1 = "1____ 1____ 2S___ 2____ 5____ 1R___ 6____ 2____ V____ X____ "+
				 "_____ 3S___ 7____ 51___ 8T___ 62V__ 3____ W____ _____ Z____ ";
stageData1 = stageData1.replace(/ /g, "");	//空白を削除

//////////////////////////////////////////////////////////////////////////////
//敵出現パターンテーブル
//name		敵名称
//x,y		出現位置
//rx,ry		出現位置ランダム範囲
//offset	出現フレームオフセット（単位は秒）
//option	出現パターン設定用関数（省略可）
//////////////////////////////////////////////////////////////////////////////
var patterns1 = {
_: [{name: 'nop'}],

1:[
	{name: 'SkyFish1', x: rand(320), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(320), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(320), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(320), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(320), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(320), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
/*
	{name: 'SkyFish1', x: 150, y: -20,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish1', x:  80, y: -18,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish1', x: 100, y: -16,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish1', x:  40, y: -30,rx: 0, ry: 0, offset: 0.0},
*/
],
2:[
	{name: 'SkyFish2', x: rand(320), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(320), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(320), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(320), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(320), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(320), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
],

3:[
	{name: 'SkyFish1', x: rand(160), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160)+160, y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160)+160, y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160)+160, y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
/*
	{name: 'SkyFish1', x: 240, y: -32,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish1', x: 160, y: -20,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish1', x: 280, y: -16,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish1', x: 180, y: -30,rx: 0, ry: 0, offset: 0.0},
*/
],

4:[
	{name: 'SkyFish2', x: rand(160), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160)+160, y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160)+160, y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160)+160, y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},

/*
	{name: 'SkyFish2', x:  30, y: -32,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish2', x:  80, y: -48,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish2', x: 110, y: -32,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish2', x: 150, y: -48,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish2', x: 180, y: -32,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish2', x: 210, y: -48,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish2', x: 230, y: -32,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyFish2', x: 290, y: -48,rx: 0, ry: 0, offset: 0.0},
*/
],

5:[
	{name: 'SkyCanon', x: 120, y:-50,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyCanon', x: 200, y:-50,rx: 0, ry: 0, offset: 2.0},
],
6:[
	{name: 'SkyCanon', x: 200, y:-50,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyCanon', x: 120, y:-50,rx: 0, ry: 0, offset: 2.0},
],

7:[
	{name: 'SkyBlade', x: -60, y: 50,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyBlade', x:-100, y:110,rx: 0, ry: 0, offset: 2.0},
],

8:[
	{name: 'SkyBlade', x: 340, y: 20,rx: 0, ry: 0, offset: 0.0},
	{name: 'SkyBlade', x: 380, y:120,rx: 0, ry: 0, offset: 0.0},
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
