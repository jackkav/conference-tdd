// const fs = require('fs')
// console.log(fs.readFileSync(`./data.txt`, 'utf-8'))
test('The conference has multiple tracks each of which has a morning and afternoon session', () => {
  expect(getDayPlan()).toBeTruthy()
  expect(getDayPlan().morning).toBeTruthy()
  expect(getDayPlan().afternoon).toBeTruthy()
})

test('Each session contains multiple talks.', () => {
  expect(getDayPlan().morning.length).toBeGreaterThan(1)
  expect(getDayPlan().afternoon.length).toBeGreaterThan(1)
})

const getDayPlan = () => dayPlan

const dayPlan = {
  morning: [1, 1],
  afternoon: [1, 1]
}
