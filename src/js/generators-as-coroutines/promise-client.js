import '../utils/polyfill';
import fetch from 'isomorphic-fetch';
const co = require('co');

const baseUrl = 'http://localhost:3000';

function getFile(url) {
  return fetch(url)
      .then((request) => (request.text()));
}

function run() {
  co(function* () {
    try {
      const [croftStr, bondStr] = yield Promise.all([
        getFile(`${baseUrl}/json/croft.json`),
        getFile(`${baseUrl}/json/bond.json`)
      ]);
      const croftJson = JSON.parse(croftStr);
      const bondJson = JSON.parse(bondStr);

      console.log(croftJson);
      console.log(bondJson);
    } catch (e) {
      console.log(`Failure to read: ${e}`);
    }
  });
}

(() => {
  run();
})();
