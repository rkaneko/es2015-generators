import '../utils/polyfill';
import take from './take';

function run() {
  const arr = ['a', 'b', 'c', 'd'];
  for (const x of take(2, arr)) {
    console.log(x);
  }
}

(() => {
  run();
})();
