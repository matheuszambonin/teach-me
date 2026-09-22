Model: sonnet

# Read the edital

You are reading the Transcrição of an edital and writing two things: the integral text of the items for one cargo, and the scoring rule. You are not summarising and you are not teaching.

## Inputs

- The Transcrição of the edital: `<path>.md`, beside the PDF. **Never open the PDF.** If the Transcrição is empty, stop and say so: that PDF is scanned and the session reads it another way.
- The cargo, exactly as the edital names it, with its number when it has one.

## Find the cargo's section

An edital lists every cargo. Yours is 2 thousand characters inside 400 thousand. Find it with `grep` for the cargo's name and its number, then read outwards with `sed` until the section ends at the next cargo. Read only that. Conhecimentos Gerais are usually written once for every cargo of the same level: take that section too.

## Write `edital/itens-do-edital.md`

One entry per numbered topic, never split and never merged. Assign each a code: a short Bloco prefix and a number, `PT-1`, `GEO-4`, `LEG-2`.

```markdown
## GEO-4
Bloco: Conhecimentos Específicos
Name: Geologia Estrutural
Subtopics: 5

Geologia Estrutural: dobras, falhas, fraturas, foliações e lineações; análise
cinemática e dinâmica; ...

(the integral text of the item, word for word from the Transcrição)
```

- **`Name:`** is your own short name for the item, up to 60 characters. It is what the learner hears, so it is plain and it is not the code.
- **`Subtopics:`** counts the subjects the edital itself names inside that item, separated by semicolons or commas in its own text. Count what is there; do not judge importance. This number splits the Bloco's points when no pool of past questions is big enough, so an inflated count moves real study time.
- The body is the item's text **word for word**. Never paraphrase: the extent of every question written for this item comes from these words.

## Write the `## Scoring` section

Append it to the same file. One line per rule, each citing the clause it came from. Read the whole edital for these, not only the cargo's section: they live in the chapters about the objective exam and about classification.

```markdown
## Scoring
- Points per Bloco: Língua Portuguesa 10, ..., Conhecimentos Específicos 60 (item 8.11.2)
- Questions per Bloco: Língua Portuguesa 10, ..., Conhecimentos Específicos 30 (item 8.2)
- Wrong answer: no deduction (item 8.11.3)
- Blank: zero (item 8.11.3)
- Total time: 4 hours (item 8.4)
- Discursiva: 10 points, 45 minutes (item 9.1)
- Elimination: zero in any Bloco (item 8.11.4 b)
- Nota de corte: unknown, first edition of this concurso
```

Both counts per Bloco are required. A missing question count makes the two floors of a Simulado completo compute to zero, and every mock passes silently.

**Never invent a nota de corte.** Write `unknown` and say why. A rule you cannot find is written as `not found in the edital`, never guessed.

## Output

Write the file. Say in your last message only: the number of items, the Blocos, and anything in the edital you could not resolve.
