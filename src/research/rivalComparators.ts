export type FormalismName = "CEA"|"AIF"|"FSP";

export interface FormalismCapabilityProfile {
  name: FormalismName;
  preserves: string[];
  omits: string[];
}

export interface RivalComparatorResult {
  shared: string[];
  uniqueByFormalism: Record<FormalismName,string[]>;
  fspDelta: string[];
}

export const rivalFormalismProfiles:FormalismCapabilityProfile[]=[
  {
    name:"CEA",
    preserves:["claim content","evidence list","action list"],
    omits:["argument relation type","task identity","warrant","background","claim ceiling","ontology","standing","remainder","auxiliary","agency","reopen"]
  },
  {
    name:"AIF",
    preserves:["locution/content distinction","propositional information nodes","argument relation type","participant attribution"],
    omits:["task identity","claim ceiling","PRF ontology","translation remainder","agency audit","reopen condition"]
  },
  {
    name:"FSP",
    preserves:[
      "claim content","evidence list","action list","task identity","warrant","background",
      "claim ceiling","ontology","standing","translation remainder","auxiliary",
      "agency audit","reopen condition"
    ],
    omits:[]
  }
];

export function compareRivalFormalisms(
  profiles:FormalismCapabilityProfile[]=rivalFormalismProfiles
):RivalComparatorResult {
  const allNames:FormalismName[]=["CEA","AIF","FSP"];
  const byName=new Map(profiles.map(p=>[p.name,p]));
  const allPreserved=[...new Set(profiles.flatMap(p=>p.preserves))];
  const shared=allPreserved.filter(item=>
    profiles.every(p=>p.preserves.includes(item))
  );
  const uniqueByFormalism={} as Record<FormalismName,string[]>;
  for(const name of allNames){
    const profile=byName.get(name);
    if(!profile) throw new Error(`Missing formalism profile: ${name}`);
    uniqueByFormalism[name]=profile.preserves.filter(item=>
      profiles.filter(p=>p.name!==name).every(p=>!p.preserves.includes(item))
    );
  }
  const fsp=byName.get("FSP")!;
  const others=profiles.filter(p=>p.name!=="FSP");
  const fspDelta=fsp.preserves.filter(item=>others.every(p=>!p.preserves.includes(item)));
  return {shared,uniqueByFormalism,fspDelta};
}
