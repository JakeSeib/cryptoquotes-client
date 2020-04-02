import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './css/QuoteForm.scss'

const QuoteForm = ({ quote, handleSubmit, handleChange, handleDelete }) => (
  <div className='row'>
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder='A title for other users to see'
            name='title'
            value={quote.title || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="text">
          <Form.Label>Quote Text</Form.Label>
          <Form.Control
            required
            type="text"
            as="textarea"
            placeholder='To be or not to be'
            name='text'
            value={quote.text || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder='Hamlet'
            name='author'
            value={quote.author || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Button className='edit-submit-btn' variant="primary" type="submit">Submit</Button>
        {handleDelete &&
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        }
      </Form>
    </div>
  </div>
)

export default QuoteForm
