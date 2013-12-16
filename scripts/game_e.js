function chooseGameE (game) {
    game.onClick = function () {
        if (game.currentScene === 'startScene') {
            game.changeScene('win');
        }
    };
}
