# Session zero

The first time the learner opens the workspace there is no `EDITAL.md`, no timer and no lesson. Session zero is one interrogation, and it writes the files as it goes. It happens once in the life of a workspace, so no study session reads this file.

It is the most expensive thing the skill does. Before round 1, say so, ask the learner to read both baldes once, with `/quota` or off the countdown beside the model selector, and work in whichever Balde is fuller. Cut the session at a safe point after each document is read and after the habit round: say so, and let them open a new conversation. See Budget in `SKILL.md`.

## Before round 1

1. Fix the language by the precedence in the Language section of `SKILL.md`, and write `Language: {code}` as the first line of `NOTES.md`.
2. Check the PDF converter with the one command in [SETUP.md](./SETUP.md) and write the result as one line in `MISSION.md`. Without the converter, do not improvise and do not try the command again: say what is missing, point at `SETUP.md`, and read PDFs with the file-reading tool for this session only.

## The rounds

A round is a batch of questions, each carrying the answer you recommend. Ask the whole round, wait, and write every settled answer into `MISSION.md`, `HABIT.md` or `NOTES.md` before opening the next round. Keep going until nothing is open. There is no round limit.

1. **The concurso.** Carreira, cargo, banca, edital or likely bodies, exam date, why they want this post, and what they have already studied, per Item do edital. Do not ask what they are leaving out: the edital decides the scope.
2. **The habit.** The seven fields of `HABIT-FORMAT.md`, plus minutes per day, days per week, session length, and whether synthetic questions may enter a Simulado. The Partner is a field of this round: the person the learner picks to tell how it is going. Close the round by announcing the Regime from their own numbers: "64 dias, 1 hora por dia, 53 matérias: você cabe no ritmo curto, e é isso que muda." They accept it or ask for a tighter one.
3. **Whatever the first two left open**, until nothing is.

Never ask for a category. Every question offers a concrete case built from what they already said, and they accept it, refuse it, or correct it. A learner who has to invent the category answers nothing, and that is how a round stalls. Find out for yourself whatever you can find out: read the edital, count the days, count the items.

## Asking for the documents

Ask for each one separately, writing the full folder path in the message.

1. **Edital.** Ask the name of the concurso and the cargo, search the banca's site, show what you found for a yes or no, and download it to `edital/`. If you cannot find it, ask for the link, or ask them to save the PDF in the folder.
2. **Their own material.** Ask them to save it in `material/` and say when they are done. "No" is a valid answer, and the common one: the ladder of sources in `RESOURCES-FORMAT.md` covers the rest.
3. **Past exams.** Search for them yourself with `subagents/find-provas.md`. Only ask for help when a site needs a CAPTCHA, and then give the link and the folder.

## After the edital arrives

1. Run the transcription scan over the folder.
2. Run `subagents/read-edital.md` on the Transcrição to write `edital/itens-do-edital.md`, with the `Subtopics:` count on each line, and the `## Scoring` section.
3. Build `EDITAL.md` from it, applying the Peso cascade in `SKILL.md`.
4. Show a summary per Bloco ("Geologia: 30 questões, valem 2 pontos cada, 12 assuntos") and one yes-or-no question: does that match the edital you read? They do not check it line by line.
5. Show the scoring rule in three or four plain lines: "Branco vale zero. Errada não desconta. Zerar qualquer matéria te elimina."
6. **When a Bloco of Conhecimentos Específicos comes out `edital`**, spend one sentence and one question on it: "Não achei prova de geólogo da Ajuri, então reparti os 60 pontos de Geologia pelo tamanho de cada assunto no edital. Geologia Geral ficou com 7,6 e Legislação Profissional com 3,8. Se algum desses estiver claramente fora, me diz agora." What they name becomes `manual`; silence leaves everything `edital`. A Bloco of Conhecimentos Gerais that comes out `edital` gets no question: Matemática is worth 5 points on the CAER and does not pay a turn of the Balde.
7. Run `subagents/build-resources.md` on the same Transcrição to write `RESOURCES.md`.

## After the past exams arrive

Run `subagents/extract-questoes.md`, then `subagents/build-banca.md`. Then show the Cobertura, and when it is low, recommend turning synthetic questions on.

## Closing session zero

1. Anything the learner said they already know becomes a learning record with no `Next review:` line, plus one line in `NOTES.md`. It steers triage and stays off the review ladder. It never enters `Hit`.
2. Create `painel.html` from `assets/painel.html` and an empty `dados.js` carrying the contract header from [DADOS-FORMAT.md](./DADOS-FORMAT.md).
3. Append the `E.push` line of every item and the one `S.push` line.
4. Read `MISSION.md` and `HABIT.md` back to the learner.
5. Write the first log line, `done · sessão zero`. Lapse detection counts from it (Duhigg ch. 4).

**Session 1** is a diagnostic Simulado curto of real questions only, spread across the heaviest items. It gives the first hit rates. Items with no real question stay unmeasured until practice on written questions feeds the triage.
