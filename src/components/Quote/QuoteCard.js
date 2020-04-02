import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'

import './QuoteCard.scss'

const QuoteCard = ({ quote, solved }) => {
  let titleText = <Link to={`/quotes/${quote.id}`}>{quote.title}</Link>
  let statJSX
  if (solved) {
    titleText = `${quote.title}`
    statJSX = <Badge className='solved-badge' variant="success">Solved</Badge>
  }
  return (
    <Container className='qc-container'>
      <Row>
        <Col className='qc-text'>{titleText} by {quote.user.name}</Col>
        <Col md='auto' className='qc-text'>{statJSX}{`Difficulty: ${quote.difficulty}`}</Col>
      </Row>
    </Container>
  )
}

export default QuoteCard
