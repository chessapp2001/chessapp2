const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'chessapp.sol');
const source = fs.readFileSync(campaignPath, 'UTF-8');

var input = {
  language: 'Solidity',
  sources: {
    'chessapp.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
fs.ensureDirSync(buildPath);

for (let contractName in output.contracts['chessapp.sol']) {
  fs.outputJSONSync(
    path.resolve(buildPath, contractName + '.json'),
    output.contracts['chessapp.sol'][contractName],
  );
}
