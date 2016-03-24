import '../utils/polyfill';

function* objectEntries(obj) {
  const propKeys = Reflect.ownKeys(obj);

  for (const propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

function runObjectEntries() {
  const jane = { first: 'Ryota', last: 'Kaneko' };
  for (const [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
  }
}

(() => {
  runObjectEntries();
})();
