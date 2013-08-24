/*

	PlanetBuster2
	title.js
	2012/07/02
	This program is MIT lisence.

*/

enchant();

//////////////////////////////////////////////////////////////////////////////
//タイトル画面
//////////////////////////////////////////////////////////////////////////////
Title = Class.create(enchant.Scene,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(){
		enchant.Scene.call(this);

		this.sel = 0;	//選択中メニュー 0:非表示中　1:start 2:config 3:end
		this.sel2 = 0;	//前フレーム選択中メニュー
		this.sel3 = 0;	//前フレーム選択中メニュー
		this.ready = false;	//入力OKフラグ
		this.difficulty = 1;	//選択難易度
		this.interval = 0;	//キー入力インターバル

		//表示グループ
		this.grp = new Group();
		this.addChild(this.grp);

		//バック
		this.bg1 = new Sprite(320,640);
		this.bg1.image = game.assets['media/title_back.png'];
		this.bg1.y = 0;
//		this.bg1.scaleX = -1;
		this.grp.addChild(this.bg1);

		//タイトルロゴ
		this.lg1 = new Sprite(160,30);
		this.lg1.image = game.assets['media/title_1.png'];
		this.lg1.alphaBlending ="lighter";
		this.lg1.opacity = 0;
		this.grp.addChild(this.lg1);
		this.lg2 = new Sprite(160,30);
		this.lg2.image = game.assets['media/title_2.png'];
		this.lg2.alphaBlending ="lighter";
		this.lg2.opacity = 0;
		this.grp.addChild(this.lg2);
		
		//選択カーソル
		this.cursol = new Sprite(95,30);
		this.cursol.rect = new Surface(95,30);
		this.cursol.rect.context.fillStyle = 'rgba(0,255,0,0.8)';
		this.cursol.rect.context.fillRect(0,0,95,30);
		this.cursol.image = this.cursol.rect;
		this.grp.addChild(this.cursol);

		//難易度
		this.diff = new Sprite(100,30);
		this.diff.image = game.assets['media/title_difficulty.png'];
		this.diff.frame = this.difficulty;
		this.diff.alphaBlending ="lighter";
		this.diff.opacity = 0;
		this.grp.addChild(this.diff);

		//START
		this.start = new Sprite(90,30);
		this.start.image = game.assets['media/title_start.png'];
		this.start.alphaBlending ="lighter";
		this.start.opacity = 0;
		this.grp.addChild(this.start);

		//CONFIG
		this.config = new Sprite(95,30);
		this.config.image = game.assets['media/title_tutorial.png'];
		this.config.alphaBlending ="lighter";
		this.config.opacity = 0;
		this.grp.addChild(this.config);

		//End
		this.exit = new Sprite(90,30);
		this.exit.image = game.assets['media/title_end.png'];
		this.exit.alphaBlending ="lighter";
		this.exit.opacity = 0;
		this.grp.addChild(this.exit);

		//説明ラベル下
		this.manual_u = new Sprite(320,20);
		this.manual_u.rect = new Surface(320,20);
		this.manual_u.rect.context.fillStyle = 'rgba(0,0,0,0.7)';
		this.manual_u.rect.context.fillRect(0,0,320,20);
		this.manual_u.image = this.manual_u.rect;
		this.manual_u.x = 0;
		this.manual_u.y = 300;
		this.addChild(this.manual_u);

		//説明用ラベル
		this.manual = new Label(" ");
		this.manual.color = "#ffffff";
		this.manual.font = "bold";
		this.manual.x = 40;
		this.manual.y = 305;
		this.addChild(this.manual);

		//フェード用マスク
		this.mask = new Sprite(320,320);
		this.mask.image = game.assets['media/mask.png'];
		this.mask.parent = this;
		this.addChild(this.mask);

		//HighScore表示
		this.hs = new Label("HighScore : 0");
		this.hs.color = "#ffffff";
		this.hs.font = "bold";
		this.hs.x = 5;
		this.hs.y = 5;
		this.addChild(this.hs);

		//HighScore時難易度表示
		this.hsd = new Label("(NORMAL)");
		this.hsd.color = "#ffffff";
		this.hsd.font = "bold";
		this.hsd.x = 5;
		this.hsd.y = 20;
		this.addChild(this.hsd);
	},
	//シーン開始時処理
	onenter:function(){
		this.lg1.tl.clear();
		this.lg2.tl.clear();
		this.diff.tl.clear();
		this.cursol.tl.clear();
		this.start.tl.clear();
		this.config.tl.clear();
		this.exit.tl.clear();

		this.lg1.opacity = 0;
		this.lg2.opacity = 0;
		this.diff.opacity = 0;
		this.cursol.opacity = 0;
		this.start.opacity = 0;
		this.config.opacity = 0;
		this.exit.opacity = 0;

		var st = sec(1);
		this.lg1.x = 320;
		this.lg1.y = 45;
		this.lg1.tl.delay(9).fadeIn(st).and().moveTo(70,this.lg1.y,st,enchant.Easing.CUBIC_EASEOUT);
		this.lg2.x = -160;
		this.lg2.y = this.lg1.y+30;
		this.lg2.tl.delay(9).fadeIn(st).and().moveTo(93,this.lg1.y+30,st,enchant.Easing.CUBIC_EASEOUT);

		this.diff.x = 110;
		this.diff.y = 145;
		this.diff.tl.delay(st/2).fadeIn(st/2).and().moveBy(0,-10,st,enchant.Easing.CUBIC_EASEOUT);

		this.start.x = 115;
		this.start.y = 200;
		this.start.tl.delay(st/2).fadeIn(st/2).and().moveBy(0,-10,st,enchant.Easing.CUBIC_EASEOUT);

		this.config.x = 112;
		this.config.y = 235;
		this.config.tl.delay(st/2).fadeIn(st/2).and().moveBy(0,-10,st,enchant.Easing.CUBIC_EASEOUT);

		this.exit.x = 115;
		this.exit.y = 265;
		this.exit.tl.delay(st/2).fadeIn(st/2).and().moveBy(0,-10,st,enchant.Easing.CUBIC_EASEOUT);

		this.cursol.x = 112;
		this.cursol.y = 200;

		this.tl.delay(st*2).then(function(){this.ready=true});

		this.mask.opacity = 1;
		this.mask.tl.fadeOut(sec(0.25));
		this.bg1.opacity = 1;
		this.click = 0;
		this.result = -1;
		this.time = 0;
		this.sel = 0;
		this.sel2 = 0;
		this.ready = false;
		this.select = false;

		//ハイスコア＆ハイスコア難易度表示
		this.hs.text = "HighScore : "+highscore;
		switch( highscoreDiff ){
			case 1:
				this.hsd.text = "(EASY)";
				break;
			case 2:
				this.hsd.text = "(NORMAL)";
				break;
			case 3:
				this.hsd.text = "(HARD)";
				break;
			case 4:
				this.hsd.text = "(HELL)";
				break;
		}
		this.hs.visible = true;
		this.hsd.visible = true;
	},
	//シーン終了時処理
	onexit:function(){
	},
	onenterframe:function(){
		if( !this.ready )return;
		if( this.interval == 0 ){
			if( game.input.up ){
				this.sel--;
				if( this.sel < 1 )this.sel = 1;
				this.sel3 = this.sel;
				this.interval = sec(0.2);
			}
			if( game.input.down ){
				this.sel++;
				if( this.sel > 3 )this.sel = 3;
				this.sel3 = this.sel;
				this.interval = sec(0.2);
			}

			if( game.input.left ){
				this.difficulty--;
				if( this.difficulty < 0 )this.difficulty = 0;
				this.interval = sec(0.2);
			}
			if( game.input.right ){
				this.difficulty++;
				if( this.difficulty > 2 )this.difficulty = 2;
				this.interval = sec(0.2);
			}
		}else{
			this.interval--;
		}
		if( this.sel != 0 ){
			this.cursol.opacity = 1;
		}

		//難易度
		this.diff.frame = this.difficulty;

		//選択バー移動
		if( this.sel != this.sel2 ){
			this.cursol.tl.clear();
			sounds.playSE('media/se_ti.mp3',seVolume*0.5);
			switch( this.sel ){
				case 1:
					this.cursol.tl.moveTo(112,190,sec(0.25),enchant.Easing.CUBIC_EASEOUT);
					this.manual.x = 110;
					this.manual.text = "ゲームを開始します";
					break;
				case 2:
					this.cursol.tl.moveTo(112,225,sec(0.25),enchant.Easing.CUBIC_EASEOUT);
					this.manual.x = 90;
					this.manual.text = "チュートリアルに移動します";
					break;
				case 3:
					this.cursol.tl.moveTo(112,255,sec(0.25),enchant.Easing.CUBIC_EASEOUT);
					this.manual.x = 50;
					this.manual.text = "ゲームを終了して9leapへスコアを登録します";
					break;
			}
		}
		this.sel2 = this.sel;
		this.time++;
	},
	ontouchstart:function(e){
//		sounds.playSE('media/se_pi.mp3');
		if( this.click == 0 ){
			this.lg1.tl.skip(sec(3));
			this.lg2.tl.skip(sec(3));
			this.diff.tl.skip(sec(3));
			this.start.tl.skip(sec(3));
			this.config.tl.skip(sec(3));
			this.exit.tl.skip(sec(3));
			this.tl.skip(sec(3));
			this.click++;
			return;
		}
		if( e.x > 110 && e.x < 220 ){
			if( e.y > 135 && e.y < 165 && this.interval == 0 ){
				sounds.playSE('media/se_ti.mp3',seVolume*0.5);
				this.difficulty++;
				if( this.difficulty > 2 )this.difficulty = 0;
				this.interval = sec(0.2);
			}
		}
		if( e.x > 120 && e.x < 210 ){
			if( e.y > 190 && e.y < 220 )this.sel = 1;
			if( e.y > 225 && e.y < 255 )this.sel = 2;
			if( e.y > 255 && e.y < 285 )this.sel = 3;
			if( e.y > 190 && e.y < 285 && this.sel == this.sel3 && !this.select ){
				this.select = true;
				this.selectMenu();
			}
		}
		this.sel3 = this.sel;
	},
	ontouchmove:function(e){
		if( e.x > 120 && e.x < 210 ){
			if( e.y > 190 && e.y < 220 )this.sel = 1;
			if( e.y > 225 && e.y < 255 )this.sel = 2;
			if( e.y > 255 && e.y < 285 )this.sel = 3;
		}
		this.sel3 = this.sel;
	},
	ontouchend:function(e){
		if( e.x > 120 && e.x < 210 ){
			if( e.y > 190 && e.y < 220 )this.sel = 1;
			if( e.y > 225 && e.y < 255 )this.sel = 2;
			if( e.y > 255 && e.y < 285 )this.sel = 3;
		}
		this.sel3 = this.sel;
	},
	fadeout:function(){
		this.bg1.tl.fadeOut(sec(0.25));
		this.lg1.tl.fadeOut(sec(0.25));
		this.lg2.tl.fadeOut(sec(0.25));
		this.diff.tl.fadeOut(sec(0.25));
		this.start.tl.fadeOut(sec(0.25));
		this.config.tl.fadeOut(sec(0.25));
		this.exit.tl.fadeOut(sec(0.25));
	},
	selectMenu:function(){
		this.hs.visible = false;
		this.hsd.visible = false;
		this.fadeout();
		switch(this.sel){
			case 1:
				this.mask.parent = this;
				sounds.playSE('media/se_byu.mp3',seVolume*0.6);
				this.mask.tl.fadeIn(sec(0.25)).then(function(){
					main.initGame();
					game.pushScene(main);
//					game.pushScene(tutorial);
				});
				break;
			case 2:
				sounds.playSE('media/se_byu.mp3',seVolume*0.6);
				this.mask.tl.fadeIn(sec(0.25)).then(function(){
					game.pushScene(tutorial);
//					game.pushScene(config);
				});
				break;
			case 3:
				main.gameOver();
				break;
			default:
				break;
		}
	}
});

//////////////////////////////////////////////////////////////////////////////
//自機選択画面
//////////////////////////////////////////////////////////////////////////////
MyShipSelect = Class.create(enchant.Scene,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(){
		enchant.Scene.call(this);
	},
	onenterframe:function(){
	},
	ontouchend:function(){
	}
});

//////////////////////////////////////////////////////////////////////////////
//チュートリアル
//////////////////////////////////////////////////////////////////////////////
Tutorial = Class.create(enchant.Scene,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(){
		enchant.Scene.call(this);
		this.grp1 = new Group;
		this.addChild(this.grp1);
		this.grp2 = new Group;
		this.addChild(this.grp2);
		
		//スキップボタン
		var skip = new Text(320-16*4,5,"SKIP");
		this.grp2.addChild(skip);

		//説明ページ
		this.img1 = new Sprite(320,320);
		this.img1.image = game.assets['media/tutorial_1.png'];
		this.grp1.addChild(this.img1);
		this.img2 = new Sprite(320,320);
		this.img2.image = game.assets['media/tutorial_2.png'];
		this.grp1.addChild(this.img2);

		//現在ページ
		this.page = 0;
		this.pageMax = 8;
		this.touch = true;
	},
	onenter:function(){
		this.img1.x = 0;
		this.img1.opacity = 1;
		this.img2.x = 320;
		this.img2.opacity = 1;
		sounds.pause();
	},
	onenterframe:function(){
	},
	ontouchend:function(e){
		//スキップボタン押された
		if( e.x > 245 && e.y < 24 ){
			this.touch = true;
			this.page = this.pageMax-1;
		}
		if( !this.touch )return;
		if( this.page % 2 == 0 ){
			this.img1.tl.moveBy(-320,0,sec(0.2),enchant.Easing.CIRC_EASEOUT).and().fadeOut(sec(0.2)).then(function(){this.x=320;this.opacity=1;});
			this.img2.tl.moveBy(-320,0,sec(0.2),enchant.Easing.CIRC_EASEOUT);
		}else{
			this.img2.tl.moveBy(-320,0,sec(0.2),enchant.Easing.CIRC_EASEOUT).and().fadeOut(sec(0.2)).then(function(){this.x=320;this.opacity=1;});
			this.img1.tl.moveBy(-320,0,sec(0.2),enchant.Easing.CIRC_EASEOUT);
		}
		this.page++;
		var pg = this.page+2;
		switch(this.page%2){
			case 1:
				this.img1.next = 'media/tutorial_'+pg+'.png';
				this.img1.tl.then(function(){this.image = game.assets[this.next];});
//				this.img1.image = game.assets['media/tutorial_'+pg+'.png'];
				break;
			case 0:
				this.img2.next = 'media/tutorial_'+pg+'.png';
				this.img2.tl.then(function(){this.image = game.assets[this.next];});
//				this.img2.image = game.assets['media/tutorial_'+pg+'.png'];
				break;
		}
		this.touch = false;
		this.tl.delay(sec(0.5)).then(function(){this.touch = true;});
		if( this.page == this.pageMax ){
			this.img1.tl.clear().fadeOut(sec(0.5));
			this.img2.tl.clear().fadeOut(sec(0.5));
			this.tl.clear();
			this.tl.delay(sec(0.5)).then(function(){sounds.play();game.popScene();});
		}
	}
});

//////////////////////////////////////////////////////////////////////////////
//ステージクリア画面
//////////////////////////////////////////////////////////////////////////////
StageClear = Class.create(enchant.Scene,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(parent,stageNum,killStage,enemyCount,missStage){
		enchant.Scene.call(this);

		//バックグラウンド
		this.bg = new Sprite(320,320);
		this.bg.image = game.assets['media/mask.png'];
		this.bg.opacity = 0;
		this.addChild(this.bg);
		this.bg.tl.delay(sec(1)).show();

		//STAGE CLEAR
		this.text1_1 = new Text( -200, 320, "STAGE" );
		this.addChild(this.text1_1);
		this.text1_2 = new Text( -200, 320, "CLEAR" );
		this.addChild(this.text1_2);

		//HIT BONUS
		this.text2_1 = new Text( 420, 320, "HIT BONUS" );
		this.addChild(this.text2_1);
		this.text2_2 = new MutableText( 420, 320,16*10, "0" );
		this.addChild(this.text2_2);
		this.text2_3 = new MutableText( 420, 320,16*10, "0" );
		this.addChild(this.text2_3);

		//HIT RATIO
		this.text3_1 = new Text( -200, 320, "HIT RATIO" );
		this.addChild(this.text3_1);
		this.text3_2 = new MutableText( -200, 320,16*7, "100.00%" );
		this.addChild(this.text3_2);
		this.text3_3 = new MutableText( -200, 320,16*9, "0" );
		this.addChild(this.text3_3);

		//NO MISS BONUS
		this.text4_1 = new Text( 420, 320, "NO MISS BONUS" );
		this.addChild(this.text4_1);
		this.text4_2 = new MutableText( 420, 320,16*9, "0" );
		this.addChild(this.text4_2);

		//TOUCH or CLICK
		this.text5 = new Text( 48, 500, "TOUCH or CLICK" );
		this.addChild(this.text5);

		//フェード用マスク
		this.mask = new Sprite(320,320);
		this.mask.image = game.assets['media/mask.png'];
		this.mask.opacity = 0;
		this.addChild(this.mask);
		this.mask_w = new Sprite(320,320);
		this.mask_w.image = game.assets['media/mask_w.png'];
		this.mask_w.opacity = 0;
		this.addChild(this.mask_w);
		this.mask_w.tl.fadeIn(sec(1)).fadeOut(sec(0.5));

		this.tl.delay(sec(1.5)).then(function(){this.phase=1;});

		//クリアボーナス計算
		//撃墜数
		this.bonus1 = killStage*stageNum*100;
		//撃墜率
		this.bonus2 = 0;
		var ratio = killStage/enemyCount*100;
		if( ratio >= 90  )this.bonus2 = 10000;
		if( ratio == 100 )this.bonus2 = 30000;
		//ノーミス
		this.bonus3 = 0;
		if( missStage == 0 )this.bonus3 = 20000*stageNum;

		//ボーナス表示編集
		this.text2_2.text = killStage+"x"+stageNum*100;
		this.text2_3.text = this.bonus1+"pts";
		this.text3_2.text = ratio.toFixed(2)+"%";
		this.text3_3.text = this.bonus2+"pts";
		this.text4_2.text = this.bonus3+"pts";
		
		//ボーナス加算
		parent.score += this.bonus1;
		parent.score += this.bonus2;
		parent.score += this.bonus3;

		pause = true;
		this.phase = 0;
	},
	onenter:function(){
		//TL設定
		//STAGE CLEAR
		var y = 20;
		this.text1_1.tl.delay(sec(1.0)).moveTo( 70,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		this.text1_2.tl.delay(sec(1.1)).moveTo(170,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		//HIT BONUS
		y+=50;
		this.text2_1.tl.delay(sec(1.1)).moveTo( 10,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		px = (7-this.text2_2.text.length)*16;
		this.text2_2.tl.delay(sec(1.2)).moveTo(192+px	,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		y+=30;
		var px = (9-this.text2_3.text.length)*16;
		this.text2_3.tl.delay(sec(1.3)).moveTo(160+px,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		//HIT RATIO
		y+=40;
		this.text3_1.tl.delay(sec(1.3)).moveTo( 10,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		px = (7-this.text3_2.text.length)*16;
		this.text3_2.tl.delay(sec(1.4)).moveTo(192+px,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		y+=30;
		if( this.bonus2 > 0 ){
			px = (8-this.text3_2.text.length)*16;
			this.text3_3.tl.delay(sec(1.4)).moveTo(160+px,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		}
		//NO MISS BONUS
		if( this.bonus3 > 0 ){
			y+=40;
			this.text4_1.tl.delay(sec(1.4)).moveTo( 10,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
			y+=30;
			this.text4_2.tl.delay(sec(1.5)).moveTo(180,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		}
		
		//TOUCH or CLICK
		this.text5.tl.delay(sec(1.6)).moveTo(48,294,sec(1),enchant.Easing.CUBIC_EASEOUT);

		sounds.play('media/bgm_stageclear.mp3',bgmVolume,false);
	},
	onenterframe:function(){
	},
	ontouchend:function(){
		switch( this.phase ){
			case 0:
				this.tl.skip(sec(2));
				this.mask_w.tl.skip(sec(2));
				this.mask.tl.skip(sec(2));
				this.text1_1.tl.skip(sec(2));
				this.text1_2.tl.skip(sec(2));
				this.text2_1.tl.skip(sec(2));
				this.text2_2.tl.skip(sec(2));
				this.text2_3.tl.skip(sec(2));
				this.text3_1.tl.skip(sec(2));
				this.text3_2.tl.skip(sec(2));
				this.text3_3.tl.skip(sec(2));
				this.text4_1.tl.skip(sec(2));
				this.text4_2.tl.skip(sec(2));
				this.text5.tl.skip(sec(2));
				break;
			case 1:
				this.mask_w.tl.fadeIn(sec(0.5)).fadeOut(sec(1)).then(function(){game.popScene();});
				this.mask.tl.fadeIn(sec(0.5));
				sounds.stop();
				pause = false;
				break;
			default:
		}
	}
});

//////////////////////////////////////////////////////////////////////////////
//オールクリア画面
//////////////////////////////////////////////////////////////////////////////
AllClear = Class.create(enchant.Scene,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(parent,stageNum,killStage,enemyCount,missStage){
		enchant.Scene.call(this);

		//バックグラウンド
		this.bg = new Sprite(320,320);
		this.bg.image = game.assets['media/mask.png'];
		this.bg.opacity = 0;
		this.addChild(this.bg);
		this.bg.tl.delay(sec(1)).show();

		//STAGE CLEAR
		this.text1_1 = new Text( -200, 320, "MISSION" );
		this.addChild(this.text1_1);
		this.text1_2 = new Text( -200, 320, "COMPLETE" );
		this.addChild(this.text1_2);

		//HIT BONUS
		this.text2_1 = new Text( 420, 320, "HIT BONUS" );
		this.addChild(this.text2_1);
		this.text2_2 = new MutableText( 420, 320,16*10, "0" );
		this.addChild(this.text2_2);
		this.text2_3 = new MutableText( 420, 320,16*10, "0" );
		this.addChild(this.text2_3);

		//HIT RATIO
		this.text3_1 = new Text( -200, 320, "HIT RATIO" );
		this.addChild(this.text3_1);
		this.text3_2 = new MutableText( -200, 320,16*7, "100.00%" );
		this.addChild(this.text3_2);
		this.text3_3 = new MutableText( -200, 320,16*9, "0" );
		this.addChild(this.text3_3);

		//NO MISS BONUS
		this.text4_1 = new Text( 420, 320, "NO MISS BONUS" );
		this.addChild(this.text4_1);
		this.text4_2 = new MutableText( 420, 320,16*9, "0" );
		this.addChild(this.text4_2);

		//TOUCH or CLICK
		this.text5 = new Text( 48, 500, "TOUCH or CLICK" );
		this.addChild(this.text5);

		//フェード用マスク
		this.mask = new Sprite(320,320);
		this.mask.image = game.assets['media/mask.png'];
		this.mask.opacity = 0;
		this.addChild(this.mask);
		this.mask_w = new Sprite(320,320);
		this.mask_w.image = game.assets['media/mask_w.png'];
		this.mask_w.opacity = 0;
		this.addChild(this.mask_w);
		this.mask_w.tl.fadeIn(sec(1)).fadeOut(sec(0.5));

		this.tl.delay(sec(1.5)).then(function(){this.phase=1;});

		//クリアボーナス計算
		//撃墜数
		this.bonus1 = killStage*stageNum*100;
		//撃墜率
		this.bonus2 = 0;
		var ratio = killStage/enemyCount*100;
		if( ratio >= 90  )this.bonus2 = 10000;
		if( ratio == 100 )this.bonus2 = 30000;
		//ノーミス
		this.bonus3 = 0;
		if( missStage == 0 )this.bonus3 = 20000*stageNum;

		//ボーナス表示編集
		this.text2_2.text = killStage+"x"+stageNum*100;
		this.text2_3.text = this.bonus1+"pts";
		this.text3_2.text = ratio.toFixed(2)+"%";
		this.text3_3.text = this.bonus2+"pts";
		this.text4_2.text = this.bonus3+"pts";
		
		//ボーナス加算
		parent.score += this.bonus1;
		parent.score += this.bonus2;
		parent.score += this.bonus3;

		pause = true;
		this.phase = 0;
	},
	onenter:function(){
		//TL設定
		//STAGE CLEAR
		var y = 20;
		this.text1_1.tl.delay(sec(1.0)).moveTo( 70,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		this.text1_2.tl.delay(sec(1.1)).moveTo(170,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		//HIT BONUS
		y+=50;
		this.text2_1.tl.delay(sec(1.1)).moveTo( 10,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		px = (7-this.text2_2.text.length)*16;
		this.text2_2.tl.delay(sec(1.2)).moveTo(192+px	,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		y+=30;
		var px = (9-this.text2_3.text.length)*16;
		this.text2_3.tl.delay(sec(1.3)).moveTo(160+px,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		//HIT RATIO
		y+=40;
		this.text3_1.tl.delay(sec(1.3)).moveTo( 10,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		px = (7-this.text3_2.text.length)*16;
		this.text3_2.tl.delay(sec(1.4)).moveTo(192+px,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		y+=30;
		if( this.bonus2 > 0 ){
			px = (8-this.text3_2.text.length)*16;
			this.text3_3.tl.delay(sec(1.4)).moveTo(160+px,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		}
		//NO MISS BONUS
		if( this.bonus3 > 0 ){
			y+=40;
			this.text4_1.tl.delay(sec(1.4)).moveTo( 10,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
			y+=30;
			this.text4_2.tl.delay(sec(1.5)).moveTo(180,y,sec(1),enchant.Easing.CUBIC_EASEOUT);
		}
		
		//TOUCH or CLICK
		this.text5.tl.delay(sec(1.6)).moveTo(48,294,sec(1),enchant.Easing.CUBIC_EASEOUT);

		sounds.play('media/bgm_stageclear.mp3',bgmVolume,false);
	},
	onenterframe:function(){
	},
	ontouchend:function(){
		switch( this.phase ){
			case 0:
				this.tl.skip(sec(2));
				this.mask_w.tl.skip(sec(2));
				this.mask.tl.skip(sec(2));
				this.text1_1.tl.skip(sec(2));
				this.text1_2.tl.skip(sec(2));
				this.text2_1.tl.skip(sec(2));
				this.text2_2.tl.skip(sec(2));
				this.text2_3.tl.skip(sec(2));
				this.text3_1.tl.skip(sec(2));
				this.text3_2.tl.skip(sec(2));
				this.text3_3.tl.skip(sec(2));
				this.text4_1.tl.skip(sec(2));
				this.text4_2.tl.skip(sec(2));
				this.text5.tl.skip(sec(2));
				break;
			case 1:
				this.mask_w.tl.fadeIn(sec(0.5)).fadeOut(sec(1)).then(function(){game.popScene();});
				this.mask.tl.fadeIn(sec(0.5));
				sounds.stop();
				pause = false;
				break;
			default:
		}
	}
});

//////////////////////////////////////////////////////////////////////////////
//ゲームオーバー画面
//////////////////////////////////////////////////////////////////////////////
GameOver = Class.create(enchant.Scene,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(){
		enchant.Scene.call(this);

		this.mask = new Sprite(320,320);
		this.mask.image = game.assets['media/mask.png'];
		this.mask.opacity = 0.7;
		this.addChild(this.mask);

		this.scr = new Sprite(320,320);
		this.scr.image = game.assets['media/continue.png'];
		this.scr.x = 160-this.scr.width/2;
		this.scr.y = 160-this.scr.height/2;
		this.addChild(this.scr);

		this.gbr = new Sprite(320,320);
		this.gbr.image = game.assets['media/gameover.png'];
		this.gbr.opacity = 0;
		this.addChild(this.gbr);
		
		this.continueYes = false;
		this.exit = false;
		this.phase = 0;
		this.time = 0;
	},
	onenter:function(){
		pause = true;
		this.continueYes = false;
		this.time = 0;
		this.exit = false;
	},
	onenterframe:function(){
		if( this.exit ){
			pause = false;
			game.popScene();
		}
		this.time++;
	},
	ontouchend:function(e){
		if( this.time < sec(1) )return;
		switch( this.phase ){
			case 0:
				if( e.y > 250 ){
					main.gameOver();
				}else if( e.x < 160 ){
					this.continueYes = true;
					this.exit = true;
				}else{
					this.continueYes = false;
					this.scr.tl.fadeOut(sec(0.5));
					this.gbr.tl.fadeIn(sec(0.5));
					this.phase = 1;
				}
				break;
			case 1:
				this.exit = true;
				this.gbr.tl.fadeOut(sec(1));
				this.tl.delay(sec(1)).then(function(){this.exit=true;});
				break;
			default:
		}
	}
});
