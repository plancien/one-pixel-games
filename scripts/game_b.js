function chooseGameB (game) {
    
    var timer;
    
    game.launchPulse = function () {
        sounds.bipShort.play();
        game.changeScene('lightPulse', {initialLum: 0.6, finalLum: game.color.lum, delay: 0.15});
        game.pulsesTotal -= 1;
        timer = setTimeout(function () {
            if (game.pulsesTotal > 0) {
                game.launchPulse();
            } else {
                game.changeScene('detection');
            }
        }, 800);
    };
    
    game.detection = function (start) {
        
    };
    
    game.startCounter = function () {
        game.pulsesTotal = 3 + Math.floor(Math.random() * 9);
        game.color.hue = 0.67;
        game.color.sat = 1;
        game.color.lum = 0.3;
        game.launchPulse();
        
    };
    
    game.onClick = function () {
        if (game.currentScene === 'startScene') {
            game.startCounter();
        } else if (game.currentScene === 'lightPulse') {
            clearTimeout(timer);
            game.changeScene('wrong');
        } else if (game.currentScene === 'detection') {
            
            if (game.sceneTime < 0.5) {
                game.changeScene('win');
            } else {
                game.changeScene('wrong');
            }
        }
    };
}
