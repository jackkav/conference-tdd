const moment = require('moment')
const { parseListOfTalks, parseTalk } = require('./parse')
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
  const listOfTalks = input
  const filteredList = listOfTalks // .filter(x => !ignore.includes(x.index))

  const morning = getMorning(filteredList)
  const indexs = morning.map(x => x.index)
  const inputExcludingMorning = input.filter(x => !indexs.includes(x.index))
  const afternoon = getAfternoon(inputExcludingMorning)
  return {
    morning,
    afternoon: getAfternoon(inputExcludingMorning),
    networkingEvent: {
      timeAsString: moment({ hour: 16 }).format('hh:mmA'),
      hour: 16
    },
    lunch: { timeAsString: moment({ hour: 12 }).format('hh:mmA'), hour: 12 },
    indexs: indexs.concat(afternoon.map(x => x.index))
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

const getConferenceTrack = input => {
  let filteredList = parseListOfTalks(input)
  let tracks = []
  let count = 1
  while (filteredList.length) {
    const track = getTrack(filteredList)
    const events = getTrackAsDaysEvents(track)
    // console.log(events)
    tracks.push({
      track: count,
      events
    })
    filteredList = filteredList.filter(x => !track.indexs.includes(x.index))
    count++
  }
  return tracks
}
const printConferenceTrack = () => {
  const tracks = getConferenceTrack()
  tracks.forEach(x => {
    console.log(`Track ${x.track}:`)
    x.events.forEach(i => {
      console.log(i)
    })
  })
}

module.exports.getTrack = getTrack
module.exports.getTrackAsDaysEvents = getTrackAsDaysEvents
module.exports.getConferenceTrack = getConferenceTrack
module.exports.printConferenceTrack = printConferenceTrack
