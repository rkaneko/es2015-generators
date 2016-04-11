import '../utils/polyfill';

function* callee() {
  try {
    yield 'b';
    yield 'c';
  } catch (e) {
    console.log(`[callee] ${e}`);
  } finally {
    console.log('finally callee');
  }
}

function* caller() {
  try {
    yield 'a';
    yield* callee();
    yield 'd';
  } catch (e) {
    console.log(`[caller] ${e}`);
  }
}

function run() {
  const callerGen = caller();

  console.dir(callerGen.next());
  console.dir(callerGen.next());
  console.dir(callerGen.next());

  callerGen.throw(new Error('Problem!'));
}

(() => {
  run();
})();
