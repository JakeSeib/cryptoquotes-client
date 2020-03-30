import apiUrl from '../apiConfig'
import axios from 'axios'

export const quoteCreate = (quote, user) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/quotes`,
    data: {
      quote: {
        text: quote.text,
        author: quote.author,
        title: quote.title,
        cipher: quote.cipher,
        difficulty: quote.difficulty
      }
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const quoteIndex = () => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/quotes`
  })
}

export const quoteShow = id => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/quotes/${id}`
  })
}

export const quoteUpdate = (quote, user) => {
  return axios({
    url: `${apiUrl}/quotes/${quote.id}`,
    method: 'PATCH',
    data: {
      quote: {
        text: quote.text,
        author: quote.author,
        title: quote.title,
        cipher: quote.cipher,
        difficulty: quote.difficulty
      }
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const quoteDelete = (quote, user) => {
  return axios({
    url: `${apiUrl}/quotes/${quote.id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
