# MISSION.md Format

`MISSION.md` lives at the workspace root. It holds the concurso the learner is preparing for and the reason they want the post. The Edital ativo decides *what* is studied; this file decides nothing about the curriculum and everything about why the learner comes back.

Derived from teach-me's `MISSION-FORMAT.md`. The section "Leaving out for now" is gone: in teach-me the learner chooses the scope, and here the edital does.

## Template

```md
# Mission: {cargo}, {órgão}

## The concurso
- Carreira: {the family of posts this workspace prepares for}
- Cargo: {the post named in the edital}
- Órgão: {the body holding the exam}
- Banca: {the examining board, or "a definir"}
- Edital: {number and year of the Edital ativo, or the likely bodies while none exists}
- Exam date: {YYYY-MM-DD, or the month it is expected}
- Vagas: {number, plus cadastro de reserva when there is one}

## Why
{1-3 sentences. What changes in the learner's life when they hold this post. Push past "passar no concurso": that is the exam, not the reason.}

## Success looks like
- {A specific, observable thing: a score, a position, a date}
- {…}

## What limits you
- {Minutes per day, days per week, money for material, commitments that bound the approach}

## Setup
- PDF converter: {ok, version | missing, see SETUP.md} ({YYYY-MM-DD})
```

## Rules

- **One concurso per workspace.** One workspace per Carreira, one Edital ativo inside it. Two unrelated careers are two workspaces. An edital swap rewrites the `## The concurso` block and keeps everything else, records included.
- **The exam date is a fact, not a wish.** It comes from the edital. While no edital exists, write the month and say where it came from. Every Regime, every review interval and every Simulado completo hangs off this line, so it is the first thing you correct when the banca moves it.
- **Concrete over abstract.** "Sair do aluguel e morar em Boa Vista perto da minha mãe" beats "ter estabilidade".
- **Push back on vagueness.** A learner who cannot say why wants a plan, not a mission. Interview them before writing anything.
- **Never ask what they are leaving out.** The edital is the scope. Asking a learner to name what they will skip in a curriculum they have not read produces an answer they will regret.
- **Ask with a case, never a category.** Offer something concrete drawn from what they already said, and let them accept, refuse or correct it. See [SESSION-ZERO.md](./SESSION-ZERO.md).
- **The Setup line is one line, and it is for you.** It records whether `tools/transcrever.py` can run on this machine, so a later session does not retry a command that is not there. Rewrite it when it changes.
- **Keep it short.** Past one screen it has stopped being a compass.
- Written in the learner's language, headings included, following Escrita in `SKILL.md`.
