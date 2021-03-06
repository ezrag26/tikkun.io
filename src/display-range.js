const hebrewNumeralFromInteger = require('./hebrew-numeral')
const parshiyot = require('../build/parshiyot.json')

var asRange = (strings) => {
  if (!strings.length) {
    return ''
  }

  if (strings.length === 1) {
    return strings[0]
  }

  return [strings[0], strings[strings.length - 1]].join('-')
}

const aliyotStrings = [
  'ראשון',
  'שני',
  'שלישי',
  'רביעי',
  'חמישי',
  'ששי',
  'שביעי',
  'מפטיר'
]

const parshaName = (verses) => parshiyot
  .find(({ ref }) => verses
    .some(({ book: b, chapter: c, verse: v }) => ref.b === b && ref.c === c && ref.v === v
    )
  ).he

const aliyotNames = (aliyot, verses) => aliyot
  .filter((aliyah) => aliyah > 0 && aliyah <= aliyotStrings.length)
  .map((aliyah) => aliyotStrings[aliyah - 1])
  .map(aliyah => {
    if (aliyah === 'ראשון') {
      return parshaName(verses)
    }

    return aliyah
  })

const asVersesRange = (verses) => asRange(verses.map((verse) => {
  const components = []

  if (verse.verse === 1) {
    components.push(verse.chapter)
  }

  components.push(verse.verse)

  return components
    .map((num) => hebrewNumeralFromInteger(num))
    .join(':')
}))

const asAliyotRange = (aliyot, verses) => {
  if (!aliyot.length) {
    return ''
  }

  const aliyotByName = aliyotNames(aliyot, verses)

  return aliyotByName[0] + (aliyotByName[1] ? ` [${aliyotByName[1]}]` : '')
}

module.exports = { asVersesRange, asAliyotRange }
