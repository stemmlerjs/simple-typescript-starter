
import { Guesser } from './example'

import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';

const feature = loadFeature(path.join(__dirname, './example.feature'));

defineFeature(feature, test => {
  test('Guessing correctly', ({ given, when, then }) => {
    let guesser = new Guesser();

    given(/^the Guesser was assigned the word "(.*)"$/, (arg0) => {
      guesser.setWord(arg0);
    });

    when(/^a correct guess is made for "(.*)"$/, (arg0) => {
      guesser.guessWord(arg0)
    });

    then(/^the Guesser should update the number of correct guesses to (\d+)$/, (arg0) => {
      expect(guesser.getNumberCorrectGuesses()).toEqual(Number(arg0));
    });
  });
});

