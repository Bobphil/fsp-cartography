# FSP-ENCYCLOPEDIA-READER-UI-1

## First Human-Facing Encyclopedia Reader

This build adds the first visible reader interface over the certified Encyclopedia Shell without changing the frozen chapter↔Atlas routing semantics.

The reader experience is:

`prose → case card → state timeline → transition detail → controlled probe → source ledger → claim ceiling → exact return to prose`

## Architecture

The interface is split into:

- `encyclopediaReaderPresentation.ts`: pure deterministic presentation models;
- `encyclopediaReaderBrowser.ts`: framework-free DOM renderer;
- the already-certified `encyclopediaReaderShell.ts`: sole reader-state/routing authority;
- the already-certified `encyclopediaNavigation.ts`: sole prose↔Atlas semantic navigation authority.

The visual layer never writes directly to Atlas or navigation data.

## Human-facing design decisions

The default reading surface remains prose-first. A case connection is shown as a restrained inquiry link rather than a permanent dashboard.

Entering the case opens an inspection workspace with ordinary-language headings. The timeline remains visible when it adds orientation, but unrouted states are disabled until the reader explicitly chooses **Explore full case**.

Controlled probes carry a visible firewall: a bounded counterfactual result is not automatically a historical fact or authorized scientific conclusion.

Sources show what they support rather than appearing as an undifferentiated bibliography.

The claim ceiling is a first-class screen with both **May not infer** and **REOPEN if** sections.

A persistent **Return to reading** action restores the exact origin token preserved by the certified reader shell.

## Responsive and accessibility baseline

The renderer uses semantic article/main/aside/section structure, keyboard-operable native controls, visible focus treatment, `aria-current` for active timeline steps, and a single-column layout below 760px.

This is an implementation baseline, not yet a human accessibility certification.

## Acceptance gate

The accompanying deterministic interface tests cover all visible stages, contextual-aperture display, explicit full-case expansion, return-action persistence, probe firewall visibility, claim-ceiling visibility, and Atlas nonmutation.

Passing this gate certifies the human-facing presentation contract and browser compilation. It does not yet certify deployment, Pressbooks embedding, cross-browser human testing, or final visual polish.
