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
ENEMY_MBOSS_SKY = 2;
ENEMY_MBOSS_GROUND = 3;
ENEMY_SBOSS_SKY = 4;
ENEMY_SBOSS_GROUND = 5;

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
    imagename: 'SkyFish',
    width: 32,
    height: 32,
    colx: -16,  //当たり判定始点
    coly: -16,
    colw: 32,   //当たり判定サイズ
    colh: 32,
    def: 30,    //耐久力
    point: 300, //ポイント
    burn: 0,    //爆発パターン
    layer: LAYER_OBJECT,   //表示レイヤー番号
    type: ENEMY_NORMAL_SKY, //敵タイプ
    //投入時セットアップ
    setup: function() {
        //ローター追加
        this.roter = pb3.effects.enter('roter1', this.x, this.y, 0, 0);

        //行動パターン
        var self = this;
        this.tweener.
        to({ x: this.x, y: this.y + 160 }, 1000, "easeOutQuint").
        wait(1500).
        to({ x: this.x, y: -64 }, 1500).
        call(function(){
            self.remove();
        });
        this._attack = pb3.bulletPattern['SkyFish'];
    },
    //アルゴリズム
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
//        this._attack();
    },
    dead: function() {
        var vx = this.x-this.beforeX, vy = this.y-this.beforeY;
        pb3.effects.enter("explode1", this.x, this.y, vx, vy);
    },
    release: function() {
        this.roter.remove();
        delete this.roter;
        delete this._attack;
    },
};

/*
 *  攻撃ヘリ（突撃）
 *  SkyFish2
 */
pb3.EnemySpec['SkyFish2'] = {
    imagename: 'SkyFish',
    width: 32,
    height: 32,
    colx: -16,  //当たり判定始点
    coly: -16,
    colw: 32,   //当たり判定サイズ
    colh: 32,
    def: 300,    //耐久力
    point: 300, //ポイント
    burn: 0,    //爆発パターン
    layer: LAYER_OBJECT,   //レイヤー番号
    type: ENEMY_NORMAL_SKY,
    setup: function() {
        //ローター追加
        this.roter = pb3.effects.enter('roter1', this.x, this.y, 0, 0);

        var pl = pb3.player;
        var d = Math.sqrt((pl.x-this.x)*(pl.x-this.x) + (pl.y-this.y)*(pl.y-this.y));
        this.vx = (pl.x-this.x)/d*3;
        this.vy = (pl.y-this.y)/d*3;
    },
    algorithm: function() {
        this.x += this.vx;
        this.y += this.vy;
        this.roter.x = this.x;
        this.roter.y = this.y;

        //自機の方向を向く
        var ax = this.x - pb3.player.x;
        var ay = this.y - pb3.player.y;
        var rad = Math.atan2(ay, ax);
        var deg = ~~(rad * toDeg);
        this.rotation = deg + 90;
    },
    attack: function() {
    },
    release: function() {
        this.roter.remove();
        delete this.roter;
    },
};
