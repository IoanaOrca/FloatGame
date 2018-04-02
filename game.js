'use strict'

function Game (parentElement) {
    var self=this;
    
    // html elements
    self.parentElement = parentElement;
    self.gameScreenElement = null;
    
    //word elements
    self.randomIndex = null;
    self.pastIndexes = [];

    //status elements
    self.time = null;
    self.score = null;
    self.lives = null;
    self.progress = null;

    //button options elements
    self.upWord = null;
    self.downWord = null;

    //arrays of information elements
    self.words = ['brief','tiny','opposed','influence','confuzing','guilty','disaster','praise','wealthy','expand','dull','horrible'];
    self.synonims = ['of short duration','small','against','affect','puzzling','blameworthy','tragedy','applaud','rich','grow','uninteresting','awfull'];
    self.antonyms = ['prolonged','large','in favor off','block','clear','innocent','miracle','condemn','poor','compress','exciting','wonderfull'];
    
}

Game.prototype.build = function () {
    var self=this;
    self.gameScreenElement = `<div class="game"> 
        <div class="status">
            <p class="score">
                <span>Score</span> 
                <span class="value">0</span></p>
            <p class="time">
                <span>Time</span> 
                <span class="value">0</span></p>
            <p class="lives">
                <span>Lives</span> 
                <span class="value">3</span></p>
            <p class="progress">
                <span>Progress</span> 
                <span class="value">0</span>%</p>
        </div>
        <img class="baloon" src="styles/hot-air-balloon-svgrepo-com.svg">
        <div class="test">
            <h1 class="word">Word</h1>
            <button class="upWord">Synonym</button>
            <button class="downWord">Antonym</button>
        </div>
        </div>`;

    
        //create the game state
    self.parentElement.html(self.gameScreenElement);
    
    //get the current vallue from the browser
    self.time = $('.time .value').html();
    self.score = $('.score .value').val();
    self.lives = $('.lives .value').html();
    self.progress = $('.progress .value').html();

  }

Game.prototype.start = function () {
    var self=this;
    self.nextTurn();
}

Game.prototype.nextTurn = function() {
    var self=this;
    
    //get a random index and store it
    self.getRandomIndex();
    
    // self.randomIndex=Math.floor(Math.random()*self.words.length)
    // self.pastIndexes.push(self.randomIndex);

    //random the choice between the buttons
    
    var random=Math.round(Math.random());
    if (random===0) {
        self.upWord=self.synonims[self.randomIndex];
        self.downWord=self.antonyms[self.randomIndex];
    } else {
        self.upWord=self.antonyms[self.randomIndex];
        self.downWord=self.synonims[self.randomIndex];
    }

    //push the values on the screen
    $('.test .word').html(self.words[self.randomIndex]);
        
    $('.test .upWord').html(self.upWord);
    $('.test .downWord').html(self.downWord);

    //call function for click event
    self.handleUpClick = function () {
        console.log(self.upWord);
        self.checkAnswer(self.upWord);
    }
    self.handleDownClick = function () {
        console.log(self.downWord);
        self.checkAnswer(self.downWord);
    }

    //handle click events
    $('.test .upWord').on('click',self.handleUpClick);
    $('.test .downWord').on('click',self.handleDownClick);

    //print update status
    $('.score .value').html(self.score);
    $('.lives .value').html(self.lives);
    $('.progress .value').html(self.progress);    

    //get another index
    // self.getRandomIndex();
    
}

Game.prototype.checkAnswer = function (guess){
    var self=this;
    console.log(guess);
    console.log(self.synonims[self.randomIndex]);
    if (guess===self.synonims[self.randomIndex]) {
        self.nextTurn();
        self.progress++;
        self.score+=400*1;
        console.log(self.score);
    }else {
        self.lives--;
        // self.checkContinuity();
        // self.nextTurn();
    }
}


// Game.prototype.correct = function () {

// }

// Game.prototype.wrong = function () {
    
// }

// Game.prototype.tooSlow = function () {
    
// }

Game.prototype.destroy = function () {
    var self=this;

    self.parentElement.html('');
}

Game.prototype.getRandomIndex = function () {
    var self=this;
    var newIndex=Math.floor(Math.random()*self.words.length);

        while (self.pastIndexes.includes(newIndex)){
            newIndex=Math.floor(Math.random()*b.length);
            }
        self.randomIndex=newIndex;
        self.pastIndexes.push(newIndex);

}
