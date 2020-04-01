## Stage 3: stretch goals
- Styling (especially for browse view)
- [Access Control List](https://en.wikipedia.org/wiki/Access-control_list) to only let certain users add quotes
  - Add badge (https://react-bootstrap.github.io/components/badge/) to preferred users, including app creator
- Play without logging in
- Validation of quotes (have to be above certain size, contain some # of different letters)
- Validation of cipher (letters MUST change when encoded)
- Quote categories
- Get a hint: get currently highlighted letter for free
- Track and show performance metrics (time to complete, hints used)
  - Compare performance metrics with other users
  show overall performance metrics for a user
- Better difficulty setting
- Pagination for quotes (within each category- i.e. app, yours, others)
- Save partial progress on quotes (i.e. with componentWillUnmount)
- Refactor Quotes to be a class with methods for createCipher, createDifficulty, etc.
