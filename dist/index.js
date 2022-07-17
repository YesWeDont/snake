var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { physics } from "./physics.js";
import { initiate } from "./prepare.js";
(() => __awaiter(void 0, void 0, void 0, function* () {
    let GAME = yield initiate((direction) => {
        let latestDirection = GAME.state.headingQueue[GAME.state.headingQueue.length - 1] || GAME.state.heading;
        if (validDirectionChange(direction, latestDirection) &&  GAME.state.headingQueue.length < 3)
            GAME.state.headingQueue.push(direction);
    });
    requestAnimationFrame(update);
    function update() {
        GAME.state = physics(GAME, a => {
            GAME.renderer.render(GAME);
            alert(a);
            throw new Error('Game Ended');
        });
        GAME.renderer.render(GAME);
        requestAnimationFrame(update);
    }
}))();
function validDirectionChange(a, b) {
    return !((a === b) || (a === 'e' && b === 'w') || (a === 'w' && b === 'e') || (a === 'n' && b === 's') || (a === 's' && b === 'n'));
}