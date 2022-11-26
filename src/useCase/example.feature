Feature: Guesser

  Scenario: Guessing correctly
    Given the Guesser was assigned the word "silky" 
    When a correct guess is made for "silky"
    Then the Guesser should update the number of correct guesses to 1 