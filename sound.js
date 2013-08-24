/*

	PlanetBuster2
	sound.js
	2012/07/12
	This program is MIT lisence.

*/

enchant();

//ＢＧＭ
var bgmData = {
'Stage1':		{file: 'media/bgm_stage1.mp3',	volume: 1.0 },
'Stage1Boss':	{file: 'media/bgm_stage1b.mp3',	volume: 1.0 },
'Stage2':		{file: 'media/bgm_stage2.mp3',	volume: 1.0  },
'Stage2Boss':	{file: 'media/bgm_stage2b.mp3',	volume: 1.0  },

'StageClear':	{file: 'media/bgm_stageclear.mp3',	volume: 1.0  },
'Warning':		{file: 'media/bgm_warning.mp3',		volume: 1.0  },
}

//ＳＥ
var seData = {
'shot':			{file: 'media/se_shot.mp3',		volume: 1.0 },
'shipburn':		{file: 'media/se_shipburn.mp3',	volume: 0.5 },
'powerup':		{file: 'media/se_powerup.mp3',	volume: 1.0 },
'bomb1':		{file: 'media/se_bomb1.mp3',	volume: 1.0 },
'bomb2':		{file: 'media/se_bomb2.mp3',	volume: 0.6 },
'bomb3':		{file: 'media/se_bomb3.mp3',	volume: 1.0 },
'bomb4':		{file: 'media/se_bomb4.mp3',	volume: 0.6 },
}

/////////////////////////////////////////////////////////////////////////////
//サウンド管理クラス
/////////////////////////////////////////////////////////////////////////////
SoundManager = Class.create(enchant.Group,{
	initialize:function(){
		enchant.Group.call(this);
		this.nowPlay = null;

		//爆発音再生用
		this.numSE = 3;	//同時再生数
		this.se = new Array(this.numSE);
		for( var i = 0; i < this.numSE; i++ ){
			this.se[i] = new Group;
			this.se[i].sound = null;
		}
	},
	//ＢＧＭ再生
	play:function(file,volume,loop){
		if( !soundEnable )return;
		if( file == undefined && this.nowPlay != null ){
			this.nowPlay.play();
			return;
		}
		if( file == null || file == undefined ){
			this.stop();
			return;
		}
		if( volume == undefined )volume = 1;
		if( loop == undefined )loop = false;

		if( this.nowPlay && this.nowPlay != game.assets[file] )this.nowPlay.stop();
		this.nowPlay = game.assets[file];
		if( this.nowPlay == undefined ){
			this.nowPlay = null;
			return;
		}

		this.nowPlay.volume = volume;
		this.loop = loop;
		this.fadeTo = volume;
		this.fade = 0;
		this.nowPlay.play();
	},
	//ＢＧＭ停止
	stop:function(){
		if( !soundEnable || this.nowPlay == null )return;
		this.nowPlay.stop();
		this.nowPlay = null;
	},
	//ＢＧＭ一時停止
	pause:function(){
		if( !soundEnable || this.nowPlay == null )return;
		this.nowPlay.pause();
	},
	//ボリューム変更
	volume:{
		get:function() {
			if( this,nowPlay )return nowPlay.volume;
			return 0;
		},
		set:function(volume) {
			if( this.nowPlay )this.nowPlay.volume = volume;
		}
    },
    //音声をフェードする
    fade:function(frame,volume){
		this.fadeTo = volume;
		this.fade = (volume-this.nowPlay.volume)/frame;
    },
    //再生時間
	currentTime:{
		get:function(){
			if( this,nowPlay )return nowPlay.currentTime;
			return 0;
		},
		set:function(ct){
			if( this.nowPlay )this.nowPlay.currentTime = ct;
		}
    },
	onenterframe:function(){
		if( !soundEnable || this.nowPlay == null )return;
		if( this.nowPlay.currentTime >= this.nowPlay.duration && this.loop )this.nowPlay.play();
		if( this.fade != 0 ){
			this.volume += this.fade;

			//フェード処理
			if( this.fade > 0 ){
				if( this.volume >= this.fadeTo ){
					this.volume = this.fadeTo;
					this.fade = 0;
				}
			}else{
				if( this.volume <= this.fadeTo ){
					this.volume = this.fadeTo;
					this.fade = 0;
				}
			}
		}
	},

	//ＳＥ再生
	playSE:function(name,volume,bomb){
		if( !soundEnable || !seON )return;
		if( volume == undefined )volume = 1;
		if( bomb == undefined )bomb=false;

		//爆発音の多重再生を避けるようにする
		if( bomb ){
			if( !seBombON )return;
			for( var i = 0; i < this.numSE; i++ ){
				if( this.se[i].sound != null ){
					var current = this.se[i].sound.currentTime;
					var duration = this.se[i].sound.duration;
					if( current >= duration )this.se[i].sound = null;
				}
				if( this.se[i].sound == null ){
					var se = this.se[i];
					se.sound = game.assets[name].clone();
					se.sound.volume = volume;
					se.sound.play();
					break;
				}
			}
		}else{
			//通常音声
			var se = game.assets[name].clone();
			se.volume = volume;
			se.play();
			se = null;
		}
	}
});
/*
//ＳＥ再生
var playSE = function(name,volume){
	if( soundEnable && seON ){
		if( volume == undefined )volume = 1;
		var se = game.assets[name].clone();
		se.volume = volume;
		se.play();
		se = null;
	}
}
*/