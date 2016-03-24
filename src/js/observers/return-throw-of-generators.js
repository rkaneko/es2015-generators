import '../utils/polyfill';

function* genFunc1() {
  try {
    console.log('Started');
    yield;
  } finally {
    console.log('Exiting');
  }
}

function* genFunc2() {
  try {
    console.log('Started');
    yield;
  } finally {
    yield 'Not done, yet!';
  }
}

function* genFunc3() {
  try {
    console.log('Started');
    yield;
  } catch (error) {
    console.log(`Caught: ${error}`);
    yield;
  }
}

function* genFunc4() {
  console.log('Started Not catch error function');
  yield;
}

function runGenFunc1() {
  const gen1 = genFunc1();
  console.dir(gen1.next());
  console.dir(gen1.return('Result'));
}

function runGenFunc2() {
  const gen2 = genFunc2();
  console.dir(gen2.next());
  console.dir(gen2.return('Result'));
  console.dir(gen2.next());
}

function runGenFunc3() {
  const gen3 = genFunc3();
  console.dir(gen3.next());
  console.dir(gen3.throw(new Error('Problem!')));
  console.dir(gen3.next());
}

function runGenFunc4() {
  const gen4 = genFunc4();
  console.dir(gen4.next());
  console.dir(gen4.throw(new Error('Problem!')));
}

(() => {
  runGenFunc1();
  console.log('\n');
  runGenFunc2();
  console.log('\n');
  runGenFunc3();
  console.log('\n');
  runGenFunc4();
})();
