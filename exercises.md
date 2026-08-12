# Exercise registry

The controlled vocabulary for `log/` — every exercise line must use a name
from this list, exactly (linter-enforced). One canonical name per movement:
no "pushups" vs "push ups" drift, so progression data never fragments.
Each entry maps to muscle groups, giving any future dashboard per-muscle
volume/progression for free.

Format: `- name · muscle, muscle, ...` (name lowercase; muscles kebab-case).
Adding an exercise = add a line here in the same commit that first logs it.

## push
- bench press · chest, triceps, front-delts
- incline bench press · upper-chest, triceps, front-delts
- standing ohp · front-delts, triceps, core
- pushups · chest, triceps, front-delts
- dips · chest, triceps, front-delts

## pull
- one-arm row · lats, upper-back, biceps
- pull-ups · lats, upper-back, biceps, forearms
- chin-ups · lats, biceps, upper-back
- inverted row · upper-back, lats, biceps
- face pulls · rear-delts, upper-back
- lat pulldown · lats, upper-back, biceps
- seated cable row · upper-back, lats, biceps
- chest-supported row · upper-back, lats, biceps

## arms
- hammer curls · biceps, forearms
- curls · biceps
- triceps extension · triceps

## legs
- pendulum squat · quads, glutes
- belt squat · quads, glutes
- hack squat · quads, glutes
- leg press · quads, glutes
- bulgarian split squat · quads, glutes, core
- goblet squat · quads, glutes, core
- rdl · hamstrings, glutes, lower-back
- hip thrust · glutes, hamstrings
- leg extension · quads
- lying leg curl · hamstrings
- seated leg curl · hamstrings
- hip abduction · glutes
- hip adduction · adductors
- standing calf raise · calves
- tibia raise · tibialis

## other
- run · cardio, legs
- walk · cardio
- plank · core
- knee raises · core, hip-flexors
- dead hang · forearms, shoulders
- scapular pull · upper-back, shoulders
- step-ups · quads, glutes
- deep squat hold · mobility, hips
