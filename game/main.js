import {createVoyage,startVoyage,rotateCurrent,releaseTide} from './voyage.js';
import {renderApp} from './render.js';
import {toggleSound,chime} from './sound.js';
let state=createVoyage(),sound=true;
const app=document.querySelector('#app');
function paint(){app.innerHTML=renderApp(state,sound);}
function turn(id){if(rotateCurrent(state,id))chime('turn');else chime('bump');paint();}
function sail(){const n=state.lights.length,h=state.hull;if(releaseTide(state)){chime(state.lights.length>n?'light':state.hull<h?'bump':'tide');paint();}}
app.addEventListener('click',event=>{
 const cell=event.target.closest('[data-cell]');
 if(cell){turn(Number(cell.dataset.cell));return;}
 const button=event.target.closest('button');
 if(!button)return;
 switch(button.id){
  case 'start':startVoyage(state);chime('light');paint();break;
  case 'tide':sail();break;
  case 'again':case 'restart':state=startVoyage(createVoyage(state.level));paint();break;
  case 'next':state=startVoyage(createVoyage(state.level+1));chime('light');paint();break;
  case 'home':state=createVoyage();paint();break;
  case 'help':document.querySelector('#guide').showModal();break;
  case 'close-help':document.querySelector('#guide').close();break;
  case 'sound':sound=toggleSound();paint();break;
 }
});
document.addEventListener('keydown',event=>{
 if(document.querySelector('#guide[open]'))return;
 if(state.screen==='title'&&event.code==='Enter'){event.preventDefault();startVoyage(state);paint();return;}
 if(state.screen!=='play')return;
 const changes={ArrowLeft:-1,ArrowRight:1,ArrowUp:-6,ArrowDown:6};
 if(event.code in changes){event.preventDefault();state.selected=Math.max(0,Math.min(29,state.selected+changes[event.code]));paint();}
 else if(event.code==='KeyR'){event.preventDefault();turn(state.selected);}
 else if(event.code==='Space'||event.code==='Enter'){event.preventDefault();sail();}
});
paint();
