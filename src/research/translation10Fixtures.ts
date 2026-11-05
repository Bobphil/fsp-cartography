import { RawAIFDocument } from "./translation10";

export const kosciuszkoRawDocument:RawAIFDocument={
  corpusId:"kosciuszko00219",
  sourceRepository:"arg-tech/ACH-ArgNav",
  sourcePath:"uploaded_data/FFkosciuszko00219.json",
  nodes:[
    {nodeID:"610172",type:"I",text:"it is likely that Target B (MANGUNSONG) presents a threat of committing an act of terrorism in Philippines"},
    {nodeID:"610185",type:"I",text:"it is unlikely that Target B (MANGUNSONG) presents a threat of committing an act of terrorism in Philippines, based on intelligence available"},
    {nodeID:"610187",type:"CA",text:"Default Conflict"},
    {nodeID:"610196",type:"I",text:"it is highly likely that Target A (AIZAD) was about to commit an act of terrorism"},
    {nodeID:"610203",type:"I",text:"Target A (AIZAD) remains an ongoing security risk to the region of Southern Philippines"},
    {nodeID:"610206",type:"RA",text:"Default Inference"},
    {nodeID:"610230",type:"YA",text:"Arguing"},
    {nodeID:"610433",type:"I",text:"the photos found on Target A's phone are consistent with one known migration route"},
    {nodeID:"610454",type:"MA",text:"Default Rephrase"},
    {nodeID:"610456",type:"YA",text:"Restating"}
  ],
  edges:[
    {edgeID:"789982",fromID:"610172",toID:"610187"},
    {edgeID:"789983",fromID:"610187",toID:"610185"},
    {edgeID:"790006",fromID:"610196",toID:"610206"},
    {edgeID:"790007",fromID:"610206",toID:"610203"},
    {edgeID:"790037",fromID:"610230",toID:"610206"},
    {edgeID:"790254",fromID:"610433",toID:"610454"},
    {edgeID:"790255",fromID:"610454",toID:"610433"},
    {edgeID:"790259",fromID:"610456",toID:"610454"}
  ]
};

export const otwayRawDocument:RawAIFDocument={
  corpusId:"otway00219",
  sourceRepository:"arg-tech/AMF_Scheme_Classifier2",
  sourcePath:"data/corpespotway.json",
  nodes:[
    {nodeID:"1196468_164813044708340528",type:"I",text:"Shane Jeffries is not likely considering involvement in corporate espionage against Ultimate Audio"},
    {nodeID:"1196586_164813044708340528",type:"I",text:"there is an even chance (49%) that Shane Jeffries is involved in corporate espionage"},
    {nodeID:"1201647_164813044708340528",type:"RA",text:"Default Inference"},
    {nodeID:"1201649_164813044708340528",type:"YA",text:"Arguing"},
    {nodeID:"1021_164813044708340528",type:"I",text:"Jeffries and Diaz are a dual income couple with no children"},
    {nodeID:"1006_164813044708340528",type:"I",text:"It is possible that a recent high value purchase indicates employee behaviour consistent with corporate espionage"},
    {nodeID:"1032_164813044708340528",type:"CA",text:"Default Conflict"},
    {nodeID:"1034_164813044708340528",type:"YA",text:"Disagreeing"},
    {nodeID:"696_164813044708340528",type:"I",text:"His seating position increases the ability of Shane Jeffries to secretly remove printed documents from the lab"},
    {nodeID:"662_164813044708340528",type:"I",text:"It is likely Shane Jeffries had the capability to remove secret corporate information from the lab at Ultimate Audio"},
    {nodeID:"702_164813044708340528",type:"MA",text:"Default Rephrase"},
    {nodeID:"704_164813044708340528",type:"YA",text:"Restating"}
  ],
  edges:[
    {edgeID:"773",fromID:"1201647_164813044708340528",toID:"1196586_164813044708340528"},
    {edgeID:"776",fromID:"1196468_164813044708340528",toID:"1201647_164813044708340528"},
    {edgeID:"778",fromID:"1201649_164813044708340528",toID:"1201647_164813044708340528"},
    {edgeID:"623",fromID:"1021_164813044708340528",toID:"1032_164813044708340528"},
    {edgeID:"624",fromID:"1032_164813044708340528",toID:"1006_164813044708340528"},
    {edgeID:"626",fromID:"1034_164813044708340528",toID:"1032_164813044708340528"},
    {edgeID:"443",fromID:"696_164813044708340528",toID:"702_164813044708340528"},
    {edgeID:"444",fromID:"702_164813044708340528",toID:"662_164813044708340528"},
    {edgeID:"446",fromID:"704_164813044708340528",toID:"702_164813044708340528"}
  ]
};
