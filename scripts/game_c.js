function chooseGameC (game) {
    
    var codes = [
        [1, 0.1],
        [2, 0.17],
        [3, 0.6],
        [4, 0.8]
    ];
    
    var currentCode = 0;
    var currentClicks;
    var combo;
    
    var timer;
    
    game.colorDisplay = function (start) {
        if (start) {
            sounds.bip.play();
            
            var newCode = currentCode;
            
            while(newCode === currentCode) {
                newCode = Math.floor(Math.random()*4);
            }
            currentCode = newCode;
            
            game.color = {
                hue: codes[currentCode][1],
                sat: 1,
                lum: 0.5
            };
            
            currentClicks = 0;
        }
    };
    
    game.recordClick = function () {
        sounds.bipShort.play();
        currentClicks += 1;
        clearTimeout(timer);
        if (currentClicks > codes[currentCode][0]) {
            game.changeScene('wrong');
        } else {
            timer = setTimeout(function () {
                if (currentClicks < codes[currentCode][0]) {
                    game.changeScene('wrong');
                } else if (combo > 3) {
                    game.changeScene('win');
                } else {
                    combo += 1;
                    game.changeScene('colorDisplay');
                }
            }, 600);
        }
    };
       
    game.onClick = function () {
        if (game.currentScene === 'startScene') {
            combo = 0;
            game.changeScene('colorDisplay');
        } else if (game.currentScene === 'colorDisplay') {
            game.recordClick();
        }
    };
}
