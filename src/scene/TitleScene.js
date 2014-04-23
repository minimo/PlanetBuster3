/*
 *  PlanetBuster3
 *  title.js
 *  2013/06/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

//タイトルシーン
pb3.TitleScene = tm.createClass({
    superClass: tm.app.TitleScene,

    init: function() {
        this.superInit({
            title: "PlanetBuster",
            width: SC_W,
            height: SC_H
        });
        this.time = 0;
        app.background = "rgba(0,0,0,0.2)";
    },
    update: function() {
        if (this.time % 20 == 0 ){
            var x = rand(320);
            var y = 400;
            var sc = (rand(10)+5)/10;
            var rot = rand(10)-5;
            if (rot == 0)rot = 1;
            var sp = rand(3)+2;
            var color = rand(360);
            var vertex = rand(3)+2;
            for (var i = 0; i < rand(4)+2; i++ ){
                var s = tm.app.Shape(64, 64);
                s.color = "hsl({0}, 50%, 50%)".format(color+i*10*(rand(1)-1));
                if (vertex == 2) {
                    s.canvas.setColorStyle(s.color,s.color).strokeStar(32, 32, 32, 5);
                } else {
                    s.canvas.setColorStyle(s.color,s.color).strokePolygon(32, 32, 32, vertex);
                }
                s.x = x;
                s.y = y;
                s.rot = rot;
                s.rotation+=i*2;
                s.speed =sp;
                s.scaleX = s.scaleY = sc-i*0.2;
                s.time = 0;
                s.update = function() {
                    if (this.y < 160){
                        this.alpha-=0.02;
                        if (this.alpha < 0)this.remove();
                    }
                    this.y-=this.speed;
                    this.rotation+=this.rot;
                    if (this.y < -40) this.remove();
                    this.time++;
                }
                this.addChild(s);
            }
        }
        this.time++;
    },
    onnextscene: function() {
        app.background = "rgba(0, 0, 16, 0.8)";
        app.replaceScene(pb3.MainScene());
    }
});

//ゲーム結果シーン
pb3.ResultScene = tm.createClass({
    superClass: tm.app.ResultScene,

    init: function() {
        this.superInit({
            score: gamescore,
            msg: "Game Over",
        	width: SC_W,
            height: SC_H
        });
        // 9leap に投稿したときだけ反応します
        tm.social.Nineleap.postRanking(gamescore,"SCORE:"+gamescore);
    },
    onnextscene: function() {
        app.replaceScene(pb3.TitleScene);
    }
});
