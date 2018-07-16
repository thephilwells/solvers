// Given a dictionary and given hive letters for a NYT Spelling Bee puzzle, finds all valid words

const dictionary = require('./dictionary')

const mainLetter = 'L'
const hiveLetters = 'IHOLGRC'.split('')

dictionary.dictionary.forEach((word) => {
  let wordLetters = word.split('')
  let wordLettersSet = new Set(wordLetters)
  if (wordLettersSet.has(mainLetter)) {
    let hiveLettersSet = new Set(hiveLetters)
    let difference = wordLetters.filter((letter) => {
      return !hiveLettersSet.has(letter)
    })
    if (difference.length === 0 && word.length >= 4) {
      console.log(word)
    }
  }
})
