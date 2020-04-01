import apiUrl from '../apiConfig'
import axios from 'axios'

export const solvedQuoteCreate = (quote, user) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/solved_quotes`,
    data: {
      solved_quote: {
        quote_id: quote.id
      }
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const solvedQuoteIndex = (user) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/solved_quotes`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const solvedQuoteShow = (id, user) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/solved_quotes/${id}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const solvedQuoteDelete = (id, user) => {
  return axios({
    url: `${apiUrl}/solved_quotes/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
