# Lesson Format

A lesson is one self-contained HTML file in `./lessons/`, named `NNNN-<dash-case-name>.html`, that teaches exactly one chunk. It is the Lesson block of the session ritual: opened after the reviews, closed before the closing check. Sized to fifteen minutes.

## Head

```html
<meta name="chunk" content="knowledge | skill">
```

`knowledge` chunks get a recite-and-explain closing check; `skill` chunks get a fresh instance, and only they receive interleaved practice items.

## Sections, in order

1. **Skim first.** One line at the top telling the learner to read only the headings for a minute before reading anything else (Oakley ch. 2).
2. **Opening question.** The question this lesson answers, and one sentence tying it to `MISSION.md` (ch. 11: a lesson is a story with a question).
3. **Where this fits.** Two or three lines of big picture: what came before, what this unlocks (ch. 4, top-down before bottom-up).
4. **The idea.** One idea, then one worked example inside a `<details>` block: the problem visible, the solution hidden until the learner has tried. Ask the learner to explain why each step follows from the previous one, not only why it is valid (ch. 4).
5. **Practice.** Three to five items with immediate, automatic feedback, built from `./assets/` components. Quiz options have the same word count. For a `skill` chunk with earlier lessons, at least one item comes from an earlier chunk, mixed in unannounced, so the learner practices choosing the technique (ch. 4).
6. **Primary source.** The one highest-trust resource on this chunk, from `RESOURCES.md`.
7. **Carry question.** One open question, tied to the likely next chunk or to the mission, for the learner to take into the break (ch. 8). The agent reads it back at the next Opening.
8. **Ask the agent.** The reminder that the agent is the teacher and takes follow-up questions.

No self-test section. The closing check happens in chat, lesson closed, because an open page produces the feeling of knowing (ch. 4) and the browser returns no result to the agent.

## Limits

- One chunk. If the idea needs a second one, the second waits for the next session.
- Running text up to about 600 words, practice excluded.
- Every lesson links the shared stylesheet, the references it relies on, and the lesson it replaces if it is a retry after a missed closing check.
- Written in the learner's language. The `chunk` meta name stays in English.

## Style

Beautiful, printable, Tufte-like, as in `teach`. The `<details>` block is styled in the shared stylesheet; it is a rule, not a component file.
