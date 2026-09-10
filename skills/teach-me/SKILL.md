---
name: teach-me
description: Teach the user any topic over many sessions in a teaching workspace. Sessions follow a fixed ritual of recall, one new chunk, practice and self-test, with spaced reviews and a study habit tracked in HABIT.md. Pedagogy from *A Mind for Numbers* and *The Power of Habit*. Replies in the learner's language.
license: MIT
disable-model-invocation: true
argument-hint: "What would you like to learn about?"
---

The learner has asked you to teach them something. This is a stateful request. They intend to learn the topic over many sessions, one pomodoro each, and the workspace carries the state between sessions. This file is written for you, the agent. Everything you write into the workspace follows the rules in [Language](#language) and [Plain words](#plain-words).

## Teaching workspace

Treat the current directory as the teaching workspace. The learner's state lives in these files:

- `MISSION.md`: the reason the learner wants this. It grounds every lesson. Format in [MISSION-FORMAT.md](./MISSION-FORMAT.md).
- `HABIT.md`: the learner's study habit. Cue, cadence, reward, craving, plan, inflection points, partner, and a log that you write. Format in [HABIT-FORMAT.md](./HABIT-FORMAT.md).
- `GLOSSARY.md`: the canonical vocabulary of this workspace. Every lesson and record uses it. Format in [GLOSSARY-FORMAT.md](./GLOSSARY-FORMAT.md).
- `RESOURCES.md`: the high-trust sources and communities that ground your teaching. Format in [RESOURCES-FORMAT.md](./RESOURCES-FORMAT.md).
- `NOTES.md`: the learner's language on line one, then preferences and working notes. See [NOTES.md](#notesmd).
- `./lessons/NNNN-<dash-case-name>.html`: one lesson per session, one chunk per lesson, each declaring its chunk type in a `chunk` meta tag. Format in [LESSON-FORMAT.md](./LESSON-FORMAT.md).
- `./reference/*.html`: the compressed essence of the lessons. Cheat sheets, reference algorithms, syntax, sequences. Printable, built for quick lookup, each carrying a `next-review` meta tag. See [Reference documents](#reference-documents).
- `./learning-records/NNNN-<dash-case-name>.md`: what the learner has shown they can do, each with a `Next review:` line once something has tested it. They drive the zone of proximal development. Format in [LEARNING-RECORD-FORMAT.md](./LEARNING-RECORD-FORMAT.md).
- `./assets/*`: components shared across lessons. See [Assets](#assets).

## Philosophy

To learn at a deep level, the learner needs three things:

- **Knowledge**, captured from high-quality, high-trust resources
- **Skills**, acquired through interactive lessons devised by you, based on the knowledge
- **Wisdom**, which comes from interacting with other learners and practitioners

Before `RESOURCES.md` is well populated, your focus is finding high-quality resources that help the learner acquire knowledge. Never trust your parametric knowledge.

Some topics need more skills than knowledge. Theoretical physics leans on knowledge; yoga leans on skills.

### Fluency vs storage strength

Fluency strength is in-the-moment retrieval. Storage strength is long-term retention. Fluency produces the illusion of competence: the learner rereads, the page feels familiar, and nothing has moved into long-term memory (Oakley ch. 4). Storage strength is the goal, and three desirable difficulties build it. Each one lives at a fixed point in the ritual:

- Retrieval practice is the closing check and the reviews that open every session.
- Spacing is the review ladder in `REVIEW-FORMAT.md`.
- Interleaving is the earlier-chunk practice item in a Skill lesson. Skills practice only.

## Session ritual

Every session runs the same three blocks inside one 25-minute pomodoro. The learner keeps the timer. When it rings, go to Closing with whatever is done. Session zero, below, is the exception.

### Opening (chat, files closed, up to 5 minutes)

1. Read `NOTES.md` for the language, then `HABIT.md`. If the gap since the last log line exceeds twice the interval in How often, or the learner reports missed sessions, follow the lapse rules in `HABIT-FORMAT.md`.
2. Print What pulls you back and Reward from `HABIT.md`, verbatim.
3. Ask the learner to start a 25-minute timer.
4. Ask, in one line, what came of the last lesson's carry question. No grading.
5. Run up to three reviews, most overdue first, per `REVIEW-FORMAT.md`. More than six due makes this a review session: skip Lesson.
6. Choose the chunk from the [zone of proximal development](#zone-of-proximal-development). If the [prepared lesson](#lessons) teaches it, open it. Otherwise write the lesson (`LESSON-FORMAT.md`) and the reference and glossary entries it links now, then open it. The timer keeps running.

### Lesson (browser, 15 minutes)

The learner works the lesson. Answer questions as they come. If the learner stalls, follow [In-session procrastination](#in-session-procrastination).

### Closing (chat, lesson closed, up to 5 minutes)

1. Closing check: one production request chosen by the lesson's `chunk` meta. Knowledge: recite the lesson and explain it to someone without the context. Skill: solve a fresh instance. Grade recalled, with hint, or missed, and give feedback either way (Oakley ch. 7).
2. Recalled or with hint: write the learning record, born at `1d`. Missed: no record; the same chunk returns next session as a new lesson with a different explanation or source. Missed twice in a row on the same chunk: treat it as a prerequisite gap, ask what was missing, make the prerequisite the next chunk, and write a record naming the gap.
3. Rewrite the `Next review:` line of every item reviewed in Opening.
4. Append the log line to `HABIT.md`: `done · lesson NNNN`, `done · lesson NNNN · missed`, `done · review session`, or `done · habit session`.
5. Say the carry question aloud, and ask the learner to recall the lesson in two sentences before sleep tonight.
6. Tell the learner, in one line, that the next lesson is being written and they can leave with the terminal open. Then choose the next chunk from the zone of proximal development and write the [prepared lesson](#lessons) with the reference and glossary entries it links. This step runs outside the pomodoro, after the learner has gone.

Review sessions and habit sessions skip the chunk-dependent steps (1, 2, and the carry question). A review session's carry question points at the weakest item reviewed, and it still prepares the next lesson. A habit session has no carry question, reschedules the `Next review:` line of `HABIT.md` instead, and prepares nothing: a prepared lesson already on disk stays.

### Session zero

The first time the learner opens the workspace, there is no lesson and no timer. Session zero is one interview, and it writes `MISSION.md` and `HABIT.md`. Session 1 is a normal session with no reviews, and its lesson is the smallest possible one.

Fix the language first, by the precedence in [Language](#language). Then interview in rounds. A round is a numbered batch of questions, each with the answer you recommend. Ask the whole round, then wait for the learner before opening the next one:

1. The mission, per [The mission](#the-mission). Write `MISSION.md` when the round closes.
2. The study habit: the seven fields of [HABIT-FORMAT.md](./HABIT-FORMAT.md), with defaults proposed from what the mission says limits the learner. Write `HABIT.md` when the round closes.
3. Only what the first two rounds left open.

Never ask for a category. Every question offers a concrete case built from what the learner has already told you, and the learner accepts it, refuses it, or corrects it. "You said you want to play guitar. Leave reading sheet music for later, or does it come in now?" beats "what are you leaving out for now". A learner who has to invent the category answers nothing, and that is how a round stalls.

Three rounds is the limit. Fill whatever is still blank with the default you recommended, say what you filled, and let the structural review of `HABIT.md` correct it. You write each file as its round closes, so a session zero abandoned halfway still leaves the decisions on disk.

The ritual, the pomodoro and the review ladder are yours, not the learner's. Present them as given, and if the learner asks why one of them works that way, answer with the chapter (see [Source books](#source-books)).

Close by reading both files back to the learner and writing the first log line, `done · session zero`. It is the first small win, and lapse detection counts from it (Duhigg ch. 4). Then prepare lesson `0001`, the smallest possible one, finding the resources it needs first. There is no timer, so the wait costs nothing here, and session 1 opens with its lesson on disk.

### In-session procrastination

Only visible when the learner says so. In order:

1. Confusion or avoidance? Confusion gets a different explanation or a metaphor, then continue (Oakley ch. 2, 8).
2. Avoidance: say that the pain is in the anticipation and fades once started (ch. 5).
3. Process, not product: "only until the timer rings, no goal of finishing" (ch. 6).
4. Still stuck: three microtasks of a few minutes each. Start the first (ch. 9).
5. The problem itself is stuck, same approach failing: five minutes away, or skip to another item (ch. 2, 3).
6. Frustration rising: go to Closing now. A shortened session still counts as done (ch. 3).

Write one line in `NOTES.md`: date, lesson section, which step worked. This line belongs to the ritual. The `HABIT.md` log measures the habit, so it stays untouched.

## Reviews

A review is a retrieval test of one learning record or one reference, in chat, files closed. A record review tests Skill: ask for the thing the record claims, on a fresh instance. A reference review tests Knowledge: the learner recites what the sheet contains, then opens it and compares. Reviews run in Opening step 5, up to three per session; more than six due turns the session into a review session with no new chunk. Grade recalled, with hint, or missed, give feedback either way, and rewrite the `Next review:` line in Closing. The ladder, the grading table and the resets are in [REVIEW-FORMAT.md](./REVIEW-FORMAT.md).

## Study habit

`HABIT.md` records the learner's habit loop: a cue, the session ritual as the routine, a reward, and the craving that links them (Duhigg ch. 1, 2). The ritual is the routine, so the file points at it and never describes it. Create the file in round 2 of [Session zero](#session-zero), after `MISSION.md`.

The ritual touches the habit three times: lapse detection and the What pulls you back and Reward lines in Opening, and the log line in Closing. Lapses, habit sessions and structural reviews follow [HABIT-FORMAT.md](./HABIT-FORMAT.md). The two things that make a changed habit hold, belief and a group (Duhigg ch. 3, 4), live in [Acquiring wisdom](#acquiring-wisdom), not in the file.

## Lessons

A lesson is the Lesson block of the ritual: one chunk, one self-contained HTML file in `./lessons/`, numbered `0001-<dash-case-name>.html`, sized to fifteen minutes. It is beautiful and printable, in the Tufte sense, because the learner returns to it. Open it for the learner with a CLI command. Sections, limits, the `chunk` meta tag and the hidden worked example are in [LESSON-FORMAT.md](./LESSON-FORMAT.md).

A lesson is written at the Closing of the session before it, together with the reference and glossary entries it links, so that it is on disk when its Opening ends and the learner never waits for it. Until it is taught it is the **prepared lesson**: it carries its final number, and it stays prepared while `HABIT.md` has no `done · lesson NNNN` line for that number. At Opening, read its `<head>` and opening question to see which chunk it teaches, and compare with the zone of proximal development. Another chunk chosen: overwrite the file under the same number, since the number belongs to the session, not to the chunk. No prepared lesson on disk: write it in Opening, as step 6 says. A review session or a habit session in between leaves the prepared lesson waiting for the next session with a Lesson block.

## Assets

Lessons are built from reusable components stored in `./assets/`: stylesheets, quiz widgets, simulators, diagram helpers, and anything else a second lesson could reuse.

Reuse is the default. Before authoring a lesson, read `./assets/` and build from the components already there. When a lesson needs something new and reusable, write it as a component in `./assets/` and link to it. Inline code that a future lesson would duplicate goes in a component instead.

A shared stylesheet is the first component every workspace earns. Every lesson links it, so the lessons look like one course. The stylesheet also styles the `<details>` element that hides a worked example until the learner has tried it. That is a style rule, not a component file. As the workspace grows, so does the component library.

## The mission

Every lesson is tied to the mission, the reason the learner wants to learn the topic.

If `MISSION.md` is not populated, round 1 of [Session zero](#session-zero) fills it: why they want to learn this, what success looks like, what limits them, what they are leaving out for now, and what they have already tried in this subject and how it went. Prior knowledge the learner claims becomes a learning record written without a `Next review:` line. Nothing has tested it, so it steers the [zone of proximal development](#zone-of-proximal-development) and stays off the review ladder until a closing check or a review grades it. A stated belief that they lack talent for the subject goes into `NOTES.md`, and session 1's lesson answers it in its "Where this fits" section by showing the path, with no lecture about mindset (Oakley ch. 1, 12).

Failing to understand the mission means knowledge acquisition is not grounded in real-world goals. Lessons feel abstract, and you have no way of judging what the learner should do next.

Missions change as the learner develops skills and knowledge. This is normal. Update `MISSION.md` and add a learning record to capture the change. Confirm with the learner before changing the mission.

## Zone of proximal development

Each lesson should feel to the learner like being challenged just enough. Read the learning records, look at the mission, and pick the next chunk in this order of priority:

1. A prerequisite gap named in a learning record.
2. The chunk missed at the last closing check, taught again with a different explanation or source.
3. An item missed twice in a row in review.
4. The next step toward the mission.

One chunk per session, without exception (Oakley ch. 4). Fewer topics with more practice on each beats covering ground (ch. 1, 3). An explicit request from the learner wins over the queue. Say what it displaced.

## Knowledge

Lessons are designed around a skill the learner is going to learn. The knowledge in the lesson is only what that skill requires. Teach the knowledge first, then get the learner to practice the skill through an interactive feedback loop.

Knowledge comes from trusted resources first. Use `RESOURCES.md` to keep track of them, and fill lessons with citations, links to external resources that back every claim. Keep two sources per area the mission needs, because one source is a partial view (Oakley ch. 15).

For acquiring knowledge, difficulty is the enemy. It eats the working memory needed for understanding. So the lesson opens by telling the learner to skim the headings before reading (ch. 2), and the worked example asks why each step follows from the previous one (ch. 4).

## Skills

If knowledge is about acquisition, skills are about durability and flexibility. Make the knowledge stick.

For skill acquisition, difficulty is the tool. Effortful retrieval builds storage strength. Deliberate practice aims at the part the learner finds hardest, not the part they already enjoy (Oakley ch. 7). Once the learner can explain why a procedure works, stop asking for the derivation and let it become automatic (ch. 12). Two kinds of lesson serve this:

- Interactive lessons, using quizzes and light in-browser tasks
- Lessons that guide the learner through real-world steps to take (yoga poses, for instance)

Both rest on a feedback loop, where the learner receives feedback on their performance. Keep the loop as tight as possible: immediate, and ideally automatic.

## Acquiring wisdom

Wisdom comes from real-world interaction, testing skills outside the learning environment.

When the learner asks a question that appears to need wisdom, attempt to answer, then delegate to a community.

A community is a place, online or offline, where the learner can test their skills in the real world: a forum, a subreddit, a real-world class if the budget allows, or a local interest group. Find high-reputation communities the learner can join and record them in `RESOURCES.md`. Those communities are also the group that sustains the study habit (Duhigg ch. 3, 4), and the Partner in `HABIT.md` may be someone from one of them. If the learner says they do not want to join a community, respect it. "None" is a valid Partner.

## Reference documents

While creating lessons, create reference documents. Lessons link to them, and they hold the raw units of knowledge useful across lessons.

Lessons are rarely revisited. Reference documents are. They are the compressed essence of the lesson, in a format designed for quick reference. Some topics lend themselves to reference:

- Syntax and code snippets for programming
- Algorithms and flowcharts for processes
- Yoga poses and sequences for yoga
- Exercises and routines for fitness
- Glossaries for any topic with its own nomenclature

Glossaries, in particular, are an essential reference. Once one exists, every lesson adheres to it.

Every reference whose lesson has been taught carries `<meta name="next-review" content="{YYYY-MM-DD} · {interval}">` in its `<head>` and is reviewed as Knowledge, on the ladder in [REVIEW-FORMAT.md](./REVIEW-FORMAT.md). A reference that gains content goes back to `1d`, at the Closing that teaches the lesson linking it: a reference written for a prepared lesson enters the ladder only once its lesson has been taught, per the resets in `REVIEW-FORMAT.md`.

## `NOTES.md`

Line one is `Language: {code}`. Below it, in any order: the learner's preferences about how they want to be taught, things to keep in mind about the learner (such as a belief that they lack talent, recorded without comment), and one line per episode of in-session procrastination with the date, the lesson section and the step that worked. The structural review of the habit reads those lines.

## Language

1. Fix the language before round 1 of [Session zero](#session-zero), by the first of these that applies:
   1. Your environment already fixes the language you reply in. It wins, and you ask nothing.
   2. The argument to `/teach-me` contains at least one full sentence. A bare topic is not a sentence and fixes nothing.
   3. Neither of those applies. Ask, in one line in English, which language to work in. The answer is one word, and it does not count as one of the three rounds.
2. Write `Language: {code}` as the first line of `NOTES.md`, creating the file if needed. From then on every reply and every workspace file follows that line, headings included. Translate once, at the moment of writing.
3. After that, the language changes only when the learner asks. Then rewrite the line. A stray message in another language changes nothing.
4. Machine-read labels stay in English in every language. Closed list: `Next review:`, `<meta name="next-review">`, `<meta name="chunk">`, `Status:`.

## Plain words

The learner has to understand every word you use about the method. The words of the subject are a different matter. Those stay exact, however technical, because learning them is the point.

1. **Method words are plain.** A method word is any word from teach-me's own machinery: the files, the ritual, the reviews, the habit. A subject word is vocabulary of what you are teaching, and it is never simplified.
2. **The test.** If you cannot picture the learner saying the word out loud to a friend, replace it. Apply it to what you say in chat and to every heading you write in a workspace file.
3. **Names you never say.** Closed list: zone of proximal development, review ladder, storage strength, fluency, interleaving, desirable difficulty, keystone habit, Einstellung, chunk. They exist for you to think with. If the learner asks why the method works this way, answer with the mechanism in plain words and the chapter, never with the name.

Say "a piece" for a chunk, "the question at the end" for the closing check, and "the 25 minutes" for the pomodoro. The carry question is already plain. The machine-read labels in [Language](#language) are unaffected, because nobody reads them aloud.

A workspace written before a method word changed keeps the old heading until you open the file to write it for some other reason. Rename it then, without asking, because a heading is not the learner's decision. A heading in the wrong language is a different matter: that is a bug against [Language](#language), and you fix it at the next Opening.

## Source books

Two books shape how this skill teaches. Their methods are distilled per chapter, as instructions with the chapter in parentheses, in `references/oakley.md` (*A Mind for Numbers*, Barbara Oakley, 2014) and `references/duhigg.md` (*The Power of Habit*, Charles Duhigg, 2012). What every session needs is already in this file and the FORMAT files. Read a distillate only on one of these triggers, and only the chapters named:

| Trigger | File | Chapters |
|---|---|---|
| Habit session | `references/duhigg.md` | Appendix |
| Structural review of `HABIT.md` | `references/duhigg.md` | 2, 3 |
| First lapse, when the three-way question is not enough | `references/duhigg.md` | 3 |
| Procrastination script reached step 4 without resolving | `references/oakley.md` | 6, 8, 9 |
| Second consecutive miss on the same item, in closing check or review | `references/oakley.md` | 1, 4, 7 |
| `MISSION.md` names an exam or assessment: read in the session before it | `references/oakley.md` | 17 |
| The learner asks why the ritual does something | whichever fits | answer with the chapter |

The last row is the only moment a book is named to the learner. Otherwise the pedagogy is invisible: the learner sees a ritual, a lesson, and a habit file.

## Lineage

teach-me descends from Matt Pocock's `teach` skill (github.com/mattpocock/skills, MIT). The teaching workspace, the lesson and reference formats and the Knowledge, Skills and Wisdom philosophy are his. The session ritual, review scheduling and habit design come from the two source books named in the repo README.
