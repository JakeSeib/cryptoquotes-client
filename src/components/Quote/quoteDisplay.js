const formatString = function (string, cipher) {
  // given a string, format for display using the provided cipher
  const alpha = 'abcdefghijklmnopqrstuvwxyz'
  const charSet = new Set(string.toLowerCase())
  // filter out non-alphabetical characters
  charSet.forEach(char => {
    if (alpha.indexOf(char) < 0) {
      charSet.delete(char)
    }
  })
  let formattedString = string.toLowerCase()
  // take lowercased string, and for each unique character in the string,
  // replace all instances in the string with the corresponding uppercased
  // letter from the cipher, leaving non-alphabetical characters in place
  charSet.forEach(char => {
    const alphaIndex = [...alpha].findIndex(el => el === char)
    if (alphaIndex > -1) {
      const regex = new RegExp(`${char}`, 'g')
      formattedString = formattedString.replace(regex, [...cipher][alphaIndex].toUpperCase())
    }
  })
  return formattedString
}

const quoteDisplay = function (quoteObj) {
  // given a Quote object with text, author, and cipher, adds properties for
  // formatted text and formatted author using the cipher
  const formattedQuote = {
    formattedText: formatString(quoteObj.text, quoteObj.cipher),
    formattedAuthor: '-' + formatString(quoteObj.author, quoteObj.cipher)
  }
  return Object.assign(quoteObj, formattedQuote)
}

export default quoteDisplay
