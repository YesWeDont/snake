import { coordAdd, coordEqual} from "./coordinates.js";
export function physics(_game:Game, gameEnd: (message:string)=>void){
    //deeeeep copy of 
    let game:typeof _game.state = JSON.parse(JSON.stringify(_game.state));
    //first increment the position
    game.progress += 0.05
    //then do the pos calculations
    if(game.progress > 1){
        game.heading = game.headingQueue.shift() || game.heading
        game.progress = 0;
        //look at the direction
        let shouldGrow = false;
        // @ts-ignore
        game.snake.unshift(coordAdd(game.snake[0], game.heading));
        //calculate collisions with the apple
        for(let index = 0, location = game.apple[index]; index < game.apple.length; index++){
            if(coordEqual(game.snake[0], location)){
                shouldGrow = true;
                //generate new apple
                do{
                    location = [Math.round(_game.general.gameGrid[0] * Math.random()), Math.round(_game.general.gameGrid[1] * Math.random())]
                }while(game.snake.concat(game.apple).some(a=>coordEqual(a, location)))
                game.apple[index] = location;
                break;
            }
        }
        if(!shouldGrow) game.snake.pop(); 
        //next check for collisions with the wall and the snake itself...
        if(game.snake[0][0] > _game.general.gameGrid[0] || game.snake[0][1] > _game.general.gameGrid[1] || game.snake[0][0] < 0 || game.snake[0][1] < 0) gameEnd('You hit the wall!')
        game.snake.slice(1).forEach((cell1)=>{
            if(coordEqual(game.snake[0], cell1)) gameEnd('You hit yourself!')
        })
        //shift heading q
    }
    return game;
}