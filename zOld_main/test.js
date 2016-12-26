(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;

    lib.cube = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("cube1"))
            .setTransform(-119.05, -109.8, 1.262, 1.262);
        this.addChild(instance1);
    });

    lib.squareOdd = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 4
        });
        var instance1 = new Sprite(fromFrame("squareOdd1"));
        var instance2 = new Sprite(fromFrame("squareOdd2"));
        var instance3 = new Sprite(fromFrame("squareOdd3"));
        var instance4 = new Sprite(fromFrame("squareOdd4"))
            .setTransform(-189.35, -184.6);
        this.addTimedChild(instance1, 0, 1, {
                "0": {
                    x: -188.3,
                    y: -59.8
                }
            })
            .addTimedChild(instance2, 1, 1, {
                "1": {
                    x: -189.35,
                    y: -184.6
                }
            })
            .addTimedChild(instance3, 2, 1, {
                "2": {
                    x: -189.35,
                    y: -184.6
                }
            })
            .addTimedChild(instance4, 3, 1);
    });

    lib.bg = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("bg1"));
        this.addChild(instance1);
    });

    lib.test = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 1,
            framerate: 30
        });
        var instance3 = new lib.bg();
        var instance2 = this.squareOdd = new lib.squareOdd()
            .setTransform(639.65, 338.15);
        var instance1 = new lib.cube()
            .setTransform(639.95, 279.3, 0.792, 0.792);
        this.addChild(instance3, instance2, instance1);
    });

    lib.test.assets = {
        "bg1": "images/bg1.png",
        "test_atlas_1": "images/test_atlas_1.json"
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
        totalFrames: 1,
        library: lib
    };
}