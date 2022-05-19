# Github Repository Search

This project was made using [Github API](https://docs.github.com/en/rest) with unanthenticated calls, so the limit is 30 calls per minute.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## How to use the app

This app searches for repositories in the Github by the input query in the name, the description, or the README. It returns a table with the languages used in the found projects in descending order. The table does not show respositores with empty languages. In the end of the table you will find also the total of the repositories found with the searched terms.
