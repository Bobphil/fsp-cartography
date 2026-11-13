const fs=require('node:fs');
const path=require('node:path');
const {GOLDEN_PATH_STAGES}=require('../dist/research/fspVrGoldenPath.js');
const out=path.join(__dirname,'../prototypes/golden-path-1/data.js');
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,'window.FSP_GOLDEN_PATH_1='+JSON.stringify({stages:GOLDEN_PATH_STAGES},null,2)+';\n');
console.log(out);