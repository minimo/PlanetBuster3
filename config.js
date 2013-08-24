/*

	PlanetBuster2
	config.js
	2012/07/02
	This program is MIT lisence.

*/

enchant();

Config = Class.create(enchant.Scene,{
	//////////////////////////////////////////////////////////////////////////////
	//生成時初期化処理
	//////////////////////////////////////////////////////////////////////////////
	initialize:function(){
		enchant.Scene.call(this);

		this.text1 = new Label("作成中");
		this.text1.color = "#ffffff";
		this.text1.font = "bold";
		this.text1.x = 135;
		this.text1.y = 100;
		this.addChild(this.text1);
		this.text2 = new Label("クリックまたはタッチでタイトルに戻ります");
		this.text2.color = "#ffffff";
		this.text2.font = "bold";
		this.text2.x = 50;
		this.text2.y = 120;
		this.addChild(this.text2);
		
		//BGM
		this.t1 = new Label("BGM");
		this.t1.color = "#ffffff";
		this.t1.font = "bold";
		this.t1.x = 100;
		this.t1.y = 50;
//		this.addChild(this.t1);
		//SE
		this.t2 = new Label("SE");
		this.t2.color = "#ffffff";
		this.t2.font = "bold";
		this.t2.x = 100;
		this.t2.y = 80;
//		this.addChild(this.t2);
		//FPS
		this.t3 = new Label("FPS");
		this.t3.color = "#ffffff";
		this.t3.font = "bold";
		this.t3.x = 100;
		this.t3.y = 110;
//		this.addChild(this.t3);
	},
	//////////////////////////////////////////////////////////////////////////////
	//シーン開始時処理
	//////////////////////////////////////////////////////////////////////////////
	onenter:function(){
		this.time = 0;
	},
	//////////////////////////////////////////////////////////////////////////////
	//シーン終了時処理
	//////////////////////////////////////////////////////////////////////////////
	onexit:function(){
	},
	onenterframe:function(){
		this.time++;
	},
	ontouchend:function(){
		game.popScene();
	}
});
