(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;

    lib.boardBase = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 4
        });
        var instance1 = new Sprite(fromFrame("boardBase1"))
            .setTransform(-188.25, -59.8, 0.346, 0.346);
        this.addTimedChild(instance1);
    });

    var Graphic1 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 6, loop: false });
        var instance1 = new Sprite(fromFrame("bgColor3"))
            .setTransform(-640, -360);
        this.addTimedChild(instance1);
    });

    var Graphic2 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 6, loop: false });
        var instance1 = new Sprite(fromFrame("bgColor2"))
            .setTransform(-640, -360);
        this.addTimedChild(instance1);
    });

    var Graphic3 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 19, loop: false });
        var instance1 = new Sprite(fromFrame("bgColor1"))
            .setTransform(-640, -360);
        this.addTimedChild(instance1);
    });

    lib.bg = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 19,
            labels: {
                looping: 7,
                looping_stop: 12,
                fall: 13,
                fall_stop: 18
            }
        });
        var instance1 = new Graphic3(MovieClip.SYNCHED)
            .setTransform(640, 360);
        var instance2 = new Graphic2(MovieClip.SYNCHED);
        var instance3 = new Graphic1(MovieClip.SYNCHED);
        this.addTimedChild(instance1)
            .addTimedChild(instance2, 7, 6, {
                "7": {
                    x: 640,
                    y: 360,
                    a: 0
                },
                "8": {
                    a: 0.2
                },
                "9": {
                    a: 0.4
                },
                "10": {
                    a: 0.6
                },
                "11": {
                    a: 0.8
                },
                "12": {
                    a: 1
                }
            })
            .addTimedChild(instance3, 13, 6, {
                "13": {
                    x: 640,
                    y: 360,
                    a: 0
                },
                "14": {
                    a: 0.2
                },
                "15": {
                    a: 0.4
                },
                "16": {
                    a: 0.6
                },
                "17": {
                    a: 0.8
                },
                "18": {
                    a: 1
                }
            });
    });

    lib.test = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 3,
            framerate: 30,
            labels: {
                loop: 1,
                off: 2
            }
        });
        var instance2 = this.bg = new lib.bg();
        var instance1 = this.boardBase = new lib.boardBase()
            .setTransform(639.65, 435.15, 2.889, 2.861);
        this.addTimedChild(instance2)
            .addTimedChild(instance1);
    });

    lib.test.assets = {
        "boardBase1": "images/boardBase1.png",
        "bgColor3": "images/bgColor3.png",
        "bgColor2": "images/bgColor2.png",
        "bgColor1": "images/bgColor1.png"
    };
})(PIXI, lib = lib || {});
var lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: lib.test,
        background: 0x0,
        width: 1280,
        height: 720,
        framerate: 30,
        totalFrames: 3,
        library: lib
    };
}