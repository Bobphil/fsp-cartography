import { mountPublicEncyclopedia } from "./encyclopediaPublicShell";

function mount():void{
  const root=document.getElementById("app");
  if(!root) throw new Error("missing #app root");
  mountPublicEncyclopedia(root);
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",mount,{once:true});
else mount();
