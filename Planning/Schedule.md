# Getting Started

### Planning
1.  [x] Create User Stories
1.  [x] Create Wire Frames
1.  [x] Create ERD

### Set Up

API

1.  [x] [Set up Rails API Template](https://git.generalassemb.ly/ga-wdi-boston/rails-api-template)
1.  [x] Create a Github Repository
1.  [x] Deploy to Heroku

Client

1.  [x] [Set up React Auth Template](https://git.generalassemb.ly/ga-wdi-boston/react-auth-template)
1.  [x] Create a Github Repository
1.  [x] Deploy to Github Pages

### API
1.  [x] Create Quotes resource and end points
1.  [x] Test Quotes with curl scripts/postman
1.  [x] Add the Quote relationship to a User
1.  [x] Add User ownership of Quotes to resource controller
1.  [ ] Add Solved_quote resource and end points
1.  [ ] Test Solved_quotes with curl scripts/postman
1.  [ ] Add the Solved_quote relationship to a User
1.  [ ] Add the Solved_quote relationship to a Quote
1.  [ ] Add User ownership of Solved_quotes to resource controller
1.  [ ] Add Quote ownership of Solved_quotes to resource controller

### Client
1.  [x] Sign Up (curl/postman then web app)
1.  [x] Sign In (curl/postman then web app)
1.  [x] Change Password (curl/postman then web app)
1.  [x] Sign Out (curl/postman then web app)
1.  [ ] All API calls have success or failure messages
1.  [x] Create Quote (curl/postman then web app)
1.  [x] Get all Quotes (curl/postman then web app)
1.  [ ] Delete single owned Quote (curl/postman then web app)
1.  [x] Update single owned Quote (curl/postman then web app)
1.  [ ] Create a Solved_quote (curl/postman then web app)
   1.  [ ] Update state on letter guess
   1.  [ ] Check for solution after guess if no `null`s in currentGuess
1.  [ ] Get owned Solved_quotes (curl/postman then web app)

### MVP Final Touches
1.  [ ] README
1.  [ ] Solve view basic QOL
   1.  [ ] Guess a letter -> replace all other instances of that letter with that guess
   1.  [ ] Show feedback when all spaces are filled in
1.  [ ] Troubleshoot/Debug
1.  [ ] Style

### Improved solve view UX

1.  [ ] Show counts for each scrambled letter
1.  [ ] Swap logic for guessing a previously-guessed letter
1.  [ ] On guess, swap active input to the next (next available?) spot to allow for easy typing
1.  [ ] Show alphabet with currently guessed letters indicated
   1.  [ ] Make alphabet letters clickable
1.  [ ] Browse view has quotes categorized as default (i.e. provided by the app), created by User, and created by other Users

### Other stretch goals

TBD
