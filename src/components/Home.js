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
        <h4>Welcome to Cryptoquotes by Jacob Seib</h4>
        <Link className='index-link' to="/quotes">Browse Quotes</Link>
        <section>
          <p className='splash-p'>
          In this app, you will solve cryptograms- short puzzles with some encrypted text for you to decode. In this case, the text will be a quote by someone famous. The original text of the quote has been scrambled using a substitution cipher, meaning that each letter in the alphabet has a randomly chosen letter that will replace it in the encrypted text. For example, every time the letter `A` occurs in the original text, the letter `T` might appear in the encrypted text.
          </p>
          <p className='splash-p'>
          To play, use the link above or the dropdown in the top nav bar to browse quotes. You will see a list of quotes showing their titles- if you have previously solved any quotes, they will be displayed as solved and will no longer be accessible to you. Find a quote that you did not create (navigating to a quote you did create will prompt you to edit it, since solving your own quotes is not very interesting) and click it.
          </p>
          <p className='splash-p'>
          Once you have selected a quote, input a guess by clicking the space where you want to guess. You will see the spaces where that letter occurs highlighted. Then either type the letter you want to guess or click the desired letter in the box below the quote. Continue until you decode the entire quote. To delete your guess for the currently selected letter, either hit the backspace key or the `clear` button in the box below the quotes. You will also see numbers showing how many times each letter occurs in the quote- try to use this information to make educated guesses for what each letter might be!
          </p>
          <p className='splash-p'>
          You can also create, edit, and delete your own quotes for other users to solve via the appropriate buttons from the dropdown in the nav bar. When creating a quote, provide the quote text, an author, and a title that will be displayed in the browse view for other users. A title can be anything, though it is encouraged to have it relate to the quote&apos;s content in some way. Once a new quote is created, it will be given an algorithmically-generated difficulty and a cipher (a scrambled version of the alphabet for encoding the quote), and will be available for other users to solve.
          </p>
          <p className='splash-p'>
          Have fun!
          </p>
        </section>
      </main>
    )
  }
  return homeJSX
}

export default Home
