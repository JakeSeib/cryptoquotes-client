import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import { quoteIndex } from '../../api/quote.js'

const QuoteIndex = function () {
  const [quotes, setQuotes] = useState(null)

  useEffect(() => {
    quoteIndex()
      .then(res => setQuotes(res.data.quotes))
      .catch(console.error)
  }, [])

  let quotesJSX
  if (!quotes) {
    quotesJSX = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  } else if (quotes.length === 0) {
    quotesJSX = 'No quotes yet'
  } else {
    quotesJSX = quotes.map(quote => (
      <li key={quote.id}>
        <Link to={`/quotes/${quote.id}`}>{quote.title}</Link>
      </li>
    ))
  }

  return (
    <Fragment>
      <h4>Quotes</h4>
      <ul>
        {quotesJSX}
      </ul>
    </Fragment>
  )
}

export default QuoteIndex
