# teach-me

Two Claude Code skills that study with you over many sessions, in the same package:

- **teach-me** teaches you any topic, one 25-minute pomodoro at a time, with spaced reviews and a study habit tracked beside your lessons.
- **drill-me** prepares you for a public-service exam from your edital and your banca, on real past questions, with a pace set by the time you have left.

They share their two source books and their session ritual. Everything else differs, because in teach-me you choose what to learn and in drill-me the edital chooses.

## Install

With the `skills` CLI, which asks which skill you want:

```sh
npx skills add matheuszambonin/teach-me
```

By hand, as a symlink into your Claude Code skills directory:

```sh
git clone https://github.com/matheuszambonin/teach-me
ln -s "$(pwd)/teach-me/skills/teach-me" ~/.claude/skills/teach-me
ln -s "$(pwd)/teach-me/skills/drill-me" ~/.claude/skills/drill-me
```

Each skill is self-contained: the files they have in common are real copies, not links, so installing one alone works.

## teach-me

Create an empty directory for the topic, open Claude Code inside it, and run:

```
/teach-me
```

Session zero has no lesson and no timer. It interviews you in rounds about why you want to learn this, and sets up your study habit. Every session after that follows the same ritual inside one pomodoro: reviews in chat, one new chunk in the browser, a closing check, and a log line in your habit file. The next lesson is written after you leave, so it is waiting on disk when the next session opens. The agent works in your language, taken from your setup or from what you typed, and asks if it cannot tell.

The directory becomes your teaching workspace: `MISSION.md`, `HABIT.md`, `GLOSSARY.md`, `RESOURCES.md`, `NOTES.md`, and folders for lessons, references, learning records and shared assets.

## drill-me

Create a directory for the concurso, open Claude Code inside it, and run:

```
/drill-me
```

It needs one dependency, a PDF converter, installed once. See [skills/drill-me/SETUP.md](./skills/drill-me/SETUP.md).

Session zero interviews you about the concurso, reads your edital, and turns it into `EDITAL.md`: one line per topic, each carrying how many points it is worth on the exam. That file is the curriculum, and how many hours you have left per topic sets the pace: lessons and practice when there is time, mock exams every session when there is not.

Every session works one topic, picked by what it is worth times how badly you answer it. Questions are real ones from past exams of your banca whenever they exist. Where they do not, the skill takes a real question of another banca and repackages it into your banca's shape, keeping the official answer key behind it. Only questions with a real key count towards your score, so readiness is never measured against an invented answer.

Everything you answer is appended to `dados.js`, and `painel.html` beside it does every calculation in your browser: your score over time, your hit rate per topic, and the passing line when the edital gives one. The agent never does that arithmetic, and the page shows its count beside the agent's so a slip is visible.

## Pedagogy

The method comes from two books:

- Barbara Oakley, *A Mind for Numbers* (2014): focused and diffuse modes, chunking, retrieval over rereading, spacing, interleaving, illusions of competence, procrastination.
- Charles Duhigg, *The Power of Habit* (2012, read in the Brazilian edition *O Poder do Hábito*, Objetiva, translated by Rafael Mantovani): the habit loop, craving, the golden rule of habit change, keystone habits, willpower, and the appendix's framework.

The skills paraphrase their methods as instructions to the agent, each with its chapter. No passage from either book is reproduced, and the books are not included. Buy them; they are worth it.

## Lineage

teach-me descends from Matt Pocock's `teach` skill ([github.com/mattpocock/skills](https://github.com/mattpocock/skills), MIT). The teaching workspace, the lesson and reference formats and the Knowledge, Skills and Wisdom philosophy are his. The session ritual, review scheduling and habit design come from the two source books above.

drill-me is teach-me's exam-preparation sibling. Its session zero interrogation is adapted from Matt Pocock's `grilling` skill (MIT). Its copy of [blader/humanizer](https://github.com/blader/humanizer) (MIT) is pinned to one commit, with the commit and the licence at the top of the file. The Regime, the Edital ativo, the Simulado, the repackaged question and the Painel are its own.

## License

MIT. See [LICENSE](./LICENSE), which carries every copyright notice in the package.
