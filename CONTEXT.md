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

**Lacuna**:
An item of the Edital ativo for which no Questão real was found. Covered only with Questões sintéticas until a real one appears.
_Avoid_: gap, buraco, item sem questão

**Questão real**:
A question taken from a past exam, carrying its provenance: banca, year, body, post, number. Without provenance it is never presented as real.
_Avoid_: questão oficial, questão de prova (ambiguous with a simulado's questions)

**Questão sintética**:
A question the agent writes from a named Questão real and a pattern of the Ficha da banca, always labelled. Lives in lessons and reviews; enters a Simulado only when the learner turns that on at Session zero, and then is revealed at correction and scored apart.
_Avoid_: questão gerada, questão inventada, questão fake

**Ficha da banca**:
The workspace file describing how the banca writes items: types, traps with a real example each, scoring rule, time per question. Built from past exams, revised when a Simulado shows an error pattern it did not predict. Can exist before the edital.
_Avoid_: perfil da banca, guia da banca

**Simulado**:
A timed run of Questões reais under the banca's own scoring rule, recorded per item of the Edital ativo. The only measure of readiness the skill trusts. Not a Review (one item, in chat) and not a Closing check.
_Avoid_: quiz, prova, teste, mock

**Simulado curto**:
A Simulado sized to what fits in two thirds of the session at the banca's pace, never fewer than 5 questions. It takes the place of the Lesson block inside the session ritual, and is the only Simulado the Emergência regime runs.
_Avoid_: mini simulado, bloco de questões

**Simulado completo**:
A Simulado the length of the real exam, run outside the session ritual and scheduled in HABIT.md. At least two before the exam in Longo and Curto, none in Emergência. The only source of the "cut-off versus your score" line.
_Avoid_: simulado real, simulão

**Chute**:
An answer the learner marks as a guess during a Simulado. Counts as an error for records and reviews, whatever the gabarito says.
_Avoid_: palpite, acerto de sorte

**Regime**:
The pace of study a drill-me workspace runs under: Longo, Curto or Emergência. The skill derives it from the hours left until the exam per item of the Edital ativo, never by asking the learner for a category. Tightens as the calendar advances; the learner can force it shorter, never longer. Only a new exam date can loosen it, and only once the learner accepts.
_Avoid_: modo, versão, plano de estudos, nível

**Emergência (regime)**:
The Regime that drops the lesson, the three blocks and the prepared lesson: the Edital ativo is triaged by weight, banca incidence and current hit rate, only the top is studied, every session is a Simulado curto with immediate correction, and the review ladder is cut to 1 and 3 days. Keeps HABIT.md and the three-outcome grade.
_Avoid_: modo turbo, reta final, intensivo

**Painel**:
The HTML page in the workspace that shows progress: hit rate per edital item over time, simulado scores by date, days until the exam, uncovered items, lacunas, cut-off versus score. Regenerated at every Closing and on demand by a skill argument.
_Avoid_: dashboard, relatório, estatísticas (as the file's name)
