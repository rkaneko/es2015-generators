import readFile from '../utils/io/read-file';
import chain from '../utils/chain';
import splitLines from '../utils/io/split-lines';
import numberLines from '../utils/io/number-lines';
import printLines from '../utils/io/print-lines';

(() => {
  const fileName = process.argv[2];
  readFile(fileName, chain(splitLines, numberLines, printLines));
})();
