const formatString = function (oldString, cipher) {
  // given a string, format for display using the provided cipher and provide
  // set of alphabetical characters in string
  const alpha = 'abcdefghijklmnopqrstuvwxyz'
  let string = oldString.toLowerCase()
  const charSet = new Set(string)
  const cipherSet = new Set()
  // filter out non-alphabetical characters

  // for alphabetical characters, replace all instances in the string with the
  // corresponding uppercased letter from the cipher, leaving non-alphabetical
  // characters in place, & add the uppercased letter from the cipher to its set
  charSet.forEach(char => {
    const alphaIndex = alpha.indexOf(char)
    if (alphaIndex >= 0) {
      const cipherLetter = [...cipher][alphaIndex].toUpperCase()
      cipherSet.add(cipherLetter)
      string = string.replace(new RegExp(`${char}`, 'g'), cipherLetter)
    }
  })

  return { string, cipherSet }
}

function union (setA, setB) {
  const _union = new Set(setA)
  for (const elem of setB) {
    _union.add(elem)
  }
  return _union
}

function CipherCount (cipherSet, formattedString) {
  cipherSet.forEach(char => {
    this[char] = formattedString.split(char).length - 1
  })
}

const quoteDisplay = function (quoteObj) {
  // given a Quote object with text, author, and cipher, adds properties for
  // formatted text and formatted author using the cipher
  const formattedText = formatString(quoteObj.text, quoteObj.cipher)
  const formattedAuthor = formatString(quoteObj.author, quoteObj.cipher)
  const cipherSet = union(formattedText.cipherSet, formattedAuthor.cipherSet)
  const formattedQuote = {
    formattedText: formattedText.string,
    formattedAuthor: formattedAuthor.string,
    cipherSet: cipherSet,
    cipherCount: new CipherCount(cipherSet, formattedText.string.concat(formattedAuthor.string))
  }
  return Object.assign(quoteObj, formattedQuote)
}

export default quoteDisplay
