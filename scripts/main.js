
var requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };



var sounds = {
    wrong: new Howl({
        loop: false,
        urls: ['sounds/wrong_2.wav']
    }),
    win: new Howl({
        loop: false,
        urls: ['sounds/win.wav']
    }),
    bip: new Howl({
        loop: false,
        urls: ['sounds/bip.wav']
    }),
    bipShort: new Howl({
        loop: false,
        volume: 0.5,
        urls: ['sounds/bip_short.wav']
    })
};


var colors = {
    start: {
        hue: 0,
        sat: 0,
        lum: 0.4
    },
    win: {
        hue: 0.3,
        sat: 1,
        lum: 0.5
    }
};


function createGame(elementID) {
    
    var game = {};

    game.onEachFrame = function(callback) {
        var _cb = function() {
            callback();
            requestAnimationFrame(_cb);
        };
        _cb();
    };

    game.render = function () {
        game.cx.fillStyle = 'hsl('+(game.color.hue * 360)+', '+(game.color.sat*100)+'%, '+(game.color.lum*100)+'%)';
        game.cx.fillRect(0, 0, 1, 1);
    };

    game.changeScene = function (sceneName, options) {
        game.sceneStartTime = (new Date()).getTime();
        game.sceneTime = 0;
        game.currentScene = sceneName;
        game.currentSceneOptions = options || {};
        game[game.currentScene](true, game.currentSceneOptions);
    };


    game.initCanvas = function () {
        game.canvas = document.getElementById(elementID);
        game.cx = game.canvas.getContext('2d');
    };

    game.onClick  = function () {};
    game.mainLoop = function () {};

    game.init = function () {
        game.initCanvas();

        var initTime = (new Date()).getTime();
        game.sceneStartTime = initTime;

        game.changeScene('startScene');
        
        game.onEachFrame(function () {
            var time = (new Date()).getTime();
            game.time = 0.001 * (time - initTime);
            game.sceneTime = 0.001 * (time - game.sceneStartTime);

            game.mainLoop();

            if (game.currentScene) {
                game[game.currentScene](false, game.currentSceneOptions);
            }
            game.render();
        });


        $('#'+elementID).on('click touchstart', function (e) {
            if (!game.won) {
                game.onClick();
            }
            e.preventDefault();
        });
        
        $('#'+elementID).on('mousedown', function (e) {
            e.preventDefault();
        });
    };


    game.wrong = function (start) {
        if (start) {
            game.color = {
                hue: 0,
                lum: 0.2,
                sat: 1
            };
            sounds.wrong.play();
            setTimeout(function () {
                game.changeScene('startScene');
            }, 1000);
        }
    };


    game.win = function (start, options) {
        if (start) {
            game.won = true;
            sounds.win.play();
        }
        $('#'+elementID).parents('.game').addClass('won');
        
        if (typeof localStorage !== 'undefined') {
            localStorage['one_pixel_'+elementID] = true;
        }
        
        this.color = {
            hue: colors.win.hue,
            sat: colors.win.sat,
            lum: colors.win.lum
        };
    };



    game.startScene = function (start) {
        if (start) {
            game.color = {
                hue: colors.start.hue,
                sat: colors.start.sat,
                lum: colors.start.lum
            };
        }
    };


    game.lightPulse = function (start, options) {
        if (start) {
            if (typeof options.finalLum === 'undefined') {
                options.finalLum = game.color.lum;
            }
            if (typeof options.initialLum === 'undefined') {
                options.initialLum = 1;
            }
        }
        this.color.lum = options.initialLum - (options.initialLum - options.finalLum) * Math.min(1, game.sceneTime/(options.delay || 0.3)); 
    };


    return game;
    
}




$(function() {
    
    $('.author').html('written by pierre' + '@toxicode.fr');
    
    var games =['A', 'B', 'C', 'D', 'E'];
    
    for (var i=0; i < games.length; i++) {
        var g = createGame('game'+games[i]);
        window['chooseGame'+games[i]](g);
        g.init();
        
        if (games[i] === 'E') {
            g.color.lum = 0.3;
        }

        if (typeof localStorage !== 'undefined') {
            if (localStorage['one_pixel_game'+games[i]]) {
                $('.game'+games[i]).addClass('won');
            }
        }
    };
    
    
    $('.magnifier').click(function(e) {
        e.preventDefault();
        $(this).parents('.img_positionner').fadeOut(1000);
        $(this).parents('.game').find('canvas').animate({
            width: '200px',
            height: '200px',
            'padding-top': '0',
            'padding-bottom': '0'
        }, 1000);
    });
    
    
});


