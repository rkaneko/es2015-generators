import '../utils/polyfill';

function* take(n, iterable) {
  for (const x of iterable) {
    if (n <= 0) return;
    n--;
    yield x;
  }
}

function* naturalNumbers() {
  for (let n = 0;; n++) {
    yield n;
  }
}

function run() {
  for (const x of take(3, naturalNumbers())) {
    console.log(x);
  }
}

(() => {
  run();
})();
