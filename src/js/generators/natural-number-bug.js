import '../utils/polyfill';
import take from './take';

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
