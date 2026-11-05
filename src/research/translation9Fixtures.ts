import { BatchNodeset, AugmentationCodingSample } from "./translation9";
import { importRawAIF } from "./translation8";
import {
  kosciuszkoAugmentations,
  otwayAugmentations
} from "./translation8Fixtures";

const ns=(nodesetId:string,raw:any,augmentations:any[]):BatchNodeset=>({
  nodesetId,
  imported:importRawAIF(raw,augmentations)
});

export const batchNodesets:BatchNodeset[]=[
  ns("kos-ca-610187",{
    corpusId:"kosciuszko00219",sourceRepository:"arg-tech/ACH-ArgNav",
    sourcePath:"uploaded_data/FFkosciuszko00219.json",sourceNodeCount:1195,sourceEdgeCount:1383,
    nodes:[
      {nodeID:"610172",type:"I",text:"it is likely that Target B (MANGUNSONG) presents a threat of committing an act of terrorism in Philippines"},
      {nodeID:"610185",type:"I",text:"it is unlikely that Target B (MANGUNSONG) presents a threat of committing an act of terrorism in Philippines, based on intelligence available"},
      {nodeID:"610187",type:"CA",text:"Default Conflict"}
    ],
    edges:[
      {edgeID:"789982",fromID:"610172",toID:"610187"},
      {edgeID:"789983",fromID:"610187",toID:"610185"}
    ]
  },kosciuszkoAugmentations),

  ns("kos-ca-610198",{
    corpusId:"kosciuszko00219",sourceRepository:"arg-tech/ACH-ArgNav",
    sourcePath:"uploaded_data/FFkosciuszko00219.json",sourceNodeCount:1195,sourceEdgeCount:1383,
    nodes:[
      {nodeID:"610175",type:"I",text:"it is unlikely that Target A (AIZAD) was about to commit an act of terrorism"},
      {nodeID:"610196",type:"I",text:"it is highly likely that Target A (AIZAD) was about to commit an act of terrorism"},
      {nodeID:"610198",type:"CA",text:"Default Conflict"}
    ],
    edges:[
      {edgeID:"789996",fromID:"610175",toID:"610198"},
      {edgeID:"789997",fromID:"610198",toID:"610196"}
    ]
  },[
    {corpusId:"kosciuszko00219",nodeID:"610175",task:"compare conflicting threat assessments",claimCeiling:"supports the lower-threat proposition only",standing:["external information node"],remainder:["supporting intelligence omitted"],reopenCondition:"reopen if intelligence weighting changes"},
    {corpusId:"kosciuszko00219",nodeID:"610196",task:"compare conflicting threat assessments",claimCeiling:"supports the higher-threat proposition only",standing:["external information node"],remainder:["supporting intelligence omitted"],reopenCondition:"reopen if intelligence weighting changes"}
  ]),

  ns("kos-ra-610206",{
    corpusId:"kosciuszko00219",sourceRepository:"arg-tech/ACH-ArgNav",
    sourcePath:"uploaded_data/FFkosciuszko00219.json",sourceNodeCount:1195,sourceEdgeCount:1383,
    nodes:[
      {nodeID:"610196",type:"I",text:"it is highly likely that Target A (AIZAD) was about to commit an act of terrorism"},
      {nodeID:"610203",type:"I",text:"Target A (AIZAD) remains an ongoing security risk to the region of Southern Philippines"},
      {nodeID:"610206",type:"RA",text:"Default Inference"},
      {nodeID:"610230",type:"YA",text:"Arguing"}
    ],
    edges:[
      {edgeID:"790006",fromID:"610196",toID:"610206"},
      {edgeID:"790007",fromID:"610206",toID:"610203"},
      {edgeID:"790037",fromID:"610230",toID:"610206"}
    ]
  },[
    {corpusId:"kosciuszko00219",nodeID:"610196",task:"evaluate inference from threat assessment to ongoing security risk",claimCeiling:"does not by itself establish ongoing regional risk",standing:["premise information node"],remainder:["inference warrants not explicit in bounded subgraph"],reopenCondition:"reopen if inference support changes"},
    {corpusId:"kosciuszko00219",nodeID:"610203",task:"evaluate inference from threat assessment to ongoing security risk",claimCeiling:"conclusion is bounded to represented argument",standing:["conclusion information node"],remainder:["broader regional evidence omitted"],reopenCondition:"reopen if regional evidence changes"}
  ]),

  ns("ot-ra-1201647",{
    corpusId:"otway00219",sourceRepository:"arg-tech/AMF_Scheme_Classifier2",
    sourcePath:"data/corpespotway.json",sourceNodeCount:739,sourceEdgeCount:784,
    nodes:[
      {nodeID:"1196468_164813044708340528",type:"I",text:"Shane Jeffries is not likely considering involvement in corporate espionage against Ultimate Audio"},
      {nodeID:"1196586_164813044708340528",type:"I",text:"there is an even chance (49%) that Shane Jeffries is involved in corporate espionage"},
      {nodeID:"1201647_164813044708340528",type:"RA",text:"Default Inference"},
      {nodeID:"1201649_164813044708340528",type:"YA",text:"Arguing"}
    ],
    edges:[
      {edgeID:"773",fromID:"1201647_164813044708340528",toID:"1196586_164813044708340528"},
      {edgeID:"776",fromID:"1196468_164813044708340528",toID:"1201647_164813044708340528"},
      {edgeID:"778",fromID:"1201649_164813044708340528",toID:"1201647_164813044708340528"}
    ]
  },otwayAugmentations),

  ns("ot-ra-599075",{
    corpusId:"otway00219",sourceRepository:"arg-tech/AMF_Scheme_Classifier2",
    sourcePath:"data/corpespotway.json",sourceNodeCount:739,sourceEdgeCount:784,
    nodes:[
      {nodeID:"598686_164813044708340528",type:"I",text:"It is possible that Shane Jeffries is planning a startup, and any theft of material is not intended for Queen Tech, but for his own startup"},
      {nodeID:"598740_164813044708340528",type:"I",text:"This could indicate he is attempting to secure funds for the purpose or starting a business"},
      {nodeID:"599075_164813044708340528",type:"RA",text:"Default Inference"},
      {nodeID:"599077_164813044708340528",type:"YA",text:"Arguing"}
    ],
    edges:[
      {edgeID:"689",fromID:"599075_164813044708340528",toID:"598686_164813044708340528"},
      {edgeID:"692",fromID:"598740_164813044708340528",toID:"599075_164813044708340528"},
      {edgeID:"694",fromID:"599077_164813044708340528",toID:"599075_164813044708340528"}
    ]
  },[
    {corpusId:"otway00219",nodeID:"598686_164813044708340528",task:"compare alternative explanations of suspected conduct",claimCeiling:"possible startup explanation only",standing:["alternative-hypothesis information node"],remainder:["supporting evidence outside nodeset"],reopenCondition:"reopen if alternative hypothesis evidence changes"},
    {corpusId:"otway00219",nodeID:"598740_164813044708340528",task:"compare alternative explanations of suspected conduct",claimCeiling:"supports a funding-related interpretation only",standing:["supporting information node"],remainder:["context beyond bounded nodeset omitted"],reopenCondition:"reopen if financial evidence changes"}
  ]),

  ns("ot-ra-599081",{
    corpusId:"otway00219",sourceRepository:"arg-tech/AMF_Scheme_Classifier2",
    sourcePath:"data/corpespotway.json",sourceNodeCount:739,sourceEdgeCount:784,
    nodes:[
      {nodeID:"598436_164813044708340528",type:"I",text:"Shane Jeffries is not likely considering involvement in corporate espionage against Ultimate Audio"},
      {nodeID:"598462_164813044708340528",type:"I",text:"it is recommended an attempt is made to safely retain Shane Jeffries as a productive employee"},
      {nodeID:"599081_164813044708340528",type:"RA",text:"Default Inference"},
      {nodeID:"599083_164813044708340528",type:"YA",text:"Arguing"}
    ],
    edges:[
      {edgeID:"701",fromID:"599081_164813044708340528",toID:"598436_164813044708340528"},
      {edgeID:"704",fromID:"598462_164813044708340528",toID:"599081_164813044708340528"},
      {edgeID:"706",fromID:"599083_164813044708340528",toID:"599081_164813044708340528"}
    ]
  },[
    {corpusId:"otway00219",nodeID:"598436_164813044708340528",task:"audit transition from assessment to recommendation",claimCeiling:"does not itself authorize employment action",standing:["assessment information node"],remainder:["recommendation warrant omitted"],reopenCondition:"reopen if assessment changes"},
    {corpusId:"otway00219",nodeID:"598462_164813044708340528",task:"audit transition from assessment to recommendation",claimCeiling:"recommendation remains distinct from authorization",standing:["recommendation information node"],remainder:["decision authority not represented"],reopenCondition:"reopen if employment context changes"}
  ])
];

export const sampleCodingA:AugmentationCodingSample={
  coderId:"A",nodesetId:"ot-ra-599081",
  augmentations:batchNodesets.find(x=>x.nodesetId==="ot-ra-599081")!.imported.augmentations
};

export const sampleCodingB:AugmentationCodingSample={
  coderId:"B",nodesetId:"ot-ra-599081",
  augmentations:[
    {corpusId:"otway00219",nodeID:"598436_164813044708340528",task:"audit transition from assessment to recommendation",claimCeiling:"does not itself authorize employment action",standing:["assessment information node"],remainder:["recommendation warrant omitted"],reopenCondition:"reopen if assessment changes"},
    {corpusId:"otway00219",nodeID:"598462_164813044708340528",task:"audit transition from assessment to recommendation",claimCeiling:"recommendation remains distinct from authorization",standing:["recommendation information node"],remainder:["decision authority not represented"],reopenCondition:"reopen if employment context changes"}
  ]
};
