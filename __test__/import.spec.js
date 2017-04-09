test('No talk title has numbers in it.', () => {
  getTalkTitles().forEach(element => {
    expect(element.title).not.toMatch(/\d/)
  })
})
test('All talk lengths are either in minutes (not hours) or lightning (5 minutes).', () => {
  getTalkTitles().forEach(element => {
    expect(element.duration).toBeTruthy()
    expect(element.duration).toEqual(expect.any(Number))
  })
})

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
