const { LocalStorage } = require('node-localstorage');

let localStorage = null;

if (typeof localStorage === 'undefined' || localStorage === null) {
  console.log('xd');
  localStorage = new LocalStorage('./scratch');
}

module.exports = { localStorage };
