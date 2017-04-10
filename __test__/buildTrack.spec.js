const { getTrack, getMorning } = require('../src/buildTrack')
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
})
test('Morning sessions begin at 9am and must finish before 12 noon, for lunch.', () => {
  const morning = getTrack(exampleInput).morning
  const first = morning[0].hour
  const last = morning[morning.length - 1].hour
  expect(first).toBeGreaterThanOrEqual(9)
  expect(last).toBeLessThan(12)
  expect(getTrack(exampleInput).morning[0].commencesAt).toBe('09:00AM')
})

test('Afternoon sessions begin at 1pm and must finish in time for the networking event.', () => {
  const afternoon = getTrack(exampleInput).afternoon
  expect(afternoon[0].hour).toBe(13)
  expect(afternoon[0].commencesAt).toBe('01:00PM')
  expect(afternoon[afternoon.length - 1].hour).toBeLessThan(17)
})

test('The networking event can start no earlier than 4:00 and no later than 5:00.', () => {
  expect(getTrack(exampleInput).networkingEvent.hour).toBeGreaterThanOrEqual(
    16
  )
  expect(getTrack(exampleInput).networkingEvent.hour).toBeLessThan(17)
})

test('Lunch is always at 12.', () => {
  expect(getTrack(exampleInput).lunch.hour).toBe(12)
})

const morningData = [
  {
    full: 'Sit Down and Write 30min',
    index: 9,
    talkLength: 30,
    title: 'Sit Down and Write '
  },
  {
    full: 'User Interface CSS in Rails Apps 30min',
    index: 18,
    talkLength: 30,
    title: 'User Interface CSS in Rails Apps '
  },
  {
    full: 'Pair Programming vs Noise 45min',
    index: 10,
    talkLength: 45,
    title: 'Pair Programming vs Noise '
  },
  {
    full: 'Writing Fast Tests Against Enterprise Rails 60min',
    index: 0,
    talkLength: 60,
    title: 'Writing Fast Tests Against Enterprise Rails '
  }
]

test('Morning sessions begin at 9am and must finish before 12 noon, for lunch.', () => {
  // console.log(getMorning(morningData)[3])
  // expect(getMorning(morningData)[3].closesAt).toBe('12:00PM')
})
test('Morning sessions should be three hours long.', () => {
  // console.log(getMorning(morningData))
  const classUnderTest = getMorning(morningData)
  const totalTalkLength = classUnderTest
    .map(x => x.talkLength)
    .reduce((prev, curr) => curr + prev)
  expect(totalTalkLength).toBe(180)
})
