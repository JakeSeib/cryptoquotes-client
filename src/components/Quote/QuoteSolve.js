import React, { useState } from 'react'

import quoteDisplay from './quoteDisplay'
import './QuoteSolve.scss'
// import messages from '../AutoDismissAlert/messages'

// NOTE:
// convention is that uppercased letters denote encoded letters, lowercased
// letters denote either the solution text or the user's current guess at the
// solution text

function GuessHash (charSet) {
  charSet.forEach(char => {
    this[char] = null
  })
}

const QuoteSolve = ({ quote, user }) => {
  quoteDisplay(quote)
  const [guessHash, setGuessHash] = useState(new GuessHash(quote.charSet))
  const [guessQuote, setGuessQuote] = useState({
    text: quote.formattedText,
    author: quote.formattedAuthor
  })

  // set up individual elements for each letter
  // those individual elements show the current guess above the formatted letter

  // set event listeners onClick/onType for alphabetical letters
  // onClick/onType checks the formattedText/Author letter of that element and uses
  // that as the key to update guessedLetters (as cipherLetter)

  const handleGuess = (cipherLetter, newGuess) => {
    newGuess = newGuess.toLowerCase()
    const oldGuess = guessHash[cipherLetter]
    const oldCipherPair = Object.entries(guessHash).find(pair => pair[1] === newGuess)
    const newGuessQuote = { ...guessQuote }
    const newGuessHash = { ...guessHash }
    // newGuess was previously guessed elsewhere
    if (oldCipherPair) {
      // newGuess was previously guessed elsewhere & cipherLetter had a previous guess
      if (oldGuess) {
        newGuessQuote.text = newGuessQuote.text.replace(new RegExp(`${oldGuess}`, 'g'), cipherLetter)
        newGuessQuote.author = newGuessQuote.author.replace(new RegExp(`${oldGuess}`, 'g'), cipherLetter)
        newGuessQuote.text = newGuessQuote.text.replace(new RegExp(`${newGuess}`, 'g'), oldGuess)
        newGuessQuote.author = newGuessQuote.author.replace(new RegExp(`${newGuess}`, 'g'), oldGuess)
        newGuessHash[oldCipherPair[0]] = oldGuess
      } else {
        newGuessQuote.text = newGuessQuote.text.replace(new RegExp(`${newGuess}`, 'g'), oldCipherPair[0])
        newGuessQuote.author = newGuessQuote.author.replace(new RegExp(`${newGuess}`, 'g'), oldCipherPair[0])
        newGuessHash[oldCipherPair[0]] = null
      }
      // cipherLetter had a previous guess
    } else if (oldGuess) {
      newGuessQuote.text = newGuessQuote.text.replace(new RegExp(`${oldGuess}`, 'g'), newGuess)
      newGuessQuote.author = newGuessQuote.author.replace(new RegExp(`${oldGuess}`, 'g'), newGuess)
    }
    // base case
    newGuessQuote.text = newGuessQuote.text.replace(new RegExp(`${cipherLetter}`, 'g'), newGuess)
    newGuessQuote.author = newGuessQuote.author.replace(new RegExp(`${cipherLetter}`, 'g'), newGuess)
    newGuessHash[cipherLetter] = newGuess
    setGuessHash(newGuessHash)
    setGuessQuote(newGuessQuote)
  }

  const quoteTextJSX =
    quote.formattedText.split(' ').map((word, wordIndex) => (
      <div key={`word-${wordIndex}`} className='solve-word'>
        {[...word].map((letter, letterIndex) => (
          <span key={`letter-${wordIndex}-${letterIndex}`} className='solve-letter'>{letter}</span>
        ))}
      </div>
    ))

  return (
    <section className='solve-puzzle'>
      {quoteTextJSX}
      <p>{guessQuote.text}</p>
    </section>
  )
}

export default QuoteSolve
