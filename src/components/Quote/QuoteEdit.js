import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import QuoteForm from './QuoteForm'
import { quoteUpdate, quoteDelete } from '../../api/quote.js'
import createDifficulty from './createDifficulty'
import getChangeHandler from './getChangeHandler'
import messages from '../AutoDismissAlert/messages'
import './css/QuoteEdit.scss'

const QuoteEdit = ({ initQuote, user, msgAlert }) => {
  const [quote, setQuote] = useState(initQuote)
  const [redirect, setRedirect] = useState(null)

  const handleSubmit = () => {
    event.preventDefault()

    quote.difficulty = createDifficulty(quote)

    quoteUpdate(quote, user)
      .then(res => setQuote(res.data.quote))
      .then(() => msgAlert({
        heading: 'Successful Update',
        message: messages.updateQuoteSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Update failed with error: ' + error.message,
          message: messages.quoteUpdateFailure,
          variant: 'danger'
        })
      })
  }

  const handleDelete = () => {
    quoteDelete(quote, user)
      .then(() => setRedirect(<Redirect to='/quotes' />))
      .then(() => msgAlert({
        heading: 'Successful Delete',
        message: messages.deleteQuoteSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Delete failed with error: ' + error.message,
          message: messages.quoteDeleteFailure,
          variant: 'danger'
        })
      })
  }

  let editJSX
  if (redirect) {
    editJSX = redirect
  } else {
    editJSX = (
      <Fragment>
        <h3>Edit your Quote</h3>
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
