import React, { useState, useEffect, Fragment } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import QuoteCard from './QuoteCard'
import { quoteIndex } from '../../api/quote.js'
import { solvedQuoteIndex } from '../../api/solvedQuote.js'

const QuoteIndex = function ({ user }) {
  const [quotes, setQuotes] = useState(null)
  const [solvedQuotes, setSolvedQuotes] = useState([])

  useEffect(() => {
    quoteIndex()
      .then(res => setQuotes(res.data.quotes))
      .catch(console.error)
  }, [])

  useEffect(() => {
    solvedQuoteIndex(user)
      .then(res => {
        setSolvedQuotes(res.data.solved_quotes)
      })
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
        <QuoteCard quote={quote} solved={solvedQuotes.find(sQ => sQ.quote.id === quote.id)} />
      </li>
    ))
  }

  return (
    <Fragment>
      <h4>Quotes</h4>
      <ul>
        {quotesJSX}
        {solvedQuotes ? 'got solved quotes' : 'no solved quotes'}
      </ul>
    </Fragment>
  )
}

export default QuoteIndex
