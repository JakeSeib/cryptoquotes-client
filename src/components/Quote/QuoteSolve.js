import React, { Fragment, useState, useEffect } from 'react'

import quoteDisplay from './quoteDisplay'
import { solvedQuoteCreate } from '../../api/solvedQuote.js'
import messages from '../AutoDismissAlert/messages'
import './css/QuoteSolve.scss'

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
        .catch(error => {
          msgAlert({
            heading: 'Solution reached, but save failed with error: ' + error.message,
            message: messages.solvedQuoteCreateFailure,
            variant: 'danger'
          })
        })
    }
  }, [guess])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [guess, highlighted, solved])

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

  const updateWithRegex = (guess, regex, replacement) => {
    guess.text = guess.text.replace(regex, replacement)
    guess.author = guess.author.replace(regex, replacement)
  }

  const handleClear = cipherLetter => {
    const clearedLetter = guess.hash[cipherLetter]
    if (!clearedLetter) {
      return msgAlert({
        heading: 'Nothing to clear',
        message: messages.alertNullSelected,
        variant: 'warning'
      })
    }
    const updatedGuess = {
      hash: { ...guess.hash },
      text: guess.text.slice(),
      author: guess.author.slice()
    }
    updateWithRegex(updatedGuess, new RegExp(`${clearedLetter}`, 'g'), cipherLetter)
    updatedGuess.hash[cipherLetter] = null
    setGuess(updatedGuess)
  }

  const handleKeyPress = (event) => {
    if (solved) {
      alertSolved()
    } else if ([...alphaDisplay, 'BACKSPACE'].includes(event.key.toUpperCase())) {
      handleGuess(event)
    } else {
      msgAlert({
        heading: 'Bad character',
        message: messages.alertOnlyAlpha,
        variant: 'warning'
      })
    }
  }

  const handleGuess = (event) => {
    let cipherLetter
    if (highlighted) {
      cipherLetter = highlighted
    } else {
      return msgAlert({
        heading: 'Nothing selected',
        message: messages.alertNoHighlight,
        variant: 'warning'
      })
    }
    const newGuess = (
      event.key ? event.key.toLowerCase() : event.target.getAttribute('data-letter').toLowerCase()
    )
    if (['clear', 'backspace'].includes(newGuess)) {
      return handleClear(cipherLetter)
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
        updateWithRegex(updatedGuess, new RegExp(`${oldGuess}`, 'g'), cipherLetter)
        updateWithRegex(updatedGuess, new RegExp(`${newGuess}`, 'g'), oldGuess)
        updatedGuess.hash[oldCipherPair[0]] = oldGuess
      } else {
        updateWithRegex(updatedGuess, new RegExp(`${newGuess}`, 'g'), oldCipherPair[0])
        updatedGuess.hash[oldCipherPair[0]] = null
      }
      // cipherLetter had a previous guess
    } else if (oldGuess) {
      updateWithRegex(updatedGuess, new RegExp(`${oldGuess}`, 'g'), newGuess)
    }
    // base case
    updateWithRegex(updatedGuess, new RegExp(`${cipherLetter}`, 'g'), newGuess)
    updatedGuess.hash[cipherLetter] = newGuess
    setGuess(updatedGuess)
  }

  const handleHighlight = (event) => {
    const letter = event.target.getAttribute('data-letter')
    if (quote.cipherSet.has(letter)) {
      setHighlighted(letter)
    }
  }

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
            <p
              className={`letter-count ${quote.cipherCount[letter] ? 'alpha' : 'sym'}`}
            >
              {quote.cipherCount[letter] || '_'}
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
          className={`alpha-letter ${Object.values(guess.hash).includes(letter.toLowerCase()) ? 'highlight' : ''}`}
          data-letter={letter}
          onClick={event => { solved ? alertSolved() : handleGuess(event) }}>
          {letter}
        </p>
      ))}
    </section>

  return (
    <section className='solve-puzzle'>
      <h3>{quote.title} by {quote.user.name}</h3>
      {quoteTextJSX}
      {letterDisplayJSX}
    </section>
  )
}

export default QuoteSolve
