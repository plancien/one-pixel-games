function chooseGameA (game) {
    
    game.colorDisplay = function (start) {
        if (start) {
            sounds.bip.play();
            var hue = colors.win.hue;
            while(Math.abs(hue - colors.win.hue) < 0.1) {
                hue = Math.random();
            }
  
            game.targetColor = {
                hue: hue,
                lum: 0.5
            };
            
            game.color.sat = 1;
            game.color.hue = game.targetColor.hue;
            game.color.lum = game.targetColor.lum;
        }
    };
    
    game.chooseHue = function (start, options) {
        if (start) {
            sounds.bipShort.play();
            game.color.lum = 0.5;
            options.startHue = game.targetColor.hue + 0.3 + 0.4*Math.random();
        }
        game.color.hue = (options.startHue + (0.18 * game.sceneTime))%1;
    };
    
    /*game.chooseLum = function (start) {
        var r = (0.3 * game.sceneTime)%2;
        if (r>1) {
            r = 2 - r;
        }
        game.color.lum = 0.2 + 0.6 * r;
    };*/
    
    
    game.check = function (start) {
        if (start) {
            sounds.bipShort.play();
            var delta = Math.abs(game.color.hue - game.targetColor.hue);
            setTimeout(function () {
                if (delta < 0.07) {
                    game.changeScene('win');
                } else {
                    game.changeScene('wrong');
                }
            }, 500);
            
        }
    };
    

    game.onClick = function () {
        if (game.currentScene === 'startScene') {
            game.changeScene('colorDisplay');
        } else if (game.currentScene === 'colorDisplay') {
            game.changeScene('chooseHue');
        } else if (game.currentScene === 'chooseHue') {
            game.changeScene('check');
            //game.changeScene('chooseLum');
        } else if (game.currentScene === 'chooseLum') {
            game.changeScene('check');
        }
    };
}
