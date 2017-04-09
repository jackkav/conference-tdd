const x = require('../src/lib')
const getDayPlan = x.getDayPlan
test('The conference has multiple tracks each of which has a morning and afternoon session', () => {
  expect(getDayPlan()).toBeTruthy()
  expect(getDayPlan().morning).toBeTruthy()
  expect(getDayPlan().afternoon).toBeTruthy()
})

test('Each session contains multiple talks.', () => {
  expect(getDayPlan().morning.length).toBeGreaterThan(1)
  expect(getDayPlan().afternoon.length).toBeGreaterThan(1)
})
test('Morning sessions begin at 9am and must finish before 12 noon, for lunch.', () => {
  expect(getDayPlan().morning[0].time).toBe(9)
  expect(
    getDayPlan().morning[getDayPlan().morning.length - 1].time
  ).toBeLessThan(12)
})
test('Afternoon sessions begin at 1pm and must finish in time for the networking event.', () => {
  expect(getDayPlan().afternoon[0].time).toBe(13)
  expect(
    getDayPlan().afternoon[getDayPlan().afternoon.length - 1].time
  ).toBeLessThan(17)
})
test('The networking event can start no earlier than 4:00 and no later than 5:00.', () => {
  expect(getDayPlan().networkingEvent.time).toBeGreaterThanOrEqual(16)
  expect(getDayPlan().networkingEvent.time).toBeLessThan(17)
})
