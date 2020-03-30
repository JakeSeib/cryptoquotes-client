const createDifficulty = function (quote) {
  // given a quote object with text and author, return a difficulty rating from
  // 1 to 5
  let difficultyCounter = 0
  difficultyCounter += (new Set(quote.text.concat(quote.author))).size
  difficultyCounter += (quote.text.concat(quote.author).length / 2)
  // TODO: write a more sophisticated way of scoring difficulty
  if (difficultyCounter < 60) {
    return 5
  } else if (difficultyCounter > 105) {
    return 1
  } else {
    return Math.floor((difficultyCounter - 20) / 15)
  }
}

export default createDifficulty
