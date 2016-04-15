import '../utils/polyfill';

export default function* map(iterable, mapFunc) {
  for (const x of iterable) {
    yield mapFunc(x);
  }
}
