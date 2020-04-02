import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import QuoteForm from './QuoteForm'
import { quoteCreate } from '../../api/quote.js'
import createCipher from './createCipher'
import createDifficulty from './createDifficulty'
import getChangeHandler from './getChangeHandler'
import messages from '../AutoDismissAlert/messages'

const QuoteCreate = ({ user, msgAlert }) => {
  const [quote, setQuote] = useState({ title: '', text: '', author: '' })
  const [redirect, setRedirect] = useState(null)

  const handleSubmit = event => {
    event.preventDefault()

    if ([quote.title, quote.text, quote.author].includes('')) {
      return msgAlert({
        heading: 'All fields are required',
        message: messages.createWithBlank,
        variant: 'danger'
      })
    }

    quote.cipher = createCipher()
    quote.difficulty = createDifficulty(quote)

    quoteCreate(quote, user)
      .then((res) => {
        msgAlert({
          heading: 'Successful Create',
          message: messages.createQuoteSuccess,
          variant: 'success'
        })
        return res
      })
      .then(res => {
        setRedirect(<Redirect to={`/quotes/${res.data.quote.id}`} />)
      })
      .catch(error => {
        msgAlert({
          heading: 'Create failed with error: ' + error.message,
          message: messages.createFailure,
          variant: 'danger'
        })
      })
  }

  let createJSX
  // if we've updated the quote, redirect to the show page
  if (redirect) {
    createJSX = redirect
  } else {
    createJSX = (
      <Fragment>
        <h3>Create a Quote</h3>
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
