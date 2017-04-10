const fs = require('fs')
const parseListOfTalks = stringList => {
  if (!stringList) stringList = fs.readFileSync(`./data.txt`, 'utf-8')
  return stringList
    .split(/\n/)
    .filter(x => x !== '')
    .map((element, index) => parseTalk(element, index))
}

const parseTalk = (element, index) => {
  const talkLength = element.match(/\d\w/)
  return {
    index,
    full: element,
    talkLength: +talkLength || 5,
    title: talkLength ? element.slice(0, talkLength.index) : element
  }
}

module.exports.parseListOfTalks = parseListOfTalks
module.exports.parseTalk = parseTalk
