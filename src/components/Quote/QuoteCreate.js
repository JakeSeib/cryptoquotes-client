import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import QuoteForm from './QuoteForm'
import { quoteCreate } from '../../api/quote.js'
import createCipher from './createCipher'
import createDifficulty from './createDifficulty'
import getChangeHandler from './getChangeHandler'
import messages from '../AutoDismissAlert/messages'

const QuoteCreate = (props) => {
  const [quote, setQuote] = useState({ title: '', text: '', author: '' })
  const [redirect, setRedirect] = useState(null)

  const handleSubmit = event => {
    event.preventDefault()

    quote.cipher = createCipher()
    quote.difficulty = createDifficulty(quote)

    quoteCreate(quote, props.user)
      .then((res) => {
        props.msgAlert({
          heading: 'Successful Create',
          message: messages.createQuoteSuccess,
          variant: 'success'
        })
        return res
      })
      .then(res => {
        setRedirect(<Redirect to={`/quotes/${res.data.quote.id}`} />)
      })
      .catch(console.error)
  }

  let createJSX
  // if we've updated the quote, redirect to the show page
  if (redirect) {
    createJSX = redirect
  } else {
    createJSX = (
      <Fragment>
        <h1>Create a Quote</h1>
        <QuoteForm
          quote={quote}
          handleSubmit={handleSubmit}
          handleChange={getChangeHandler(quote, setQuote)}
        />
      </Fragment>
    )
  }
  return createJSX
}

export default QuoteCreate
