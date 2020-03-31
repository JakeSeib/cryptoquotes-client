import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'

const Home = (props) => {
  let homeJSX
  if (!props.user) {
    homeJSX = <Redirect to='/sign-in' />
  } else {
    homeJSX = (
      <Fragment>
        <h4>Welcome to Cryptoquotes by Jake Seib</h4>
      </Fragment>
    )
  }
  return homeJSX
}

export default Home
