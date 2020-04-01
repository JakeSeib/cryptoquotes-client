import React, { Fragment, useState, useEffect } from 'react'

import quoteDisplay from './quoteDisplay'
import { solvedQuoteCreate } from '../../api/solvedQuote.js'
import messages from '../AutoDismissAlert/messages'
import './QuoteSolve.scss'
// import messages from '../AutoDismissAlert/messages'

// NOTE:
// convention is that uppercased letters denote encoded letters, lowercased
// letters denote either the solution text or the user's current guess at the
// solution text.
// this convention is used in handleGuess when swapping two guesses to maintain
// consistency for the user's current guess

function GuessHash (cipherSet) {
  cipherSet.forEach(char => {
    this[char] = null
  })
}

const QuoteSolve = ({ quote, user, msgAlert }) => {
  quoteDisplay(quote)
  const [guess, setGuess] = useState({
    hash: new GuessHash(quote.cipherSet),
    text: quote.formattedText,
    author: quote.formattedAuthor
  })
  const [highlighted, setHighlighted] = useState(null)
  const [solved, setSolved] = useState(false)
  const alphaDisplay = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  alphaDisplay.push('clear')

  useEffect(() => {
    if (guess.text === quote.text.toLowerCase() &&
    guess.author.slice() === quote.author.toLowerCase()) {
      solvedQuoteCreate(quote, user)
        .then(() => setSolved(true))
        .then(() => msgAlert({
          heading: 'Solved!',
          message: messages.quoteSolvedSuccess,
          variant: 'success'
        }))
        .catch(console.error)
    }
  }, [guess])

  // todo: replace 'clear' text in alphaDisplay with a button with its own event handler
  const handleClear = cipherLetter => {
    const clearedLetter = guess.hash[cipherLetter]
    const updatedGuess = {
      hash: { ...guess.hash },
      text: guess.text.slice(),
      author: guess.author.slice()
    }
    updatedGuess.text = updatedGuess.text.replace(new RegExp(`${clearedLetter}`, 'g'), cipherLetter)
    updatedGuess.author = updatedGuess.author.replace(new RegExp(`${clearedLetter}`, 'g'), cipherLetter)
    updatedGuess.hash[cipherLetter] = null
    setGuess(updatedGuess)
  }

  const handleGuess = (event) => {
    let cipherLetter
    if (highlighted) {
      cipherLetter = highlighted
    } else {
      // todo: handle guessing when no letter highlighted
      return
    }
    const newGuess = event.target.getAttribute('data-letter').toLowerCase()
    if (newGuess === 'clear') {
      if (guess.hash[cipherLetter]) {
        return handleClear(cipherLetter)
      }
      return
    }
    const oldGuess = guess.hash[cipherLetter]
    const oldCipherPair = Object.entries(guess.hash).find(pair => pair[1] === newGuess)
    const updatedGuess = {
      hash: { ...guess.hash },
      text: guess.text.slice(),
      author: guess.author.slice()
    }
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
    const letter = event.target.getAttribute('data-letter')
    if (quote.cipherSet.has(letter)) {
      setHighlighted(letter)
    }
  }

  const displayGuessLetter = letter => (
    guess.hash[letter] ? guess.hash[letter].toUpperCase() : null
  )

  const alertSolved = () => (
    msgAlert({
      heading: 'Already solved!',
      message: messages.alertSolved,
      variant: 'warning'
    })
  )

  const quoteAttrToJSX = quoteArr => (
    quoteArr.split(' ').map((word, wordIndex) => (
      <div key={`word-${wordIndex}`} className='solve-word'>
        {[...word].map((letter, letterIndex) => (
          <span
            key={`letter-${wordIndex}-${letterIndex}`}
            className={`quote-letter ${(highlighted === letter) && !solved ? 'highlight' : ''}`}
          >
            <p
              className={`guess-letter ${(highlighted === letter) && !solved ? 'highlight' : ''}`}
              onClick={event => { solved ? alertSolved() : handleHighlight(event) }}
              data-letter={letter}
            >
              {displayGuessLetter(letter) || (quote.cipherSet.has(letter) ? '_' : letter)}
            </p>
            <p
              className='solve-letter'
              onClick={event => { solved ? alertSolved() : handleHighlight(event) }}
              data-letter={letter}>
              {letter}
            </p>
          </span>
        ))}
      </div>
    ))
  )

  const quoteTextJSX = (
    <Fragment>
      <section className='quote-section'>
        {quoteAttrToJSX(quote.formattedText)}
      </section>
      <section className='author-section'>
        <p className='author-tick'>-</p>
        {quoteAttrToJSX(quote.formattedAuthor)}
      </section>
    </Fragment>
  )

  const letterDisplayJSX =
    <section className='alpha-section'>
      {alphaDisplay.map(letter => (
        <p
          key={letter}
          className='alpha-letter'
          data-letter={letter}
          onClick={event => { solved ? alertSolved() : handleGuess(event) }}>
          {letter}
        </p>
      ))}
    </section>

  return (
    <section className='solve-puzzle'>
      {quoteTextJSX}
      {letterDisplayJSX}
    </section>
  )
}

export default QuoteSolve
