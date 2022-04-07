declare type Direction = 'n' | 's' | 'e' | 'w'
declare interface Game{
    general:{
        gameGrid:Vector;
        gameDimensions:Vector;
    };
    renderer:Renderer;
    state:{
        snake:Vector[],
        progress:number,
        apple:Vector[]
        heading: Direction,
        headingQueue:Direction[]
    }
}
declare type Vector = [number, number]