window.onload=function game(){
    let UI={
        scorekeeper:document.querySelector("p"),
        canvas:document.querySelector("canvas"),
        ctx:null
    }
    UI.canvas.height=Math.min(innerHeight,innerWidth)-30;
    UI.canvas.width=UI.canvas.height+20
    UI.ctx=UI.canvas.getContext("2d");
    let config={
        squares:30,
        fps:10
    }
    let rt={
        paused:false,
        /**
         * @type {(Number[])[]}
         * @property {Number[]} direction
         * @description turn loc, eg [[0,0],[5,0],[5,5]], first one is head, last one is tail
         */
        snake:[[4,4],[4,3]],
        apple:[4,5],
        boost:Date.now(),
        cooldown:false,
        lastRender:Date.now()
    }
    rt.snake.direction=[0,0]
    console.log("lod")

    //bindkey
    document.addEventListener("keydown",(e)=>{
        console.log("keydwon "+e)
        if(rt.cooldown) return;
        rt.cooldown = true;
        
        if(key==="Escape"){
            rt.paused=!rt.paused;
        }
        if(e.key==="b"&& (Date.now()-rt.boost> 1000)){
            rt.boost=Date.now()
            console.log("boosty juice")
        }
        if( (e.key==="s"||e.key==="ArrowDown") && (!compare(rt.snake.direction,[0,-1]))){
            rt.snake.direction=[0,1]
            e.preventDefault();
            e.stopPropagation();
            return false;
        }else if( (e.key==="w"||e.key==="ArrowUp") && (!compare(rt.snake.direction,[0,1])) ){
            rt.snake.direction=[0,-1]
            e.preventDefault();
            e.stopPropagation();
            return false;
        }else if( (e.key==="a" || e.key==="ArrowLeft") && (!compare(rt.snake.direction,[1,0])) ){
            rt.snake.direction=[-1,0];
            e.preventDefault();
            e.stopPropagation();
            return false;
        }else if( (e.key==="d" || e.key==="ArrowRight") && (!compare(rt.snake.direction,[-1,0])) ){
            rt.snake.direction=[1,0];
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
    let interval=0;


    function gameLoop(){
        requestAnimationFrame(gameLoop);
        if(Date.now() - rt.lastRender < 100) return;
        rt.lastRender = Date.now()
        
        rt.cooldown = false;
        if(rt.paused){
            UI.ctx.font="30px Arial"
            UI.ctx.fillText("Game paused; Press Esc to continue",0,30)
            return;
        }
        if (!document.hasFocus()) return rt.paused = true;

        UI.ctx.clearRect(0,0,UI.canvas.width,UI.canvas.height);
        rt.snake.unshift([ rt.snake.direction[0]+rt.snake[0][0] , rt.snake.direction[1]+rt.snake[0][1] ])
        rt.snake.pop();
        if((Date.now()-rt.boost) < 100){
            console.log("bot")
            rt.snake.unshift([ rt.snake.direction[0]+rt.snake[0][0] , rt.snake.direction[1]+rt.snake[0][1] ])
            rt.snake.pop();
            rt.snake.unshift([ rt.snake.direction[0]+rt.snake[0][0] , rt.snake.direction[1]+rt.snake[0][1] ])
            rt.snake.pop();
        }
        //growth
        if(rt.apple.toString()===rt.snake[0].toString()){
            UI.scorekeeper.innerHTML=`Score: ${rt.snake.length-1}`
            let finalsnake=rt.snake.slice(rt.snake.length-2);
            let direction=finalsnake[0].map((a,i)=>a-finalsnake[1][i])
            rt.snake.push([finalsnake[1][0]-direction[0],finalsnake[1][1]-direction[1]])
            while(contains(rt.snake,rt.apple)){
                rt.apple=([Math.floor(Math.random()*config.squares),Math.floor(Math.random()*config.squares)]);
            }
        }

        //deaths
        if(rt.snake[0].some(a=>a<0||a>config.squares)){
            alert("You hit the wall! Reload to play again")
            clearTimeout(interval)
            return;
        }
        if(rt.snake.length>4){
            if(rt.snake.slice(1).some( a=>compare(a,rt.snake[0]) )){
                alert("You hit yourself! Reload to play again")
                clearTimeout(interval)
                return
            }
        }

        //render loop
        rt.snake.forEach(drawSquare("green"))
        drawSquare("red")(rt.apple)

    }
    interval=setTimeout(gameLoop,100);
    function drawSquare(color){
        /** Renders square
         * @param {Number[]} v square to be rendered
         */
        return function render(v){
            let square=UI.canvas.height/config.squares;
            UI.ctx.fillStyle=color;
            UI.ctx.fillRect(v[0]*square,v[1]*square,square,square);
        }
    }
    /**
     * Compares s1 and s2 - default one is very buggy
     * @param {Array} s1 
     * @param {Array} s2 
     * @returns 
     */
    function compare(s1,s2){
        return s1.join()===s2.join()
    }
    /**
     * Does v contain a?
     * @param {Array} a 
     * @param {*} v 
     * @returns {Boolean} 
     */
    function contains(a,v){
        return a.some(x=>compare(x,v))
    }
}