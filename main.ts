import {copyFileSync,mkdirSync,readdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import {buildDossier} from './vendor/makefun-game.ts';
const root=dirname(fileURLToPath(import.meta.url));
const out=process.env.MAKEFUN_OUTPUT_DIR||'/output';
mkdirSync(out,{recursive:true});
function copyStaticTree(source:string,destination:string){
 mkdirSync(destination,{recursive:true});
 for(const item of readdirSync(source,{withFileTypes:true})){
  const from=join(source,item.name),to=join(destination,item.name);
  if(item.isDirectory())copyStaticTree(from,to);
  else if(item.isFile())copyFileSync(from,to);
  else throw new Error('Only ordinary static files are allowed');
 }
}
for(const folder of ['game','screenshots'])copyStaticTree(join(root,folder),join(out,folder));
writeFileSync(join(out,'dossier.json'),buildDossier(out,{text_max_bytes:163840,screenshots:{max:4,max_bytes:262144},game_max_files:993,game_max_bytes:50331648,game_path_max_bytes:1000}));
