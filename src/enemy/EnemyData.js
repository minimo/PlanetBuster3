/*
 *  EnemyData.js
 *  2014/08/02
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {
pb3.enemyData = [];

//攻撃ヘリ（通常）
pb3.enemyData['SkyFish1'] = {
    //使用弾幕パターン
    bulletPattern: "SkyFish1",

    //当り判定サイズ
    width:  16,
    height: 16,

    //耐久力
    def: 30,

    //得点
    point: 300,

    //表示レイヤー番号
    layer: LAYER_OBJECT,

    //敵タイプ
    type: ENEMY_SMALL,

    //爆発タイプ
    explodeType: EXPLODE_SMALL,

    //機体用テクスチャ情報
    texName: "tex1",
    texWidth: 32,
    texHeight: 32,
    texIndex: 0,

    setup: function() {
        this.roter = tm.display.Sprite("tex1", 32, 32).addChildTo(this);
        this.roter.setFrameIndex(32);
        this.roter.index = 32;

        this.tweener.moveBy(0, 300, 2000, "easeOutQuart").wait(1000).moveBy(0, -300, 2000).call(function(){this.remove();}.bind(this));
    },

    algorithm: function() {
        this.lookAt();
        if (this.time % 2 == 0) {
            this.roter.index = (this.roter.index+1)%4+32;
            this.roter.setFrameIndex(this.roter.index);
        }
    },
};

//攻撃ヘリタイプ（突撃）
pb3.enemyData['SkyFish2'] = {
    //使用弾幕パターン
    bulletPattern: "SkyFish2",

    //当り判定サイズ
    width:  16,
    height: 16,

    //耐久力
    def: 30,

    //得点
    point: 300,

    //表示レイヤー番号
    layer: LAYER_OBJECT,

    //敵タイプ
    type: ENEMY_SMALL,

    //爆発タイプ
    explodeType: EXPLODE_SMALL,

    //機体用テクスチャ情報
    texName: "tex1",
    texWidth: 32,
    texHeight: 32,
    texIndex: 0,

    setup: function() {
        this.roter = tm.display.Sprite("tex1", 32, 32).addChildTo(this);
        this.roter.setFrameIndex(32);
        this.roter.index = 32;

        this.moveTo(app.player, 5, true);
    },

    algorithm: function() {
        if (this.time % 2 == 0) {
            this.roter.index = (this.roter.index+1)%4+32;
            this.roter.setFrameIndex(this.roter.index);
        }

        this.x += this.vx;
        this.y += this.vy;
    },
};

//中型機
pb3.enemyData['BigWing'] = {
    //使用弾幕パターン
    bulletPattern: "BigWing",

    //当り判定サイズ
    width:  128,
    height: 20,

    //耐久力
    def: 800,

    //得点
    point: 3000,

    //表示レイヤー番号
    layer: LAYER_OBJECT,

    //敵タイプ
    type: ENEMY_MIDDLE,

    //爆発タイプ
    explodeType: EXPLODE_MIDDLE,

    //機体用テクスチャ情報
    texName: "tex1",
    texWidth: 128,
    texHeight: 48,
    texIndex: 2,

    setup: function() {
        this.index = 0;
    },

    algorithm: function() {
        if (this.time % 2 == 0) this.y++;
        if (this.time % 10 == 0) {
            this.index = (this.index+1)%2+2;
            this.body.setFrameIndex(this.index);
        }
    },
};

//アイテムキャリア
pb3.enemyData['ToyBox'] = {
    //使用弾幕パターン
    bulletPattern: "ToyBox",

    //当り判定サイズ
    width:  40,
    height: 100,

    //耐久力
    def: 500,

    //得点
    point: 5000,

    //表示レイヤー番号
    layer: LAYER_OBJECT,

    //敵タイプ
    type: ENEMY_SMALL,

    //爆発タイプ
    explodeType: EXPLODE_LARGE,

    //機体用テクスチャ情報
    texName: "tex1",
    texWidth: 64,
    texHeight: 128,
    texIndex: 2,

    setup: function() {
        this.tweener.clear().moveBy(0, GS_H*0.5, 5000).wait(8000).moveBy(0, -GS_H, 10000);
    },

    algorithm: function() {
    },
}

})();
