import '../utils/polyfill';

function* genFuncWithResult() {
  yield 'a';
  yield 'b';
  return 'result';
}

function runForOf() {
  for (const f of genFuncWithResult()) {
    console.dir(f);
  }
}

function runNext() {
  const genFunc = genFuncWithResult();
  console.dir(genFunc.next());
  console.dir(genFunc.next());
  console.dir(genFunc.next());
}

(() => {
  runForOf();
  console.log('\n');
  runNext();
})();
