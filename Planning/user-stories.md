# Pitch
Build an app that allows users to solve cryptograms without hassle or tedium.

## Stage 1 (MVP) User Stories
- As an unregistered user, I would like to sign up with email, name, and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to solve cryptoquotes.
  - I would like to see at all times what the scrambled letter is for each space.
  - I would like to guess a letter and have all other instances of that letter automatically replaced with my guess.
  - I would like to automatically see feedback if I am right when all spaces are filled in.
- As a signed in user, I would like to browse different cryptoquotes to solve.
  - I would like to see difficulty ratings for quotes.
- As a signed in user, I would like to see my previously solved cryptoquotes.
- As a signed in user, I would like to create a new quote.
  - As a signed in user with owned quotes, I would like to edit my existing quotes.
  - As a signed in user with owned quotes, I would like to delete my existing quotes.

## Stage 2 User Stories
- As a signed in user solving a cryptoquote,
  - I would like to see counts of how many of each scrambled letter there are.
  - When I guess a letter that was previously guessed, I would like to have my previous guess for that letter swapped over to the new one.
  - When I guess a letter, I would like to have the active input swapped to the next spot to allow for easy typing.
  - I would like to see either currently guessed letters, or letters remaining to be guessed at all times.
- As a signed in user, I would like to see quotes categorized as default (i.e. provided by the app), created by me, and created by other users.

## Stage 3: stretch goals
- [Access Control List](https://en.wikipedia.org/wiki/Access-control_list) to only let certain users add quotes
  - Add badge (https://react-bootstrap.github.io/components/badge/) to preferred users, including app creator
- Play without logging in
- Algorithmically-determined quote difficulties
- Validation of quotes (have to be above certain size, contain some # of different letters)
- Validation of cipher (letters CANNOT have the same index as they started with)
- Quote categories
- Track and show performance metrics (time to complete, hints used)
  - Compare performance metrics with other users
  show overall performance metrics for a user
- Get a hint: get currently highlighted letter for free
- Better difficulty setting
- Pagination for quotes (within each category- i.e. app, yours, others)
- Save partial progress on quotes (potentially with componentWillUnmount)
