export const DIRECTIONS=[[1,0],[0,1],[-1,0],[0,-1]];
export const DIRECTION_NAMES=['east','south','west','north'];
export const ROUTE=[[0,2],[0,1],[1,1],[1,0],[2,0],[3,0],[4,0],[4,1],[5,1],[5,2],[5,3],[4,3],[4,4],[3,4],[3,3],[3,2],[4,2],[5,2]];
export const CHARTS=[
 {name:'The Amber Reach',subtitle:'A little light goes a long way.',fuel:20,beacons:[[2,0],[5,1],[3,4]],rocks:[[2,1],[2,2],[1,3],[2,3]],seed:17},
 {name:'Letters from the Blue',subtitle:'Same waters. A different current.',fuel:19,beacons:[[2,0],[5,1],[3,4]],rocks:[[2,1],[2,2],[1,3],[2,3],[0,4]],seed:41},
 {name:'The Last Lighthouse',subtitle:'Bring every light back home.',fuel:18,beacons:[[2,0],[5,1],[3,4]],rocks:[[2,1],[2,2],[1,3],[2,3],[0,4],[1,4]],seed:73}
];
export function seededDirections(seed){let x=seed;return Array.from({length:30},()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return (x>>>20)%4;});}
export const cellId=(x,y)=>y*6+x;
