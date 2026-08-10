#!/usr/bin/env bun
// Lints staged files before commit:
//  1. log/*.md (non-private) must conform to FORMAT.md v1.1
//  2. no staged file may match patterns from .private-lint-patterns
//     (gitignored file, one regex per line — its contents are private
//     by design: a public blocklist would itself be a disclosure)
// Exit 1 on any violation. Run manually: bun scripts/lint-log.ts [--all]

import { $ } from "bun";
import { existsSync, readFileSync } from "fs";

const HEADER =
  /^## (\d{4}-\d{2}-\d{2}) · (homegym|eden|park|travel|run) · .+?( · \d{2}:\d{2}–\d{2}:\d{2})?$/;
const EXERCISE = /^- .+? \d+x[\d-]+ @\S+( \(.+\))?$/;
const NOTE = /^note: .+$/;

const all = process.argv.includes("--all");
const staged = all
  ? (await $`git ls-files`.text()).trim().split("\n")
  : (await $`git diff --cached --name-only --diff-filter=ACM`.text())
      .trim()
      .split("\n")
      .filter(Boolean);

let errors = 0;
const fail = (msg: string) => {
  console.error(`lint-log: ${msg}`);
  errors++;
};

// 1. FORMAT.md conformance for public logs
for (const f of staged.filter(
  (f) => f.startsWith("log/") && f.endsWith(".md") && !f.includes("private"),
)) {
  if (!existsSync(f)) continue;
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((line, i) => {
    const where = `${f}:${i + 1}`;
    if (line.startsWith("## ") && !HEADER.test(line))
      fail(`${where} bad header (see FORMAT.md): ${line}`);
    else if (line.startsWith("- ") && !EXERCISE.test(line))
      fail(`${where} bad exercise line (name SxR @load): ${line}`);
    else if (line.startsWith("note:")) {
      if (!NOTE.test(line)) fail(`${where} bad note line: ${line}`);
      if (i > 0 && lines[i - 1].trim() !== "")
        fail(`${where} note needs a blank line above it (markdown merges it into the last bullet otherwise)`);
    }
  });
}

// 2. privacy scan across ALL staged files
const patternFile = ".private-lint-patterns";
if (existsSync(patternFile)) {
  const patterns = readFileSync(patternFile, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((p) => new RegExp(p, "i"));
  for (const f of staged) {
    if (!existsSync(f) || f === patternFile) continue;
    const text = readFileSync(f, "utf8");
    for (const re of patterns)
      if (re.test(text))
        fail(`${f} matches a private pattern — move it to the sidecar`);
  }
} else {
  console.error("lint-log: warning — .private-lint-patterns missing, privacy scan skipped");
}

if (errors) {
  console.error(`\nlint-log: ${errors} problem(s). Nothing committed.`);
  process.exit(1);
}
console.log("lint-log: clean");
