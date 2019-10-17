const { getRandomContrastCompliant } = require('../dist/index');

const iterations = 100;
for (let i = 0; i <= iterations; i++) {
  const test = getRandomContrastCompliant('#cdcdcd');
  console.warn(test);
}
