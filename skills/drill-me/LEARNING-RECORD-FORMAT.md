# Learning Record Format

Learning records live in `./learning-records/` and use sequential numbering: `0001-slug.md`, `0002-slug.md`. Create the directory lazily, with the first record.

Derived from teach-me's `LEARNING-RECORD-FORMAT.md`. In teach-me a record is one thing the learner has shown they can do. Here a record is **one Item do edital plus one Padrão**: the same mistake, on the same subject, in the shape this banca keeps giving it. That pair is what a review can reopen with a new question, and it is what the Painel counts.

## Template

```md
# {Short title: the subject and the trap, in the learner's words}

Next review: {YYYY-MM-DD} · {interval}
Item: {ITEM-CODE}
Padrao: {the Padrão's name in the Ficha da banca, or none}
Comentado: {simulados/NNNN-comentado.md#qNN}
Variants: {questoes/sinteticas/sNNNN.md}, {questoes/sinteticas/sNNNN.md}

{1-3 sentences: what the learner got wrong, why the right answer is right, and what to watch for next time.}

## Evidence
- {questoes/ajuri-2014-alto-alegre-analista/q27.md} · {YYYY-MM-DD} · missed
- {questoes/sinteticas/s0004.md} · {YYYY-MM-DD} · recalled
```

The `Next review:` line is the third line of the file. The five labelled lines are machine-read and stay in English in every workspace language.

- **`Next review:`** is the scheduling state, and the whole of it. Ladder in [REVIEW-FORMAT.md](./REVIEW-FORMAT.md).
- **`Item:`** is the code of the Item do edital, as `EDITAL.md` writes it. It is how triage and the Painel find this record. An edital swap remaps it; a record whose item has no pair after the swap is retired, as described in [EDITAL-FORMAT.md](./EDITAL-FORMAT.md).
- **`Padrao:`** names the Padrão from the Ficha da banca, or `none` when the error fits no Padrão yet. Written without an accent, because it is a machine-read label.
- **`Comentado:`** points at the entry of the Gabarito comentado that already explained this error, so a review never re-explains from scratch. It is a pointer, not a task: see `SIMULADO-FORMAT.md`.
- **`Variants:`** lists every synthetic variant already used to review this record, by path. Read those files before writing the next variant, so no sentence is reused.
- **`## Evidence`** is one line per question that touched this record, with the date and the grade. It grows; nothing is deleted.

## One record per item plus Padrão

- If an open record already carries that pair, **do not create a second one**. Return it to `1d` and append the new question to `## Evidence`.
- An error with **no Padrão** gets a record of its own, one per question, carrying `Padrao: none`.
- At Closing, when two or more errors marked `none` share a trait, write the new Padrão into the Ficha da banca citing those real questions, then merge those records: the oldest one keeps the number, gains the Padrão and the others' evidence, and the rest get `Status: superseded by LR-NNNN`. Tell the learner in one line.

## Numbering

Scan `./learning-records/` for the highest existing number and increment by one.

## When to write one

1. **The learner got a question wrong, chuted it right, or left it blank.** That is the common case, and correction writes it in the same batch. A Chute that landed is an error for this purpose: the record says so.
2. **The learner disclosed prior knowledge** at Session zero. Record it with `Item:` and no `Next review:` line. It steers triage, stays off the ladder, and never enters `Hit`, because nothing has tested it. The first review or closing check that grades it recalled or with hint adds the line, born at `1d`.
3. **A misconception was corrected**: the learner believed something wrong and now sees why. High value, because it predicts the next trap.

### What does not qualify

- A clean correct answer. It moves the `Hit` and nothing else.
- A term that belongs in `GLOSSARY.md`. Do not duplicate.
- The session log. That is `HABIT.md`.
- The explanation of an error. That is the Gabarito comentado, and the record points at it.

## Supersession

When a record is merged into another, or the learner's understanding replaces it, mark the old one `Status: superseded by LR-NNNN` below the `Next review:` line, drop that line, and leave the file. The replacement is born at `1d`. Nothing is deleted: a record that keeps coming back is the signal triage needs.
