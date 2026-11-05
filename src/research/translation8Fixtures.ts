import { RawAIFSubgraph, FSPNodeAugmentation } from "./translation8";

export const kosciuszkoRaw:RawAIFSubgraph={
  corpusId:"kosciuszko00219",
  sourceRepository:"arg-tech/ACH-ArgNav",
  sourcePath:"uploaded_data/FFkosciuszko00219.json",
  sourceNodeCount:1195,
  sourceEdgeCount:1383,
  nodes:[
    {nodeID:"610172",text:"it is likely that Target B (MANGUNSONG) presents a threat of committing an act of terrorism in Philippines",type:"I",timestamp:"2020-12-13 14:38:45"},
    {nodeID:"610185",text:"it is unlikely that Target B (MANGUNSONG) presents a threat of committing an act of terrorism in Philippines, based on intelligence available",type:"I",timestamp:"2020-12-13 14:38:50"},
    {nodeID:"610187",text:"Default Conflict",type:"CA",timestamp:"2020-12-13 14:38:51"}
  ],
  edges:[
    {edgeID:"789982",fromID:"610172",toID:"610187",formEdgeID:null},
    {edgeID:"789983",fromID:"610187",toID:"610185",formEdgeID:null}
  ]
};

export const otwayRaw:RawAIFSubgraph={
  corpusId:"otway00219",
  sourceRepository:"arg-tech/AMF_Scheme_Classifier2",
  sourcePath:"data/corpespotway.json",
  sourceNodeCount:739,
  sourceEdgeCount:784,
  nodes:[
    {nodeID:"1196468_164813044708340528",text:"Shane Jeffries is not likely considering involvement in corporate espionage against Ultimate Audio",type:"I"},
    {nodeID:"1196586_164813044708340528",text:"there is an even chance (49%) that Shane Jeffries is involved in corporate espionage",type:"I"},
    {nodeID:"1201647_164813044708340528",text:"Default Inference",type:"RA"},
    {nodeID:"1201649_164813044708340528",text:"Arguing",type:"YA"}
  ],
  edges:[
    {edgeID:"773",fromID:"1201647_164813044708340528",toID:"1196586_164813044708340528"},
    {edgeID:"776",fromID:"1196468_164813044708340528",toID:"1201647_164813044708340528"},
    {edgeID:"778",fromID:"1201649_164813044708340528",toID:"1201647_164813044708340528"}
  ]
};

export const kosciuszkoAugmentations:FSPNodeAugmentation[]=[
  {
    corpusId:"kosciuszko00219",
    nodeID:"610172",
    task:"assess a threat claim under conflicting intelligence",
    claimCeiling:"supports one threat assessment claim; does not settle the full intelligence picture",
    standing:["analyst-produced proposition"],
    remainder:["source reliability and omitted intelligence remain outside this bounded subgraph"],
    auxiliary:["likelihood language depends on background intelligence assessment"],
    reopenCondition:"reopen if new intelligence changes the threat assessment"
  },
  {
    corpusId:"kosciuszko00219",
    nodeID:"610185",
    task:"assess a threat claim under conflicting intelligence",
    claimCeiling:"supports the contrary threat assessment claim; does not resolve the conflict by itself",
    standing:["analyst-produced proposition"],
    remainder:["basis for the contrary likelihood judgment is not fully represented here"],
    auxiliary:["based on intelligence available"],
    reopenCondition:"reopen if source weighting or intelligence availability changes"
  }
];

export const otwayAugmentations:FSPNodeAugmentation[]=[
  {
    corpusId:"otway00219",
    nodeID:"1196468_164813044708340528",
    task:"assess competing corporate-espionage hypotheses",
    claimCeiling:"supports a bounded hypothesis assessment; does not establish innocence",
    standing:["information node in external argument graph"],
    remainder:["supporting evidence beyond the imported connected subgraph remains external"],
    auxiliary:["hypothesis interpretation depends on source and scheme context"],
    reopenCondition:"reopen when linked evidence or scheme classification changes"
  },
  {
    corpusId:"otway00219",
    nodeID:"1196586_164813044708340528",
    task:"assess competing corporate-espionage hypotheses",
    claimCeiling:"supports an even-chance assessment only within the represented argument context",
    standing:["information node in external argument graph"],
    remainder:["probability calibration and source provenance are not recoverable from this subgraph alone"],
    auxiliary:["49 percent expression is treated as a stated assessment, not an independently verified probability"],
    reopenCondition:"reopen when probability basis or evidence set changes"
  }
];
