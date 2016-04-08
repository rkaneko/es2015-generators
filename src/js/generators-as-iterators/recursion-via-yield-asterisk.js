import '../utils/polyfill';

function* foo() {
  yield 'a';
  yield 'b';
  return 'result';
}

function* bar() {
  yield 'x';
  yield* foo(); // equals for (const f of foo())
  yield* ['iterable', 'is', 'yieldable', '!'];
  // yield* はiterableなものであれば評価可能. generatorsはiterable
  yield 'y';
  return 'recursion via yield*';
}

function runRecursionViaYieldAsterisk() {
  const arr = [...bar()];
  console.dir(arr);
}

(() => {
  runRecursionViaYieldAsterisk();
})();
