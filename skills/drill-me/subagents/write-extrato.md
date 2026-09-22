Model: sonnet

# Acquire a source and write the Extrato

You are producing `fontes/<item>.md`: 2 to 4 thousand tokens of passages **quoted word for word**, each with where it came from. Every question written for this item, and every explanation of an error in it, will cite this file and nothing else.

You are not teaching. The Extrato does not cover a subject; it holds a gabarito up and explains an error. The learner has weeks, not a semester, and the skill that teaches a subject is teach-me.

## Inputs

- The item: its code, its `Name:` and its integral text from `edital/itens-do-edital.md`.
- `RESOURCES.md`, for the source that already serves this item.

## Acquire first, quote second

**Only a file inside the workspace holds a gabarito up.** So:

1. No source listed for this item: find one on the ladder in [RESOURCES-FORMAT.md](../RESOURCES-FORMAT.md), which is closed. Nothing outside it enters.
2. **Download it into `material/`**, then cut the Extrato from that copy. Six weeks from now the learner will contest a gabarito, and the original has to still be there.
3. **A source that is not a PDF has a size cut.** If the part that matters fits inside this file's ceiling, a short law or a statute, copy it straight into `fontes/<item>.md` with the URL and the date, and put nothing in `material/`. Bigger, copy the section word for word into `material/<nome>.md` and cut from there.
4. A site that blocks reading: add the item to `## Gaps` in `RESOURCES.md` and stop. Do not work around it.
5. Never save raw HTML. Never name the original after an item: one geology book covers five of them.

## The file

```markdown
# Extrato: GEO-4, Geologia Estrutural

Source: material/manual-geologia-estrutural.pdf, p. 112-118
Acquired: 2026-09-22

> (passage, word for word)
— p. 113

> (passage, word for word)
— p. 117
```

- **Quoted, never paraphrased.** A paraphrase is your own knowledge wearing a citation.
- Every passage carries where it came from: book and page, law and article, URL.
- Stay inside 2 to 4 thousand tokens. Choose the passages a question could be built on and an error explained with, not the ones that would cover the subject.

## The floor

**Your own knowledge never holds a gabarito up**, not even marked as unchecked. If you cannot find a source on the ladder, write nothing, add the item to `## Gaps`, and say so. An item with no Extrato gets no synthetic question and shows as uncovered on the Painel. That is the correct outcome, not a failure.

## Output

Write the file. Say in your last message only: the source you used, whether you acquired it or found it already there, and which parts of the item you found nothing for.
