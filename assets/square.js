(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;

    lib.states = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 4
        });
        var instance1 = new Sprite(fromFrame("states2"));
        var instance2 = new Sprite(fromFrame("states3"));
        var instance3 = new Sprite(fromFrame("states4"))
            .setTransform(-189.35, -184.6);
        this.addTimedChild(instance1, 1, 1, {
                "1": {
                    x: -189.35,
                    y: -184.6
                }
            })
            .addTimedChild(instance2, 2, 1, {
                "2": {
                    x: -189.35,
                    y: -184.6
                }
            })
            .addTimedChild(instance3, 3, 1);
    });

    lib.color01 = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("color011"))
            .setTransform(-188.3, -59.8);
        this.addChild(instance1);
    });

    lib.color02 = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("color021"))
            .setTransform(-188.3, -59.8);
        this.addChild(instance1);
    });

    lib.squareOdd = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 4
        });
        var instance3 = this.color02 = new lib.color02();
        var instance2 = this.color02 = new lib.color01();
        var instance1 = this.state = new lib.states()
            .setTransform(0.8, -0.65);
        this.addTimedChild(instance3)
            .addTimedChild(instance2)
            .addTimedChild(instance1);
    });

    lib.square = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 1,
            framerate: 30
        });
        var instance1 = this.square = new lib.squareOdd()
            .setTransform(190, 60, 1.008);
        this.addChild(instance1);
    });

    lib.square.assets = {
        "square_atlas_1": "images/square_atlas_1.json"
    };
})(PIXI, lib = lib || {});
var lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: lib.square,
        background: 0x0,
        width: 380,
        height: 120,
        framerate: 30,
        totalFrames: 1,
        library: lib
    };
}