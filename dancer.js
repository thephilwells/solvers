// Given the border letters for a NYT Square Dance puzzle and a dictionary, finds an optimal solution

const dictionary = require('./dictionary')

let upLetters = ['Q', 'H', 'I']
let rightLetters = ['U', 'W', 'J']
let downLetters = ['S', 'Z', 'O',]
let leftLetters = ['N', 'D', 'M',]

let allLetters = [...upLetters, ...rightLetters, ...downLetters, ...leftLetters]
let letterArrays = [upLetters, rightLetters, downLetters, leftLetters]

let letterObject = {}

// TODO: Clean this up
letterObject[upLetters[0]] = 'up'
letterObject[upLetters[1]] = 'up'
letterObject[upLetters[2]] = 'up'
letterObject[rightLetters[0]] = 'right'
letterObject[rightLetters[1]] = 'right'
letterObject[rightLetters[2]] = 'right'
letterObject[downLetters[0]] = 'down'
letterObject[downLetters[1]] = 'down'
letterObject[downLetters[2]] = 'down'
letterObject[leftLetters[0]] = 'left'
letterObject[leftLetters[1]] = 'left'
letterObject[leftLetters[2]] = 'left'

// create a smaller dictionary of just words \containing our letters
let newDictionary = []

dictionary.dictionary.forEach((word) => {
  let firstLetter = word.charAt(0)
  let lastLetter = word.charAt(word.length - 1)
  // first and last letter cannot be the same
  if (firstLetter !== lastLetter) {
    let wordLetters = word.split('')
    if (wordLetters.every(wordLetter => allLetters.includes(wordLetter))) {
      let validWord = true
      for (let i = 0; i < wordLetters.length; i++) {
        if (letterObject[wordLetters[i]] === letterObject[wordLetters[i + 1]]) {
          validWord = false
          break
        }
      }
      if (validWord) {
        // console.log(word)
        newDictionary.push(word)
      }
    }
  }
})

// first, find a one-word solution
newDictionary.forEach((word) => {
  let wordLetters = word.split('')
  if (allLetters.every(letter => wordLetters.includes(letter))) {
    console.log(wordLetters, allLetters)
    console.log(`Solved in 1 word: ${word}`)
    process.exit(0)
  }
})

// Otherwise, run all solutions
let allSolutions = []

newDictionary.forEach(word => {
  allSolutions.push({
    wordsUsed: [word],
    lettersUsed: uniques(word.split(''))
  })
})

getShortestSolution(allSolutions)

function getShortestSolution(solutions) {

  // generate solutions by adding all valid words per solution
  let longerSolutions = []
  solutions.forEach((solution) => {
    // REMOVE ALREADY FOUND WORDS FROM DICTIONARY
    let reducedDictionary = newDictionary.filter(word => !solution.wordsUsed.includes(word))

    // make a list of valid next words from the reduced dictionary
    let validNextWords = []
    let lastWordUsed = solution.wordsUsed[solution.wordsUsed.length - 1]
    reducedDictionary.forEach((word) => {
      if (lastWordUsed.charAt(lastWordUsed.length - 1) === word.charAt(0)) {
        validNextWords.push(word)
      }
    })

    //create solutions using the valid next words
    validNextWords.forEach((validWord) => {
      let newWordsUsed = [...solution.wordsUsed, ...[validWord]]
      let newLettersUsed = uniques(newWordsUsed.join('').split(''))
      // see if we got one
      if (newLettersUsed.length === 12) {
        console.log(`Solved in ${newWordsUsed.length} words: ${newWordsUsed}`)
        // allSolutions.push(solution) // find all solutions
        process.exit(0) // exit after solution found
      }
      longerSolutions.push({
        wordsUsed: newWordsUsed,
        lettersUsed: newLettersUsed
      })
    })
  })
  getShortestSolution(longerSolutions)
}

function uniques(arrArg) {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos
  })
}
