import React from 'react'
import { Redirect, Link } from 'react-router-dom'

import '../index.scss'

const Home = (props) => {
  let homeJSX
  if (!props.user) {
    homeJSX = <Redirect to='/sign-up' />
  } else {
    homeJSX = (
      <main>
        <h4>Welcome to Cryptoquotes by Jake Seib</h4>
        <Link className='index-link' to="/quotes">Browse Quotes</Link>
      </main>
    )
  }
  return homeJSX
}

export default Home
