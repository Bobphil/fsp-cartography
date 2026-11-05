export type ConstitutionalCommitmentKind =
  | "PRIMITIVE"
  | "FIREWALL"
  | "PROTECTED_FLOOR"
  | "GOVERNANCE_RULE"
  | "EXCEPTION_RULE"
  | "CLAIM_CEILING";

export type CommitmentStatus =
  | "ACTIVE"
  | "PROVISIONALLY_FROZEN"
  | "UNDER_REVIEW"
  | "REOPENED"
  | "SUPERSEDED";

export interface ConstitutionalCommitment {
  commitmentId:string;
  kind:ConstitutionalCommitmentKind;
  statement:string;
  introducedBy:string;
  status:CommitmentStatus;
  provenanceVisible:boolean;
  challengeable:boolean;
  reopenConditions:string[];
  exceptionIds:string[];
}

export interface ConstitutionalSelfAudit {
  commitments:string[];
  missingProvenance:string[];
  unchallengeableCommitments:string[];
  missingReopenConditions:string[];
  exceptionBearingCommitments:string[];
  selfAuditPass:boolean;
  constitutionalStatusDoesNotAuthorizeTruth:true;
}

export interface ExceptionNormalizationRecord {
  exceptionId:string;
  originalRuleId:string;
  temporaryStatement:string;
  currentStatement:string;
  sunsetPassed:boolean;
  independentReauthorization:boolean;
  newEvidenceReviewed:boolean;
  restorationCompleted:boolean;
  encodedAsDefault:boolean;
}

export type RatchetStatus =
  | "NO_RATCHET"
  | "RATCHET_RISK"
  | "EXCEPTION_NORMALIZED_WITHOUT_REAUTHORIZATION"
  | "LEGITIMATELY_AMENDED_NORMAL_RULE";

export interface ExceptionRatchetAudit {
  exceptionId:string;
  status:RatchetStatus;
  reasons:string[];
  persistenceAuthorizesNormalization:false;
}

export interface GovernanceLayer {
  layerId:string;
  name:string;
  governs:string[];
  governedBy:string[];
  canAuditLowerLayers:boolean;
  canBeAuditedByHigherLayers:boolean;
  canAuditItself:boolean;
}

export interface GovernanceReflexivityAudit {
  layerIds:string[];
  orphanLayers:string[];
  selfSealingLayers:string[];
  reflexiveLayers:string[];
  infiniteRegressClaim:false;
  reflexivityPass:boolean;
  note:string;
}

export interface FSPObjectChallenge {
  challengeId:string;
  targetCommitmentId:string;
  challengerIds:string[];
  evidenceIds:string[];
  reasons:string[];
  proposedRevision:string;
  standingAdequate:boolean;
  provenanceVisible:boolean;
  counterargumentsPreserved:boolean;
  claimCeiling:string;
}

export type FSPReopenStatus =
  | "REOPEN"
  | "REOPEN_WITH_CONSTRAINTS"
  | "BLOCKED_STANDING"
  | "BLOCKED_PROVENANCE"
  | "BLOCKED_NO_EVIDENCE"
  | "BLOCKED_TARGET_UNCHALLENGEABLE";

export interface FSPObjectReopenAudit {
  challengeId:string;
  targetCommitmentId:string;
  status:FSPReopenStatus;
  reasons:string[];
  reopeningInvalidatesAllFSP:false;
  currentCommitmentRemainsOperativeUntilRevision:false|true;
}

export interface RevisionModuleRecord {
  moduleId:string;
  ordinal:number;
  dependsOn:string[];
  testsPassed:boolean;
  browserBuildPassed:boolean;
  claimCeilingPresent:boolean;
  humanEvidenceStatus:"PASS"|"FAIL"|"PENDING"|"NOT_APPLICABLE";
}

export interface RevisionProgramFreezeAudit {
  modules:string[];
  missingModules:string[];
  dependencyFailures:string[];
  regressionFailures:string[];
  missingClaimCeilings:string[];
  humanEvidencePending:string[];
  integrationPass:boolean;
  freezeStatus:
    | "FREEZE_AS_PROVISIONAL_RESEARCH_BASE"
    | "DO_NOT_FREEZE";
  freezeMeansFinalTruth:false;
  futureReopenRequired:true;
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}

export function auditConstitutionalSelf(
  commitments:ConstitutionalCommitment[]
):ConstitutionalSelfAudit{
  const missingProvenance=canonical(
    commitments.filter(c=>!c.provenanceVisible).map(c=>c.commitmentId)
  );
  const unchallengeableCommitments=canonical(
    commitments.filter(c=>!c.challengeable).map(c=>c.commitmentId)
  );
  const missingReopenConditions=canonical(
    commitments.filter(c=>c.challengeable && c.reopenConditions.length===0).map(c=>c.commitmentId)
  );
  const exceptionBearingCommitments=canonical(
    commitments.filter(c=>c.exceptionIds.length>0).map(c=>c.commitmentId)
  );

  return {
    commitments:canonical(commitments.map(c=>c.commitmentId)),
    missingProvenance,
    unchallengeableCommitments,
    missingReopenConditions,
    exceptionBearingCommitments,
    selfAuditPass:
      missingProvenance.length===0 &&
      unchallengeableCommitments.length===0 &&
      missingReopenConditions.length===0,
    constitutionalStatusDoesNotAuthorizeTruth:true
  };
}

export function auditExceptionRatchet(
  record:ExceptionNormalizationRecord
):ExceptionRatchetAudit{
  const reasons:string[]=[];
  let status:RatchetStatus="NO_RATCHET";

  const changedDefault=
    record.encodedAsDefault &&
    record.currentStatement.trim()===record.temporaryStatement.trim();

  if(changedDefault &&
     !record.independentReauthorization &&
     !record.newEvidenceReviewed){
    status="EXCEPTION_NORMALIZED_WITHOUT_REAUTHORIZATION";
    reasons.push("temporary exception has become the default without independent reauthorization or new evidence");
  } else if(changedDefault &&
            (!record.restorationCompleted || !record.sunsetPassed)){
    status="RATCHET_RISK";
    reasons.push("temporary exception is encoded as default before restoration/sunset conditions are cleanly closed");
  } else if(changedDefault &&
            record.independentReauthorization &&
            record.newEvidenceReviewed &&
            record.sunsetPassed){
    status="LEGITIMATELY_AMENDED_NORMAL_RULE";
    reasons.push("normal rule changed through explicit reauthorization and new evidence rather than emergency persistence");
  } else {
    reasons.push("temporary exception has not silently become the normal rule");
  }

  return {
    exceptionId:record.exceptionId,
    status,
    reasons,
    persistenceAuthorizesNormalization:false
  };
}

export function auditGovernanceReflexivity(
  layers:GovernanceLayer[]
):GovernanceReflexivityAudit{
  const ids=new Set(layers.map(l=>l.layerId));
  const orphanLayers=canonical(
    layers
      .filter(l=>l.governedBy.some(id=>!ids.has(id)) || l.governs.some(id=>!ids.has(id)))
      .map(l=>l.layerId)
  );

  const selfSealingLayers=canonical(
    layers
      .filter(l=>
        !l.canAuditItself &&
        !l.canBeAuditedByHigherLayers &&
        l.governedBy.length===0
      )
      .map(l=>l.layerId)
  );

  const reflexiveLayers=canonical(
    layers
      .filter(l=>l.canAuditItself || l.canBeAuditedByHigherLayers)
      .map(l=>l.layerId)
  );

  return {
    layerIds:canonical(layers.map(l=>l.layerId)),
    orphanLayers,
    selfSealingLayers,
    reflexiveLayers,
    infiniteRegressClaim:false,
    reflexivityPass:
      orphanLayers.length===0 &&
      selfSealingLayers.length===0,
    note:
      "Reflexive governance requires revisability and cross-audit, not an infinite hierarchy of meta-governors."
  };
}

export function auditFSPObjectReopen(
  challenge:FSPObjectChallenge,
  target:ConstitutionalCommitment
):FSPObjectReopenAudit{
  const reasons:string[]=[];
  let status:FSPReopenStatus;

  if(challenge.targetCommitmentId!==target.commitmentId){
    throw new Error("challenge target mismatch");
  } else if(!target.challengeable){
    status="BLOCKED_TARGET_UNCHALLENGEABLE";
    reasons.push("target commitment is marked unchallengeable");
  } else if(!challenge.standingAdequate){
    status="BLOCKED_STANDING";
    reasons.push("challenger standing is inadequate");
  } else if(!challenge.provenanceVisible){
    status="BLOCKED_PROVENANCE";
    reasons.push("challenge provenance is not visible");
  } else if(challenge.evidenceIds.length===0){
    status="BLOCKED_NO_EVIDENCE";
    reasons.push("challenge supplies no evidence");
  } else if(!challenge.counterargumentsPreserved){
    status="REOPEN_WITH_CONSTRAINTS";
    reasons.push("reopen is allowed but opposing arguments must be preserved before revision");
  } else {
    status="REOPEN";
    reasons.push("FSP commitment may be reopened under explicit evidence, standing, provenance, and counterargument preservation");
  }

  return {
    challengeId:challenge.challengeId,
    targetCommitmentId:target.commitmentId,
    status,
    reasons,
    reopeningInvalidatesAllFSP:false,
    currentCommitmentRemainsOperativeUntilRevision:
      status==="REOPEN" || status==="REOPEN_WITH_CONSTRAINTS"
  };
}

export function auditRevisionProgramFreeze(
  modules:RevisionModuleRecord[],
  expectedModuleIds:string[]
):RevisionProgramFreezeAudit{
  const byId=new Map(modules.map(m=>[m.moduleId,m]));
  const missingModules=expectedModuleIds.filter(id=>!byId.has(id));

  const dependencyFailures:string[]=[];
  for(const module of modules){
    for(const dep of module.dependsOn){
      if(!byId.has(dep)){
        dependencyFailures.push(`${module.moduleId}->${dep}`);
      } else if((byId.get(dep)?.ordinal??Infinity)>=module.ordinal){
        dependencyFailures.push(`${module.moduleId}->${dep}:non-prior-dependency`);
      }
    }
  }

  const regressionFailures=canonical(
    modules
      .filter(m=>!m.testsPassed || !m.browserBuildPassed)
      .map(m=>m.moduleId)
  );
  const missingClaimCeilings=canonical(
    modules.filter(m=>!m.claimCeilingPresent).map(m=>m.moduleId)
  );
  const humanEvidencePending=canonical(
    modules.filter(m=>m.humanEvidenceStatus==="PENDING").map(m=>m.moduleId)
  );

  const integrationPass=
    missingModules.length===0 &&
    dependencyFailures.length===0 &&
    regressionFailures.length===0 &&
    missingClaimCeilings.length===0;

  return {
    modules:canonical(modules.map(m=>m.moduleId)),
    missingModules:canonical(missingModules),
    dependencyFailures:canonical(dependencyFailures),
    regressionFailures,
    missingClaimCeilings,
    humanEvidencePending,
    integrationPass,
    freezeStatus:integrationPass
      ? "FREEZE_AS_PROVISIONAL_RESEARCH_BASE"
      : "DO_NOT_FREEZE",
    freezeMeansFinalTruth:false,
    futureReopenRequired:true
  };
}
