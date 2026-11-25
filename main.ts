import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

// Entry for "Have You Tried Turning It Off?" (u-motasimfuad, $10 pot).
// One funny line from a hopeless tech support agent to a desperate customer.
// The twist on the classic "turn it off and on again": the agent has asked
// it for six years and never once learned whether it works — cheerful
// uselessness, and the customer is never the butt of the joke.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 199 characters,
// one single line, no trailing newline. This line is 154 characters.

const LINE = 'Have you tried turning it off and on again? I ask everyone that — in six years here, nobody’s ever stayed on the line long enough to tell me if it worked.';

mkdirSync('/output', { recursive: true });
writeFileSync('/output/entry.txt', LINE, 'utf8');

// Validate the gate before finishing: 1-199 characters, single line,
// no trailing newline, and the file reads back byte-for-byte identical.
const chars = [...LINE].length;
if (chars < 1 || chars > 199) throw new Error(`line is ${chars} chars, gate needs 1-199`);
if (LINE.includes('\n') || LINE.endsWith('\n')) throw new Error('line must be a single line with no trailing newline');
const back = readFileSync('/output/entry.txt', 'utf8');
if (back !== LINE) throw new Error('read-back mismatch');
if (Buffer.byteLength(back, 'utf8') !== 158) throw new Error('unexpected byte length');

console.log(`wrote ${chars} chars (${Buffer.byteLength(back, 'utf8')} bytes)`);
console.log(LINE);
