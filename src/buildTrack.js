const moment = require('moment')
const getMorning = input => {
  let currentTime = moment({ hour: 9 })
  let totalTime = 0
  return input.sort(x => x.talkLength).reduce((previous, current) => {
    const lunchTime = { hour: 12 }
    const commencesAt = currentTime.format('HH:mmA')
    const closesAt = moment(currentTime).add(current.talkLength, 'minutes')
    const isFortyFive = current.talkLength === 45
    const isFive = current.talkLength === 5
    // TODO: should only push if closes at is lunch of there exists another which can close at lunch or exclude 45s
    if (closesAt.isSameOrBefore(moment(lunchTime)) && !isFortyFive && !isFive) {
      previous.push(
        Object.assign({}, current, {
          commencesAt,
          closesAt: closesAt.format('HH:mmA'),
          hour: currentTime.hour()
        })
      )
      currentTime.add(current.talkLength, 'minutes')
    }
    return previous
  }, [])
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
            commencesAt: currentTime.format('hh:mmA'),
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
    afternoon,
    networkingEvent: {
      commencesAt: moment({ hour: 16 }).format('hh:mmA'),
      hour: 16
    },
    lunch: { commencesAt: moment({ hour: 12 }).format('hh:mmA'), hour: 12 },
    indexs: indexs.concat(afternoon.map(x => x.index))
  }
}
module.exports.getTrack = getTrack
module.exports.getMorning = getMorning
module.exports.getAfternoon = getAfternoon
