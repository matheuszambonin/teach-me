# Lesson Format

A lesson is one self-contained HTML file in `./lessons/`, named `NNNN-<dash-case-name>.html`, that works one Item do edital. It is the first part of the middle block in Longo and in Curto's lesson sessions, opened after the reviews and closed before the Closing. Sized to **20 minutes**, with the rest of the block spent on questions in chat.

Derived from teach-me's `LESSON-FORMAT.md`. Three things are different: the lesson works from the item's Extrato and never from your own knowledge; its practice items are warm-up and **never count**; and under Emergência lessons do not exist at all.

## Head

```html
<meta name="chunk" content="knowledge | skill">
<meta name="item" content="GEO-4">
```

`knowledge` items get a recite-and-explain closing check; `skill` items get a fresh question. The `item` meta is the code from `EDITAL.md`.

## What it is made of

The lesson reads `fontes/<item>.md`, the Extrato, and nothing else. No book, no law, no official page is read while writing a lesson: the Extrato already holds the passages, word for word, with where they came from. An item with no Extrato gets no lesson. Every claim in the lesson traces to a passage in the Extrato, and the lesson quotes it rather than paraphrasing it when the gabarito will hang on the wording.

## Sections, in order

1. **Skim first.** One line telling the learner to read only the headings for a minute (Oakley ch. 2).
2. **Opening question.** The question this lesson answers, and one line saying what this item is worth on the exam, in points, from `EDITAL.md`.
3. **Where this fits.** Two or three lines: what the edital puts beside this item, what it unlocks (ch. 4, top-down before bottom-up).
4. **The idea.** One idea, then one worked question inside a `<details>` block: the question visible, the solution hidden until the learner has tried. It is a real question of the active banca, cited with its provenance, so the shape the exam uses is on the page from the start. Ask the learner to explain why each step follows from the previous one (ch. 4).
5. **Warm-up.** Three to five items with immediate feedback, built from `./assets/` components. Quiz options have the same word count. For a `skill` item with earlier lessons, at least one comes from an earlier item, mixed in unannounced (ch. 4).
6. **What the banca does with this.** The Padrões from `bancas/<banca>.md` that touch this item, each with the real question that named it.
7. **Carry question.** One open question, tied to the item triage will pick next, for the learner to take into the break (ch. 8).
8. **Ask the agent.** The reminder that the agent is there and takes follow-up questions.

No self-test section. Everything that counts is answered in chat, because a page opened from disk returns nothing to you.

## The warm-up never counts

The practice items on the page are warm-up. They produce no `R` line in `dados.js`, they never move a `Hit`, and they are not evidence in a learning record. Say so on the page in one line, in the learner's words: "estas aqui são para aquecer, as que valem vêm no chat". The measurement is the batch of questions that follows, and the Simulado.

## Limits

- **One Item do edital per lesson**, the one triage picked. A second idea waits for the next session.
- Running text up to about 600 words, warm-up excluded.
- Every lesson links the shared stylesheet, the references it relies on, and the lesson it replaces when it is a retry.
- Written at Preparo, after the learner has gone, following Escrita in `SKILL.md` and reading `references/humanizer.md` first.
- Written in the learner's language. The `chunk` and `item` meta names stay in English.

## Not under Emergência

Emergência writes no lesson, no reference sheet and no prepared lesson: every session is a Simulado curto, and the teaching that happens is the correction in chat. Preparo separates the next batch of questions instead. A workspace that tightens into Emergência keeps the lessons already on disk; nothing is deleted, and reviews of their references keep running on the `1d` and `3d` ladder.

## Style

Beautiful, printable, Tufte-like. The `<details>` block is styled in the shared stylesheet; it is a rule, not a component file.
