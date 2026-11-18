let context,enabled=true;
export function toggleSound(){enabled=!enabled;return enabled;}
export function chime(kind){
 if(!enabled)return;
 try{
  context??=new (window.AudioContext||window.webkitAudioContext)();context.resume();
  const notes=kind==='light'?[523,659,784]:kind==='tide'?[196,294]:kind==='bump'?[110,82]:[392];
  notes.forEach((hz,i)=>{const o=context.createOscillator(),g=context.createGain(),t=context.currentTime+i*.085;o.type='sine';o.frequency.value=hz;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.065,t+.015);g.gain.exponentialRampToValueAtTime(.001,t+.23);o.connect(g);g.connect(context.destination);o.start(t);o.stop(t+.25);});
 }catch{}
}
