# Log format spec (v1.1)

Every entry in `log/YYYY-MM.md` follows this grammar — strictly. The coach
writes all entries, so conformance is by construction, not discipline. This
is what keeps the door open for future tooling (dashboards, progression
charts, exports) without adopting a heavier standard.

## Grammar

```
entry       = header , { exercise-line } , [ blank-line , note-line ] ;
              (* blank line before note is REQUIRED — without it markdown
                 renders the note as part of the last list item *)
header      = "## " date " · " context " · " focus [ " · " timerange ] ;
timerange   = HH:MM "–" HH:MM ;      (* session start–end, en dash *)
date        = YYYY-MM-DD ;
context     = "homegym" | "eden" | "park" | "travel" | "run" ;
focus       = free text (e.g. "legs", "push+pull", "5k easy") ;
exercise    = "- " name " " sets "x" reps " @" load [ " (" note ")" ] ;
sets, reps  = integer ;             (* reps may be a range: 8-10 *)
load        = number [ "kg" ]       (* kg implied when omitted *)
            | "bw"                  (* bodyweight *)
            | "bw+" number          (* weighted bodyweight, e.g. bw+10 *)
            | "band-" level ;       (* band work, e.g. band-green *)
note-line   = "note: " free text ;
```

## Examples

```markdown
## 2026-08-11 · eden · legs
- belt squat 4x10 @40 (first time, felt great)
- lying leg curl 3x12 @35
- standing calf raise 4x15 @40

note: left knee totally fine

## 2026-08-13 · homegym · push+pull
- bench press 4x8 @22.5
- pull-ups 3x6 @bw
- one-arm row 3x10 @25
- face pulls 3x15 @band-green

## 2026-08-14 · run · 5k easy
- run 1x1 @bw (5.2km, 32min, easy pace, knees quiet)
```

## Parsing contract

- One entry per `## ` header; one exercise per `- ` line; regexes:
  - header: `^## (\d{4}-\d{2}-\d{2}) · (\w+) · (.+?)(?: · (\d{2}:\d{2}–\d{2}:\d{2}))?$`
  - exercise: `^- (.+?) (\d+)x([\d-]+) @(\S+)(?: \((.+)\))?$`
  - note: `^note: (.+)$`
- Progression notation inside an entry (e.g. `@30→40`) records a
  mid-session weight change; the right side is the working weight.
- Anything that can't fit the grammar goes in the `(note)` or `note:`
  free-text slots — never invent new line syntax.

Format is versioned: breaking changes bump this file's version and get a
migration note. v1→v1.1: optional `· HH:MM–HH:MM` header suffix (additive,
no migration needed). Conformance is enforced by `scripts/lint-log.ts`
via the repo's pre-commit hook. (Related prior art: [Traindown](https://traindown.com),
[Fitdown](https://github.com/datavis-tech/fitdown) — this format is
Fitdown-adjacent but optimized for LLM-written, human-dictated entries.)
