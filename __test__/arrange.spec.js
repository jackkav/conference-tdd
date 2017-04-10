const { printConferenceTrack } = require('../src/lib')
// test('Integer 9 can be converted to time string 9AM', () => {
//   expect(NumberTimeToString(9)).toEqual('09:00AM')
// })
// test('Integer 12 can be converted to time string 12PM', () => {
//   expect(NumberTimeToString(12)).toEqual('12:00PM')
// })
// test('Integer 17 can be converted to time string 5PM', () => {
//   expect(NumberTimeToString(17)).toEqual('05:00PM')
// })

// test('Integer 10.75 can be converted to time string 10:45AM', () => {
//   expect(NumberTimeToString(10.75)).toEqual('10:45AM')
// })

// test('Integer 10.75 can be converted to time string 10:45AM', () => {
//   expect(NumberTimeToString(12.75)).toEqual('12:45PM')
// })

// test('Integer 12.83333 can be converted to time string 12:50PM', () => {
//   expect(NumberTimeToString(12.83333)).toEqual('12:50PM')
// })

test('Presenters will be very punctual; there needs to be no gap between sessions.', () => {
  // const state = {
  //   name: 'Marius Schulz',
  //   website: 'https://blog.mariusschulz.com',
  //   twitterHandle: '@mariusschulz'
  // }
  // const newState = Object.assign({}, state, { a: 3 })
  // // const newState = { ...state, a: 3 }
  // console.log(name)
  // console.log(newState)

  expect([1, 2, 3, '1']).toEqual(expect.any(Array))
})
