const { parseListOfTalks, parseTalk } = require('./parse')
const { getTrack } = require('./buildTrack')

const getTrackAsDaysEvents = track => {
  let events = track.morning.map(element => {
    return `${element.commencesAt} ${element.full}`
  })
  events.push(`${track.lunch.commencesAt} Lunch`)
  const a = track.afternoon.map(element => {
    return `${element.commencesAt} ${element.full}`
  })
  events = events.concat(a)
  events.push(`${track.networkingEvent.commencesAt} Networking Event`)
  return events
}

const getConferenceTrack = stringListOfTalks => {
  let filteredList = parseListOfTalks(stringListOfTalks)
  let tracks = []
  let count = 1
  while (filteredList.length) {
    const track = getTrack(filteredList)
    const events = getTrackAsDaysEvents(track)
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

module.exports.getConferenceTrack = getConferenceTrack
module.exports.printConferenceTrack = printConferenceTrack
module.exports.getTrackAsDaysEvents = getTrackAsDaysEvents
