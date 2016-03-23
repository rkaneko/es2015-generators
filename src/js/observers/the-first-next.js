require('../utils/polyfill');
import coroutine from '../utils/coroutine';

const wrappedConsumer = coroutine(function* () {
  console.log(`First input: ${yield}`);
  return 'wrapped DONE';
});

const normal = function* () {
  console.log(`First input: ${yield}`);
  return 'normal DONE';
};

function runWrapped() {
  console.dir(wrappedConsumer().next('hello wrapped'));
}

function runNormal() {
  const normalConsumer = normal();
  // the first invocation 'next()' is just to start an observer(consumer)
  console.dir(normalConsumer.next()); 
  console.dir(normalConsumer.next('hello normal'));
}

(() => {
  runWrapped();
  runNormal();
})();
