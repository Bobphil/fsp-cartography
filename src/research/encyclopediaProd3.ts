
import {mountProd3} from "./encyclopediaProd3Browser";
async function mount(){
  const root=document.getElementById("app");
  if(!root)throw new Error("missing #app");
  try{await mountProd3(root)}
  catch(e){
    root.innerHTML="<main style='max-width:760px;margin:3rem auto;padding:1rem;font:16px/1.6 system-ui'><h1>FSP Encyclopedia</h1><p>Reader initialization failed.</p><pre>"+String((e as Error).message||e)+"</pre></main>";
  }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>void mount(),{once:true});else void mount();
