const formatString = function (string, cipher) {
  // given a string, format for display using the provided cipher and provide
  // set of alphabetical characters in string
  const alpha = 'abcdefghijklmnopqrstuvwxyz'
  const charSet = new Set(string.toLowerCase())
  const cipherSet = new Set()
  let formattedString = string.toLowerCase()
  // filter out non-alphabetical characters

  // for alphabetical characters, replace all instances in the string with the
  // corresponding uppercased letter from the cipher, leaving non-alphabetical
  // characters in place, & add the uppercased letter from the cipher to its set
  charSet.forEach(char => {
    const alphaIndex = alpha.indexOf(char)
    if (alphaIndex >= 0) {
      const cipherLetter = [...cipher][alphaIndex].toUpperCase()
      cipherSet.add(cipherLetter)
      formattedString = formattedString.replace(new RegExp(`${char}`, 'g'), cipherLetter)
    }
  })

  return { formattedString, cipherSet }
}

function union (setA, setB) {
  const _union = new Set(setA)
  for (const elem of setB) {
    _union.add(elem)
  }
  return _union
}

const quoteDisplay = function (quoteObj) {
  // given a Quote object with text, author, and cipher, adds properties for
  // formatted text and formatted author using the cipher
  const formattedText = formatString(quoteObj.text, quoteObj.cipher)
  const formattedAuthor = formatString(quoteObj.author, quoteObj.cipher)
  const formattedQuote = {
    formattedText: formattedText.formattedString,
    formattedAuthor: '-' + formattedAuthor.formattedString,
    cipherSet: union(formattedText.cipherSet, formattedAuthor.cipherSet)
  }
  return Object.assign(quoteObj, formattedQuote)
}

export default quoteDisplay
