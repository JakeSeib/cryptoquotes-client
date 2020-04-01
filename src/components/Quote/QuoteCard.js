import React from 'react'
import { Link } from 'react-router-dom'

const QuoteCard = ({ quote, solved }) => {
  let cardJSX
  if (solved) {
    cardJSX = `${quote.title} (Solved!)`
  } else {
    cardJSX = <Link to={`/quotes/${quote.id}`}>{quote.title}</Link>
  }
  return cardJSX
}

export default QuoteCard
