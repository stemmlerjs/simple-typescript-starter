import app from '../src/index';
describe('app tests', () => {
  test('should add correctly', async () => {
    expect(app.add(1, 1)).toEqual(2);
  });
});
