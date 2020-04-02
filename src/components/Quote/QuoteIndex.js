import React, { useState, useEffect, Fragment } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import QuoteCard from './QuoteCard'
import { quoteIndex } from '../../api/quote.js'
import { solvedQuoteIndex } from '../../api/solvedQuote.js'
import messages from '../AutoDismissAlert/messages'
import './css/QuoteIndex.scss'

const QuoteIndex = function ({ user, msgAlert }) {
  const [quotes, setQuotes] = useState(null)
  const [solvedQuotes, setSolvedQuotes] = useState([])

  useEffect(() => {
    quoteIndex()
      .then(res => setQuotes(res.data.quotes))
      .catch(error => {
        setQuotes(null)
        msgAlert({
          heading: 'Get quotes failed with error: ' + error.message,
          message: messages.quoteIndexFailure,
          variant: 'danger'
        })
      })
  }, [])

  useEffect(() => {
    solvedQuoteIndex(user)
      .then(res => {
        setSolvedQuotes(res.data.solved_quotes)
      })
      .catch(error => {
        setSolvedQuotes([])
        msgAlert({
          heading: 'Failed to get your previous solutions with error: ' + error.message,
          message: messages.solvedQuotesIndexFailure,
          variant: 'danger'
        })
      })
  }, [])

  const categorized = {
    app: [],
    currentUser: [],
    otherUsers: []
  }

  // sort quotes into categories for App-provided (using hard-coded id of
  // designted "Site Owner" user), owned by current user, or owned by other users
  const idBuckets = [
    { id: 1, category: 'app' },
    { id: user.id, category: 'currentUser' }
  ]
  if (quotes) {
    quotes.forEach(quote => {
      const bucket = idBuckets.find(obj => obj.id === quote.user.id)
      bucket ? categorized[bucket.category].push(quote) : categorized.otherUsers.push(quote)
    })
  }

  const makeQuoteCards = quotes => (
    quotes.map(quote => (
      <li key={quote.id}>
        <QuoteCard quote={quote} solved={solvedQuotes.find(sQ => sQ.quote.id === quote.id)} />
      </li>
    ))
  )

  let quotesJSX
  if (!quotes) {
    quotesJSX = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  } else if (quotes.length === 0) {
    quotesJSX = 'No quotes!'
  } else {
    quotesJSX = (
      <Fragment>
        <h4>App-Provided Quotes</h4>
        <ul className='quote-ul'>
          {makeQuoteCards(categorized.app)}
        </ul>
        <h4>Your Quotes</h4>
        <ul className='quote-ul'>
          {makeQuoteCards(categorized.currentUser)}
        </ul>
        <h4>Other Users Quotes</h4>
        <ul className='quote-ul'>
          {makeQuoteCards(categorized.otherUsers)}
        </ul>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <h3>Quotes</h3>
      {quotesJSX}
    </Fragment>
  )
}

export default QuoteIndex
