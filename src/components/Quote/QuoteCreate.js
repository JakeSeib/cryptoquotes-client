import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import QuoteForm from './QuoteForm'
import { quoteCreate } from '../../api/quote.js'
import createCipher from './createCipher'
import createDifficulty from './createDifficulty'

const QuoteCreate = (props) => {
  const [quote, setQuote] = useState({ title: '', text: '', author: '' })
  const [redirect, setRedirect] = useState(null)

  const handleChange = event => {
    // create a new object with key of `name` property on input and
    // value with `value` property
    const updatedField = {
      // key in square brackets because it's a variable
      [event.target.name]: event.target.value
    }
    // combine the current quote with updatedField using `Object.assign` method
    // use spread operator to avoid editing state directly
    const editedQuote = Object.assign({ ...quote }, updatedField)
    // set the state
    setQuote(editedQuote)
  }

  const handleSubmit = event => {
    event.preventDefault()

    quote.cipher = createCipher()
    quote.difficulty = createDifficulty(quote)

    quoteCreate(quote, props.user)
      .then(res => {
        setRedirect(<Redirect to={`/quotes/${res.data.quote.id}`} />)
      })
      .catch(console.error)
  }

  let createJSX
  // if we've updated the quote, redirect to the show page
  if (redirect) {
    createJSX = redirect
  } else {
    createJSX = (
      <Fragment>
        <h1>Quote Create page</h1>
        <QuoteForm
          quote={quote}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Fragment>
    )
  }
  return createJSX
}

export default QuoteCreate
