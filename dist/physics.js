import { coordAdd, coordEqual } from "./coordinates.js";
export function physics(_game, gameEnd) {
    let game = JSON.parse(JSON.stringify(_game.state));
    game.progress += 0.1;
    if (game.progress > 1) {
        game.heading = game.headingQueue.shift() || game.heading;
        game.progress = 0;
        let shouldGrow = false;
        game.snake.unshift(coordAdd(game.snake[0], game.heading));
        for (let index = 0, location = game.apple[index]; index < game.apple.length; index++) {
            if (coordEqual(game.snake[0], location)) {
                shouldGrow = true;
                do {
                    location = [Math.round(_game.general.gameGrid[0] * Math.random()), Math.round(_game.general.gameGrid[1] * Math.random())];
                } while (game.snake.concat(game.apple).some(a => coordEqual(a, location)));
                game.apple[index] = location;
                break;
            }
        }
        if (!shouldGrow)
            game.snake.pop();
        if (game.snake[0][0] > _game.general.gameGrid[0] || game.snake[0][1] > _game.general.gameGrid[1] || game.snake[0][0] < 0 || game.snake[0][1] < 0)
            gameEnd('You hit the wall!');
        game.snake.slice(1).forEach((cell1) => {
            if (coordEqual(game.snake[0], cell1))
                gameEnd('You hit yourself!');
        });
    }
    return game;
}