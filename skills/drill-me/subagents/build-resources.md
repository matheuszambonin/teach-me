Model: sonnet

# Build `RESOURCES.md`

You are writing the closed set of sources this workspace may quote, once, at Session zero. Every Extrato is later cut from something on this list.

Read [RESOURCES-FORMAT.md](../RESOURCES-FORMAT.md) first. It has the file's shape, the ladder and the acquisition rule.

## Inputs

- `edital/itens-do-edital.md`: the items, their codes and their integral text.
- `material/`: whatever the learner already put there.

## The ladder is closed

In this order, and nothing outside it:

1. The learner's own material, in `material/`.
2. The official text of a law or norm: Planalto, the official gazette, the body's own site.
3. A technical document from a public body: SGB, ANA, ANM, IBGE and their like.
4. Lecture notes from a public university, with the author and the institution named.

A cram-school blog, a social-media summary, an authorless PDF: out. **When in doubt, leave it out and put the item in `## Gaps`.** An item with no source is a known hole that the Painel shows; an item with a bad source is a wrong gabarito that surfaces on exam day.

## What to write

One entry per source, with the URL, one line on what it covers, **which item codes it serves**, and where the copy landed if you acquired it. Then `## Gaps`: every item no source covers, with today's date.

**You are not acquiring anything here** beyond what is cheap: finding and listing is this job. The download happens later, at the Closing of the item that needs it, so the learner's quota is spent one item at a time. The exception is a source short enough to be its own Extrato, which you may copy straight into `fontes/<item>.md` with its URL and date.

## Output

Write the file. Say in your last message only: how many items are covered, how many are in `## Gaps`, and which items you expect to be hard.
