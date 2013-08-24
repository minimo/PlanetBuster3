/*

	PlanetBuster2
	main.js
	2012/06/26
	This program is MIT lisence.

*/

enchant();

//デバッグ用各種フラグ
var debug = false;		//デバッグフラグ
var debugDsp = false;	//デバッグ表示
var debugMuteki = false;//デバッグ用無敵フラグ
var startStage = 1;		//開始ステージ指定

var userAgent = "";		//実行ブラウザ種別
var soundEnable = true;	//サウンド再生可能フラグ

var spd = 1;			//ゲーム内速度（１～３）
var spw = 3;			//ウェイト係数（３～１）
var pause = false;		//ポーズフラグ
var highscore = 0;		//ハイスコア
var highscoreDiff = 2;	//ハイスコア時難易度
var highscoreStage = 1;	//ハイスコア時ステージ
var highscoreBoss = 0;	//ハイスコア時ボス戦フラグ

var difficulty = 2;		//選択難易度 1:easy 2:normal 3:hard 4:HELL
var diff = difficulty;	//内部難易度

var smartphone = false;	//スマホ判定
var bgmON = true;		//ＢＧＭ再生
var seON = true;		//ＳＥ再生
var seBombON = true;	//爆発音再生
var bgmVolume = 0.3;
var seVolume = 1;

var toRad = 3.14159/180;	//弧度法toラジアン変換
var toDeg = 180/3.14159;	//ラジアンto弧度法変換

var sec = function( time ){ var s =  ~~(game.fps * time);return (s==0)?1:s; }
var rand = function( max ){ return ~~(Math.random() * max); }
var round = function( num ){ return Math.round(num); }
var distance = function( obj1, obj2 ){
	var x = obj2.x-obj1.x;
	var y = obj2.y-obj1.y;
	return Math.sqrt(x*x+y*y);
}

window.onload = function(){
	game = new Game(320,320);
	game.rootScene.backgroundColor = "#000000";
	game.fps = 60;

	//ハイスコア情報をローカルストレージから復元
/*
	highscore = Number(localStorage['highscore']);
	if( !highscore )highscore = 0;
	highscoreDiff = Number(localStorage['highscoreDiff']);
	if( !highscoreDiff )highscoreDiff = 2;
	highscoreStage = Number(localStorage['highscoreStage']);
	if( !highscoreStage )highscoreStage = 1;
	highscoreBoss = Number(localStorage['highscoreBoss']);
	if( !highscoreBoss )highscoreBoss = 0;
*/

	//実行ブラウザ取得
	if( (navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 ){
		game.fps = 30;
		userAgent = "iOS";
		soundEnable = false;
		smartphone = true;
	}else if( navigator.userAgent.indexOf('Android') > 0){
		game.fps = 30;
		userAgent = "Android";
		soundEnable = false;
		smartphone = true;
	}else if( navigator.userAgent.indexOf('Chrome') > 0){
		userAgent = "Chrome";
	}else if( navigator.userAgent.indexOf('Firefox') > 0){
		userAgent = "Firefox";
		soundEnable = false;
	}else if( navigator.userAgent.indexOf('Safari') > 0){
		userAgent = "Safari";
		soundEnable = false;
	}else if( navigator.userAgent.indexOf('IE') > 0){
		userAgent = "IE";
	}else{
		userAgent = "unknown";
	}

	//spdは移動速度等に係数として使用
	spd = round(60/game.fps);	//60fps:1 30sps:2 20fps:3
	//spwは行動間隔等に係数として使用
	if( spd == 1 )spw = 3;
	if( spd == 2 )spw = 2;
	if( spd == 3 )spw = 1;

	game.preload(
		//システム使用
		'font.png','media/mask.png','media/mask_w.png','media/warning.gif',
		'media/continue.png','media/gameover.png',
		'media/button_weapon.png','media/button_bomb.png','media/button_sound.png',
		'media/point.png',
		//タイトル
		'media/title_1.png','media/title_2.png','media/title_back.png',
		'media/title_start.png','media/title_tutorial.png','media/title_end.png','media/title_difficulty.png',
		//自機
		'media/myship.png',
		'media/item.png','media/myship_bit.png','media/item_ant.png',
		//ボス
		'media/boss1a.png','media/boss1a_turret.png',
		'media/boss1b.png','media/boss1b_hatch.png',
		'media/boss2a.png','media/boss2a_nozzle.png','media/boss2a_wing.png','media/boss2a_turret.png',
		'media/boss2b.png','media/boss2b_shoulder.png','media/boss2b_gun.png','media/boss2b_hatch.png','media/boss2b_roter.png',
		'media/boss3a.png','media/boss3a_launcher.png','media/boss3a_cover.png','media/boss3a_front.png','media/boss3a_w.png',
		'media/boss3b.png','media/boss3b_front.png',
		'media/boss3b_turretL.png','media/boss3b_turretR.png','media/boss3b_wingL.png','media/boss3b_wingR.png',
		'media/boss3c.png','media/boss3c_w.png','media/boss3c_engine.png','media/boss3c_hatch.png',
		'media/boss3c_turret.png','media/boss3c_wing.png',
		//敵
		'media/enemy1.png','media/enemy2.png','media/enemy3.png','media/enemy4.png','media/enemy5.png',
		'media/enemy6_1.png','media/enemy6_2.png','media/enemy7.png','media/enemy8.png',
		'media/enemy9.png','media/enemy9_turret.png','media/enemy10.png','media/enemy11.png','media/enemy12.png','media/enemy13.png',
		'media/missile1.png','media/missile2.png','media/missile3.png','media/missile4.png',
		//隕石
		'media/rock1.png','media/rock2.png','media/rock3.png',
		//弾
		'media/shot1.png', 'media/shot2.png',
		'media/bullet1.png',
		'media/bullet2.png',
		'media/bullet2R.png','media/bullet2G.png','media/bullet2B.png',
		'media/bullet3R.png','media/bullet3G.png','media/bullet3B.png',
		'media/bullet4.png',
		//エフェクト
		'media/shotburn.png','media/myshipburn.png',
		'media/effect1.png','media/effect2.png','media/effect3.png','media/effect4.png','media/effect5.png',
		'media/effect6.png','media/effect7.png','media/effect8.png','media/bomb.png',
		'media/smoke1.png','media/smoke2.png','media/smoke3.png','media/spark.png',					
		//破片
		'media/chip1.png','media/chip2.png',
		//マップ
		'media/map_stage1_1.png','media/map_stage1_2.png',
		'media/map_stage2_1.png','media/map_stage2_2.png',
		'media/map_stage3_1.png','media/map_stage3_2.png',
		'media/map_stage3_3.png','media/map_stage3_4.png',
		'media/cloud1.png','media/cloud2.png','media/cloud3.png','media/cloud4.png',

		//チュートリアル
		'media/tutorial_1.png','media/tutorial_2.png','media/tutorial_3.png',
		'media/tutorial_4.png','media/tutorial_5.png','media/tutorial_6.png',
		'media/tutorial_7.png','media/tutorial_8.png'
	);

	//サウンド系は再生可能環境のみロードする
	if( soundEnable ){
		game.preload(
			//ＢＧＭ
			'media/bgm_stageclear.mp3','media/bgm_warning.mp3',
			'media/bgm_stage1.mp3','media/bgm_stage1b.mp3',
			'media/bgm_stage2.mp3',
			'media/bgm_stage3.mp3',
			//効果音
			'media/se_pi.mp3','media/se_ti.mp3','media/se_byu.mp3',
			'media/se_shipburn.mp3','media/se_powerup.mp3',
			'media/se_bomb1.mp3','media/se_bomb2.mp3','media/se_bomb3.mp3','media/se_bomb4.mp3',
			'media/se_bomb5.mp3','media/se_bomb6.mp3'
		);
	}

	//キーバインド
	game.keybind('Z'.charCodeAt(0), 'a');
	game.keybind('X'.charCodeAt(0), 'b');

	game.onload = function(){
		sounds = new SoundManager;	//ＢＧＭ管理
		title = new Title;			//タイトル
		main = new GameMain;		//メイン
		config = new Config;		//コンフィグ
		gameover = new GameOver;	//ゲームオーバー画面
		tutorial = new Tutorial;	//チュートリアル画面

		game.pushScene(title);
	};
	game.start();
};
