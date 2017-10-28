//constructor function for letters
function Letter(letter) {
	this.letter = letter;
	//if the chosen word contains a space show that space in the puzzle
	if (this.letter == ' ') {
		this.show = true;
  } else{
    this.show = false;
  }
}

//method to determine if a letter should be shown or a placeholder
Letter.prototype.printInfo = function() {
	if (this.show) {
		return this.letter + ' ';
	} else {
	  return '_ ';
	}
};

module.exports = {
	Letter
};
