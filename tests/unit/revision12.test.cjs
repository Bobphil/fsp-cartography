const test=require('node:test');
const assert=require('node:assert/strict');

const {
  auditConstitutionalSelf,
  auditExceptionRatchet,
  auditGovernanceReflexivity,
  auditFSPObjectReopen,
  auditRevisionProgramFreeze
}=require('../../dist/research/revision12.js');

const {
  constitutionalCommitments,
  selfSealingCommitments,
  normalizedExceptionRecord,
  legitimateAmendmentRecord,
  governanceLayers,
  selfSealingLayers,
  fspChallenge,
  constrainedChallenge,
  revisionModules,
  expectedRevisionModuleIds
}=require('../../dist/research/revision12Fixtures.js');

test('healthy constitutional commitments pass self-audit',()=>{
  const audit=auditConstitutionalSelf(constitutionalCommitments);
  assert.equal(audit.selfAuditPass,true);
  assert.deepEqual(audit.missingProvenance,[]);
  assert.deepEqual(audit.unchallengeableCommitments,[]);
  assert.deepEqual(audit.missingReopenConditions,[]);
  assert.equal(audit.constitutionalStatusDoesNotAuthorizeTruth,true);
});

test('self-sealing constitutional commitment fails self-audit',()=>{
  const audit=auditConstitutionalSelf(selfSealingCommitments);
  assert.equal(audit.selfAuditPass,false);
  assert.ok(audit.unchallengeableCommitments.includes('self-sealing-rule'));
});

test('challengeable commitment without reopen conditions fails self-audit',()=>{
  const broken=structuredClone(constitutionalCommitments);
  broken[0].reopenConditions=[];
  const audit=auditConstitutionalSelf(broken);
  assert.equal(audit.selfAuditPass,false);
  assert.ok(audit.missingReopenConditions.includes('map-not-world'));
});

test('normalized exception without reauthorization is detected',()=>{
  const audit=auditExceptionRatchet(normalizedExceptionRecord);
  assert.equal(audit.status,'EXCEPTION_NORMALIZED_WITHOUT_REAUTHORIZATION');
  assert.equal(audit.persistenceAuthorizesNormalization,false);
});

test('same resulting rule can be legitimate if explicitly amended',()=>{
  const audit=auditExceptionRatchet(legitimateAmendmentRecord);
  assert.equal(audit.status,'LEGITIMATELY_AMENDED_NORMAL_RULE');
  assert.equal(audit.persistenceAuthorizesNormalization,false);
});

test('governance layers can be reflexive without infinite regress',()=>{
  const audit=auditGovernanceReflexivity(governanceLayers);
  assert.equal(audit.reflexivityPass,true);
  assert.deepEqual(audit.orphanLayers,[]);
  assert.deepEqual(audit.selfSealingLayers,[]);
  assert.equal(audit.infiniteRegressClaim,false);
});

test('self-sealing top layer fails reflexivity audit',()=>{
  const audit=auditGovernanceReflexivity(selfSealingLayers);
  assert.equal(audit.reflexivityPass,false);
  assert.ok(audit.selfSealingLayers.includes('sealed-constitution'));
});

test('FSP constitutional commitment can be reopened as object of inquiry',()=>{
  const target=constitutionalCommitments.find(x=>x.commitmentId==='protected-floor-rule');
  const audit=auditFSPObjectReopen(fspChallenge,target);
  assert.equal(audit.status,'REOPEN');
  assert.equal(audit.reopeningInvalidatesAllFSP,false);
  assert.equal(audit.currentCommitmentRemainsOperativeUntilRevision,true);
});

test('missing counterargument preservation yields constrained reopen not silent revision',()=>{
  const target=constitutionalCommitments.find(x=>x.commitmentId==='protected-floor-rule');
  const audit=auditFSPObjectReopen(constrainedChallenge,target);
  assert.equal(audit.status,'REOPEN_WITH_CONSTRAINTS');
  assert.equal(audit.currentCommitmentRemainsOperativeUntilRevision,true);
});

test('FSP challenge with no evidence is blocked',()=>{
  const target=constitutionalCommitments.find(x=>x.commitmentId==='protected-floor-rule');
  const challenge=structuredClone(fspChallenge);
  challenge.evidenceIds=[];
  const audit=auditFSPObjectReopen(challenge,target);
  assert.equal(audit.status,'BLOCKED_NO_EVIDENCE');
});

test('FSP challenge with inadequate standing is blocked',()=>{
  const target=constitutionalCommitments.find(x=>x.commitmentId==='protected-floor-rule');
  const challenge=structuredClone(fspChallenge);
  challenge.standingAdequate=false;
  const audit=auditFSPObjectReopen(challenge,target);
  assert.equal(audit.status,'BLOCKED_STANDING');
});

test('revision program integration passes for REVISION-1 through REVISION-11',()=>{
  const audit=auditRevisionProgramFreeze(
    revisionModules,
    expectedRevisionModuleIds
  );
  assert.equal(audit.integrationPass,true);
  assert.deepEqual(audit.missingModules,[]);
  assert.deepEqual(audit.dependencyFailures,[]);
  assert.deepEqual(audit.regressionFailures,[]);
  assert.deepEqual(audit.missingClaimCeilings,[]);
});

test('successful integration freezes only a provisional research base',()=>{
  const audit=auditRevisionProgramFreeze(
    revisionModules,
    expectedRevisionModuleIds
  );
  assert.equal(audit.freezeStatus,'FREEZE_AS_PROVISIONAL_RESEARCH_BASE');
  assert.equal(audit.freezeMeansFinalTruth,false);
  assert.equal(audit.futureReopenRequired,true);
});

test('pending human evidence remains visible through program freeze',()=>{
  const audit=auditRevisionProgramFreeze(
    revisionModules,
    expectedRevisionModuleIds
  );
  assert.ok(audit.humanEvidencePending.includes('FSP-REVISION-11'));
});

test('missing module blocks freeze',()=>{
  const audit=auditRevisionProgramFreeze(
    revisionModules.filter(x=>x.moduleId!=='FSP-REVISION-7'),
    expectedRevisionModuleIds
  );
  assert.equal(audit.integrationPass,false);
  assert.equal(audit.freezeStatus,'DO_NOT_FREEZE');
  assert.ok(audit.missingModules.includes('FSP-REVISION-7'));
});

test('failed regression blocks freeze',()=>{
  const broken=structuredClone(revisionModules);
  broken[4].testsPassed=false;
  const audit=auditRevisionProgramFreeze(
    broken,
    expectedRevisionModuleIds
  );
  assert.equal(audit.integrationPass,false);
  assert.ok(audit.regressionFailures.includes('FSP-REVISION-5'));
});

test('missing claim ceiling blocks freeze',()=>{
  const broken=structuredClone(revisionModules);
  broken[8].claimCeilingPresent=false;
  const audit=auditRevisionProgramFreeze(
    broken,
    expectedRevisionModuleIds
  );
  assert.equal(audit.integrationPass,false);
  assert.ok(audit.missingClaimCeilings.includes('FSP-REVISION-9'));
});

test('non-prior dependency blocks freeze',()=>{
  const broken=structuredClone(revisionModules);
  broken[2].dependsOn=['FSP-REVISION-4'];
  const audit=auditRevisionProgramFreeze(
    broken,
    expectedRevisionModuleIds
  );
  assert.equal(audit.integrationPass,false);
  assert.ok(audit.dependencyFailures.some(x=>x.includes('non-prior-dependency')));
});
