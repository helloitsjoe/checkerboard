(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;

    lib.bg = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 3,
            labels: {
                loop: 1,
                off: 2
            }
        });
        var instance1 = new Sprite(fromFrame("bg1"));
        var instance2 = new Sprite(fromFrame("bg2"));
        var instance3 = new Sprite(fromFrame("bg3"));
        this.addTimedChild(instance1, 0, 1)
            .addTimedChild(instance2, 1, 1)
            .addTimedChild(instance3, 2, 1);
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
        var instance1 = this.bg = new lib.bg();
        this.addTimedChild(instance1);
    });

    lib.test.assets = {
        "bg1": "images/bg1.png",
        "bg2": "images/bg2.png",
        "bg3": "images/bg3.png"
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