## Stretch goals
- Play without logging in
- Validation of quotes (have to be above certain size, contain some # of different alphabetical letters)
- Validation of cipher (letters MUST change when encoded)
  - https://en.wikipedia.org/wiki/Derangement
  - https://stackoverflow.com/questions/25200220/generate-a-random-derangement-of-a-list
- Get a hint: get currently highlighted letter for free
- Pagination for quotes (within each category- i.e. app, yours, others)
- Refactor Quotes to be class-based with methods for createCipher, createDifficulty, etc.

## Known issues
- On small screens, long words are split across multiple lines, and it is difficult to tell that this is the case

## Deprioritized features
- Show difficulty as stars (with grayed out stars for remaining ones if <5) to better convey that 5 is max
- Better difficulty setting
  - The difficulty function is not very good. It clumps difficulties at the endpoints of 1 and 5, when it should probably follow a normal distribution, clumping around 3.
- Save partial progress on quotes (additional field for solved_quotes)
- Quote categories
- Track and show performance metrics (time to complete, hints used)
  - Compare performance metrics with other users
  - show overall performance metrics for a user
- Let users rate quotes 1-5
- [Access Control List](https://en.wikipedia.org/wiki/Access-control_list) to only let certain users add quotes
  - Add [badge](https://react-bootstrap.github.io/components/badge/) to preferred users, including app creator
- Replace 'clear' text in alphaDisplay with a button with its own event handler
