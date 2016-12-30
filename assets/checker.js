(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;

    lib.checker_1 = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("checker1"))
            .setTransform(-119.05, -109.8, 1.262, 1.262);
        this.addChild(instance1);
    });

    lib.checker = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 49,
            framerate: 30,
            labels: {
                dropIn: 0,
                dropIn_stop: 7,
                moveN: 8,
                moveN_stop: 16,
                moveS: 17,
                moveS_stop: 25,
                moveE: 26,
                moveE_stop: 32,
                moveW: 33,
                moveW_stop: 40,
                dropOut: 41,
                dropOut_stop: 47,
                pause: 48
            }
        });
        var instance1 = this.checker = new lib.checker_1();
        this.addTimedChild(instance1, 0, 49, {
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
                x: 4.8,
                y: -61.45
            },
            "10": {
                x: 21.9,
                y: -66.55
            },
            "11": {
                x: 55.2,
                y: -76.55
            },
            "12": {
                x: 102.7,
                y: -90.8
            },
            "13": {
                x: 148.75,
                y: -104.6
            },
            "14": {
                x: 179.75,
                y: -113.9
            },
            "15": {
                x: 195.55,
                y: -118.65
            },
            "16": {
                x: 200,
                y: -120
            },
            "17": {
                x: 0,
                y: -60
            },
            "18": {
                x: -4.8,
                y: -58.55
            },
            "19": {
                x: -21.9,
                y: -53.45
            },
            "20": {
                x: -55.2,
                y: -43.45
            },
            "21": {
                x: -102.7,
                y: -29.2
            },
            "22": {
                x: -148.75,
                y: -15.4
            },
            "23": {
                x: -179.75,
                y: -6.1
            },
            "24": {
                x: -195.55,
                y: -1.35
            },
            "25": {
                x: -200,
                y: 0
            },
            "26": {
                x: 0,
                y: -60
            },
            "27": {
                x: 8.95,
                y: -57.3
            },
            "28": {
                x: 42.15,
                y: -47.35
            },
            "29": {
                x: 102.7,
                y: -29.2
            },
            "30": {
                x: 160.95,
                y: -11.7
            },
            "31": {
                x: 191.7,
                y: -2.5
            },
            "32": {
                x: 200,
                y: 0
            },
            "33": {
                x: 0,
                y: -60
            },
            "34": {
                x: -6.4,
                y: -61.9
            },
            "35": {
                x: -29.65,
                y: -68.9
            },
            "36": {
                x: -74.45,
                y: -82.35
            },
            "37": {
                x: -130.4,
                y: -99.15
            },
            "38": {
                x: -172.6,
                y: -111.8
            },
            "39": {
                x: -194.05,
                y: -118.2
            },
            "40": {
                x: -200,
                y: -120
            },
            "41": {
                x: 0,
                y: -60
            },
            "42": {
                y: -76.25,
                a: 0.96
            },
            "43": {
                y: -136.7,
                a: 0.79
            },
            "44": {
                x: 0.05,
                y: -246.85,
                a: 0.49
            },
            "45": {
                y: -352.75,
                a: 0.2
            },
            "46": {
                y: -408.75,
                a: 0.04
            },
            "47": {
                y: -423.8,
                a: 0
            },
            "48": {
                x: 0,
                y: -60,
                a: 1
            }
        });
    });

    lib.checker.assets = {
        "checker_atlas_1": "images/checker_atlas_1.json"
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
        totalFrames: 49,
        library: lib
    };
}