import React, { useState, Fragment } from 'react'

import quoteDisplay from './quoteDisplay'
// import messages from '../AutoDismissAlert/messages'

const QuoteSolve = ({ quote, user }) => {
  const [guess] = useState({
    text: '',
    author: ''
  })

  quoteDisplay(quote)

  const guessJSX = (
    <Fragment>
      <h2>{guess.text}</h2>
      <p>{'- ' + guess.author}</p>
    </Fragment>
  )
  const quoteJSX = (
    <Fragment>
      <h2>{quote.formattedText}</h2>
      <p>{quote.formattedAuthor}</p>
    </Fragment>
  )

  return (
    <Fragment>
      {guessJSX}
      {quoteJSX}
    </Fragment>
  )
}

export default QuoteSolve
