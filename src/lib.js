const fs = require('fs')
const getTalkTitles = () => {
  return fs.readFileSync(`./data.txt`, 'utf-8').split(/\n/).map(element => {
    const duration = element.match(/\d\w/)
    if (!duration) return { full: element, duration: 5, title: element }
    return {
      full: element,
      duration: Number(duration),
      title: element.slice(0, duration.index)
    }
  })
}

const getTrack = () => dayPlan

const dayPlan = {
  morning: [{ time: 9 }, { time: 10 }, { time: 11 }],
  afternoon: [{ time: 13 }, { time: 11 }],
  networkingEvent: { time: 16 }
}

const NumberTimeToString = number => {
  let postfix = 'AM'
  if (number >= 12) {
    postfix = 'PM'
    if (number > 12) number = number - 12
  }
  let time = ('00' + number.toString()).substring(number.toString().length)
  return `${time}:00${postfix}`
}

const printConferenceTrack = () => {
  console.log('09:00AM Writing Fast Tests Against Enterprise Rails 60min')
}

module.exports.getTalkTitles = getTalkTitles
module.exports.getTrack = getTrack
module.exports.NumberTimeToString = NumberTimeToString
module.exports.printConferenceTrack = printConferenceTrack
