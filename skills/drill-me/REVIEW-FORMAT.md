# Review Format

A **review** is a retrieval test of one learning record or one reference. It runs in chat, files closed, in the Opening. The learner recalls first and reads second; that is what turns fluency into storage strength (Oakley ch. 4, 7).

Derived from teach-me's `REVIEW-FORMAT.md`. Two things are different here: the ladder is cut at the exam date, and a record is never reviewed with the question that produced it.

## The line

Every reviewable file carries one line, and that line is its whole scheduling state:

```
Next review: {YYYY-MM-DD} · {interval}
```

`{interval}` is the interval applied to reach the date: `1d`, `3d`, `7d`, `14d`, `30d`, `60d` or `120d`.

- Learning record: third line, below the title.
- Reference (HTML): `<meta name="next-review" content="{YYYY-MM-DD} · {interval}">` inside `<head>`. Nothing prints. References exist outside Emergência only.
- `HABIT.md`: on its own ladder, below.
- `GLOSSARY.md`, lessons, questions and the Gabarito comentado carry no line. Glossary terms are recalled with the reference they belong to.

The label `Next review:` and the meta name stay in English in every workspace language; the agent greps for them.

An item is **due** when today is on or after its date.

## The ladder

```
1d → 3d → 7d → 14d → 30d → 60d → 120d → 120d …
```

A new record or reference is born at `1d`, so it is due at the next session (Oakley ch. 3, 4). The top rung repeats forever.

**The exam date cuts the ladder.** No review is ever scheduled after it. An interval that would land on or past the exam date lands **2 days before the exam** instead, whatever rung produced it. The date comes from `MISSION.md`, so a banca that moves the exam moves every line at the next Opening.

**Under Emergência the ladder is `1d` and `3d` only.** Anything above `3d` is written as `3d`. A Regime that tightens into Emergência rewrites the due dates it finds above `3d` at the next Opening, and says so in one line. A Regime that loosens leaves them where they are; the ladder climbs again from the next grade.

`HABIT.md` uses a two-rung ladder: `14d`, then `30d` repeating. Its review is a structural review (see `HABIT-FORMAT.md`), not a retrieval test, and the last week before the exam skips it.

## What a review tests

- **Learning record**: a **Questão sintética** on the record's `Item:` and `Padrao:`, written for this review, **never the question that produced the record and never one already listed in `Variants:`**. The correct statement differs from the original and from every earlier variant, and no sentence is reused, so read the files in `Variants:` first. Form comes from the active Ficha da banca: after a change of banca, same content, new shape. Write the new file to `questoes/sinteticas/` and append its path to `Variants:`.
- **Reference**: the learner recites what the sheet holds, then opens it and compares.

A review is answered in chat, like everything that counts. Its answer is appended to `dados.js` as an `R` line with `orig` naming the review, so it feeds the item's hit rate. A variant is synthetic, so it never enters a Simulado score.

## Grading

Judge the answer, give feedback either way (Oakley ch. 7), then rewrite the line at Closing:

| Outcome | Meaning | New line |
|---|---|---|
| **recalled** | correct from memory, unaided | date + next rung |
| **with hint** | correct after one nudge | date + same rung |
| **missed** | wrong, blank, or needed the answer | date + `1d` |

A Chute that landed is **with hint** at best: ask what made them unsure, and say so.

**Missed twice in a row**: the record gets `Status: superseded by LR-NNNN` and a new record names the gap; the superseded one loses its line. Nothing else is needed to bring the subject back, because triage reads the hit rate: two misses raise that item's score on their own, and it returns as the item of a session. A reference stays at `1d` until it is recalled.

## In the session

- Reviews open the ritual, after the habit lines and before the middle block.
- Up to **3 reviews per session**, most overdue first.
- More than **6 due**: the session is a **review session**. No middle block, up to 6 reviews, and the log line reads `done · revisão`.
- Overdue items keep their rung. The grade, and only the grade, moves it.

## Resets

- A reference that gains content goes back to `1d`, written at the Closing that teaches the lesson linking the new content. Reformatting keeps the line.
- A reference is written with the prepared lesson that links it, one session before it is taught. A new one is born without the tag; an extended one keeps its old line, and a review that comes due before the lesson covers only what has been taught.
- A superseded record drops its line. Its replacement is born at `1d`.
- An edital swap retires the records whose item has no pair. A retired record loses its line and is never reviewed again.
- The line is the only record of review state. There is no review log.
