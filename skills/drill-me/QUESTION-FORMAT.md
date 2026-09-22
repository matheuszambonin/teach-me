# Question Format

One file per question, whatever its kind. Four kinds live in four places:

| Kind | Folder | Official gabarito behind it | Enters a Simulado | Counts in the score |
|---|---|---|---|---|
| Questão real | `questoes/<banca>-<ano>-<orgao>-<cargo>/qNN.md` | yes | yes | yes |
| Âncora | `questoes/ancoras/` | yes, but another banca's shape | no | no |
| Questão recondicionada | `questoes/recondicionadas/rNNNN.md` | yes, through its Âncora | after the check passes | yes |
| Questão sintética | `questoes/sinteticas/sNNNN.md` | no | only if the learner turned them on | no |

The kind is a `tipo:` field in the frontmatter, never the folder path. The Painel reads `R.tipo`, and a measure of readiness that depends on a string in a path breaks the day a folder is renamed.

## Questão real

Written by `subagents/extract-questoes.md`, one file per question, from the Transcrição of an exam.

```yaml
---
tipo: real
banca: Fundação Ajuri
orgao: EMHUR (Prefeitura de Boa Vista)
ano: 2012
cargo: Engenheiro Civil
numero: 1
gabarito: B
anulada: false
gabarito_fonte: gabarito preliminar da banca (Edital 049/2012, arquivo em provas/; definitivo não localizado)
item_edital: PT-1
arquivo_pdf: provas/2012-emhur-boa-vista/caderno-engenheiro-civil.pdf
origem_url: https://www.ajuri.org.br/...
extraido_em: 2026-09-19
extracao: pdftotext em ordem de leitura, sem revisão humana
Asked: 2026-10-02, 2026-11-04
---
# EMHUR 2012, Engenheiro Civil, questão 1

## Enunciado e alternativas
...

## Gabarito
B
```

- **`item_edital`** is the code from `EDITAL.md`, or `FORA` when the question falls outside the Edital ativo. A `FORA` question stays: it never enters a Simulado, and it does count in an Amostra de nível, which measures level and form, not content.
- **`gabarito_fonte`** says where the answer key came from, in words, with the file it is in. **A preliminary key counts**: the question enters Simulados, `Hit` and records like any other, because waiting for the definitive one would empty the stock. Say so in the provenance line only when the learner contests.
- **`anulada: true`** keeps the question out of Simulados. It still counts in the incidence that sets the Peso, because the banca asked it.
- **`Asked:`** is the dates this question was shown, appended by the same agent that opened the file to ask it, in the moment. It is stock, not score: it never sums a hit and never produces a number the Painel also computes. The 30-day rule and the reserva read it.
- **A question is real only with banca, year, body, cargo and number.** Without all five, never present it as real.

## Âncora

A Questão real of another banca or another cargo, kept for its **content**: the cut and the depth with which that item is charged.

- **Conhecimentos Específicos**: the same cargo, any banca.
- **Conhecimentos Gerais**: the same subject in any higher-education exam, any banca, any cargo. Português at higher level is Português.
- **Choose by recency**, never by how hard it looks. Ranking questions by difficulty is exactly where you would invent with confidence.

Same frontmatter as a real question plus `tipo: ancora`, and it keeps full provenance, because everything written from it inherits that provenance. An Âncora is never shown as a question of the active banca.

## Questão recondicionada

An Âncora with its packaging changed to the active banca's form. **Only the packaging changes.**

```yaml
---
tipo: recond
ancora: questoes/ancoras/a0007.md
banca_forma: Fundação Ajuri
modelo: questoes/ajuri-2014-prefeitura-de-alto-alegre-analista-ambiental/q27.md
item_edital: GEO-4
gabarito: C
gabarito_fonte: gabarito oficial da Âncora (FGV, EPE 2024, questão 31)
distratores_reais: 3
recondicionamento: aprovado
recondicionamento_motivo: as quatro respostas do check vieram sim
Asked: 2026-10-14
---
```

**The mechanics**, best source of distractors to worst:

1. **Âncora with 5 alternatives**: reconditioning is *cutting one wrong alternative*. The distractors were written by the origin banca, so almost nothing is lost.
2. **Âncora of the certo/errado kind**: the correct item becomes the correct alternative, and the distractors come from *other wrong statements of the same exam on the same subject*, which are also the banca's.
3. **Not enough real distractors**: you write what is missing.

**The floor**: under **two** real distractors it is not a recondicionada. It becomes a Questão sintética with an Âncora. `distratores_reais:` records the count, so the quality is measured in the file instead of promised in prose.

**Transfer of the gabarito**: the correct alternative is **copied word for word** from the Âncora, with at most an agreement fix to fit the command. Cutting and reordering alternatives is allowed. Rewriting the correct statement is not: the origin gabarito no longer transfers and the question falls to sintética, which must cite the Extrato like any other. At correction, the justification cites both the origin gabarito and the Extrato passage.

**The check** is a subagent that has not seen the conversation that wrote the question, so it does not know which answer would please. It gets the Âncora, the recondicionada and the four closed questions in `subagents/check-recondicionada.md`:

1. Is the correct alternative the original statement, word for word?
2. Does the command charge the same thing the Âncora charged?
3. Is no distractor also correct?
4. Is the question answerable from the item's Extrato?

The verdict and its reason go into the file, so it can be rechecked without being redone. **A rejected one is not thrown away**: it becomes a plain sintética, `tipo: sint`, and stays in lessons and reviews, out of Simulados.

## Questão sintética

Written when the item has no Âncora, when the distractor floor failed, or as a review variant from the second time a record is charged.

```yaml
---
tipo: sint
modelo: questoes/ajuri-2014-prefeitura-de-alto-alegre-analista-ambiental/q27.md
padrao: Literal da lei trocada por um sinônimo
item_edital: LEG-5
ancora: nenhuma
amostra_de_nivel:
  - questoes/ajuri-2014-prefeitura-de-alto-alegre-analista-ambiental/q12.md
  - questoes/ajuri-2012-emhur-engenheiro-civil/q41.md
  - questoes/ajuri-2018-caer-tecnico/q08.md
fonte: fontes/LEG-5.md
gabarito: D
variante_de: learning-records/0012-prazo-de-notificacao.md
Asked: 2026-10-21
---
...
## Gabarito
D

## Passagem que sustenta o gabarito
> Art. 12. O prazo é de quinze dias, contados da notificação.
— `fontes/LEG-5.md`, Estatuto Social da CAER, art. 12
```

- **Form** comes from `modelo:`, a named Questão real of the **active** banca.
- **Extent** comes from the `Subtopics:` the edital names for that item. The question asks nothing the item does not name.
- **Depth** comes from the **Amostra de nível**: 3 to 5 Questões reais of the same Bloco, active banca, any cargo, most recent first, handed to the writer as "at the level of these", with their paths in the frontmatter. Depth never comes from the source, where a graduate lecture note would produce a doctorate question for a 30-question exam. With fewer than three available, use what there is; with none in the Bloco, fall back to the banca's whole stock and record in the file that the sample came from another Bloco.
- **`ancora: nenhuma`** marks an item that has none. The Painel marks that item, because that is where you invent most and the learner deserves to know.
- **Instead of a check, a lock**: the file carries the **passage of the Extrato its answer comes from, copied word for word** beside the gabarito, with where it came from. **Without that passage the question is not written.** It costs no quota and it attacks the real failure, which is inventing the answer and citing the Extrato out of politeness.
- **`variante_de:`** points at the learning record this variant reviews. Append the file's path to that record's `Variants:` line.

## In chat

Every question opens with a provenance line **in the same position, whatever its kind**:

- "Questão real: Ajuri, Prefeitura de Alto Alegre 2014, Analista Ambiental, questão 27"
- "Questão recondicionada: montei a partir de uma questão da FGV, EPE 2024, no formato da Ajuri"
- "Questão sintética, no modelo de Ajuri, Alto Alegre 2014, questão 27"

Labelling only some kinds would make a missing label mean real. **Inside a Simulado nothing is labelled until correction.**

## A contested gabarito

The learner says the answer key is wrong. This is the one branch that costs something, and it is why sources are acquired into the Carreira before they are quoted.

1. Reread the passage in `fontes/<item>.md` and the original in `material/`, and say which one the key rests on.
2. **The learner is right**: write `gabarito_contestado:` into the question's frontmatter with the date, the learner's reasoning and the new key, and correct `gabarito:`. Add a dated addendum to the Gabarito comentado, which is otherwise frozen. The `R` lines already written are **not** rewritten: `dados.js` is append-only, and one question's key is not worth a second counter.
3. **The key holds**: say why, quoting the passage. Write nothing.
4. **The source does not settle it**: mark `gabarito_contestado: em aberto`, keep the question out of the next Simulado, and put the item at the front of the queue for the next Extrato.

A preliminary key that a definitive one later contradicts follows the same path, with `gabarito_fonte:` rewritten.
