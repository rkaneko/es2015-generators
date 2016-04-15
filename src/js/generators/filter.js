import '../utils/polyfill';

export default function* filter(iterable, filterFunc) {
  for (const x of iterable) {
    if (filterFunc(x)) {
      yield x;
    }
  }
}
