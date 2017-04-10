const { printConferenceTrack, NumberTimeToString } = require('../src/lib')
test('Integer 9 can be converted to time string 9AM', () => {
  expect(NumberTimeToString(9)).toEqual('09:00AM')
})
test('Integer 12 can be converted to time string 12PM', () => {
  expect(NumberTimeToString(12)).toEqual('12:00PM')
})
test('Integer 17 can be converted to time string 5PM', () => {
  expect(NumberTimeToString(17)).toEqual('05:00PM')
})
test('Presenters will be very punctual; there needs to be no gap between sessions.', () => {
  // expect(printConferenceTrack()).toBeTruthy()
})
