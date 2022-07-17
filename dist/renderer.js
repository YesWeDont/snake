const opposites = {
    n: 's',
    e: 'w',
    s: 'n',
    w: 'e'
};
import { negateVect, addVec, vectDirection } from "./coordinates.js";
export class Renderer {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d") || (() => { throw new Error('Cnvas Renderer init failed..'); })();
    }
    render(gameState) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(...squareAt(gameState.state.snake[0], gameState.general.gameGrid, gameState.general.gameDimensions, gameState.state.heading, gameState.state.progress));
        gameState.state.snake.slice(1, -1).forEach(loc => {
            this.ctx.fillRect(...squareAt(loc, gameState.general.gameGrid, gameState.general.gameDimensions));
        });
        let snakeEnd = addVec(negateVect(gameState.state.snake[gameState.state.snake.length - 2]), gameState.state.snake[gameState.state.snake.length - 1]), endDirection = vectDirection(snakeEnd);
        this.ctx.fillRect(...squareAt(gameState.state.snake[gameState.state.snake.length - 1], gameState.general.gameGrid, gameState.general.gameDimensions, endDirection, 1 - gameState.state.progress, true));
        this.ctx.fillStyle = 'red';
        for (let apple of gameState.state.apple) {
            this.ctx.fillRect(...squareAt(apple, gameState.general.gameGrid, gameState.general.gameDimensions));
        }
    }
}
function squareAt(location, gridSize, gridDimensions, facing, progress, end) {
    let unit = [Math.round(gridDimensions[0] / (gridSize[0] + 1)), Math.round(gridDimensions[1] / (gridSize[1] + 1))];
    if (facing) {
        progress = progress !== null && progress !== void 0 ? progress : 0;
        if (!end) {
            if (facing === 'n')
                return [location[0] * unit[0], (location[1] + 1 - progress) * unit[1], unit[0], unit[1] * progress];
            if (facing === 's')
                return [location[0] * unit[0], location[1] * unit[1], unit[0], progress * unit[1]];
            if (facing === 'e')
                return [location[0] * unit[0], location[1] * unit[1], progress * unit[0], unit[1]];
            if (facing === 'w')
                return [(location[0] + 1 - progress) * unit[0], location[1] * unit[1], unit[0] * progress, unit[1]];
        }
        else {
            if (facing === 'n')
                return [location[0] * unit[0], (location[1] + 1 - progress) * unit[1], unit[0], unit[1]];
            if (facing === 's')
                return [location[0] * unit[0], location[1] * unit[1], unit[0], progress * unit[1]];
            if (facing === 'e')
                return [location[0] * unit[0], location[1] * unit[1], progress * unit[0], unit[1]];
            if (facing === 'w')
                return [(location[0] + 1 - progress) * unit[0], location[1] * unit[1], unit[0], unit[1]];
        }
    }
    else {
        return [location[0] * unit[0], location[1] * unit[1], unit[0], unit[1]];
    }
    throw new Error('Unexpected Game Error');
}