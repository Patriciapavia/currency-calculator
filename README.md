# Currency convert app

## Getting Started

This is a [React.js](https://reactjs.org/) app

- Navigate to the `caurrency-calculator` directory in your terminal
- Install the dependencies `npm install or yarn install`
- Start the application `npm run start or yarn start`

  Open [http://localhost:3000](http://localhost:3000) with your browser, and you should see the home page.

This project included cypress testing to run the test please run command `./node_modules/.bin/cypress open`

# Tech stack

This project using react, redux, axios, tailwind css.

# Shortcuts, simplifying assumptions, known bugs, etc.

- Currently fixed params get set to default as sell, client doesn't have option to select between sell or buy.
- Some country on the list doesn't have a value for currency exchange instead of display empty value should handle better with proper message.
- Only included end to end testing doesn't included unit test as I don't have much experience about unit test, I try to find a resource but doesn't have enough example that match for what I try to test It doesn't work very well so I decided to only included cypress test in this project
