# Bowling Game

## Setup instructions

#### Dependancies

Run `npm install` to install all the necessary dependancies

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`

#### Running unit tests

Run `ng test` to execute the unit tests via Karma

## Logic and approach

### Services:
- scoring.service
  > ScoringService is responsible to calculate the score of the game

### Components:
- app.component
  > due to the simplicity of the project and the short time I've put all the logic (apart from the scoring) in the main component. It could be refactored into separate smaller components

## Missing due to lack of time

- decent css
- end of game handler
- error handler
- e2e tests

## Known bugs

- the last frame is not behaving as it should due to the fact that I didn't have time to handle the end of the game properly
