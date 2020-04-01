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
  const [guess, setGuess] = useState({
    hash: new GuessHash(quote.charSet),
    text: quote.formattedText,
    author: quote.formattedAuthor
  })
  const [highlighted, setHighlighted] = useState(null)

  // set up individual elements for each letter
  // those individual elements show the current guess above the formatted letter

  // set event listeners onClick/onType for alphabetical letters
  // onClick/onType checks the formattedText/Author letter of that element and uses
  // that as the key to update guessedLetters (as cipherLetter)

  const handleGuess = (cipherLetter, newGuess) => {
    newGuess = newGuess.toLowerCase()
    const oldGuess = guess.hash[cipherLetter]
    const oldCipherPair = Object.entries(guess.hash).find(pair => pair[1] === newGuess)
    const updatedGuess = { ...guess }
    // newGuess was previously guessed elsewhere
    if (oldCipherPair) {
      // newGuess was previously guessed elsewhere & cipherLetter had a previous guess
      if (oldGuess) {
        updatedGuess.text = updatedGuess.text.replace(new RegExp(`${oldGuess}`, 'g'), cipherLetter)
        updatedGuess.author = updatedGuess.author.replace(new RegExp(`${oldGuess}`, 'g'), cipherLetter)
        updatedGuess.text = updatedGuess.text.replace(new RegExp(`${newGuess}`, 'g'), oldGuess)
        updatedGuess.author = updatedGuess.author.replace(new RegExp(`${newGuess}`, 'g'), oldGuess)
        updatedGuess.hash[oldCipherPair[0]] = oldGuess
      } else {
        updatedGuess.text = updatedGuess.text.replace(new RegExp(`${newGuess}`, 'g'), oldCipherPair[0])
        updatedGuess.author = updatedGuess.author.replace(new RegExp(`${newGuess}`, 'g'), oldCipherPair[0])
        updatedGuess.hash[oldCipherPair[0]] = null
      }
      // cipherLetter had a previous guess
    } else if (oldGuess) {
      updatedGuess.text = updatedGuess.text.replace(new RegExp(`${oldGuess}`, 'g'), newGuess)
      updatedGuess.author = updatedGuess.author.replace(new RegExp(`${oldGuess}`, 'g'), newGuess)
    }
    // base case
    updatedGuess.text = updatedGuess.text.replace(new RegExp(`${cipherLetter}`, 'g'), newGuess)
    updatedGuess.author = updatedGuess.author.replace(new RegExp(`${cipherLetter}`, 'g'), newGuess)
    updatedGuess.hash[cipherLetter] = newGuess
    setGuess(updatedGuess)
  }

  const handleHighlight = (event) => {
    setHighlighted(event.target.getAttribute('data-letter'))
  }

  const quoteTextJSX =
    quote.formattedText.split(' ').map((word, wordIndex) => (
      <div key={`word-${wordIndex}`} className='solve-word'>
        {[...word].map((letter, letterIndex) => (
          <span
            key={`letter-${wordIndex}-${letterIndex}`}
            onClick={handleHighlight}
            className={`solve-letter ${highlighted === letter ? 'highlight' : ''}`}
            data-letter={letter}
          >{letter}</span>
        ))}
      </div>
    ))

  return (
    <section className='solve-puzzle'>
      {quoteTextJSX}
      <p>{guess.text}</p>
      <button onClick={handleGuess}>DONT CLICK</button>
    </section>
  )
}

export default QuoteSolve
