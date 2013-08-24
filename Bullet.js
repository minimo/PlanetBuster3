/*

	PlanetBuster2
	bullet.js
	2012/07/02
	This program is MIT lisence.

*/

enchant();

/*弾種類*/
var B_SHOT		= 0;
var B_SMALL		= 1;
var B_MEDIUM	= 2;
var B_MEDIUM_R	= 3;
var B_MEDIUM_G	= 4;
var B_MEDIUM_B	= 5;
var B_ROLL		= 6;
var B_ROLL_R	= 7;
var B_ROLL_G	= 8;
var B_ROLL_B	= 9;
var B_THIN		= 10;

//////////////////////////////////////////////////////////////////////////////
//弾データ
//添字		名称
//file		画像ファイル
//w,h		画像サイズ
//eraseptn	消去パターン
//////////////////////////////////////////////////////////////////////////////
var bulletData = {
 1:	{file: 'media/bullet1.png',	w:  8, h:  8,eraseptn:'erase1' },	/* B_SMALL */
 2:	{file: 'media/bullet2.png',	w: 16, h: 16,eraseptn:'erase2' },	/* B_MEDIUM */
 3:	{file: 'media/bullet2R.png',w: 16, h: 16,eraseptn:'erase2R' },	/* B_MEDIUM_R */
 4:	{file: 'media/bullet2G.png',w: 16, h: 16,eraseptn:'erase2G' },	/* B_MEDIUM_G */
 5:	{file: 'media/bullet2B.png',w: 16, h: 16,eraseptn:'erase2B' },	/* B_MEDIUM_B */
 6:	{file: 'media/bullet3G.png',w: 24, h: 24,eraseptn:'erase2G' },	/* B_ROLL */
 7:	{file: 'media/bullet3R.png',w: 24, h: 24,eraseptn:'erase2R' },	/* B_ROLL_R */
 8:	{file: 'media/bullet3G.png',w: 24, h: 24,eraseptn:'erase2G' },	/* B_ROLL_G */
 9:	{file: 'media/bullet3B.png',w: 24, h: 24,eraseptn:'erase2B' },	/* B_ROLL_B */
10:	{file: 'media/bullet4.png',	w: 16, h: 16,eraseptn:'erase2' },	/* B_THIN */
}

//////////////////////////////////////////////////////////////////////////////
//弾管理クラス
// num:弾の最大数
// scene:親となるシーン
//////////////////////////////////////////////////////////////////////////////
BulletGroup = Class.create(enchant.Group,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(num,effects){
		enchant.Group.call(this);
		this.effects = effects;
		this.num = num;
		this.bullets = new Array(num);
		for( var i = 0; i < num; i++ ){
			this.bullets[i] = new Bullet(this);
			this.bullets[i].num = i;
		}
		//使用可能オブジェクトリスト
		this.useList = new Array(num);
		this.useListP = 0;
		for( var i = 0; i < num; i++ ){
			this.useList[i] = i;
		}
		
		this.on = true;	//弾出すフラグ
		this.forceErase = false;	//弾射出直後消去フラグ
	},
	//////////////////////////////////////////////////////////////////////////////
	//初期化
	//////////////////////////////////////////////////////////////////////////////
	init:function(){
		for( var i = 0; i < this.num; i++ ){
			var b = this.bullets[i];
			if( b.using )b.release();
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//オブジェクト取得
	//num:番号
	//////////////////////////////////////////////////////////////////////////////
	getObject:function(num){
		if( num < 0 || num >= this.num )return null;
		return this.bullets[num];
	},
	//////////////////////////////////////////////////////////////////////////////
	//未使用オブジェクト取得
	//////////////////////////////////////////////////////////////////////////////
	getNewObj:function(){
		if( this.useListP == this.num )return null;
		var n = this.useList[this.useListP];
		this.useList[this.useListP] = -1;
		this.useListP++;
		return this.bullets[n];
	},
	//////////////////////////////////////////////////////////////////////////////
	//オブジェクト解放
	//////////////////////////////////////////////////////////////////////////////
	releaseObj:function(obj){
		this.useListP--;
		this.useList[this.useListP] = obj.num;
		this.removeChild(obj);
	},
	//////////////////////////////////////////////////////////////////////////////
	//弾消去
	//parent:消去対象の親オブジェクト（null or undefined = 全消し）
	//////////////////////////////////////////////////////////////////////////////
	erase:function(parent){
		if( parent == null || parent == undefined ){
			for( var i = 0; i < this.num; i++ ){
				var b = this.bullets[i];
				if( b.using && b.type != B_SHOT )b.erase();
			}
		}else{
			for( var i = 0; i < this.num; i++ ){
				var b = this.bullets[i];
				if( b.using && b.parent == parent && b.type != B_SHOT )b.erase();
			}
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//敵弾当たり判定チェック
	//target:判定対象オブジェクト
	//////////////////////////////////////////////////////////////////////////////
	hitTestBullet:function(target){
		for( var i = 0; i < this.num; i++ ){
			var bl = this.bullets[i];
			if( bl.using && bl.type != B_SHOT ){
				if( bl.hitTest(target) )return bl;
			}
		}
		return null;
	},
	//////////////////////////////////////////////////////////////////////////////
	//ショット当たり判定チェック
	//target:判定対象オブジェクト
	//////////////////////////////////////////////////////////////////////////////
	hitTestShot:function(target){
		for( var i = 0; i < this.num; i++ ){
			var bl = this.bullets[i];
			if( bl.using && bl.type == B_SHOT ){
				if( bl.hitTest(target) )return bl;
			}
		}
		return null;
	},
	//////////////////////////////////////////////////////////////////////////////
	//使用量計算
	//////////////////////////////////////////////////////////////////////////////
	numUsing:function(){
		return this.useListP;
	},
	//////////////////////////////////////////////////////////////////////////////
	//ショット投入
	//parent:親オブジェクト
	//type:弾タイプ
	//power:威力
	//x,y:初期座標
	//rot:射出角度
	//speed:速度
	//////////////////////////////////////////////////////////////////////////////
	enterShot:function(type,power,x,y,rot,speed){
		var bullet = this.getNewObj();
		if( bullet == null )return null;

		if( type == 0 ){
			bullet.sprite.image = game.assets['media/shot1.png'];
			bullet.sprite.width = 16;
			bullet.sprite.height = 16;
			bullet.sprite.scaleX = 1;
			bullet.sprite.scaleY = 1;
			bullet.sprite.opacity = 1;

			//当たり判定調整
			bullet.col.width = 6;
			bullet.col.height = 6;
			bullet.col.x = -3;
			bullet.col.y = -3;
			bullet.col.visible = true;
		}else{
			bullet.sprite.image = game.assets['media/shot2.png'];
			bullet.sprite.width = 16;
			bullet.sprite.height = 32;
			bullet.sprite.scaleX = 2;
			bullet.sprite.scaleY = 0.5;
			bullet.sprite.opacity = 0.8;

			//当たり判定調整
			bullet.col.width = 16;
			bullet.col.height = 16;
			bullet.col.x = -8;
			bullet.col.y = -8;
			bullet.col.visible = true;
		}

		if( power < 8 ){
			bullet.sprite.scaleX *= 0.5;
		}else if( power > 12 ){
			bullet.sprite.scaleX *= 1.5;
			bullet.sprite.scaleY *= 2;
		}

		bullet.sprite.x = -bullet.sprite.width/2;
		bullet.sprite.y = -bullet.sprite.height/2;

		bullet.sprite.visible = true;

		bullet.parent = null;
		bullet.x = x;
		bullet.y = y;
		var vx = 0;
		var vy = -speed;
		if( rot != 0 ){
			var rad = rot*toRad;
			vx =  Math.sin(rad)*speed;
			vy = -Math.cos(rad)*speed;
		}
		bullet.vx = vx;
		bullet.vy = vy;
		bullet.accel = 0;
		bullet.using = true;
		bullet.collision = true;
		bullet.type = B_SHOT;
		bullet.power = power;
		bullet.time = 0;

		bullet.sprite.frame = 0;
		bullet.erase = function(){};
		bullet.sprite.rotation = rot;

		this.addChild(bullet);
		return bullet;
	},
	//////////////////////////////////////////////////////////////////////////////
	//通常弾
	//parent:親オブジェクト
	//type:弾タイプ
	//size:サイズ
	//x,y:初期座標
	//vx,vy:移動量
	//accel:加速度
	//delay:出現タイミングオフセット
	//////////////////////////////////////////////////////////////////////////////
	enterBullet:function(parent,type,size,x,y,vx,vy,accel,delay){
		if( !this.on )return null;

		//画面外射出キャンセル
		if( x < 0 || y < 0 || x > game.width || y > game.height )return null;

		var dat = bulletData[type];
		if( dat == undefined )return null;
		if( accel == undefined )accel = 0;
		if( delay == undefined )delay = 0;

		var bullet = this.getNewObj();
		if( bullet == null )return null;

		//共通初期化
		bullet.sprite.image = game.assets[dat.file];
		bullet.sprite.width = dat.w;
		bullet.sprite.height = dat.h;
		bullet.sprite.x = -bullet.sprite.width/2;
		bullet.sprite.y = -bullet.sprite.height/2;
		bullet.sprite.frame = 0;
		bullet.sprite.scaleX = size;
		bullet.sprite.scaleY = size;
		bullet.sprite.rotation = 0;
		bullet.sprite.visible = false;
		bullet.sprite.opacity = 1;

		bullet.parent = parent;
		bullet.x = x;
		bullet.y = y;
		bullet.vx = vx;
		bullet.vy = vy;
		bullet.size = size;
		if( accel != 0 && accel != 1 ){
			bullet.accel = accel;
			bullet.accelMin = Math.sqrt(vx*vx+vy*vy)*0.2;
		}else{
			bullet.accel = 0;
		}
		bullet.using = true;
		bullet.collision = false;
		bullet.type = type;
		if( delay < 0 )delay*=-1;
		bullet.time = -delay;
		bullet.erase = bullet.eraseDefault;
		bullet.eraseptn = dat.eraseptn;

		//当たり判定調整
		bullet.col.width = ~~(bullet.sprite.width*size/2);
		bullet.col.height = ~~(bullet.sprite.height*size/2);
		bullet.col.x = -bullet.col.width/2;
		bullet.col.y = -bullet.col.height/2;
		bullet.col.visible = true;

		//針弾の場合射出方向に応じて回転する
		if( type == B_THIN ){
			var rad = Math.atan2(vy,vx);
			var deg = ~~(rad*toDeg);
			bullet.sprite.rotation = deg-90;
			//当たり判定も調整する
			bullet.col.width = ~~(bullet.sprite.width*size/4);
			bullet.col.x = -bullet.col.width/2;
		}else{
			bullet.sprite.rotation = 0;
		}

		this.addChild(bullet);
		return this.bullet;
	},
	//////////////////////////////////////////////////////////////////////////////
	//特定座標狙い弾
	//parent:親オブジェクト
	//type:弾タイプ
	//size:サイズ
	//x,y:初期座標
	//tx,ty:目標座標
	//speed:弾速度
	//accel:加速度
	//delay:出現タイミングオフセット
	//////////////////////////////////////////////////////////////////////////////
	enterPlaceBullet:function(parent,type,size,x,y,tx,ty,speed,accel,delay){
		var d = Math.sqrt((tx-x)*(tx-x) + (ty-y)*(ty-y));
		var vx = (tx-x) / d * speed;
		var vy = (ty-y) / d * speed;
		this.enterBullet(parent,type,size,x,y,vx,vy,accel,delay);
	},
	//////////////////////////////////////////////////////////////////////////////
	//特定オブジェクト狙い弾
	//parent:親オブジェクト
	//type:弾タイプ
	//size:サイズ
	//x,y:初期座標
	//target:目標オブジェクト
	//speed:弾速度
	//accel:加速度
	//delay:出現タイミングオフセット
	//////////////////////////////////////////////////////////////////////////////
	enterTargetBullet:function(parent,type,size,x,y,target,speed,accel,delay){
		var w = 16*size/2;
		var tx = target.x;
		var ty = target.y;
		var d = Math.sqrt((tx-x)*(tx-x) + (ty-y)*(ty-y));
		var vx = (tx-x) / d * speed;
		var vy = (ty-y) / d * speed;
		this.enterBullet(parent,type,size,x,y,vx,vy,accel,delay);
	},
	//////////////////////////////////////////////////////////////////////////////
	//ｎＷａｙ弾
	//parent:親オブジェクト
	//type:弾タイプ
	//size:サイズ
	//x,y:初期座標
	//tx,ty:目標座標
	//theta:弾間の角度
	//n:弾数
	//speed:弾速度
	//accel:加速度
	//delay:出現タイミングオフセット
	//////////////////////////////////////////////////////////////////////////////
	enterNWayBullet:function(parent,type,size,x,y,tx,ty,theta,n,speed,accel,delay ){
		var d = Math.sqrt((tx-x)*(tx-x) + (ty-y)*(ty-y));
		var vx0 = (tx-x) / d * speed;
		var vy0 = (ty-y) / d * speed;
		var rad_step = Math.PI / 180 * theta;
		var rad = ~~(n/2) * rad_step;
		if( n % 2 == 0 ){
			rad -= rad_step/2;	//偶数弾処理
		}
		rad *= -1;
		for( var i = 0; i < n; i++, rad += rad_step ){
			var c = Math.cos(rad);
			var s = Math.sin(rad);
			var vx = vx0 * c - vy0 * s;
			var vy = vx0 * s + vy0 * c;
			this.enterBullet(parent,type,size,x,y,vx,vy,accel,delay);
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//円形弾
	//parent:親オブジェクト
	//type:弾タイプ
	//size:サイズ
	//x,y:初期座標
	//tx,ty:目標座標
	//n:弾数
	//speed:弾速度
	//accel:加速度
	//delay:出現タイミングオフセット
	//////////////////////////////////////////////////////////////////////////////
	enterCircleBullet:function( parent,type,size,x,y,tx,ty,n,speed,accel,delay ){
		var d = Math.sqrt((tx-x)*(tx-x) + (ty-y)*(ty-y));
		var vx0 = (tx-x) / d * speed;
		var vy0 = (ty-y) / d * speed;

		var theta = 360 / n;
		var rad_step = Math.PI / 180 * theta;
		var rad = ~~(n/2) * rad_step;
		if( n % 2 == 0 ){
			rad -= rad_step/2;	//偶数弾処理
		}
		rad *= -1;
		for( i = 0; i < n; i++, rad+=rad_step ){
			var c = Math.cos(rad), s = Math.sin(rad);
			var vx = vx0 * c - vy0 * s;
			var vy = vx0 * s + vy0 * c;
			this.enterBullet(parent,type,size,x,y,vx,vy,accel,delay);
		}
	}
});

//////////////////////////////////////////////////////////////////////////////
//弾単体クラス
//////////////////////////////////////////////////////////////////////////////
Bullet = Class.create(enchant.Group,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(manager){
		enchant.Group.call(this);
		this.manager = manager;
		this.effects = manager.effects;
		this.x = -1000;
		this.y = -1000;
		this.vx = 0;
		this.vy = 0;
		this.size = 1;
		this.accel = 0;
		this.accelMin = 3;
		this.type = 0;
		this.using = false;
		this.collision = true;
		this.power = 0;
		this.erase = function(){};
		this.eraseptn = "";
		//スプライト追加
		this.sprite = new Sprite(16,16);
		this.sprite.visible = false;
		this.addChild(this.sprite);
		//当たり判定用スプライト追加
		this.col = new Sprite(8,8);
		this.col.x = -4;
		this.col.y = -4;
		this.addChild(this.col);

		if( debug ){
			//当たり判定可視化
			var rect = new Surface(16,16);
			rect.context.fillStyle = 'rgba( 0, 255, 0, 1.0 )';
			rect.context.fillRect( 0, 0, 310, 8 );
			this.col.image = rect;
			this.col.visible = false;
			this.col.opacity = 0.5;
		}

		this.spd = spd;
		this.spw = spw;
	},
	/////////////////////////////////////////////////////////////////////////////
	//フレーム毎処理
	/////////////////////////////////////////////////////////////////////////////
	onenterframe:function(){
		if( !this.using )return;
		if( this.time < 0 ){
			this.time++;
			return;
		}
		if( this.time == 0 ){
			this.sprite.visible = true;
			this.collision = true;
		}
		if( this.manager.forceErase ){
			this.erase();
		}

		this.x += this.vx;
		this.y += this.vy;
		//加速弾処理
		if( this.accel != 0 && this.accel < 1 ){
			//一定以上の弾速の時のみ加減速処理
			if( Math.sqrt(this.vx*this.vx + this.vy*this.vy) > this.accelMin ){
				this.vx *= this.accel;
				this.vy *= this.accel;
			}
		}
		//ロール弾のみアニメーション
		if( this.type >= B_ROLL && this.type <= B_ROLL_B && this.time % this.spw == 0 ){
			this.sprite.frame++;
		}
		//範囲外判定
		if( this.x < -this.sprite.width-32 || this.x > game.width+32 ||
			this.y < -this.sprite.height-32 || this.y > game.height+32 || this.time > 600 ){
			this.release();
		}
		this.time++;
	},
	//////////////////////////////////////////////////////////////////////////////
	//当たり判定
	//////////////////////////////////////////////////////////////////////////////
	hitTest:function(target){
		if( !this.collision || !this.using )return false;
		if( this.col.intersect(target.col) ){
			return true;
		}
		return false;
	},
	//////////////////////////////////////////////////////////////////////////////
	//解放
	//////////////////////////////////////////////////////////////////////////////
	release:function(){
		if( !this.using )return;
		this.x = -1000;
		this.y = -1000;
		this.using = false;
		this.collision = false;
		this.sprite.visible = false;
		this.col.visible = false;
		this.manager.releaseObj(this);
	},
	//////////////////////////////////////////////////////////////////////////////
	//弾消去デフォルト処理
	//////////////////////////////////////////////////////////////////////////////
	eraseDefault:function(){
		this.effects.enterEffect(null,this.eraseptn,this.x,this.y,this.vx,this.vy,this.size,0,this.accel);
		this.release();
	},
});
