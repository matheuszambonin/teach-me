# `EDITAL.md` Format

`EDITAL.md` lives at the workspace root and holds the **Edital ativo**. It is the curriculum: one line per numbered topic of the edital, plus the scoring rule the exam is marked by. Everything triage decides, everything the Painel draws and everything a Simulado is scored with starts here.

The Opening reads this whole file, so it stays near 2 thousand tokens. The full text of each item lives in `edital/itens-do-edital.md` and is read only when you write that item's lesson or Extrato.

## The file

```markdown
# Edital ativo

Source: CAER 01/2026, Edital 03/2026 consolidado, 2026-07-22, cargo 18 Geólogo
Status: final
Exam: 2026-11-22
Full text: edital/itens-do-edital.md

| Item | Name | Bloco | Weight | Real | Hit | State |
|---|---|---|---:|---:|---|---|
| PT-5 | Gramática do período | Língua Portuguesa | 5.0 | 25 | 3/5 | studied |
| MAT-12 | Lógica de primeira ordem | Matemática e RL | 0.33 edital | 0 | – | new |
| GEO-1 | Geologia Geral | Específicos | 7.62 edital | 0 | – | new |
| GEO-9 | Geotecnia | Específicos | 5.0 manual | 0 | – | cut |

## Scoring
...
```

The column names and the header labels stay in English in every workspace language. The learner hears the `Name`, never the code.

### The header

- **`Source:`** the concurso, the edital number, its date and the cargo. An errata that changes nothing else changes only this line.
- **`Status:`** `final` or `provisional`. A provisional edital is the last edital of the body the learner names as first choice, with the other likely bodies on an `Also likely:` line. The union of every body's items was rejected: it would lengthen the file and tighten the Regime for nothing.
- **`Exam:`** the exam date. `REVIEW-FORMAT.md` cuts the review ladder at it, `SKILL.md` derives the Regime from it.
- **`Full text:`** where the integral text of every item lives.

### The columns

- **`Item`**: one line per numbered topic of the edital, never split and never merged. On the CAER that is 53, and the Regime arithmetic uses that count. **A new edital never reuses a code already used in this workspace**, because the code is the key of `E` in `dados.js` and a reused one would silently inherit another item's answers. Codes may split later as `GEO-1a`, `GEO-1b` when the Painel shows one item eating too many sessions.
- **`Name`**: the item's short name, up to 60 characters. This is what the learner hears.
- **`Bloco`**: spelled exactly as `pontos_por_bloco` spells it in `S`, because the Painel joins on it.
- **`Weight`**: the Peso, the points this item should be worth on the exam. Cascade below. The suffix records where the number came from: no suffix means the banca's incidence, `edital` means the subject count, `manual` means the learner corrected it.
- **`Real`**: how many Questões reais with a gabarito are tied to this item, which is what may enter a Simulado. **A Lacuna is `Real` = 0**, not a state.
- **`Hit`**: correct over answered, from answers corrected in chat. Real and recondicionada count; synthetic, repeated and Branco do not, and a Chute that landed counts as an error. Rewritten at every Closing, and copied to `dados.js` as an `H` line in the same step. **The Painel is the counter, not you**: when it disagrees, it dictates the edit and you make it. Never rebuild this column by reading the `R` lines.
- **`State`**: `new` (never studied), `studied` (had a lesson or practice) or `cut` (left out by Emergência triage). There is no `mastered`: the `Hit` already says that and never goes stale.

## Where the Weight comes from

The points of a Bloco are split among that Bloco's items by the first rung below whose pool holds **10 or more past questions**. The rungs do not add up, and the split always sums to the Bloco's points.

1. **Conhecimentos Gerais**: that Bloco's questions in any exam of the same banca, any cargo. The section is common to every cargo of an exam, so the incidence is real. No suffix.
2. **Conhecimentos Específicos**: same banca **and** same cargo. That section is written for one cargo, so another cargo's incidence is an accident of what you collected. No suffix.
3. **Conhecimentos Específicos, second rung**: the same cargo in any banca. Format does not matter here, because the Ficha da banca owns format. No suffix.
4. **No rung reaches 10, in any Bloco**: split by how many subjects the edital itself names inside each item, from the `Subtopics:` count the subagent wrote into `edital/itens-do-edital.md`. Suffix `edital`.

Incidence with add-one smoothing: an item's share is `(its questions + 1) / (the Bloco's questions + number of items)`, times the Bloco's points. **Incidence counts annulled questions and questions with no gabarito**, because the banca asked them. That makes this pool different from the `Real` column, which holds only what can enter a Simulado.

Recompute the cascade at every Opening, because a Closing that extracted new questions can push a pool past 10. When an item's `origem` changes rung, say so in one line and write the new suffix.

## The `manual` correction

The learner asks in chat ("Geologia Ambiental não cai desse jeito, isso aí é pouco"), you edit that line, mark it `manual`, and rebalance the **other** items of the same Bloco so the Bloco's points still sum. A `manual` weight is never recomputed by the cascade.

- **Floor: 0.1 point per item.** If honouring the request would push another item below it, refuse with the arithmetic on screen: "para o GEO-3 ir a 20 eu teria que deixar quatro matérias abaixo de 0,1. O máximo que cabe é 14,6." The learner picks a number that fits.
- A `manual` weight **does not survive an edital swap**. The new edital gets the cascade, and you say in one line that the manual corrections were dropped.
- The Painel puts a chip on the Peso of every item whose `origem` is not the banca, so a weight the learner set is visible beside one the incidence produced.

## `## Scoring`

Written by `subagents/read-edital.md` from the edital's own text, with each line citing the clause it came from. It is the rule a Simulado is marked by, and it is reread at **every** edital swap, errata included.

```markdown
## Scoring
- Points per Bloco: Língua Portuguesa 10, Matemática e RL 5, ..., Específicos 60 (item 8.11.2)
- Questions per Bloco: Língua Portuguesa 10, ..., Específicos 30 (item 8.2)
- Wrong answer: no deduction (item 8.11.3)
- Blank: zero (item 8.11.3)
- Total time: 4 hours (item 8.4)
- Discursiva: 10 points, 45 minutes reserved (item 9.1)
- Elimination: zero in any Bloco (item 8.11.4 b)
- Nota de corte: unknown, first edition of this concurso
```

Both point and question counts per Bloco are required: without the question counts the two floors of a Simulado completo compute to zero and every Caderno passes silently. The whole section goes into the `S` call of `dados.js` at Session zero and at every swap, with the `desde` date.

## Triage

Each item gets a score, computed on the spot and **never written down**:

`Weight x (1 - estimated hit)`, with `estimated hit = (correct + 1) / (answered + 2)`.

An item never answered sits at 0.5. An item with `Real` = 0 uses its synthetic hit rate, so a Lacuna does not stay at 0.5 forever.

- **Longo and Curto**: take the `new` item with the highest score. With no `new` left, take the highest of all.
- **Emergência**: sort by score and keep the first N, with N = minutes left / 25. Mark the rest `cut`, recompute at every Opening so a `cut` item returns when the date moves. **Lacunas are never cut**, because every Emergência session is a Simulado curto of real questions.
- An explicit request from the learner wins over the queue; say what it displaced.
- When `## Scoring` eliminates on a zero in any Bloco, give every Bloco at least one session before the first Simulado completo.

## An edital swap

**Same concurso** (errata, consolidated version): the subagent compares the item lists. When the content did not move, only `Source:` changes. The CAER did this five times.

**Another concurso**: the subagent proposes an old-item to new-item table by content, and you show the learner a summary per Bloco ("Português passa inteiro; Legislação da CAER não tem par"), not the table. Then, in this order:

1. Write the old file to `edital/antigo/EDITAL-<data>.md`.
2. Write the new `E` lines to `dados.js`, **before** the `X` lines, or every item is retired at once.
3. Append one `X.push({de, para})` per old item, `para: null` for an item with no pair.
4. Append the new `S` with its `desde`, so Simulados taken under the old rule keep the score they had.
5. Learning records with a pair get the new code. Records with no pair get `Item: none`, leave the review ladder and stay on disk; a later edital that brings the item back brings them back.
6. Remap the item lists in `RESOURCES.md`, per `RESOURCES-FORMAT.md`.
7. Say from which date the first Simulado completo becomes possible, per `SIMULADO-FORMAT.md`.

The `Hit` carries over when the pair is one to one, and two items merging add their counts. A split sends everything to the nearest new item: going finer would mean reading the `R` lines.

## Rebuilding this file

If `EDITAL.md` is lost, it comes back from `dados.js` without reading a single answer. The procedure is in [DADOS-FORMAT.md](./DADOS-FORMAT.md).
