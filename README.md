# Cryptoquotes
## About
This is a full-stack web application where users can solve [cryptograms](https://en.wikipedia.org/wiki/Cryptogram). Each cryptogram is a quote with quote text and an author- unlike many similar apps, here the author name is also encoded. Users are shown the scrambled text of the quote and author, with each letter in the scrambled version corresponding to a single letter from the original version (i.e. every time a 'T' is shown in the scrambled text, there is an 'A' in the original text). Users input their guesses for what the real letter is until their guess matches the original quote and author. When a quote is solved, it will be marked as complete for that user.

Users can also create, edit, and delete their own quotes for other users to solve. When creating a quote, users are asked to provide the quote text, an author, and a title that will be displayed in the browse view for other users. A title can be anything, though it is encouraged to have it relate to the quote's content in some way. Once a new quote is created, it will be given an algorithmically-generated difficulty and a cipher (a scrambled version of the alphabet for encoding the quote), and will be available for other users to solve.

Also see: the [API Repository](https://github.com/JakeSeib/cryptoquotes-api) and the [deployed client](https://jakeseib.github.io/cryptoquotes-client/).

### How to Play
To play, sign in and use the dropdown in the top nav bar (or the link on the splash page) to go to 'browse quotes'. You will see a list of quotes showing their titles- if you have previously solved any quotes, they will be displayed as solved and you will not be able to click them. Find a quote that you did not create (navigating to a quote you created will prompt you to edit your quote, since solving quotes you added is not very interesting) and click it.

Once you have selected a quote, input a guess by clicking the space where you want to guess on the quote or author text shown. You will see highlighted the spaces where that letter occurs in the quote & author text. Then either type the letter you want to guess or click the desired letter in the box below the quote. Continue until you decode the entire quote.

![Screenshot of an unsolved cryptogram](https://i.imgur.com/zBrgitT.png)

### Technologies Used
-   **Ruby on Rails**: Backend RESTful API
-   **PostgreSQL**: Database
-   **Javascript**: Frontend
-   **React**: View rendering, event handling, and DOM manipulation
-   **axios**: API calls for user authentication as well as CRUDing quotes/solved_quotes
-   **Heroku**: API deployment/hosting
-   **npm**: Frontend deployment to Github pages
-   **GitHub**: Version control

## Set Up
### Dependencies
-   [react-auth-template](https://git.generalassemb.ly/ga-wdi-boston/react-auth-template)

### Run development server
```
// install dependencies
npm install
// launch development server
npm start
```

## Planning and Improvements
### Development Process
Work on the app took place over the course of 4 days. The schedule in [Planning](https://github.com/JakeSeib/cryptoquotes-client/tree/master/Planning) mostly documents the course of development leading to MVP, although it was not followed in exactly the order that it was layed out (and was never intended to be). Some stretch goals proved easy enough to incorporate as other work was being done that they were added as other work was going along.

The two major challenges in the development of this app were:
1. Generating ciphers and difficulties for text when posting to the API
2. Handling user input when solving a cryptogram

Regarding 1, a simple way of creating a cipher was used, whereby each letter in the alphabet was randomly assigned an index from 0 to 25, and were then arranged in that order. The initial difficulty algorithm looked at a quote's overall length as well as the number of unique alphabetical characters it contained, and used those to give it a difficulty rating. The actual ratings assigned to a quote were determined in a somewhat subjective (but functional) manner, by taking a quote that was judged to be fairly easy and pinning its difficulty rating to 1, and a fairly difficuly quote and pinning its difficulty rating to 5, then using some simple algebra to create a linear function with evenly-spaced breakpoints to assign scores for ratings of 2, 3, and 4.

Regarding 2, about half of the development time leading to MVP was spent on the view and event handling for solving a cryptogram, which had several challenges.

The largest of these was the need for well-designed event handling to ensure that the app could distinguish between an encrypted letter and a user's guess for a letter, even if those two letters were the same. For example, if an encrypted word was 'BUUIS' and a user guessed that the letter 'U' corresponded to the letter 'B', the app had to know the difference between the first 'B' and the second 'B' when doing further updates or checking for a solution.

While there were several possible solutions to this, my initial one was to use the convention that encoded letters were uppercased, while user's guesses were lowercased. While potentially a little unintuitive, it worked to maintain consistency in the component's state without any additional overhead.

Basic templates for both the client and express API were provided by General Assembly. See [LICENSE](https://github.com/JakeSeib/cryptoquotes-client/blob/master/LICENSE) for legal information on use of this template.

### Further documentation
For more details on the app, as well as documentation on planning, see the [Planning directory](https://github.com/JakeSeib/cryptoquotes-client/tree/master/Planning), which includes wireframes, an ERD, and user stories used in planning.

### How could this be improved?
See: [Planning/Stretch-goals.md](https://github.com/JakeSeib/cryptoquotes-client/blob/master/Planning/Stretch-goals.md)
