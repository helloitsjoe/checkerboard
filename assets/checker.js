(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Graphics = PIXI.Graphics;
    var shapes = PIXI.animate.ShapesCache;

    lib.side = Container.extend(function () {
        Container.call(this);
        var instance1 = new Graphics()
            .drawCommands(shapes.checker[0]);
        this.addChild(instance1);
    });

    lib.checker_1 = Container.extend(function () {
        Container.call(this);
        var instance1 = new Graphics()
            .drawCommands(shapes.checker[1]);
        this.addChild(instance1);
    });

    lib.checker = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 69,
            framerate: 30,
            labels: {
                dropIn: 0,
                dropIn_stop: 7,
                moveN: 8,
                moveN_stop: 21,
                moveS: 22,
                moveS_stop: 35,
                moveE: 36,
                moveE_stop: 47,
                moveW: 48,
                moveW_stop: 60,
                dropOut: 61,
                dropOut_stop: 67,
                pause: 68
            }
        });
        var instance13 = this.checker = new lib.checker_1();
        var instance12 = new lib.side()
            .setTransform(0.95, -89.65);
        var instance11 = new lib.side()
            .setTransform(95.05, -60.5);
        var instance10 = new lib.side()
            .setTransform(-93.2, -60.5);
        var instance9 = new lib.side()
            .setTransform(0.95, -30.1);
        var instance8 = new lib.side()
            .setTransform(47.6, -102.25, 1, 0.865, -1.877);
        var instance7 = new lib.side()
            .setTransform(47.6, 12.2, 1, 0.865, -1.877);
        var instance6 = new lib.side()
            .setTransform(-46.75, -132.3, 1, 0.865, -1.877);
        var instance5 = new lib.side()
            .setTransform(-46.75, -17.85, 1, 0.865, -1.877);
        var instance4 = new lib.side()
            .setTransform(-46.4, -102.25, 1, 0.865, 0, 4.407, -1.265);
        var instance3 = new lib.side()
            .setTransform(-46.4, 12.2, 1, 0.865, 0, 4.407, -1.265);
        var instance2 = new lib.side()
            .setTransform(47.95, -132.3, 1, 0.865, 0, 4.407, -1.265);
        var instance1 = new lib.side()
            .setTransform(47.95, -17.85, 1, 0.865, 0, 4.407, -1.265);
        this.addTimedChild(instance13, 0, 69, {
                "0": {
                    x: 0,
                    y: -423.8,
                    sx: 0.792,
                    sy: 0.792,
                    a: 0
                },
                "1": {
                    y: -261.05,
                    a: 0.45
                },
                "2": {
                    y: -184.2,
                    a: 0.66
                },
                "3": {
                    y: -133.7,
                    a: 0.8
                },
                "4": {
                    y: -99.2,
                    a: 0.89
                },
                "5": {
                    y: -76.7,
                    a: 0.95
                },
                "6": {
                    y: -64.05,
                    a: 0.99
                },
                "7": {
                    y: -60,
                    a: 1
                },
                "9": {
                    x: 4.6,
                    y: -61.45
                },
                "10": {
                    x: 20.8,
                    y: -66.55
                },
                "11": {
                    x: 52.45,
                    y: -76.55
                },
                "12": {
                    x: 97.6,
                    y: -90.8
                },
                "13": {
                    x: 141.3,
                    y: -104.6
                },
                "14": {
                    x: 170.75,
                    y: -113.9
                },
                "15": {
                    x: 185.75,
                    y: -118.65
                },
                "16": {
                    x: 190,
                    y: -120
                },
                "22": {
                    x: 0,
                    y: -60
                },
                "23": {
                    x: -4.6,
                    y: -58.55
                },
                "24": {
                    x: -20.8,
                    y: -53.45
                },
                "25": {
                    x: -52.45,
                    y: -43.45
                },
                "26": {
                    x: -97.6,
                    y: -29.2
                },
                "27": {
                    x: -141.3,
                    y: -15.4
                },
                "28": {
                    x: -170.75,
                    y: -6.1
                },
                "29": {
                    x: -185.75,
                    y: -1.35
                },
                "30": {
                    x: -190,
                    y: 0
                },
                "36": {
                    x: 0,
                    y: -60
                },
                "37": {
                    x: 8.5,
                    y: -57.3
                },
                "38": {
                    x: 40.05,
                    y: -47.35
                },
                "39": {
                    x: 97.55,
                    y: -29.2
                },
                "40": {
                    x: 152.9,
                    y: -11.7
                },
                "41": {
                    x: 182.15,
                    y: -2.5
                },
                "42": {
                    x: 190,
                    y: 0
                },
                "48": {
                    x: 0,
                    y: -60
                },
                "49": {
                    x: -6.1,
                    y: -61.9
                },
                "50": {
                    x: -28.15,
                    y: -68.9
                },
                "51": {
                    x: -70.7,
                    y: -82.35
                },
                "52": {
                    x: -123.9,
                    y: -99.15
                },
                "53": {
                    x: -163.95,
                    y: -111.8
                },
                "54": {
                    x: -184.35,
                    y: -118.2
                },
                "55": {
                    x: -190,
                    y: -120
                },
                "61": {
                    x: 0,
                    y: -60
                },
                "62": {
                    y: -76.25,
                    a: 0.96
                },
                "63": {
                    y: -136.7,
                    a: 0.79
                },
                "64": {
                    x: 0.05,
                    y: -246.85,
                    a: 0.49
                },
                "65": {
                    y: -352.75,
                    a: 0.2
                },
                "66": {
                    y: -408.75,
                    a: 0.04
                },
                "67": {
                    y: -423.8,
                    a: 0
                },
                "68": {
                    x: 0,
                    y: -60,
                    a: 1
                }
            })
            .addTimedChild(instance12)
            .addTimedChild(instance11)
            .addTimedChild(instance10)
            .addTimedChild(instance9)
            .addTimedChild(instance8)
            .addTimedChild(instance7)
            .addTimedChild(instance6)
            .addTimedChild(instance5)
            .addTimedChild(instance4)
            .addTimedChild(instance3)
            .addTimedChild(instance2)
            .addTimedChild(instance1);
    });

    lib.checker.assets = {
        "checker": "images/checker.shapes.json"
    };
})(PIXI, lib = lib || {});
var lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: lib.checker,
        background: 0x0,
        width: 1280,
        height: 720,
        framerate: 30,
        totalFrames: 69,
        library: lib
    };
}