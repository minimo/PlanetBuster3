/*
 *  PlanetBuster3
 *  EnemyData.js
 *  敵データ
 *  2013/08/02
 *  @auther minimo
 *  This Program is MIT license.
 */
 
//////////////////////////////////////////////////////////////////////////////
//敵データ
//file			画像ファイル
//width,heigh	画像サイズ
//colx,coly		当たり判定位置
//colw,colh		当たり判定サイズ
//point			得点
//def			耐久力
//burn			破壊パターン	0:小 1:中 2:大 3:以上:爆発エフェクト数
//type			敵タイプ		0:アイテム 1:小型 2:中型１ 3:中型２ 4:大型 5:中ボス 6:ステージボス
//ground		地上物フラグ	ture or false
//layer			追加対象レイヤ	0-2　0が一番下となる undefined時は1
//////////////////////////////////////////////////////////////////////////////
var enemyData = {
'SkyFish':		{file: 'SkyFish',	w: 64, h: 32, colx:  0, coly:  0, colw: 64, colh: 32, point:  300, def:  30, burn: 0, type: 1 },
};

