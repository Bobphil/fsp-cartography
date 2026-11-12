window.FSP_LIVES_MAATHAI_PROTOTYPE={
  "generatedFrom":{"dossier":"FSP-LIVES-IN-TRANSFORMATION-PILOT-1","publicRoute":"FSP-LIVES-PUBLIC-ROUTE-1","vrProjection":"FSP-VR-MAATHAI-2.0-PROJECTION-1"},
  "route":{
    "canonicalOwner":"FSP-LIVES-IN-TRANSFORMATION-PILOT-1",
    "surface":{"personName":"Wangari Maathai","researchQuestion":"How did bounded environmental action build capability, encounter institutional constraint, and widen the practical problem field over time?","dominantTopology":"bounded practical task -> repeated coordination -> capability expansion -> institutional friction -> widened problem map -> civic/political action -> institutional re-location","claimCeiling":"This reconstruction does not provide transparent access to Maathai's private experience, total motives, or a complete causal history."},
    "activeModules":["INTENDED_ACTUAL","FAILED_PLAN","AUTHORIZATION_STANDING","INSTITUTIONAL_ROLE","HINDSIGHT_CONTROL"],
    "inspect":{
      "states":[
        {"stateId":"M-A","label":"Academic formation and organizational position","period":"mid-1970s","evidenceDensity":"MEDIUM","capabilities":["scientific training","university participation","women's organizational access"],"constraints":["limited public organizational reach"],"institutions":["University of Nairobi","National Council of Women of Kenya"],"livePossibilities":["research","teaching","women's organizational work","bounded environmental action"]},
        {"stateId":"M-B","label":"Grassroots environmental organization","period":"1977-1988","evidenceDensity":"HIGH","capabilities":["community tree planting","training routines","grassroots networks","environmental advocacy"],"constraints":["resource limits","local organizational dependence"],"institutions":["Green Belt Movement","National Council of Women of Kenya"],"livePossibilities":["expand nurseries","train participants","broaden environmental education","seek institutional support"]},
        {"stateId":"M-C","label":"Environmental-democratic opposition","period":"1989-1996","evidenceDensity":"HIGH","capabilities":["national advocacy","coalition participation","public-space defense"],"constraints":["state opposition","repression risk","restricted civic participation"],"institutions":["Green Belt Movement","Kenyan state institutions"],"livePossibilities":["public advocacy","rights solidarity","land defense","institutional challenge"]},
        {"stateId":"M-D","label":"Continued advocacy after electoral failure","period":"1997-2001","evidenceDensity":"MEDIUM","capabilities":["public standing","environmental advocacy","international visibility"],"constraints":["no elected office","political hostility"],"institutions":["civil society networks","political field"],"livePossibilities":["continued advocacy","future electoral participation"]},
        {"stateId":"M-E","label":"Formal institutional and global standing","period":"2002-2011","evidenceDensity":"HIGH","capabilities":["legislative standing","government role","global advocacy"],"constraints":["institutional responsibility","public representational burden"],"institutions":["Parliament of Kenya","Government of Kenya","international institutions"],"livePossibilities":["policy work","global environmental advocacy"]}
      ],
      "transitions":[
        {"transitionId":"M-T1","capabilityDelta":{"gained":["grassroots organization","training routines","network reach"]},"constraintDelta":{"added":["coordination burden"]}},
        {"transitionId":"M-T2","capabilityDelta":{"gained":["national advocacy","coalition reach"]},"constraintDelta":{"added":["state repression risk","organizing restrictions"]}}
      ]
    },
    "deep":{
      "claims":[
        {"claimId":"M-C1","text":"By the mid-1970s Maathai held scientific and university roles and participated in women's organizational networks.","sourceIds":["WM-S01","WM-S10"],"claimCeiling":"Supports public role and capability, not a fixed later life plan.","fspInference":false,"revealAtStateId":"M-A"},
        {"claimId":"M-C2","text":"The 1977 Green Belt initiative responded to practical environmental and livelihood concerns reported by rural women.","sourceIds":["WM-S02","WM-S03"],"claimCeiling":"Supports a bounded account of the practical problem; not a complete motive map.","fspInference":false,"revealAtStateId":"M-B"},
        {"claimId":"M-C3","text":"Repeated organizing expanded grassroots capability and the reach of the movement.","sourceIds":["WM-S01","WM-S03"],"claimCeiling":"Capability expansion does not imply ideological convergence or inevitable political development.","fspInference":true,"revealAtStateId":"M-B"},
        {"claimId":"M-C4","text":"Maathai later described environmental protection as becoming inseparable from democratic participation when organizing encountered governance constraints.","sourceIds":["WM-S04","WM-S05"],"claimCeiling":"Later retrospective interpretation does not prove this was the full original 1977 intention.","fspInference":false,"revealAtStateId":"M-C"},
        {"claimId":"M-C5","text":"Maathai later entered electoral politics and eventually gained formal parliamentary and ministerial standing.","sourceIds":["WM-S01","WM-S10"],"claimCeiling":"Later office must not leak backward into early-state interpretation.","fspInference":false,"revealAtStateId":"M-E"},
        {"claimId":"M-C6","text":"Maathai received the Nobel Peace Prize in 2004.","sourceIds":["WM-S11"],"claimCeiling":"Historical recognition does not validate every earlier strategy or create ethical authority for imitation.","fspInference":false,"revealAtStateId":"M-E"}
      ],
      "sources":[
        {"sourceId":"WM-S01","sourceClass":"HISTORICAL_INSTITUTIONAL","label":"Nobel biographical record"},
        {"sourceId":"WM-S02","sourceClass":"PRIMARY_FIRST_PERSON","label":"Nobel lecture, 10 December 2004"},
        {"sourceId":"WM-S03","sourceClass":"HISTORICAL_INSTITUTIONAL","label":"Green Belt Movement history"},
        {"sourceId":"WM-S04","sourceClass":"PRIMARY_FIRST_PERSON","label":"UN Africa Renewal interview, 2004"},
        {"sourceId":"WM-S05","sourceClass":"CONTEMPORARY_DOCUMENT","label":"Amnesty International, 1992"},
        {"sourceId":"WM-S10","sourceClass":"HISTORICAL_INSTITUTIONAL","label":"University of Nairobi Wangari Maathai Institute biography"},
        {"sourceId":"WM-S11","sourceClass":"HISTORICAL_INSTITUTIONAL","label":"Nobel Peace Prize facts / citation"}
      ]
    },
    "portability":{"structuralRelation":"A bounded practical task can sometimes build capability and expose deeper constraints that alter the problem map.","mustNotTravel":["tree planting as a universal tactic","confrontation with authority as a default","persistence as a guarantee of success","historical recognition as ethical validation"],"claimCeiling":"This is a portable structural hypothesis, not a recommendation or prediction."}
  },
  "vr":{
    "canonicalOwner":"FSP-LIVES-IN-TRANSFORMATION-PILOT-1",
    "activeModules":["INTENDED_ACTUAL","AUTHORIZATION_STANDING","INSTITUTIONAL_ROLE","HINDSIGHT_CONTROL"],
    "disabledModules":["TEXT_CONCEPT_DEVELOPMENT","STRATEGY_REVISION"],
    "exitAllowed":true,"lifeNavigationOptional":true,
    "scenes":[
      {"sceneId":"ORIENTATION","label":"Pre-entry orientation","historicalStateId":null,"revealClaimIds":[],"hiddenClaimIds":["M-C1","M-C2","M-C3","M-C4","M-C5","M-C6"],"sourceIds":[],"learnerTask":"Acknowledge that this is a bounded reconstruction, not Wangari Maathai's private experience."},
      {"sceneId":"SITUATED_ENTRY","label":"1976 situated entry","historicalStateId":"M-A","revealClaimIds":["M-C1"],"hiddenClaimIds":["M-C2","M-C3","M-C4","M-C5","M-C6"],"sourceIds":["WM-S01","WM-S10"],"learnerTask":"Identify present capabilities, constraints, affected parties, and live possibilities without later outcomes."},
      {"sceneId":"EVIDENCE_NEED","label":"Evidence and need field","historicalStateId":"M-A","revealClaimIds":["M-C1"],"hiddenClaimIds":["M-C2","M-C3","M-C4","M-C5","M-C6"],"sourceIds":["WM-S01","WM-S10"],"learnerTask":"Separate documented needs from inference."},
      {"sceneId":"BOUNDED_ACTION","label":"Bounded action possibilities","historicalStateId":"M-A","revealClaimIds":["M-C1"],"hiddenClaimIds":["M-C2","M-C3","M-C4","M-C5","M-C6"],"sourceIds":["WM-S01","WM-S10"],"learnerTask":"Compare historically plausible bounded actions without guessing the future."},
      {"sceneId":"HISTORICAL_REVEAL","label":"1977 tree-planting reveal","historicalStateId":"M-B","revealClaimIds":["M-C1","M-C2","M-C3"],"hiddenClaimIds":["M-C4","M-C5","M-C6"],"sourceIds":["WM-S01","WM-S10","WM-S02","WM-S03"],"learnerTask":"Inspect the historical action and its claim ceiling."},
      {"sceneId":"CAPABILITY_GROWTH","label":"Capability growth","historicalStateId":"M-B","revealClaimIds":["M-C1","M-C2","M-C3"],"hiddenClaimIds":["M-C4","M-C5","M-C6"],"sourceIds":["WM-S01","WM-S10","WM-S02","WM-S03"],"learnerTask":"Identify what became newly reachable after repeated organizing."},
      {"sceneId":"RELOCATION","label":"Return as re-location","historicalStateId":"M-B","revealClaimIds":["M-C1","M-C2","M-C3"],"hiddenClaimIds":["M-C4","M-C5","M-C6"],"sourceIds":["WM-S01","WM-S10","WM-S02","WM-S03"],"learnerTask":"Compare the practical field before and after capability expansion."},
      {"sceneId":"GOVERNANCE_CONSTRAINT","label":"Governance constraint appears","historicalStateId":"M-C","revealClaimIds":["M-C1","M-C2","M-C3","M-C4"],"hiddenClaimIds":["M-C5","M-C6"],"sourceIds":["WM-S01","WM-S10","WM-S02","WM-S03","WM-S04","WM-S05"],"learnerTask":"Identify which institutional constraints changed the task."},
      {"sceneId":"PROBLEM_MAP_EXPANSION","label":"Problem-map expansion","historicalStateId":"M-C","revealClaimIds":["M-C1","M-C2","M-C3","M-C4"],"hiddenClaimIds":["M-C5","M-C6"],"sourceIds":["WM-S01","WM-S10","WM-S02","WM-S03","WM-S04","WM-S05"],"learnerTask":"Compare the earlier environmental/livelihood map with the later environmental/governance map."},
      {"sceneId":"PORTABILITY_GATE","label":"Portability gate","historicalStateId":"M-C","revealClaimIds":["M-C1","M-C2","M-C3","M-C4"],"hiddenClaimIds":["M-C5","M-C6"],"sourceIds":["WM-S01","WM-S10","WM-S02","WM-S03","WM-S04","WM-S05"],"learnerTask":"State one structural relation, one contextual difference, one non-portable element, one ceiling, and one reversible test."},
      {"sceneId":"AUTHORIAL_RETURN","label":"Authorial Return","historicalStateId":null,"revealClaimIds":["M-C1","M-C2","M-C3","M-C4"],"hiddenClaimIds":["M-C5","M-C6"],"sourceIds":["WM-S01","WM-S10","WM-S02","WM-S03","WM-S04","WM-S05"],"learnerTask":"Create a learner-authored return artifact without recommendation or personality inference."},
      {"sceneId":"OFF","label":"OFF","historicalStateId":null,"revealClaimIds":[],"hiddenClaimIds":[],"sourceIds":[],"learnerTask":"Exit the immersive scaffold and return to ordinary context."}
    ]
  }
};
