/*

	PlanetBuster2
	Enemy Data
	2012/07/02
	This program is MIT lisence.

*/

//////////////////////////////////////////////////////////////////////////////
//敵データ
//file			画像ファイル
//width,heigh	画像サイズ
//colx,coly		当たり判定位置
//colw,colh		画像サイズ
//point			得点
//def			耐久力
//burn			破壊パターン	0:小 1:中 2:大 3:以上:爆発エフェクト数
//type			敵タイプ		0:アイテム 1:小型 2:中型１ 3:中型２ 4:大型 5:中ボス 6:ステージボス
//ground		地上物フラグ	ture or false
//layer			追加対象レイヤ	0-2　0が一番下となる undefined時は1
//////////////////////////////////////////////////////////////////////////////
var enemyData = {
//大気圏内
'SkyFish1':		{file: 'media/enemy5.png',	w: 32, h: 32, colx:  8, coly:  8, colw: 16, colh: 16, point:  300, def:  30, burn: 0, type: 1 },
'SkyFish2':		{file: 'media/enemy5.png',	w: 32, h: 32, colx:  8, coly:  8, colw: 16, colh: 16, point:  300, def:  30, burn: 0, type: 1 },
'SkyCanon':		{file: 'media/enemy6_1.png',w:104, h: 64, colx:  0, coly:  0, colw:104, colh: 64, point:  800, def: 700, burn:10, type: 2 },
'SkyBlade':		{file: 'media/enemy7.png',	w: 48, h:104, colx:  4, coly:  0, colw: 40, colh:104, point: 1000, def: 400, burn:10, type: 2 },

//両用
'Attacker1':	{file: 'media/enemy1.png',	w: 32, h: 32, colx:  8, coly:  8, colw: 16, colh: 16, point:  300, def:  30, burn: 2, type: 1 },
'Attacker2':	{file: 'media/enemy1.png',	w: 32, h: 32, colx:  8, coly:  8, colw: 16, colh: 16, point:  300, def:  30, burn: 2, type: 1 },
'Attacker3':	{file: 'media/enemy1.png',	w: 32, h: 32, colx:  8, coly:  8, colw: 16, colh: 16, point:  300, def:  30, burn: 2, type: 1 },
'Delta':		{file: 'media/enemy3.png',	w: 64, h: 48, colx: 16, coly:  8, colw: 32, colh: 48, point:  500, def: 400, burn: 5, type: 2 },
'BigWing':		{file: 'media/enemy2.png',	w:128, h: 48, colx:  0, coly: 16, colw:128, colh: 32, point: 2000, def:1000, burn:15, type: 3 },

//宇宙
'Fighter1':		{file: 'media/enemy12.png',	w: 32, h: 32, colx:  8, coly:  8, colw: 16, colh: 16, point:  300, def:  30, burn: 2, type: 1 },
'Fighter2':		{file: 'media/enemy12.png',	w: 32, h: 32, colx:  8, coly:  8, colw: 16, colh: 16, point:  300, def:  30, burn: 2, type: 1 },
'Trident':		{file: 'media/enemy4.png',	w:120, h: 80, colx: 36, coly:  0, colw: 50, colh: 75, point: 1000, def: 500, burn:10, type: 2 },
'Bomb1':		{file: 'media/enemy13.png',	w: 32, h: 48, colx:  0, coly:  0, colw: 64, colh: 48, point: 5000, def: 600, burn:10, type: 1 },
'Bit1':			{file: 'media/enemy10.png',	w: 32, h: 24, colx:  4, coly:  0, colw: 24, colh: 32, point: 5000, def: 100, burn: 2, type: 2 },


'Missile1':		{file: 'media/missile1.png',w: 32, h:128, colx:  0, coly:  0, colw: 32, colh:128, point: 1000, def: 500, burn:15, type: 2 },
'Missile2':		{file: 'media/missile2.png',w: 16, h: 64, colx:  0, coly:  0, colw: 16, colh: 64, point: 1000, def: 500, burn:10, type: 2 },
'Missile3':		{file: 'media/missile3.png',w: 24, h: 80, colx:  0, coly:  0, colw: 24, colh: 80, point: 1000, def: 500, burn:10, type: 2 },
'Missile4':		{file: 'media/missile4.png',w: 24, h: 80, colx:  0, coly:  0, colw: 24, colh: 80, point: 1000, def: 500, burn:10, type: 2 },

//隕石
'Rock1':		{file: 'media/rock1.png',	w: 80, h: 64, colx:  0, coly: 0, colw:60, colh: 54, point: 1000, def: 500, burn:6, type: 2},
'Rock2':		{file: 'media/rock2.png',	w: 32, h: 32, colx:  0, coly: 0, colw:32, colh: 32, point:  300, def: 100, burn:4, type: 2},
'Rock3':		{file: 'media/rock3.png',	w: 16, h: 16, colx:  0, coly: 0, colw:16, colh: 16, point:  100, def:  50, burn:3, type: 2},

//汎用
'Turret1':		{file: 'media/enemy11.png',	w: 16, h:16, colx:  0, coly:  0, colw: 16, colh: 16, point: 1000, def: 500, burn: 1, type: 2 },

//アイテムキャリア
'Carrier':		{file: 'media/enemy8.png',	w: 56, h:128, colx:  4, coly:  4, colw: 48, colh:120, point: 1000, def: 400, burn:10, type: 2 },

//ITEM
'Item_Bit':		{file: 'media/myship_bit.png',	w: 16, h: 24, colx:-16, coly:-16, colw: 40, colh: 48, point:  500, def: 400, burn: 1, type: 0, layer: 2 },
'Item_Power':	{file: 'media/item.png',		w: 32, h: 32, colx:-16, coly:-16, colw: 56, colh: 40, point:  500, def: 400, burn: 1, type: 0, layer: 2 },
'Item_Bomb':	{file: 'media/item.png',		w: 32, h: 32, colx:-16, coly:-16, colw: 56, colh: 40, point:  500, def: 400, burn: 1, type: 0, layer: 2 },
'Item_1up':		{file: 'media/item.png',		w: 32, h: 32, colx:-16, coly:-16, colw:136, colh: 40, point:  500, def: 400, burn: 1, type: 0, layer: 2 }, 
}

var degree = Math.PI / 180;

//////////////////////////////////////////////////////////////////////////////
//敵機アルゴリズム
//添字が敵機名称
//'_init'を付けると初期化処理
//'_dead'を付けると死亡処理
//'_release'を付けると解放処理
//////////////////////////////////////////////////////////////////////////////
var enemyAlgorithm = {
	//////////////////////////////////////////////////////////////////////////////
	//Attacker
	//////////////////////////////////////////////////////////////////////////////
	'Attacker1_init':function(){
		//移動
		if( this.x < 160 ){
			this.tl.moveBy( 60, 20,sec(0.3)).
					moveBy( 40, 30,sec(0.3)).
					moveBy( 30, 40,sec(0.3)).
					moveBy( 70,-10,sec(0.3)).
					moveBy( 60,-20,sec(0.3)).
					moveBy(160,-40,sec(0.3)).
					moveBy(160,  0,sec(0.1));
		}else{
			this.tl.moveBy( -60, 20,sec(0.3)).
					moveBy( -40, 30,sec(0.3)).
					moveBy( -30, 40,sec(0.3)).
					moveBy( -70,-10,sec(0.3)).
					moveBy( -60,-20,sec(0.3)).
					moveBy(-160,-40,sec(0.3)).
					moveBy(-160,  0,sec(0.1));
		}
	},
	'Attacker1':function(){
		if( this.time > sec(0.5) && this.time % sec(1/this.diff) == 0 ){
			this.bullets.enterTargetBullet(this,B_ROLL_R,0.5,this.x,this.y,this.player,2*this.spd,0,0);
		}
		this.vx = this.x - this.bx;
		this.vy = this.y - this.by;
		this.bx = this.x;
		this.by = this.y;
	},
	'Attacker2_init':function(){
		var vx = 1;
		if( this.x > 160 ){
			vx = -1;
		}
		this.tl.moveBy(100*vx,60,sec(1.5),enchant.Easing.SIN_EASEOUT);
		for( var i = 0; i < 3; i++ ){
			this.tl.then(function(){
				this.bullets.enterTargetBullet(this,B_ROLL_R,0.5,this.x,this.y,this.player,2*this.spd,0,0);
			}).delay(sec(0.1));
		}
		this.tl.moveBy(120*vx,20,sec(1),enchant.Easing.SIN_EASEOUT);
		for( var i = 0; i < 3; i++ ){
			this.tl.then(function(){
				this.bullets.enterTargetBullet(this,B_ROLL_R,0.5,this.x,this.y,this.player,2*this.spd,0,0);
			}).delay(sec(0.1));
		}
		this.tl.moveBy(50*vx,-300,sec(2),enchant.Easing.SIN_EASEOUT);
		this.bx = this.x;
		this.by = this.y;
	},
	'Attacker2':function(){
		this.vx = this.x - this.bx;
		this.vy = this.y - this.by;
		this.bx = this.x;
		this.by = this.y;
	},
	'Attacker3_init':function(){
		//移動
		this.tl.moveBy( 0, 100,sec(1.0),enchant.Easing.SIN_EASEOUT).then(function(){this.attack=true;}).delay(sec(1.0));
		this.tl.moveTo( this.x, -200,sec(1.0));

		//攻撃フラグ
		this.attack = false;
	},
	'Attacker3':function(){
		if( this.attack ){
			this.attack = false;
			var num = this.diff*3;
			for( var i = 0; i < num; i++ ){
				var x = rand(24)-12;
				var y = rand(24)-12;
				var tx = this.player.x + x;
				var ty = this.player.y + y;
				this.bullets.enterPlaceBullet(this,B_ROLL_R,0.5,this.x+x,this.y+y,tx,ty,this.spd*3,0,0);
			}
		}
	},

	//////////////////////////////////////////////////////////////////////////////
	//Fighter
	//////////////////////////////////////////////////////////////////////////////
	'Fighter1_init':function(){
		//初期位置
		this.x = rand(160)+this.x;
		//移動
		//自機に向かって移動
		var d = Math.sqrt((this.player.x-this.x)*(this.player.x-this.x) + (this.player.y-this.y)*(this.player.y-this.y));
		this.vx = (this.player.x-this.x)/d*this.spd*2;
		this.vy = (this.player.y-this.y)/d*this.spd*2;

		//進行方向を向く
		var rad = Math.atan2( this.vy, this.vx );
		var deg = ~~( rad * 180 / 3.14159);
		this.sprite.rotation = deg+90;
		this.sprite.frame = 1;
	},
	'Fighter1':function(){
		if( this.time % this.spw*3 == 0 ){
			this.sprite.frame++;
			if( this.sprite.frame == 3 )this.sprite.frame = 1;
		}
		//攻撃
		if( this.time % sec(2/this.diff) == 0 && this.y < this.player.y ){
			for( var i = 0; i < this.diff; i ++ ){
				var x = rand(24)-12;
				var y = rand(24)-12;
				var tx = this.player.x + x;
				var ty = this.player.y + y;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_R,1.0,this.x+x,this.y+y,tx,ty,this.spd*3,0,0);
			}
		}
		this.x += this.vx;
		this.y += this.vy;
	},
	'Fighter2_init':function(){
		//移動
		this.vx = this.vy = 0;
		if( this.x < 0 ){this.vx = 1;this.sprite.rotation = 90;}
		if( this.x > 320 ){this.vx = -1;this.sprite.rotation = -90;}
		if( this.y < 0 ){this.vy = 1;this.sprite.rotation = 180;}
		if( this.y > 320 ){this.vy = -1;this.sprite.rotation = 0;}
	},
	'Fighter2':function(){
		if( this.time % this.spw*3 == 0 ){
			this.sprite.frame++;
			if( this.sprite.frame == 3 )this.sprite.frame = 1;
		}
		//攻撃
		if( this.time % sec(2) == 0 ){
			for( var i = 0; i < this.diff*2; i ++ ){
				var speed = (this.vx+this.vy)*8-i
				if( speed < 3 )speed = 3;
				this.bullets.enterPlaceBullet(this,B_ROLL_R,0.5,this.x,this.y,this.player.x,this.player.y,speed,0.95,0);
			}
		}
		this.x+=this.vx;
		this.y+=this.vy;
	},

	//////////////////////////////////////////////////////////////////////////////
	//SkyFish
	//////////////////////////////////////////////////////////////////////////////
	'SkyFish1_init':function(){
		//移動
		this.tl.moveBy( 0, 100,sec(1.0),enchant.Easing.SIN_EASEOUT).delay(sec(1.0));
		this.tl.moveTo( this.x, -200,sec(2.0));

		//攻撃間隔
		this.interval = sec(1);
		
		//ローターの追加
		this.obj1 = this.manager.effects.enterEffect(this,'roter5',0,0,0,0,1,0,0,0,funcRoter);
	},
	'SkyFish1':function(){
		//自機の方向を向く
		var ax = this.x - this.player.x;
		var ay = this.y - this.player.y;
		var rad = Math.atan2( ay, ax );
		var deg = ~~( rad * 180 / 3.14159);
		this.sprite.rotation = deg+90;

		if( this.interval == 0 ){
			var num = (this.diff==1)?1:2;
			for( var i = 0; i < num; i++ ){
				if( this.diff < 3 ){
					this.bullets.enterTargetBullet(this,B_THIN,1.0,this.x,this.y,this.player,2*this.spd,0,this.spw*3*i);
				}else{
					this.bullets.enterNWayBullet(this,B_THIN,1.0,this.x,this.y,this.player.x,this.player.y,10,3,2*this.spd,0,this.spw*3*i);
				}
			}
			this.interval = sec(3/this.diff);
		}else{
			this.interval--;
		}
	},
	'SkyFish1_release':function(){
		this.releaseDefault();
		if( this.obj1 )this.obj1.release();
	},
	'SkyFish2_init':function(){
		//移動
		//自機に向かって移動
		var d = Math.sqrt((this.player.x-this.x)*(this.player.x-this.x) + (this.player.y-this.y)*(this.player.y-this.y));
		this.vx = (this.player.x-this.x)/d*this.spd*3;
		this.vy = (this.player.y-this.y)/d*this.spd*3;

		//ローターの追加
		this.obj1 = this.manager.effects.enterEffect(this,'roter5',0,0,0,0,1,0,0,0,funcRoter);
	},
	'SkyFish2':function(){
		//自機の方向を向く
		var ax = this.x - this.player.x;
		var ay = this.y - this.player.y;
		var rad = Math.atan2( ay, ax );
		var deg = ~~( rad * 180 / 3.14159);
		this.sprite.rotation = deg+90;

		//攻撃
		if( this.time > sec(0.1) && this.time % sec(1.5/this.diff) == 0 && this.y < this.player.y ){
			for( var i = 0; i < this.diff; i ++ ){
				var x = rand(24)-12;
				var y = rand(24)-12;
				var tx = this.player.x + x;
				var ty = this.player.y + y;
				this.bullets.enterPlaceBullet(this,B_ROLL_R,0.5,this.x+x,this.y+y,tx,ty,3*this.spd,0,0);
			}
		}
		
		this.x+=this.vx;
		this.y+=this.vy;
	},
	'SkyFish2_release':function(){
		this.releaseDefault();
		if( this.obj1 )this.obj1.release();
	},

	//////////////////////////////////////////////////////////////////////////////
	//SkyCanon
	//////////////////////////////////////////////////////////////////////////////
	'SkyCanon_init':function(){
		//移動
		if( this.x < 160 ){
			this.tl.moveBy(0,100,sec(1.5),enchant.Easing.SIN_EASEOUT).moveBy(320,400,sec(15),enchant.Easing.SIN_EASEOUT);
		}else{
			this.tl.moveBy(0,100,sec(1.5),enchant.Easing.SIN_EASEOUT).moveBy(-320,400,sec(15),enchant.Easing.SIN_EASEOUT);
		}

		//ローターの追加
		this.obj1 = this.manager.effects.enterEffect(null,'roter6',this.x,this.y+4,0,0,1,0,0,0,funcRoter);
		this.phase = 0;
	},
	'SkyCanon':function(){
		if( this.time > sec(0.9) && this.time % sec(4/this.diff) == 0 ){
			if( distance(this,this.player) > 32 ){
				for( var i = 0; i < this.diff*2+1; i++ ){
					this.bullets.enterTargetBullet(this,B_MEDIUM_R,1.0,this.x-32,this.y+28,this.player,3*this.spd,0,2*this.spw*i);
					this.bullets.enterTargetBullet(this,B_MEDIUM_R,1.0,this.x+32,this.y+28,this.player,3*this.spd,0,2*this.spw*i);
				}
			}
		}
		if( this.obj1 ){
			this.obj1.x = this.x;
			this.obj1.y = this.y+4;
		}
	},
	'SkyCanon_release':function(){
		this.releaseDefault();
		if( this.obj1 )this.obj1.release();
	},

	//////////////////////////////////////////////////////////////////////////////
	//SkyBlade
	//////////////////////////////////////////////////////////////////////////////
	'SkyBlade_init':function(){
		this.phase = 0;
		this.time = 0;
		//移動
		if( this.x > 160 ){
			//右から
			this.tl.moveBy(-200,0,sec(2),enchant.Easing.SIN_EASEOUT).delay(sec(1)).moveBy(-300,-200,sec(4));
		}else{
			//左から
			this.tl.moveBy( 200,0,sec(2),enchant.Easing.SIN_EASEOUT).delay(sec(1)).moveBy( 300,-200,sec(4));
		}
		//ローターの追加
		this.obj1 = this.manager.effects.enterEffect(null,'roter7',this.x,this.y,0,0,1,0,0,0,funcRoter);
	},
	'SkyBlade':function(){
		if( this.time % (this.spw*2) == 0 ){
			this.frame++;
			this.frame%=2;
		}
		if( this.time > sec(1) && this.time % sec(1/this.diff) == 0 ){
			var num = this.diff+3;
			if( num % 2 == 0 )num--;
			this.phase++;
			if( this.phase % 2 == 0 ){
				num++;
			}
			if( this.phase == this.diff+3 ){
				this.phase = 0;
				this.timer = sec((5-this.diff)*0.5);
			}
			this.bullets.enterNWayBullet(this,B_MEDIUM_R,1.0,this.x,this.y+20,this.x,this.y+100,20,num,2*this.spd);
		}
		if( this.obj1 ){
			this.obj1.x = this.x;
			this.obj1.y = this.y;
		}
	},
	'SkyBlade_release':function(){
		this.releaseDefault();
		if( this.obj1 )this.obj1.release();
	},

	//////////////////////////////////////////////////////////////////////////////
	//Delta
	//////////////////////////////////////////////////////////////////////////////
	'Delta_init':function(){
		this.sprite.scaleY = -1;
	},
	'Delta':function(){
		if( this.time % this.spw == 0 ){
			this.frame++;
			if( this.frame == 2 )this.frame = 0;
			this.y++;
		}
		if( this.time % sec(2/this.diff) == 0 ){
			this.bullets.enterCircleBullet(this,B_MEDIUM_R,1.0,this.x,this.y,this.x,this.y+10,9,this.spd,0,0);
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//BigWing
	//////////////////////////////////////////////////////////////////////////////
	'BigWing_init':function(){
		this.phase = 0;
		if( this.x < 160 ){
			this.tl.moveBy(0,130,sec(3)).then(function(){this.phase++;}).moveBy(400,30,sec(10));
		}else{
			this.tl.moveBy(0,130,sec(3)).then(function(){this.phase++;}).moveBy(-400,30,sec(10));
		}
	},
	'BigWing':function(){
		if( this.phase == 1 ){
			this.phase++;
			for( var i = 0; i < this.diff*4; i++ ){
				this.bullets.enterNWayBullet(this,B_MEDIUM_B,1.0,this.x,this.y,this.x,this.y+10,30,4,this.spd+i*0.15,0,0);
				this.bullets.enterNWayBullet(this,B_ROLL_B,  0.7,this.x,this.y,this.x,this.y+10,15,3,this.spd+i*0.15,0,0);
			}
		}
		if( this.phase == 2 && this.time % sec(2) == 0 ){
			for( var i = 0; i < this.diff*3; i++ ){
				var num = this.diff*3;
				var deg = 120/num;
				this.bullets.enterNWayBullet(this,B_MEDIUM_R,1.0,this.x,this.y,this.x,this.y+10,deg,num,this.spd+i*0.1,0,0);
			}
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//Trident
	//////////////////////////////////////////////////////////////////////////////
	'Trident_init':function(){
	},
	'Trident':function(){
		this.y+=1;
	},
	//////////////////////////////////////////////////////////////////////////////
	//Missile
	//////////////////////////////////////////////////////////////////////////////
	'Missile1_init':function(){
		this.vx = this.vy = 0;
		this.attack = false;
	},
	'Missile1':function(){
		if( this.attack ){
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//Bomb
	//////////////////////////////////////////////////////////////////////////////
	'Bomb1_init':function(){
		this.x += rand(160);
		this.tl.moveBy(0,120,sec(1),enchant.Easing.SIN_EASEOUT).delay(sec(0.5)).then(function(){this.attack=true;});
		this.attack = false;
	},
	'Bomb1':function(){
		if( this.time % this.spw*3 == 0 ){
			this.sprite.frame++;
			if( this.sprite.frame == 2 )this.sprite.frame = 0;
		}
		if( this.attack ){
			this.bullets.enterCircleBullet(this,B_MEDIUM_B,1.5,this.x,this.y,this.x,this.y+10,this.diff*8,15,0.8,0);
			this.bullets.enterCircleBullet(this,B_MEDIUM_B,1.5,this.x,this.y,this.x,this.y+10,this.diff*6,10,0.8,0);
			if( this.diff > 1 ){
				this.bullets.enterCircleBullet(this,B_MEDIUM_R,1.0,this.x,this.y,this.x,this.y+10,8,8,0.95,0);
			}
			if( this.diff > 2 ){
				this.bullets.enterCircleBullet(this,B_MEDIUM_R,1.0,this.x,this.y,this.x,this.y+10,16,6,0.95,0);
			}
			this.def = 0;
			this.burn = 3;
			this.attack = false;
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//Bit
	//////////////////////////////////////////////////////////////////////////////
	'Bit1_init':function(){
		this.x += rand(160);
		this.tl.moveBy(0,120-rand(20),sec(1),enchant.Easing.SIN_EASEOUT).delay(sec(0.5)).then(function(){this.phase++;});
		this.tl.delay(sec(3)).moveBy(0,-150,sec(4));
		this.phase = 0;
	},
	'Bit1':function(){
		if( this.phase == 1 ){
			if( this.time % this.spw*2 == 0 ){
				this.sprite.frame++;
				if( this.sprite.frame == 3 ){
					this.phase++;
				}
			}
		}
		if( this.phase == 2 ){
			if( this.time % this.spw*2 == 0 ){
				this.sprite.frame++;
				if( this.sprite.frame == 7 )this.sprite.frame = 3;
			}
			if( this.time % sec(1/this.diff) == 0 ){
				for( var i = 0; i < this.diff; i++ ){
					var x = rand(320);
					var y = rand(320)+this.y;
					var speed = this.diff;
					this.bullets.enterPlaceBullet(this,B_MEDIUM_R,0.7,this.x,this.y,x,y,speed);
				}
			}
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//Turret（汎用砲台）
	//////////////////////////////////////////////////////////////////////////////
	'Turret1_init':function(){
		this.collision = false;
		this.count = sec(0.5);
	},
	'Turret1':function(){
		if( this.count == 0 ){
			for( var i = 0; i < this.diff; i++ ){
				var num = (this.diff>2)?this.diff*3:3;
				this.bullets.enterTargetBullet(this,B_THIN,1.0,this.x,this.y,this.player,3*this.spd,0,i*this.spw*2);
			}
			this.count = sec(2/this.diff);
		}
		//自機の方向を向く
		var ax = this.x - this.player.x;
		var ay = this.y - this.player.y;
		var rad = Math.atan2( ay, ax );
		var deg = ~~( rad * 180 / 3.14159);
		this.sprite.rotation = deg+90;

		this.count--;
	},
	//////////////////////////////////////////////////////////////////////////////
	//ItemCarrier
	//////////////////////////////////////////////////////////////////////////////
	'Carrier_init':function(){
		this.phase = 0;
		this.tl.moveBy(0,200,sec(3)).then(function(){this.phase=0;}).delay(sec(7)).moveBy(0,300,sec(4));
		this.obj1 = this.manager.enterEnemy(this,'Turret1',0,-20,0);
	},
	'Carrier':function(){
		if( this.obj1 ){
			this.obj1.x = this.x;
			this.obj1.y = this.y;
		}
	},
	'Carrier_dead':function(){
		if( this.item == 0 ){
			this.manager.enterEnemy(null,'Item_Bit',this.x,this.y,0);
		}else if( this.item == 1 ){
			this.manager.enterEnemy(null,'Item_Power',this.x,this.y,0);
		}else if( this.item == 2 ){
			var e = this.manager.enterEnemy(null,'Item_Bomb',this.x,this.y,0);
			e.sprite.frame = 1;
		}else if( this.item == 3 ){
			var e = this.manager.enterEnemy(null,'Item_1up',this.x,this.y,0);
			e.sprite.frame = 2;
		}
		this.deadDefault();
		if( this.obj1 )this.obj1.release();
	},

	//////////////////////////////////////////////////////////////////////////////
	//Item
	//////////////////////////////////////////////////////////////////////////////
	'Item_init':function(){
		this.sprite.scaleX = this.sprite.scaleY = 1.5;
		var x = this.x;
		var y = this.y;
		for( var i = 0; i < 5; i++ ){
			var dis = rand(50)+50;
			var rad = rand(360)*toRad;
			x = x+Math.sin(rad)*dis;
			y = y+Math.cos(rad)*dis;
			if( x < 16 || y < 16 || x > 300 || y > 300 ){
				i--;
				continue;
			}
			this.tl.moveTo(x,y,sec(3),enchant.Easing.SIN_EASEOUT);
		}
		this.tl.moveBy(0,400,sec(5),enchant.Easing.SIN_EASEOUT);

		//アノテーション
		this.obj1 = this.manager.effects.enterEffect(this,'item_ant',70*0.7,-20*0.7,0,0,1,0,0,0,funcItem);
		this.obj1.sprite.scaleX = this.obj1.sprite.scaleY = 0.7;
		this.obj1.sprite.frame = 8;
	},
	'Item':function(){
		if( this.name == 'Item_Bit' ){
			if( this.time % this.spw == 0 ){
				this.sprite.frame++;
				if( this.sprite.frame == 4 )this.sprite.frame = 0;
			}
		}
	},
	'Item_release':function(){
		if( this.obj1 )this.obj1.release();
		this.releaseDefault();
	},
	//////////////////////////////////////////////////////////////////////////////
	//Rock
	//////////////////////////////////////////////////////////////////////////////
	'Rock1_init':function(){
		this.speed = (rand(5)+1)*this.spd;
		
	},
	'Rock1':function(){
	},
	'Rock1_release':function(){
		var num = rand(3)+1;
		for( var i = 0; i < num; i++ ){
		}
	},
};

//ヘリローターアニメーション用
var funcRoter = function(){
	if( this.time % Math.round(this.wait/this.spd) == 0 )this.sprite.frame++;
	if( this.sprite.frame >= this.frameMax ){
		this.sprite.frame = this.frameStart;
	}
}

//アイテムアノテーション用
var funcItem = function(){
	if( this.time % sec(0.5) == 0 )this.sprite.frame++;
	if( this.sprite.frame >= this.frameMax ){
		this.sprite.frame = this.frameStart;
	}
}

//////////////////////////////////////////////////////////////////////////////
//雑用
//////////////////////////////////////////////////////////////////////////////

var movTable1 = {
	0: {time:  0, x:   0, y:   0},
	1: {time: 20, x:  60, y:  20},
	2: {time: 40, x: 100, y:  50},
	3: {time: 60, x: 130, y:  90},
	4: {time: 80, x: 200, y:  80},
	5: {time:100, x: 260, y:  60},
	6: {time:120, x: 400, y:  20},
};

/*
線形補完
pointDat:x,yのプロパティを持つ配列
n:始点(0～)
time:始点から次の点までと1.0とした場合の現在地
xy:答え（配列）0=x,1=y

@example:
var pointData = {
 0:{x:1094,y:1056 },
 1:{x:1054,y:1068 },
 2:{x:1048,y:1040 },
}
var xy = new Array(2);
LinerComplement(pointData,0,0.5,xy);
*/

var LinearComplement = function(points,n,time,xy){
	if( n < 0 )n=0;
	if( time < 0.0 ){
		xy[0] = points[n].x;
		xy[1] = points[n].y;
		return;
	}
	if( time > 1.0 ){
		xy[0] = points[n+1].x;
		xy[1] = points[n+1].y;
		return;
	}
	xy[0] = points[n].x*(1-time)+points[n+1].x*time;
	xy[1] = points[n].y*(1-time)+points[n+1].y*time;
	return;
}

