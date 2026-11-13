const fs=require('node:fs');
const path=require('node:path');
const {DEVELOPMENTAL_STAGES,DEVELOPMENTAL_EVIDENCE}=require('../dist/research/fspVrDevelopmentalEntry.js');
const out=path.join(__dirname,'../prototypes/developmental-entry-1/data.js');
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,'window.FSP_DEVELOPMENTAL_ENTRY_1='+JSON.stringify({stages:DEVELOPMENTAL_STAGES,evidence:DEVELOPMENTAL_EVIDENCE},null,2)+';\n');
console.log(out);