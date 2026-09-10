# Review Format

A **review** is a retrieval test of one learning record or one reference. It runs in chat, files closed, before the lesson opens. The learner recalls first and reads second; that is what turns fluency into storage strength (Oakley ch. 4, 7).

## The line

Every reviewable file carries one line, and that line is its whole scheduling state:

```
Next review: {YYYY-MM-DD} · {interval}
```

`{interval}` is the interval applied to reach the date: `1d`, `3d`, `7d`, `14d`, `30d`, `60d` or `120d`.

- Learning record: third line, below the title.
- Reference (HTML): `<meta name="next-review" content="{YYYY-MM-DD} · {interval}">` inside `<head>`. Nothing prints.
- `HABIT.md`: third line, below the title, on its own ladder (below).
- `GLOSSARY.md` and lessons carry no line. Glossary terms are recalled with the reference they belong to.

The label `Next review:` and the meta name stay in English in every workspace language; the agent greps for them.

An item is **due** when today is on or after its date.

## The ladder

```
1d → 3d → 7d → 14d → 30d → 60d → 120d → 120d …
```

A new record or reference is born at `1d`, so it is due at the next session (Oakley ch. 3, 4). The top rung repeats forever.

`HABIT.md` uses a two-rung ladder: `14d`, then `30d` repeating. Its review is a structural review (see `HABIT-FORMAT.md`), not a retrieval test.

## What a review tests

- **Learning record**: the record claims the learner can do something. Ask for it again: a fresh instance, the mechanism explained, the correction applied. Skill, not recognition.
- **Reference**: the learner recites what the sheet contains, then opens it and compares. Knowledge.

## Grading

Judge the learner's answer, give feedback either way (Oakley ch. 7), then rewrite the line:

| Outcome | Meaning | New line |
|---|---|---|
| **recalled** | correct from memory, unaided | date + next rung |
| **with hint** | correct after one nudge | date + same rung |
| **missed** | wrong, blank, or needed the answer | date + `1d` |

**Missed twice in a row**: the topic re-enters the zone of proximal development as a candidate for the next chunk. A learning record gets `Status: superseded by LR-NNNN` and a new record names the gap; the superseded record loses its line. A reference stays at `1d` until it is recalled.

## In the session

- Reviews open the ritual, after the habit hooks and before the lesson.
- Up to **3 reviews per session**, most overdue first.
- More than **6 due**: the session is a **review session**. No new chunk, up to 6 reviews, no lesson file. The `HABIT.md` log line reads `done · review session`.
- Overdue items keep their rung. The grade, and only the grade, moves it.

## Resets

- A reference that gains content goes back to `1d`, written at the Closing that teaches the lesson linking the new content. Reformatting keeps the line.
- A reference is written with the prepared lesson that links it, one session before it is taught. A new one is born without the tag; an extended one keeps its old line, and a review that comes due before the lesson covers only what has been taught. The Closing that teaches the lesson writes `1d` on both, as it does for the learning record.
- A superseded record drops its line. Its replacement is born at `1d`.
- The line is the only record of review state. There is no review log.
