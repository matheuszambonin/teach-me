# Simulado

Read this file in any session that runs a Simulado. `SKILL.md` holds the three rules that apply in every session: readiness counts the questions with an official gabarito behind them, pace comes from the edital, and the curto runs in batches of 5 with no label until correction. Everything else is here.

Files, all under `simulados/`:

- `NNNN-<data>-{curto|completo}.md`: the Simulado itself, written as it runs.
- `NNNN-comentado.md`: the Gabarito comentado, written during correction.
- `NNNN-caderno.pdf`: the printed Caderno of a completo, or `.html` when no browser is there.

## Which questions go in

Questions come from `studied` items in triage order, spread across at least 2 items when possible. An annulled question never goes in. No question appears twice in the same Caderno.

**Repetition has a clock.** A Questão real or recondicionada returns 30 days after it was last asked, marked `repeat`. A synthetic one never repeats in a completo: writing another costs almost nothing, and the review variant already exists to change the correct statement. A `repeat` counts in the Simulado's score and never in `Hit`, because memorising a gabarito would inflate it. In a completo, unseen questions go first and repeats only fill the Cobertura.

**The `Asked:` line** in the question's frontmatter holds the dates it was used. Write it when you open that file to ask the question. It is stock, not score: it tells you which reais of an item are intact and since when, so you never go back to the `R` lines of `dados.js` for it.

**The reserva.** The curto eats the stock of reais week by week, and the completo needs unseen ones. An item with 3 or more reais holds back a third of them, rounded up; an item with 1 or 2 holds back nothing, because there the lesson matters more than the measure. Only in Longo and Curto: Emergência runs no completo and reserves nothing. It is a rule of selection, not a state, so nothing is written to the question file or to `dados.js`. Each Caderno takes from an item at most `held back ÷ completos still ahead`, rounded down, reading `completos_marcados` from the `S`. When no marked completo is left ahead, the reserva dies and everything returns to the curto. When a curto comes out smaller because of it, say so in chat at that moment: "duas reais deste item ficam guardadas para o completo."

## Simulado curto

Sized to what fits in two thirds of the session at the exam's pace, never fewer than 5 questions. It runs in chat, in batches of 5, with no label of any kind. The learner answers a whole batch in one message:

```
1A 2C? 3B 4- 5D
```

`?` is a Chute, `-` is a Branco. Write the batch to disk before sending the next one. No feedback until the end. A resumed Simulado reads the `open` file and continues from the first question with no answer.

Say the total time and ask the learner to set their alarm. Record the system time at the start and at each batch. When time runs out, whatever is left is Branco. Going over does not stop the Simulado, but it counts: at correction, show their pace against the exam's ("4,8 minutos por questão; a prova te dá 3,25").

## Simulado completo

Dates live at the top of `HABIT.md` as `Full mock: 2026-10-20 · 2026-11-10`. Run one in a conversation opened for it alone. The Opening on the day before says what to have ready: paper, pen, alarm, four free hours and the path to the PDF. The log gains `2026-10-20 · full mock · sim-0007 · 38/60 reais`. If the learner misses it, propose another date before the exam and leave the other completos where they are.

**The two floors are in points, not slots.** Counted in slots a floor lies: 30 real Gerais plus 10 Específicos passes comfortably while the Bloco worth two thirds of the points is almost all synthetic. The unit is the point, from `pontos_por_bloco` in the `S`, and only a question that **counts and is unseen** contributes. That single rule blocks both ways of inflating a Caderno. On the CAER the exam is 90 points:

- **Half the points, the cut-off floor.** Below it the completo still happens, the score comes out and the hit rate per item comes out, and the cut-off line is not drawn. The screen says why, with both numbers.
- **A third of the points, the scheduling floor.** Below it the completo does not enter `HABIT.md` at all, and the skill says what is missing: how many Closings of preparation, or how many days until the 30-day clock releases the stock.

A recondicionada written for that Caderno is unseen by construction, so the preparation window feeds the floor directly.

**The preparation window, because a recondicionada costs quota.** It takes 3 to 4 turns at Preparo and the weekly Balde is about 140 turns, so building 25 of them the day before would eat half a week in one task. Marking a completo opens a window: every Closing between the marking and the date produces up to 4 recondicionadas for the items that will fill that Caderno, on top of the one Preparo already makes. A completo is marked only when enough Closings are left ahead for the arithmetic to work, and the skill says how many are missing. No Caderno is built the day before.

**The synthetic ceiling and the meio caderno.** A synthetic question fills at most one slot for each question that counts, so the Caderno is never more than twice what counts. Above that ceiling the exam's shape holds. Below it the Caderno shrinks, the time shrinks in the same proportion, and the learner is told it is half a Caderno. When the learner turned synthetic questions off at Session zero, the completo always shrinks: it does not step over their switch.

**After an edital swap** nothing new applies. The reserva is recomputed over each new item's unanswered reais, the 30-day clock releases the inherited stock with the calendar, and the scheduling floor keeps a completo off the calendar until it can be met. What the learner gets instead of a weak Caderno is one sentence: the date from which the first completo of the new edital becomes possible.

**The Caderno.** Numbered questions, time and scoring rule on top, no gabarito and no labels. Write it as HTML with `assets/caderno.css`, then print it:

```
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --no-pdf-header-footer --print-to-pdf="<absolute out.pdf>" "<absolute in.html>"   # Windows
chromium --headless --no-pdf-header-footer --print-to-pdf="<absolute out.pdf>" "<absolute in.html>"   # Linux
```

Four things that command will not forgive, measured on Windows with Edge 153 on 2026-09-21. `msedge` is not on the PATH, so call the executable by its full path. Both paths must be absolute: a relative input is resolved as a URL (`http://caderno-teste.html/`) and a relative output is written beside the program, which fails with `Acesso negado. (0x5)`. The process must be waited on (`cmd /c` or `Start-Process -Wait`), or you move on before the file exists. And without `--no-pdf-header-footer` every sheet carries the date and the `file:///` path of her workspace, which is what the test PDF came out with; the flag is the documented fix and has not been measured here.

If neither browser is there, hand over the same Caderno as HTML and say in one line how to open it. The learner reads it on screen, answers on paper with the alarm running, then types every answer into one message in the curto's notation. Correct in batches of 10.

Only a completo applies the elimination rules, in one line ("Pela regra 8.11.4 você seria eliminada: zero em Informática"), and only a completo can carry the cut-off line.

## Correction

Give the right answers in one line ("Acertou 1, 3, 4, 7"). For every error, Chute and Branco, give the label the question carried (real, recondicionada or synthetic), the gabarito, the source, the Padrão it fell into or none, why the correct alternative is right, and why the one they marked is wrong. Two or three sentences each. The learner can ask "explica a 4" for any question.

A Chute that lands counts as correct in the Simulado's score, so the score stays comparable to the exam, and counts as an error in `Hit`, in records and in reviews. Show "acertou no chute" separately, and when a wrong answer costs points, show what the guesses earned or cost. A Branco scores what `## Scoring` says, never counts in `Hit` and never makes a record.

Report the score beside the Cobertura, with the composition: "38 de 60 vagas, 34 inéditas: 16 reais, 11 recondicionadas, 33 sintéticas." Say the score out loud; the Painel computes its own, which makes yours checkable.

Per batch, write two things before moving on: one `R.push({...})` per corrected answer in `dados.js`, and that batch's entries in the Gabarito comentado. Never postpone either to the end of the correction, because that is what a dead conversation takes with it.

## Gabarito comentado

`simulados/NNNN-comentado.md`, one per Simulado that had at least one error, Chute or Branco. A Simulado with none produces no file, and correction says so in one line. It comes from the curto and the completo, including the diagnostic of session 1 and every Emergência session, where it is the study material that is left. Loose practice and reviews make no file: there what remains is the learning record.

It is the text of the correction, written down. There is no second pass and no improved version later.

**Header.** The Simulado's number and date, its type, how many questions and how many counted, the Cobertura, the learner's pace against the exam's, and on a completo the elimination line. The score appears as text, because it is what the learner heard; the Painel still owns the number. Then one fixed line naming the items with two errors whose records carry Padrão `none`: that this is base, that drill-me does not teach base, and how to call `/teach-me <assunto>`. Say that line once in chat when you hand the file over. One line per named item goes to `NOTES.md`.

**One entry per error, Chute and Branco.** Clean hits appear only as a line of numbers at the top. Each entry carries the label, the statement and alternatives copied, the learner's answer with its Chute or Branco mark, the gabarito, why the correct alternative is right, why the one they marked is wrong, the Padrão or none, and where the gabarito comes from:

| Question | Source of the gabarito |
|---|---|
| Real, item has an Extrato | the Extrato, with book and page |
| Real, item has no Extrato | explain anyway, mark the entry as not checked against a source, and put that item at the head of the queue for the next Preparo's Extrato |
| Recondicionada | the Âncora, with banca, year, body and cargo, saying the question was rebuilt |
| Sintética | the Extrato passage it was written from |

An "explica a 4" on a question the learner got right enters in that question's position, marked as asked by them. It is the only text here that costs new generation, and they are the one who chose to pay for it.

**End of the file.** A short block for this Simulado alone: one line per Item do edital with errors out of total, and one line per Padrão with its count. Curves and running totals belong to the Painel.

**It is a reference, never a task.** Rereading a correction is passive study, and the measure of retention is still the review asking a synthetic variant. Nothing in the Opening tells the learner to reread it. The learning record points at it with `Comentado: simulados/0007-comentado.md #12`, gaining a second reference each time that record reopens, and the list of those references is what shows the learner falling into the same Padrão.

**It is frozen.** Never rewritten, never remapped at an edital swap. The one permitted addition is a dated note at the end of an entry when a question becomes `gabarito: contestado`: the old text stays, because the learner needs to know that what they read has changed. Say the path in one line at the end of correction; the Closing does not mention the file.

**Writing.** No humanizer: the Escrita section reads it only to write a lesson, at Preparo, and this file is born mid-session. The plain words of the Escrita section apply, and the two or three sentences per question are the limit.
