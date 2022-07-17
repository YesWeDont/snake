import { physics } from "./physics.js";
import { initiate } from "./prepare.js";
(async ()=>{
    let GAME = await initiate((direction)=>{
        //circumvent self-hitting + shorten queue
        let latestDirection = GAME.state.headingQueue[GAME.state.headingQueue.length - 1] || GAME.state.heading;
        if(validDirectionChange(direction, latestDirection) && game.headingQueue.length < 3) GAME.state.headingQueue.push(direction)
    });
    //raf shoot my foot
    requestAnimationFrame(update)
    function update(){
        GAME.state = physics(GAME, a=>{
            // render the frame post-mortem so the snake really does hit the wall.
            GAME.renderer.render(GAME);
            alert(a);
            throw new Error('Game Ended');
        });
        GAME.renderer.render(GAME);
        requestAnimationFrame(update)
    }
})();
function validDirectionChange(a:Direction,b:Direction){
    return !((a === b) || (a === 'e' && b === 'w') || (a === 'w' && b === 'e') || (a === 'n' && b === 's') || (a === 's' && b === 'n'))
}