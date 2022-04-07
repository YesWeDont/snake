let vectors = {
    n: [0, -1],
    s: [0, 1],
    e: [1, 0],
    w: [-1, 0]
};
export function coordAdd(coord, direction) {
    return [coord[0] + vectors[direction][0], coord[1] + vectors[direction][1]];
}
export function coordEqual(c1, c2) {
    return c1[0] === c2[0] && c1[1] === c2[1];
}
export function negateVect(v) {
    return v.map(a => -a);
}
export function addVec(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
}
export function vectDirection(v) {
    if (coordEqual(v, vectors.n))
        return 'n';
    if (coordEqual(v, vectors.s))
        return 's';
    if (coordEqual(v, vectors.e))
        return 'e';
    if (coordEqual(v, vectors.w))
        return 'w';
    else
        throw new Error('Invalid `v` component');
}
//# sourceMappingURL=coordinates.js.map