# `dados.js`, the calls written once

`dados.js` is the Registro de respostas, and `painel.html` beside it does every calculation. You append calls and never edit, never reorder, never partition and never recalculate. Fields are named, never positional.

This file holds the five calls written once and with time to spare: at Session zero, at an edital swap, at the close of a Simulado and at the `Hit`. The sixth, `R`, is written inside a correction batch and lives in `SKILL.md`, because writing it from memory in the middle of a Simulado would blank the page.

Write this header into a new `dados.js` at Session zero, then the `var` line, then the calls:

```js
// dados.js. O agente só apensa linhas aqui. Nunca edita, nunca reescreve, nunca calcula.
// O painel.html ao lado lê este arquivo e faz todas as contas no navegador.

var E = [], S = [], R = [], M = [], H = [], X = [];
```

## `E`, one per Item do edital

```js
E.push({item, nome, bloco, peso, origem, fonte, real, ancora, estado})
```

Written at Session zero and at every edital swap. The last `E` for an `item` wins.

| Field | Values |
|---|---|
| `item` | the code, `"GEO-1"`. An edital swap never reuses a code already used in this workspace. |
| `nome` | the item's short name, the one the learner hears |
| `bloco` | the Bloco's name, exactly as `pontos_por_bloco` spells it |
| `peso` | the number, from the cascade in `SKILL.md` |
| `origem` | `"banca"`, `"edital"` or `"manual"`, where that number came from |
| `fonte` | `"sim"`, `"nenhuma"` or `null`. `null` is "not looked yet" |
| `real` | how many Questões reais the item has |
| `ancora` | `"sim"`, `"nenhuma"` or `null`. `null` is "not looked yet": the search runs at the item's Preparo, so an item never studied has no answer |
| `estado` | `"new"`, `"studied"` or `"cut"` |

The Painel puts a chip on the Peso column for `origem` other than `"banca"`, and a red **sem fonte** or **sem Âncora** chip on a Lacuna that has neither. `fonte: "nenhuma"` is the terminal case, so it takes the chip when both are missing.

## `S`, the scoring rule and the dates

```js
S.push({fonte, status, desde, inicio, prova, regime, pontos_por_bloco, questoes_por_bloco,
        desconto_errada, valor_branco, minutos_por_questao, sinteticas_no_simulado,
        eliminacao, nota_de_corte, nota_de_corte_nota, completos_marcados})
```

Written at Session zero and at every edital swap.

- `desde` is **required**: the date this rule started to apply. The Painel scores each Simulado by the `S` in force on that Simulado's date, never by the last one, so a Simulado taken under the old edital keeps the score it had. A missing `desde` is a `dados.js` from before the swap was designed, and the page stops.
- `inicio` is the start of the Carreira. It is the "começou em" at the top and the graph's axis, and it does not move at a swap.
- `pontos_por_bloco` and `questoes_por_bloco` are objects keyed by Bloco name. Both are required: without the question counts the two floors of a Simulado completo are zero and every Caderno passes.
- `eliminacao` is a list of rules, each with `regra`, `tipo`, `texto` and whatever that type needs (`bloco` and `minimo` for `nota_minima_no_bloco`, `minimo` for `nota_minima_total`). A `tipo` the page does not know stops it, rather than passing the learner without looking.
- `nota_de_corte` is a number or `null`, with `nota_de_corte_nota` saying why when it is `null`. Never estimate one.
- `completos_marcados` is the list of dates from `Full mock:` in `HABIT.md`. The reserva reads it to know how many Simulados completos are still ahead.

## `X`, the remapping of an edital swap

```js
X.push({de, para})
```

Appended at the moment of the swap, when both tables are in front of you. It is item to item, never question to question.

- Two `de` pointing at the same `para` make the page add the counts, which is how two items becoming one works.
- `para: null` retires an item with no pair, the same `Item: none` the orphan learning records get.
- Every code that appears as a `de` leaves the active set, so the old edital's items stop showing on the Painel.
- A split, one old item becoming two new ones, sends everything to the nearest new item. Going down to the question would mean reading the `R` lines.
- Write the new items' `E` lines **before** the `X` lines, or every item of the edital is retired at once.

Answers left with no pair after this appear in a "respostas fora do edital" line instead of evaporating.

## `M`, one per Simulado

```js
M.push({num, data, tipo, cobertura})
```

Written when the Simulado closes. `num` is `"sim-0007"`, `tipo` is `"curto"` or `"completo"`, and `cobertura` is the pair `[slots filled, slots in the exam]`. It carries **no score**: the page computes the score, the composition, the elimination line and the lucky guesses from the `R` lines plus the `S` in force. The table of Simulados links `simulados/NNNN-comentado.md` from `num`.

## `H`, a copy of the `Hit` you wrote

```js
H.push({item, certas, total})
```

One per item, at Closing, right after you write that item's `Hit` into `EDITAL.md`. The last `H` for an `item` wins. Real and recondicionada count; synthetic, repeated and Branco do not, and a Chute that landed counts as an error.

The page counts the same thing from the `R` lines and draws both side by side, so an arithmetic slip shows instead of staying silent. When they disagree it dictates the edit. Make that edit and read nothing else.

## Rebuilding a lost `EDITAL.md`

Everything but one field comes back without reading a single `R` line. Read the file with `grep -v '^R.push'`, which is about 3 thousand tokens and does not grow with use: `item`, `nome`, `bloco`, `peso`, `origem`, `real` and `estado` come from the `E` lines, the header and `## Scoring` from `S`, and the `Hit` column from the block under the Painel's table. The one field with no home there is `Subtopics:`, which a subagent recounts from the edital's Transcrição. This is a disaster operation and it may cost two minutes.
