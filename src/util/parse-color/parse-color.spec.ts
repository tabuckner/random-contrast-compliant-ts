import { parseColor } from './parse-color'

describe('ParseColor', () => {
  it('should do stuff', () => {
    const testEval = parseColor('#1ba0f7');
    expect(testEval).toBeTruthy();
  });
})
