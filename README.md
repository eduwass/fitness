# fitness

My gym, as a git repo. An AI coach that runs in the terminal, knows every
machine I have access to, programs my workouts, and logs every session as
markdown — committed to this repo, in public, as accountability.

## How it works

There is no app. The whole system is four markdown files and a log folder:

```
AGENTS.md      → the coach's instructions (any CLI agent reads this)
equipment.md   → everything I can train with: home gym + my commercial gym
profile.md     → who I am (public summary; real details stay local)
routine.md     → the current program
log/YYYY-MM.md → every workout, one file per month
```

I open a coding agent (Claude Code today — anything that reads `AGENTS.md`
tomorrow) inside this folder and talk to it like a coach:

> "training at home today, 40 min, give me the session"
> "log it: bench 4x8 @22.5, pull-ups 3x6, dips 3x10"
> "knee's acting up, swap leg day"

It answers with the next set, writes the log, and commits. Git is the
database, the backup, and the streak tracker — an empty month is visible,
and that's the point.

## From the gym floor

I train with my phone: [Moshi](https://moshi.chat) (iOS) → SSH to my
always-on Linux box → the agent, mid-workout, dictating sets between rests.
No fitness app survived contact with me; a terminal in my pocket did.

## Why this shape

- **Plain text beats databases** — any LLM in 2036 will still read this.
- **Agent-agnostic** — instructions live in `AGENTS.md`, not in an app's
  settings. Swap the model, keep the coach.
- **Public log as motivation** — the oldest trick (accountability), the
  nerdiest implementation (green squares = training streak).
- **Constraints are the program** — the coach only recommends what
  `equipment.md` says exists. No "just use the cable machine" when I'm on
  the terrace with two dumbbells.

## Fork it

Replace `equipment.md` with your gear, wipe `log/`, fill in your profile,
and point your agent of choice at the folder. That's the entire setup.
