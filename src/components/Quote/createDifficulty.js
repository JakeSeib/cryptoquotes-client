const createDifficulty = function (quote) {
  // given a quote object with text and author, return a difficulty rating from
  // 1 to 5
  const alpha = 'abcdefghijklmnopqrstuvwxyz'
  let difficultyCounter = 0
  const charSet = new Set(quote.text.toLowerCase().concat(quote.author.toLowerCase()))
  // filter out non-alphabetical characters
  charSet.forEach(char => {
    if (alpha.indexOf(char) < 0) {
      charSet.delete(char)
    }
  })
  difficultyCounter += charSet.size
  difficultyCounter += (quote.text.concat(quote.author).length / 2)
  // somewhat arbitrarily, difficultyCounter >= 105 corresponds to rating of 1,
  // <=60 corresponds to 5
  return Math.min(5, Math.max(1, (Math.floor(((105 / difficultyCounter) - 1) * (20 / 3)))))
}

export default createDifficulty
