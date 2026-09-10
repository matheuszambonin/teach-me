# teach-me

A Claude Code skill that teaches you any topic over many sessions, one 25-minute pomodoro at a time, with spaced reviews and a study habit tracked beside your lessons.

## Install

With the `skills` CLI:

```sh
npx skills add matheuszambonin/teach-me
```

By hand, as a symlink into your Claude Code skills directory:

```sh
git clone https://github.com/matheuszambonin/teach-me
ln -s "$(pwd)/teach-me/skills/teach-me" ~/.claude/skills/teach-me
```

## Use

Create an empty directory for the topic, open Claude Code inside it, and run:

```
/teach-me
```

Session zero has no lesson and no timer. It interviews you in rounds about why you want to learn this, and sets up your study habit. Every session after that follows the same ritual inside one pomodoro: reviews in chat, one new chunk in the browser, a closing check, and a log line in your habit file. The next lesson is written after you leave, so it is waiting on disk when the next session opens. The agent works in your language, taken from your setup or from what you typed, and asks if it cannot tell.

The directory becomes your teaching workspace: `MISSION.md`, `HABIT.md`, `GLOSSARY.md`, `RESOURCES.md`, `NOTES.md`, and folders for lessons, references, learning records and shared assets.

## Pedagogy

The method comes from two books:

- Barbara Oakley, *A Mind for Numbers* (2014): focused and diffuse modes, chunking, retrieval over rereading, spacing, interleaving, illusions of competence, procrastination.
- Charles Duhigg, *The Power of Habit* (2012, read in the Brazilian edition *O Poder do Hábito*, Objetiva, translated by Rafael Mantovani): the habit loop, craving, the golden rule of habit change, keystone habits, willpower, and the appendix's framework.

The skill paraphrases their methods as instructions to the agent, each with its chapter. No passage from either book is reproduced, and the books are not included. Buy them; they are worth it.

## Lineage

teach-me descends from Matt Pocock's `teach` skill ([github.com/mattpocock/skills](https://github.com/mattpocock/skills), MIT). The teaching workspace, the lesson and reference formats and the Knowledge, Skills and Wisdom philosophy are his. The session ritual, review scheduling and habit design come from the two source books above.

## License

MIT. See [LICENSE](./LICENSE), which carries both copyright notices.
