const { getTalkTitles, getTalkTitle } = require('../src/lib')
test('No talk title has numbers in it.', () => {
  getTalkTitles().forEach(element => {
    expect(element.title).not.toMatch(/\d/)
  })
})
test('All talk lengths are either in minutes (not hours) or lightning (5 minutes).', () => {
  getTalkTitles().forEach(element => {
    expect(element.talkLength).toBeTruthy()
    expect(element.talkLength).toEqual(expect.any(Number))
    expect(element.talkLength).toBeGreaterThanOrEqual(5)
  })
})

test('data import should match snapshot.', () => {
  expect(getTalkTitles()).toMatchSnapshot()
})
