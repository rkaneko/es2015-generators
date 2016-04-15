import filter from './filter';
import map from './map';
import take from './take';

function run() {
  const arr = [...take(4, filter(naturalNumbers(), x => (x %s) === 0))];
  console.dir(arr);
}


