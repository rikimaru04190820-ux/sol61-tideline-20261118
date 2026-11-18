import {CHARTS,DIRECTIONS,cellId,seededDirections} from './charts.js';
export function createVoyage(level=0){
 const chart=CHARTS[level];
 return {screen:'title',level,chart,directions:seededDirections(chart.seed),boat:[0,2],fuel:chart.fuel,hull:3,charge:3,tides:0,turns:0,lights:[],trail:[[0,2]],selected:12,notice:'Your boat is waiting at the western pier.',log:[],score:0};
}
export function startVoyage(s){s.screen='play';s.notice='Collect all three lanterns, then return to the eastern harbor.';return s;}
export function rotateCurrent(s,id){
 if(s.screen!=='play'||s.chart.rocks.some(([x,y])=>cellId(x,y)===id))return false;
 s.selected=id;
 if(s.charge===0){s.notice='No signals left this tide. Release the tide to recharge.';return false;}
 s.directions[id]=(s.directions[id]+1)%4;s.charge--;s.turns++;
 s.notice=`Current ${String.fromCharCode(65+id%6)}${Math.floor(id/6)+1} turned clockwise.`;
 return true;
}
export function releaseTide(s){
 if(s.screen!=='play')return false;
 const [x,y]=s.boat,[dx,dy]=DIRECTIONS[s.directions[cellId(x,y)]];
 const nx=x+dx,ny=y+dy;
 s.tides++;s.fuel--;s.charge=3;
 if(nx<0||nx>5||ny<0||ny>4||s.chart.rocks.some(([a,b])=>a===nx&&b===ny)){
  s.hull--;s.notice='A rough landing. Hull damaged; turn the current before trying again.';
  s.log.unshift(`Tide ${s.tides}: rough water · −1 hull`);
 }else{
  s.boat=[nx,ny];s.trail.push([nx,ny]);s.selected=cellId(nx,ny);
  const light=s.chart.beacons.findIndex(([a,b])=>a===nx&&b===ny);
  if(light>=0&&!s.lights.includes(light)){
   s.lights.push(light);s.notice=['A letter of hope, safely aboard.','Another island will glow tonight.','The last lantern. Time to head home.'][s.lights.length-1];
   s.log.unshift(`Tide ${s.tides}: lantern ${light+1} collected`);
  }else{s.notice=nx===5&&ny===2?'Harbor ahead. We still need every lantern.':'A clean crossing. Plan your next current.';}
 }
 if(s.boat[0]===5&&s.boat[1]===2&&s.lights.length===3){s.screen='won';s.score=300+s.fuel*20+s.hull*40-s.turns*2;s.notice='Every island has its light.';}
 else if(s.hull===0||s.fuel===0){s.screen='lost';s.score=s.lights.length*100;s.notice=s.hull===0?'The sea claimed the lantern post.':'The last ember faded before the harbor.';}
 return true;
}
export function scoreStars(s){return s.fuel>=3&&s.hull===3?3:s.hull>=2?2:1;}
