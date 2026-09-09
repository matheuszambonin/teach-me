# Learning Record Format

Learning records live in `./learning-records/` and use sequential numbering: `0001-slug.md`, `0002-slug.md`, etc. Create the directory lazily: only when the first record is written.

They are the teaching equivalent of ADRs: they capture non-obvious lessons, key insights, and stated prior knowledge that will steer future sessions. They are used to calculate the zone of proximal development, and each one is reviewed on the ladder in [REVIEW-FORMAT.md](./REVIEW-FORMAT.md).

## Template

```md
# {Short title of what was learned or established}

Next review: {YYYY-MM-DD} · {interval}

{1-3 sentences: what was learned (or what prior knowledge was established), and why it matters for future sessions.}
```

That is the whole format. A learning record can be a single paragraph. The value is recording _that_ this is now known and _why_ it changes what to teach next, not in filling out sections.

The `Next review:` line is the third line of the file. A new record is born at `1d`. The label stays in English in every workspace language; the agent greps for it.

## Optional sections

Only include these when they add genuine value. Most records won't need them.

- **Status line** (`Status: superseded by LR-NNNN`), directly below the `Next review:` line, only when an earlier understanding turns out to be wrong and is replaced. The superseded record loses its `Next review:` line.
- **Evidence**: how the learner demonstrated the understanding (a question answered, an exercise completed, prior experience cited). Useful when the claim might be revisited.
- **Implications**: what this unlocks or rules out for future sessions. Worth recording when non-obvious.

## Numbering

Scan `./learning-records/` for the highest existing number and increment by one.

## When to write a learning record

Write one when any of these is true:

1. **The learner demonstrated genuine understanding of something non-trivial**: not just exposure, but evidence they can use the concept correctly. The closing check at the end of a lesson is the default evidence. This sets a new floor for what to teach next.
2. **The learner disclosed prior knowledge**: "I already know X." Record it so future sessions don't re-teach it. Also record the _depth_ claimed.
3. **A misconception was corrected**: the learner previously believed something wrong and now sees why. These are high-value: they predict future stumbling blocks for related topics.
4. **The mission shifted in response to learning**: the learner discovered they cared about something different than they thought. Cross-link to [[MISSION.md]] and update it.

### What does _not_ qualify

- Material that was merely covered. Coverage is not learning. Wait for evidence.
- Anything already captured tersely in [[GLOSSARY.md]] as a term definition. Don't duplicate.
- Session-by-session activity logs. Learning records are not a journal: they are decision-grade insights. Session activity goes in the `HABIT.md` log.

## Supersession

When a later record contradicts an earlier one (the learner's understanding deepened or corrected, or a review was missed twice in a row), mark the old record `Status: superseded by LR-NNNN` rather than deleting it, and drop its `Next review:` line. The replacement is born at `1d`. The history of how understanding evolved is itself useful signal.
