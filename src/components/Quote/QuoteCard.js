import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'

import './css/QuoteCard.scss'

const QuoteCard = ({ quote, solved }) => {
  const [redirectId, setRedirectId] = useState(null)

  let titleText = <Link to={`/quotes/${quote.id}`}>{quote.title}</Link>
  let statJSX
  if (solved) {
    titleText = `${quote.title}`
    statJSX = <Badge className='solved-badge' variant="success">Solved</Badge>
  }

  const handleClick = (event) => {
    setRedirectId(event.target.getAttribute('data-id'))
  }

  let cardJSX
  if (redirectId) {
    cardJSX = <Redirect to={`/quotes/${redirectId}`} />
  } else {
    cardJSX = (
      <Container className='qc-container'>
        <Row>
          <Col className='qc-text' data-id={quote.id} onClick={event => { handleClick(event) }}>{titleText} by {quote.user.name}</Col>
          <Col md='auto' className='qc-text'>{statJSX}{`Difficulty: ${quote.difficulty}`}</Col>
        </Row>
      </Container>
    )
  }

  return cardJSX
}

export default QuoteCard
