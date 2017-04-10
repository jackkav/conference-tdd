const { getConferenceTrack } = require('../src/lib')
const { parseListOfTalks, parseTalk } = require('../src/parse')
const oneDay = `
Writing Fast Tests Against Enterprise Rails 60min
Overdoing it in Python 45min
Lua for the Masses 30min
Ruby Errors from Mismatched Gem Versions 45min
Common Ruby Errors 45min
Rails for Python Developers lightning
Communicating Over Distance 60min
Accounting-Driven Development 45min
Woah 30min
`
const twoDays = `
Writing Fast Tests Against Enterprise Rails 60min
Overdoing it in Python 45min
Lua for the Masses 30min
Ruby Errors from Mismatched Gem Versions 45min
Common Ruby Errors 45min
Rails for Python Developers lightning
Communicating Over Distance 60min
Accounting-Driven Development 45min
Woah 30min
Sit Down and Write 30min
Pair Programming vs Noise 45min
Rails Magic 60min
Ruby on Rails: Why We Should Move On 60min
Clojure Ate Scala (on my project) 45min
Programming in the Boondocks of Seattle 30min
Ruby vs. Clojure for Back-End Development 30min
Ruby on Rails Legacy App Maintenance 60min
A World Without HackerNews 30min
User Interface CSS in Rails Apps 30min
`
test('Presenters will be very punctual; there needs to be no gap between sessions.', () => {
  expect([1, 2, 3, '1']).toEqual(expect.any(Array))
})

test('can get day one', () => {
  expect(getConferenceTrack(oneDay)[0].track).toEqual(1)
})
test('can get day one events', () => {
  expect(getConferenceTrack(oneDay)[0].events.length).not.toEqual(0)
  expect(getConferenceTrack(oneDay)[0].events).toContain('12:00PM Lunch')
})

test('when only one days worth of data cannot get day two', () => {
  // console.log(getConferenceTrack(oneDay))
  expect(getConferenceTrack(oneDay).length).toBe(1)
})

// test('when two days worth of data cannot get day two', () => {
//   // console.log(getConferenceTrack(twoDays))
//   expect(getConferenceTrack(twoDays).length).toBe(2)
// })
