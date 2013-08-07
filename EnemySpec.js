/*
 *  PlanetBuster3
 *  EnemySpec.js
 *  敵情報管理
 *  2013/07/09
 *  @auther minimo
 *  This Program is MIT license.
 */

//敵タイプ定数
ENEMY_NORMAL_SKY = 0;
ENEMY_NORMAL_GROUND = 1;
ENEMY_BOSS_SKY = 2;
ENEMY_BOSS_GROUND = 3;

//敵情報保持配列
pb3.EnemySpec = [];

//////////////////////////////////////////////////////////////////////////////
//敵データ
//file          画像ファイル
//width,heigh   画像サイズ
//colx,coly     当たり判定位置
//colw,colh     当たり判定サイズ
//point         得点
//def           耐久力
//burn          破壊パターン  0:小 1:中 2:大 3:以上:爆発エフェクト数
//type          敵タイプ        0:アイテム 1:小型 2:中型１ 3:中型２ 4:大型 5:中ボス 6:ステージボス
//layer         追加対象レイヤ 0-2　0が一番下となる undefined時は1
//////////////////////////////////////////////////////////////////////////////

/*
 *  攻撃ヘリ
 *  SkyFish
 */
pb3.EnemySpec['SkyFish'] = {
    name: 'SkyFish',
    width: 32,
    height: 32,
    colx: 0,
    coly: 0,
    colw: 32,
    colh: 32,
    point: 300,
    def: 30,
    burn: 0,
    layer: 1,
    type: ENEMY_NORMAL_SKY,
    setup: function() {
        this.roter = pb3.effects.enter('roter1', this.x, this.y, 0, 0);
        var self = this;
        this.tweener.
        to({ x: this.x, y: this.y + 160 }, 1000, "easeOutQuint").
        to({ x: this.x, y: -64 }, 1500).
        call(function(){
            self.remove();
        });
    },
    algorithm: function() {
        //自機の方向を向く
        var ax = this.x - pb3.player.x;
        var ay = this.y - pb3.player.y;
        var rad = Math.atan2(ay, ax);
        var deg = ~~(rad * toDeg);
        this.rotation = deg + 90;
        
        this.roter.x = this.x;
        this.roter.y = this.y;
    },
    attack: function() {
    },
    dead: function() {
    },
    release: function() {
        this.roter.remove();
        delete this.roter;
    },
};
