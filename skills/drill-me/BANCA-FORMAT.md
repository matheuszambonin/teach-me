# Ficha da banca Format

One file per banca in `bancas/<banca>.md`. `EDITAL.md` points at the active one with a `Banca:` line. A Carreira that changes banca keeps the old ficha on disk, because the questions already collected were written under it.

The ficha holds **form**: how this banca builds an item. Content never comes from here. A subagent builds it with `subagents/build-banca.md` from the exams already in the workspace, and nobody confirms it.

## The file

```markdown
# Banca: Fundação Ajuri (UFRR)

Stock: 7 exams, 250 questions, 2012 to 2019, newest 2019-05

## Formato
Multiple choice, 5 alternatives, A to E. The command asks for the correct one in
about 80% of items and for the incorrect one in the rest, always in bold.
Statements are short, one paragraph at most.

## Nota
No deduction for a wrong answer. Blank is worth zero. Only applies while no
edital exists: with an edital, `## Scoring` in `EDITAL.md` wins.

## Tempo
4 minutes per question, from the exam's own time over its question count. Only
applies while no edital exists.

## Fontes
- Prefeitura de Alto Alegre 2014, Analista Ambiental: `questoes/ajuri-2014-alto-alegre-analista/`
- EMHUR 2012, Engenheiro: `questoes/ajuri-2012-emhur-engenheiro/`

## Padrões

### Literal da lei trocada por um sinônimo
The statement copies the article word for word and swaps one term for a near
synonym that changes the rule. Seen in `questoes/ajuri-2014-alto-alegre-analista/q27.md`.
Occurrences: 9.

### Lista com um item a mais
An enumeration that the law closes, given with one extra plausible entry.
Seen in `questoes/ajuri-2012-emhur-engenheiro/q41.md`. Occurrences: 5.
```

## The five sections

- **`## Formato`**: item type, number of alternatives, and what the command asks for, the correct or the incorrect one.
- **`## Nota`**: the scoring rule and the deduction for a wrong answer.
- **`## Tempo`**: minutes per question, taken from the exam itself.
- **`## Fontes`**: the exams that produced this ficha, with body, cargo and year, each pointing at its folder. This is how a banca with no history in the cargo is handled: there is no special rule, the section simply shows where the ficha came from.
- **`## Padrões`**: one subsection per Padrão, with its name, how the item is built, **at least one Questão real cited by its path in the workspace**, and the occurrence count.

The `Stock:` line at the top carries the age of the question stock, so the learner reads "o molde da Ajuri tem oito anos" here and not on exam day.

## Rules

- **Nota and Tempo describe the banca in general and lose to the edital.** They apply only while no edital exists, or under a provisional one. With an edital, `## Scoring` in `EDITAL.md` sets the rule and the pace, and a correction run without an edital says in one line that the rule has not been checked against one.
- **A Padrão enters only with a real question cited by path.** A pattern from a cram-school blog with no real item behind it stays out. This is the whole evidence rule, and it is why nobody needs to confirm the ficha.
- **A banca with no exam in the workspace** gets a ficha with `## Formato`, `## Nota` and `## Tempo` from the edital, no `## Padrões`, and **no synthetic question is written for that banca until an exam arrives**. Send a subagent with `subagents/find-provas.md`.
- **The learner reads the Padrões in plain words**, and the word "Padrão" is not one of them: say "o jeito que essa banca costuma montar a pegadinha dessa matéria", or name the trap itself.
- **Occurrence counts are updated at Closing**, with the errors that landed in each Padrão.
- **New Padrões are written at Closing**, when two or more errors recorded as `none` share a trait, in the same Simulado or across Simulados. Cite the real questions, tell the learner in one line, and merge the records per `LEARNING-RECORD-FORMAT.md`. Nobody confirms it.
- **Form always comes from the active banca.** Content may come from an Âncora in another banca; that is the Questão recondicionada, and it is in [QUESTION-FORMAT.md](./QUESTION-FORMAT.md).
- Written in the learner's language. The section headings and the `Stock:` and `Banca:` labels stay in English.
