module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require ./tests/bdd/features/**/*.ts',
    '--require ./tests/bdd/features/*.ts',
  ].join(' '),
};
