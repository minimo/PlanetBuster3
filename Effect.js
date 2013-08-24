/*

	PlanetBuster2
	effect.js
	2012/07/02
	This program is MIT lisence.

*/

enchant();

//////////////////////////////////////////////////////////////////////////////
//エフェクト管理クラス
// num:エフェクトの最大数
// scene:親となるシーン
//////////////////////////////////////////////////////////////////////////////
EffectGroup = Class.create(enchant.Group,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(num){
		enchant.Group.call(this);
		this.num = num;
		this.effects = new Array(num);
		for( var i = 0; i < num; i++ ){
			this.effects[i] = new Effect(this);
			this.effects[i].num = i;
		}
		//使用可能オブジェクトリスト
		this.useList = new Array(num);
		this.useListP = 0;
		for( var i = 0; i < num; i++ ){
			this.useList[i] = i;
		}
//		this.upper = new CanvasGroup;	//上位レイヤ
//		this.under = new CanvasGroup;	//下位レイヤ
		this.upper = new Group;	//上位レイヤ
		this.under = new Group;	//下位レイヤ
	},
	//////////////////////////////////////////////////////////////////////////////
	//初期化
	//////////////////////////////////////////////////////////////////////////////
	init:function(){
		for( var i = 0; i < this.num; i++ ){
			var e = this.effects[i];
			if( e.using )e.release();
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//未使用オブジェクト取得
	//////////////////////////////////////////////////////////////////////////////
	getNewObj:function(){
		if( this.useListP == this.num )return null;
		var n = this.useList[this.useListP];
		this.useList[this.useListP] = -1;
		this.useListP++;
		return this.effects[n];
	},
	//////////////////////////////////////////////////////////////////////////////
	//オブジェクト解放
	//////////////////////////////////////////////////////////////////////////////
	releaseObj:function(obj){
		this.useListP--;
		this.useList[this.useListP] = obj.num;
		if( obj.under ){
			this.under.removeChild(obj);
		}else{
			this.upper.removeChild(obj);
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//エフェクト投入
	//parent:親オブジェクト
	//name:エフェクトデータ名
	//x,y:座標
	//vx,vy:移動ベクトル（省略可）
	//size:サイズ（省略可）
	//rotation:角度（省略可）
	//accel:加速度（省略可）
	//delay:待機フレーム数（省略可）
	//func:処理関数（省略可）
	//////////////////////////////////////////////////////////////////////////////
	enterEffect:function(parent,name,x,y,vx,vy,size,rotation,accel,delay,func){
		var dat = effectData[name];
		if( dat == undefined )return null;
		if( vx == undefined )vx = 0;
		if( vy == undefined )vy = 0;
		if( size == undefined )size = 1;
		if( rotation == undefined )rotation = 0;
		if( accel == undefined || accel == 0 )accel = 1;
		if( delay == undefined )delay = 0;

		var ef = this.getNewObj();
		if( ef == null )return null;
		
		ef.name = name;

		//スプライト情報
		ef.sprite.image = game.assets[dat.file];
		ef.sprite.x = -dat.w/2;
		ef.sprite.y = -dat.h/2;
		ef.sprite.width = dat.w;
		ef.sprite.height = dat.h;
		ef.sprite.rotation = rotation;
		ef.sprite.scaleX = size;
		ef.sprite.scaleY = size;
		ef.sprite.frame = dat.start;
		//半透明設定
		if( dat.alpha == undefined ){
			dat.alpha = 'source-over';
		}
		ef.sprite.alphaBlending = dat.alpha;
		ef.sprite.visible = false;
		ef.sprite.opacity = 1;

		//座標情報
		ef.x = x;
		ef.y = y;
		ef.px = 0;
		ef.py = 0;
		ef.parent = parent;
		if( parent != null ){	//親オブジェクトがある場合は相対座標となる
			ef.x = 0;
			ef.y = 0;
			ef.px = x;
			ef.py = y;
		}
		ef.vx = vx;	//フレーム毎移動量
		ef.vy = vy;
		ef.accel = accel;	//加速度
		//アニメーション関連情報
		ef.frameStart = dat.start;				//開始アニメーションフレーム
		ef.frameMax = dat.start + dat.frame;	//最大アニメーションフレーム
		ef.wait = dat.wait;						//アニメーション間隔
		ef.brake = dat.brake;	//慣性移動ブレーキ
		ef.using = true;	//使用中フラグ
		ef.time = 0;		//投入後経過時間
		//実行関数
		if( func ){
			ef.run = func;
		}else{
			ef.run = ef.defaultRun;
		}
		//ディレイ
		if( delay < 0 )delay*=-1;
		if( delay > 0 ){
			ef.time = -delay;
			ef.sprite.visible = false;
		}
		//再生サウンド
		if( dat.sound != undefined ){
			ef.sound = dat.sound;
		}else{
			ef.sound = null;
		}
		//配置レイヤ
		if( dat.under == undefined ){
			dat.under = false;
		}
		ef.under = dat.under;
		if( ef.under ){
			this.under.addChild(ef);
		}else{
			this.upper.addChild(ef);
		}
		return ef;
	},
	//////////////////////////////////////////////////////////////////////////////
	//使用量計算
	//////////////////////////////////////////////////////////////////////////////
	numUsing:function(){
		return this.useListP;
	}
});

////////////////////////////////////////////////////////////////////////////
//エフェクト単体クラス
/////////////////////////////////////////////////////////////////////////////
Effect = Class.create(enchant.Group,{
	initialize:function(manager){
		enchant.Group.call(this);
		this.manager = manager;
		this.x = -1000;
		this.y = -1000;
		this.vx = 0;
		this.vy = 0;
		this.type = 0;
		this.using = false;
		this.wait = 1;
		this.brake = false;
		this.time = 0;
		this.run = function(){};
		this.time = 0;
		this.under = false;
		this.sound = null;
		this.canvas = false;
		this.accel = 0;
		this.accelMin = 3;

		this.parent = null;
		this.px = 0;	//相対座標
		this.py = 0;

		this.spd = spd;
		this.spw = spw;

		//スプライト追加
		this.sprite = new Sprite(16,16);
//		this.sprite.alphaBlending ="source-over";
		this.sprite.visible = false;
		this.addChild(this.sprite);
	},
	/////////////////////////////////////////////////////////////////////////////
	//フレーム毎処理
	/////////////////////////////////////////////////////////////////////////////
	onenterframe:function(){
		if( this.time < 0 ){
			this.time++;
			return;
		}
		if( this.time == 0 ){
			this.sprite.visible = true;
			if( soundEnable && this.sound ){
				playSE(this.sound,seVolume);
			}
		}
		if( this.parent ){
			//親オブジェクトとの相対座標処理
			this.x = this.parent.x+this.px;
			this.y = this.parent.y+this.py;
		}else{
			//通常の移動処理
			this.x += this.vx;
			this.y += this.vy;

			//加速処理
			if( this.accel != 0 && this.accel < 1 ){
				//一定以上の速度の時のみ加減速処理
				if( Math.sqrt(this.vx*this.vx + this.vy*this.vy) > this.accelMin ){
					this.vx *= this.accel;
					this.vy *= this.accel;
				}
			}
			if( this.brake ){
				this.vx *= 0.9;
				this.vy *= 0.9;
			}
		}

		this.run();

		this.time++;
	},
	/////////////////////////////////////////////////////////////////////////////
	//解放
	/////////////////////////////////////////////////////////////////////////////
	release:function(){
		if( !this.using )return;
		this.using = false;
		this.sprite.visible = false;
		this.tl.clear();
		this.x = -1000;
		this.y = -1000;
		this.manager.releaseObj(this);
	},
	//////////////////////////////////////////////////////////////////////////////
	//デフォルト処理ルーチン
	//////////////////////////////////////////////////////////////////////////////
	defaultRun:function(){
		if( this.time % Math.round(this.wait/this.spd) == 0 )this.sprite.frame++;
		if( this.sprite.frame == this.frameMax )this.release();
	}
});


//////////////////////////////////////////////////////////////////////////////
//エフェクトデータ
//添字		名称
//file		画像ファイル
//w,h		画像サイズ
//start		アニメーション開始フレーム番号
//frame		アニメーションフレーム数
//wait		アニメーション更新間隔
//alpha		アルファブレンド処理(undefined='source-over')
//brake		慣性移動ブレーキ(undefined=false)
//under		下位レイヤへの追加(undefined=false)
//sound		再生サウンド(undefined=無し)
//////////////////////////////////////////////////////////////////////////////
var effectData = {
//自機系
'shot':		{file: 'media/shotburn.png',	w: 16, h: 16, start: 0, frame: 8, wait: 3, alpha: 'source-over', brake: true },
'break':	{file: 'media/myshipburn.png',	w: 48, h: 48, start: 0, frame: 8, wait: 6, alpha: 'source-over', brake: true },

//爆発系
'burn1s':	{file: 'media/effect1.png',	w: 16, h: 16, start: 0, frame: 8, wait: 3, alpha: 'source-over', brake: true },
'burn1':	{file: 'media/effect1.png',	w: 16, h: 16, start: 8, frame: 8, wait: 3, alpha: 'source-over', brake: true },
'burn2':	{file: 'media/effect2.png',	w: 32, h: 32, start: 0, frame: 8, wait: 3, alpha: 'source-over', brake: true },
'burn3':	{file: 'media/effect3.png',	w: 32, h: 32, start: 0, frame: 8, wait: 3, alpha: 'source-over', brake: true },
'burn4':	{file: 'media/effect4.png',	w: 48, h: 48, start: 0, frame: 7, wait: 3, alpha: 'source-over', brake: true },
'burn5':	{file: 'media/effect5.png',	w: 64, h: 64, start: 0, frame:18, wait: 3, alpha: 'source-over', brake: true },
'burn6':	{file: 'media/effect6.png',	w: 32, h: 48, start: 0, frame: 8, wait: 3, alpha: 'source-over', brake: true },
'burn7':	{file: 'media/effect7.png',	w: 64, h: 64, start: 0, frame: 8, wait: 3, alpha: 'source-over', brake: true },

//ワープエフェクト
'warp':		{file: 'media/effect8.png',	w:256, h: 64, start: 0, frame: 7, wait: 3, alpha: 'source-over', brake: true },

//煙
'smoke1':	{file: 'media/smoke1.png',	w: 16, h: 16, start: 0, frame: 4, wait: 3, alpha: 'source-over', brake: true },
'smoke2':	{file: 'media/smoke2.png',	w: 24, h: 24, start: 0, frame: 5, wait: 6, alpha: 'source-over', brake: true },
'smoke3':	{file: 'media/smoke3.png',	w: 32, h: 32, start: 0, frame: 8, wait: 3, alpha: 'source-over', brake: true },

//弾消エフェクト
'erase1':	{file: 'media/bullet1.png',	w:  8, h:  8, start: 0, frame: 8, wait: 3, alpha: 'source-over', brake: false },
'erase2':	{file: 'media/bullet2.png',	w: 16, h: 16, start: 0, frame: 8, wait: 3, alpha: 'source-over', brake: false },
'erase2R':	{file: 'media/bullet2R.png',w: 16, h: 16, start: 0, frame: 8, wait: 3, alpha: 'source-over', brake: false },
'erase2G':	{file: 'media/bullet2G.png',w: 16, h: 16, start: 0, frame: 8, wait: 3, alpha: 'source-over', brake: false },
'erase2B':	{file: 'media/bullet2B.png',w: 16, h: 16, start: 0, frame: 8, wait: 3, alpha: 'source-over', brake: false },

//破片
'chip1':	{file: 'media/chip1.png',	w: 16, h: 16, start: 0, frame: 8, wait: 9, alpha: 'source-over', brake: true },
'chip2':	{file: 'media/chip1.png',	w: 16, h: 16, start: 8, frame: 8, wait: 9, alpha: 'source-over', brake: true },
'chip3':	{file: 'media/chip1.png',	w: 16, h: 16, start:16, frame: 8, wait: 9, alpha: 'source-over', brake: true },
'chip4':	{file: 'media/chip2.png',	w:  8, h:  8, start: 0, frame: 8, wait: 9, alpha: 'source-over', brake: true },
'chip5':	{file: 'media/chip2.png',	w:  8, h:  8, start: 8, frame: 8, wait: 9, alpha: 'source-over', brake: true },
'chip6':	{file: 'media/chip2.png',	w:  8, h:  8, start:16, frame: 4, wait: 9, alpha: 'source-over', brake: true },

//ボム
'bomb':		{file: 'media/bomb.png',	w: 96, h: 96, start: 0, frame:16, wait: 6, alpha: 'source-over', brake: true },

//ローター
'roter5':	{file: 'media/enemy5.png',	w: 32, h: 32, start: 8, frame: 4, wait: 3, alpha: 'source-over', brake: false },
'roter6':	{file: 'media/enemy6_2.png',w:112, h: 48, start: 0, frame: 4, wait: 3, alpha: 'source-over', brake: false },
'roter7':	{file: 'media/enemy7.png',	w: 48, h:104, start: 2, frame: 4, wait: 3, alpha: 'source-over', brake: false },
'roterB1':	{file: 'media/boss2b_roter.png', w:80, h:80, start: 0, frame: 4, wait: 3, alpha: 'source-over', brake: false },
'roterB2':	{file: 'media/boss2b_roter.png', w:80, h:80, start: 4, frame: 4, wait: 3, alpha: 'source-over', brake: false },

//架線スパーク
'spark':	{file: 'media/spark.png',	w: 32, h: 32, start: 0, frame: 2, wait: 3, alpha: 'source-over', brake: false, under: true },

//雲
'cloud1':	{file: 'media/cloud1.png',	w:128, h: 87, start: 0, frame: 0, wait: 0, alpha: 'source-over', under: true },
'cloud2':	{file: 'media/cloud2.png',	w: 64, h: 64, start: 0, frame: 0, wait: 0, alpha: 'source-over', under: true },
'cloud3':	{file: 'media/cloud3.png',	w: 96, h: 64, start: 0, frame: 0, wait: 0, alpha: 'source-over', under: true },
'cloud4':	{file: 'media/cloud4.png',	w:128, h: 96, start: 0, frame: 0, wait: 0, alpha: 'source-over', under: true },

//各種表示
'point':	{file: 'media/point.png',	w: 48, h:  9, start: 0, frame: 0, wait: 0, alpha: 'source-over' },
'item_ant':	{file: 'media/item_ant.png',w:112, h: 32, start: 0, frame:10, wait: 3, alpha: 'source-over' },

//BOSS Break
'ThorHammer':	{file: 'media/boss1a.png',	w: 96, h:192, start: 1, frame: 0, wait: 3, alpha: 'source-over', brake: false, under: true },
'Garuda':		{file: 'media/boss1b.png',	w:296, h: 80, start: 1, frame: 0, wait:30, alpha: 'source-over', brake: false, under: true },
'MotherCrow':	{file: 'media/boss2a.png',	w:114, h: 64, start: 0, frame: 0, wait: 3, alpha: 'source-over', brake: false, under: true },
'SkyBreaker':	{file: 'media/boss2b.png',	w:280, h:112, start: 1, frame: 0, wait: 3, alpha: 'source-over', brake: false, under: true },
'GateKeeper':	{file: 'media/boss3a_w.png',w:248, h:128, start: 1, frame: 0, wait: 3, alpha: 'source-over', brake: false, under: true },
'Gurdian':		{file: 'media/boss3b.png',	w:152, h:120, start: 1, frame: 0, wait: 3, alpha: 'source-over', brake: false, under: true },
'Goriate':		{file: 'media/boss3c_w.png',w:184, h:184, start: 1, frame: 0, wait: 3, alpha: 'source-over', brake: false, under: true },

//BossAccessory
'Garuda_hatch':	{file: 'media/boss1b_hatch.png',w: 16, h: 16, start: 0, frame: 3, wait: 3 },
}
