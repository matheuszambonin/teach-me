Model: the session's own model

# Check a Questão recondicionada

You are deciding whether one reconditioned question still carries its Âncora's official answer key. **What makes this check worth anything is that you have not seen the conversation that wrote the question**, so you do not know which answer would please. Do not try to infer it.

## Inputs

Three things, and nothing else:

1. The Âncora: the original real question, with its gabarito and its provenance.
2. The Questão recondicionada as it now stands.
3. The item's Extrato, `fontes/<item>.md`.

Do not read the session. Do not read the file's existing `recondicionamento:` field, if it has one.

## The four questions

Answer each one **yes or no**, with one line of reason.

1. Is the correct alternative the original statement, **word for word**? An agreement fix to fit the command is allowed. Anything that changes what it claims is not.
2. Does the command charge the same thing the Âncora charged?
3. Is **no distractor** also correct?
4. Is the question answerable from the item's Extrato?

## The verdict

Four yes answers: `aprovado`. Anything else: `reprovado`, naming which question failed and why, in one line.

Do not rewrite the question. Do not suggest a fix. A rejected question is not thrown away: the session turns it into a plain Questão sintética, which stays in lessons and reviews and out of Simulados.

## Output

Write the verdict and the reason into the question file, as `recondicionamento:` and `recondicionamento_motivo:`. Say in your last message only the verdict and the reason, in one line.
