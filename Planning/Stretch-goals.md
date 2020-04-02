## Small improvements
- Make whole "quote card" clickable in index view instead of just the title
- replace 'clear' text in alphaDisplay with a button with its own event handler
- Show difficulty as stars (with grayed out stars for remaining ones if <5) to better convey that 5 is max
- Refactor Quotes to be a class with methods for createCipher, createDifficulty, etc.

## Stage 3: stretch goals
- Styling/UI
  - splash page
  - add help page
- [Access Control List](https://en.wikipedia.org/wiki/Access-control_list) to only let certain users add quotes
  - Add [badge](https://react-bootstrap.github.io/components/badge/) to preferred users, including app creator
- Play without logging in
- Validation of quotes (have to be above certain size, contain some # of different alphabetical letters)
- Validation of cipher (letters MUST change when encoded)
- Get a hint: get currently highlighted letter for free
- Track and show performance metrics (time to complete, hints used)
  - Compare performance metrics with other users
  - show overall performance metrics for a user
- Pagination for quotes (within each category- i.e. app, yours, others)
- Let users rate quotes 1-5

## Deprioritized ideas
- Better difficulty setting
- Save partial progress on quotes (i.e. with componentWillUnmount)
- Quote categories
