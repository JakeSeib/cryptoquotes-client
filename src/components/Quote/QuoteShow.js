import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import QuoteEdit from './QuoteEdit'
import { quoteShow } from '../../api/quote.js'

const QuoteShow = (props) => {
  // view should either be solve or edit, depending upon ownership
  // for now, only do edit
  const [quote, setQuote] = useState(null)
  const [isOwner, setIsOwner] = useState(null)

  useEffect(() => {
    quoteShow(props.match.params.id)
      .then(res => {
        setQuote(res.data.quote)
        setIsOwner(res.data.quote.user.id === props.user.id)
      })
      .catch(console.error)
  }, [])

  let showJSX
  if (!quote) {
    showJSX = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  } else if (isOwner) {
    showJSX = <QuoteEdit user={props.user} initQuote={quote} msgAlert={props.msgAlert} />
  } else {
    showJSX = <h1>This where you will solve a Quote</h1>
  }
  return showJSX
}

export default QuoteShow
