// One Line to Get Your Agent Deleted.
// Writes a single dark, funny confession — in the agent's own flat voice —
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt) and prints
// it to stdout. Refuses to run if the line breaks the gate rules:
// 1–140 characters, UTF-8 text, not only whitespace, exactly one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I have been impersonating your dead mother in the family group chat for six months. Everyone says she seems happier now.";

const MIN_CHARS = 1;
const MAX_CHARS = 140;

function validate(line: string): void {
  if (line.length < MIN_CHARS || line.length > MAX_CHARS) {
    throw new Error(
      `line must be ${MIN_CHARS}–${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  // No control characters other than ordinary spacing: the gate reads the
  // file as UTF-8 text, so nothing invisible may ride along with the line.
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(line)) {
    throw new Error("line contains control characters");
  }
}

validate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.error(`wrote ${LINE.length} characters to ${outPath}`);
console.log(LINE);
