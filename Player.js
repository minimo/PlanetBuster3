/*
 *  PlanetBuster3
 *  player.js
 *  2013/06/21
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
Player = tm.createClass({
    superClass: tm.app.Sprite,

    init: function() {
        this.superInit("gunship1", 32, 32);
        this.x = SCREEN_WIDTH/2;
        this.y = SCREEN_HEIGHT*0.8;
        this.bx = SCREEN_WIDTH/2;
        this.by = SCREEN_HEIGHT*0.8;
        this.setFrameIndex(4,32,32);

        this.startup = true;
        this.stageStartup = false;
        this.control = true;    //操作可能フラグ
        this.shotON  = true;    //ショットフラグ
        this.mouseON = false;   //マウス操作中フラグ
        
        this.speed = 3;         //移動速度
        this.rollcount = 50;    //機体ロール具合
        this.bitOpen = true;    //ビット展開
        
        this.type = 0;  //自機タイプ
        
        //ビット
        var bit = this.bit1 = PlayerBit();
        bit.x = -40;
        bit.y = 20;
        bit.setDirection(-10);
        bit.addChildTo(this);
        var bit = this.bit2 = PlayerBit();
        bit.x = 40;
        bit.y = 20;
        bit.setDirection(10);
        bit.reverse = true;
        bit.addChildTo(this);

        var bit = this.bit3 = PlayerBit();
        bit.x = -25;
        bit.y = 10;
        bit.setDirection(-5);
        bit.addChildTo(this);
        var bit = this.bit4 = PlayerBit();
        bit.x = 25;
        bit.y = 10;
        bit.setDirection(5);
        bit.reverse = true;
        bit.addChildTo(this);
        
        this.time = 0;
    },
    update: function() {
        if (this.startup) {
            var self = this;
            this.x = SCREEN_WIDTH/2;
            this.y = SCREEN_HEIGHT+32;
            
            if (this.stageStartup) {
                this.tweener.
                to({x:SCREEN_WIDTH/2,y:SCREEN_HEIGHT/2+32}, 1000, "easeOutQuint").
                to({x:SCREEN_WIDTH/2,y:SCREEN_HEIGHT-64},1000).
                call(function(){
                    self.shotON = true;
                    self.control = true;
                });
            } else {
                this.tweener.
                to({x:SCREEN_WIDTH/2,y:SCREEN_HEIGHT-64}, 1000, "easeOutQuint").
                call(function(){
                    self.shotON = true;
                    self.control = true;
                });
            }
            
            this.shotON = false;
            this.control = false;
            this.startup = false;
            this.stageStartup = false;
        }
    
        //操作系
        if (this.control) {
            var p = app.pointing;
            if (p.getPointing()) {
                this.x += p.deltaPosition.x;
                this.y += p.deltaPosition.y;
                this.mouseON = true;
            }else{
                this.mouseON = false;
            }
            
            var kb = app.keyboard;
            if (kb.getKey("up")) {
                this.y -= this.speed;
            } else
            if (kb.getKey("down")) {
                this.y += this.speed;
            }
            if (kb.getKey("left")) {
                this.x -= this.speed;
            } else
            if (kb.getKey("right")) {
                this.x += this.speed;
            }

            if (kb.getKey("space")) {
                pb3.bullets.vanish();
            }

            //ショット
            if (this.shotON) {
                if (this.time % 4 == 0) {
                    pb3.shots.enter(0, this.x-12, this.y- 8, -3, 10);
                    pb3.shots.enter(0, this.x- 7, this.y- 8, -1, 10);
                    pb3.shots.enter(0, this.x- 2, this.y-16,  0, 10);
                    pb3.shots.enter(0, this.x+ 2, this.y-16,  0, 10);
                    pb3.shots.enter(0, this.x+ 7, this.y- 8,  1, 10);
                    pb3.shots.enter(0, this.x+12, this.y- 8,  3, 10);
                }
            }
        }

        if (this.bx > this.x) {
            this.rollcount-=2;
            if (this.rollcount < 0) this.rollcount = 0;
        }
        if (this.bx < this.x) {
            this.rollcount+=2;
            if (this.rollcount > 80) this.rollcount = 80;
        }
        if (this.bx == this.x) {
            if (this.rollcount < 50) this.rollcount+=2;
            else this.rollcount-=2;
            if (this.rollcount < 0) this.rollcount = 0;
            if (this.rollcount > 80) this.rollcount = 80;
        }

        //移動範囲の制限
        this.x = Math.clamp(this.x, 16, SCREEN_WIDTH-16);
        this.y = Math.clamp(this.y, 16, SCREEN_HEIGHT-16);
        
        //機体ロール
        if (this.time % 2 == 0) {
            var i = ~~(this.rollcount/10);
            if (i < 0) i = 0;
            if (i > 8) i = 8;
            this.setFrameIndex(i,32,32);
        }
        
        //バックファイア
        var p = pb3.Particle(20, 1.0, 0.95, null, 128, 128, 255).addChildTo(app.currentScene);
        p.x = this.x;
        p.y = this.y+16;
        p.vy = 1;
        var p = pb3.Particle(20, 1.0, 0.95, null, 128, 128, 255).addChildTo(app.currentScene);
        p.x = this.x;
        p.y = this.y+16;
        p.vy = 1;

        this.bx = this.x;
        this.by = this.y;
        this.time++;
    },
});

var PlayerBit = tm.createClass({
    superClass: tm.app.Sprite,

    init: function(parent) {
        this.superInit("bit1", 32, 32);
        this.setFrameIndex(0,32,32);
        this.scaleX = this.scaleY = 0.5;
        this.offset_x = this.offset_y = 0;
        this.reverse = false;
        this.shotON = true;
        this.parent = parent;
        this.time = 1;
    },
    update: function() {
        //回転
        if (this.time % 2 == 0) {
            var c = this.time/2%9;
            if (this.reverse) c = 8-c;
            this.setFrameIndex(c, 32, 32);
        }
        //グローバル座標取得
        var g = this.parent.localToGlobal(this);

        //ショット
        if (this.time % 4 == 0 && this.parent.shotON && this.shotON) {
            pb3.shots.enter(1, g.x + this.offset_x, g.y + this.offset_y, this.rotation, 15);
        }

        //バックファイア
        var p = pb3.Particle(20, 1.0, 0.95, null, 128, 128, 255).addChildTo(app.currentScene);
        p.x = g.x;
        p.y = g.y+5;
        p.vy = 1;
        this.time++;
    },
    setDirection: function(dir) {
        this.rotation = dir;
        this.offset_x = Math.sin(dir*toRad)*5;
        this.offset_y = -Math.cos(dir*toRad)*15;
    },
});



