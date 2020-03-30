const createCipher = function () {
  // Returns a string with every letter of alphabet, randomly shuffled to new
  // positions
  const alpha = 'abcdefghijklmnopqrstuvwxyz'
  const indices = [...Array(alpha.length).keys()]
  // give each letter a random pos from 0 to 25, using every index
  // TODO: ensure that no letter has its starting index
  const cipher = [...alpha].map(letter => (
    {
      char: letter,
      pos: indices.splice(Math.floor(Math.random() * indices.length), 1)[0]
    }
  ))
  // sort after generating, then return joined chars
  return cipher.sort((el1, el2) => el1.pos - el2.pos).map(el => el.char).join('')
}

export default createCipher
