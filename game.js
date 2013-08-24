/*

	PlanetBuster2
	game.js
	2012/06/26
	This program is MIT lisence.

*/

enchant();

/////////////////////////////////////////////////////////////////////////////
//ゲームクラス
/////////////////////////////////////////////////////////////////////////////
GameMain = Class.create(enchant.Scene,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(num,scene,effects){
		enchant.Scene.call(this);

		//設定用変数
		/////////////////////////////////////////////////////////////////////////////
		this.score = 0;			//スコア
		this.stageNum = 1;		//現在ステージ
		this.stageMax = 3;		//最終ステージ
		this.advance = 0;		//敵出現テーブル進度
		this.life = 2;			//現在ライフ
		this.lifeFirst = 2;		//初期ライフ数
		this.lifeMax = 5;		//最大ライフ数
		this.extend = 200000;	//エクステンド点数
		this.bomb = 2;			//現在ボム
		this.bombFirst = 2;		//初期ボム数
		this.bombMax = 5;		//最大ボム数
		this.bombTimeMax = sec(3);	//ボム効果継続時間
		this.bombTime = 0;		//ボム効果継続時間
		this.autoBomb = false;	//オートボム
		this.event = false;		//イベント実行中フラグ
		this.bossObj = null;	//戦闘中ボス
		this.mboss = false;		//中ボス戦フラグ
		this.mbossKill = false;	//中ボス倒したフラグ
		this.mbossSign = 0;		//中ボス区分
		this.boss = false;		//ボス戦フラグ
		this.bossKill = false;	//ボス倒したフラグ
		this.kill = 0;			//撃墜数
		this.killStage = 0;		//ステージ内撃墜数
		this.enemyCount = 0;	//ステージ内敵出現数
		this.enemyCountAll = 0;	//敵総出現数
		this.miss = 0;			//被撃墜数
		this.missStage = 0;		//ステージ内被撃墜数
		this.numContinue = 0;	//コンティニュー回数
		this.onContinue = false;
		this.onStageClear = false;

		//システム表示グループ
		/////////////////////////////////////////////////////////////////////////////
		this.sysdsp = new Group;
		this.sysdsp.x = 0;
		this.sysdsp.y = 0;

		//スコア表示
		/////////////////////////////////////////////////////////////////////////////
		var scoreLabel = new Label("SCORE : "+this.score);
		scoreLabel.x = 5;
		scoreLabel.y = 5;
		scoreLabel.color = "#ffffff";
		scoreLabel.font = "bold";
		scoreLabel.parent = this;
		scoreLabel.addEventListener('enterframe',function(){
			this.text = "SCORE : " + this.parent.score;
		});
		this.sysdsp.addChild(scoreLabel);

		//ＦＰＳ表示
		/////////////////////////////////////////////////////////////////////////////
		var fpsLabel = new Label(" ");
		fpsLabel.color = "#ffffff";
		fpsLabel.font = "bold";
		fpsLabel.x = 270;
		fpsLabel.y = 5;
		fpsLabel.fps = 0;
		fpsLabel.ms = 0;
		fpsLabel.bs = 0;
		fpsLabel.fpms = 0;
		fpsLabel.bms = 0;
		fpsLabel.s = 0;
		fpsLabel.count = 0;
		fpsLabel.wait = false;
		fpsLabel.control = false;
		fpsLabel.addEventListener('enterframe',function(){
			this.fps++;
			this.s = new Date().getSeconds();
			if( this.s != this.bs ){
				this.text = "FPS: " + this.fps+":"+spd;
				this.bs = this.s;
				this.fps = 0;
				this.count++;
			}
		});
		this.sysdsp.addChild(fpsLabel);

		//武装切替ボタン表示
		/////////////////////////////////////////////////////////////////////////////
		this.btnWeapon = new Sprite(32,32);
		this.btnWeapon.image = game.assets['media/button_weapon.png'];
		this.btnWeapon.x = 5;
		this.btnWeapon.y = 223;
		this.btnWeapon.opacity = 0.3;
		this.sysdsp.addChild(this.btnWeapon);

		//ボム投下ボタン表示
		/////////////////////////////////////////////////////////////////////////////
		this.btnBomb = new Sprite(32,32);
		this.btnBomb.image = game.assets['media/button_bomb.png'];
		this.btnBomb.x = 5;
		this.btnBomb.y = 283;
		this.btnBomb.opacity = 0.3;
		this.sysdsp.addChild(this.btnBomb);

		//ＳＥ　ＯＮ／ＯＦＦボタン表示
		/////////////////////////////////////////////////////////////////////////////
		this.btnSE = new Sprite(32,32);
		this.btnSE.image = game.assets['media/button_sound.png'];
		this.btnSE.x = 288;
		this.btnSE.y = 35;
		this.btnSE.opacity = 0.3;
		if(soundEnable)this.sysdsp.addChild(this.btnSE);

		//ボス耐久力残量表示
		/////////////////////////////////////////////////////////////////////////////
		this.Bmeter = new Sprite(310,10);
		this.Bmeter.x = 5;
		this.Bmeter.y = 20;
		this.Bmeter.max = 1000;
		this.Bmeter.visible = false;
		this.Bmeter.Brect = new Surface(310,10);
		this.Bmeter.Brect.context.fillStyle = 'rgba(0,255,0,1.0)';
		this.Bmeter.Brect.context.fillRect(0,0,310,10);
		this.Bmeter.image = this.Bmeter.Brect;
		this.Bmeter.boss = null;
		this.Bmeter.setMax = function(val){
			this.max = val;
		};
		this.Bmeter.setNum = function(val){
			var num = val / this.max * 310;
			this.Brect.context.fillStyle = 'rgba(0,255,0,1.0)';
			this.Brect.context.fillRect(0,0,num,10);
			this.Brect.context.fillStyle = 'rgba(255,0,0,1.0)';
			this.Brect.context.fillRect(num+1,0,310-num,10);
		};
		this.Bmeter.setBoss = function(boss){
			this.boss = boss;
			this.setMax(boss.def);
			this.setNum(boss.def);
		}
		this.Bmeter.onenterframe = function(){
			if( this.boss )this.setNum(this.boss.def);
		}
		this.sysdsp.addChild(this.Bmeter);

		//コンソールグループ
		/////////////////////////////////////////////////////////////////////////////
		this.console = new Group;
		this.console.x = 0;
		this.console.y = 14;

		//残機表示
		/////////////////////////////////////////////////////////////////////////////
		this.lifeDisp = new Group;
		this.lifeDisp.parent = this;
		this.lifeDisp.life = new Array(this.lifeMax);
		for( var i = 0; i < this.lifeMax; i++ ){
			this.lifeDisp.life[i] = new Sprite(32,32);
			this.lifeDisp.life[i].image = game.assets['media/myship.png'];
			this.lifeDisp.life[i].x = i*16-3;
			this.lifeDisp.life[i].y = 0;
			this.lifeDisp.life[i].scaleX = this.lifeDisp.life[i].scaleY = 0.5;
			if( i < this.life )this.lifeDisp.life[i].visible = true;
			else this.lifeDisp.life[i].visible = false;
			this.lifeDisp.addChild(this.lifeDisp.life[i]);
		}
		this.lifeDisp.reflesh = function(){
			for( var i = 0; i < this.parent.lifeMax; i++ ){
				if( i < this.parent.life )this.life[i].visible = true;
				else this.life[i].visible = false;
			}
		}
		this.console.addChild(this.lifeDisp);

		//残ボム数表示
		/////////////////////////////////////////////////////////////////////////////
		this.bombDisp = new Group;
		this.bombDisp.parent = this;
		this.bombDisp.bomb = new Array(this.bombMax);
		for( var i = 0; i < this.bombMax; i++ ){
			this.bombDisp.bomb[i] = new Sprite(32,32);
			this.bombDisp.bomb[i].image = game.assets['media/item.png'];
			this.bombDisp.bomb[i].frame = 1;
			this.bombDisp.bomb[i].x = i*18-3;
			this.bombDisp.bomb[i].y = 20;
//			this.bombDisp.bomb[i].scaleX = this.bombDisp.bomb[i].scaleY = 0.5;
			if( i < this.bomb )this.bombDisp.bomb[i].visible = true;
			else this.bombDisp.bomb[i].visible = false;
			this.bombDisp.addChild(this.bombDisp.bomb[i]);
		}
		this.bombDisp.reflesh = function(){
			for( var i = 0; i < this.parent.bombMax; i++ ){
				if( i < this.parent.bomb )this.bomb[i].visible = true;
				else this.bomb[i].visible = false;
			}
		}
		this.console.addChild(this.bombDisp);

		//ビット残りエネルギー表示
		/////////////////////////////////////////////////////////////////////////////
		this.Emeter = new Sprite(50,5);
		this.Emeter.x = 3;
		this.Emeter.y = 50;
		this.Emeter.max = 500;
		this.Emeter.visible = false;
		this.Emeter.Erect = new Surface(50,10);
		this.Emeter.Erect.context.fillStyle = 'rgba(255,255,0,1.0)';
		this.Emeter.Erect.context.fillRect(0,0,80,10);
		this.Emeter.image = this.Emeter.Erect;
		this.Emeter.setNum = function(val){
			var num = val / this.max * 50;
			this.Erect.context.fillStyle = 'rgba(255,255,0,1.0)';
			this.Erect.context.fillRect(0,0,num,10);
			this.Erect.context.fillStyle = 'rgba(255,0,0,1.0)';
			this.Erect.context.fillRect(num+1,0,50-num,10);
		};
		this.Emeter.onenterframe = function(){
			if( this.pl.bitEnergy > 0 ){
				this.visible = true;
				this.setNum(this.pl.bitEnergy);
			}else{
				this.visible = false;
			}
		}
		this.console.addChild(this.Emeter);

		//フェード用マスク
		/////////////////////////////////////////////////////////////////////////////
		this.mask = new Sprite(320,320);
		this.mask.image = game.assets['media/mask.png'];
		this.mask.opacity = 1;
		this.mask_w = new Sprite(320,320);
		this.mask_w.image = game.assets['media/mask_w.png'];
		this.mask_w.opacity = 0;

		//管理クラス
		/////////////////////////////////////////////////////////////////////////////
		var effectMax = (smartphone)?300:800;
		this.player = new Player(this);
		this.effects = new EffectGroup(effectMax);
		this.bullets = new BulletGroup(300,this.effects);
		this.bg = new BackGround(this.effects);
		this.enemies = new EnemyGroup(70,this.player,this.bullets,this.effects,this.bg);

		this.Emeter.pl = this.player;	//ビットエネルギー表示用

		//描画順に追加
		this.addChild(this.bg);				//バックグラウンド
		this.addChild(this.effects.under);	//エフェクト下位レイヤ
		this.addChild(this.enemies);		//敵
		this.addChild(this.player);			//プレイヤ
		this.addChild(this.effects.upper);	//エフェクト上位レイヤ
		this.addChild(this.bullets);		//弾
		this.addChild(this.console);		//自機情報表示
		this.addChild(this.sysdsp);			//システム情報表示
		this.addChild(this.mask);			//フェード用マスク
		this.addChild(this.mask_w);			//フェード用マスク（白）

		if( debugDsp ){
			//デバッグ用テキスト（ステージ進行チェック）
			/////////////////////////////////////////////////////////////////////////////
			this.advanceLabel = new Label( "advance 0/0" );
			this.advanceLabel.color = "#ffffff";
			this.advanceLabel.font = "bold";
			this.advanceLabel.x = 5;
			this.advanceLabel.y = 60;
			this.console.addChild( this.advanceLabel );

			//デバッグ用テキスト（弾使用量）
			/////////////////////////////////////////////////////////////////////////////
			var bulletLabel = new Label( "" );
			bulletLabel.color = "#ffffff";
			bulletLabel.font = "bold";
			bulletLabel.x = 5;
			bulletLabel.y = 80;
			bulletLabel.max = 0;
			bulletLabel.obj = this.bullets;
			bulletLabel.addEventListener('enterframe', function(){
				var num = this.obj.numUsing();
				this.text = "Bullet use : "+num+"/"+this.max+"/"+this.obj.num;
				if( this.max < num )this.max = num;
			});
			this.console.addChild( bulletLabel );

			//デバッグ用テキスト（敵使用量）
			/////////////////////////////////////////////////////////////////////////////
			var enemyLabel = new Label( "" );
			enemyLabel.color = "#ffffff";
			enemyLabel.font = "bold";
			enemyLabel.x = 5;
			enemyLabel.y = 100;
			enemyLabel.max = 0;
			enemyLabel.obj = this.enemies;
			enemyLabel.addEventListener('enterframe', function(){
				var num = this.obj.numUsing();
				this.text = "Enemy use : "+num+"/"+this.max+"/"+this.obj.num;
				if( this.max < num )this.max = num;
			});
			this.console.addChild( enemyLabel );

			//デバッグ用テキスト（エフェクト使用量）
			/////////////////////////////////////////////////////////////////////////////
			var effectLabel = new Label( "" );
			effectLabel.color = "#ffffff";
			effectLabel.font = "bold";
			effectLabel.x = 5;
			effectLabel.y = 120;
			effectLabel.max = 0;
			effectLabel.obj = this.effects;
			effectLabel.addEventListener('enterframe', function(){
				var num = this.obj.numUsing();
				this.text = "Effect use : "+num+"/"+this.max+"/"+this.obj.num;
				if( this.max < num )this.max = num;
			});
			this.console.addChild( effectLabel );
		}
	},
	/////////////////////////////////////////////////////////////////////////////
	//ゲーム初期化処理
	/////////////////////////////////////////////////////////////////////////////
	initGame:function(){
		this.score = 0;				//スコア
		this.stageNum =	startStage;	//現在ステージ
		this.life = 2;				//現在ライフ
		this.lifeDisp.reflesh();
		this.extend = 200000;		//エクステンド点数
		this.bomb = this.bombFirst;	//現在ボム
		this.bombDisp.reflesh();
		this.event = false;			//イベント実行中フラグ
		this.boss = false;			//ボス戦フラグ
		this.bossKill = false;		//ボス倒したフラグ
		this.kill = 0;				//撃墜数
		this.miss = 0;				//被撃墜数
		this.killStage = 0;			//ステージ内撃墜数
		this.missStage = 0;			//ステージ内被撃墜数
		this.enemyCount = 0;		//ステージ内敵出現数
		this.enemyCountAll = 0;		//敵総出現数

		//タイトル画面の難易度を取得
		difficulty = title.difficulty+1;
		diff = difficulty;
		
		//EASYは武装レベルを上げる
		if( difficulty == 1 ){
			this.player.level = 2;
		}

		this.initStage();
	},
	/////////////////////////////////////////////////////////////////////////////
	//ステージ初期化処理
	/////////////////////////////////////////////////////////////////////////////
	initStage:function(){
		this.time = 0;
		this.advance = 0;		//敵出現テーブル進度
		this.event = false;		//イベント実行中フラグ
		this.boss = false;		//ボス戦フラグ
		this.bossKill = false;	//ボス倒したフラグ
		this.killStage = 0;		//ステージ内撃墜数
		this.missStage = 0;		//ステージ内被撃墜数
		this.enemyCount = 0;	//ステージ内敵出現数
		this.phase = 0;			//ステージ進行フェーズ

		this.player.startup_first();

		//バックグラウンド、敵、弾、エフェクト初期化
		this.bg.init(this.stageNum);
		this.enemies.init();
		this.bullets.init();
		this.effects.init();
		this.console.y = 12;
		this.Bmeter.visible = false;
		this.time = 0;

		//ステージ別初期化処理
		
		//START表示
		
	},
	/////////////////////////////////////////////////////////////////////////////
	//ステージ解放処理
	/////////////////////////////////////////////////////////////////////////////
	releaseStage:function(){
		this.bg.release();
	},
	/////////////////////////////////////////////////////////////////////////////
	//コンティニュー処理
	/////////////////////////////////////////////////////////////////////////////
	initContinue:function(){
		this.score = 0;
		this.life = this.lifeFirst;
		this.bomb = this.bombFirst;
		this.lifeDisp.reflesh();
		this.bombDisp.reflesh();
	},
	/////////////////////////////////////////////////////////////////////////////
	//シーン開始
	/////////////////////////////////////////////////////////////////////////////
	onenter:function(){
		this.mask.opacity = 1;
		this.mask.tl.fadeOut(sec(0.5));
	},
	/////////////////////////////////////////////////////////////////////////////
	//フレーム毎処理
	/////////////////////////////////////////////////////////////////////////////
	onenterframe:function(){
		//ＢＧＭスタート
		if( this.time == 0 ){
			switch(this.stageNum){
				case 1:
					sounds.play('media/bgm_stage1.mp3',bgmVolume,true);
					this.stageData = stageData1;
					this.patterns = patterns1;
					break;
				case 2:
					sounds.play('media/bgm_stage2.mp3',bgmVolume,true);
					this.stageData = stageData2;
					this.patterns = patterns2;
					break;
				case 3:
					sounds.play('media/bgm_stage3.mp3',bgmVolume,true);
					this.stageData = stageData3;
					this.patterns = patterns3;
					break;
			}
		}

		//ゲームオーバー時処理コンティニュー判別
		if( this.onContinue ){
			this.onContinue = false;
			if( gameover.continueYes ){
				//コンティニュー用初期化
				this.initContinue();
				sounds.play();
			}else{
				//タイトルへ戻る
				sounds.stop();
				//ハイスコア更新
				if( this.score > highscore ){
					highscore = this.score;
					highscoreDiff = difficulty;
					highscoreStage = this.stageNum;
					if( this.boss )highscoreBoss = 1;
					else highscoreBoss = 0;

					//ローカルストレージへハイスコア情報を登録
/*
					localStorage['highscore'] = highscore;
					localStorage['highscoreDiff'] = highscoreDiff;
					localStorage['highscoreStage'] = highscoreStage;
					localStorage['highscoreBoss'] = highscoreBoss;
*/
				}
				game.popScene();
			}
			return;
		}

		//ステージクリア処理
		if( this.onStageClear ){
			this.onStageClear = false;
			this.releaseStage();
			this.stageNum++;
			//全ステージ終了判定
			if( this.stageNum > this.stageMax ){
				this.mask.opacity = 1;
				this.gameOver();
			}else{
				this.initStage();
			}
			return;
		}

		//ステージデータを読み込んで敵の出現パターンを作る
		if( this.time > sec(4) && this.time % sec(3) == 0 && !this.event && !this.boss && !this.mboss ){
			if( debugDsp )this.advanceLabel.text = "advance " + (this.advance/5+1) + "/"  + (this.stageData.length/5+1) + " :";
			for( var i = 0; i < 5; i++ ){
				var ad = this.stageData.charAt(this.advance);

				//難易度調整
				if( diff < 3 && i > 2 )ad = "_";

				//アイテムキャリア
				if( ad == 'R' || ad == 'S' || ad == 'T' || ad == 'U' ){
					var en = this.enemies.enterEnemy(null,'Carrier', rand(120)+100,-100,0);
					if( ad == 'R' ){
						en.item = 0;
					}else if( ad == 'S' ){
						en.item = 1;
					}else if( ad == 'T' ){
						en.item = 2;
					}else if( ad == 'U' ){
						en.item = 3;
					}
				}

				//ステージイベント開始トリガ
				if( ad == "V" ){
					this.bg.phase++;
					if( this.stageNum == 3 ){
						this.eventWarp();
					}
				}

				//ワーニング表示
				if( ad == "W" ){
					this.eventWarning();
				}

				//出現パターン処理
				var pattern = this.patterns[ad];
				for( var j in pattern ){
					var obj = pattern[j];
					if( obj.name != 'nop' ){
						var rx = rand(obj.rx/2)-obj.rx;
						var ry = rand(obj.ry/2)-obj.ry;
						var en = this.enemies.enterEnemy(null,obj.name,obj.x+rx,obj.y+ry,sec(obj.offset));
						if( en == null )break;
						en.killCount = 1;
						this.enemyCount++;

						//中ボス
						if( ad == "X" || ad == "Y" ){
							this.mBossSign = ad;
							this.bossObj = en;
							this.eventmBoss();
							this.mboss = true;
							this.mbosskill = false;
							this.Bmeter.setBoss(en);
						}

						//ステージボス
						if( ad == "Z" ){
							this.bossObj = en;
							this.eventBoss();
							this.boss = true;
							this.bosskill = false;
							this.Bmeter.setBoss(en);
						}
					}
				}
				if( debugDsp )this.advanceLabel.text += ad + ":";
				this.advance++;
			}
		}

		//自機操作
		var pl = this.player;
		if( !pl.auto && !this.event ){
			if( game.input.left  )pl.x -= pl.speed*spd;
			if( game.input.right )pl.x += pl.speed*spd;
			if( game.input.up    )pl.y -= pl.speed*spd;
			if( game.input.down  )pl.y += pl.speed*spd;
			if( game.input.a )this.enterBomb(pl.x,pl.y);
			if( game.input.b )pl.bitControl();

			//自機移動範囲制限
			var w = pl.sprite.width/2;
			var h = pl.sprite.height/2;
			if( pl.x < w )pl.x = w;
			if( pl.y < h )pl.y = h;
			if( pl.x > game.width - w )pl.x = game.width - w;
			if( pl.y > game.height - h )pl.y = game.height - h;

			//ショット
			pl.shot(this.touch);
		}

		//ボム効果継続中処理
		if( this.bombTime > 0 ){
			this.bombTime--;
			if( this.bombTime == 0 )this.bullets.forceErase = false;
		}

		//当たり判定処理
		this.collisionCheck();

		//ボス耐久力メーター表示
		if( this.boss && this.console.y < 24 || this.mboss && this.console.y < 24 ){
			if( this.time % spw == 0 )this.console.y++;
			if( this.console.y == 22 )this.Bmeter.visible = true;
		}
		if( !this.boss && !this.mboss && this.console.y > 14 ){
			this.console.y--;
		}

		//ボス破壊判定
		if( this.bossObj ){
			if( this.bossObj.def <= 0 ){
				if( this.mboss )this.mbosskill = true;
				if( this.boss )this.bosskill = true;
				this.bossObj = null;
			}
		}
		//中ボス戦終了
		if( this.mboss && this.mbosskill ){
			this.mboss = false;
			this.mbosskill = false;
			this.Bmeter.visible = false;
			this.tl.delay(sec(5)).then(function(){this.eventmBossEnd();});
		}
		//ステージボス戦終了
		if( this.boss && this.bosskill ){
			this.boss = false;
			this.bosskill = false;
			this.Bmeter.visible = false;
			this.stageClear();	//ステージクリア処理
		}

		//ステージ制御
		this.stageControl();

		sounds.onenterframe();

		this.time++;
	},
	//////////////////////////////////////////////////////////////////////////////
	//タッチ開始
	//////////////////////////////////////////////////////////////////////////////
	ontouchstart:function(e){
		if( this.event )return;
		
		var bx = this.btnBomb.x, by = this.btnBomb.y;
		if( bx < e.x && e.x < bx+32 && by < e.y && e.y < by+32 ){
			this.enterBomb(this.player.x,this.player.y);
			return;
		}
		var wx = this.btnWeapon.x, wy = this.btnWeapon.y;
		if( wx < e.x && e.x < wx+32 && wy < e.y && e.y < wy+32 ){
			this.player.bitControl();
			return;
		}
		var sx = this.btnSE.x, sy = this.btnSE.y;
		if( !smartphone && sx < e.x && e.x < sx+32 && sy < e.y && e.y < sy+32 ){
			if( seON ){
				seON = false;
				this.btnSE.frame = 1;
			}else {
				seON = true;
				this.btnSE.frame = 0;
			}
				
			return;
		}
		this.touch = true;
		this.touchX = e.x;
		this.touchY = e.y;
	},
	//////////////////////////////////////////////////////////////////////////////
	//タッチ移動
	//////////////////////////////////////////////////////////////////////////////
	ontouchmove:function(e) {
		if( this.event )return;
		var bx = this.btnBomb.x, by = this.btnBomb.y;
		if( bx < e.x && e.x < bx+32 && by < e.y && e.y < by+32 )return;
		var wx = this.btnWeapon.x, wy = this.btnWeapon.y;
		if( wx < e.x && e.x < wx+32 && wy < e.y && e.y < wy+32 )return;
		var sx = this.btnSE.x, sy = this.btnSE.y;
		if( !smartphone && sx < e.x && e.x < sx+32 && sy < e.y && e.y < sy+32 )return;

		this.moveX = e.x - this.touchX;
		this.moveY = e.y - this.touchY;
		this.player.x += this.moveX;
		this.player.y += this.moveY;
		this.touchX = e.x;
		this.touchY = e.y;
	},
	//////////////////////////////////////////////////////////////////////////////
	//タッチ終了
	//////////////////////////////////////////////////////////////////////////////
	ontouchend:function(e){
		if( this.event )return;
		var bx = this.btnBomb.x, by = this.btnBomb.y;
		if( bx < e.x && e.x < bx+32 && by < e.y && e.y < by+32 )return;
		var wx = this.btnWeapon.x, wy = this.btnWeapon.y;
		if( wx < e.x && e.x < wx+32 && wy < e.y && e.y < wy+32 )return;
		var sx = this.btnSE.x, sy = this.btnSE.y;
		if( !smartphone && sx < e.x && e.x < sx+32 && sy < e.y && e.y < sy+32 )return;

		this.touch = false;
		this.moveX = e.x - this.touchX;
		this.moveY = e.y - this.touchY;
		this.player.x += this.moveX;
		this.player.y += this.moveY;
		this.touchX = e.x;
		this.touchY = e.y;
	},
	//////////////////////////////////////////////////////////////////////////////
	//ステージ制御
	//////////////////////////////////////////////////////////////////////////////
	stageControl:function(){
	},
	//////////////////////////////////////////////////////////////////////////////
	//ステージクリア処理
	//////////////////////////////////////////////////////////////////////////////
	stageClear:function(){
		//８秒後にシーン切替
		this.tl.delay(sec(8));
		this.tl.then(function(){
			this.onStageClear = true;
			var sc = new StageClear(this,this.stageNum,this.killStage,this.enemyCount,this.missStage);
			game.pushScene(sc);
			sc = null;
		});
	},
	//////////////////////////////////////////////////////////////////////////////
	//ゲーム終了
	//////////////////////////////////////////////////////////////////////////////
	gameOver:function(){
		if( this.score > highscore ){
			highscore = this.score;
			highscoreDiff = difficulty;
		}
		var text = "SCORE:"+highscore;
		switch( highscoreDiff ){
			case 1:
				text+="(EASY)";
				break;
			case 2:
				text+="(NORMAL)";
				break;
			case 3:
				text+="(HARD)";
				break;
			case 4:
				text+="(HELL)";
				break;
		}
		game.end(highscore*highscoreDiff,text);
	},
	//////////////////////////////////////////////////////////////////////////////
	//敵当たり判定チェック
	//////////////////////////////////////////////////////////////////////////////
	collisionCheck:function(){
		//ショットから敵に衝突判定
		for( var i = 0; i < this.bullets.num; i++ ){
			var bl = this.bullets.getObject(i);
			if( !bl.using || bl.type != B_SHOT )continue;
			var en = this.enemies.hitTest(bl);
			if( en ){
				if( en.type == E_ITEM )continue;
				en.damaged(bl.power,this.touch);
				if( en.isDead() ){
					this.score += en.point;
					this.kill+=en.killCount;
					this.killStage+=en.killCount;
					if( this.score > highscore )highscore = this.score;
					if( this.score >= this.extend ){
						this.life++;
						this.lifeDisp.reflesh();
						this.extend += 200000;
					}
				}
				var size = 1.0;
				if( bl.power < 10 )size = 0.7;
				this.effects.enterEffect(null,'shot',bl.x,bl.y,0,0,size,null);
				bl.release();
			}
		}

		//自機当たり判定
		//自機から弾、敵側に衝突判定
		var pl = this.player;
		var bl = this.bullets.hitTestBullet(pl);
		if( bl ){
			if( pl.collision && pl.muteki == 0 && !debugMuteki ){
				if( this.autoBomb )this.enterBomb();
				else this.playerMiss();
			}
		}else{
			var en = this.enemies.hitTestSky(pl);
			if( en ){
				//敵と接触
				if( en.type != E_ITEM && pl.collision && pl.muteki == 0 && !debugMuteki && this.bombTime == 0 ){
					if( this.autoBomb )this.enterBomb();
					else this.playerMiss();
				}
				//アイテム取得
				if( en.type == E_ITEM ){
					this.itemGet(en.name);
					en.release();
				}
			}
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//アイテム取得
	//////////////////////////////////////////////////////////////////////////////
	itemGet:function(type){
		var pl = this.player;
		switch(type){
			case 'Item_Bit':
				pl.bitEnergy = 500;
				pl.bitOK = true;
				pl.bitOpen();
				sounds.playSE('media/se_powerup.mp3');
				break;
			case 'Item_Power':
				pl.level++;
				sounds.playSE('media/se_powerup.mp3');
				break;
			case 'Item_Bomb':
				this.bomb++;
				if( this.bomb > this.bombMax ){
					this.bomb = this.bombMax;
					this.score+=10000;
				}
				this.bombDisp.reflesh();
				sounds.playSE('media/se_powerup.mp3');
				break;
			case 'Item_1up':
				this.life++;
				if( this.life > this.lifeMax ){
					this.life = this.lifeMax;
					this.score+=10000;
				}
				this.lifeDisp.reflesh();
				sounds.playSE('media/se_powerup.mp3');
				break;
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//プレイヤミス
	//////////////////////////////////////////////////////////////////////////////
	playerMiss:function(){
		//アイテムドロップ
		if( this.player.level > 1 ){
			for( var i = 0; i < this.player.level-1; i++ )this.enemies.enterEnemy(null,'Item_Power',this.player.x,this.player.y,0);
		}

		//残機減
		this.life--;
		this.lifeDisp.reflesh();
		this.miss++;
		this.missStage++;
		this.player.dead();

			//難易度がEASY以外は武装を初期化
		if( difficulty == 1 ){
		}else if( difficulty == 2 ){
			this.player.level-=2;	//NORMALは２レベルダウン
			if( this.player.level < 0 )this.player.level = 0;
		}else{
			this.player.level = 0;
		}

		//残機０
		if( this.life < 0 ){
			//２秒後にコンティニュー画面表示
			this.tl.delay(sec(2)).then(function(){
				this.kill = 0;
				this.onContinue = true;
				sounds.pause();
				game.pushScene(gameover);
			});
		}else{
			this.bullets.on = false;
			this.tl.delay(sec(3)).then(function(){
				this.bullets.on = true;
			});
			this.bomb = this.bombFirst;
			this.bombDisp.reflesh();
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//ボム投下
	//////////////////////////////////////////////////////////////////////////////
	enterBomb:function(x,y){
		if( this.bomb == 0 || this.bombTime > 0 || !this.player.shotON )return;

		//エフェクト表示
		var rad = 0;
		for( var i = 0; i < 40; i++ ){
			var rad2 = rad;
			var r = 5;
			var bx = Math.sin(rad2)*i*r;
			var by = Math.cos(rad2)*i*r;
			var wait = spw*i;
			this.effects.enterEffect(null,'burn2',x+bx,y+by,0,0,1,0,0,wait);
			rad2+=1.57;
			bx = Math.sin(rad2)*i*r;
			by = Math.cos(rad2)*i*r;
			this.effects.enterEffect(null,'burn2',x+bx,y+by,0,0,1,0,0,wait);
			rad2+=1.57;
			bx = Math.sin(rad2)*i*r;
			by = Math.cos(rad2)*i*r;
			this.effects.enterEffect(null,'burn2',x+bx,y+by,0,0,1,0,0,wait);
			rad2+=1.57;
			bx = Math.sin(rad2)*i*r;
			by = Math.cos(rad2)*i*r;
			this.effects.enterEffect(null,'burn2',x+bx,y+by,0,0,1,0,0,wait);
			rad+=0.3;
		}
		var e = this.effects.enterEffect(null,'bomb',x,y,0,0,4.0,0,0,sec(1));
		e.sprite.opacity = 0.8;

		this.mask_w.tl.delay(sec(0.5)).fadeIn(sec(0.1)).fadeOut(sec(0.3));

		//一定時間敵ダメージ付加
		var damage = new Group;
		damage.parent = this;
		for( var i = 0;i < 10; i++ ){
			damage.tl.then(function(){this.parent.addDamage();}).delay(sec(0.2));
		}
		damage.tl.then(function(){this.parent.removeChild(this);})
		this.addChild(damage);

		sounds.playSE('media/se_bomb4.mp3',seVolume*0.6,true);
		this.bullets.forceErase = true;	//強制弾消し
		this.bombTime = this.bombTimeMax;
		this.bomb--;
		this.bombDisp.reflesh();
	},
	//////////////////////////////////////////////////////////////////////////////
	//画面上敵にダメージ付加
	//////////////////////////////////////////////////////////////////////////////
	addDamage:function(pow){
		if( pow == undefined )pow = 100;
		for( var i = 0;i < this.enemies.num; i++ ){
			var en = this.enemies.getObject(i);
			if( en.using && en.collision ){
				if( en.name.substring(0,4) != 'Item' )en.damaged(pow,false);
				if( en.isDead() ){
					this.score += en.point;
					this.kill+=en.killCount;
					this.killStage+=en.killCount;;
					if( this.score > highscore )highscore = this.score;
					if( this.score >= this.extend ){
						this.life++;
						this.lifeDisp.reflesh();
						this.extend += 200000;
					}
				}
			}
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//ワープイベント
	//////////////////////////////////////////////////////////////////////////////
	eventWarp:function(){
		if( this.event )return;
		this.event = true;
		//プレイヤーを中心下部へ移動
		this.player.tl.moveTo(160,200,sec(2));
		this.player.sprite.tl.delay(sec(4)).fadeOut(sec(1)).delay(sec(4)).fadeIn(sec(1));

		//ワープエフェクト
		var ef = this.effects.enterEffect(null,'warp',160,200,0,0,1,0,0,0,funcWarp);
		ef.sprite.opacity = 0;
		ef.sprite.tl.delay(sec(3)).fadeIn(sec(2)).fadeOut(sec(2));
		ef.sprite.frame = 6;
		ef.start = false;
		ef.open = true;
		ef.tl.delay(sec(3)).then(function(){this.start=true;}).delay(sec(2)).then(function(){this.open=false;});

		var ef2 = this.effects.enterEffect(null,'warp',160,200,0,0,1,0,0,0,funcWarp);
		ef2.sprite.opacity = 0;
		ef2.sprite.tl.delay(sec(7)).fadeIn(sec(2)).fadeOut(sec(2));
		ef2.sprite.frame = 6;
		ef2.start = false;
		ef2.open = true;
		ef2.tl.delay(sec(7)).then(function(){this.start=true;}).delay(sec(2)).then(function(){this.open=false;});

		//シーン転換
		this.mask_w.tl.delay(sec(6)).fadeIn(sec(1)).delay(sec(1)).fadeOut(sec(1));

		//背景切り替えとイベント状態解除
		this.tl.
		delay(sec(7)).then(function(){this.bg.phase++;}).
		delay(sec(4)).then(function(){this.event=false;});
	},
	//////////////////////////////////////////////////////////////////////////////
	//ワーニング表示イベント
	//////////////////////////////////////////////////////////////////////////////
	eventWarning:function(){
		sounds.play('media/bgm_warning.mp3',bgmVolume,false);
		var grp = new Group;
		grp.warn = new Array(20);
		var i = 0;
		for( var y = 0; y < 2; y++ ){
			for( var x = 0; x < 10; x++ ){
				grp.warn[i] = new Sprite(32,25);
				grp.warn[i].image = game.assets['media/warning.gif'];
				grp.warn[i].x = x*32;
				grp.warn[i].y = 320+y*25;
				grp.warn[i].frame = i;
				grp.warn[i].opacity = 0.7;
//				grp.warn[i].alphaBlending = 'lighter';
				grp.warn[i].tl.delay(x*spw+y*spw*2).moveTo(x*32,135+y*25,sec(0.5),enchant.Easing.SIN_EASEOUT);
				grp.addChild(grp.warn[i]);
				i++;
			}
		}
		grp.parent = this;
		grp.time = 0;
		grp.onenterframe = function(){
			if( this.time == sec(2) ){
				var i = 0;
				for( var y = 0; y < 2; y++ ){
					for( var x = 0; x < 10; x++ ){
						//点滅表示
//						this.warn[i].tl.hide().delay(sec(0.5)).then(function(){this.opacity=0.7;}).delay(sec(1));
//						this.warn[i].tl.hide().delay(sec(0.5)).then(function(){this.opacity=0.7;}).delay(sec(1));
						this.warn[i].tl.then(function(){this.visible=false;}).delay(sec(0.5)).then(function(){this.visible=true;}).delay(sec(1));
						this.warn[i].tl.then(function(){this.visible=false;}).delay(sec(0.5)).then(function(){this.visible=true;}).delay(sec(1));
						//上下に分離して画面外へ
						if( y == 0 )this.warn[i].tl.delay(x*spw).moveTo(x*32,320+y*25,sec(0.3),enchant.Easing.SIN_EASEIN);
						else this.warn[i].tl.delay(x*spw).moveTo(x*32,-30,sec(0.3),enchant.Easing.SIN_EASEIN);
						i++;
					}
				}
			}
			if( this.time == sec(10) ){
				this.parent.removeChild(this);
			}
			this.time++;
		}
		this.addChild(grp);
	},
	//////////////////////////////////////////////////////////////////////////////
	//中ボスイベント
	//////////////////////////////////////////////////////////////////////////////
	eventmBoss:function(){
		var obj;
		switch(this.stageNum){
			case 3:
				if( this.mBossSign == "X" )sounds.play('media/bgm_stage1b.mp3',bgmVolume,true);
				break;
			default:
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//中ボス終了イベント
	//////////////////////////////////////////////////////////////////////////////
	eventmBossEnd:function(){
		var obj;
		switch(this.stageNum){
			case 3:
				if( this.mBossSign == "X" )sounds.play('media/bgm_stage3.mp3',bgmVolume,true);
				break;
			default:
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//ボスイベント
	//////////////////////////////////////////////////////////////////////////////
	eventBoss:function(){
		var obj;
		switch(this.stageNum){
			case 1:
				sounds.play('media/bgm_stage1b.mp3',bgmVolume,true);
				break;
			case 2:
				sounds.play('media/bgm_stage1b.mp3',bgmVolume,true);
				break;
			case 3:
				sounds.play('media/bgm_stage1b.mp3',bgmVolume,true);
				break;
			default:
		}
	}
});

//ワープエフェクトアニメーション用
var funcWarp = function()
{
	if( !this.start )return;

	if( this.time % spw*6 == 0 ){
		if( this.open ){
			this.sprite.frame--;
		}else{
			this.sprite.frame++;
		}
		if( this.sprite.frame == 7 )this.release();
		if( this.sprite.frame == -1 ){
			this.sprite.frame = 0;
		}
	}
}
