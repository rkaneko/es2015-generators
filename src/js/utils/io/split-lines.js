import '../polyfill';

/**
 * Turns a sequence of text chunks into a sequence of lines
 * (where lines are separated by newlines)
 * yield経由で受け取ったtext chunksを改行区切りでtargetに返す.
 */
export default function* splitLines(target) {
  let previous = '';
  try {
    const cond = true;
    while (cond) {
      previous += yield;
      let eolIndex;
      while ((eolIndex = previous.indexOf('\n')) >= 0) {
        const line = previous.slice(0, eolIndex);
        target.next(line);
        previous = previous.slice(eolIndex + 1);
      }
    }
  } finally {
    // Handle the end of the input sequence
    // 最終行で改行がない場合はその行をtargetに送信する.
    if (previous.length > 0) {
      target.next(previous);
    }
    // Singnal end of output sequence
    target.return();
  }
}
