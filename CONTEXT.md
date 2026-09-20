# Teach-me

Glossary for the `teach-me` skill: a Claude Code skill that teaches the user a topic over many sessions, using the pedagogy of two source books. Descends from Matt Pocock's `teach` skill.

## Terms

**Knowledge**:
Facts and models acquired from high-trust sources. The two source books are Knowledge about learning itself.
_Avoid_: wisdom (for book content), theory

**Skill (learner's)**:
Durable ability built by effortful practice: retrieval, spacing, interleaving.
_Avoid_: skill (for the Claude Code artifact; say "the skill file" or "teach-me")

**Wisdom**:
What the learner gains by testing Skills with other people, outside the workspace. Never comes from a book or from the agent.
_Avoid_: sabedoria dos livros, insights

**Source book**:
One of the two works whose methods shape how teach-me teaches: *A Mind for Numbers* (Oakley, 2014) and *O Poder do Hábito* (Duhigg, 2012). Their content is pedagogy, not curriculum.
_Avoid_: reference (that word means the learner's cheat sheets in the workspace)

**Teaching workspace**:
The directory where the learner invokes teach-me and where MISSION.md, lessons, references and learning records accumulate. Never this repo.
_Avoid_: project, course

**Lineage**:
The acknowledged origin of teach-me in the `teach` skill (MIT, github.com/mattpocock/skills).

**Session ritual**:
The fixed sequence every session follows, sized to one pomodoro. Owned by teach-me, not by the learner. In the habit loop it is the routine.
_Avoid_: routine (Duhigg's word; use it only when explaining the loop), workflow

**Study habit**:
The learner's habit loop for returning to the workspace: a cue, the session ritual, a reward, and the craving that links them. Recorded in HABIT.md.
_Avoid_: routine, discipline, motivation

**Lapse**:
One or more sessions missed, reported by the learner or detected from the study habit's log at the start of a session. Belongs to the study habit, not to the lesson.
_Avoid_: abandonment, failure, relapse

**In-session procrastination**:
The learner is inside a session and stalls. Belongs to the session ritual, not to the study habit.
_Avoid_: lapse

**Habit session**:
A session that replaces the lesson with rebuilding the study habit. Triggered by a second consecutive lapse or by the learner saying they stopped.
_Avoid_: intervention, coaching session

**Review**:
A retrieval test of one learning record or one reference, run in chat with files closed, graded recalled, with hint, or missed. A record review tests Skill; a reference review tests Knowledge.
_Avoid_: revisão as rereading, repetition, quiz (a quiz lives inside a lesson)

**Due**:
The state of a record, reference or HABIT.md whose `Next review:` date has arrived. Reviewed at the first session on or after that date.
_Avoid_: overdue as a separate state, expired

**Review ladder**:
The fixed sequence of intervals a review climbs on success: 1, 3, 7, 14, 30, 60, 120 days, the top rung repeating. HABIT.md has its own two-rung ladder.
_Avoid_: algorithm, schedule, SM-2

**Review session**:
A session with no new chunk, spent on up to six reviews, triggered when more than six items are due.
_Avoid_: catch-up, cramming

**Structural review**:
Reopening HABIT.md with the learner at its `Next review:` date or after a habit session. Belongs to the study habit, never a retrieval test.
_Avoid_: review (reserved for records and references), check-in

**Session zero**:
The interview that opens a workspace, before any lesson and outside the pomodoro. Runs in rounds of numbered questions, each with the agent's recommended answer, writes MISSION.md and HABIT.md, and prepares lesson 1. The session after it is session 1, an ordinary session ritual with no reviews.
_Avoid_: onboarding, first session, mission interview

**Opening**:
The first block of the session ritual, in chat with files closed: lapse detection, What pulls you back and Reward, timer, carry question follow-up, up to three reviews, chunk choice, prepared lesson opened.
_Avoid_: warm-up, intro, check-in

**Lesson (block)**:
The middle block of the session ritual, in the browser: the lesson file open, one chunk taught and practiced. Replaced by a review session or a habit session when those trigger.
_Avoid_: class, module

**Closing**:
The last block of the session ritual, in chat with the lesson closed: closing check, learning record, review lines, habit log line, carry question, pre-sleep recall reminder, then the next lesson prepared with the learner gone.
_Avoid_: wrap-up, debrief

**Prepared lesson**:
A lesson written at the Closing of the session before it, with the reference and glossary entries it links, waiting on disk under its final number until a `done · lesson NNNN` log line says it was taught. Opening opens it when the zone of proximal development agrees with its chunk, and overwrites it otherwise.
_Avoid_: draft, next lesson, pre-written lesson

**Chunk**:
The single new unit a session teaches, of type Knowledge or Skill, declared in the lesson file. One per lesson, never two.
_Avoid_: topic, unit, module

**Closing check**:
The one production request that ends the Lesson block, asked with the lesson closed and graded recalled, with hint, or missed. Decides whether a learning record is written. Not a review: the item has no `Next review:` yet.
_Avoid_: self-test, quiz, review

**Carry question**:
The one open question the learner takes out of a session for the diffuse mode, printed in the lesson and read back at the next Opening.
_Avoid_: homework, exit ticket

**Learner's language**:
The language every reply and every workspace file follows, recorded on the first line of NOTES.md. Fixed before the first round of Session zero, by precedence: the agent's environment, else a full sentence in the argument to teach-me, else asking. Machine-read labels stay in English. Changes only when the learner asks.
_Avoid_: locale, default language, Portuguese (as a fixed default)

**Method word**:
A word from teach-me's own machinery: the files, the session ritual, reviews, the study habit. Always plain enough for the learner to say out loud. Opposed to a subject word, the vocabulary of what is being taught, which stays exact however technical it is.
_Avoid_: jargon, internal name

**Primary text**:
A work a guided reading follows from start to end, a book, a thesis or a long article. Its structure orders the sessions. A workspace may hold several, read one after another, never two at once.
_Avoid_: guided text, source book (reserved for Oakley and Duhigg), reference (reserved for the learner's cheat sheets)

**Secondary source**:
A high-trust work that comments on, criticizes or situates a passage of the primary text, such as a peer-reviewed article. Listed in RESOURCES.md with the passage it sheds light on.
_Avoid_: supporting article, bibliography, source book

**Declared stance**:
The position on the primary text's theses stated openly before the reading, by the agent and by the learner, so the learner can weigh what the agent says and knows in advance where the two will disagree.
_Avoid_: neutrality, bias (as something to hide), opinion

**Carreira**:
The family of public-service posts a drill-me workspace prepares for, such as geology and environmental posts at the higher level. One workspace per Carreira; the Edital ativo changes inside it, and records and hit rates stay.
_Avoid_: concurso (that is one exam), cargo (one post within the Carreira)

**Edital ativo**:
The one public notice a drill-me workspace studies for at a time. Its items are the curriculum and replace the zone of proximal development. Swapping it rewrites the edital file and remaps items; records stay.
_Avoid_: edital (bare, when more than one exists in the workspace's history), programa

**Edital provisório**:
A stand-in Edital ativo built from previous notices of the likely bodies, used while the real notice is unpublished. Replaced whole when the real one comes out.
_Avoid_: edital estimado, rascunho

**Item do edital**:
One numbered topic of the Edital ativo's content for the post, kept as the edital numbers it: never split or merged when the edital file is built. The unit of Peso, hit rate, Lacuna and the Regime arithmetic. The learner hears its short name, never its code.
_Avoid_: assunto, tópico, conteúdo

**Bloco**:
A section of the Edital ativo with its own question count and point value per question, such as Conhecimentos Específicos with 30 questions worth 2 points. Holds several Itens do edital. A Conhecimentos Gerais Bloco is the same for every post in the same exam, so a past question from another post still shows what the banca asks there; a Conhecimentos Específicos Bloco is written for one post, so another post's questions say nothing about it.
_Avoid_: disciplina, área, prova (for a section of it)

**Peso**:
The points an Item do edital is expected to be worth on the exam, its Bloco's points split among the Bloco's items. The split follows the banca's past incidence when at least 10 comparable past questions exist, and otherwise follows how many subjects the edital names under each item. A Peso the learner corrects in chat overrides both, is marked manual and is never recalculated. The rest of the Bloco is rebalanced to keep its total, and no item drops below 0.1.
_Avoid_: importância, prioridade (that is the triage), incidência (one input to it)

**Lacuna**:
An item of the Edital ativo for which no Questão real was found. Covered with Questões recondicionadas while an Âncora exists for it, and with Questões sintéticas when none does, until a real one appears. An item with neither an Âncora nor a Fonte primária cannot be covered at all: it is marked as such on the Painel and the learner is asked once for material, and its Peso is never lowered to keep it out of sight, because the exam charges for it either way.
_Avoid_: gap, buraco, item sem questão

**Questão real**:
A question taken from a past exam, carrying its provenance: banca, year, body, post, number. Without provenance it is never presented as real.
_Avoid_: questão oficial, questão de prova (ambiguous with a simulado's questions)

**Âncora**:
A Questão real from another banca or another post, chosen to show what is asked about one Item do edital and at what depth. It never reaches the learner as it is: it is what a Questão recondicionada is built from, and the depth reference for a Questão sintética written from it; for an item with no Âncora at all, that reference is an Amostra de nível. Same post in any banca for a Conhecimentos Específicos Bloco, same subject at the higher level in any banca for a Conhecimentos Gerais Bloco. The most recent one wins; difficulty is never judged. Fetched at Closing beside that item's Extrato.
_Avoid_: questão de referência, modelo, espelho

**Amostra de nível**:
The 3 to 5 Questões reais handed to a subagent as the depth a Questão sintética is written to: same Bloco, active banca, any post, any year, the most recent first. A question outside the Edital ativo's items counts, because the sample measures level and form, not content. Their paths are recorded in the question's own file. Below three it is whatever exists, and with none in the Bloco it falls back to the banca's whole acervo, which the question states.
_Avoid_: amostra (bare), calibração, referência de dificuldade

**Questão sintética**:
A question the agent writes, always labelled. Its form (format, command, trap) comes from a named Questão real of the active banca and a pattern of the Ficha da banca; its content comes from an Item do edital, and its answer cites a passage of that item's Extrato. Without an Extrato it is not written. It asks only what the item's own words name, and at the depth of its Amostra de nível, never at the depth of the source. The passage the answer comes from is copied word for word into the question's file beside the gabarito, and that copy takes the place of the check a Questão recondicionada goes through, since a Questão sintética never counts in a score. Written only when the item has no Âncora, when the Âncora cannot be reconditioned, or when a review needs a variant of one already asked; with an Âncora in hand a Questão recondicionada is written instead. Kept in the workspace like a Questão real, so it can be counted apart and never asked twice. Lives in lessons and reviews; enters a Simulado only when the learner turns that on at Session zero, and then is revealed at correction and scored apart.
_Avoid_: questão gerada, questão inventada, questão fake

**Questão recondicionada**:
An Âncora rewrapped in the active banca's form: stem and correct alternative copied word for word, and distractors that are themselves real wherever possible, by dropping one alternative from a five-alternative Âncora or by taking wrong statements of the same exam on the same subject from a certo/errado one. Fewer than two real distractors and it is not written, it becomes a Questão sintética. Because the original gabarito still stands behind it, it enters a Simulado and counts in the score, but only after a check by a subagent that did not write it confirms the correct alternative is untouched, no distractor is also right, and it still asks what the Âncora asked. A failed check turns it into a Questão sintética, which the lesson still uses. Labelled in its file and at correction, never during the exam.
_Avoid_: questão adaptada, questão convertida, questão semi-real

**Transcrição**:
The full text of a workspace PDF, converted by tool, word for word, never summarised, written beside the PDF under the same name with a `.md` extension. The agent reads the Transcrição, never the PDF, and reads only the part it needs; the one exception is a scanned PDF, whose Transcrição comes out empty and which is read as pages instead. Not an Extrato (passages of one source about one Item do edital) and not the cargo's slice of the edital, both of which are cut from it.
_Avoid_: conversão, texto extraído, OCR, cópia em markdown

**Fonte primária**:
A document an Extrato may be cut from: the learner's own material, the official text of a law or a norm, a technical document of a public body, or a public university's course notes with a named author. Nothing else qualifies, and the agent's own knowledge never does, not even marked as unchecked. It is part of the Carreira before it is quoted, so a source found outside is copied into the workspace first, carrying its URL and the date it was fetched, and a gabarito contested months later can still be checked against it. Fetched at Closing for the item being prepared, and listed in RESOURCES.md with the items it covers.
_Avoid_: fonte (bare), referência, bibliografia

**Extrato**:
The passages of one Item do edital's Fontes primárias, quoted word for word with where each came from (book and page, law and article, URL), written by a subagent so the session never reads the whole source. The only source a lesson or a Questão sintética of that item may cite. Made at Closing for the next item, never mid-session, and the same step fetches a Fonte primária first when the item has none. A source short enough to fit an Extrato whole, such as a statute, is copied straight into it instead of being stored twice.
_Avoid_: resumo, fichamento, apostila, fonte (bare, which is a Fonte primária)

**Ficha da banca**:
The file describing how one banca writes items: format, scoring rule, time per question, the exams it was built from, and its Padrões. One per banca, so a Carreira that changes banca keeps the old one. Built by the agent alone from past exams in the workspace; a Padrão enters only with a Questão real that shows it. With no exam of the banca in the workspace it has no Padrões, and no Questão sintética is written for that banca. It states how old the exams it was built from are, so a stale acervo is read rather than discovered on exam day. Revised when a Simulado shows an error pattern it did not predict. Can exist before the edital. Its scoring rule and time describe the banca in general and give way to the Edital ativo's whenever one exists.
_Avoid_: perfil da banca, guia da banca

**Padrão**:
A recurring way a banca builds an item, with or without a trap: swapping one constitutional body for another, a calculation inside a technical stem, three numbered statements to combine. Listed in the Ficha da banca with a Questão real that shows it; every error in a Simulado is tagged with the Padrão it fell into, or none.
_Avoid_: pegadinha, armadilha, estilo

**Simulado**:
A timed run of Questões reais and Questões recondicionadas scored by the Edital ativo's own rule (the Ficha da banca's only while no edital is published), recorded per item of the Edital ativo. The only measure of readiness the skill trusts. Its score is a single number covering both, because a reconditioned question carries the original gabarito; Questões sintéticas enter only when the learner turned them on and are scored apart, because there the agent would be scoring its own writing. When those questions cannot fill the exam's shape it shrinks to what exists, and its Cobertura is reported beside the score. Not a Review (one item, in chat) and not a Closing check.
_Avoid_: quiz, prova, teste, mock

**Simulado curto**:
A Simulado sized to what fits in two thirds of the session at the banca's pace, never fewer than 5 questions. It takes the place of the Lesson block inside the session ritual, and is the only Simulado the Emergência regime runs. In Longo and Curto it leaves part of each item's Questões reais untouched for the Simulado completo, so the daily lesson does not eat the measure; in Emergência, which runs no completo, it takes them all.
_Avoid_: mini simulado, bloco de questões

**Simulado completo**:
A Simulado the shape of the real exam, run outside the session ritual and scheduled in HABIT.md. The learner reads it from a Caderno, answers on paper, then types the answers into chat for correction. At least two before the exam in Longo and Curto, none in Emergência. The only Simulado that applies the edital's elimination rules, and the only source of the "cut-off versus your score" line, which always carries the simulado's composition. It is weighed in the exam's own points, counting only the questions that both count in the score and the learner has not seen before: below half of those points that line is not drawn at all, and below a third the simulado is not scheduled, the skill saying instead what it is still waiting for. It is scheduled far enough ahead for the Questões recondicionadas that will fill it to be built a few at a time at Closing, never on the eve.
_Avoid_: simulado real, simulão

**Chute**:
An answer the learner marks as a guess. Counts as an error for records, reviews and hit rate, whatever the gabarito says; in a Simulado's score it counts as the banca would, so the score stays comparable to the exam.
_Avoid_: palpite, acerto de sorte

**Branco**:
A question the learner leaves unanswered on purpose. Scored as the edital says, never counted in hit rate, never a record.
_Avoid_: pular, não sei

**Cobertura**:
What a Simulado filled the exam's slots with, counted by kind and by how many the learner had not seen before ("38 of 60, 22 of them reais, 30 unseen"). Tells how much the score is worth, and is where both the mixture and the repetition show, since the score itself is one number.
_Avoid_: completude, porcentagem

**Caderno**:
The file a Simulado completo is read from: numbered questions, the time and the scoring rule on top, no gabarito, no real or synthetic label. A PDF where the machine can make one without installing anything; otherwise the same page as HTML.
_Avoid_: prova impressa, folha de questões

**Gabarito comentado**:
The file a Simulado's correction leaves behind, one per Simulado, holding an entry for every error, Chute and Branco: the question copied, the learner's answer, the gabarito, why the correct alternative is correct and why the one she marked is wrong, the Padrão and where the gabarito came from. It is the text the correction already said in chat, written batch by batch as it is said, never a second pass over the same questions afterwards. An explanation with no Extrato behind it is marked as unchecked. The file is frozen once written, and only a contested gabarito adds a dated note. The learner consults it when she wants; nothing ever asks her to reread it, because rereading a correction is not retrieval, and the Review still asks a synthetic variant.
_Avoid_: caderno de erros (Caderno is the Simulado completo's booklet), correção (that is the act), resumo

**Regime**:
The pace of study a drill-me workspace runs under: Longo, Curto or Emergência. The skill derives it from the hours left until the exam per item of the Edital ativo, never by asking the learner for a category. Tightens as the calendar advances; the learner can force it shorter, never longer. Only a new exam date can loosen it, and only once the learner accepts.
_Avoid_: modo, versão, plano de estudos, nível

**Emergência (regime)**:
The Regime that drops the lesson, the three blocks and the prepared lesson: the Edital ativo is triaged by weight, banca incidence and current hit rate, only the top is studied, every session is a Simulado curto with immediate correction, and the review ladder is cut to 1 and 3 days. Keeps HABIT.md and the three-outcome grade.
_Avoid_: modo turbo, reta final, intensivo

**Registro de respostas**:
The workspace's one append-only record of every corrected answer, one entry each, written the moment the answer is marked and never edited. Every number the learner is ever shown is counted from it: the hit rate per Item do edital that drives triage, and everything the Painel draws. The agent only ever appends to it and never reads its answer entries back, because they outgrow a conversation's context long before the exam; the Painel loads it whole and does the counting.
_Avoid_: log, histórico, results, planilha

**Painel**:
The HTML page in the workspace that shows progress: hit rate per Item do edital over time, simulado scores by date, days until the exam, uncovered items, Lacunas, cut-off versus score. It computes all of that itself from the Registro de respostas, so it is never regenerated; opening it shows the current state. It draws the agent's own recorded hit rate beside the one it counted, and marks any disagreement, so an arithmetic slip is visible rather than silent; where they differ it states the correction to make, so the count is never redone by hand. It refuses to draw on malformed data rather than showing a wrong number. Every simulado keeps the score of the rule that was in force on its own date, so replacing the Edital ativo never repoints the curve behind it.
_Avoid_: dashboard, relatório, estatísticas (as the file's name)

**Balde**:
One of the two separate quota allowances an Antigravity account carries, one for Gemini models and one for Claude and GPT models, each resetting on its own weekly clock. The free plan and Google AI Plus get weekly baldes only; Google AI Pro adds a five-hour refresh under the same weekly ceiling. The learner reads both with `/quota`. Quota is drawn by the work the agent does, not by the number of messages, so any count of turns is an estimate, never a price.
_Avoid_: cota (bare), limite, créditos, plano

**Remapeamento**:
The table written when the Edital ativo is replaced, pairing each Item do edital of the old one with its successor in the new one, or with nothing when it has none. It is what carries a Carreira's answered questions across the swap: an item's recorded answers are counted under its successor, two old items merging into one have their counts added, and an item that appears in the table as a predecessor stops being part of the edital, so the old syllabus leaves the Painel. It pairs items, never individual questions, so a split sends everything to the nearest successor. Answers left with no successor are declared on the Painel rather than dropping out of it. A new edital's item codes never repeat one the workspace has already used: the code is how an item is named everywhere, and repeating it would overwrite the old item that past simulados still need in order to keep their score.
_Avoid_: migração, de-para, mapeamento (bare), conversão
