/*

	PlanetBuster2
	enemy.js
	2012/07/02
	This program is MIT lisence.

*/

//敵種類
var E_ITEM		= 0;	//アイテム
var E_SMALL		= 1;
var E_MEDIUM1	= 2;
var E_MEDIUM2	= 3;
var E_BIG		= 4;
var E_BOSS_M	= 5;	//中ボス
var E_BOSS_L	= 6;	//ステージボス

enchant();

//////////////////////////////////////////////////////////////////////////////
//敵管理クラス
// num:敵の最大数
// scene:親となるシーン
// player:プレイヤーオブジェクト
// bullets:弾管理クラス
//////////////////////////////////////////////////////////////////////////////
EnemyGroup = Class.create(enchant.Group,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(num,player,bullets,effects,bg){
		enchant.Group.call(this);
		this.num = num;
		this.player = player;
		this.bullets = bullets;
		this.effects = effects;
		this.bg = bg;
		this.enemies = new Array(num);
		for( var i = 0; i < num; i++ ){
			this.enemies[i] = new Enemy(this,player,bullets,effects);
			this.enemies[i].num = i;
		}
		//使用可能オブジェクトリスト
		this.useList = new Array(num);
		this.useListP = 0;
		for( var i = 0; i < num; i++ ){
			this.useList[i] = i;
		}

		//使用中オブジェクトリスト
		this.usingList = new Array(num);
		this.usingListP = 0;
		for( var i = 0; i < num; i++ ){
			this.usingList[i] = -1;
		}

		//描画順序制御の為にレイヤー用グループを用意
		//レイヤー番号順に描画される（0～2で0が一番下）
		this.layerMax = 3;
		this.layer = new Array(this.layerMax);
		for( var i = 0; i < this.layerMax; i++ ){
//			this.layer[i] = new CanvasGroup;
			this.layer[i] = new Group;
			this.addChild(this.layer[i]);
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//初期化
	//////////////////////////////////////////////////////////////////////////////
	init:function(){
		for( var i = 0; i < this.num; i++ ){
			var e = this.enemies[i];
			if( e.using )e.release();
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//未使用オブジェクト取得
	//////////////////////////////////////////////////////////////////////////////
	getNewObj:function(){
		if( this.useListP == this.num )return null;
		
		//使用可能リストから取得
		var n = this.useList[this.useListP];
		this.useList[this.useListP] = -1;
		this.useListP++;

		//使用中リストへ投入		
//		this.usingList[this.usingListP] = n;
//		this.usingListP++;

		return this.enemies[n];
	},
	//////////////////////////////////////////////////////////////////////////////
	//オブジェクト解放
	//////////////////////////////////////////////////////////////////////////////
	releaseObj:function(obj){
		//使用可能リストに投入
		this.useListP--;
		this.useList[this.useListP] = obj.num;

		//使用中リストから削除
//		this.usingList[this.usingListP] = -1;
//		this.usingListP--;

		this.layer[obj.layer].removeChild(obj);
	},
	//////////////////////////////////////////////////////////////////////////////
	//敵投入
	//parent:親オブジェクト
	//name:名称
	//x,y:初期座標
	//delay:出現タイミングオフセット
	//collision:当たり判定フラグ
	//////////////////////////////////////////////////////////////////////////////
	enterEnemy:function(parent,name,x,y,delay,collision){
		var dat = enemyData[name];
		var alg = enemyAlgorithm;
		if( dat == undefined ){
			dat = bossData[name];
			alg = bossAlgorithm;
		}
		if( dat == undefined )return null;
		if( delay == undefined )delay = 0;
		if( collision == undefined )collision = true;

		var ene = this.getNewObj();
		if( ene == null )return null;

		ene.name = name;

		//スプライト情報
		ene.sprite.image = game.assets[dat.file];
		ene.sprite.x = -dat.w/2;
		ene.sprite.y = -dat.h/2;
		ene.sprite.width = dat.w;
		ene.sprite.height = dat.h;
		ene.sprite.rotation = 0;
		ene.sprite.scaleX = 1;
		ene.sprite.scaleY = 1;
		ene.sprite.frame = 0;
		ene.sprite.visible = false;	//初期化時に可視化する
		ene.sprite.opacity = 1;
		ene.parent = parent;
		//座標情報
		ene.x = x;
		ene.y = y;
		ene.px = 0;
		ene.py = 0;
		if( parent != null ){	//親オブジェクトがある場合は相対座標となる
			ene.x = 0;
			ene.y = 0;
			ene.px = x;
			ene.py = y;
		}
		ene.vx = 0;
		ene.vy = 0;
		ene.tx = 0;
		ene.ty = 0;
		//その他情報
		ene.nam = name;
		ene.point = dat.point;
		ene.def = dat.def;
		ene.defMax = dat.def;
		ene.burn = dat.burn;
		ene.type = dat.type;
		ene.using = true;
		ene.initCollision = collision;	//
		ene.collision = false;			//初期化時に判定をinitCollisionにする
		ene.phase = 0;
		ene.onScreen = false;
		ene.outrange = false;
		ene.ground = dat.ground;
		if( delay < 0 )delay*=-1;
		ene.time = -delay;
		//初期化処理
		var func = alg[name+'_init'];
		if( name.substring(0,4) == 'Item' ){
			func = alg['Item_init'];
		}
		if( func != undefined ){
			ene.init = func;
		}else{
			ene.init = function(){};
		}
		//フレーム毎処理
		func = alg[name];
		if( name.substring(0,4) == 'Item' ){
				func = alg['Item'];
		}
		if( func != undefined ){
			ene.algorithm = func;
		}else{
			ene.algorithm = function(){};
		}
		//死亡時処理
		func = alg[name+'_dead'];
		if( func != undefined ){
			ene.dead = func;
		}else{
			ene.dead = ene.deadDefault;
		}
		//解放処理
		func = alg[name+'_release'];
		if( name.substring(0,4) == 'Item' ){
			func = alg['Item_release'];
		}
		if( func != undefined ){
			ene.release = func;
		}else{
			ene.release = ene.releaseDefault;
		}

		//当たり判定調整
		ene.col.width = dat.colw;
		ene.col.height = dat.colh;
		ene.col.x = -dat.colw/2;
		ene.col.y = -dat.colh/2;
		ene.col.visible = true;
		
		//難易度を保存
		ene.diff = diff;

		var lyr = 1;	//レイヤー仮設定
		if( dat.layer != undefined ){
			lyr = dat.layer;
		}
		ene.layer = lyr;
		this.layer[lyr].addChild(ene);

		ene.killCount = 0;	//撃墜数対象
		return ene;
	},
	//////////////////////////////////////////////////////////////////////////////
	//オブジェクト取得
	//num:番号
	//////////////////////////////////////////////////////////////////////////////
	getObject:function(num){
		return this.enemies[num];
	},
	//////////////////////////////////////////////////////////////////////////////
	//当たり判定チェック
	//target:判定対象オブジェクト
	//////////////////////////////////////////////////////////////////////////////
	hitTest:function(target){
		for( var i = 0; i < this.num; i++ ){
			if( this.enemies[i].using && this.enemies[i].collision ){
				if( this.enemies[i].hitTest(target) )return this.enemies[i];
			}
		}
		return null;
	},
	//////////////////////////////////////////////////////////////////////////////
	//当たり判定チェック（地上物除外）
	//target:判定対象オブジェクト
	//////////////////////////////////////////////////////////////////////////////
	hitTestSky:function(target){
		for( var i = 0; i < this.num; i++ ){
			var e = this.enemies[i];
			if( e.using && e.collision && !e.ground ){
				if( this.enemies[i].hitTest(target) )return this.enemies[i];
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
});

//////////////////////////////////////////////////////////////////////////////
//敵単体クラス
//////////////////////////////////////////////////////////////////////////////
Enemy = Class.create(enchant.Group,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(manager,player,bullets,effects){
		enchant.Group.call(this);
		this.name = null;
		this.manager = manager;	//グループ管理クラス
		this.player = player;	//プレイヤークラス
		this.bullets = bullets;	//弾管理クラス
		this.effects = effects;	//エフェクト管理クラス
		this.x = 0;
		this.y = 0;
		this.vx = 0;	//移動量
		this.vy = 0;
		this.tx = 0;	//ターゲット座標
		this.ty = 0;
		this.nam = 'unknown';	//敵名称
		this.type = 0;	//敵タイプ
		this.def = 0;	//耐久力
		this.defMax = 0;//最大耐久力
		this.burn = 0;	//爆発タイプ
		this.using = false;		//使用中フラグ
		this.collision = false;	//当たり判定フラグ
		this.phase = 0;			//行動フェーズ
		this.point = 0;	//得点
		this.ground  = false;
		this.algorithm = function(){};
		this.init = function(){};
		this.dead = this.deadDefault;
		this.release = this.releaseDefault;
		this.layer = 0;
		this.onScreen = false;	//画面内に来たフラグ
		this.outrange = false;	//画面範囲外行ったフラグ
		this.item = 0;	//ドロップアイテム

		this.parent = null;
		this.px = 0;	//相対座標
		this.py = 0;

		//スプライト追加
		this.sprite = new Sprite(16,16);
		this.sprite.visible = false;
		this.sprite.parent = this;
//		this.sprite.onrender = function(){
//			this.parent.onrender();		//onrender処理を親へ飛ばす
//		}
		this.addChild(this.sprite);

		//当たり判定用スプライト追加
		this.col = new Sprite(8,8);
		this.col.x = -4;
		this.col.y = -4;
		this.addChild(this.col);
		if( debug ){
			//当たり判定可視化
			var rect = new Surface(8,8);
			rect.context.fillStyle = 'rgba( 0, 255, 0, 1.0 )';
			rect.context.fillRect( 0, 0, 310, 8 );
			this.col.image = rect;
			this.col.visible = false;
			this.col.opacity = 0.5;
		}

		//固有処理設定用関数
		this.algorithm = function(){};
		this.init = function(){};
		this.dead = this.deadDefault;
		this.release = this.releaseDefault;

		//高速化になればいいな対応		
		this.spw = spw;
		this.spd = spd;

		this.killCount = 0;	//撃墜数対象
	},
	/////////////////////////////////////////////////////////////////////////////
	//フレーム毎処理
	/////////////////////////////////////////////////////////////////////////////
	onenterframe:function(){
		if( !this.using || pause )return;
		if( this.time < 0 ){
			this.time++;
			return;
		}
		if( this.time == 0 ){
			this.sprite.visible = true;
			this.collision = this.initCollision;
			this.init();
		}
		//親オブジェクトとの相対座標処理
		if( this.parent ){
			this.x = this.parent.x+this.px;
			this.y = this.parent.y+this.py;
		}
		if( this.def > 0 )this.algorithm();
		if( this.def <= 0 )this.dead();
		
		//範囲チェック
		if( this.onScreen ){
			//範囲外に行ったら消す
			if( this.x < -this.sprite.width || this.x > game.width+this.sprite.width ||
				this.y < -this.sprite.height || this.y > game.height+this.sprite.height ){
				if( this.type != E_BOSS_M && this.type != E_BOSS_L )this.release();
			}
		}else{
			//画面範囲内に入ったらフラグON
			if( this.x > 0 && this.x < game.width && this.y > 0 && this.y < game.height ){
				this.onScreen = true;
			}
		}
		//瀕死演出（中型機以上）
		if( this.type >= E_MEDIUM1 ){
			if( this.defMax*0.3 > this.def && this.time % sec(1.0) == 0 ||
				this.defMax*0.2 > this.def && this.time % sec(0.5) == 0 ){
				//爆発エフェクト
				var rx = this.x + rand(this.sprite.width)-this.sprite.width/2;
				var ry = this.y + rand(this.sprite.height)-this.sprite.height/2;
				if( this.type >= E_BOSS_M ){
					this.effects.enterEffect(null,'burn5',rx,ry,0,0,1.2);
				}else{
					this.effects.enterEffect(null,'burn3',rx,ry,0,0,1.2);
				}
				//破片
				for( var i = 0; i < 3; i++ ){
					var delay = rand(sec(0.5));
					var nm = 'chip'+(rand(3)+4);
					var vx = (rand(80)*0.1)-4+this.vx;
					var vy = (rand(80)*0.1)-4+this.vy;
					this.effects.enterEffect(null,nm,rx,ry,vx,vy,1,0,0,delay);
				}
			}
		}
		this.time++;
	},
	//////////////////////////////////////////////////////////////////////////////
	//爆発演出
	//num:爆発エフェクト数
	//////////////////////////////////////////////////////////////////////////////
	explode:function(num){
		if( num == undefined )num = 5;
		for( var i = 0; i < num; i++ ){
			var delay = rand(sec(0.5));
			var x = this.x+rand(this.sprite.width)-this.sprite.width/2;
			var y = this.y+rand(this.sprite.height)-this.sprite.height/2;
			this.effects.enterEffect(null,'burn5',x,y,this.vx,this.vy,1,0,0,delay);
			//破片放出
			for( var j = 0; j < 5; j++ ){
				var nm = 'chip'+(rand(3)+4);
				var vx = (rand(80)*0.1)-4+this.vx;
				var vy = (rand(80)*0.1)-4+this.vy;
				this.effects.enterEffect(null,nm,x,y,vx,vy,1,0,0,delay);
			}
			for( var j = 0; j < 2; j++ ){
				var nm = 'chip'+(rand(5)+1);
				var vx = (rand(80)*0.1)-4+this.vx;
				var vy = (rand(80)*0.1)-4+this.vy;
				this.effects.enterEffect(null,nm,x,y,vx,vy,1,0,0,delay);
			}
		}
		sounds.playSE('media/se_bomb5.mp3',1,true);
	},
	//////////////////////////////////////////////////////////////////////////////
	//当たり判定チェック
	//target:対象オブジェクト
	//////////////////////////////////////////////////////////////////////////////
	hitTest:function(target){
		if( !this.collision || !this.using )return false;
		if( this.col.intersect(target.col) ){
			return true;
		}
		return false;
	},
	//////////////////////////////////////////////////////////////////////////////
	//被ダメージ処理
	//////////////////////////////////////////////////////////////////////////////
	damaged:function(power,touch){
		if( this.def > 0 ){
			this.def -= power;
			if( this.def <= 0 ){
				this.dead(touch);
				this.def = 0;
			}
		}
	},
	isDead:function(){
		if( this.def <= 0 )return true;
		return false;
	},
	//////////////////////////////////////////////////////////////////////////////
	//破壊時デフォルト処理ルーチン
	//////////////////////////////////////////////////////////////////////////////
	deadDefault:function(touch){
		switch(this.burn){
			case 0:
				//爆発エフェクト
				this.effects.enterEffect(null,'burn3',this.x,this.y,this.vx,this.vy,1.2);
				//破片
				for( var i = 0; i < 5+rand(3); i++ ){
					var delay = rand(sec(0.5));
					var nm = 'chip'+(rand(3)+4);
					var vx = (rand(80)*0.1)-4+this.vx;
					var vy = (rand(80)*0.1)-4+this.vy;
					this.effects.enterEffect(null,nm,this.x,this.y,vx,vy,1,0,0,delay);
				}
				sounds.playSE('media/se_bomb1.mp3',seVolume,true);
				break;
			case 1:
				//爆発エフェクト
				this.effects.enterEffect(null,'burn4',this.x,this.y,this.vx,this.vy);
				//破片
				for( var i = 0; i < 10+rand(5); i++ ){
					var delay = rand(sec(0.5));
					var nm = 'chip'+(rand(3)+4);
					var vx = (rand(80)*0.1)-4+this.vx;
					var vy = (rand(80)*0.1)-4+this.vy;
					this.effects.enterEffect(null,nm,this.x,this.y,vx,vy,1,0,0,delay);
				}
				sounds.playSE('media/se_bomb1.mp3',seVolume,true);
				break;
			case 2:
				//爆発エフェクト
				this.effects.enterEffect(null,'burn5',this.x,this.y,this.vx,this.vy);
				//破片
				for( var i = 0; i < 10+rand(10); i++ ){
					var delay = rand(sec(0.5));
					var nm = 'chip'+(rand(3)+4);
					var vx = (rand(80)*0.1)-4+this.vx;
					var vy = (rand(80)*0.1)-4+this.vy;
					this.effects.enterEffect(null,nm,this.x,this.y,vx,vy,1,0,0,delay);
				}
				sounds.playSE('media/se_bomb1.mp3',seVolume,true);
				break;
			default:
				//爆発エフェクト
				for( var i = 0;i < this.burn; i++ ){
					var delay = rand(sec(0.5));
					var x = this.x+rand(this.sprite.width)-this.sprite.width/2;
					var y = this.y+rand(this.sprite.height)-this.sprite.height/2;
					this.effects.enterEffect(null,'burn5',x,y,this.vx,this.vy,1,0,0,delay);
					//破片
					for( var j = 0; j < 3+rand(2); j++ ){
						var nm = 'chip'+(rand(3)+4);
						var vx = (rand(80)*0.1)-4+this.vx;
						var vy = (rand(80)*0.1)-4+this.vy;
						this.effects.enterEffect(null,nm,x,y,vx,vy,1,0,0,delay);
					}
					for( var j = 0; j < 2+rand(3); j++ ){
						var nm = 'chip'+(rand(5)+1);
						var vx = (rand(80)*0.1)-4+this.vx;
						var vy = (rand(80)*0.1)-4+this.vy;
						this.effects.enterEffect(null,nm,x,y,vx,vy,1,0,0,delay);
					}
				}
				sounds.playSE('media/se_bomb2.mp3',seVolume*0.6,true);
				break;
		}

		//中型機１はタッチ操作時弾消し
		if( this.type == E_MEDIUM1 && touch )this.manager.bullets.erase(this);
		//中型機２は無条件自弾消し
		if( this.type == E_MEDIUM2 && touch )this.manager.bullets.erase(this);
		//大型機以上は無条件全弾消し
		if( this.type >= E_BIG )this.manager.bullets.erase();

		this.release();
	},
	//////////////////////////////////////////////////////////////////////////////
	//オブジェクト解放デフォルト処理
	//////////////////////////////////////////////////////////////////////////////
	releaseDefault:function(){
		if( !this.using )return;
		this.x = -1000;
		this.y = -1000;
		this.col.x = -1000;
		this.col.y = -1000;
		this.using = false;
		this.def = 0;
		this.collision = false;
		this.sprite.visible = false;
		this.col.visible = false;
		this.tl.clear();
		this.manager.releaseObj(this);
	}
});
