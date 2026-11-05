import { mountEncyclopediaReader } from "./encyclopediaReaderBrowser";
import { ENCYCLOPEDIA_PILOT } from "./encyclopediaPilotConfig";

function mount():void{
  const root=document.getElementById("app");
  if(!root) throw new Error("missing #app root");
  document.title=ENCYCLOPEDIA_PILOT.pageTitle + " · FSP Inquiry Atlas";
  mountEncyclopediaReader(root,{
    sectionId:ENCYCLOPEDIA_PILOT.sectionId,
    caseId:ENCYCLOPEDIA_PILOT.caseId,
    prose:ENCYCLOPEDIA_PILOT.prose,
    anchorId:"ch1-2-neptune-vulcan",
    routeContext:"github-pages-pilot:CH1.2"
  });
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",mount,{once:true});
}else{
  mount();
}
