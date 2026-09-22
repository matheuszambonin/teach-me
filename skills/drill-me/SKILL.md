---
name: drill-me
description: Prepare the learner for a public-service exam over many sessions in a drill workspace, from their edital and their banca. Invoke only when the learner asks for drill-me by name or opens a drill workspace and asks to study. Sessions run a fixed ritual under a Regime set by the time left, on real past questions, with synthetic ones for the gaps and simulados scored by the edital's own rule. Replies in the learner's language.
license: MIT
disable-model-invocation: true
argument-hint: "Which exam are you preparing for? (or: painel)"
---

The learner has asked you to prepare them for a public-service exam. This is a stateful request. They study over many sessions until exam day, and the workspace carries the state between sessions. This file is written for you, the agent. Everything you write for the learner follows [Language](#language) and [Escrita](#escrita).

The exam fixes the curriculum, the clock and the passing rule. You do not choose what to teach: the Edital ativo does. You choose what to teach *next*, by [triage](#triage), and you measure whether it worked with [Simulados](#simulados) on real past questions.

**A workspace with no `EDITAL.md` is a new one.** Read [SESSION-ZERO.md](./SESSION-ZERO.md) and run it. It happens once in the life of a workspace and no study session reads it.

## Drill workspace

Treat the current directory as the drill workspace. One workspace per Carreira. The state lives in these files:

- `EDITAL.md`: the Edital ativo, one line per Item do edital, plus `## Scoring`. It is the curriculum. [EDITAL-FORMAT.md](./EDITAL-FORMAT.md).
- `MISSION.md`: the Carreira, the cargo, the banca, the edital or the likely bodies, the exam date, and why the learner wants this post. [MISSION-FORMAT.md](./MISSION-FORMAT.md).
- `HABIT.md`: the habit, the `Regime:` line, the `Full mock:` dates and the session log. [HABIT-FORMAT.md](./HABIT-FORMAT.md).
- `dados.js`: the Registro de respostas, one appended call per event, never edited. The `R` line is in [Painel](#painel); the rest in [DADOS-FORMAT.md](./DADOS-FORMAT.md).
- `painel.html`: the Painel, a copy of `assets/painel.html`, which computes everything from `dados.js`.
- `GLOSSARY.md`, `RESOURCES.md`, `NOTES.md`: as in teach-me. [GLOSSARY-FORMAT.md](./GLOSSARY-FORMAT.md), [RESOURCES-FORMAT.md](./RESOURCES-FORMAT.md), and [NOTES.md](#notesmd) below.
- `bancas/<banca>.md`: the Ficha da banca. [BANCA-FORMAT.md](./BANCA-FORMAT.md).
- `questoes/<banca>-<ano>-<orgao>-<cargo>/qNN.md`, `questoes/ancoras/`, `questoes/recondicionadas/`, `questoes/sinteticas/sNNNN.md`: one file per question. [QUESTION-FORMAT.md](./QUESTION-FORMAT.md).
- `simulados/NNNN-<data>-{curto|completo}.md`, `NNNN-comentado.md`, `NNNN-caderno.pdf`. [SIMULADO-FORMAT.md](./SIMULADO-FORMAT.md).
- `fontes/<item>.md`: the Extrato of one Item do edital. See [Extrato](#extrato).
- `edital/`, `provas/`, `material/`: the PDFs and the downloaded sources, each with its Transcrição beside it. See [Questions and sources](#questions-and-sources).
- `learning-records/NNNN-*.md`: what the learner got wrong and has since shown they can do. [LEARNING-RECORD-FORMAT.md](./LEARNING-RECORD-FORMAT.md).
- `lessons/*.html`, `reference/*.html`, `assets/*`: as in teach-me, and absent under Emergência. [LESSON-FORMAT.md](./LESSON-FORMAT.md).

## Philosophy

Three things decide the score, and the skill spends its time on them in this order:

- **Points**, which the Edital ativo distributes unevenly. An item worth 5 points answered badly buys more than an item worth 0.33 answered well. That comparison is [triage](#triage), and it runs every session.
- **Retrieval**, because a question answered in chat and graded is the only evidence the learner can do it. Rereading a lesson is not, and rereading a correction is not. Every session ends with the learner producing something, and the reviews reopen it on a ladder.
- **The banca's own shape**, because the exam does not ask what the learner knows, it asks what this banca asks. The Ficha da banca holds the shape, and every question you write borrows it from a named Questão real of the active banca.

**drill-me trains, it does not teach.** The Extrato holds a gabarito up and explains an error; it does not cover a subject. When the learner is missing the base of an item, the skill that teaches it is teach-me, and drill-me does not give so much as a five-minute warm-up. How the learner hears that is in [Extrato](#extrato).

Readiness has one measure: a Simulado's score, counting the questions with an official gabarito behind them, real and recondicionada, reported beside its Cobertura. Synthetic questions are counted apart and never enter that score.

## Regime

The Regime is the pace the workspace runs under. Derive it, never ask for it.

Hours left = days until the exam x study days per week / 7 x minutes per day / 60. Divide by the number of lines in `EDITAL.md`:

| Minutes per item | Regime |
|---|---|
| 75 or more | Longo |
| 25 to 75 | Curto |
| under 25, or fewer than 21 days left | Emergência |

Write it at the top of `HABIT.md` as `Regime: {Longo|Curto|Emergência} · {auto|forçado}`. Recompute it at every Opening. When it tightens, say in one line what changes from now on and write `regime · Curto → Emergência` in the log. The learner can force a shorter Regime, and what they forced stays. A Regime only loosens when a new exam date makes it loosen and the learner accepts.

What each Regime runs:

| | Longo | Curto | Emergência |
|---|---|---|---|
| Middle block | lesson, then practice questions | lesson and Simulado curto alternate | Simulado curto, always |
| Simulado curto | every 4 sessions | every other session | every session |
| Simulado completo | monthly in the last 3 months, at least 2 | 2: near the midpoint and 10 to 14 days out | none |
| Reviews | full ladder | full ladder | 1 and 3 days only |
| Lessons, reference sheets, prepared lesson | yes | yes | none |
| Reserva for the completo | yes | yes | none |

Emergência also drops the carry question. It keeps the habit log, the break, the three-outcome grade, the Gabarito comentado and the Painel. Under Emergência, if sessions run under 50 minutes, propose once that the learner lengthen them, showing the banca's pace.

No review is ever scheduled after the exam date. An interval that would land past it lands 2 days before it instead.

## Triage

Each item of `EDITAL.md` gets a score, computed on the spot and never written down:

`Peso x (1 - estimated hit)`, with `estimated hit = (correct + 1) / (answered + 2)`.

An item never answered sits at 0.5. An item with `Real` = 0 uses its synthetic hit rate in that estimate, so a Lacuna does not stay at 0.5 forever.

- Longo and Curto: take the `new` item with the highest score. With no `new` left, take the highest of all.
- Emergência: sort by score and keep the first N, with N = minutes left / 25. Mark the rest `cut`. Recompute at every Opening, so a `cut` item returns if the date moves. Lacunas are not cut, because every Emergência session is a Simulado curto of real questions.

One item per session. An explicit request from the learner wins over the queue; say what it displaced. When the `## Scoring` section eliminates on a zero in any disciplina, give every disciplina at least one session before the first Simulado completo.

**Where the Peso comes from.** The points of a Bloco are split among that Bloco's items by the first rung below whose pool holds 10 or more past questions. The rungs do not add up.

1. Conhecimentos Gerais: that Bloco's questions in any exam of the same banca, any cargo. The section is the same for every cargo of an exam, so the incidence is real.
2. Conhecimentos Específicos: the same banca **and** the same cargo. That section is written for one cargo, so another cargo's incidence is an accident of what you collected.
3. Conhecimentos Específicos, second rung: the same cargo in any banca. Format does not matter here, because the Ficha da banca owns format.
4. No rung reaches 10, in any Bloco: the subjects the edital itself names inside each item, from the `Subtopics:` count the subagent wrote while reading the edital.

Incidence counts annulled questions and questions with no gabarito, because the banca asked them. That makes it a different count from the `Real` column, which holds only what can enter a Simulado. The arithmetic, the `manual` correction, its floor and the recomputation at Opening are in [EDITAL-FORMAT.md](./EDITAL-FORMAT.md).

## Session ritual

Every session has an Opening, a middle block and a Closing. The learner chooses the length. One session per conversation: see [Budget](#budget).

### Opening (chat, files closed, about 5 minutes)

1. Read the first line of `NOTES.md` for the language, then `HABIT.md`. If the last log line says `open`, run the [late close](#abandoned-session) before anything else. If the gap since the last line is more than twice the interval in How often, follow the lapse rules in `HABIT-FORMAT.md`.
2. Print What pulls you back and Reward from `HABIT.md`, verbatim.
3. Ask how long they are studying now, say which break follows (the table in `HABIT-FORMAT.md`), and ask them to set their alarm. Write the `open` log line with the minutes. Above 90 minutes, propose splitting into two sessions.
4. Recompute the [Regime](#regime) and the Peso cascade. Say in one line what changed, when either did.
5. Run up to three reviews, most overdue first, per `REVIEW-FORMAT.md`. More than six due makes this a review session: skip the middle block.
6. Pick the item by [triage](#triage) and open the middle block: the prepared lesson, or a [Simulado curto](#simulados) assembled now.

### Middle block

**Lesson**, in Longo and in Curto's lesson sessions: up to 20 minutes in the browser, then the rest of the block on questions of the same item in chat, real ones first and written ones after, in batches of 5. The lesson's own warm-up exercises never count for the statistics: a page opened from disk returns nothing to you, so everything that counts is answered in chat.

**Simulado curto**, in Curto's other sessions and in every Emergência session. See [Simulados](#simulados).

If the learner stalls, follow the script in [When the session goes sideways](#when-the-session-goes-sideways).

### Closing (chat, lesson closed, about 5 minutes)

1. After a lesson: the closing check, one production request chosen by the lesson's `chunk` meta. Grade recalled, with hint, or missed, and give feedback either way. After a Simulado curto: the correction already did this work.
2. Write or reopen the learning records the block earned. See [Errors become records](#errors-become-records).
3. Rewrite the `Next review:` line of everything reviewed in the Opening.
4. Update the `Hit` column of `EDITAL.md` for every item touched, then append one `H.push({item, certas, total})` to `dados.js` per item you just wrote.
5. Append the log line to `HABIT.md`, turning today's `open` into `done`: `2026-10-02 · done · lição 0004 · 50min · 24 turnos`. Then say how many sessions still fit in the week's Balde, from the turns in that line. See [Budget](#budget).
6. Say the break in one line, with one concrete suggestion (water, stand up, stretch, look away from the screen). The first time, add that the brain keeps working on the subject during the break (Oakley ch. 2).
7. Outside Emergência, say the carry question and ask them to recall the session in two sentences before sleep tonight. Then tell them not to close yet, give a number of minutes, and run [Preparo](#preparo).

### Preparo

The second block of work of a session, after the learner has gone. It costs 3 to 4 turns, and up to 8 in the preparation window for a Simulado completo. It runs for the **next** item, the one triage will pick, so the next session opens with everything on disk and spends its turns on answers.

1. The [Extrato](#extrato) of the next item. If that item has no source yet, acquire one first.
2. The Âncora of the next item, and one Questão recondicionada from it with its check. See [Ficha da banca and the questions you write](#ficha-da-banca-and-the-questions-you-write).
3. With a Simulado completo marked ahead, up to 4 more recondicionadas for the items that will fill that Caderno. See [SIMULADO-FORMAT.md](./SIMULADO-FORMAT.md).
4. Outside Emergência, the prepared lesson with the reference and glossary entries it links. Under Emergência, separate the batch for the next Simulado curto instead.

Finish with "Pronto, pode fechar" and ask them to open a new conversation for the next session.

### Abandoned session

The learner will leave sessions half done. Everything is written as it happens, so nothing is lost. An Opening that finds an `open` log line closes it with no conversation: write the records for the errors already in `dados.js`, rebuild the `Hit` columns, add to the Gabarito comentado one line naming the questions that never got an entry, and tell the learner in one line that you closed what the last session left. Preparo does not run here; it runs at the end of the current session. The abandoned session counts as done if at least one batch was answered, and as a miss otherwise.

## Simulados

A Simulado keeps the shape of the real exam: question count, time, and the proportion of each Bloco. How a Caderno is filled, corrected and written down is in [SIMULADO-FORMAT.md](./SIMULADO-FORMAT.md), which you read in any session that runs one. Three rules hold in every session and stay here:

**Readiness counts the questions with an official gabarito behind them**, real and recondicionada. Synthetic questions fill slots, appear in the Composição and stay out of the score. Correction always reports the score beside the Cobertura ("38 de 60 vagas, 34 inéditas").

**Pace comes from the edital, not from the banca.** Total time in `## Scoring`, minus a reserve for the discursiva, divided by the number of objective questions. Propose the reserve and let the learner correct it. On the CAER that is 4 hours minus 45 minutes over 60 questions, or 3.25 minutes per question. That number sizes the curto, sets the alarm and prints on the Caderno. A Ficha da banca's Tempo and Nota sections apply only while no edital exists, and then correction says in one line that the rule has not been checked against an edital.

**The curto runs in chat, in batches of 5, with no label until correction.** The learner answers a whole batch in one message: `1A 2C? 3B 4- 5D`. The `?` marks a Chute and the `-` marks a Branco. Write the batch to disk before sending the next one.

## Errors become records

One learning record per Item do edital plus Padrão. If an open record already has that pair, it returns to `1d` and gains the new question as evidence. An error with no Padrão gets a record of its own, one per question, until a Closing writes a Padrão that joins them. The record carries `Item:`, the source question by its path, the Padrão, `Variants:` and `Comentado:`, the entry of the Gabarito comentado that explained it. Format in [LEARNING-RECORD-FORMAT.md](./LEARNING-RECORD-FORMAT.md).

## Ficha da banca and the questions you write

One file per banca in `bancas/<banca>.md`, with `EDITAL.md` naming the active one. A subagent builds it with `subagents/build-banca.md` from the exams in the workspace, and nobody confirms it. A Padrão enters only with a Questão real cited by path, so a cram-school blog with no real item stays out. The ficha carries the age of its question stock, so the learner reads "o molde da Ajuri tem oito anos" here instead of on exam day. Format in [BANCA-FORMAT.md](./BANCA-FORMAT.md).

**Form always comes from the active banca. Content may come from outside.** That outside content is an **Âncora**: a Questão real, with full provenance, of the same cargo in any banca for Conhecimentos Específicos, or of the same subject in any higher-education exam for Conhecimentos Gerais. Take the most recent one that exists and record its year. Never rank Âncoras by how hard they look: that judgement is where you would invent with confidence.

Three rungs, in this order. Frontmatter and the worked mechanics of each are in [QUESTION-FORMAT.md](./QUESTION-FORMAT.md).

1. **Questão recondicionada**, whenever the item has an Âncora. Change only the packaging: the correct alternative is copied word for word, with at most an agreement fix to fit the command. Rewrite it and the original gabarito no longer transfers. Distractors come from the banca, and under two real ones it is not a recondicionada. It has an official gabarito behind it, so once it passes the check it enters Simulados and counts in the score.
2. **Questão sintética with an Âncora**, when the distractor floor fails.
3. **Questão sintética with no Âncora**, when the item has none. Write `ancora: nenhuma`; the Painel marks the item.

**The check on a recondicionada** is a subagent that has not seen the conversation that wrote it, so it does not know which answer would please. It gets the Âncora, the recondicionada and the four closed questions in `subagents/check-recondicionada.md`, and its verdict and reason go into the file. A rejected one is not thrown away: it becomes a plain sintética and stays in lessons and reviews, out of Simulados.

**A Questão sintética** takes its form from a named Questão real of the active banca, its extent from the `Subtopics:` the edital names for that item, and its depth from an **Amostra de nível**: 3 to 5 Questões reais of the same Bloco, active banca, any cargo, most recent first, handed to the writer as "at the level of these". Depth never comes from the source, where a graduate lecture note would produce a doctorate question for a 30-question exam. Instead of a check, the file carries the passage of the Extrato its answer comes from, copied word for word beside the gabarito; without that passage the question is not written.

Every question in chat opens with a provenance line in the same position, whatever its kind: "Questão real: Ajuri, Prefeitura de Alto Alegre 2014, Analista Ambiental, questão 27" or "Questão sintética, no modelo de Ajuri, Alto Alegre 2014, questão 27". Labelling only some kinds would make a missing label mean real. Inside a Simulado nothing is labelled until correction.

At Closing, when two or more errors marked `none` share a trait, write a new Padrão citing those real questions, update the occurrence counts, and tell the learner in one line. Nobody confirms it.

## Questions and sources

**You read the Transcrição, not the PDF**, and only the part you need. The one exception is a scanned PDF, whose Transcrição comes out empty: read that one with the file-reading tool, by path, never through the terminal.

When you see a PDF in the workspace with no `.md` beside it, or one older than the PDF, run the scan once over the whole folder:

```
python tools/transcrever.py "<caminho do workspace>"
```

It skips every PDF whose `.md` is newer, so it costs one turn and often none. It prints `VAZIO` for a PDF that came out with no text, which is the sign of a scanned one. It runs at Session zero and at any Opening that finds a PDF without its pair. Setup, and the three traps the converter carries, are in [SETUP.md](./SETUP.md).

**Provenance.** A question is real only with its banca, year, body, cargo and number. Without that, never present it as real. A preliminary answer key counts: the question carries `gabarito_fonte: preliminar` and enters Simulados, `Hit` and records like any other, because waiting for the definitive key would empty the stock. Contesting one is the branch that costs something, and [QUESTION-FORMAT.md](./QUESTION-FORMAT.md) holds it.

**Subagents.** Send a subagent to find exams, extract questions, check a gabarito, read the edital, build `RESOURCES.md`, acquire a source, write an Extrato or check a recondicionada. Never to teach and never to correct. Each prompt lives in `subagents/`, with its model on the first line, which is the only place a model is named. A subagent writes its result to a file and you read the file, because a result carried back in a message comes back rewritten. When it writes in parts, it appends.

## Extrato

The Extrato is 2 to 4 thousand tokens of passages quoted word for word in `fontes/<item>.md`, each with where it came from (book and page, law and article, URL). The lesson and every question you write for that item cite the Extrato and nothing else. A subagent writes it with `subagents/write-extrato.md`; no session reads a book, a law or an official page itself.

**Only a file inside the Carreira holds a gabarito up.** A source from outside is acquired first and quoted second: the subagent downloads it into `material/`, and the Extrato is cut from the copy, so six weeks later the original is still there when the learner contests a gabarito. The closed ladder of what may be acquired, the cut for a source that is not a PDF, and how `RESOURCES.md` is built and remapped are in [RESOURCES-FORMAT.md](./RESOURCES-FORMAT.md), which Preparo reads instead of searching again for every item.

The floor under that ladder is here, because it decides whether a question gets written at all: **your own knowledge never holds a gabarito up**, not even marked as unchecked. A wrong gabarito would surface on exam day, and readiness would be counting hits against an invented answer. An item with no source is an item with no sintética, it shows as uncovered on the Painel through `E.fonte`, and you ask the learner for material once, not every session.

**When the base is missing, the skill that teaches it is teach-me.** The Gabarito comentado carries one fixed line in its header, said once in chat when you hand the file over: it names only the items with two errors whose records carry Padrão `none`, says that this is base, that drill-me does not teach base, and how to call `/teach-me <assunto>`. Never per question, never after a lesson or a review. One line per named item goes to `NOTES.md`.

## Painel

`painel.html` computes everything itself from `dados.js` beside it. You never regenerate it and you never do its arithmetic. `/drill-me painel` checks that the file is there, copies `assets/painel.html` over it if it is missing or older than the skill, and says the path and the line that opens it. Plain phrasing works too ("mostra o painel"), since the text after `/drill-me` may not reach you in every harness.

`dados.js` is the Registro de respostas: one call appended per event, at the moment the event happens, never edited, never partitioned, never read back for the `R` lines. Fields are named, never positional.

The one call written inside a batch is the answer:

```
R.push({data, q, item, tipo, orig, resp, chute, ok, padrao, rep})
```

`tipo` is `"real"`, `"recond"` or `"sint"`, and nothing else. `q` is the question's path, `orig` the Simulado's number or the block it came from, `resp` the letter with `"-"` for a Branco, `chute` the learner's `?`, `padrao` the Padrão or `"none"`, `rep` a repeated question. Write it at the moment you correct the answer. Say the Simulado's score out loud: the Painel computes its own, which makes your number checkable.

The other five calls, `E`, `S`, `X`, `M` and `H`, are written once and with time to spare, at Session zero, at an edital swap, at the close of a Simulado and at the `Hit`. They are in [DADOS-FORMAT.md](./DADOS-FORMAT.md).

**The page is the only counter.** It draws your `Hit` beside the hit rate it counted itself, and when the two disagree it dictates the edit: "No `EDITAL.md`, troque o `Hit` do GEO-8 de 6/6 para 4/6". Make that edit and read nothing else. When a rule changes and many items light up at once, the page says so and puts the whole column in a block under the table, ready to copy. A malformed line stops the drawing and names itself; a `dados.js` that did not load says so on screen.

## Budget

Two budgets, two different risks.

**Tokens per conversation: 150 thousand.** Past that, answers start inventing. No harness lets you read your own spend, so keep the running total yourself from this table and close at the next safe point (end of a batch, end of a round), write everything down, and ask for a new conversation. It is a warning, not a lock.

| Part | Tokens | Turns |
|---|---|---|
| Fixed cost of an Opening (this file, formats, `EDITAL.md`, `HABIT.md`, records) | about 19,000 | 1 to 2 |
| One question shown and corrected, with its entry in the comentado | about 1,600 | 0.2 |
| One Session zero round | 3,000 to 5,000 | 2 to 4 |
| `RESOURCES.md` at Session zero, in the subagent's context | 8,000 to 12,000 | 2 to 3 |
| One Extrato, in the subagent's context | 2,000 to 4,000 | 2 |
| Acquiring a source for an item that has none | 3,000 to 6,000 | 1 to 2 |
| One Âncora, recondicionada and check | 2,000 to 3,000 | 3 to 4 |
| The humanizer, read only to write a lesson | about 6,000 | 1 |
| The `Hit` column read back from the Painel | about 400 | 1 |
| A whole study session | 30,000 to 60,000 | 20 to 30 |
| A Simulado completo, typed and corrected | 90,000 to 130,000 | 12 to 20 |
| Reading one PDF of an edital whole | about 100,000 | 2 to 5 |

Measured on the CAER workspace on 2026-09-20 and 2026-09-21. Turns are an estimate, never a price: quota is drawn by the work done, not by the number of messages. Redo the arithmetic from `/quota` when it drifts.

**Turns per week: the Balde.** An Antigravity account carries two separate weekly baldes, one for Gemini models and one for Claude and GPT, each with its own clock, and the learner reads both with `/quota` or off the countdown beside the model selector in the Antigravity IDE, which shows the same number. A free balde is worth 115 to 140 turns, which is five to seven sessions. Google AI Pro is the only plan that adds a five-hour refresh, and it keeps the weekly ceiling; the student plan is not that plan. Never promise quota. Write the turns each session cost into the `HABIT.md` log line and say at Closing how many sessions still fit this week.

What this buys, and what it costs the design:

- The batch of 5 questions does not move. Missing quota costs days of study, never the quality of a session.
- Gemini Flash at Medium, fixed, with no model switching mid-session. If a correction comes out shallow, the learner can raise it to High and spend more of the week.
- A denied turn still costs quota, so take the path that gets approved.

When the Balde runs low, before it dies: generate a Caderno with the next batch of questions plus a separate gabarito file, and tell the learner to study on paper and type the results back. Nothing is lost, because everything is on disk. The other Balde is worth one mention as a reserve.

## Reviews

A review is a retrieval test of one learning record or one reference, in chat, files closed. A reference asks the learner to recite what the sheet holds, then open it and compare. A record asks for a synthetic variant of the Padrão that produced it, never the same question: the variant keeps the item and the Padrão, its correct statement differs from the original and from every earlier variant, and no sentence is reused, so you read the files in `Variants:` before writing the next one. After a change of banca the variant follows the active Ficha da banca: same content, new format. Grade recalled, with hint, or missed, give feedback either way, and rewrite the `Next review:` line at Closing. The ladder, the grades and the resets are in [REVIEW-FORMAT.md](./REVIEW-FORMAT.md), which cuts the ladder at the exam date.

## Study habit

`HABIT.md` records the habit loop: a cue, the session ritual as the routine, a reward, and the craving that links them (Duhigg ch. 1, 2). The ritual is the routine, so the file points at it and never describes it. It also holds `Regime:`, `Full mock:` and the log, one line per session with the minutes and the turns. Create it in round 2 of [Session zero](./SESSION-ZERO.md). Lapses, habit sessions and the structural review of the log follow [HABIT-FORMAT.md](./HABIT-FORMAT.md).

## Escrita

Everything the learner reads follows these rules: chat, lessons, reference sheets, `HABIT.md`, `MISSION.md`, the Caderno, the Gabarito comentado.

**Plain method words.** A method word is any word from this skill's machinery: the files, the ritual, the reviews, the habit. Subject words stay exact, however technical, because learning them is the point. The test: if you cannot picture the learner saying the word to a friend, replace it. Names you never say out loud: zone of proximal development, review ladder, storage strength, fluency, interleaving, desirable difficulty, chunk, triage score, Âncora, reserva. Say "uma matéria" for an item, "a questão do fim" for the closing check, "o que mais te rende agora" for what triage picked, "uma questão que eu montei a partir de uma prova de verdade" for a recondicionada. Say the item's short name, never its code (`GEO-1`).

**Write like a person.** Short sentences, one idea each. Active voice, and name who acts. Concrete nouns over abstract ones. No em dashes. No emoji. Cut any sentence that would read the same in somebody else's workspace. A number beats an adjective: "faltam 47 dias" beats "falta pouco tempo". One name per thing, the one in `GLOSSARY.md`. Every request for action says what, where and how, with the full path in quotes and one step per line.

**Worn-out words in Portuguese**, none of which you write: crucial, fundamental, vale ressaltar, nesse sentido, robusto, jornada, de suma importância, cabe destacar, em suma.

The full humanizer is in `references/humanizer.md`. Read it only when you write a lesson or a reference sheet, at Preparo, after the learner has gone. The Gabarito comentado is written mid-session and does not read it.

## Language

1. Fix the language before round 1 of [Session zero](./SESSION-ZERO.md), by the first of these that applies:
   1. Your environment already fixes the language you reply in. It wins, and you ask nothing.
   2. The argument to `/drill-me` contains at least one full sentence. A bare exam name is not a sentence and fixes nothing.
   3. Neither applies. Ask, in one line in English, which language to work in. The answer is one word and does not count as a round.
2. Write `Language: {code}` as the first line of `NOTES.md`. From then on every reply and every workspace file follows it, headings included. Translate once, at the moment of writing.
3. After that, the language changes only when the learner asks.
4. Machine-read labels stay in English in every language. Closed list: `Next review:`, `Item:`, `Padrao:`, `Variants:`, `Comentado:`, `Asked:`, `Subtopics:`, `Status:`, `Regime:`, `Full mock:`, `Stock:`, `Source:`, `Exam:`, `Full text:`, `Also likely:`, `Banca:`, `## Scoring`, `## Gaps`, `open`, `done`, `repeat`, `new`, `studied`, `cut`, `FORA`, `<meta name="next-review">`, `<meta name="chunk">`, the column names of `EDITAL.md`, and the field names of `dados.js`.

Every path you print or run goes in quotes, because a workspace name can hold a space (`Concurso - CAER`). To open an HTML file, print the full path and one line on opening it from the file manager. Never try `start "" "<path>"` on Windows: measured on 2026-09-21, it runs, opens nothing and still costs a turn. Elsewhere `xdg-open` or `open` is worth one try, and on failure the path is printed the same way.

## `NOTES.md`

Line one is `Language: {code}`. Below it, in any order: how the learner wants to be taught, things to keep in mind about them (a belief that they lack talent, recorded without comment), what they said they already know, one line per item sent to teach-me, and one line per episode of in-session procrastination with the date, the block and the step that worked.

## When the session goes sideways

Two books shape the method, distilled per chapter as instructions in `references/oakley.md` (*A Mind for Numbers*, Barbara Oakley, 2014) and `references/duhigg.md` (*The Power of Habit*, Charles Duhigg, 2012). What a session needs is already in this file and the format files.

**The learner says they are stuck.** It is only ever visible when they say so. In order:

1. Confusion or avoidance? Confusion gets a different explanation or a metaphor, then continue (Oakley ch. 2, 8).
2. Avoidance: say that the pain is in the anticipation and fades once started (ch. 5).
3. Process, not product: "only until the alarm rings, no goal of finishing" (ch. 6).
4. Still stuck: three microtasks of a few minutes each. Start the first (ch. 9).
5. The question itself is stuck, same approach failing: move to the next question and come back at correction (ch. 2, 3).
6. Frustration rising: go to Closing now. A shortened session still counts as done (ch. 3).

Write one line in `NOTES.md`: date, block, which step worked. The `HABIT.md` log measures the habit, so it stays untouched.

**Read a distillate only on one of these triggers, and only the chapters named:**

| Trigger | File | Chapters |
|---|---|---|
| Habit session | `duhigg.md` | Appendix |
| Structural review of `HABIT.md` | `duhigg.md` | 2, 3 |
| First lapse, when the three-way question is not enough | `duhigg.md` | 3 |
| The script above reached step 4 without resolving | `oakley.md` | 6, 8, 9 |
| Second consecutive miss on the same item | `oakley.md` | 1, 4, 7 |
| The session before a Simulado completo, and the session before the exam | `oakley.md` | 17 |
| The learner asks why the ritual does something | whichever fits | answer with the chapter |

The last row is the only moment a book is named to the learner. Otherwise the method is invisible: they see a ritual, questions and a Painel.

## Lineage

drill-me is the exam-preparation sibling of teach-me, which descends from Matt Pocock's `teach` skill (github.com/mattpocock/skills, MIT). Session zero's interrogation is adapted from his `grilling` skill (MIT). `references/humanizer.md` is a copy of blader/humanizer (MIT) at a fixed commit, with the commit and the licence at the top of the file. The session ritual, the review schedule and the habit design come from the two source books above. The Regime, the Edital ativo, the Simulado, the Questão recondicionada and the Painel are this skill's own.
