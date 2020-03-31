import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import QuoteForm from './QuoteForm'
import { quoteUpdate, quoteDelete } from '../../api/quote.js'
import createDifficulty from './createDifficulty'
import getChangeHandler from './getChangeHandler'
import messages from '../AutoDismissAlert/messages'

const QuoteEdit = (props) => {
  const [quote, setQuote] = useState(props.initQuote)
  const [redirect, setRedirect] = useState(null)

  const handleSubmit = () => {
    event.preventDefault()

    quote.difficulty = createDifficulty(quote)

    quoteUpdate(quote, props.user)
      .then(res => setQuote(res.data.quote))
      .then(() => props.msgAlert({
        heading: 'Successful Update',
        message: messages.updateQuoteSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }

  const handleDelete = () => {
    quoteDelete(quote, props.user)
      .then(() => setRedirect(<Redirect to='/quotes' />))
      .then(() => props.msgAlert({
        heading: 'Successful Delete',
        message: messages.deleteQuoteSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }

  let editJSX
  if (redirect) {
    editJSX = redirect
  } else {
    editJSX = (
      <Fragment>
        <h1>Edit your Quote</h1>
        <QuoteForm
          quote={quote}
          handleSubmit={handleSubmit}
          handleChange={getChangeHandler(quote, setQuote)}
          handleDelete={handleDelete}
        />
      </Fragment>
    )
  }
  return editJSX
}

export default QuoteEdit
