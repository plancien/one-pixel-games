function chooseGameD (game) {
    
    var lastClics = [];
    var r = 0;

    game.updateColor = function () {
        game.color.hue = 1 - 0.8 * r;
        game.color.lum = 0.4 - 0.2*r;
    };

    game.mainLoop = function () {
        var number = Math.min(10, lastClics.length);
        if (number > 2) {
            var meanTime = (game.time - lastClics[lastClics.length - number]) / number;
            r = Math.max(0, (0.5 - meanTime) / 0.5);
        }
        game.updateColor();
    };

    game.onClick = function () {
        sounds.bipShort.play();
        lastClics.push(game.time);
        game.color.sat = 1;
        game.updateColor();
        if (r > 0.65 && lastClics.length > 10) {
            game.changeScene('win');
        } else {
            game.changeScene('lightPulse', {initialLum: 0.5 * (game.color.lum + 1), finalLum: game.color.lum, delay: 0.2 - Math.pow(r, 0.3) * 0.2});
        }
    };
}
