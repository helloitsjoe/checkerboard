(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;

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
        var instance1 = this.bg = new lib.bg();
        this.addChild(instance1);
    });

    lib.test.assets = {
        "bg1": "images/bg1.png"
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