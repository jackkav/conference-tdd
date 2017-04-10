const fs = require('fs')
const moment = require('moment')
const getTalkTitles = () => {
  return fs
    .readFileSync(`./data.txt`, 'utf-8')
    .split(/\n/)
    .map(element => getTalkTitle(element))
}

const getTalkTitle = element => {
  const talkLength = element.match(/\d\w/)
  return {
    full: element,
    talkLength: +talkLength || 5,
    title: talkLength ? element.slice(0, talkLength.index) : element
  }
}

const getTrack = input => {
  let currentTime = moment({ hour: 9 })
  const morning = input.reduce(
    (talk, element) => {
      const lunchTime = { hour: 12 }
      if (currentTime.isBefore(moment(lunchTime))) {
        talk.push(
          Object.assign({}, element, {
            talkStartTime: currentTime.format('HH:mmA'),
            hour: currentTime.hour()
          })
        )
      }
      currentTime = currentTime.add(element.talkLength, 'minutes')
      return talk
    },
    []
  )

  return {
    morning,
    afternoon: [{ hour: 13 }, { hour: 11 }],
    networkingEvent: { hour: 16 },
    lunch: { talkStartTime: moment({ hour: 12 }).format('HH:mmA'), hour: 12 }
  }
}
const getTrackAsDaysEvents = track => {
  // console.log(track.morning)
  const m = track.morning.map(element => {
    return `${element.talkStartTime} ${element.full}`
  })
  m.push(`${track.lunch.talkStartTime} Lunch`)
  return m
  // m.push()
  // // `${NumberTimeToString(track.afternoon[0].time)} ${track.afternoon[0].full}`
  // m.push(`${NumberTimeToString(track.networkingEvent.time)} Networking Event`)
  // console.log(a)
  return [
    '01:00PM Ruby on Rails: Why We Should Move On 60min',
    '12:00PM Lunch',
    '04:00PM Networking Event'
  ]
}

const printConferenceTrack = () => {
  getTrackAsDaysEvents(getTrack(getTalkTitles())).forEach(i => {
    console.log(i)
  })
}

module.exports.getTalkTitles = getTalkTitles
module.exports.getTalkTitle = getTalkTitle
module.exports.getTrack = getTrack
module.exports.getTrackAsDaysEvents = getTrackAsDaysEvents
// module.exports.NumberTimeToString = NumberTimeToString
module.exports.printConferenceTrack = printConferenceTrack
