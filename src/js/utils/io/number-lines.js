import '../polyfill';
import leftpad from '../leftpad';

/**
 * Prefixes numbers to a sequence of lines.
 */
export default function* numberLines(target) {
  try {
    for (let lineNo = 0; ; lineNo++) {
      const line = yield;
      const padedLineNo = leftpad(lineNo, 3, '');
      target.next(`${padedLineNo}: ${line}`);
    }
  } finally {
    // Signal end of output sequence
    target.return();
  }
}
