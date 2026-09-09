# HABIT.md Format

`HABIT.md` lives at the workspace root, beside `MISSION.md`. It records the learner's study habit: the loop that brings them back to the workspace. The session ritual is the routine of that loop, so this file never describes the routine; it points at it.

## Template

```md
# Study habit: {Topic}

Next review: {YYYY-MM-DD} · {14d | 30d}

## Cue
{Where the learner is and what they finish doing right before opening the workspace. One or two lines. Must be something the learner notices, not something only the agent can see.}

## Cadence
{Strict form: `3x per week` or `Mon, Wed, Fri`. Read by the agent to detect lapses.}

## Reward
{What the learner gets when the ritual closes. One line. The learner's choice.}

## Craving
{One sentence the learner reads before starting. Names the reward, so the cue triggers anticipation and not only the routine.}

## Plan
When {cue}, I open the workspace and run the session, because I get {reward}.

## Inflection points
- If {typical temptation}, then {competing response}.
- If {…}, then {…}.

## Partner
{One person who knows the learner is doing this, or "none".}

## Log
- {YYYY-MM-DD} · done · {lesson 0004 | review | habit session}
- {YYYY-MM-DD} to {YYYY-MM-DD} · lapse · {cue did not fire | did something else | not worth it} ({one-word reason})
- weeks {N} to {M} · {k} done · {j} lapses
```

## Rules

- **One habit per workspace.** The session is the keystone habit. Do not register a second one.
- **One screen.** The log compacts at each structural review; the other fields never grow.
- **The cue must be noticeable by the learner.** A cue only the agent can see never fires.
- **Cue and reward are the learner's choices.** The agent proposes; it never decides.
- **Lapses stay.** Never delete a lapse line. The history is signal.
- **Changing the loop is a joint act.** The agent rewrites a field only after the learner answers, never on its own from the log.
- **No duplication.** Time available lives in `MISSION.md` Constraints; communities live in `RESOURCES.md`. Point, don't copy.

## Lifecycle

- **Created** in the first session, after `MISSION.md` and before the first lesson: five direct questions, defaults proposed from the mission's constraints, five minutes.
- **Touched every session**: the ritual prints Craving and Reward at the start; the agent writes the `done` line at the end.
- **Lapse detected** at the start of a session when the gap exceeds twice the Cadence interval, or when the learner reports it.
- **First lapse**: one three-way question (cue did not fire / did something else / not worth it), one field changed, lesson continues.
- **Second consecutive lapse, or the learner says they stopped**: a habit session replaces the lesson and runs the appendix checklist from `references/duhigg.md`. A temporary `## Tally` section may exist for a few days of cue counting; the next consolidation removes it.
- **Structural review** at `Next review:` (`14d` after creation, then `30d` repeating; line format and label in `REVIEW-FORMAT.md`) and after every habit session: reopen cue, reward and plan with the learner, check whether the stated reward is the craved one, compact the log.
- Written in the learner's language, headings included.
