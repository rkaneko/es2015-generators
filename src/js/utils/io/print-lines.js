import '../polyfill';

export default function* printLines() {
  const cond = true;
  while (cond) {
    const line = yield;
    console.log(line);
  }
}
