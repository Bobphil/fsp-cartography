export interface IndependentCoding {
  coderId: string;
  sourceId: string;
  informationNodes: string[];
  relationTypes: string[];
  participants: string[];
  inferredTask?: string;
  explicitRemainders: string[];
}

export interface CodingAgreement {
  sourceId: string;
  informationOverlap: number;
  relationAgreement: boolean;
  participantAgreement: boolean;
  taskAgreement: boolean;
  remainderAgreement: boolean;
  passesCoreAgreement: boolean;
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}

function overlapRatio(left:string[],right:string[]):number{
  const a=canonical(left);
  const b=canonical(right);
  if(a.length===0 && b.length===0) return 1;
  const intersection=a.filter(x=>b.includes(x)).length;
  const union=new Set([...a,...b]).size;
  return union===0?1:intersection/union;
}

function same(left:string[],right:string[]):boolean{
  const a=canonical(left);
  const b=canonical(right);
  return a.length===b.length && a.every((v,i)=>v===b[i]);
}

export function compareIndependentCodings(
  left:IndependentCoding,
  right:IndependentCoding
):CodingAgreement{
  if(left.sourceId!==right.sourceId) throw new Error("Source mismatch");
  const informationOverlap=overlapRatio(left.informationNodes,right.informationNodes);
  const relationAgreement=same(left.relationTypes,right.relationTypes);
  const participantAgreement=same(left.participants,right.participants);
  const taskAgreement=(left.inferredTask??"")===(right.inferredTask??"");
  const remainderAgreement=same(left.explicitRemainders,right.explicitRemainders);

  return {
    sourceId:left.sourceId,
    informationOverlap,
    relationAgreement,
    participantAgreement,
    taskAgreement,
    remainderAgreement,
    passesCoreAgreement:
      informationOverlap>=0.66 &&
      relationAgreement &&
      participantAgreement
  };
}

export const externalSampleCoderA:IndependentCoding={
  coderId:"A",
  sourceId:"arg-tech-aif-tutorial-table-example",
  informationNodes:[
    "The worker should be careful with the table.",
    "The table has a glass element.",
    "The table could break."
  ],
  relationTypes:["Inference"],
  participants:["Bob","Worker"],
  inferredTask:"avoid damage while handling the table",
  explicitRemainders:["worker's full reasons remain unknown"]
};

export const externalSampleCoderB:IndependentCoding={
  coderId:"B",
  sourceId:"arg-tech-aif-tutorial-table-example",
  informationNodes:[
    "The table has a glass element.",
    "The table could break.",
    "The worker should be careful with the table."
  ],
  relationTypes:["Inference"],
  participants:["Worker","Bob"],
  inferredTask:"avoid damage while handling the table",
  explicitRemainders:["worker's full reasons remain unknown"]
};
