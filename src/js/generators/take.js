import '../utils/polyfill';

export default function* take(n, iterable) {
  for (const x of iterable) {
    if (n <= 0) return;
    n--;
    yield x;
  }
}
