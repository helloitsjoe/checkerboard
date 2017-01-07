(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;
    var Graphics = PIXI.Graphics;
    var shapes = PIXI.animate.ShapesCache;

    lib.directions = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 9,
            labels: {
                N: 1,
                S: 3,
                E: 5,
                W: 7
            }
        });
        var instance1 = new Graphics()
            .drawCommands(shapes.square[0]);
        var instance2 = new Graphics()
            .drawCommands(shapes.square[1]);
        var instance3 = new Graphics()
            .drawCommands(shapes.square[2]);
        var instance4 = new Graphics()
            .drawCommands(shapes.square[3]);
        this.addTimedChild(instance1, 1, 2)
            .addTimedChild(instance2, 3, 2)
            .addTimedChild(instance3, 5, 2)
            .addTimedChild(instance4, 7, 2);
    });

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
            .setTransform(-188.3, -59.8, 0.943, 0.943);
        this.addChild(instance1);
    });

    lib.color02 = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("color021"))
            .setTransform(-188.3, -59.8, 0.943, 0.943);
        this.addChild(instance1);
    });

    lib.square = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 34,
            framerate: 30,
            labels: {
                fadeIn: 0,
                fadeIn_stop: 17,
                fadeOut: 18,
                fadeOut_stop: 33
            }
        });
        var instance4 = this.color01 = new lib.color02();
        var instance3 = this.color02 = new lib.color01();
        var instance2 = this.state = new lib.states();
        var instance1 = this.arrows = new lib.directions();
        this.addTimedChild(instance4, 0, 34, {
                "0": {
                    y: 20,
                    sx: 1.061,
                    a: 0
                },
                "3": {
                    y: 13.9,
                    a: 0.3
                },
                "4": {
                    y: 9.8,
                    a: 0.51
                },
                "5": {
                    y: 6.9,
                    a: 0.65
                },
                "6": {
                    y: 4.85,
                    a: 0.76
                },
                "7": {
                    y: 3.35,
                    a: 0.83
                },
                "8": {
                    y: 2.2,
                    a: 0.89
                },
                "9": {
                    y: 1.4,
                    a: 0.93
                },
                "10": {
                    y: 0.85,
                    a: 0.96
                },
                "11": {
                    y: 0.45,
                    a: 0.98
                },
                "12": {
                    y: 0.2,
                    a: 0.99
                },
                "13": {
                    y: 0.05,
                    a: 1
                },
                "14": {
                    y: 0
                },
                "21": {
                    y: 0.05
                },
                "22": {
                    y: 0.3,
                    a: 0.98
                },
                "23": {
                    y: 0.65,
                    a: 0.97
                },
                "24": {
                    y: 1.15,
                    a: 0.95
                },
                "25": {
                    y: 1.8,
                    a: 0.91
                },
                "26": {
                    y: 2.65,
                    a: 0.87
                },
                "27": {
                    y: 3.7,
                    a: 0.82
                },
                "28": {
                    y: 5.05,
                    a: 0.75
                },
                "29": {
                    y: 6.85,
                    a: 0.66
                },
                "30": {
                    y: 9.2,
                    a: 0.54
                },
                "31": {
                    y: 12.65,
                    a: 0.37
                },
                "32": {
                    y: 20,
                    a: 0
                }
            })
            .addTimedChild(instance3, 0, 34, {
                "0": {
                    y: 20,
                    sx: 1.061,
                    a: 0
                },
                "3": {
                    y: 13.9,
                    a: 0.3
                },
                "4": {
                    y: 9.8,
                    a: 0.51
                },
                "5": {
                    y: 6.9,
                    a: 0.65
                },
                "6": {
                    y: 4.85,
                    a: 0.76
                },
                "7": {
                    y: 3.35,
                    a: 0.83
                },
                "8": {
                    y: 2.2,
                    a: 0.89
                },
                "9": {
                    y: 1.4,
                    a: 0.93
                },
                "10": {
                    y: 0.85,
                    a: 0.96
                },
                "11": {
                    y: 0.45,
                    a: 0.98
                },
                "12": {
                    y: 0.2,
                    a: 0.99
                },
                "13": {
                    y: 0.05,
                    a: 1
                },
                "14": {
                    y: 0
                },
                "21": {
                    y: 0.05
                },
                "22": {
                    y: 0.3,
                    a: 0.98
                },
                "23": {
                    y: 0.65,
                    a: 0.97
                },
                "24": {
                    y: 1.15,
                    a: 0.95
                },
                "25": {
                    y: 1.8,
                    a: 0.91
                },
                "26": {
                    y: 2.65,
                    a: 0.87
                },
                "27": {
                    y: 3.7,
                    a: 0.82
                },
                "28": {
                    y: 5.05,
                    a: 0.75
                },
                "29": {
                    y: 6.85,
                    a: 0.66
                },
                "30": {
                    y: 9.2,
                    a: 0.54
                },
                "31": {
                    y: 12.65,
                    a: 0.37
                },
                "32": {
                    y: 20,
                    a: 0
                }
            })
            .addTimedChild(instance2)
            .addTimedChild(instance1, 0, 34, {
                "0": {
                    x: 2.35,
                    y: -51.45,
                    a: 0
                },
                "7": {
                    y: -34.85,
                    a: 0.33
                },
                "8": {
                    y: -25.1,
                    a: 0.53
                },
                "9": {
                    y: -18.35,
                    a: 0.66
                },
                "10": {
                    y: -13.35,
                    a: 0.76
                },
                "11": {
                    y: -9.6,
                    a: 0.84
                },
                "12": {
                    y: -6.8,
                    a: 0.89
                },
                "13": {
                    y: -4.7,
                    a: 0.93
                },
                "14": {
                    y: -3.2,
                    a: 0.96
                },
                "15": {
                    y: -2.2,
                    a: 0.98
                },
                "16": {
                    y: -1.65,
                    a: 1
                },
                "17": {
                    y: -1.45
                },
                "19": {
                    y: -1.7
                },
                "20": {
                    y: -2.35,
                    a: 0.98
                },
                "21": {
                    y: -3.5,
                    a: 0.96
                },
                "22": {
                    y: -5.15,
                    a: 0.93
                },
                "23": {
                    y: -7.3,
                    a: 0.88
                },
                "24": {
                    y: -10.1,
                    a: 0.83
                },
                "25": {
                    y: -13.7,
                    a: 0.75
                },
                "26": {
                    y: -18.35,
                    a: 0.66
                },
                "27": {
                    y: -24.6,
                    a: 0.54
                },
                "28": {
                    y: -33.75,
                    a: 0.36
                },
                "29": {
                    y: -51.45,
                    a: 0
                }
            });
    });

    lib.square.assets = {
        "square": "images/square.shapes.json",
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
        totalFrames: 34,
        library: lib
    };
}