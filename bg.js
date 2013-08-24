/*

	PlanetBuster2
	bg.js
	2012/07/12
	This program is MIT lisence.

*/

enchant();

/////////////////////////////////////////////////////////////////////////////
//背景クラス
/////////////////////////////////////////////////////////////////////////////
BackGround = Class.create(enchant.Group,{
	initialize:function(effects){
		enchant.Group.call(this);

		this.spd = spd;
		this.spw = spw;

		this.span = 1;				//スクロール間隔
		this.speed = 4*this.spd;	//スクロール速度
		this.time = 0;
		this.stage = 1;
		this.phase = 0;
		this.interval = 0;
		this.effects = effects;

		this.onenterframe = function(){};

		this.layer1 = new Sprite(640,640);
		this.layer2 = new Sprite(640,640);
		this.layer3 = new Sprite(640,640);
		this.layer4 = new Sprite(640,640);
	},
	/////////////////////////////////////////////////////////////////////////////
	//ステージ毎初期化
	/////////////////////////////////////////////////////////////////////////////
	init:function(num){
		this.time = 0;
		this.stage = num;
		this.phase = 0;
		switch(num){
			case 1:
				this.span = 1;		
				this.speed = 4*this.spd;
				this.onenterframe = this.stage1_onenterframe;
				//地上パターン
				this.layer1.image = game.assets['media/map_stage1_1.png'];
				this.layer1.x = 0;
				this.layer1.y = -320;
				this.layer1.width = 640;
				this.layer1.height = 640;
				this.layer1.opacity = 1;
				this.layer1.alpha = 'source-over';
				this.addChild(this.layer1);
				this.layer2.image = game.assets['media/map_stage1_1.png'];
				this.layer2.x = 0;
				this.layer2.y = -960;
				this.layer2.width = 640;
				this.layer2.height = 640;
				this.layer2.opacity = 1;
				this.layer2.alpha = 'source-over';
				this.addChild(this.layer2);
				//雲海
				this.layer3.image = game.assets['media/map_stage1_2.png'];
				this.layer3.x = 0;
				this.layer3.y = 0;
				this.layer3.width = 320;
				this.layer3.height = 384;
				this.layer3.opacity = 0;
				this.layer3.alpha = 'source-over';
				this.addChild(this.layer3);
				this.layer4.image = game.assets['media/map_stage1_2.png'];
				this.layer4.x = 0;
				this.layer4.y = -384;
				this.layer4.width = 320;
				this.layer4.height = 384;
				this.layer4.opacity = 0;
				this.layer4.alpha = 'source-over';
				this.addChild(this.layer4);
				break;
			case 2:
				this.span = 1;		
				this.speed = this.spd;
				this.interval = sec(1);
				this.onenterframe = this.stage2_onenterframe;
				//地上パターン
				this.layer1.image = game.assets['media/map_stage2_1.png'];
				this.layer1.x = 0;
				this.layer1.y = 0;
				this.layer1.width = 320;
				this.layer1.height = 320;
				this.layer1.opacity = 1;
				this.layer1.alpha = 'source-over';
				this.addChild(this.layer1);
				this.layer2.image = game.assets['media/map_stage2_2.png'];
				this.layer2.x = 0;
				this.layer2.y = -320;
				this.layer2.width = 320;
				this.layer2.height = 320;
				this.layer2.opacity = 1;
				this.layer2.alpha = 'source-over';
				this.addChild(this.layer2);
				break;
			case 3:
				this.span = 3;	
				this.speed = this.spd;
				this.onenterframe = this.stage3_onenterframe;
				//地球
				this.layer1.image = game.assets['media/map_stage3_1.png'];
				this.layer1.x = 0;
				this.layer1.y = 0;
				this.layer1.width = 320;
				this.layer1.height = 320;
				this.layer1.opacity = 1;
				this.layer1.alpha = 'source-over';
				this.addChild(this.layer1);
				//宇宙空間
				this.layer2.image = game.assets['media/map_stage3_2.png'];
				this.layer2.x = 0;
				this.layer2.y = -960;
				this.layer2.width = 320;
				this.layer2.height = 960;
				this.layer2.opacity = 0;
				this.layer2.alpha = 'source-over';
				this.addChild(this.layer2);
				this.layer3.image = game.assets['media/map_stage3_2.png'];
				this.layer3.x = 0;
				this.layer3.y = -1260;
				this.layer3.width = 320;
				this.layer3.height = 960;
				this.layer3.opacity = 1;
				this.layer3.alpha = 'source-over';
				this.addChild(this.layer3);
				break;
		}
	},
	/////////////////////////////////////////////////////////////////////////////
	//後始末
	/////////////////////////////////////////////////////////////////////////////
	release:function(){
		switch(this.stage){
			case 1:
				this.removeChild(this.layer1);
				this.removeChild(this.layer2);
				this.removeChild(this.layer3);
				this.removeChild(this.layer4);
				break;
			case 2:
				this.removeChild(this.layer1);
				this.removeChild(this.layer2);
				break;
			case 3:
				if( this.phase == 0 )this.removeChild(this.layer1);
				this.removeChild(this.layer2);
				break;
		}
	},
	stage1_onenterframe:function(){
		//背景制御
		if( this.time % this.span == 0 ){
			this.layer1.y+=this.speed;
			if( this.layer1.y > 320 )this.layer1.y = -960+this.speed;
			this.layer2.y+=this.speed;
			if( this.layer2.y > 320 )this.layer2.y = -960+this.speed;
			this.layer3.y+=this.speed;
			if( this.layer3.y > 384 )this.layer3.y = -384+this.speed;
			this.layer4.y+=this.speed;
			if( this.layer4.y > 384 )this.layer4.y = -384+this.speed;
		}
		if( this.phase == 1 ){
			this.layer1.x -= 1*this.spd;
			this.layer2.x -= 1*this.spd;
			if( this.layer1.x <= -200 ){
				this.layer1.x = -200;
				this.layer2.x = -200;
				this.phase++;
			}
		}
		if( this.phase == 3 ){
			this.speed = 6*this.spd;
			if( this.layer1.opacity > 0 ){
				this.layer1.opacity-=0.001;
				this.layer2.opacity-=0.001;
			}
			if( this.layer3.opacity < 0.7 ){
				this.layer3.opacity+=0.001;
				this.layer4.opacity+=0.001;
			}
		}
		this.time++;
	},
	stage2_onenterframe:function(){
		//背景制御
		if( this.time % this.span == 0 ){
			this.layer1.y+=this.speed;
			if( this.layer1.y > 320 )this.layer1.y = -320+this.speed;
			this.layer2.y+=this.speed;
			if( this.layer2.y > 320 )this.layer2.y = -320+this.speed;
		}
		//雲
		if( this.time % this.interval == 0 ){
			var num = rand(4)+1;
			var x = rand(320);
			var y = -rand(40)-32;
			var vx = 0;
			var vy = rand(6*this.spd);
			var size = 1;
			var rot = rand(360);
			var op = ~~(vy/this.spd)/10+0.2;
			var e = this.effects.enterEffect(null,'cloud'+num,x,y,vx,vy,size,rot,0,0,funcCloud);
			e.sprite.opacity = op;
		}
		this.time++;
	},
	stage3_onenterframe:function(){
		//背景制御
		if( this.time % this.span == 0 ){
			this.layer1.y+=this.speed;
			if( this.phase == 0 && this.layer1.y == 320 ){
				this.removeChild(this.layer1);
				this.layer1.y = 0;
				this.layer2.tl.fadeIn(sec(2));
			}
			this.layer2.y+=this.speed;
			if( this.layer2.y > 320 ){
				this.layer2.y = -960;
			}
			if( this.phase == 3 && this.layer2.y > 0 ){
				this.layer2.y = 0;
			}
			this.layer3.y+=this.speed;
			if( this.layer3.y > 320 ){
				this.layer3.y = -960;
			}
		}

		//ワープ後背景切り替え
		if( this.phase == 1 ){
			this.tl.delay(sec(7)).then(function(){
				this.layer1.image = game.assets['media/map_stage3_3.png'];
				this.layer1.y = -640;
				this.layer1.width = 320;
				this.layer1.height = 960;
				this.layer1.opacity = 1;
				this.addChild(this.layer1);
				this.layer2.image = game.assets['media/map_stage3_4.png'];
				this.layer2.y = -1600;
				this.layer2.width = 320;
				this.layer2.height = 960;
				this.layer2.opacity = 1;
				this.speed = 1/spd;
				this.span = 10;
				this.phase++;
			});
			this.phase++;
		}
		this.time++;
	},
});

var funcCloud = function(){
	this.y += this.vy;
	if( this.y > 350 )this.release();
}


/*

/////////////////////////////////////////////////////////////////////////////
//背景クラス
/////////////////////////////////////////////////////////////////////////////
BackGround = Class.create(enchant.Group,{
	initialize:function(){
		enchant.Group.call(this);
		this.span = 1;	//スクロール間隔
		this.speed = 1;	//スクロール速度

		this.layer1 = new Map(16,16);	//バックグラウンド
		this.layer1.image = game.assets['media/mapchip.png'];
//		this.layer1._element.style.zIndex = LAYER_BACKGROUND;
		this.layer1.loadData(stage1map);
		this.layer1.y = 0;

		this.addChild(this.layer1);
		
		this.span = 1;
		this.speed = 2;
		this.time = 0;
	},
	onenterframe:function(){
		if( this.time % this.span == 0 ){
			this.layer1.y+=this.speed;
		}
		this.time++;
	}
});

var stage1map = [
[0,1,2,3,4,5,0,1,2,3,4,5,-1,-1,-1,-1,-1,-1,-1,-1],
[32,33,34,35,36,37,32,33,34,35,36,37,-1,-1,-1,-1,-1,-1,-1,-1],
[64,65,66,67,0,1,2,3,4,5,68,69,-1,-1,-1,-1,-1,-1,-1,-1],
[96,97,98,99,32,33,34,35,36,37,100,101,-1,-1,-1,-1,-1,-1,-1,-1],
[128,129,130,131,64,65,66,67,68,69,132,133,-1,-1,-1,-1,-1,-1,-1,-1],
[0,1,2,3,96,97,98,99,100,101,164,165,-1,-1,-1,-1,-1,-1,-1,-1],
[32,33,34,35,128,129,130,131,132,133,196,197,-1,-1,-1,-1,-1,-1,-1,-1],
[64,65,66,67,68,69,224,225,226,227,228,229,-1,-1,-1,-1,-1,-1,-1,-1],
[96,97,98,99,100,101,8,9,10,11,10,11,10,11,10,11,-1,-1,-1,-1],
[128,129,130,131,132,133,40,41,42,43,42,43,42,43,42,43,-1,-1,-1,-1],
[6,7,8,9,10,11,78,79,138,139,140,140,141,140,141,140,141,140,141,140],
[38,39,40,41,42,43,110,111,170,171,172,172,173,172,173,172,173,172,173,172],
[70,71,72,73,74,75,12,13,12,13,12,13,12,13,12,13,-1,-1,-1,-1],
[102,103,76,77,106,107,44,45,44,45,44,45,44,45,44,45,-1,-1,-1,-1],
[-1,-1,108,109,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,76,77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,108,109,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,76,77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,108,109,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];
*/