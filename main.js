'use strict'

function main() {
  var game;
  var mainContentElement = $('#main-content');

  // -- SPLASH STATE

  var splashScreenElement;
  var startButtonElement;

  function handleStartClick() {
    destroySplashScreen();
    buildGameScreen();
  }

  function buildSplashScreen() {
      
    splashScreenElement = `<div class="splash">
    <h1 class="title">FLOAT GAME</h1>
    <p class="description">Master new words and expand your vocabulary!</p>
    <button class="btn-play">PLAY GAME</button>
    <div class="instructions">
        <p>INSTRUCTIONS: Tap the matching word to keep the baloon floating!</p>
    </div>
    </div>`;
    mainContentElement.html(splashScreenElement);
    startButtonElement = $('button').on('click', handleStartClick);
  }

  function destroySplashScreen() {
    mainContentElement.html('');
    startButtonElement.off('click', handleStartClick);
  }


  // -- GAME STATE


  function gameEnded() {
    destroyGameScreen();
    buildGameOverScreen();
  }

  function buildGameScreen() {
    // mainContentElement.html('');
    game = new Game(mainContentElement);
    game.build();
    game.start();
    
    game.onEnded(function () {
      gameEnded();
    });
  }
  
  function destroyGameScreen() {
    game.destroy();
  }

  // -- GAME OVER STATE

  var gameOverScreenElement;
  var restartGameButtonElement;

  function handleRestartClick() {
    destroyGameOverScreen();
    buildGameScreen();
  }

  function buildGameOverScreen() {
    gameOverScreenElement = ` <div class="game-over">
    <h1>GOOD GAME</h1>
    <p>Your score: <span class="score">0<span></p>
    <button>Try Again!</button>
    </div>`;
    mainContentElement.html(gameOverScreenElement);

    if (game.lives>0) $('.game-over h1').html('YOU WON');
    $('.game-over .score').html(game.score);
    console.log(game.score);
    restartGameButtonElement = $('button');
    restartGameButtonElement.on('click', handleRestartClick);
  }


  function destroyGameOverScreen() {
    $('.canvas').css('background-color','rgba(233, 72, 88, 0)');
    mainContentElement.html('');
    restartGameButtonElement.off('click', handleRestartClick);
  }

  // -- start the app

  buildSplashScreen();
}

$(document).ready(main);
