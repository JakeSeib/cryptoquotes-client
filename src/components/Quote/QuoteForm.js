import React from 'react'

const QuoteForm = ({ quote, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder='A title for other users to see'
      name='title'
      value={quote.title || ''}
      onChange={handleChange}
    />
    <label>Quote Text</label>
    <textarea
      placeholder='To be or not to be'
      name='text'
      value={quote.text || ''}
      onChange={handleChange}
    />
    <label>Author</label>
    <input
      placeholder='Hamlet'
      name='author'
      value={quote.author || ''}
      onChange={handleChange}
    />
    <button type='submit'>Submit</button>
  </form>
)

export default QuoteForm
