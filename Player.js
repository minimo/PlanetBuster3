/*

	PlanetBuster2
	player.js
	2012/06/26
	This program is MIT lisence.

*/

enchant();

/////////////////////////////////////////////////////////////////////////////
//プレイヤークラス
//manager:管理シーンクラス
/////////////////////////////////////////////////////////////////////////////
Player = Class.create(enchant.Group,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(manager){
		enchant.Group.call(this);
		this.manager = manager;
		this.x = 144;
		this.y = 240;
		this.time = 0;

		this.type = 0;			//自機タイプ
		this.muteki = 0;		//無敵状態カウンタ
		this.collision = true;	//当たり判定有効フラグ
		this.auto = false;		//自動操縦フラグ
		this.power = 10;		//ショット威力
		this.powerMax = 10;		//ショット最大威力
		this.span = 6;			//ショット間隔

		//スプライト
		this.sprite = new Sprite(32,32);
		this.sprite.image  = game.assets['media/myship.png'];
		this.sprite.x = -16;
		this.sprite.y = -16;
		this.addChild(this.sprite);

		//当たり判定用
		this.col = new Sprite(4,4);
		this.col.x = -this.col.width/2;
		this.col.y = -this.col.height/2;
		this.addChild(this.col);
		if( debug ){
			//当たり判定可視化
			var rect = new Surface(16,16);
			rect.context.fillStyle = 'rgba( 0, 255, 0, 1.0 )';
			rect.context.fillRect( 0, 0, 310, 8 );
			this.col.image = rect;
			this.col.visible = true;
			this.col.opacity = 0.5;
		}

		//ビット
		this.bit = new Array(4);
		for( var i = 0; i < 4; i++ ){
			this.bit[i] = new Sprite(16,24);
			this.bit[i].image = game.assets['media/myship_bit.png'];
			this.bit[i].x = -8;
			this.bit[i].opacity = 0;
			this.bit[i].onenterframe = function(){
				if( game.frame % this.spw == 0 ){
					this.frame++;
					if( this.frame == 4 )this.frame = 0;
				}
			}
			this.addChild(this.bit[i]);
		}
		this.bitON = false;		//展開フラグ
		this.bitReady = false;	//展開終了フラグ
		this.bitType = 0;		//ビット形態

		this.bitOK = false;	//ビット取得フラグ
		this.bitEnergyMax = 500;	//ビット最大エネルギー
		this.bitEnergy = 0;	//ビット残りエネルギー

		this.level = 0;		//自機武装レベル
		this.levelMax = 5;	//最大武装レベル

		this.speed = 3;
		this.shotON = true;

		this.spd = spd;
		this.spw = spw;
	},
	//////////////////////////////////////////////////////////////////////////////
	//ショット
	//touch:タッチ中フラグ
	//////////////////////////////////////////////////////////////////////////////
	shot:function(touch){
		if( this.shotON && this.time % Math.round(this.span/this.spd) == 0 ){
			var pow = this.power;
			if( touch )pow = ~~(pow * 0.6);
			var pow2 = pow;
			if( this.level > 2 )pow2 = pow*1.5;
			if( this.level > 4 )pow = pow2;
			var bls = this.manager.bullets;
			var speed = 8*this.spd;
			var rot = 0;
			if( this.level == 0 )rot = 4;
			bls.enterShot(0,pow2,this.x-12,this.y- 8,-rot,speed);	//前
			bls.enterShot(0,pow2,this.x- 4,this.y-16,   0,speed);
			bls.enterShot(0,pow2,this.x+ 4,this.y-16,   0,speed);
			bls.enterShot(0,pow2,this.x+12,this.y- 8, rot,speed);

			if( this.level > 0 ){
				bls.enterShot(0,pow,this.x-19,this.y- 8,-10,speed);	//左
				bls.enterShot(0,pow,this.x+19,this.y- 8, 10,speed);	//右
			}
			if( this.level > 1 ){
				bls.enterShot(0,pow,this.x-12,this.y-16,-10,speed);	//左
				bls.enterShot(0,pow,this.x+12,this.y-16, 10,speed);	//右
			}
			if( this.level > 3 ){
				bls.enterShot(0,pow2,this.x-12,this.y- 8,-3,speed);	//前
				bls.enterShot(0,pow2,this.x+12,this.y- 8, 3,speed);
			}

			if( this.bitReady ){
				for( var i = 0; i < 4; i++ ){
					var x = this.bit[i].x+8;
					var y = this.bit[i].y+12;
					var rot = this.bit[i].rotation;
					bls.enterShot(1,pow,this.x+x,this.y+y,rot,speed);
				}
				this.bitEnergy-=~~(pow/4);
				if( this.bitEnergy < 0 ){
					this.bitEnergy = 0;
					this.bitClose();
					this.bitOK = false;
				}
			}
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//ビット制御
	//////////////////////////////////////////////////////////////////////////////
	bitControl:function(){
		if( !this.bitReady ){
			this.bitOpen();
		}else{
			this.bitClose();
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//ビット展開
	//////////////////////////////////////////////////////////////////////////////
	bitOpen:function(){
		if( !this.bitOK || this.bitON || this.bitReady )return;
		this.bitON = true;
		for( var i = 0; i < 4; i++ ){
			this.bit[i].rotate = 0;
			this.bit[i].tl.show();
			if( !this.bitON )this.bit[i].tl.moveTo(-8,16,sec(0.1));
		}
		this.bit[0].tl.moveTo(-45-8,20,sec(0.2)).and().rotateTo(-15,sec(0.2));
		this.bit[1].tl.moveTo(-25-8,10,sec(0.2)).and().rotateTo(-10,sec(0.2));
		this.bit[2].tl.moveTo( 25-8,10,sec(0.2)).and().rotateTo( 10,sec(0.2));
		this.bit[3].tl.moveTo( 45-8,20,sec(0.2)).and().rotateTo( 15,sec(0.2));

		this.tl.delay(sec(0.1)).then(function(){this.bitReady = true;});
	},
	//////////////////////////////////////////////////////////////////////////////
	//ビット形態変更
	//////////////////////////////////////////////////////////////////////////////
	bitChange:function(){
		switch(this.bitType){
			case 0:
				this.bit[0].tl.moveTo(-45-8,20,sec(0.2)).and().rotateTo(-20,sec(0.2));
				this.bit[1].tl.moveTo(-25-8,10,sec(0.2)).and().rotateTo(-10,sec(0.2));
				this.bit[2].tl.moveTo( 25-8,10,sec(0.2)).and().rotateTo( 10,sec(0.2));
				this.bit[3].tl.moveTo( 45-8,20,sec(0.2)).and().rotateTo( 20,sec(0.2));
				break;
			case 1:
				this.bit[0].tl.moveTo(-45-8,-20,sec(0.2)).and().rotateTo(0,sec(0.2));
				this.bit[1].tl.moveTo(-25-8,-20,sec(0.2)).and().rotateTo(0,sec(0.2));
				this.bit[2].tl.moveTo( 25-8,-20,sec(0.2)).and().rotateTo(0,sec(0.2));
				this.bit[3].tl.moveTo( 45-8,-20,sec(0.2)).and().rotateTo(0,sec(0.2));
				break;
			case 2:
				this.bit[0].tl.moveTo(-55-8, 20,sec(0.2)).and().rotateTo(-20,sec(0.2));
				this.bit[1].tl.moveTo(-35-8, 20,sec(0.2)).and().rotateTo(-15,sec(0.2));
				this.bit[2].tl.moveTo( 35-8, 20,sec(0.2)).and().rotateTo(-15,sec(0.2));
				this.bit[3].tl.moveTo( 55-8, 20,sec(0.2)).and().rotateTo(-20,sec(0.2));
				break;
			case 3:
				break;
		}
		this.bitType++;
		if( this.bitType > 3 )this.bitType = 0;
	},
	//////////////////////////////////////////////////////////////////////////////
	//ビット格納
	//////////////////////////////////////////////////////////////////////////////
	bitClose:function(){
		if( !this.bitON || !this.bitReady )return;
		this.bitReady = false;
		for( var i = 0; i < 4; i++ ){
			this.bit[i].tl.clear();
			this.bit[i].tl.moveTo(-8,0,sec(0.2)).and().rotateTo(0,sec(0.2)).hide();
		}
		this.tl.delay(sec(0.3)).then(function(){this.bitON = false;});
	},
	/////////////////////////////////////////////////////////////////////////////
	//フレーム毎処理
	/////////////////////////////////////////////////////////////////////////////
	onenterframe:function(){
		//アニメーション
		if( this.age % this.spw == 0 ){
			this.sprite.frame++;
			if( this.sprite.frame > 2 )this.sprite.frame = 0;
		}
		
		//無敵時点滅処理
		if( this.muteki > 0 ){
			this.muteki--;
			if( this.age % round(5/this.spd) == 0 ){
				if( this.sprite.visible )this.sprite.visible = false;
				else this.sprite.visible = true;
			}
			if( this.muteki == 0 )this.sprite.visible = true;
		}
		this.time++;
	},
	//////////////////////////////////////////////////////////////////////////////
	//スタート演出（ステージ初回）
	//////////////////////////////////////////////////////////////////////////////
	startup_first:function(){
		this.sprite.visible = true;
		this.sprite.opacity = 1;
		this.shotON = false;
		this.auto = true;
		this.x = 160;
		this.y = 400;
		this.muteki = sec(4);
		this.tl.clear();
		this.tl.delay(sec(1)).moveTo(160,160,sec(0.5),enchant.Easing.CIRC_EASEOUT).moveTo(160,260,sec(1.5)).delay(0.5);
		this.tl.then(function(){this.auto = false;this.shotON = true;this.collision = true;});
	},
	//////////////////////////////////////////////////////////////////////////////
	//スタート演出（通常）
	//////////////////////////////////////////////////////////////////////////////
	startup:function(){
		this.sprite.visible = true;
		this.sprite.opacity = 1;
		this.shotON = false;
		this.auto = true;
		this.x = 160;
		this.y = 400;
		this.muteki = sec(3);
		this.tl.delay(sec(1)).moveTo(160,240,sec(0.5),enchant.Easing.CIRC_EASEOUT).delay(0.5);
		this.tl.then(function(){this.auto = false;this.shotON = true;this.collision = true;});
	},
	//////////////////////////////////////////////////////////////////////////////
	//死亡時演出
	//////////////////////////////////////////////////////////////////////////////
	dead:function(){
		this.sprite.visible = false;
		this.shotON = false;
		this.collision = false;
		this.bitOK = false;
		this.bitEnergy = 0;
		this.bitClose();
		this.tl.delay(sec(1));
		this.tl.then(function(){
			this.startup();
		});
		this.manager.effects.enterEffect(null,'break',this.x,this.y);
		sounds.playSE('media/se_shipburn.mp3',0.5);
		this.x = 160;
		this.y = 400;
	}
});

