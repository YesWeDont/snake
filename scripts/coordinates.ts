let vectors: Record<Direction, [number,number]> = {
    n:[0, -1],
    s:[0,1],
    e:[1, 0],
    w:[-1,0]
}
export function coordAdd(coord:number[], direction:Direction){
    return [coord[0] + vectors[direction][0], coord[1] + vectors[direction][1]]
}
export function coordEqual(c1:number[], c2:number[]){
    return c1[0] === c2[0] && c1[1] === c2[1]
}
export function negateVect(v:number[]){
    return v.map(a=>-a)
}
export function addVec(v1:number[], v2:number[]){
    return [v1[0]+v2[0], v1[1]+v2[1]]
}
export function vectDirection(v:number[]):Direction{
    if(coordEqual(v, vectors.n)) return 'n'
    if(coordEqual(v, vectors.s)) return 's'
    if(coordEqual(v, vectors.e)) return 'e'
    if(coordEqual(v, vectors.w)) return 'w'
    else throw new Error('Invalid `v` component')
}