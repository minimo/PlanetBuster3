/*

	PlanetBuster2
	Boss Data
	2012/08/01
	This program is MIT lisence.

*/

//////////////////////////////////////////////////////////////////////////////
//ボスデータ
//file			画像ファイル
//width,heigh	画像サイズ
//colx,coly		当たり判定位置
//colw,colh		画像サイズ
//point			得点
//def			耐久力
//burn			破壊パターン	0:小 1:中 2:大 3:以上:爆発エフェクト数
//type			敵タイプ		0:アイテム 1:小型 2:中型１ 3:中型２ 4:大型 5:中ボス 6:ステージボス
//				アイテムの場合  0:power 1:bomb 2:1up
//ground		地上物フラグ	ture or false
//layer			追加対象レイヤ	0-2　0が一番下となる undefined時は1
//////////////////////////////////////////////////////////////////////////////
var bossData = {
'ThorHammer':	{file: 'media/boss1a.png',	w: 96, h:192, colx:  8, coly:  8, colw: 80, colh:176, point:20000, def: 4000, burn:20, type: 5, ground:true },
'Garuda':		{file: 'media/boss1b.png',	w:296, h: 80, colx:114, coly:  0, colw: 70, colh: 80, point:50000, def:15000, burn:30, type: 6, ground:false },
'MotherCrow':	{file: 'media/boss2a.png',	w:114, h: 64, colx:  0, coly:  0, colw:114, colh: 64, point:20000, def: 5000, burn:20, type: 5, ground:false },
'SkyBreaker':	{file: 'media/boss2b.png',	w:280, h:112, colx: 56, coly: 24, colw:166, colh: 62, point:50000, def:40000, burn:20, type: 6, ground:false },
'GateKeeper':	{file: 'media/boss3a.png',	w:176, h:176, colx:  0, coly:  0, colw:174, colh: 20, point:30000, def:15000, burn:40, type: 5, ground:false },
'Gurdian':		{file: 'media/boss3b.png',	w:152, h:120, colx: 44, coly: 30, colw: 64, colh: 60, point:30000, def:10000, burn:40, type: 5, ground:false },
'Goriate':		{file: 'media/boss3c.png',	w: 64, h: 80, colx:  0, coly:  0, colw: 64, colh: 80, point:30000, def:25000, burn:40, type: 6, ground:false },

//付属物
'TH_turret':	{file: 'media/boss1a_turret.png',	w: 32, h: 32, colx:  0, coly:  0, colw: 32, colh: 32, point:00000, def: 1000, burn: 1, type: 5, ground:true },

'Garuda_hatch':	{file: 'media/boss1b_hatch.png',	w: 16, h: 16, colx:  0, coly:  0, colw: 16, colh: 16, point:15000, def: 4000, burn: 4, type: 2, ground:false },

'MC_wing':		{file: 'media/boss2a_wing.png',		w: 64, h: 64, colx:  0, coly:  0, colw: 32, colh: 32, point: 1000, def: 1000, burn: 1, type: 2, ground:false },
'MC_turret':	{file: 'media/boss2a_turret.png',	w: 32, h: 32, colx:  0, coly:  0, colw: 32, colh: 32, point: 1000, def: 1000, burn: 1, type: 2, ground:false },
'MC_bit':		{file: 'media/enemy10.png',			w: 32, h: 24, colx:  4, coly:  0, colw: 24, colh: 32, point: 5000, def:  100, burn: 2, type: 2, ground:false },

'SB_shoulder':	{file: 'media/boss2b_shoulder.png',	w: 56, h: 64, colx:  0, coly:  0, colw: 56, colh: 64, point:20000, def: 4000, burn:10, type: 2, ground:false },
'SB_gun':		{file: 'media/boss2b_gun.png',		w: 16, h: 32, colx:  0, coly:  0, colw: 16, colh: 32, point: 5000, def: 1000, burn: 6, type: 2, ground:false },
'SB_hatch':		{file: 'media/boss2b_hatch.png',	w: 32, h: 32, colx:  0, coly:  0, colw: 32, colh: 32, point: 1000, def: 1000, burn: 6, type: 2, ground:false },
'SB_bit':		{file: 'media/enemy10.png',			w: 32, h: 24, colx:  4, coly:  0, colw: 24, colh: 32, point:  500, def:  200, burn: 2, type: 2, ground:false },

'GK_front':		{file: 'media/boss3a_front.png',	w:144, h: 72, colx:  0, coly:  0, colw:144, colh: 47, point:10000, def: 3000, burn:20, type: 2, ground:false },
'GK_cover':		{file: 'media/boss3a_cover.png',	w: 40, h: 64, colx:  0, coly:  0, colw: 40, colh: 64, point:25000, def: 3000, burn:20, type: 2, ground:false },
'GK_launcher':	{file: 'media/boss3a_launcher.png',	w: 48, h: 40, colx:  0, coly:  0, colw: 48, colh: 40, point:20000, def: 3000, burn:20, type: 2, ground:false },

'GD_front':		{file: 'media/boss3b_front.png',	w: 80, h: 64, colx:  0, coly:  0, colw: 80, colh: 64, point: 5000, def: 3000, burn:20, type: 2, ground:false },
'GD_turretL':	{file: 'media/boss3b_turretL.png',	w: 24, h: 24, colx:  0, coly:  0, colw: 24, colh: 24, point:    0, def: 1000, burn: 1, type: 2, ground:false },
'GD_turretR':	{file: 'media/boss3b_turretR.png',	w: 24, h: 24, colx:  0, coly:  0, colw: 24, colh: 24, point:    0, def: 1000, burn: 1, type: 2, ground:false },
'GD_wingL':		{file: 'media/boss3b_wingL.png',	w: 88, h: 48, colx:  0, coly:  0, colw: 88, colh: 48, point:10000, def: 3000, burn:20, type: 2, ground:false },
'GD_wingR':		{file: 'media/boss3b_wingR.png',	w: 88, h: 48, colx:  0, coly:  0, colw: 88, colh: 48, point:10000, def: 3000, burn:20, type: 2, ground:false },

'GR_engine':	{file: 'media/boss3c_engine.png',	w: 56, h:200, colx:  0, coly:  0, colw: 56, colh:200, point:10000, def: 7000, burn:25, type: 2, ground:false },
'GR_hatch':		{file: 'media/boss3c_hatch.png',	w: 16, h: 16, colx:  0, coly:  0, colw: 16, colh: 16, point:10000, def: 1000, burn:10, type: 2, ground:false },
'GR_turret':	{file: 'media/boss3c_turret.png',	w: 48, h: 48, colx:  0, coly:  0, colw: 48, colh: 48, point:10000, def: 1000, burn:10, type: 2, ground:false },
'GR_wing':		{file: 'media/boss3c_wing.png',		w: 16, h:112, colx:  0, coly:  0, colw: 16, colh:112, point:10000, def: 3000, burn:10, type: 2, ground:false },
'GR_bit':		{file: 'media/enemy10.png',			w: 32, h: 24, colx:  4, coly:  0, colw: 24, colh: 32, point:  500, def:  500, burn: 2, type: 2, ground:false },
}

//////////////////////////////////////////////////////////////////////////////
//ボスアルゴリズム
//添字が敵機名称
//'_init'を付けると初期化処理
//'_dead'を付けると死亡処理
//'_release'を付けると解放処理
//////////////////////////////////////////////////////////////////////////////
var bossAlgorithm = {
	//////////////////////////////////////////////////////////////////////////////
	//ThorHammer
	//////////////////////////////////////////////////////////////////////////////
	'ThorHammer_init':function(){
		this.x = this.manager.bg.layer1.x+360;
		this.y = 320;
		this.phase = 0;
		this.collision = false;
		this.rad = 3.14/2;
		//砲台追加
		this.obj1 = this.manager.enterEnemy(this,'TH_turret',0,-45,0);
	},
	'ThorHammer':function(){
		//出現
		if( this.phase == 0 ){
			this.y-=6*this.spd;
			if( this.y < -200 ){
				this.collision = true;
				this.phase++;
				if( this.obj1 ){
					this.obj1.phase = 1;
					this.obj1.count = 0;
				}
			}
		}
		//降りてくる
		if( this.phase == 1 ){
			this.y+=this.spd*2;
			if( this.y > 100 )this.phase++;
		}
		//攻撃しまくり
		if( this.phase == 2 ){
			if( this.time % this.spw == 0 ){
				var sin = Math.sin(this.rad);
				this.manager.bg.layer1.x += sin;
				this.manager.bg.layer2.x += sin;
				this.rad+=0.05;
			}
		}
		//逃亡
		if( this.phase == 3 ){
			this.y-=2*this.spd;
			if( this.y < -300 ){
				if( this.obj1 )this.obj1.release();			
				this.release();
				return;
			}
		}
		this.x = this.manager.bg.layer1.x+360;

		//攻撃パターン
		if( this.phase == 1 && this.time % sec(0.5) == 0 ){
			var num = (this.diff>2)?this.diff*3:3;
//			this.bullets.enterNWayBullet(this,B_MEDIUM_R,1.0,this.x,this.y+20,this.x,this.y+100,20,num,3*this.spd);
		}
		if( this.phase == 2 && this.time % sec(0.5/this.diff) == 0 ){
			var num = (this.diff<=2)?5:this.diff+5;
			this.bullets.enterNWayBullet(this,B_MEDIUM_B,1.0,this.x-30,this.y,this.x-80,this.y+20,15,num,2*this.spd);
			this.bullets.enterNWayBullet(this,B_MEDIUM_B,1.0,this.x+30,this.y,this.x+80,this.y+20,15,num,2*this.spd);
		}

		//一定時間経過で逃げる
		if( this.phase == 2 && this.time > sec(20) ){
			this.phase++;
		}

		//架線エフェクト
		var dice = rand(20);
		if( dice == 10 ){
			this.manager.effects.enterEffect(null,'spark',this.x-25,this.y+108);
			this.manager.effects.enterEffect(null,'spark',this.x+25,this.y+108);
		}
	},
	'ThorHammer_dead':function(){
		var e = this.manager.effects.enterEffect(null,'ThorHammer',this.x,this.y,0,0,1,0,0,0,funcBreak);
		e.tl.moveBy(0,200,sec(5),enchant.Easing.SIN_EASEIN);
		e.bullets = this.manager.bullets;
		if( this.obj1 )this.obj1.dead();
		this.deadDefault();
	},
	'TH_turret_init':function(){
		this.phase = 0;
		this.collision = false;
	},
	'TH_turret':function(){
		if( this.phase == 1 && this.count == 0 ){
			for( var i = 0; i < this.diff; i++ ){
				var num = (this.diff>2)?this.diff*3:3;
				this.bullets.enterNWayBullet(this,B_MEDIUM_R,1.5,this.x,this.y,this.player.x,this.player.y,30,num,3*this.spd,0,i*this.spw*2);
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
	//Garuda
	//////////////////////////////////////////////////////////////////////////////
	'Garuda_init':function(){
		this.x = 160;
		this.y = 90;
		this.collision = false;
		this.sprite.opacity = 0;
		this.rad = 0;
		this.phase = 0;
		this.interval = sec(3);	//攻撃までの間隔
		this.loop = 0;	//攻撃ループの回数

		this.obj1 = this.manager.enterEnemy(this,'Garuda_hatch',-61,0,0,false);
		this.obj2 = this.manager.enterEnemy(this,'Garuda_hatch',+62,0,0,false);
		this.obj1.sprite.opacity = 0;
		this.obj2.sprite.opacity = 0;
	},
	'Garuda':function(){
		//出現フェーズ
		if( this.phase == 0 ){
			if( this.time % sec(0.1) == 0 ){
				for( var i = 0; i < 30; i++ ){
					var x = this.x+rand(this.sprite.width)-this.sprite.width/2;
					var y = this.y+rand(this.sprite.height)-this.sprite.height/2;
					var r = rand(5);
					var e = this.manager.effects.enterEffect(null,'smoke3',x,y,0,7*this.spd+r);
				}
			}
			if( this.time == sec(2) ){
				this.collision = true;
				this.obj1.collision = true;
				this.obj2.collision = true;
				this.sprite.tl.fadeIn(sec(0.5));
				this.obj1.sprite.tl.fadeIn(sec(0.5));
				this.obj2.sprite.tl.fadeIn(sec(0.5));
				this.tl.moveBy(0,-30,sec(1),enchant.Easing.SIN_EASEIN);
				this.phase++;
				this.rad = 0;
				this.interval = sec(9);
			}
		}

		//なんとなく攻撃フェーズ
		if( this.phase == 1 ){
			if( this.time % this.spw*6 == 0 ){
				this.y += Math.sin(this.rad);
				this.rad+=0.05;
			}
			//自機狙い針弾
			if( this.time % sec(4) == 0 ){
				for( var i = 0; i < this.diff*2; i++ ){
					this.bullets.enterTargetBullet(this,B_THIN,1.0,this.x-145,this.y+22,this.player,3*this.spd,0,this.spw*3*i);
					this.bullets.enterTargetBullet(this,B_THIN,1.0,this.x+145,this.y+22,this.player,3*this.spd,0,this.spw*3*i);
				}
			}
			//拡散弾
			if( this.time % sec(3) == 0 ){
				var deg = ~~(60/this.diff);
				var num = 3+this.diff*2;
				this.bullets.enterNWayBullet(this,B_MEDIUM_B,1.0,this.x,this.y+5,this.x,this.y+100,deg,num+0,2*this.spd,0,0);
				this.bullets.enterNWayBullet(this,B_MEDIUM_B,1.0,this.x,this.y+5,this.x,this.y+100,deg,num+0,2*this.spd,0,sec(0.2));
				this.bullets.enterNWayBullet(this,B_MEDIUM_B,1.5,this.x,this.y+5,this.x,this.y+100,deg,num+1,3*this.spd,0,sec(0.5));
			}
			this.interval--;
			if( this.interval == 0 )this.phase++;
		}

		//中心へ移動		
		if( this.phase == 2 ){
			this.tl.moveTo(160,90,sec(3)).then(function(){this.phase++;});
			this.phase++;
			this.interval = sec(8);
			if( this.obj1 ){
				this.obj1.tl.clear();
				this.obj1.tl.then(function(){this.sprite.frame++;if(this.sprite.frame==4)this.sprite.frame=3;}).delay(this.spw*2).loop();
			}
			if( this.obj2 ){
				this.obj2.tl.clear();
				this.obj2.tl.then(function(){this.sprite.frame++;if(this.sprite.frame==4)this.sprite.frame=3;}).delay(this.spw*2).loop();
			}
		}

		//移動中
		if( this.phase == 3 ){}
		//攻撃パターン２
		if( this.phase == 4 ){
			//針弾螺旋撒き
			var deg = 6.28/(this.diff*10);
			var rad = 0;
			for( var i = 0; i < this.diff*15; i++ ){
				var x1 = this.x + Math.sin(rad)*10-62;
				var x2 = this.x + Math.sin(rad)*-10+62;
				var y  = this.y + Math.cos(rad)*10+5;
				rad+=deg;
				if( this.obj1 ){
					this.bullets.enterPlaceBullet(this,B_THIN,1.0,this.x-62,this.y+5,x1,y,10*this.spd,0.8,i*this.spw);
				}
				if( this.obj2 ){
					this.bullets.enterPlaceBullet(this,B_THIN,1.0,this.x+62,this.y+5,x2,y,10*this.spd,0.8,i*this.spw);
				}
			}
//			this.bullets.enterNWayBullet(this,B_MEDIUM_R,1.0,this.x+62,this.y+5,this.x+62,this.y+100,5,num,2*this.spd,0,0);
//			this.bullets.enterNWayBullet(this,B_MEDIUM_B,1.0,this.x+62,this.y+5,this.x+62,this.y+100,5,num+1,2*this.spd,0,sec(0.5));
			this.phase++;
			this.tl.delay(sec(4)).moveBy(0,-30,sec(1),enchant.Easing.SIN_EASEIN).then(function(){this.phase++;});
		}
		//待機中
		if( this.phase == 5 ){}
		//最初に戻る
		if( this.phase == 6 ){
			this.phase = 1;
			this.rad = 0;
			this.interval = sec(9);
			if( this.obj1 ){
				this.obj1.tl.clear();
				this.obj1.tl.then(function(){this.sprite.frame--;if(this.sprite.frame<0)this.sprite.frame=0;}).delay(this.spw*2).loop();
			}
			if( this.obj2 ){
				this.obj2.tl.clear();
				this.obj2.tl.then(function(){this.sprite.frame--;if(this.sprite.frame<0)this.sprite.frame=0;}).delay(this.spw*2).loop();
			}
		}

		//発狂モード
		if( this.phase == 10 ){
			if( this.time % sec(1/this.diff) == 0 ){
				var rad = this.rad;
				var x = this.x;
				var y = this.y+22;
				var tx = Math.sin( rad )*320;
				var ty = Math.cos( rad )*320;
				this.bullets.enterPlaceBullet(this,B_THIN,1,x+145,y,x+145+tx,y+ty,3*this.spd,0,0);
				this.bullets.enterPlaceBullet(this,B_THIN,1,x-145,y,x-145-tx,y+ty,3*this.spd,0,0);
				rad+=1.57;
				tx = Math.sin( rad )*320;
				ty = Math.cos( rad )*320;
				this.bullets.enterPlaceBullet(this,B_THIN,1,x+145,y,x+145+tx,y+ty,3*this.spd,0,0);
				this.bullets.enterPlaceBullet(this,B_THIN,1,x-145,y,x-145-tx,y+ty,3*this.spd,0,0);
				rad+=1.57;
				tx = Math.sin( rad )*320;
				ty = Math.cos( rad )*320;
				this.bullets.enterPlaceBullet(this,B_THIN,1,x+145,y,x+145+tx,y+ty,3*this.spd,0,0);
				this.bullets.enterPlaceBullet(this,B_THIN,1,x-145,y,x-145-tx,y+ty,3*this.spd,0,0);
				rad+=1.57;
				tx = Math.sin( rad )*320;
				ty = Math.cos( rad )*320;
				this.bullets.enterPlaceBullet(this,B_THIN,1,x+145,y,x+145+tx,y+ty,3*this.spd,0,0);
				this.bullets.enterPlaceBullet(this,B_THIN,1,x-145,y,x-145-tx,y+ty,3*this.spd,0,0);
				this.rad+=0.1;
			}
			if( this.time % sec(3/this.diff) == 0 ){
				var deg = ~~(40/this.diff);
				var num = 3+this.diff*2;
				this.bullets.enterNWayBullet(this,B_MEDIUM_B,1.0,this.x,this.y+5,this.x,this.y+100,deg,num+0,3*this.spd,0,0);
				this.bullets.enterNWayBullet(this,B_MEDIUM_B,1.0,this.x,this.y+5,this.x,this.y+100,deg,num+0,3*this.spd,0,sec(0.2));
				this.bullets.enterNWayBullet(this,B_MEDIUM_B,1.5,this.x,this.y+5,this.x,this.y+100,deg,num+1,4*this.spd,0,sec(0.5));
			}
		}

		//アクセサリ
		if( this.obj1 && this.obj1.def == 0 )this.obj1 = null;
		if( this.obj2 && this.obj2.def == 0 )this.obj2 = null;


		//発狂モード移行
		if( !this.obj1 && !this.obj2 && this.phase < 10 ){
			this.phase = 10;
			this.rad = 0;
			this.tl.clear().moveTo(160,90,sec(2));
		}
	},
	'Garuda_dead':function(){
		var e = this.manager.effects.enterEffect(null,'Garuda',this.x,this.y,0,0,1,0,0,0,funcBreak2);
		e.tl.moveBy(0,50,sec(5),enchant.Easing.SIN_EASEIN);
		e.bullets = this.manager.bullets;
		if( this.obj1 ){
			this.obj1.tl.clear();
			this.obj1.release();
			delete this.obj1;
		}
		if( this.obj2 ){
			this.obj2.tl.clear();
			this.obj2.release();
			delete this.obj1;
		}
		this.deadDefault();
	},

	//////////////////////////////////////////////////////////////////////////////
	//MotherCrow
	//phase
	//0:出現
	//1:ビット放出
	//2:旋回移動
	//////////////////////////////////////////////////////////////////////////////
	'MotherCrow_init':function(){
		this.collision = false;
		this.phase = 0;
		this.x = 420;
		this.y = 300;
		this.tl.moveTo(160,50,sec(2),enchant.Easing.QUINT_EASEOUT);
//		this.tl.moveTo(160,50,sec(2),enchant.Easing.CUBIC_EASEINOUT);
		this.tl.then(function(){this.phase++;});

		this.obj1 = this.manager.enterEnemy(this,'MC_wing',-33,0,0);
		this.obj2 = this.manager.enterEnemy(this,'MC_wing',+63,0,0);
		this.obj2.sprite.frame = 1;

		//砲台
		this.obj3 = this.manager.enterEnemy(this,'MC_turret',15,-5,0,false);
	},
	'MotherCrow':function(){
		//出現フェーズ
		if( this.phase == 1 ){
			//ビット放出
			this.bits = {};
			for(var i = 0; i < this.diff*7; i++ ){
				this.bits[i] = this.manager.enterEnemy(null,'MC_bit',this.x,this.y,0);
			}
			this.collision = true;
			this.phase++;
			this.rad = 0;
			this.deg = toRad*this.spd;
			this.obj3.phase++;
		}
		//旋回移動
		if( this.phase == 2 ){
			if( this.time % this.spw*3 == 0 ){
				var sin = Math.sin(this.rad);
				var cos = Math.cos(this.rad);
				this.x = sin*30+160;
				this.y = cos*20+30;
				this.rad+=this.deg;
			}
		}
		//ビット放出
		if( this.phase > 1 ){
			//ビット存在チェック
			for( var i = 0; i < this.diff*7; i++ ){
				if( this.bits[i] && this.bits[i].def <= 0 ){
					this.bits[i] = null;
				}
			}
			//一定時間で再度ビット放出
			if( this.time % sec(15) == 0 ){
				delete this.bits;
				this.bits = {};
				for(var i = 0; i < this.diff*5; i++ ){
					this.bits[i] = this.manager.enterEnemy(null,'MC_bit',this.x,this.y,0);
				}
			}
		}
	},
	'MotherCrow_dead':function(){
		var e = this.manager.effects.enterEffect(null,'MotherCrow',this.x,this.y,0,0,1,0,0,0,funcBreak);
		e.tl.moveBy(0,50,sec(5),enchant.Easing.SIN_EASEIN);
		e.bullets = this.manager.bullets;
		if( this.obj1 ){
			this.obj1.tl.clear();
			this.obj1.release();
			delete this.obj1;
		}
		if( this.obj2 ){
			this.obj2.tl.clear();
			this.obj2.release();
			delete this.obj1;
		}
		if( this.obj3 ){
			this.obj3.tl.clear();
			this.obj3.release();
			delete this.obj3;
		}
		//ビット破壊
		for(var i = 0; i < this.diff*5; i++ ){
			if( this.bits[i] )this.bits[i].def = 0;
		}
		this.bits = null;
		delete this.bits;
		this.deadDefault();
	},
	'MC_turret':function(){

		//自機の方向を向く
		var ax = this.x - this.player.x;
		var ay = this.y - this.player.y;
		var rad = Math.atan2( ay, ax );
		var deg = ~~( rad * 180 / 3.14159);
		this.sprite.rotation = deg-90;

		if( this.time % sec(5) == 0 ){
			var x = this.player.x;
			var y = this.player.y;
			//大玉
			for( var i = 0; i < this.diff*2; i++ ){
				var px = x+rand(40)-20;
				var py = y+rand(40)-20;
				var t = rand(10);
				this.bullets.enterPlaceBullet(this,B_MEDIUM_R,2.0,this.x,this.y,px,py,12*this.spd,Math.pow(0.9,this.spd),t);
			}
			//小玉
			for( var i = 0; i < this.diff*5; i++ ){
				var px = x+rand(70)-35;
				var py = y+rand(70)-35;
				var t = rand(10);
				this.bullets.enterPlaceBullet(this,B_MEDIUM_B,1.0,this.x,this.y,px,py,12*this.spd,Math.pow(0.9,this.spd),t);
			}
		}
	},
	'MC_bit_init':function(){
		var x = rand(280)+20;
		var y = rand(50)+20;
		this.tl.moveTo(x,y,sec(1),enchant.Easing.QUINT_EASEOUT);
		this.tl.then(function(){this.phase++;});

		for( var i = 0; i < 5; i++ ){
			var x = rand(280)+20;
			var y = rand(160)+20;
			this.tl.moveTo(x,y,sec(1),enchant.Easing.QUINT_EASEOUT).then(function(){this.attack=true;}).delay(sec(1));
		}
		this.tl.then(function(){this.def=0;});	//一定時間で自爆
		this.attack = false;
	},
	'MC_bit':function(){
		if( this.phase == 1 ){
			this.attack=true;
			this.phase++;
		}
		if( this.phase == 2 ){
			if( this.time % this.spw*2 == 0 ){
				this.sprite.frame++;
				if( this.sprite.frame == 3 ){
					this.phase++;
				}
			}
		}
		if( this.phase == 3 ){
			if( this.time % this.spw*2 == 0 ){
				this.sprite.frame++;
				if( this.sprite.frame == 7 )this.sprite.frame = 3;
			}
		}
		//自機の方向を向く
		var ax = this.x - this.player.x;
		var ay = this.y - this.player.y;
		var rad = Math.atan2( ay, ax );
		var deg = ~~( rad * 180 / 3.14159);
		this.sprite.rotation = deg+90;

		//攻撃
		if( this.attack ){
			for( var i = 0; i < this.diff*2; i++ ){
				this.bullets.enterTargetBullet(this,B_MEDIUM,0.7,this.x,this.y,this.player,3*this.spd,0,this.spw*3*i);
			}
			this.attack = false;
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//SkyBreaker
	//phase
	//0:待機
	//1:初期設定
	//2:旋回移動
	//3:螺旋撒き
	//4:待機
	//5:旋回移動
	//6:nWay弾
	//7:待機>2へ
	//10:待機
	//11:旋回移動
	//12:ビット展開
	//13:待機
	//14:旋回移動
	//15:
	//16:待機>10へ
	//////////////////////////////////////////////////////////////////////////////
	'SkyBreaker_init':function(){
		this.collision = false;
		this.phase = 0;
		this.phase2 = 0;
		this.hatchopen = false;
		this.x = 160;
		this.y = -120;
		this.bits = null;

		//破壊躯体
		this.obj1 = this.manager.effects.enterEffect(this,'SkyBreaker',0,0,0,0,1,0,0,0,function(){});

		//ローター
		this.obj2 = this.manager.effects.enterEffect(this,'roterB1',-68,0,0,0,1,0,0,0,funcRoter);
		this.obj3 = this.manager.effects.enterEffect(this,'roterB2', 68,0,0,0,1,0,0,0,funcRoter);

		//ハッチ
		this.obj4 = this.manager.enterEnemy(this,'SB_hatch',0,0,0,false);

		//両肩
		this.obj5 = this.manager.enterEnemy(this,'SB_shoulder',-110,-16,0);
		this.obj6 = this.manager.enterEnemy(this,'SB_shoulder', 110,-16,0);
		this.obj6.sprite.frame = 1;

		//機銃
		this.gun1 = this.manager.enterEnemy(this,'SB_gun',-115,25,0);
		this.gun2 = this.manager.enterEnemy(this,'SB_gun', 115,25,0);
		this.gun1.attack = false;
		this.gun2.attack = false;

		//登場パターン
		this.tl.moveTo(160,80,sec(4)).delay(sec(0.5)).then(function(){this.phase++;});
	},
	'SkyBreaker':function(){
		if( this.phase == 1 ){
			this.collision = true;
			this.phase++;
			this.rad = 0;
			this.deg = toRad*this.spd;
		}

		//旋回移動フェーズ
		if( this.phase == 2 || this.phase == 5 || this.phase == 11 || this.phase == 14 ){
			if( this.time % this.spw*3 == 0 ){
				var sin = Math.sin(this.rad);
				var cos = Math.cos(this.rad);
				this.x = sin*50+160;
				this.y = cos*20+60;
				this.rad+=this.deg*3;
				if( this.rad > 3.14*2 ){
					this.phase++;
				}
			}
			if( this.time % sec(1.5) == 0 ){
				var num = 6+this.diff;
				this.bullets.enterCircleBullet(this,B_ROLL,1.0,this.x-68,this.y,this.x-68,this.y+10,num,this.spd,0,0);
				this.bullets.enterCircleBullet(this,B_ROLL,1.0,this.x+68,this.y,this.x+68,this.y+10,num,this.spd,0,0);
			}
		}

		//螺旋撒き
		if( this.phase == 3 ){
			var rad = 0;
			for( var i = 0; i < this.diff*10; i++ ){
				var rad2 = rad;
				var dl = i*this.spw*2+sec(2);
				var x = this.x+Math.sin(rad2)*10;
				var y = this.y+Math.cos(rad2)*10;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_R,1.0,this.x,this.y,x,y,3*this.spd,0,dl);
				rad2+=toRad*90;
				x = this.x+Math.sin(rad2)*10;
				y = this.y+Math.cos(rad2)*10;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_B,1.0,this.x,this.y,x,y,3*this.spd,0,dl);
				rad2+=toRad*90;
				x = this.x+Math.sin(rad2)*10;
				y = this.y+Math.cos(rad2)*10;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_R,1.0,this.x,this.y,x,y,3*this.spd,0,dl);
				rad2+=toRad*90;
				x = this.x+Math.sin(rad2)*10;
				y = this.y+Math.cos(rad2)*10;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_B,1.0,this.x,this.y,x,y,3*this.spd,0,dl);
				rad+=toRad*5;
			}
			this.hatchopen = true;
			this.phase++;
			this.rad = 0;
			var s = this.diff*10*this.spw*2+sec(2);
			this.tl.delay(s).then(function(){this.phase++;this.hatchopen=false;});
		}
		//ｎＷａｙ弾
		if( this.phase == 6 ){
			for( var i = 0; i < this.diff*5; i++ ){
				var num = 6;
				var dl = i*this.spw+sec(2);
				this.bullets.enterNWayBullet(this,B_MEDIUM_R,1.0,this.x,this.y,this.player.x,this.player.y,20,num,3*this.spd,0,dl);
			}
			for( var i = 0; i < this.diff*5; i++ ){
				var num = 7;
				var dl = i*this.spw+sec(3);
				this.bullets.enterNWayBullet(this,B_MEDIUM_B,1.0,this.x,this.y,this.player.x,this.player.y,30,num,4*this.spd,0,dl);
			}
			this.hatchopen = true;
			this.phase++;
			this.rad = 0;
			this.tl.delay(sec(4)).then(function(){this.phase=2;this.hatchopen=false;});
		}

		//肩パーツ破壊
		if( this.obj5 && this.obj5.def <= 0 )this.obj5 = null;
		if( this.obj6 && this.obj6.def <= 0 )this.obj6 = null;

		//耐久力が５割以下になったら別フェーズへ移行
		if( this.def < this.defMax*0.5 && this.phase < 10 && this.phase != 0 ){
			this.explode(30);
			this.tl.clear();
			this.tl.moveBy(0,-30,sec(1),enchant.Easing.CIRC_EASEOUT).moveTo(160,80,sec(2)).then(function(){this.phase++;});
			this.phase = 10;
			this.rad = 0;
			this.sprite.frame = 1;
			this.bullets.erase();
		}

		//ビット放出
		if( this.phase == 12 ){
			this.bits = {};
			for(var i = 0; i < this.diff*7; i++ ){
				this.bits[i] = this.manager.enterEnemy(null,'SB_bit',this.x,this.y,0);
			}
			this.hatchopen = true;
			this.collision = true;
			this.phase++;
			this.rad = 0;
			this.tl.delay(sec(2)).then(function(){this.hatchopen=false;});
			this.tl.delay(sec(8)).then(function(){this.phase++;});
		}

		//螺旋撒き＋α
		if( this.phase == 15 ){
			var rad = 0;
			for( var i = 0; i < this.diff*13; i++ ){
				var rad2 = rad;
				var dl = i*this.spw*2+sec(2);
				var x = this.x+Math.sin(rad2)*10-68;
				var y = this.y+Math.cos(rad2)*10+10;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_R,1.0,this.x-68,this.y+10,x,y,3*this.spd,0,dl);
				rad2+=toRad*90;
				x = this.x+Math.sin(rad2)*10-68;
				y = this.y+Math.cos(rad2)*10+10;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_B,1.0,this.x-68,this.y+10,x,y,3*this.spd,0,dl);
				rad2+=toRad*90;
				x = this.x+Math.sin(rad2)*10-68;
				y = this.y+Math.cos(rad2)*10+10;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_R,1.0,this.x-68,this.y+10,x,y,3*this.spd,0,dl);
				rad2+=toRad*90;
				x = this.x+Math.sin(rad2)*10-68;
				y = this.y+Math.cos(rad2)*10+10;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_B,1.0,this.x-68,this.y+10,x,y,3*this.spd,0,dl);
				if( i > 8 )rad+=toRad*10;
			}
			rad = 0;
			for( var i = 0; i < this.diff*13; i++ ){
				var rad2 = rad;
				var dl = i*this.spw*2+sec(2);
				var x = this.x+Math.sin(rad2)*10+68;
				var y = this.y+Math.cos(rad2)*10+10;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_R,1.0,this.x+68,this.y+10,x,y,3*this.spd,0,dl);
				rad2+=toRad*90;
				x = this.x+Math.sin(rad2)*10+68;
				y = this.y+Math.cos(rad2)*10+10;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_B,1.0,this.x+68,this.y+10,x,y,3*this.spd,0,dl);
				rad2+=toRad*90;
				x = this.x+Math.sin(rad2)*10+68;
				y = this.y+Math.cos(rad2)*10+10;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_R,1.0,this.x+68,this.y+10,x,y,3*this.spd,0,dl);
				rad2+=toRad*90;
				x = this.x+Math.sin(rad2)*10+68;
				y = this.y+Math.cos(rad2)*10+10;
				this.bullets.enterPlaceBullet(this,B_MEDIUM_B,1.0,this.x+68,this.y+10,x,y,3*this.spd,0,dl);
				if( i > 8 )rad-=toRad*10
			}
			this.hatchopen = true;
			this.collision = true;
			this.phase++;
			this.rad = 0;
			this.tl.delay(sec(2)).then(function(){this.hatchopen=false;});
			this.tl.delay(sec(8)).then(function(){this.phase=11;});
		}
		//ビット存在チェック
		if( this.bits ){
			for( var i = 0; i < this.diff*7; i++ ){
				if( this.bits[i] && this.bits[i].def <= 0 ){
					this.bits[i] = null;
				}
			}
		}
		//ハッチ開閉
		if( this.obj4 ){
			if( this.time % this.spw*3 == 0 ){
				if( this.hatchopen ){
					this.obj4.sprite.frame++;
					if( this.obj4.sprite.frame == 4 )this.obj4.sprite.frame = 3;
				}else{
					this.obj4.sprite.frame--;
					if( this.obj4.sprite.frame < 0 )this.obj4.sprite.frame = 0;
				}
			}
		}
		if( this.gun1 && this.gun1.def <= 0 )this.gun1 = null;
		if( this.gun2 && this.gun2.def <= 0 )this.gun2 = null;
	},
	'SkyBreaker_dead':function(){
		var e = this.manager.effects.enterEffect(null,'SkyBreaker',this.x,this.y,0,0,1,0,0,0,funcBreak2);
		e.tl.moveBy(0,10,sec(5),enchant.Easing.SIN_EASEIN);

		if( this.obj1 ){this.obj1.release();delete this.obj1;}
		if( this.obj2 ){this.obj2.release();delete this.obj2;}
		if( this.obj3 ){this.obj3.release();delete this.obj3;}
		if( this.obj4 ){this.obj4.release();delete this.obj4;}
		if( this.obj5 ){this.obj5.release();delete this.obj5;}
		if( this.obj6 ){this.obj6.release();delete this.obj6;}
		if( this.gun1 ){this.gun1.release();delete this.gun1;}
		if( this.gun2 ){this.gun2.release();delete this.gun2;}

		//ビット破壊
		if( this.bits ){
			for(var i = 0; i < this.diff*5; i++ ){
				if( this.bits[i] )this.bits[i].def = 0;
			}
			this.bits = null;
			delete this.bits;
		}
		this.deadDefault();
	},
	'SB_gun':function(){
		if( this.time % this.spw*6 == 0 ){
			this.sprite.frame++;
			if( this.sprite.frame == 3 )this.sprite.frame = 0;
		}
		if( this.attack && this.diff > 2 ){
		}
	},
	'SB_bit_init':function(){
		var x = rand(280)+20;
		var y = rand(50)+20;
		this.tl.moveTo(x,y,sec(1),enchant.Easing.QUINT_EASEOUT);
		this.tl.then(function(){this.phase++;});

		for( var i = 0; i < 5; i++ ){
			var x = rand(280)+20;
			var y = rand(160)+20;
			this.tl.moveTo(x,y,sec(1),enchant.Easing.QUINT_EASEOUT).then(function(){this.attack=true;}).delay(sec(1));
		}
		this.tl.then(function(){this.damaged(1000,false);});	//一定時間で自爆
		this.attack = false;
		this.sprite.scaleX = this.sprite.scaleY = 0.8;
	},
	'SB_bit':function(){
		if( this.phase == 1 ){
			this.attack=true;
			this.phase++;
		}
		if( this.phase == 2 ){
			if( this.time % this.spw*2 == 0 ){
				this.sprite.frame++;
				if( this.sprite.frame == 3 ){
					this.phase++;
				}
			}
		}
		if( this.phase == 3 ){
			if( this.time % this.spw*3 == 0 ){
				this.sprite.frame++;
				if( this.sprite.frame == 7 )this.sprite.frame = 3;
			}
		}
		//攻撃
		if( this.attack ){
			for( var i = 0; i < this.diff*3; i++ ){
				this.bullets.enterPlaceBullet(this,B_THIN,0.7,this.x,this.y,this.x,this.y+10,2*this.spd,0,this.spw*i);
			}
			this.attack = false;
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//GateKeeper
	//phase
	//0:出現
	//1:移動＆攻撃
	//2:ランチャー攻撃
	//////////////////////////////////////////////////////////////////////////////
	'GateKeeper_init':function(){
		this.collision = false;

		//破壊躯体
		this.obj0 = this.manager.effects.enterEffect(this,'GateKeeper',0,-15,0,0,1,0,0,0,function(){});

		//ランチャー
		this.obj1 = this.manager.enterEnemy(this,'GK_launcher',-100,-27);
		this.obj1.dir = -1;	//左側
		this.obj2 = this.manager.enterEnemy(this,'GK_launcher', 100,-27);
		this.obj2.dir = 1;	//右側

		//カバー
		this.obj3 = this.manager.enterEnemy(this,'GK_cover',-56,26);
		this.obj4 = this.manager.enterEnemy(this,'GK_cover', 56,26);

		//フロントカバー
//		this.obj5 = this.manager.enterEnemy(this,'GK_front',0,99);
//		this.obj5.collision = false;

		this.x = 160;
		this.y = 40;

		this.tl.moveBy(0,50,sec(1),enchant.Easing.SIN_EASEIN).then(function(){
			this.phase++;
			this.collision = true;
			this.obj1.collision = true;
			this.obj2.collision = true;
			this.obj3.collision = true;
			this.obj4.collision = true;
//			this.obj5.collision = true;
		});

		this.sprite.opacity = 0;
		this.sprite.tl.fadeIn(sec(1));
		this.obj1.sprite.opacity = 0;this.obj1.sprite.tl.fadeIn(sec(1));
		this.obj2.sprite.opacity = 0;this.obj2.sprite.tl.fadeIn(sec(1));
		this.obj3.sprite.opacity = 0;this.obj3.sprite.tl.fadeIn(sec(1));
		this.obj4.sprite.opacity = 0;this.obj4.sprite.tl.fadeIn(sec(1));
//		this.obj5.sprite.opacity = 0;this.obj5.sprite.tl.fadeIn(sec(1));

		this.phase = 0;
		this.rad = 0;
	},
	'GateKeeper':function(){
		if( this.phase == 1 || this.phase == 10 ){
			if( this.time % this.spw*6 == 0 ){
				this.y = 90 + Math.sin(this.rad)*5;
				this.rad+=0.05;
			}
			if( this.time % sec(3) == 0 ){
				var num = (this.diff>2)?this.diff*4:5;
				if( num % 2 == 0 )num++;
				for( var i = 0; i < diff*5; i++ ){
					var x = this.x;
					var y = this.y;
					this.bullets.enterNWayBullet(this,B_MEDIUM_R,1.2,x-75,y-50,this.player.x,this.player.y,30,num,5*this.spd,0,i*this.spw);
					this.bullets.enterNWayBullet(this,B_MEDIUM_R,1.2,x+75,y-50,this.player.x,this.player.y,30,num,5*this.spd,0,i*this.spw);
				}
			}
			if( this.rad > 6.28 ){
				this.rad = 0;
				this.phase++;
			}
		}
		//待機
		if( this.phase == 2 || this.phase == 5 || this.phase == 8 || this.phase == 11 ){
			var s = 3;
			if( this.phase == 5 )s = 1.5;
			this.tl.delay(sec(s)).then(function(){this.phase++;});
			this.phase++;
		}
		//偶数弾
		if( this.phase == 4 ){
			if( this.obj1 ){this.obj1.phase = 0;this.obj1.attack = true;}
			if( this.obj2 ){this.obj2.phase = 0;this.obj2.attack = true;}
			this.phase++;
		}
		//奇数弾
		if( this.phase == 7 ){
			if( this.obj1 ){this.obj1.phase = 1;this.obj1.attack = true;}
			if( this.obj2 ){this.obj2.phase = 1;this.obj2.attack = true;}
			this.phase++;
		}
		//ばら撒き
		if( this.phase == 13 ){
			if( this.obj1 ){this.obj1.phase = 2;this.obj1.attack = true;}
			if( this.obj2 ){this.obj2.phase = 2;this.obj2.attack = true;}
			this.phase++;
		}
		//最初へ戻る
		if( this.phase == 14 ){
			this.tl.delay(sec(1)).then(function(){this.phase=1;});
			this.phase++;
		}

		//付属物生存判定＆発狂モード移行チェック
		if( this.obj1 && this.obj1.def <= 0 )this.obj1 = null;
		if( this.obj2 && this.obj2.def <= 0 )this.obj2 = null;
/*
		if( !this.obj1 && !this.obj2 &&  this.phase < 50 ){
			this.tl.moveTo(160,90,sec(1)).then(function(){this.phase++;});
			this.phase = 50;
			this.rad = 0;
		}
*/

		//発狂モード
		if( this.phase == 51 ){
			if( this.time % this.spw*6 == 0 ){
				this.y = 90;
				this.x = 160 + Math.sin(this.rad)*40;
				this.rad+=0.05;
				if( this.rad > 6.28 ){
					this.rad = 0;
				}
			}
			if( this.time % sec(2) == 0 ){
				for( var i = 0; i < diff*3; i++ ){
					var x = this.x;
					var y = this.y;
					var angle = 10+i*10;
					var num = 3;
					var speed = 3*this.spd;
					var dl = i*this.spw;
					this.bullets.enterNWayBullet(this,B_ROLL_B,1.2,x-75,y-50,this.player.x,this.player.y,angle,num,speed,0,dl);
					this.bullets.enterNWayBullet(this,B_ROLL_B,1.2,x+75,y-50,this.player.x,this.player.y,angle,num,speed,0,dl);
				}
			}
			if( this.time % sec(3) == 0 ){
				var lx = this.x-30;
				var rx = this.x+30;
				var speed = 4;
				for( var i = 0; i < 5; i++ ){
					speed *= 0.9;
					this.bullets.enterPlaceBullet(this,B_MEDIUM_R,1.5,lx,this.y+70,lx,this.y+100,speed,1.2,0);
					this.bullets.enterPlaceBullet(this,B_MEDIUM_R,1.5,rx,this.y+70,rx,this.y+100,speed,1.2,0);
				}
			}
		}
	},
	'GateKeeper_dead':function(){
		var e = this.manager.effects.enterEffect(null,'GateKeeper',this.x,this.y-15,0,0,1,0,0,0,funcBreak);
		e.tl.moveBy(0,10,sec(5),enchant.Easing.SIN_EASEIN);
		e.bullets = this.manager.bullets;

		if( this.obj0 ){this.obj0.release();delete this.obj0;}
		if( this.obj1 ){this.obj1.release();delete this.obj1;}
		if( this.obj2 ){this.obj2.release();delete this.obj2;}
		if( this.obj3 ){this.obj3.release();delete this.obj3;}
		if( this.obj4 ){this.obj4.release();delete this.obj4;}
//		if( this.obj5 ){this.obj5.release();delete this.obj5;}
		this.deadDefault();
	},
	'GK_launcher_init':function(){
		this.phase = 0;
		this.hatchopen = false;
		this.dir = 0;
	},
	'GK_launcher':function(){
		if( this.attack ){
			this.hatchopen = true;

			//２ＷＡＹ弾８連
			if( this.phase == 0 ){
				var d = sec(1);
				var s = (3+diff)*this.spd;
				for( var v = 0; v < 1; v++ ){
					for( var h = 0; h < 4; h++ ){
						var x = this.x-8+v*8;
						var y = this.y-8+h*8;
						for( var i = 0; i < 2; i++ ){
							var tx = this.player.x;
							var ty = this.player.y;
							var ang = 25+rand(10)-5;
//							this.bullets.enterPlaceBullet(this,B_MEDIUM_R,1.5,x,y,this.player.x,this.player.y,s,0,d);
							this.bullets.enterNWayBullet(this,B_MEDIUM_R,1.5,x,y,tx,ty,ang,2,s,0,d);
							d+=this.spw;
						}
					}
				}
			}

			//３ＷＡＹ弾８連
			if( this.phase == 1 ){
				var d = sec(1);
				var s = (3+diff)*this.spd;
				for( var v = 0; v < 1; v++ ){
					for( var h = 0; h < 4; h++ ){
						var x = this.x-8+v*8;
						var y = this.y-8+h*8;
						for( var i = 0; i < 2; i++ ){
							var tx = this.player.x;
							var ty = this.player.y;
							this.bullets.enterNWayBullet(this,B_MEDIUM_B,1.5,x,y,tx,ty,25,3,s,0,d);
							d+=this.spw;
						}
					}
				}
			}

			//円形弾８連
			if( this.phase == 2 ){
				var d = sec(1);
				var s = (1+diff)*this.spd;
				for( var v = 0; v < 1; v++ ){
					for( var h = 0; h < 4; h++ ){
						var x = this.x-8+v*8;
						var y = this.y-8+h*8;
						this.bullets.enterCircleBullet(this,B_ROLL_R,1.0,x,y,x,y+10,9,s,0,d);
						d+=this.spw*3;
					}
				}
			}

			//螺旋撒き
			if( this.phase == 3 ){
				var deg = 6.28/(this.diff*10);
				var rad = 0;
				for( var i = 0; i < this.diff*15; i++ ){
					var x = this.x + Math.sin(rad)*10*this.dir;
					var y = this.y + Math.cos(rad)*10;
					rad+=deg;
					this.bullets.enterPlaceBullet(this,B_MEDIUM_B,1.5,this.x,this.y,x,y,10*this.spd,0.8,i*this.spw+sec(0.5));
					this.bullets.enterPlaceBullet(this,B_MEDIUM_B,1.5,this.x,this.y,x*-1,y,10*this.spd,0.8,i*this.spw+sec(0.5));
				}
			}
			this.attack = false;
			this.tl.delay(sec(2)).then(function(){this.hatchopen=false;});
		}
		if( this.time % this.spw == 0 ){
			if( this.hatchopen ){
				this.sprite.frame++;
				if( this.sprite.frame > 3 )this.sprite.frame = 3;
			}else{
				this.sprite.frame--;
				if( this.sprite.frame < 0 )this.sprite.frame = 0;
			}
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//Gurdian
	//phase
	//0:出現
	//////////////////////////////////////////////////////////////////////////////
	'Gurdian_init':function(){
		//砲台左右
		this.obj1 = this.manager.enterEnemy(this,'GD_turretL',-20,0,false);
		this.obj2 = this.manager.enterEnemy(this,'GD_turretR', 20,0,false);

		//フロントカバー
		this.obj3 = this.manager.enterEnemy(this,'GD_front',0,28);
		//ウィング左右
		this.obj4 = this.manager.enterEnemy(this,'GD_wingL',-47,-40);
		this.obj5 = this.manager.enterEnemy(this,'GD_wingR', 47,-40);
	
		this.tl.moveTo(160,100,sec(1)).then(function(){this.phase++;this.attack=true;});
		this.phase = 0;
		this.attack = false;
	},
	'Gurdian':function(){
		if( this.phase == 1 ){
			this.opensec = 1;
			this.tl.moveTo( 50,100,sec(2),enchant.Easing.SIN_EASEIN).then(function(){this.attack=true;}).delay(sec(1));
			this.tl.moveTo(270,100,sec(2),enchant.Easing.SIN_EASEIN).then(function(){this.attack=true;}).delay(sec(1));
			this.tl.moveTo( 50,130,sec(2),enchant.Easing.SIN_EASEIN).then(function(){this.attack=true;}).delay(sec(1));
			this.tl.moveTo(160,100,sec(2),enchant.Easing.SIN_EASEIN).then(function(){this.attack=true;}).delay(sec(1));
			this.tl.moveTo(270,130,sec(2),enchant.Easing.SIN_EASEIN).then(function(){this.attack=true;}).delay(sec(1));
			this.tl.moveTo( 50,100,sec(2),enchant.Easing.SIN_EASEIN).then(function(){this.attack=true;}).delay(sec(1));
			this.tl.moveTo(160,100,sec(2),enchant.Easing.SIN_EASEIN);
			this.tl.then(function(){this.phase++;});
			this.phase++;
		}
		if( this.phase == 3 ){
			this.attack = true;
			this.opensec = 4;
			this.tl.delay(sec(3)).then(function(){this.phase++;});
			this.phase++;
		}
		if( this.phase == 5 ){
			this.phase = 1;
		}
		if( this.attack ){
			if( this.obj1 ){
				this.obj1.attack = true;
				this.obj1.phase = this.phase;
				this.obj1.tl.then(function(){this.open=true;}).delay(sec(this.opensec)).then(function(){this.open=false;});
			}
			if( this.obj2 ){
				this.obj2.attack = true;
				this.obj2.phase = this.phase;
				this.obj2.tl.then(function(){this.open=true;}).delay(sec(this.opensec)).then(function(){this.open=false;});
			}
			this.attack = false;
		}
		if( this.obj1 && this.obj1.def <= 0 )this.obj1 = null;
		if( this.obj2 && this.obj2.def <= 0 )this.obj2 = null;
		if( this.obj3 && this.obj3.def <= 0 )this.obj3 = null;
		if( this.obj4 && this.obj4.def <= 0 )this.obj4 = null;
		if( this.obj5 && this.obj5.def <= 0 )this.obj5 = null;
	},
	'Gurdian_dead':function(){
		var e = this.manager.effects.enterEffect(null,'Gurdian',this.x,this.y,0,0,1,0,0,0,funcBreak);
		e.tl.moveBy(0,10,sec(5),enchant.Easing.SIN_EASEIN);
		e.bullets = this.manager.bullets;

		if( this.obj1 ){this.obj1.release();delete this.obj1;}
		if( this.obj2 ){this.obj2.release();delete this.obj2;}
		if( this.obj3 ){this.obj3.release();delete this.obj3;}
		if( this.obj4 ){this.obj4.release();delete this.obj4;}
		if( this.obj5 ){this.obj5.release();delete this.obj5;}
		
		this.deadDefault();
	},
	'GD_turretL_init':function(){
		this.attack = false;
		this.phase = 0;
		this.open = false;
	},
	'GD_turretL':function(){
		if( this.time % this.spw*3 == 0 ){
			if( this.open ){
				this.sprite.frame++;
				if( this.sprite.frame == 4 )this.sprite.frame = 3;
			}else{
				this.sprite.frame--;
				if( this.sprite.frame == -1 )this.sprite.frame = 0;
			}
		}
		if( this.attack ){
			if( this.phase == 2 ){
				for( var i = 0; i < 5*this.diff; i++ ){
					var x = this.player.x+rand(80)-40;
					var y = this.player.y+rand(80)-40;
					var speed = this.spd*(3+rand(3));
					var wait = i*this.spw+sec(0.2);
					this.bullets.enterPlaceBullet(this,B_ROLL_B,1.0,this.x,this.y,x,y,speed,0,wait);
				}
			}
			if( this.phase == 4 ){
				//弾バラマキ
				var d = 0;
				for( var i = 0; i < 10; i++ ){
					d += sec(0.3);
					for( var j = 0; j < this.diff*5; j++ ){
						var x = rand(320);
						var y = rand(320);
						var speed = (rand(1)+2)*this.spd;
						this.bullets.enterPlaceBullet(this,B_ROLL_R,0.5,this.x,this.y,x,y,speed,0,d+j*this.spw);
					}
				}
			}
			this.attack = false;
		}
	},
	'GD_turretR_init':function(){
		this.attack = false;
		this.phase = 0;
	},
	'GD_turretR':function(){
		if( this.time % this.spw*3 == 0 ){
			if( this.open ){
				this.sprite.frame++;
				if( this.sprite.frame == 4 )this.sprite.frame = 3;
			}else{
				this.sprite.frame--;
				if( this.sprite.frame == -1 )this.sprite.frame = 0;
			}
		}
		if( this.attack ){
			if( this.phase == 2 ){
				for( var i = 0; i < 5*this.diff; i++ ){
					var x = this.player.x+rand(40)-20;
					var y = this.player.y+rand(40)-20;
					var speed = this.spd*(3+rand(3));
					var wait = i*this.spw+sec(0.2);
					this.bullets.enterPlaceBullet(this,B_ROLL_B,1.0,this.x,this.y,x,y,speed,0,wait);
				}
			}
			if( this.phase == 4 ){
				//弾バラマキ
				var d = 0;
				for( var i = 0; i < 10; i++ ){
					d += sec(0.3);
					for( var j = 0; j < this.diff*5; j++ ){
						var x = rand(320);
						var y = rand(320);
						var speed = (rand(1)+2)*this.spd;
						this.bullets.enterPlaceBullet(this,B_ROLL_R,0.5,this.x,this.y,x,y,speed,0,d+j*this.spw);
					}
				}
			}
			this.attack = false;
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//Goriate
	//phase
	//0:出現
	//////////////////////////////////////////////////////////////////////////////
	'Goriate_init':function(){

		//破壊躯体
		this.obj0 = this.manager.effects.enterEffect(this,'Goriate',0,20,0,0,1,0,0,0,function(){});

		//エンジン
		this.obj1 = this.manager.enterEnemy(this,'GR_engine',-52,28);
		this.obj2 = this.manager.enterEnemy(this,'GR_engine', 52,28);

		//ウィング
		this.obj3 = this.manager.enterEnemy(this,'GR_wing',-82,33);
		this.obj4 = this.manager.enterEnemy(this,'GR_wing', 82,33);
		this.obj4.sprite.scaleX = -1;

		//ハッチ
		this.obj5 = this.manager.enterEnemy(this,'GR_hatch',0,10,0,false);
		this.obj5.open = true;

		this.x = 160;
		this.y = -100;
		this.tl.moveTo(160,80,sec(3));
		this.tl.then(function(){this.phase++;});

		this.phase = 0;
		this.cycle = 0;
		this.rad = 0;
	},
	'Goriate':function(){
		//左右にダラダラ移動
		if( this.phase == 1 || this.phase == 4 ){
			this.obj5.open = true;
			if( this.time % this.spw*6 == 0 ){
				this.x = 160 + Math.sin(this.rad)*40;
				this.rad+=0.02;
			}
			if( this.rad > 6.28 ){
				this.rad = 0;
				this.phase++;
				this.obj5.open = false;
			}
			//攻撃
			if( this.time % sec(3) == 0 ){
				if( this.cycle == 0 ){
					var angle = 30;
					var num = 3*this.diff;
					var speed = 2*this.spd;
					for( var i = 0; i < this.diff*3; i++ ){
						this.bullets.enterNWayBullet(this,B_ROLL_B,1.0,this.x,this.y+10,this.x,this.y+120,angle,num,speed+i*0.1,0,0);
					}
				}else{
					var angle = 5;
					var num = 3*this.diff;
					var speed = 2*this.spd;
					var ap = 90/num;
					for( var i = 0; i < num; i++ ){
						this.bullets.enterNWayBullet(this,B_ROLL_R,1.0,this.x,this.y+10,this.x,this.y+120,angle,num,speed,0,i*this.spw*2);
						angle+=20;
					}
				}
				this.cycle++;
				this.cycle%=2;
			}
		}

		//弾撒き
		if( this.phase == 2 || this.phase == 5 ){
			if( this.obj1 ){
				this.obj1.attack = true;
				this.obj1.phase = this.phase;
			}
			if( this.obj2 ){
				this.obj2.attack = true;
				this.obj2.phase = this.phase;
			}
			this.tl.delay(sec(7)).then(function(){this.phase++;});
			this.phase++;
		}

		//発狂移行チェック
		if( !this.obj1 && !this.obj2 )this.phase=50;

		//発狂モード
		if( this.phase == 50 ){
			this.obj5.open = true;
			if( this.time % this.spw*6 == 0 ){
				this.x = 160 + Math.sin(this.rad)*40;
				this.rad+=0.02;
			}
			if( this.rad > 6.28 ){
				this.rad = 0;
				this.phase++;
				this.obj5.open = false;
			}
			if( this.time % sec(1) == 0 ){
				var x = this.x;
				var y = this.y;
				var angle = 10+i*10;
				var num = 6+diff*2;
				var speed = 2*this.spd;
				this.bullets.enterCircleBullet(this,B_ROLL_R,1.0,this.x,this.y+10,this.player.x,this.player.y,num,this.spd,0,0);
			}
			if( this.time % sec(3) == 0 ){
				for( var i = 0; i < diff*3; i++ ){
					var x = this.player.x;
					var y = this.player.y;
					var angle = 10+i*10;
					var num = 3;
					var speed = 3*this.spd;
					var dl = i*this.spw;
					this.bullets.enterNWayBullet(this,B_ROLL_B,1.0,this.x,this.y,x,y,angle,num,speed,0,dl);
				}
			}
		}

		if( this.obj1 && this.obj1.def <= 0 ){
			this.obj1 = null;
			if(this.obj3){this.obj3.def=0;}
		}
		if( this.obj2 && this.obj2.def <= 0 ){
			this.obj2 = null;
			if(this.obj4){this.obj4.def=0;}
		}
		if( this.obj3 && this.obj3.def <= 0 )this.obj3 = null;
		if( this.obj4 && this.obj4.def <= 0 )this.obj4 = null;
	},
	'Goriate_dead':function(){
		var e = this.manager.effects.enterEffect(null,'Goriate',this.x,this.y+20,0,0,1,0,0,0,funcBreak2);
		e.tl.moveBy(0,10,sec(5),enchant.Easing.SIN_EASEIN);
		e.bullets = this.manager.bullets;

		this.obj0.release();
		if(this.obj1){this.obj1.def=0;}
		if(this.obj2){this.obj2.def=0;}
		if(this.obj3){this.obj3.def=0;}
		if(this.obj4){this.obj4.def=0;}
		if(this.obj5){this.obj5.def=0;}

		this.deadDefault();
	},
	'GR_hatch_init':function(){
		this.open = false;
	},
	'GR_hatch':function(){
		if( this.time % this.spw*3 == 0 ){
			if( this.open ){
				this.sprite.frame++;
				if( this.sprite.frame == 4 )this.sprite.frame = 3;
			}else{
				this.sprite.frame--;
				if( this.sprite.frame == -1 )this.sprite.frame = 0;
			}
		}
	},
	'GR_engine_init':function(){
		//砲台
		this.obj1 = this.manager.enterEnemy(this,'GR_turret',0,-35,0,false);
		this.obj2 = this.manager.enterEnemy(this,'GR_turret',0, 15,0,false);
		
		this.attack = false;
		this.phase = 0;
	},
	'GR_engine':function(){
		if( this.attack ){
			this.obj1.phase = this.obj2.phase = this.phase;
			var wait = 3;
			this.tl.
			delay(sec(2)).then(function(){
				this.obj1.open = this.obj2.open = true;
			}).
			delay(sec(1)).then(function(){
				this.obj1.attack = this.obj2.attack = true;
			}).
			delay(sec(wait)).then(function(){
				this.obj1.open = this.obj2.open = false;
			});
			this.attack = false;
		}
	},
	'GR_engine_dead':function(){
		if( this.obj1 ){this.obj1.release();delete this.obj1;}
		if( this.obj2 ){this.obj2.release();delete this.obj2;}
		this.deadDefault();
	},
	'GR_turret_init':function(){
		this.open = false;
	},
	'GR_turret':function(){
		if( this.time % this.spw*4 == 0 ){
			if( this.open ){
				this.sprite.frame++;
				if( this.sprite.frame == 3 )this.sprite.frame = 2;
			}else{
				this.sprite.frame--;
				if( this.sprite.frame == -1 )this.sprite.frame = 0;
			}
		}
		if( this.attack ){
			switch(this.phase){
				case 2:
					for( var i = 0; i < 30; i++ ){
						this.bullets.enterTargetBullet(this,B_ROLL,0.7,this.x,this.y+10,this.player,this.diff+i*0.1,0,0);
					}
					break;
				case 5:
					for( var i = 0; i < 30; i++ ){
						this.bullets.enterTargetBullet(this,B_ROLL,0.7,this.x,this.y+10,this.player,this.diff+i*0.1,0,0);
					}
					break;
			}
			this.attack = false;
		}
	},
};

//中ボス用
var funcBreak = function(){
	if( this.time % sec(0.1) == 0 ){
		this.bullets.erase();
	}
	if( this.time % sec(0.5) == 0 && this.sprite.visible ){
		for( var i = 0; i < 3; i++ ){
			var delay = rand(sec(0.5));
			var x = this.x+rand(this.sprite.width)-this.sprite.width/2;
			var y = this.y+rand(this.sprite.height)-this.sprite.height/2;
			this.manager.enterEffect(null,'burn5',x,y,this.vx,this.vy,1,0,0,delay);
			//破片
			for( var j = 0; j < 5; j++ ){
				var nm = 'chip'+(rand(3)+4);
				var vx = (rand(80)*0.1)-4+this.vx;
				var vy = (rand(80)*0.1)-4+this.vy;
				this.manager.enterEffect(null,nm,x,y,vx,vy,1,0,0,delay);
			}
			for( var j = 0; j < 2; j++ ){
				var nm = 'chip'+(rand(5)+1);
				var vx = (rand(80)*0.1)-4+this.vx;
				var vy = (rand(80)*0.1)-4+this.vy;
				this.manager.enterEffect(null,nm,x,y,vx,vy,1,0,0,delay);
			}
		}
		sounds.playSE('media/se_bomb1.mp3',1,true);
	}
	if( this.time == sec(5) ){
		//爆発エフェクト
		for( var i = 0;i < 30; i++ ){
			var delay = rand(sec(0.5));
			var x = this.x+rand(this.sprite.width)-this.sprite.width/2;
			var y = this.y+rand(this.sprite.height)-this.sprite.height/2;
			this.manager.enterEffect(null,'burn5',x,y,this.vx,this.vy,1,0,0,delay);
			//破片
			for( var j = 0; j < 5; j++ ){
				var nm = 'chip'+(rand(3)+4);
				var vx = (rand(80)*0.1)-4+this.vx;
				var vy = (rand(80)*0.1)-4+this.vy;
				this.manager.enterEffect(null,nm,x,y,vx,vy,1,0,0,delay);
			}
			for( var j = 0; j < 2; j++ ){
				var nm = 'chip'+(rand(5)+1);
				var vx = (rand(80)*0.1)-4+this.vx;
				var vy = (rand(80)*0.1)-4+this.vy;
				this.manager.enterEffect(null,nm,x,y,vx,vy,1,0,0,delay);
			}
		}
		main.mask_w.tl.fadeIn(sec(0.5)).fadeOut(sec(0.3));
		this.sprite.visible = false;
		sounds.playSE('media/se_bomb3.mp3',1,true);
	}
	if( this.time == sec(7) ){
		delete this.bullets;
		this.release();
	}
}


//ステージボス用
var funcBreak2 = function(){
	if( this.time % sec(0.5) == 0 && this.sprite.visible ){
		for( var i = 0; i < 3; i++ ){
			var delay = rand(sec(0.5));
			var x = this.x+rand(this.sprite.width)-this.sprite.width/2;
			var y = this.y+rand(this.sprite.height)-this.sprite.height/2;
			this.manager.enterEffect(null,'burn5',x,y,this.vx,this.vy,1,0,0,delay);
			//破片
			for( var j = 0; j < 5; j++ ){
				var nm = 'chip'+(rand(3)+4);
				var vx = (rand(80)*0.1)-4+this.vx;
				var vy = (rand(80)*0.1)-4+this.vy;
				this.manager.enterEffect(null,nm,x,y,vx,vy,1,0,0,delay);
			}
			for( var j = 0; j < 2; j++ ){
				var nm = 'chip'+(rand(5)+1);
				var vx = (rand(80)*0.1)-4+this.vx;
				var vy = (rand(80)*0.1)-4+this.vy;
				this.manager.enterEffect(null,nm,x,y,vx,vy,1,0,0,delay);
			}
		}
		sounds.playSE('media/se_bomb1.mp3',1,true);
	}
	if( this.time == sec(5) ){
		//爆発エフェクト
		for( var i = 0;i < 40; i++ ){
			var delay = rand(sec(0.5));
			var x = this.x+rand(this.sprite.width)-this.sprite.width/2;
			var y = this.y+rand(this.sprite.height)-this.sprite.height/2;
			this.manager.enterEffect(null,'burn5',x,y,this.vx,this.vy,1,0,0,delay);
			//破片
			for( var j = 0; j < 5; j++ ){
				var nm = 'chip'+(rand(3)+4);
				var vx = (rand(80)*0.1)-4+this.vx;
				var vy = (rand(80)*0.1)-4+this.vy;
				this.manager.enterEffect(null,nm,x,y,vx,vy,1,0,0,delay);
			}
			for( var j = 0; j < 2; j++ ){
				var nm = 'chip'+(rand(5)+1);
				var vx = (rand(80)*0.1)-4+this.vx;
				var vy = (rand(80)*0.1)-4+this.vy;
				this.manager.enterEffect(null,nm,x,y,vx,vy,1,0,0,delay);
			}
		}
		sounds.playSE('media/se_bomb3.mp3',1,true);
		main.mask_w.tl.fadeIn(sec(0.5)).fadeOut(sec(0.3));
		this.tl.delay(sec(0.5)).then(function(){this.sprite.visible = false;});
	}
	if( this.time == sec(7) ){
		delete this.bullets;
		this.release();
	}
}
