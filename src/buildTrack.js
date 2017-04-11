const moment = require('moment')

const getPartialDaySessions = (talks, startHour, endHour) => {
  const beginningOfSessions = moment({ hour: startHour })
  const endOfSessions = moment({ hour: endHour })
  let currentTime = moment({ hour: startHour })
  return talks.sort(x => x.talkLength).reduce((previous, current) => {
    const talkEndsAt = moment(currentTime).add(current.talkLength, 'minutes')
    let isSuitable
    if (startHour === 9) {
      const isFortyFive = current.talkLength === 45
      const isFifteen = current.talkLength === 15
      const isFive = current.talkLength === 5
      const finishesBeforeLunch = talkEndsAt.isSameOrBefore(endOfSessions)
      isSuitable = finishesBeforeLunch && !isFortyFive && !isFifteen && !isFive
    } else {
      const startsAfterLunch = currentTime.isSameOrAfter(beginningOfSessions)
      const finishesBeforeDinner = talkEndsAt.isBefore(endOfSessions)
      isSuitable = startsAfterLunch && finishesBeforeDinner
    }
    if (isSuitable) {
      previous.push(
        Object.assign({}, current, {
          commencesAt: currentTime.format('hh:mmA'),
          commenceHour: currentTime.hour(),
          closesAt: talkEndsAt.format('hh:mmA'),
          closeHour: talkEndsAt.hour(),
          closeMinute: talkEndsAt.minute()
        })
      )
      currentTime.add(current.talkLength, 'minutes')
    }
    return previous
  }, [])
}
const getMorning = input => {
  return getPartialDaySessions(input, 9, 12)
}
const getAfternoon = input => {
  return getPartialDaySessions(input, 13, 17)
}

const getTrack = input => {
  let filteredList = input
  const morning = getPartialDaySessions(filteredList, 9, 12)
  const morningTalkIds = morning.map(x => x.index)
  filteredList = filteredList.filter(x => !morningTalkIds.includes(x.index))
  const afternoon = getPartialDaySessions(filteredList, 13, 17)
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
