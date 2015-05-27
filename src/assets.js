/*
 *  assets.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

pb3.assets = pb3.assets || [];

//アセット一覧
pb3.assets["main"] = {
    //images
    "bit":     "assets/images/bit1.png",
    "gunship": "assets/images/gunship1.png",
    "shot1":   "assets/images/shot1.png",
    "shot2":   "assets/images/shot2.png",

    "tex1":    "assets/images/tex1.png",
    "tex2":    "assets/images/tex2.png",
    "boss1":   "assets/images/tex_boss1.png",
    "bullet1": "assets/images/bullet1.png",
    "bullet2": "assets/images/bullet2.png",
    "effect":  "assets/images/effect.png",
    "cloud":   "assets/images/cloud.png",

    //SE
    "powerup":       "assets/sounds/ta_ta_suraido01.mp3",
    "explodeSmall":  "assets/sounds/sen_ge_taihou03.mp3", 
    "explodeLarge":  "assets/sounds/sen_ge_hasai01.mp3", 
    "explodePlayer": "assets/sounds/ta_ta_zuban_d01.mp3", 

    //BGM
    "warning": "assets/sounds/bgm_warning.mp3",

    //Font
    "Orbitron": "font/Orbitron-Regular.ttf",
    "Ubuntu Mono": "font/UbuntuMono-Bold.ttf",
};

pb3.assets["stage1"] = {
    //BGM
    "stage1":  "assets/sounds/expsy.mp3",

    //マップ
    "map1":    "assets/maps/map1.tmx",
    "map1g":   "assets/maps/map1.png",
}

})();