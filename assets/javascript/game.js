//============================================================================
// Name        : game.js
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This file contains javascript code to play the psychic game.
// Pseudocode  :
// 1. Declare the following variables:
// 1a var wins - initialize it to 0
// 1b var losses - initialize it to 0
// 1c var guessesCnt - initialize it to 0
// 1d var userGuess
// 1e var computerGuess
// 1f var html
// 1g var userGuessesArr
// 1h var maxGuesses - initialize it to 9
// 1i var computerChoices - the list containing all 26 letters
// 2. The letter between a and z is selected by the user.
// 3. The computer selects a random letter between a and z.
// 4. If the letter selected by the user equals to the letter randomly 
//    selected by the computer, add one to the wins variable, reset the 
//    maximum guesses count to 9 and display the results. The game is 
//    is restarted at this point.
// 5. If the letter selected by the user not equal to the leter randomly
//    selected by the computer, allow the user to continue to select another
//    letter. If after nine tries and the letter selected by the user still 
//    does not match, add one to the losses variable, reset the max guesses
//    count to 9 and display the results. The game is restarted at this 
//    point. Note: each time the letter incorrectly guessed by the user will 
//    be displayed on the screen.
//============================================================================

// Our array of possible computer choices.
var computerChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", 
    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Variables for tracking our wins, losses and guesses count. The wins and losses 
// variables begin at 0 and the guessesCnt begins at 9.
var wins = 0;
var losses = 0;
var userGuessesCnt = 0;
var userGuess;
var computerGuess;
var html;
var userGuessesArr = []; /*contains a list of guesses to check so that no 
                           duplicate guess is allowed*/
var userGuessesStr = "";
var maxGuesses = 9;

html = "<p>Guess what letter I'm thinking of.</p>" +
       "<p>wins: " + wins + "</p>" +
       "<p>losses: " + losses + "</p>" +
       "<p>Guesses left: " + maxGuesses + "</p>" +
       "<p>Your guesses so far:</p";

// Injecting the HTML we just created into our div and updating the game 
// information on our page.
document.querySelector("#game").innerHTML = html;

function seqSearch(list, searchItem)
{
    var found = "false";
    var loc = -1;
    var i;

    for (i = 0; i < list.length; i++)
    {
        if (searchItem === list[i])
        {
            found = "true";
            break;
        }
    }
    if (found === "true")
    {
        loc = i;
    }
    else
    {
        loc = -1;
    }

    return loc;
}

// When the user presses a key, it will run the following function...
document.onkeyup = function(event) 
{
    // Determine which key was pressed
    //userGuess = String.fromCharCode(event.key).toLowerCase();
    userGuess = event.key;
    userGuess = userGuess.toLowerCase();
    console.log("User guess: " + userGuess);

    // Sets the computerGuess variable equal to a random choice from the computerChoice array.
    computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
    console.log("Computer guess: " + computerGuess);

    //this is to make sure no duplicate guess is allowed.
    var loc = seqSearch(userGuessesArr, userGuess);
    console.log("Location: " + loc);

    if ((userGuess.match(/[a-z]/i)) && (userGuess !== "shift") && 
        (userGuess !== "control") && (userGuess !== "alt") &&
        (userGuess !== "meta") && (userGuess !== "enter") && 
        (userGuess !== "backspace") && (userGuess !== "escape") &&
        (userGuess !== "capslock") && (loc === -1))
    {
        userGuessesArr[userGuessesCnt] = userGuess;
        console.log("User Guesses Arr[" + userGuessesCnt + "]: " + userGuessesArr[userGuessesCnt]);

        if (userGuessesCnt === 0)
        {
            userGuessesStr = userGuess;
        }
        else
        {
            userGuessesStr = userGuessesStr + ", " + userGuess;
        }

        userGuessesCnt++;
                      
        if (userGuess === computerGuess)
        {
            maxGuesses = 9;
        
            wins++;
            userGuessesStr = "";
            userGuessesCnt = 0;
            userGuessesArr = [];
            // Here we create the HTML that will be injected into our div and displayed on the page.
            html = "<p>Guess what letter I'm thinking of.</p>" +
                   "<p>wins: " + wins + "</p>" +
                   "<p>losses: " + losses + "</p>" +
                   "<p>Guesses left: " + maxGuesses + "</p>" +
                   "<p>Your guesses so far: " + "</p";

            // Injecting the HTML we just created into our div and updating the game information on our page.
            document.querySelector("#game").innerHTML = html;
        }
        else
        {
            maxGuesses--;
            if (maxGuesses === 0)
            {
                losses++;
                maxGuesses = 9;
                userGuessesStr = "";
                userGuessesCnt = 0;
                userGuessesArr = [];
            }

            // Here we create the HTML that will be injected into our div and displayed on the page.
            html = "<p>Guess what letter I'm thinking of.</p>" +
                   "<p>wins: " + wins + "</p>" +
                   "<p>losses: " + losses + "</p>" +
                   "<p>Guesses left: " + maxGuesses + "</p>" +
                   "<p>Your guesses so far: " + userGuessesStr +"</p";

            // Injecting the HTML we just created into our div and updating the game information on our page.
            document.querySelector("#game").innerHTML = html;
        }                 
    }
};