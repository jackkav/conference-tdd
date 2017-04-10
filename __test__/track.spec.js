const { getTrackAsDaysEvents } = require('../src/lib')
const { getTrack } = require('../src/buildTrack')
const { parseListOfTalks, parseTalk } = require('../src/parse')
const moment = require('moment')
const exampleInput = parseListOfTalks()

test('The conference has multiple tracks each of which has a morning and afternoon session', () => {
  expect(getTrack(exampleInput)).toBeTruthy()
  expect(getTrack(exampleInput).morning).toBeTruthy()
  expect(getTrack(exampleInput).afternoon).toBeTruthy()
})

test('Each session contains multiple talks.', () => {
  expect(getTrack(exampleInput).morning.length).toBeGreaterThan(1)
  expect(getTrack(exampleInput).afternoon.length).toBeGreaterThan(1)
  expect(getTrackAsDaysEvents(getTrack(exampleInput)).length).toBeGreaterThan(
    2
  )
})
test('Morning sessions begin at 9am and must finish before 12 noon, for lunch.', () => {
  const morning = getTrack(exampleInput).morning
  const first = morning[0]
  const last = morning[morning.length - 1]
  expect(first.hour).toBeGreaterThanOrEqual(9)
  expect(last.hour).toBeLessThan(12)
  expect(morning[0].commencesAt).toBe('09:00AM')

  expect(getTrackAsDaysEvents(getTrack(exampleInput))).toContain(
    '12:00PM Lunch'
  )
})

test('Afternoon sessions begin at 1pm and must finish in time for the networking event.', () => {
  expect(getTrack(exampleInput).afternoon[0].hour).toBe(13)
  expect(getTrack(exampleInput).afternoon[0].commencesAt).toBe('01:00PM')
  expect(
    getTrack(exampleInput).afternoon[
      getTrack(exampleInput).afternoon.length - 1
    ].hour
  ).toBeLessThan(17)
})

test('The networking event can start no earlier than 4:00 and no later than 5:00.', () => {
  expect(getTrack(exampleInput).networkingEvent.hour).toBeGreaterThanOrEqual(
    16
  )
  expect(getTrackAsDaysEvents(getTrack(exampleInput))).toContain(
    '04:00PM Networking Event'
  )
  expect(getTrack(exampleInput).networkingEvent.hour).toBeLessThan(17)
})

test('Lunch is always at 12.', () => {
  expect(getTrack(exampleInput).lunch.hour).toBe(12)
  expect(getTrackAsDaysEvents(getTrack(exampleInput))).toContain(
    '12:00PM Lunch'
  )
})
