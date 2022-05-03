import { Renderer } from "./renderer.js";
export function initiate(chdir) {
    return new Promise((res) => document.addEventListener('DOMContentLoaded', res)).then(() => {
        let ctx, canvas = document.querySelector('canvas');
        if (!canvas)
            throw new Error("Cannot find the game renderer");
        let WonH = (innerWidth - 10) / (innerHeight - 10);
        canvas.height = innerHeight - 10;
        let cellWidth = Math.floor((innerHeight - 10) / 15), xAxisCellNumber = Math.floor(WonH * 15);
        canvas.width = cellWidth * xAxisCellNumber;
        document.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() === 'w' || e.key === 'ArrowUp')
                chdir("n");
            if (e.key.toLowerCase() === 'a' || e.key === 'ArrowLeft')
                chdir("w");
            if (e.key.toLowerCase() === 's' || e.key === 'ArrowDown')
                chdir("s");
            if (e.key.toLowerCase() === 'd' || e.key === 'ArrowRight')
                chdir("e");
            if (e.key.toLowerCase() === 'g') {
                for (let i = 0; i < 100; i++) {
                    chdir('n');
                    chdir('e');
                    chdir('s');
                    chdir('w');
                }
            }
//             e.preventDefault();
        });
        return {
            general: {
                gameGrid: [xAxisCellNumber, 15],
                gameDimensions: [cellWidth * xAxisCellNumber, innerHeight - 10]
            },
            renderer: new Renderer(canvas),
            state: {
                snake: [[0, 0], [0, 1], [0, 2]],
                apple: [[2, 2]],
                progress: 0,
                heading: "e",
                headingQueue: []
            }
        };
    });
}
//# sourceMappingURL=prepare.js.map
