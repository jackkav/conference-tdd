const { getTrack } = require('../src/lib')
test('The conference has multiple tracks each of which has a morning and afternoon session', () => {
  expect(getTrack()).toBeTruthy()
  expect(getTrack().morning).toBeTruthy()
  expect(getTrack().afternoon).toBeTruthy()
})

test('Each session contains multiple talks.', () => {
  expect(getTrack().morning.length).toBeGreaterThan(1)
  expect(getTrack().afternoon.length).toBeGreaterThan(1)
})
test('Morning sessions begin at 9am and must finish before 12 noon, for lunch.', () => {
  expect(getTrack().morning[0].time).toBe(9)
  expect(getTrack().morning[getTrack().morning.length - 1].time).toBeLessThan(
    12
  )
})
test('Afternoon sessions begin at 1pm and must finish in time for the networking event.', () => {
  expect(getTrack().afternoon[0].time).toBe(13)
  expect(
    getTrack().afternoon[getTrack().afternoon.length - 1].time
  ).toBeLessThan(17)
})
test('The networking event can start no earlier than 4:00 and no later than 5:00.', () => {
  expect(getTrack().networkingEvent.time).toBeGreaterThanOrEqual(16)
  expect(getTrack().networkingEvent.time).toBeLessThan(17)
})
