/*

	PlanetBuster2
	Stage 3 Data
	2012/10/16
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
var stageData3 = "1____ 2____ 12S__ 4____ 6____ 3____ A1___ B2___ S____ 12___"+
				 "R4___ AB___ B6___ T____ W____ _____ X____ _____ _____ V____"+

				 "S____ 12___ 6____ T9___ 3____ 0____ C____ SE___ 12___ Y____"+
				 "U6___ A1___ B2___ RE___ 30___ 12A__ 6B___ 90E__ 4S___ 3C___"+
				 "12D__ 4T___ _____ W____ _____ Z____";
stageData3 = stageData3.replace(/ /g, "");	//空白を削除

//////////////////////////////////////////////////////////////////////////////
//敵出現パターンテーブル
//name		敵名称
//x,y		出現位置
//rx,ry		出現位置ランダム範囲
//offset	出現フレームオフセット（単位は秒）
//option	出現パターン設定用関数（省略可）
//////////////////////////////////////////////////////////////////////////////
var patterns3 = {
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
	{name: 'Attacker2', x: 360, y: 0,rx: 0, ry: 0, offset: 0.0},
	{name: 'Attacker2', x: 360, y: 0,rx: 0, ry: 0, offset: 0.2},
	{name: 'Attacker2', x: 360, y: 0,rx: 0, ry: 0, offset: 0.4},
	{name: 'Attacker2', x: 360, y: 0,rx: 0, ry: 0, offset: 0.6},
],

4:[
	{name: 'Attacker3', x:  40, y: -32, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Attacker3', x:  90, y: -32, rx: 0, ry: 0, offset: 0.5 },
	{name: 'Attacker3', x: 140, y: -32, rx: 0, ry: 0, offset: 1.0 },
	{name: 'Attacker3', x: 190, y: -32, rx: 0, ry: 0, offset: 1.0 },
	{name: 'Attacker3', x: 240, y: -32, rx: 0, ry: 0, offset: 0.5 },
	{name: 'Attacker3', x: 290, y: -32, rx: 0, ry: 0, offset: 0.0 },
],

5:[
],

6:[
	{name: 'Fighter1', x:  0, y: -32, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Fighter1', x:  0, y: -32, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Fighter1', x:  0, y: -32, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Fighter1', x:160, y: -32, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Fighter1', x:160, y: -32, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Fighter1', x:160, y: -32, rx: 0, ry: 0, offset: 0.0 },

	{name: 'Fighter1', x:  0, y: -32, rx: 0, ry: 0, offset: 0.5 },
	{name: 'Fighter1', x:  0, y: -32, rx: 0, ry: 0, offset: 0.5 },
	{name: 'Fighter1', x:  0, y: -32, rx: 0, ry: 0, offset: 0.5 },
	{name: 'Fighter1', x:160, y: -32, rx: 0, ry: 0, offset: 0.5 },
	{name: 'Fighter1', x:160, y: -32, rx: 0, ry: 0, offset: 0.5 },
	{name: 'Fighter1', x:160, y: -32, rx: 0, ry: 0, offset: 0.5 },

	{name: 'Fighter1', x:  0, y: -32, rx: 0, ry: 0, offset: 1.0 },
	{name: 'Fighter1', x:  0, y: -32, rx: 0, ry: 0, offset: 1.0 },
	{name: 'Fighter1', x:  0, y: -32, rx: 0, ry: 0, offset: 1.0 },
	{name: 'Fighter1', x:160, y: -32, rx: 0, ry: 0, offset: 1.0 },
	{name: 'Fighter1', x:160, y: -32, rx: 0, ry: 0, offset: 1.0 },
	{name: 'Fighter1', x:160, y: -32, rx: 0, ry: 0, offset: 1.0 },

	{name: 'Fighter1', x:  0, y: -32, rx: 0, ry: 0, offset: 1.5 },
	{name: 'Fighter1', x:  0, y: -32, rx: 0, ry: 0, offset: 1.5 },
	{name: 'Fighter1', x:  0, y: -32, rx: 0, ry: 0, offset: 1.5 },
	{name: 'Fighter1', x:160, y: -32, rx: 0, ry: 0, offset: 1.5 },
	{name: 'Fighter1', x:160, y: -32, rx: 0, ry: 0, offset: 1.5 },
	{name: 'Fighter1', x:160, y: -32, rx: 0, ry: 0, offset: 1.5 },
],

7:[
],

8:[
	{name: 'Fighter2', x:  -40, y:  40, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Fighter2', x:  -40, y: 100, rx: 0, ry: 0, offset: 1.0 },
	{name: 'Fighter2', x:  -40, y: 120, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Fighter2', x:  360, y:  70, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Fighter2', x:  360, y: 130, rx: 0, ry: 0, offset: 1.0 },
	{name: 'Fighter2', x:  360, y: 180, rx: 0, ry: 0, offset: 0.0 },
],

9:[
	{name: 'Bomb1', x:   0, y: -32, rx: 0, ry: 0, offset: 0.0 },
],

0:[
	{name: 'Bomb1', x:   0, y: -32, rx: 0, ry: 0, offset: 0.0 },
],

A:[
	{name: 'BigWing', x: 100, y: -50,rx: 0, ry: 0, offset: 0.0},
],
B:[
	{name: 'BigWing', x: 200, y:-100,rx: 0, ry: 0, offset: 0.0},
],
C:[
	{name: 'Delta', x: 200, y: -60,rx: 0, ry: 0, offset: 0.0},
	{name: 'Delta', x:  50, y:-100,rx: 0, ry: 0, offset: 0.0},
],
D:[
	{name: 'Delta', x: 200, y: -80,rx: 0, ry: 0, offset: 0.0},
	{name: 'Delta', x:  50, y:-120,rx: 0, ry: 0, offset: 0.0},
],
E:[
	{name: 'Bit1', x:   0, y: -32, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Bit1', x:   0, y: -32, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Bit1', x: 160, y: -32, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Bit1', x: 160, y: -32, rx: 0, ry: 0, offset: 0.0 },
	{name: 'Bit1', x:   0, y: -32, rx: 0, ry: 0, offset: 1.0 },
	{name: 'Bit1', x:   0, y: -32, rx: 0, ry: 0, offset: 1.0 },
	{name: 'Bit1', x: 160, y: -32, rx: 0, ry: 0, offset: 1.0 },
	{name: 'Bit1', x: 160, y: -32, rx: 0, ry: 0, offset: 1.0 },
],
F:[
],
G:[
],
H:[
],
I:[
],
J:[
],
K:[
],
L:[
],
M:[
],
N:[
],
O:[
],
P:[
],
Q:[
],

//ボス
X:[
{name: 'GateKeeper', x: 0, y: 0,rx: 0, ry: 0, offset: 0.0},
],
Y:[
{name: 'Gurdian', x: 0, y: 0,rx: 0, ry: 0, offset: 0.0},
],
Z:[
{name: 'Goriate', x: 0, y: 0,rx: 0, ry: 0, offset: 0.0},
],

}
