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
const getMorning = input => {
  let currentTime = moment({ hour: 9 })
  return input.reduce(
    (talk, element) => {
      const lunchTime = { hour: 12 }
      if (currentTime.isBefore(moment(lunchTime))) {
        talk.push(
          Object.assign({}, element, {
            timeAsString: currentTime.format('HH:mmA'),
            hour: currentTime.hour()
          })
        )
      }
      currentTime = currentTime.add(element.talkLength, 'minutes')
      return talk
    },
    []
  )
}
const getAfternoon = input => {
  let currentTime = moment({ hour: 13 })
  return input.reduce(
    (talk, element) => {
      const networkTime = { hour: 16 }
      if (currentTime.isBefore(moment(networkTime))) {
        talk.push(
          Object.assign({}, element, {
            timeAsString: currentTime.format('hh:mmA'),
            hour: currentTime.hour()
          })
        )
      }
      currentTime = currentTime.add(element.talkLength, 'minutes')
      return talk
    },
    []
  )
}

const getTrack = input => {
  return {
    morning: getMorning(input),
    afternoon: getAfternoon(input),
    networkingEvent: { hour: 16 },
    lunch: { timeAsString: moment({ hour: 12 }).format('hh:mmA'), hour: 12 }
  }
}
const getTrackAsDaysEvents = track => {
  // console.log(track.morning)
  const m = track.morning.map(element => {
    return `${element.timeAsString} ${element.full}`
  })
  m.push(`${track.lunch.timeAsString} Lunch`)
  const a = track.afternoon.map(element => {
    return `${element.timeAsString} ${element.full}`
  })
  return m.concat(a)
  // m.push()
  // // `${NumberTimeToString(track.afternoon[0].time)} ${track.afternoon[0].full}`
  // m.push(`${NumberTimeToString(track.networkingEvent.time)} Networking Event`)
  // console.log(a)
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
