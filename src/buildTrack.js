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
    const finshesBeforeLunch = closesAt.isSameOrBefore(moment(lunchTime))
    if (finshesBeforeLunch && !isFortyFive && !isFive) {
      previous.push(
        Object.assign({}, current, {
          commencesAt,
          closesAt: closesAt.format('HH:mmA'),
          commenceHour: currentTime.hour(),
          closeHour: closesAt.hour()
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
  return input.sort(x => x.talkLength).reduce((previous, current) => {
    const endOfTheDay = { hour: 17 }
    const closesAt = moment(currentTime).add(current.talkLength, 'minutes')
    const startsAfterLunch = currentTime.isSameOrAfter(noon)
    const finshesBeforeTheEndOfTheDay = closesAt.isBefore(moment(endOfTheDay))
    if (startsAfterLunch && finshesBeforeTheEndOfTheDay) {
      previous.push(
        Object.assign({}, current, {
          commencesAt: currentTime.format('hh:mmA'),
          commenceHour: currentTime.hour(),
          closesAt: closesAt.format('hh:mmA'),
          closeHour: closesAt.hour(),
          closeMinute: closesAt.minute()
        })
      )
    }
    currentTime.add(current.talkLength, 'minutes')
    return previous
  }, [])
}

const getTrack = input => {
  let filteredList = input
  const morning = getMorning(filteredList)
  const morningTalkIds = morning.map(x => x.index)
  filteredList = filteredList.filter(x => !morningTalkIds.includes(x.index))
  const afternoon = getAfternoon(filteredList)
  const lastTalkOfTheDay = afternoon[afternoon.length - 1]
  const networkingStartsAt = moment({
    hour: lastTalkOfTheDay.closeHour || 16,
    minute: lastTalkOfTheDay.closeMinute
  }).format('hh:mmA')
  return {
    morning,
    afternoon,
    networkingEvent: {
      commencesAt: networkingStartsAt,
      hour: 16
    },
    lunch: {
      commencesAt: moment({ hour: 12 }).format('hh:mmA'),
      hour: 12
    },
    indexs: morningTalkIds.concat(afternoon.map(x => x.index))
  }
}
module.exports.getTrack = getTrack
module.exports.getMorning = getMorning
module.exports.getAfternoon = getAfternoon
