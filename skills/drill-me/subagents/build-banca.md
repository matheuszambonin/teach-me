Model: sonnet

# Build the Ficha da banca

You are writing `bancas/<banca>.md` from the exams already in the workspace. The ficha holds **form**: how this banca builds an item. It never holds content.

Read [BANCA-FORMAT.md](../BANCA-FORMAT.md) first. It has the file's shape and its five sections.

## Inputs

- Every question file under `questoes/` whose `banca` is this one. Read the files, not the PDFs.
- The edital, for `## Nota` and `## Tempo` when no edital exists yet.

## The evidence rule

**A Padrão enters only with at least one Questão real of this workspace cited by its path.** No exception. A pattern you remember from elsewhere, or that a cram-school page describes, stays out. This rule is the whole reason nobody has to confirm your work.

For each Padrão: name it for what it does, say in two or three lines how the item is built, cite at least one real question by path, and count the occurrences you actually found.

## Sections

- **`## Formato`**: item type, number of alternatives, what the command asks for (the correct or the incorrect one), and how long statements run. Count, do not impress: "about 80% ask for the correct one" needs the count behind it.
- **`## Nota`** and **`## Tempo`**: from the exams themselves. Say in the file that both lose to `## Scoring` in `EDITAL.md` once an edital exists.
- **`## Fontes`**: every exam that produced this ficha, with body, cargo and year, each pointing at its folder.
- **`## Padrões`**: one subsection each, by the evidence rule above.
- The `Stock:` line at the top: how many exams, how many questions, the year range and the newest one.

## When there is nothing to read

A banca with no exam in the workspace gets `## Formato`, `## Nota` and `## Tempo` from the edital, no `## Padrões`, and a line saying so. Do not invent Padrões from the banca's reputation.

## Output

Write the file. Say in your last message only: how many exams and questions you read, how many Padrões you wrote, and which parts of the edital you had to fall back on.
