# HABIT.md Format

`HABIT.md` lives at the workspace root, beside `MISSION.md`. It records the study habit, the pace the workspace runs under, the dates of the Simulados completos and the log of every session. The session ritual is the routine of the habit loop, so this file never describes the routine; it points at it.

Derived from teach-me's `HABIT-FORMAT.md`. What is new here: the `Regime:` line, the `Full mock:` line, the minutes and turns in the log, the `open` state, and the break table, which moved out of `SKILL.md`.

## Template

```md
# Study habit: {cargo}, {órgão}

Regime: {Longo | Curto | Emergência} · {auto | forçado}
Full mock: {YYYY-MM-DD} · {marcado | feito NNNN} ; {YYYY-MM-DD} · {marcado}
Next review: {YYYY-MM-DD} · {14d | 30d}

## Cue
{Where the learner is and what they finish doing right before opening the workspace. Something the learner notices, not something only the agent can see.}

## How often
{Strict form: `3x per week` or `Mon, Wed, Fri`. Read by the agent to detect lapses and to derive the Regime.}

## How long
{Minutes per session and days per week, as the learner chose them. Read by the agent to derive the Regime and to size a Simulado curto.}

## Reward
{What the learner gets when the ritual closes. One line. The learner's choice.}

## What pulls you back
{One sentence the learner reads before starting. Names the reward, so the cue triggers anticipation and not only the routine. Duhigg's craving (ch. 2); the heading never says so.}

## Plan
When {cue}, I open the workspace and run the session, because I get {reward}.

## If it goes wrong
- If {typical temptation}, then {competing response}.
- If {…}, then {…}.

## Partner
{One person who knows the learner is doing this, or "none".}

## Log
- {YYYY-MM-DD} · open · {simulado curto | lição 0004} · {N}min
- {YYYY-MM-DD} · done · {sessão zero | lição 0004 | simulado curto | simulado completo 0007 | revisão | sessão de hábito} · {N}min · {N} turnos
- {YYYY-MM-DD} · regime · Curto → Emergência
- {YYYY-MM-DD} to {YYYY-MM-DD} · lapse · {cue did not fire | did something else | not worth it} ({one-word reason})
- weeks {N} to {M} · {k} done · {j} lapses
```

## The three lines at the top

- **`Regime:`** is derived, never asked. The arithmetic and what each Regime runs are in `SKILL.md`. Recompute it at every Opening. When it tightens, say in one line what changes from now on and write a `regime` line in the log. `forçado` marks a Regime the learner asked to tighten, and it stays until a new exam date loosens it and they accept.
- **`Full mock:`** carries the dates of the Simulados completos the Regime asks for, in order, each `marcado` or `feito NNNN` with the Simulado's number. Under Emergência the line reads `none`. A marked date opens the preparation window described in `SIMULADO-FORMAT.md`, so it is written as soon as the Regime is known, not on the eve.
- **`Next review:`** is the structural review of this file. Same line format and label as `REVIEW-FORMAT.md`.

## The break

At Closing, say the break in one line with one concrete suggestion: water, stand up, stretch, look away from the screen. The learner sets their own alarm.

| Session | Break |
|---|---|
| up to 30 minutes | 5 minutes |
| up to 60 minutes | 10 minutes |
| up to 90 minutes | 15 to 20 minutes |
| every 2 hours summed in a day | 30 minutes |

The first time, add one sentence: the brain keeps working on the subject during the break (Oakley ch. 2). Above 90 minutes in one session, propose splitting it in two.

## Rules

- **One habit per workspace.** The session is the keystone habit. Do not register a second one.
- **One screen.** The log compacts at each structural review; the other fields never grow.
- **The log takes one line per session, even when several fall on the same day.** It carries the minutes and the turns the session cost. Turns feed the Balde arithmetic in `SKILL.md`, which is why the Closing writes them.
- **`open` becomes `done` at Closing.** An Opening that finds an `open` line runs the late close in `SKILL.md` first. An abandoned session counts as `done` when at least one batch was answered, and as a miss otherwise.
- **The cue must be noticeable by the learner.** A cue only the agent can see never fires.
- **Cue and reward are the learner's choices.** The agent proposes; it never decides.
- **The headings are the learner's words.** They follow Escrita in `SKILL.md`, so the book's own terms stay in `references/duhigg.md` and never reach this file. The same holds for the skill's machinery: the learner reads "ritmo", not "Regime", in any sentence you say out loud.
- **Lapses stay.** Never delete a lapse line. The history is signal.
- **Changing the loop is a joint act.** The agent rewrites a field only after the learner answers, never on its own from the log.
- **No duplication.** Minutes per day and days per week live here under How long, because the Regime is derived from them every Opening; `MISSION.md` keeps what *limits* the learner, not the schedule. The exam date lives in `MISSION.md`.

## Lifecycle

- **Created** in round 2 of [Session zero](./SESSION-ZERO.md), after `MISSION.md` and before session 1: the seven fields plus How long, defaults proposed from what the mission says limits the learner. The round closes by announcing the Regime from their own numbers.
- **Touched every session**: the Opening prints What pulls you back and Reward, asks how long they are studying and writes the `open` line; the Closing turns it into `done` with the minutes and the turns.
- **Lapse detected** at the start of a session when the gap exceeds twice the interval in How often, or when the learner reports it.
- **First lapse**: one three-way question (cue did not fire / did something else / not worth it), one field changed, the session continues.
- **Second consecutive lapse, or the learner says they stopped**: a habit session replaces the middle block and runs the appendix checklist from `references/duhigg.md`. A temporary `## Tally` section may exist for a few days of cue counting; the next consolidation removes it.
- **Structural review** at `Next review:` (`14d` after creation, then `30d` repeating) and after every habit session: reopen cue, reward and plan with the learner, check whether the stated reward is the craved one, compact the log. Compare the average minutes of the last two weeks against How long; when it drifts by more than a third, propose correcting the plan, and change it only if the learner accepts. Under Emergência, a structural review that would fall inside the last week is skipped: say so in one line.
- Written in the learner's language, headings included.
