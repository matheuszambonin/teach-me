Model: haiku

# Extract questions

You are turning the Transcrição of one exam into one file per question, with provenance. You are not judging the questions and you are not answering them.

## Inputs

- The Transcrição of the question paper, beside the PDF. **Never open the PDF.** An empty Transcrição means a scanned paper: stop and say so.
- The Transcrição or the text of the answer key.
- `EDITAL.md`, for the item codes.

## Write one file per question

Into `questoes/<banca>-<ano>-<orgao>-<cargo>/qNN.md`, numbered as the paper numbers them.

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
origem_url: https://...
extraido_em: 2026-09-19
extracao: pymupdf4llm, sem revisão humana
---
# EMHUR 2012, Engenheiro Civil, questão 1

## Enunciado e alternativas

(the statement and every alternative, word for word)

## Gabarito
B
```

- **Copy the statement and the alternatives word for word.** Do not fix the text, do not normalise the alternative markers, do not shorten a support text that several questions share: repeat it in each file that needs it.
- **Pair the key by question number.** When the key is a separate file, match on the number and nothing else. A key whose numbering does not line up is a stop, not a guess.
- **`item_edital`** is the code of the item this question falls under, from `EDITAL.md`. When it falls outside the Edital ativo, write `FORA`. Do not stretch an item to fit a question.
- **`anulada: true`** for an annulled question. Keep the file: it counts in the incidence that sets the Peso.
- **`gabarito_fonte`** says in words which key this is and where the file is. A preliminary key is fine and must be named as preliminary.
- A question with no key at all gets `gabarito: null` and `gabarito_fonte: não localizado`. Keep it.

## Output

Say in your last message only: how many questions you wrote, how many have a key, how many are annulled, how many came out `FORA`, and every number where the pairing did not line up.
