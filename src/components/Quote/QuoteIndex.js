import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { quoteIndex } from '../../api/quote.js'

const QuoteIndex = function () {
  const [quotes, setQuotes] = useState(null)

  useEffect(() => {
    quoteIndex()
      .then(res => {
        console.log('res', res)
        setQuotes(res.data.quotes)
      })
      .catch(console.error)
  }, [])

  let quotesJSX
  if (!quotes) {
    quotesJSX = <img src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp"/>
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
