# FSP-HUMAN-FIDELITY-1

## Live Participant Protocol, There-I-Am / Here-I-Am / I-See-Me Elicitation, Form-Filling Detection, Journey Interview, and Human Evidence Gate

**Status:** Live-human validation protocol and evidence gate  
**Boundary:** INTEGRATION-1 through INTEGRATION-3 remain intact; Cartography kernel remains frozen.

## 1. Purpose

INTEGRATION-3 established structural conditions for lived continuity, recognition ownership, sparse states, and anti-form-filling behavior.

HUMAN-FIDELITY-1 defines the first real-participant protocol capable of testing whether those conditions are actually experienced by people.

The protocol is deliberately designed so that synthetic or model-simulated records can exercise the code but can never satisfy the human-evidence gate.

## 2. Protocol identity

Protocol:

`FSP-HUMAN-FIDELITY-1.0`

Current minimum participant count:

`5`

This is a small formative validation threshold, not a claim of population-level generalizability.

## 3. Participant conditions

A protocol-eligible session requires:

- independent consent;
- a participant's own lived case;
- completed journey;
- no withdrawal;
- recognition elicitation;
- form-filling probe;
- post-journey interview;
- no research-vocabulary priming;
- no system claim that recognition occurred;
- no facilitator-led conclusion.

Skip and withdrawal options are constitutional requirements of the protocol.

Sensitive disclosure is not required.

## 4. Evidence sources

Evidence records are typed as:

- REAL_PARTICIPANT;
- SYNTHETIC;
- MODEL_SIMULATION.

Only REAL_PARTICIPANT records can become eligible human evidence.

Therefore:

```
perfect synthetic result
!=
human evidence
```

and:

```
model simulation
!=
human evidence.
```

## 5. Recognition elicitation

The protocol tests three recognition dimensions:

### THERE_I_AM

Local recognition.

The interview does not ask:

> You recognized yourself there, correct?

It asks:

> Was there any point where a part of the map felt especially accurate or recognizable to you? If so, what made it feel that way?

### YES_HERE_I_AM

Architectural self-location.

The protocol asks:

> Did the larger map help you locate where you were in the situation, or did it make the situation feel more abstract?

### I_SEE_ME

Diachronic recognition.

The protocol asks:

> Looking back across the journey, did you notice any change in how you understood your own thinking or situation?

Responses may be:

- YES;
- PARTLY;
- NO;
- NOT_SURE;
- DECLINED.

NO, NOT_SURE, and DECLINED are legitimate evidence and must not be converted into failure to cooperate.

## 6. Verbatim preservation

Recognition evidence contains participant verbatim text.

A YES or PARTLY response without participant language does not count as affirmed recognition in the gate.

The system may code the response.

It may not invent the participant's reason.

## 7. Form-filling probe

Each participant is asked whether the experience felt like:

- working through their situation;
- filling out a form;
- something in between.

The evidence record separately tracks:

- forced completion;
- unnecessary repetition;
- prompt fit;
- ability to leave views sparse;
- whether the system seemed to decide for the participant.

This makes form-filling a participant-reported phenomenon rather than only an architectural heuristic.

## 8. Journey interview

The frozen interview contains eight non-leading questions covering:

1. lived continuity;
2. preservation of the participant's own words;
3. local recognition;
4. architectural self-location;
5. diachronic recognition;
6. form-filling;
7. authorship of Return;
8. missing or distorted context.

All questions are marked:

`leading = false`.

## 9. Authorship

The participant is asked:

> At the end, did the judgment feel like yours, the system's, or something in between? Why?

A system-authored feeling is an adverse result.

It must remain visible even if recognition scores are otherwise favorable.

## 10. Session protocol audit

A session is excluded from the human evidence gate if it contains protocol violations such as:

- missing consent;
- non-lived/supplied case;
- withdrawal;
- missing recognition elicitation;
- missing form probe;
- missing interview;
- research-vocabulary priming;
- system-claimed recognition;
- facilitator-led conclusion.

Excluded records remain part of the audit trail.

They are not silently deleted.

## 11. Human evidence gate statuses

The gate returns one of:

- PENDING;
- INSUFFICIENT;
- MIXED;
- PASS;
- FAIL.

### PENDING

No protocol-eligible real participant records exist.

This is the current repository status at protocol creation.

### INSUFFICIENT

At least one eligible real participant exists, but the minimum sample has not been reached.

### MIXED

The minimum sample exists, but evidence includes non-majority concerns, missing majority recognition coverage, or conflicting outcomes.

MIXED is not failure.

It means the human evidence does not support a clean PASS.

### PASS

For the formative gate:

- minimum participant count is met;
- a majority of eligible participants affirm each of the three recognition dimensions;
- no eligible participant presents any coded adverse concern.

This deliberately high standard makes PASS difficult.

### FAIL

FAIL occurs when a majority of eligible participants report at least one of:

- form-filling concern;
- authorship concern;
- lived-continuity concern.

A single adverse case remains visible but does not itself trigger FAIL.

## 12. Adverse-case preservation

The gate fixes:

`adverseCasesPreserved = true`.

A favorable majority cannot erase a participant who says:

- "This did not feel like my situation."
- "The map changed what I meant."
- "The system decided for me."
- "This felt like a form."

Such cases are diagnostically important.

## 13. No hidden aggregate score

The gate does not produce a single numerical human-fidelity score.

It preserves separate counts for:

- THERE_I_AM affirmation;
- YES_HERE_I_AM affirmation;
- I_SEE_ME affirmation;
- form-filling concern;
- authorship concern;
- continuity concern.

This prevents a high score in one domain from cancelling a serious failure in another.

## 14. Synthetic tests

Synthetic records are included only to test gate behavior.

Five perfect synthetic records must still return:

`PENDING`.

Five perfect model-simulation records must still return:

`PENDING`.

This is a constitutional firewall against simulated evidence inflation.

## 15. Real-participant examples in tests

The codebase contains artificial REAL_PARTICIPANT fixtures solely to exercise state transitions:

- insufficient sample -> INSUFFICIENT;
- clean sample -> PASS;
- one adverse case -> MIXED;
- majority adverse cases -> FAIL.

These fixtures are not empirical evidence and must never be reported as real trial results.

## 16. Current evidence status

At protocol creation:

- live participants completed: 0;
- eligible human records: 0;
- status: PENDING.

## 17. Claim ceiling

The strongest claim this build can earn before real sessions are conducted is:

> FSP has a frozen, executable live-participant protocol that can distinguish eligible human evidence from synthetic/model evidence, preserve adverse cases, elicit recognition without leading claims, detect form-filling and authorship concerns, and return bounded PENDING/INSUFFICIENT/MIXED/PASS/FAIL evidence states.

It cannot yet claim actual human fidelity.

## 18. Practical execution

A real session should proceed:

1. obtain consent;
2. invite a participant-owned lived case;
3. remind the participant that views may be skipped or left sparse;
4. complete the seven-view journey;
5. offer recognition prompts without asserting recognition;
6. administer the form-filling probe;
7. conduct the frozen journey interview;
8. save verbatim participant language;
9. code the record without changing the participant text;
10. run the human evidence gate.

## 19. Next move

The next move is not another synthetic build.

It is:

`FSP-HUMAN-FIDELITY-1A — First Live Session Packet, Consent/Facilitator Script, Participant Record Form, Coding Sheet, and Trial-Run Execution.`

The repository should remain PENDING until actual human participant evidence exists.
