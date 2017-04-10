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
  const noon = moment({ hour: 13 })
  let currentTime = moment({ hour: 13 })
  return input.reduce(
    (talk, element) => {
      const endTime = { hour: 16 }
      const isAfterLunch = currentTime.isSameOrAfter(noon)
      const isBeforeTheEnd = currentTime.isBefore(moment(endTime))
      if (isAfterLunch && isBeforeTheEnd) {
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
  const morning = getMorning(input)
  const morningNames = morning.map(x => x.full)
  const inputExcludingMorning = input.filter(
    x => !morningNames.includes(x.full)
  )
  return {
    morning,
    afternoon: getAfternoon(inputExcludingMorning),
    networkingEvent: {
      timeAsString: moment({ hour: 16 }).format('hh:mmA'),
      hour: 16
    },
    lunch: { timeAsString: moment({ hour: 12 }).format('hh:mmA'), hour: 12 }
  }
}
const getTrackAsDaysEvents = track => {
  let m = track.morning.map(element => {
    return `${element.timeAsString} ${element.full}`
  })
  m.push(`${track.lunch.timeAsString} Lunch`)
  const a = track.afternoon.map(element => {
    return `${element.timeAsString} ${element.full}`
  })
  m = m.concat(a)
  m.push(`${track.networkingEvent.timeAsString} Networking Event`)
  return m
}

const printConferenceTrack = () => {
  console.log('Track 1:')
  getTrackAsDaysEvents(getTrack(getTalkTitles())).forEach(i => {
    console.log(i)
  })
  console.log('Track 2:')
}

module.exports.getTalkTitles = getTalkTitles
module.exports.getTalkTitle = getTalkTitle
module.exports.getTrack = getTrack
module.exports.getTrackAsDaysEvents = getTrackAsDaysEvents
module.exports.printConferenceTrack = printConferenceTrack
