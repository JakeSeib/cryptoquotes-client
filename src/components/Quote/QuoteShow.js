import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import QuoteEdit from './QuoteEdit'
import QuoteSolve from './QuoteSolve'
import { quoteShow } from '../../api/quote.js'
import messages from '../AutoDismissAlert/messages'

const QuoteShow = ({ match, user, msgAlert }) => {
  // view should either be solve or edit, depending upon ownership
  const [quote, setQuote] = useState(null)
  const [isOwner, setIsOwner] = useState(null)

  useEffect(() => {
    quoteShow(match.params.id)
      .then(res => {
        setQuote(res.data.quote)
        setIsOwner(res.data.quote.user.id === user.id)
      })
      .catch(error => {
        setQuote(null)
        msgAlert({
          heading: 'Failed to get quote with error: ' + error.message,
          message: messages.quoteShowFailure,
          variant: 'danger'
        })
      })
  }, [])

  let showJSX
  if (!quote) {
    showJSX = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  } else if (isOwner) {
    showJSX = <QuoteEdit user={user} initQuote={quote} msgAlert={msgAlert} />
  } else {
    showJSX = <QuoteSolve user={user} quote={quote} msgAlert={msgAlert} />
  }
  return showJSX
}

export default QuoteShow
