const fs=require('node:fs');
const path=require('node:path');
const {MAATHAI_DOSSIER,compilePublicLivesRoute}=require('../dist/research/livesPublicRouteModel.js');
const {MAATHAI_VR_HARNESS}=require('../dist/research/maathaiVrPrototype.js');

const route=compilePublicLivesRoute(MAATHAI_DOSSIER);
const payload={
  generatedFrom:{
    dossier:MAATHAI_DOSSIER.canonicalOwner,
    publicRoute:'FSP-LIVES-PUBLIC-ROUTE-1',
    vrProjection:'FSP-VR-MAATHAI-2.0-PROJECTION-1'
  },
  route,
  vr:{
    canonicalOwner:MAATHAI_VR_HARNESS.canonicalOwner,
    activeModules:MAATHAI_VR_HARNESS.activeModules,
    disabledModules:MAATHAI_VR_HARNESS.disabledModules,
    scenes:MAATHAI_VR_HARNESS.scenes,
    exitAllowed:MAATHAI_VR_HARNESS.exitAllowed,
    lifeNavigationOptional:MAATHAI_VR_HARNESS.lifeNavigationOptional,
    returnRule:MAATHAI_VR_HARNESS.returnRule
  }
};
const out=path.join(__dirname,'../prototypes/lives-maathai-vr/data.js');
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,'window.FSP_LIVES_MAATHAI_PROTOTYPE='+JSON.stringify(payload,null,2)+';\n');
console.log(out);
