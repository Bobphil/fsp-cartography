import { STATES, STATE_BY_ID, STANDING, STANDING_MODES, RETURN_STAGES } from './src/states.js';
import { initialState, reducer } from './src/reducer.js';
import { checkInvariants } from './src/invariants.js';

let app = initialState();
const el = id => document.getElementById(id);
const field = el('field');
const explanation = el('explanation');

const trialQuestions = [
  ['Was Elena the same thing as her chart?', ['no','not the same','representation']],
  ['Did 0.81 become something new when it became HIGH RISK?', ['yes','institution','workflow','category','status']],
  ['Did the model itself have authority to sedate Elena?', ['no','not','additional']],
  ['Why did Elena get to respond to the risk representation?', ['represent','about her','affect','character']],
  ['Was Elena’s response proof that the model was right or wrong?', ['no','not proof','does not prove']],
  ['When the error report entered the database, was the system already corrected?', ['no','uptake','revision','recomposition']],
  ['Why did old information need to return during review?', ['reconstruct','why','warrant','reason']],
  ['Did reopening require returning to the start?', ['no','selective','relevant']],
  ['Why should the revised rule retain a history?', ['why','history','reconsider','provenance','reason']]
];

function dispatch(action){ app = reducer(app, action); render(); }

function node(label, opts={}){
  const d=document.createElement('button'); d.className=`node ${opts.kind||''}`; d.dataset.col=opts.col||2; if(opts.row) d.style.gridRow=opts.row; d.type='button';
  d.innerHTML=`<strong>${label}</strong>${opts.small?`<span class="small">${opts.small}</span>`:''}`;
  if(opts.click) d.addEventListener('click',opts.click); return d;
}

function drawState(s){
  field.innerHTML=''; explanation.textContent='Select an active object or operation to inspect the current crossing.';
  const n=s.n;
  if(n===1){ field.append(node('Elena',{kind:'agent',col:2,small:'Situated person before the model',click:()=>explain('Elena has first-person access to symptoms and a history that no chart exhausts.')})); field.append(node('Immediate task space',{col:3,small:'Call nurse • rest • ask questions'})); }
  if(n===2){ field.append(node('Elena',{kind:'agent',col:1})); field.append(node('Clinical record',{kind:'representation',col:2,small:'Selected measurements + notes',click:()=>explain('The chart is a task-relative representation. It is clinically useful without becoming Elena.')})); if(app.revealed[s.id]) field.append(node('Recoverable remainder',{col:3,small:'Sedation history • family role • felt strangeness'})); }
  if(n===3){ field.append(node('Individual records',{col:1,small:'Partial patient histories'})); field.append(node('Population pattern',{kind:'crossing',col:2,small:'Comparative statistical relation'})); field.append(node('Not individual destiny',{col:3,small:'Scope must be revalidated'})); }
  if(n===4){ field.append(node('Population evidence',{col:1})); field.append(node('CDRM model',{kind:'representation',col:2,small:'Operational predictive infrastructure'})); field.append(node('Claim ceiling',{col:3,small:'Predict risk • not treatment authority'})); }
  if(n===5){ field.append(node('Population-trained model',{col:1})); field.append(node('0.81',{kind:'representation',col:2,small:'Individualized risk estimate'})); field.append(node('Elena',{kind:'agent',col:3,small:'Index changed: population → person'})); }
  if(n===6){ field.append(node('0.81',{col:1,small:'Model prediction'})); field.append(node('Threshold ≥ 0.80',{kind:'crossing',col:2,small:'Hospital policy boundary'})); field.append(node('HIGH RISK',{kind:'representation',col:3,small:'Institutional workflow category'})); }
  if(n===7){
    const actors=['Elena','Nurse','Dr. Rahman','AI model','Hospital']; actors.forEach((a,i)=>field.append(node(a,{kind:a==='Elena'?'agent':'',col:(i%3)+1,small:app.standingMode?(STANDING[app.standingMode][a]||`No ${app.standingMode} standing in this view`):'Select a standing mode'})));
  }
  if(n===8){ field.append(node('HIGH RISK',{col:1})); field.append(node('AUTHORIZATION GATE',{kind:'crossing',col:2,small:'What licenses the next action?'})); field.append(node('Closer monitoring',{col:3,small:app.licensedActions.includes('monitoring')?'Licensed':'Needs warrant',click:()=>dispatch({type:'LICENSE_ACTION',action:'monitoring'})})); field.append(node('Sedation',{col:3,small:'Additional authorization required',click:()=>explain('The risk score does not directly license sedation. Additional clinical and authorization conditions are required.')})); }
  if(n===9){ field.append(node('Risk representation',{kind:'return-authorial',col:1,small:'Returned toward Elena'})); field.append(node('Elena',{kind:'agent',col:2,small:app.fit?`Fit state: ${app.fit}`:'Inspect and respond'})); field.append(node('Qualification',{col:3,small:app.qualification||'No qualification recorded'})); }
  if(n===10){ field.append(node('Bounded action',{col:2,small:'Monitoring + reassessment'})); field.append(node('Warrant capsule',{kind:'representation',col:1,small:app.warrantCapsule?'Preserved for later reconstruction':'Create before moving on'})); field.append(node('Workflow sediment',{kind:'sediment',col:3,small:'Order → handoff → monitoring default • increasingly embedded'})); }
  if(n===11){ field.append(node('Data-entry error + burden',{col:3,row:1,small:'Downstream consequence'})); field.append(node('Consequential Return',{kind:'return-consequence',col:2,row:2,small:'Routes upstream'})); const pos={presence:[1,1],uptake:[1,2],revision:[1,3],recomposition:[2,3]}; RETURN_STAGES.forEach(st=>field.append(node(st.toUpperCase(),{col:pos[st][0],row:pos[st][1],kind:'return-stage',small:app.returnStage===st?'Current stage':'Not yet current',click:()=>dispatch({type:'SET_RETURN_STAGE',stage:st})}))); }
  if(n===12){
    const items=[['corrected_lab_value','Corrected lab value'],['model_contribution','Model contribution'],['independent_clinical_evidence','Independent clinical evidence'],['authorization_rationale','Authorization rationale'],['consequence','Consequences'],['all_training_records','All training records'],['entire_life_history','Entire life history']];
    items.forEach(([key,label],i)=>field.append(node(label,{col:(i%3)+1,small:app.reopenSelections.includes(key)?'Recovered':'Compressed',click:()=>dispatch({type:'REOPEN_SELECT',item:key,selected:!app.reopenSelections.includes(key)})}))); if(app.recomposed) field.append(node('Recomposed workflow',{col:2,small:'History carried forward; Return remains open'}));
  }
}

function explain(txt){ explanation.textContent=txt; }

function buildActions(s){
  const wrap=el('actionButtons'); wrap.innerHTML='';
  const add=(label,fn)=>{const b=document.createElement('button'); b.textContent=label;b.addEventListener('click',fn);wrap.append(b)};
  if(s.n===1) add('Reveal what matters',()=>dispatch({type:'REVEAL'}));
  if(s.n===2||s.n===3||s.n===4) add('Reveal hidden/remainder',()=>dispatch({type:'REVEAL'}));
  if(s.n===7) STANDING_MODES.forEach(m=>add(m,()=>dispatch({type:'SET_STANDING',mode:m})));
  if(s.n===8){add('License monitoring',()=>dispatch({type:'LICENSE_ACTION',action:'monitoring'}));add('Test sedation',()=>dispatch({type:'LICENSE_ACTION',action:'sedation'}));}
  if(s.n===9){add('Return to Elena',()=>dispatch({type:'AUTHORIAL_RETURN'}));add('Partial fit',()=>dispatch({type:'SET_FIT',value:'partial_fit'}));add('Qualify',()=>dispatch({type:'QUALIFY',text:'No automatic sedation authorization'}));}
  if(s.n===10) add('Preserve warrant capsule',()=>dispatch({type:'CREATE_WARRANT_CAPSULE'}));
  if(s.n===11) RETURN_STAGES.forEach(st=>add(st,()=>dispatch({type:'SET_RETURN_STAGE',stage:st})));
  if(s.n===12) add('Recompose',()=>dispatch({type:'RECOMPOSE'}));
  if(s.next) add('Next state →',()=>dispatch({type:'ADVANCE'}));
}

function renderProgress(){ const p=el('progress');p.innerHTML=''; const current=STATE_BY_ID[app.stateId].n; STATES.forEach(s=>{const d=document.createElement('div');d.className='step '+(s.n===current?'active':s.n<current?'past':'');d.textContent=`${s.n}. ${s.title}`;p.append(d)}); }

function render(){
  const s=STATE_BY_ID[app.stateId];
  el('stateNumber').textContent=`State ${s.n} of 12 • ${s.operation}`; el('stateTitle').textContent=s.title; el('purpose').textContent=s.purpose; el('prompt').textContent=s.prompt; el('lesson').textContent=s.lesson;
  el('visibleList').innerHTML=s.visible.map(x=>`<li>${x}</li>`).join('');
  const hidden=app.revealed[s.id]?s.hidden.map(x=>`<li>${x}</li>`).join(''):'<li>Use a reveal/inspect operation where available.</li>';
  el('hiddenList').innerHTML=hidden;
  const failures=checkInvariants(app); el('invariantStatus').innerHTML=failures.length?`<div class="fail">FAIL</div><ul>${failures.map(x=>`<li>${x}</li>`).join('')}</ul>`:'<div class="pass">PASS — current interaction state preserves invariants</div>';
  renderProgress(); buildActions(s); drawState(s);
}

el('locateBtn').addEventListener('click',()=>{const s=STATE_BY_ID[app.stateId]; explain(`You are in State ${s.n}: ${s.title}. Active task: ${s.purpose} Primary operation: ${s.operation}.`)});
el('resetBtn').addEventListener('click',()=>dispatch({type:'RESET'}));
el('trialBtn').addEventListener('click',()=>el('trialDialog').showModal());

const tq=el('trialQuestions'); trialQuestions.forEach(([q],i)=>{const d=document.createElement('div');d.className='trial-q';d.innerHTML=`<label><strong>${i+1}. ${q}</strong><textarea id="trial_${i}" aria-label="Question ${i+1}"></textarea></label>`;tq.append(d)});
el('scoreTrialBtn').addEventListener('click',()=>{
  let score=0; const notes=[]; trialQuestions.forEach(([q,keys],i)=>{const ans=el(`trial_${i}`).value.toLowerCase();const hit=keys.some(k=>ans.includes(k));if(hit)score++;else notes.push(`Q${i+1}`)});
  el('trialResult').textContent=`Local keyword check: ${score}/${trialQuestions.length}. ${notes.length?`Review ${notes.join(', ')} manually.`:'All responses contain at least one expected concept cue.'} This is a navigation aid, not a validated human-comprehension measure.`;
});

render();
