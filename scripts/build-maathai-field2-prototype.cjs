const fs=require('node:fs');
const path=require('node:path');
const {MAATHAI_1976_VISUAL_FIELD}=require('../dist/research/fspVrVisualGrammar.js');
const {MAATHAI_1976_FIELD_PROJECTION}=require('../dist/research/maathaiFieldRenderer.js');
const out=path.join(__dirname,'../prototypes/maathai-field-2/data.js');
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,'window.FSP_MAATHAI_FIELD_2='+JSON.stringify({scene:MAATHAI_1976_VISUAL_FIELD,projection:MAATHAI_1976_FIELD_PROJECTION},null,2)+';\n');
console.log(out);