# RESOURCES.md Format

`RESOURCES.md` is the closed set of sources this workspace may quote. Every Extrato is cut from something listed here, and every gabarito rests on an Extrato. It is written once, at Session zero, by `subagents/build-resources.md`, and read at every Closing instead of searching again.

Derived from teach-me's `RESOURCES-FORMAT.md`. The `## Wisdom` section is gone: nothing in drill-me uses it, and an empty section invites the agent to fill it with cram-school blogs, which the ladder below bars.

## Structure

```md
# Fontes: {cargo}, {órgão}

## Sources

- [Lei 6.938/1981, Política Nacional do Meio Ambiente](https://www.planalto.gov.br/...)
  Official text at Planalto. Covers: AMB-1, AMB-2, LEG-3. Acquired 2026-09-22 into `material/lei-6938.md`.
- [Estatuto Social da CAER](https://www.caer.com.br/...)
  Official text on the body's own site. Covers: LEG-5. Short enough to be its own Extrato: `fontes/LEG-5.md`.
- Manual de Geologia Estrutural, the learner's own PDF
  In `material/`. Covers: GEO-4, GEO-5, GEO-6.

## Gaps

- MAT-1 to MAT-4: no source found for the maths items. Asked the learner on 2026-09-22.
```

## The ladder of what may be acquired

Closed, in this order. Nothing outside it enters the workspace:

1. **The learner's own material**, in `material/`.
2. **The official text of a law or norm**: Planalto, the official gazette, the body's own site.
3. **A technical document from a public body**: SGB, ANA, ANM, IBGE and their like.
4. **Lecture notes from a public university**, with the author and the institution named.

A cram-school blog, a social-media summary and an authorless PDF stay out. The floor under the ladder is in `SKILL.md` and decides whether a question is written at all: **your own knowledge never holds a gabarito up**, not even marked as unchecked.

## Acquisition

A source is acquired first and quoted second, so the original is still in the workspace six weeks later when the learner contests a gabarito.

- The subagent **downloads the source into `material/`**, the same folder as the learner's own files, because the rule is about the file being inside the Carreira, not about who put it there. Never name the original after an item: one geology book covers `GEO-1` to `GEO-5`. `fontes/` holds Extratos and nothing else.
- **A source that is not a PDF has a size cut.** When the part that matters fits inside the Extrato's ceiling, a short law or a statute, the subagent copies it straight into `fontes/<item>.md` with the URL and the date, and nothing goes to `material/`: downloading and cutting would write the same file twice. Bigger than that, it copies the section word for word into `material/<nome>.md`, and the Extrato is cut from that copy afterwards.
- **A site that blocks reading** sends the item to `## Gaps` and becomes one request to the learner.
- Raw HTML is never saved. It costs tokens and nobody reads it afterwards.

Acquisition runs at Closing, inside Preparo, and only for the item that has no source yet. The author can fill `material/` ahead of time on their own machine, and then the learner's Balde pays nothing.

## Rules

- **Annotate every entry.** One line: what it covers, which items it serves, and where the acquired copy landed. A bare link is useless in three months.
- **Every entry names its items**, by the codes of `EDITAL.md`. That is how Preparo finds a source without searching.
- **Surface gaps explicitly.** `## Gaps` lists the items no source covers. It drives the one request to the learner and it is what `E.fonte` reports to the Painel as the **sem fonte** chip. An item in `## Gaps` keeps its Peso and stays in triage: the edital charges for it whether the source is on disk or not.
- **Ask once, not every session.** A gap that the learner has already been asked about carries the date it was asked.
- **Prune what turned out wrong.** Remove it, do not bury it. Better five sharp sources than thirty mediocre ones.
- **An edital swap remaps the item lists.** Rewrite each entry's items through the same mapping that rewrites `EDITAL.md`. An entry left with no item is **not deleted**: it gains a note saying the edital that justified it is gone.
- Written in the learner's language. The headings `## Sources` and `## Gaps` stay in English, because the agent greps for them.
