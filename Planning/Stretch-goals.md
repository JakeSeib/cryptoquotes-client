## Small improvements
- Make whole "quote card" clickable in index view instead of just the title
- replace 'clear' text in alphaDisplay with a button with its own event handler
- Show difficulty as stars (with grayed out stars for remaining ones if <5) to better convey that 5 is max
- Refactor Quotes to be a class with methods for createCipher, createDifficulty, etc.

## Stage 3: stretch goals
- Mobile improvements
  - Primarily, make the box for selecting a letter to guess bigger, make sure long words aren't unnecessarily split up into multiple lines (probably make overall text size smaller to help with both of these)
- [Access Control List](https://en.wikipedia.org/wiki/Access-control_list) to only let certain users add quotes
  - Add [badge](https://react-bootstrap.github.io/components/badge/) to preferred users, including app creator
- Play without logging in
- Validation of quotes (have to be above certain size, contain some # of different alphabetical letters)
- Validation of cipher (letters MUST change when encoded)
  - https://en.wikipedia.org/wiki/Derangement
  - https://stackoverflow.com/questions/25200220/generate-a-random-derangement-of-a-list
- Get a hint: get currently highlighted letter for free
- Track and show performance metrics (time to complete, hints used)
  - Compare performance metrics with other users
  - show overall performance metrics for a user
- Pagination for quotes (within each category- i.e. app, yours, others)
- Let users rate quotes 1-5

## Based on feedback/testing
The difficulty function is not very good. It clumps difficulties at the endpoints, when it should probably follow a normal distribution, clumping around 3.

Should prompt user to go back to browse on game completion

Move some of the logic (cipher setting) to backend? Depends what might want to stay on frontend in case I get to playing without signing in. If it's going to be part of Quote class, it can stay

Don't swap two guesses- if previously guessed, just replace with blank

## Deprioritized ideas
- Better difficulty setting
- Save partial progress on quotes (additional field for solved_quotes)
- Quote categories
