window.FSP_MAATHAI_FIELD_1={
"scene":{
"sceneId":"MAATHAI-1976-FIELD-A",
"label":"Maathai circa 1976 — situated possibility field",
"loci":[
{"id":"M","label":"Wangari Maathai","x":0,"y":0,"roles":["scientist","university academic","women's organization participant"],"provenance":[{"sourceId":"WM-S01","sourceClass":"HISTORICAL_SYNTHESIS"}],"navigationalReconstruction":false},
{"id":"UON","label":"University of Nairobi","x":-0.72,"y":-0.12,"roles":["employer","research institution"],"provenance":[{"sourceId":"WM-S01","sourceClass":"HISTORICAL_SYNTHESIS"}],"navigationalReconstruction":true},
{"id":"NCWK","label":"National Council of Women of Kenya","x":0.68,"y":-0.16,"roles":["women's organizational network"],"provenance":[{"sourceId":"WM-S01","sourceClass":"HISTORICAL_SYNTHESIS"}],"navigationalReconstruction":true},
{"id":"RW","label":"Rural women reporting livelihood pressures","x":0.68,"y":0.58,"roles":["affected parties","knowledge source"],"provenance":[{"sourceId":"WM-S02","sourceClass":"LATER_MEMORY"}],"navigationalReconstruction":true},
{"id":"SCI","label":"Biological / scientific expertise","x":-0.62,"y":0.52,"roles":["capability resource"],"provenance":[{"sourceId":"WM-S01","sourceClass":"HISTORICAL_SYNTHESIS"}],"navigationalReconstruction":true},
{"id":"STATE","label":"Kenyan state / political institutions","x":0.06,"y":-0.76,"roles":["public authority field"],"provenance":[{"sourceId":"NAV-STATE","sourceClass":"NAVIGATIONAL_RECONSTRUCTION"}],"navigationalReconstruction":true},
{"id":"FUTURE","label":"Later Green Belt / political / global outcomes","x":0,"y":1.1,"roles":["hidden future"],"provenance":[],"navigationalReconstruction":true}
],
"paths":[
{"id":"P-RESEARCH","label":"Investigate environmental conditions","family":"KNOW_LEARN","state":"OPEN","provenance":[{"sourceId":"FSP-PATH-RESEARCH","sourceClass":"FSP_INFERENCE"}]},
{"id":"P-TEACH","label":"Teach / communicate environmental knowledge","family":"COMMUNICATE","state":"OPEN","provenance":[{"sourceId":"FSP-PATH-TEACH","sourceClass":"FSP_INFERENCE"}]},
{"id":"P-WAIT","label":"Wait / gather more evidence","family":"WAIT_GATHER","state":"OPEN","provenance":[{"sourceId":"FSP-PATH-WAIT","sourceClass":"FSP_INFERENCE"}]},
{"id":"P-ORGANIZE","label":"Organize through women's networks","family":"ORGANIZE","state":"OPEN","provenance":[{"sourceId":"FSP-PATH-ORGANIZE","sourceClass":"FSP_INFERENCE"}]},
{"id":"P-EXPERIMENT","label":"Try a bounded practical intervention","family":"EXPERIMENT","state":"CONDITIONAL","provenance":[{"sourceId":"FSP-PATH-EXPERIMENT","sourceClass":"FSP_INFERENCE"}]},
{"id":"P-REQUEST","label":"Seek institutional support","family":"REQUEST","state":"CONDITIONAL","provenance":[{"sourceId":"FSP-PATH-REQUEST","sourceClass":"FSP_INFERENCE"}]},
{"id":"P-ADVOCATE","label":"Publicly advocate for change","family":"ADVOCATE","state":"CONDITIONAL","provenance":[{"sourceId":"FSP-PATH-ADVOCATE","sourceClass":"FSP_INFERENCE"}]}
],
"gates":[{"id":"G1","label":"Formal state authority required for direct policy control","state":"NO_AUTHORITY","requiredByPathIds":["P-REQUEST","P-ADVOCATE"]}],
"remainders":[
{"id":"REM1","label":"Private motive unavailable","type":"UNKNOWN_MOTIVE","explanation":"The scene does not claim access to Maathai's complete private motives in 1976."},
{"id":"REM2","label":"Gender / political context requires enrichment","type":"MISSING_SOURCE","explanation":"This remains incompletely sourced rather than filled with plausible narrative."},
{"id":"REM3","label":"Later political meaning not yet available","type":"UNOBSERVED_CONSEQUENCE","explanation":"Later environmental-democratic significance remains outside the current horizon."}
],
"institutions":[]
},
"projection":{
"timeRings":[
{"depth":0,"label":"NOW / PRESENT FIELD","radius":0},
{"depth":1,"label":"reachable with present capabilities","radius":150},
{"depth":2,"label":"requires capability or relationship development","radius":245},
{"depth":3,"label":"requires institutional mediation","radius":340},
{"depth":4,"label":"requires substantial structural change","radius":430}
],
"temporalLens":[
{"mode":"FREEZE","maxDepth":1,"label":"Freeze","purpose":"Hold the historical present and maximize close inspection of relations, evidence, constraints, and gate prerequisites.","decomposition":"MAXIMUM"},
{"mode":"SLOW","maxDepth":2,"label":"Slow","purpose":"Expose near-term capability and relationship development without collapsing uncertainty.","decomposition":"STRONG"},
{"mode":"NORMAL","maxDepth":3,"label":"Normal","purpose":"Expose the middle field where institutional mediation and authorization dependencies become visible.","decomposition":"BALANCED"},
{"mode":"ACCELERATE","maxDepth":4,"label":"Accelerate","purpose":"Expose structurally distant possibilities together with the larger contingency stack required to make them present.","decomposition":"CONTINGENCY_STACK"}
],
"pathProjection":[
{"pathId":"P-RESEARCH","temporalDepth":1,"distanceMeaning":"Can be attempted using capabilities substantially already present.","requirements":[{"label":"Scientific expertise","status":"PRESENT","explanation":"Documented scientific and academic capability is already present."},{"label":"Time and observational access","status":"PARTIAL","explanation":"Investigation requires time and access to environmental observations."}]},
{"pathId":"P-TEACH","temporalDepth":1,"distanceMeaning":"Can be attempted through existing academic and communication roles.","requirements":[{"label":"Scientific expertise","status":"PRESENT","explanation":"Scientific training is already present."},{"label":"Audience / teaching channel","status":"PRESENT","explanation":"University role supplies an existing communication setting."}]},
{"pathId":"P-WAIT","temporalDepth":1,"distanceMeaning":"Preserves inquiry and non-action as a live option.","requirements":[{"label":"Time","status":"PRESENT","explanation":"Waiting or gathering more information is already possible."}]},
{"pathId":"P-ORGANIZE","temporalDepth":2,"distanceMeaning":"Requires activating relationships and coordinating people over time.","requirements":[{"label":"Women's organizational access","status":"PRESENT","explanation":"NCWK participation provides an organizational connection."},{"label":"Coordination time","status":"PARTIAL","explanation":"Repeated organizing requires sustained time and coordination."},{"label":"Participant relationships","status":"PARTIAL","explanation":"Broader participation must still be built."}]},
{"pathId":"P-EXPERIMENT","temporalDepth":2,"distanceMeaning":"Requires combining existing knowledge with participants, materials, and coordination.","requirements":[{"label":"Scientific knowledge","status":"PRESENT","explanation":"Existing training supports investigation and intervention design."},{"label":"Organizational access","status":"PRESENT","explanation":"Women's organizational participation supplies a possible route."},{"label":"Participants","status":"PARTIAL","explanation":"A practical intervention requires willing participants."},{"label":"Materials / local resources","status":"UNKNOWN","explanation":"The scene does not yet establish the material conditions of a specific intervention."}]},
{"pathId":"P-REQUEST","temporalDepth":3,"distanceMeaning":"Requires institutional recognition and a workable channel into formal authority.","requirements":[{"label":"Public communication","status":"PRESENT","explanation":"Academic and organizational roles support public communication."},{"label":"Institutional access","status":"PARTIAL","explanation":"The scene does not establish a reliable policy channel."},{"label":"Recognized state role","status":"ABSENT","explanation":"No formal state role is represented in 1976."},{"label":"Policy jurisdiction","status":"ABSENT","explanation":"Scientific expertise does not supply policy jurisdiction."}]},
{"pathId":"P-ADVOCATE","temporalDepth":4,"distanceMeaning":"Requires public standing, coalition support, and political conditions beyond those presently secured.","requirements":[{"label":"Public voice","status":"PRESENT","explanation":"Academic and organizational standing provide some public voice."},{"label":"Organizational support","status":"PARTIAL","explanation":"Existing network access does not guarantee a coalition."},{"label":"Broader coalition","status":"ABSENT","explanation":"The scene does not yet show a broad advocacy coalition."},{"label":"Formal political authority","status":"ABSENT","explanation":"The 1976 field does not represent formal state authority."},{"label":"Political opportunity structure","status":"UNKNOWN","explanation":"The current source set is not rich enough to encode the full political opportunity field."}]}
],
"horizonLabel":"Later Green Belt, political, parliamentary, and global outcomes remain beyond the present horizon."
}};