//node modules
var mdb = require('moviedb')('b976f19297226718991e3cd72bd00c36');
var inquirer = require('inquirer');

//prompts the user to input the name of an actor to choose a movies
function userPrompt(cb){
  inquirer.prompt([
    {
      type: 'input',
      message: 'Type in the name of an actor to choose your category.',
      name: 'actor'
    }
  ]).then(function(user){
    var actor = user.actor;
    //calls the function getActorID which takes user inputted actor name as an argument and gets that actors TMDB ID
    getActorId(actor, function(actorID){
      //callback function takes actor's TMDB ID as an argument and gets movies that actor has starred in
      getMovies(actorID, function(){
        //run a callback after getting a movie (movie is set as chosenWord)
        cb();
      });
    });
  });
}

//function to get actor's (inputted by user) TMDB ID
function getActorId(actor, cb){
  mdb.searchPerson({query: actor }, function(err, res){
    if (err) {
      console.log('Oops! An error has occured.');
      return;
    }
    if (res.results.length > 0) {
      var actorID = res.results[0].id;
      cb(actorID);
    } else {
      console.log('Sorry, we couldn\'t find that actor. Try again.');
    }
  });
}

//function to get movies that the actor has starred in
function getMovies(actorID, cb){
  var moviesArr = [];
  mdb.discoverMovie({with_cast: actorID }, function(err, res){
    if (err) {
      console.log('Oops! An error has occured.');
      return;
    }
    var results = res.results;
    for (var i = 0; i < results.length; i++) {
      var title = results[i].title;
      //exclude movie titles that contain any numbers or special characters
      if (/^[a-zA-Z ]*$/g.test(title)) {
        moviesArr.push(title);
      }
    }
    //choose a random movie from the moviesArr
    var randomNumber = Math.floor(Math.random()*moviesArr.length);
    randomNumber -= 1;
    var chosenWord = moviesArr[randomNumber];
    module.exports.chosenWord = chosenWord;
    cb();
  });
}

module.exports = {
  userPrompt
};
