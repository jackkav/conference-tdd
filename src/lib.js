const fs = require('fs')
module.exports = {
  getTalkTitles: () => {
    return fs.readFileSync(`./data.txt`, 'utf-8').split(/\n/).map(element => {
      const duration = element.match(/\d\w/)
      if (!duration) return { full: element, duration: 5, title: element }
      return {
        full: element,
        duration: Number(duration),
        title: element.slice(0, duration.index)
      }
    })
  },

  getDayPlan: () => ({
    morning: [{ time: 9 }, { time: 11 }],
    afternoon: [{ time: 13 }, { time: 11 }],
    networkingEvent: { time: 16 }
  }),

  printConferenceTrack: () => {
    console.log('09:00AM Writing Fast Tests Against Enterprise Rails 60min')
  }
}
