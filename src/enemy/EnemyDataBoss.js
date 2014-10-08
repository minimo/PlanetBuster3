/*
 *  EnemyDataBoss.js
 *  2014/10/07
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

pb3.enemyData = pb3.enemyData || [];

/*
 *
 *  １面中ボス
 *  装甲輸送列車「トールハンマー」
 *
 */
pb3.enemyData['ThorHammer'] = {
    //使用弾幕パターン
    bulletPattern: "Hornet",

    //当り判定サイズ
    width:  98,
    height: 196,

    //耐久力
    def: 1000,

    //得点
    point: 10000,

    //表示レイヤー番号
    layer: LAYER_OBJECT_LOWER,

    //敵タイプ
    type: ENEMY_MBOSS,

    //爆発タイプ
    explodeType: EXPLODE_MBOSS,

    //機体用テクスチャ情報
    texName: "boss1",
    texWidth: 32,
    texHeight: 32,
    texIndex: 0,

    setup: function(enterParam) {
        this.phase = 0;
    },

    algorithm: function() {
    },
};

/*
 *
 *  １面ボス
 *  局地制圧型巨大戦車「ゴリアテ」
 *
 */

/*
 *
 *  ２面中ボス
 *  大型爆撃機「レイブンブランド」
 *
 */

/*
 *
 *  ２面ボス
 *  空中空母「ストームブリンガー」
 *
 */


/*
 *
 *  ３面中ボス  
 *
 */

/*
 *
 *  ３面ボス
 *  大型超高高度爆撃機「ガルーダ」
 *
 */

/*
 *
 *  ４面中ボス
 *
 */

/*
 *
 *  ４面ボス
 *
 */

})();

