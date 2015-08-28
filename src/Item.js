/*
 *  Item.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

//アイテム
tm.define("pb3.Item", {
    superClass: "tm.display.Sprite",
    layer: LAYER_PLAYER,

    //アイテム種類
    //0: パワーアップ
    //1: ボム
    //2: １ＵＰ
    //3: 得点
    id: 0,

    //パワーアップタイプ
    type: 0,

    active: false,

    init: function(id) {
        this.superInit("tex1", 32, 32);
        this.parentScene = app.currentScene;
        this.id = id;
        this.setFrameTrimming(0, 97, 96, 32);
        this.setFrameIndex(id);
        this.setScale(2.0);

        if (id == 0) {
            this.core = tm.display.Shape({width:32, height:32}).addChildTo(this);
            this.core.canvas.setFillStyle(
                tm.graphics.RadialGradient(16, 16, 0, 16, 16, 16)
                    .addColorStopList([
                        {offset:0.0, color: "rgba(255, 0, 0, 1)"},
                        {offset:0.8, color: "rgba(255, 0, 0, 0.5)"},
                        {offset:1.0, color: "rgba(0, 0, 0, 0)"},
                    ]).toStyle()
                ).fillRect(0, 0, 32, 32);
            this.core.tweener.clear();
            this.core.tweener.scale(0.5, 500, "easeInOutSine").scale(0.3, 500, "easeInOutSine").setLoop(true);
            this.core.setScale(0.5);
        } else if (id == 1) {
        } else if (id == 2) {
        }

        //当り判定設定
        this.boundingType = "rect";

        this.phase = 0;
        this.count = 0;
        this.time = 1;
    },

    update: function() {
        if (this.id == 0 && this.time % 150 == 0) {
            this.type = (this.type+1)%3;
            var color1 , color2;
            if (this.type == 0) {color1 = "rgba(255, 0, 0, 1)"; color2 = "rgba(255, 0, 0, 0.5)";}
            if (this.type == 1) {color1 = "rgba(0, 255, 0, 1)"; color2 = "rgba(0, 255, 0, 0.5)";}
            if (this.type == 2) {color1 = "rgba(0, 0, 255, 1)"; color2 = "rgba(0, 0, 255, 0.5)";}
            this.core.canvas.setFillStyle(
                tm.graphics.RadialGradient(16, 16, 0, 16, 16, 16)
                    .addColorStopList([
                        {offset:0.0, color: color1},
                        {offset:0.8, color: color2},
                        {offset:1.0, color: "rgba(0, 0, 0, 0)"},
                    ]).toStyle()
                ).fillRect(0, 0, 32, 32);
        }

        //自機との当り判定チェック
        var player = app.player;
        if (this.isHitElement(player)) {
            player.getItem(this.id, this.type);
            this.remove();
        }

        //移動パターン
        if (this.phase == 0) {
            this.y++;
            if (this.y > SC_H-32) {
                this.phase++;
            }
        } else if (this.phase == 1) {
            var x = rand(SC_W*0.2, SC_W*0.8);
            var y = rand(SC_H*0.2, SC_W*0.9);
            this.tweener.clear()
                .move(x, y, 3000, "easeInOutSine")
                .call(function() {
                    this.count++;
                    if (this.count < 3) {
                        this.phase = 1;
                    } else {
                        this.phase = 3;
                    }
                }.bind(this));
            this.phase++;
        } else if (this.phase == 3) {
            this.y += 2;
        }

        this.time++;
    },
});

})();
