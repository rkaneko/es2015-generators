import '../utils/polyfill';

function* callee() {
  try {
    yield 'b';
    yield 'c';
  } finally {
    console.log('finally callee');
  }
}

function* caller() {
  try {
    yield 'a';
    yield* callee(); // yield* はgeneratorの返す値のdone = true を返すまで実行する?
    yield 'd';
  } finally {
    console.log('finally caller');
  }
}

function run() {
  const [x, y, z, v] = caller();
  console.log(`[x, y, y, z] = [${x}, ${y}, ${z}, ${v}]`);
  
  const result = [...caller()];
  console.dir(`result: ${result}`);

  const callerGen = caller();
  console.dir(callerGen.next());
  console.dir(callerGen.return());
}

(() => {
  run();
})();
