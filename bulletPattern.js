/*
 *  PlanetBuster3
 *  bulletPattern.js
 *  2013/06/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

//弾幕定義作成
pb3.bulletPattern = [];
CreateBulletPattern = function() {
    var shotAngleRate = 10;
    var shotSpeed = 1;
    //自機狙い弾
    pb3.bulletPattern['toPlayer'] = new BulletML.Root({
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
