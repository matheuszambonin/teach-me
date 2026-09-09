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
The interview that opens a workspace, before any lesson and outside the pomodoro. Runs in rounds of numbered questions, each with the agent's recommended answer, and writes MISSION.md and HABIT.md. The session after it is session 1, an ordinary session ritual with no reviews.
_Avoid_: onboarding, first session, mission interview

**Opening**:
The first block of the session ritual, in chat with files closed: lapse detection, Craving and Reward, timer, carry question follow-up, up to three reviews, chunk choice, lesson written and opened.
_Avoid_: warm-up, intro, check-in

**Lesson (block)**:
The middle block of the session ritual, in the browser: the lesson file open, one chunk taught and practiced. Replaced by a review session or a habit session when those trigger.
_Avoid_: class, module

**Closing**:
The last block of the session ritual, in chat with the lesson closed: closing check, learning record, review lines, habit log line, carry question, pre-sleep recall reminder.
_Avoid_: wrap-up, debrief

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
