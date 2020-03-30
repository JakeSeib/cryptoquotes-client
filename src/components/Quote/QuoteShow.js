import React, { useState, useEffect, Fragment } from 'react'
// import { Link, Redirect } from 'react-router-dom'

import QuoteForm from './QuoteForm'
import { quoteShow, quoteUpdate } from '../../api/quote.js'
import createDifficulty from './createDifficulty'
import getChangeHandler from './getChangeHandler'
import messages from '../AutoDismissAlert/messages'

const QuoteShow = (props) => {
  // view should either be solve or edit, depending upon ownership
  // for now, only do edit
  const [quote, setQuote] = useState(null)
  const [isOwner, setIsOwner] = useState(null)
  // const [redirect, setRedirect] = useState(null)

  useEffect(() => {
    quoteShow(props.match.params.id)
      .then(res => {
        setQuote(res.data.quote)
        setIsOwner(res.data.quote.user.id === props.user.id)
      })
      .catch(console.error)
  }, [])

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

  // const destroy = () => {
  //   quoteDelete(quote, props.user)
  //     .then(() => props.msgAlert({
  //       heading: 'Successful Delete',
  //       message: messages.deleteQuoteSuccess,
  //       variant: 'success'
  //     }))
  //     .then(() => this.setRedirect(<Redirect to='/quotes' />))
  //     .catch(console.error)
  // }

  let showJSX
  if (!quote) {
    showJSX = <p>Loading...</p>
  } else if (isOwner === false) {
    showJSX = <p>Can only see owned quotes for now</p>
  } else {
    showJSX = <Fragment>
      <h1>Edit your Quote</h1>
      <QuoteForm
        quote={quote}
        handleSubmit={handleSubmit}
        handleChange={getChangeHandler(quote, setQuote)}
      />
    </Fragment>
  }
  return showJSX
}

export default QuoteShow
