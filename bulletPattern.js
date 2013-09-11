/*
 *  PlanetBuster3
 *  bulletPattern.js
 *  弾幕パターン定義
 *  2013/06/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

//弾幕定義作成
pb3.bulletPattern = [];
CreateBulletPattern = function() {

    // 攻撃パターンのオプション設定
    pb3.defaultOptionParam = {
        // 狙う対象
        target: pb3.player,
        //発射地点オフセット
        offsetX: 0,
        offsetY: 0,
        updateProperties: true,
        // 弾生成関数
        bulletFactory: function(spec) {
            var b = pb3.bullets.enterToBulletML(null, 0, 16, 100);
            return b;
        },
        // 弾が画面内にあることを判定する関数
        isInsideOfWorld: function(b) {
           return -32<b.x && b.x<SCREEN_WIDTH+32 && -32<b.y && b.y<SCREEN_HEIGHT+32;
        }
    };


    var shotAngleRate = 10;
    var shotSpeed = 1;

    //自機狙い弾
    pb3.bulletPattern['SkyFish'] = new BulletML.Root({
        top: action(
            fire(direction(0, "absolute"), speed(shotSpeed), bullet()),
            repeat(1,
                action(
                    wait(10),
                    fire(direction(shotAngleRate, "sequence"), speed(shotSpeed), bullet())
                )
            )
        ),
        b: bullet(
            action(
                changeDirection(direction(30, "relative"), 150),
                changeSpeed(speed(8), 300)
            )
        )
    });

    //テストパターン
    pb3.bulletPattern['test'] = new BulletML.Root({
        top1: action(
            fire(direction(0, "absolute"), speed(shotSpeed), bullet()),
            repeat(999,
                action(
                    wait(10),
                    fire(direction(shotAngleRate, "sequence"), speed(shotSpeed), bullet())
                )
            )
        ),
        top2: action(
            fire(direction(0, "absolute"), speed(shotSpeed), bullet()),
            repeat(999,
                action(
                    wait(10),
                    fire(direction(-shotAngleRate, "sequence"), speed(shotSpeed), bullet())
                )
            )
        ),
        top3: action(
            fire(direction(0, "absolute"), speed(shotSpeed), bullet()),
            repeat(10,
                action(
                    wait(10),
                    fire(direction(shotAngleRate/2, "sequence"), speed(shotSpeed), bullet())
                )
            )
        ),
        top4: action(
            fire(direction(0, "absolute"), speed(shotSpeed), bullet()),
            repeat(10,
                action(
                    wait(10),
                    fire(direction(-shotAngleRate/2, "sequence"), speed(shotSpeed), bullet())
                )
            )
        ),
    });
}
