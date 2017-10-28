//node modules
var game = require('./game.js');
var word = require('./word.js');
var letter = require('./letter.js');
var inquirer = require('inquirer');

//function to prompt user to guess a letter
function guess(){
  console.log(newWord.print());
  inquirer.prompt([
  {
  name: 'letter',
  type: 'text',
  message: 'Enter a letter:',
  //validate that input is a SINGLE alphabetic character
  validate: function(str){
  var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
  if(regEx.test(str)){
    return true;
  } else {
    console.log('\nOops. You must guess a single letter.');
    return false;
  }
    }
  }
  ]).then(function(user){
    console.log('-----------------');
      var letter = user.letter;
      //check the letter
      newWord.checkLetter(letter);
      //log a response based on what the checkLetter method returns
      if (newWord.hasLetterBeenGuessed) {
        console.log('Oops! You already guessed that letter!');
        guess();
      } else {
        if(newWord.isComplete()){
          console.log('Yes! It was ' + newWord.chosenWord + '!');
          console.log('You win!');
          //if game is over ask the user if they want to play again
          playAgain();
        } else if (newWord.lives === 0) {
            console.log('Ah man, you are out of lives! Try again! The anser was ' + newWord.chosenWord);
            //if game is over ask the user if they want to play again
            playAgain();
        } else {
            //if the game is still going tell the user how many lives are left and prompt them to guess again
            console.log('You have ' + newWord.lives + ' lives left.');
            guess();
        }
      }
  });
}

//function to ask the user if they want to play again after win/loss
function playAgain(){
  inquirer.prompt([
    {
      type: 'list',
      message: 'Do you want to play again?',
      name: 'playAgain',
      choices: ['yes', 'no']
    }
  ]).then(function(user){
    var answer = user.playAgain;
    if (answer === 'yes') {
      game.userPrompt(function(){
        newWord = new word.Word(game.chosenWord);
        guess();
      });
    } else {
      console.log('Ok, thanks for playing!');
      return;
    }
  });
}
//starts the game by prompting a user to input an actor(game.js)
//creates a new Word using the constructor function from word.js
//starts the guess function which prompts the user to guess a letter
game.userPrompt(function(){
  newWord = new word.Word(game.chosenWord);
  guess();
});
