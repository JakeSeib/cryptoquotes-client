import React, { useState } from 'react'

import quoteDisplay from './quoteDisplay'
import './QuoteSolve.scss'
// import messages from '../AutoDismissAlert/messages'

const QuoteSolve = ({ quote, user }) => {
  const [guess] = useState({
    text: '',
    author: ''
  })

  quoteDisplay(quote)

  // set up individual elements for each letter
  // those individual elements show the current guess above the formatted letter
  // set event listeners onClick for alphabetical letters

  // store and use guess in similar way as quoteDisplay: make hash of
  // guessedLetters whose keys are the set of alphabetic characters in the quote
  // and whose values are the current guesses for those letters (alter
  // quoteDisplay and createDifficulty to filter out non-alphabetical characters)

  // onClick checks the formattedText/Author letter of that element and uses
  // that as the key to update guessedLetters

  // when guessedLetters changes, update guess
  // figure out how to update guess when two guesses are getting swapped

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
      <p>{guess.text}</p>
    </section>
  )
}

export default QuoteSolve
