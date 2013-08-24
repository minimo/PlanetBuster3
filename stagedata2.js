/*

	PlanetBuster2
	Stage 2 Data
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
var stageData2 = "1____ 2____ S____ 12___ 5B___ 6____ E____ 3____ 4____ 34___ "+
				 "4C___ HR___ E____ 1____ X____ _____ FS___ 3____ 4B___ G____ "+
				 "A5___ BS___ E12__ _____ 5T___ _____ W____ _____ Z____";
stageData2 = stageData2.replace(/ /g, "");	//空白を削除

//////////////////////////////////////////////////////////////////////////////
//敵出現パターンテーブル
//name		敵名称
//x,y		出現位置
//rx,ry		出現位置ランダム範囲
//offset	出現フレームオフセット（単位は秒）
//option	出現パターン設定用関数（省略可）
//////////////////////////////////////////////////////////////////////////////
var patterns2 = {
_: [{name: 'nop'}],

1:[
	{name: 'Attacker1', x: -40, y: 0,rx: 0, ry: 0, offset: 0.0},
	{name: 'Attacker1', x: -40, y: 0,rx: 0, ry: 0, offset: 0.2},
	{name: 'Attacker1', x: -40, y: 0,rx: 0, ry: 0, offset: 0.4},
	{name: 'Attacker1', x: -40, y: 0,rx: 0, ry: 0, offset: 0.6},
],
2:[
	{name: 'Attacker1', x: 360, y: 0,rx: 0, ry: 0, offset: 0.0},
	{name: 'Attacker1', x: 360, y: 0,rx: 0, ry: 0, offset: 0.2},
	{name: 'Attacker1', x: 360, y: 0,rx: 0, ry: 0, offset: 0.4},
	{name: 'Attacker1', x: 360, y: 0,rx: 0, ry: 0, offset: 0.6},
],
3:[
	{name: 'Attacker2', x: -40, y: 0,rx: 0, ry: 0, offset: 0.0},
	{name: 'Attacker2', x: -40, y: 0,rx: 0, ry: 0, offset: 0.2},
	{name: 'Attacker2', x: -40, y: 0,rx: 0, ry: 0, offset: 0.4},
	{name: 'Attacker2', x: -40, y: 0,rx: 0, ry: 0, offset: 0.6},
],
4:[
	{name: 'Attacker2', x: 360, y: 0,rx: 0, ry: 0, offset: 0.0},
	{name: 'Attacker2', x: 360, y: 0,rx: 0, ry: 0, offset: 0.2},
	{name: 'Attacker2', x: 360, y: 0,rx: 0, ry: 0, offset: 0.4},
	{name: 'Attacker2', x: 360, y: 0,rx: 0, ry: 0, offset: 0.6},
],

5:[
	{name: 'SkyFish1', x: rand(160), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160), y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160)+160, y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160)+160, y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160)+160, y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160)+160, y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish1', x: rand(160)+160, y: -rand(32)-32,rx: 0, ry: 0, offset: rand(20)/10},
],

6:[
	{name: 'SkyFish2', x: rand(160), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160), y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160)+160, y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160)+160, y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160)+160, y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160)+160, y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
	{name: 'SkyFish2', x: rand(160)+160, y: -rand(40)-32,rx: 0, ry: 0, offset: rand(20)/10},
],

A:[
	{name: 'SkyCanon', x: 120, y:-50,rx: 0, ry: 0, offset: 0.0},
],
B:[
	{name: 'SkyCanon', x: 200, y:-50,rx: 0, ry: 0, offset: 0.0},
],

C:[
	{name: 'SkyBlade', x: -50, y:110,rx: 0, ry: 0, offset: 0.0},
],
D:[
	{name: 'SkyBlade', x: 370, y: 20,rx: 0, ry: 0, offset: 0.0},
],

E:[
	{name: 'BigWing', x: 100, y: -50,rx: 0, ry: 0, offset: 0.0},
],
F:[
	{name: 'BigWing', x: 200, y:-100,rx: 0, ry: 0, offset: 0.0},
],
G:[
	{name: 'Delta', x: 200, y: -60,rx: 0, ry: 0, offset: 0.0},
	{name: 'Delta', x:  50, y:-100,rx: 0, ry: 0, offset: 0.0},
],
H:[
	{name: 'Delta', x: 200, y: -80,rx: 0, ry: 0, offset: 0.0},
	{name: 'Delta', x:  50, y:-120,rx: 0, ry: 0, offset: 0.0},
],



//ボス
X:[
{name: 'MotherCrow', x: 0, y: 0,rx: 0, ry: 0, offset: 0.0},
],
Z:[
{name: 'SkyBreaker', x: 0, y: 0,rx: 0, ry: 0, offset: 0.0},
],

}
