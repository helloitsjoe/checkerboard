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

    lib.loop = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("loop1"))
            .setTransform(-188.85, -122.2);
        this.addChild(instance1);
    });

    lib.fall = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("fall1"))
            .setTransform(-188.85, -122.2);
        this.addChild(instance1);
    });

    lib.visited = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("visited1"))
            .setTransform(-188.85, -122.2);
        this.addChild(instance1);
    });

    lib.states = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 31,
            labels: {
                visited: 1,
                visited_stop: 10,
                looping: 11,
                looping_stop: 20,
                fall: 21,
                fall_stop: 30
            }
        });
        var instance1 = new lib.visited();
        var instance2 = new lib.loop();
        var instance3 = new lib.fall();
        this.addTimedChild(instance1, 1, 30, {
                "1": {
                    x: -0.5,
                    y: -62.4,
                    a: 0
                },
                "2": {
                    a: 0.11
                },
                "3": {
                    a: 0.22
                },
                "4": {
                    a: 0.33
                },
                "5": {
                    a: 0.45
                },
                "6": {
                    a: 0.55
                },
                "7": {
                    a: 0.67
                },
                "8": {
                    a: 0.78
                },
                "9": {
                    a: 0.89
                },
                "10": {
                    a: 1
                },
                "11": {
                    a: 0.9
                },
                "12": {
                    a: 0.8
                },
                "13": {
                    a: 0.7
                },
                "14": {
                    a: 0.6
                },
                "15": {
                    a: 0.5
                },
                "16": {
                    a: 0.4
                },
                "17": {
                    a: 0.3
                },
                "18": {
                    a: 0.2
                },
                "19": {
                    a: 0.1
                },
                "20": {
                    a: 0
                },
                "21": {
                    a: 1
                },
                "22": {
                    a: 0.89
                },
                "23": {
                    a: 0.78
                },
                "24": {
                    a: 0.67
                },
                "25": {
                    a: 0.55
                },
                "26": {
                    a: 0.45
                },
                "27": {
                    a: 0.33
                },
                "28": {
                    a: 0.22
                },
                "29": {
                    a: 0.11
                },
                "30": {
                    a: 0
                }
            })
            .addTimedChild(instance2, 11, 10, {
                "11": {
                    x: -0.5,
                    y: -62.4,
                    a: 0
                },
                "12": {
                    a: 0.11
                },
                "13": {
                    a: 0.22
                },
                "14": {
                    a: 0.33
                },
                "15": {
                    a: 0.45
                },
                "16": {
                    a: 0.55
                },
                "17": {
                    a: 0.67
                },
                "18": {
                    a: 0.78
                },
                "19": {
                    a: 0.89
                },
                "20": {
                    a: 1
                }
            })
            .addTimedChild(instance3, 21, 10, {
                "21": {
                    x: -0.5,
                    y: -62.4,
                    a: 0
                },
                "22": {
                    a: 0.11
                },
                "23": {
                    a: 0.22
                },
                "24": {
                    a: 0.33
                },
                "25": {
                    a: 0.45
                },
                "26": {
                    a: 0.55
                },
                "27": {
                    a: 0.67
                },
                "28": {
                    a: 0.78
                },
                "29": {
                    a: 0.89
                },
                "30": {
                    a: 1
                }
            });
    });

    lib.color01 = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 2
        });
        var instance1 = new Sprite(fromFrame("color011"));
        var instance2 = new Sprite(fromFrame("color012"))
            .setTransform(-190, -60);
        this.addTimedChild(instance1, 0, 1, {
                "0": {
                    x: -190,
                    y: -60
                }
            })
            .addTimedChild(instance2, 1, 1);
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
        var instance3 = this.base = new lib.color01();
        var instance2 = this.state = new lib.states();
        var instance1 = this.arrows = new lib.directions();
        this.addTimedChild(instance3, 0, 34, {
                "0": {
                    y: 20,
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
                    y: 0.15,
                    a: 0.99
                },
                "22": {
                    y: 0.55,
                    a: 0.97
                },
                "23": {
                    y: 1.25,
                    a: 0.94
                },
                "24": {
                    y: 2.2,
                    a: 0.89
                },
                "25": {
                    y: 3.45,
                    a: 0.83
                },
                "26": {
                    y: 5,
                    a: 0.75
                },
                "27": {
                    y: 6.8,
                    a: 0.66
                },
                "28": {
                    y: 8.9,
                    a: 0.55
                },
                "29": {
                    y: 11.25,
                    a: 0.44
                },
                "30": {
                    y: 13.9,
                    a: 0.3
                },
                "31": {
                    y: 16.8,
                    a: 0.16
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
        "square_atlas_1": "images/square_atlas_1.json",
        "square_atlas_2": "images/square_atlas_2.json"
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