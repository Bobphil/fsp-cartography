export interface XAIFNode {
  nodeID: string;
  type: "L"|"I"|"RA"|"CA"|"MA"|"TA"|"YA";
  text: string;
  timestamp?: string;
}
export interface XAIFEdge {
  edgeID: string;
  fromID: string;
  toID: string;
}
export interface XAIFParticipant {
  participantID: string;
  firstname: string;
  surname: string;
}
export interface XAIFLocution {
  nodeID: string;
  personID: string;
  timestamp?: string;
}
export interface XAIFGraph {
  sourceId: string;
  sourceLabel: string;
  nodes: XAIFNode[];
  edges: XAIFEdge[];
  participants: XAIFParticipant[];
  locutions: XAIFLocution[];
}

export interface ExternalReconstruction {
  sourceId: string;
  informationNodes: string[];
  locutions: string[];
  inferenceRelations: number;
  conflictRelations: number;
  rephraseRelations: number;
  participants: string[];
  preservedByAIF: string[];
  notNativeToAIF: string[];
}

export function reconstructExternalAIF(graph:XAIFGraph):ExternalReconstruction {
  const byType=(type:XAIFNode["type"])=>graph.nodes.filter(n=>n.type===type);
  return {
    sourceId:graph.sourceId,
    informationNodes:byType("I").map(n=>n.text),
    locutions:byType("L").map(n=>n.text),
    inferenceRelations:byType("RA").length,
    conflictRelations:byType("CA").length,
    rephraseRelations:byType("MA").length,
    participants:graph.participants.map(p=>[p.firstname,p.surname].filter(Boolean).join(" ")),
    preservedByAIF:[
      "locution/content distinction",
      "propositional information nodes",
      "argument relation structure",
      "participant attribution"
    ],
    notNativeToAIF:[
      "task-relative claim ceiling",
      "PRF ontology commitments",
      "translation remainder",
      "agency/anti-domination audit",
      "REOPEN condition"
    ]
  };
}

export const externalAifTutorialSample:XAIFGraph={
  sourceId:"arg-tech-aif-tutorial-table-example",
  sourceLabel:"ARG Tech AIF tutorial table-handling example",
  participants:[
    {participantID:"1",firstname:"Bob",surname:""},
    {participantID:"2",firstname:"Worker",surname:""}
  ],
  nodes:[
    {nodeID:"L1",type:"L",text:"Bob: Please, be careful with the table."},
    {nodeID:"L2",type:"L",text:"Worker: Why?"},
    {nodeID:"L3",type:"L",text:"Bob: It has a glass element."},
    {nodeID:"L4",type:"L",text:"Bob: So it could break."},
    {nodeID:"I1",type:"I",text:"The worker should be careful with the table."},
    {nodeID:"I2",type:"I",text:"The table has a glass element."},
    {nodeID:"I3",type:"I",text:"The table could break."},
    {nodeID:"RA1",type:"RA",text:"Inference"}
  ],
  edges:[
    {edgeID:"E1",fromID:"I2",toID:"RA1"},
    {edgeID:"E2",fromID:"RA1",toID:"I3"}
  ],
  locutions:[
    {nodeID:"L1",personID:"1"},
    {nodeID:"L2",personID:"2"},
    {nodeID:"L3",personID:"1"},
    {nodeID:"L4",personID:"1"}
  ]
};

export const externalCorpusRegistry=[
  {
    id:"QT30",
    format:"AIF",
    description:"broadcast debate corpus",
    external:true
  },
  {
    id:"AIFdb2013",
    format:"AIF",
    description:"analysed argument corpus",
    external:true
  }
] as const;
