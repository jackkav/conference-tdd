const { getTalkTitles } = require('../src/lib')
test('No talk title has numbers in it.', () => {
  getTalkTitles().forEach(element => {
    expect(element.title).not.toMatch(/\d/)
  })
})
test('All talk lengths are either in minutes (not hours) or lightning (5 minutes).', () => {
  getTalkTitles().forEach(element => {
    expect(element.duration).toBeTruthy()
    expect(element.duration).toEqual(expect.any(Number))
  })
})
