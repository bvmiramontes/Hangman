//require letter JS (constructor function for letters)
var Letter = require('./letter.js');

//constructor function to create a new hangman word
var Word = function(chosenWord){
  this.lives = 7;
  this.chosenWord = chosenWord;
  this.letters = [];
  this.allGuesses = [];
  //uses the letter constructor function from letter.js to push new letter objects into this.letters array
  for (var i = 0; i < this.chosenWord.length; i++) {
    this.letters.push(new Letter.Letter(this.chosenWord[i]));
  }
};

//method to check the guessed letter (user input) against letters in the chosen Word
Word.prototype.checkLetter = function(letter){
  this.incorrect = true;
  this.hasLetterBeenGuessed = false;
	var letter = letter.toLowerCase();
  //checks to make sure letter has not been guessed already
  if (this.allGuesses.indexOf(letter) != -1) {
    this.hasLetterBeenGuessed = true;
  } else {
    this.allGuesses.push(letter);
    for(var i = 0; i < this.letters.length; i++){
      //if the letter is correct set the letter's property show = true
      if(this.letters[i].letter.toLowerCase() == letter){
      this.incorrect = false;
      this.letters[i].show = true;
      }
    }
    //if the letter is incorrect subtract a life
    if (this.incorrect) {
      this.lives--;
    }
  }
};
//method to check if the user has guessed all of the letters correctly
Word.prototype.isComplete = function(){
	for(var i = 0; i < this.letters.length; i++){
    //if any letter's property show = false then return false
		if(!this.letters[i].show){
      return false;
    }
	}
	return true;
};

//method to print the word to the console (may contain letters or placeholders)
Word.prototype.print = function(){
  var output = "";
  //uses the Letter.printInfo method from letter.js to determine if character should be letter or placeholder
  for(var i=0; i<this.letters.length; i++){
    output += this.letters[i].printInfo();
  }
  return output;
};

module.exports = {
  Word
};
