# Chaoggle

Boggle with a wildcard.  Play Chaoggle at [skolsuper.github.io/boggle](https://skolsuper.github.io/boggle), or click "Solve" to let the computer do it

### Prerequisites

git, NodeJS

```bash
brew install node
```
or...
```bash
nvm install node --lts
```

### Installing

Clone the project, then install dependencies with npm 
```bash
npm install
```

Start a dev server with npm serve.  This compiles typescript and JSX to vanilla JS, browserifies the result, and starts a web server for the local directory

```bash
npm run dev
open http://127.0.0.1:3000
```

Play Chaoggle!

## Running the tests

```
npm test
```


### And coding style tests

Run tslint to check style

```
npm run lint
```

## Deployment

The site is hosted on Heroku.  To deploy, update bundle.js and push to master:

```bash
npm run build
git push heroku master
```

## Built With

* React
* Redux
* Typescript
* Browserify
* Github pages

## Acknowledgments

* I used the npm package [`leven`](https://www.npmjs.com/package/leven) to calculate Levenshtein distances

