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
    self.time = 10;
    self.score = 0;
    self.lives = 3;
    self.progress = 0;

    //button options elements
    self.upWord = null;
    self.downWord = null;

    //arrays of information elements
    self.words = ['brief','tiny','opposed','influence','confuzing','guilty','disaster','praise','wealthy','expand','dull','horrible','split','acuse','constructive','pollution','undermine'];
    self.synonims = ['of short duration','small','against','affect','puzzling','blameworthy','tragedy','applaud','rich','grow','uninteresting','awfull','divide','blame','productive','contaminant','weaken'];
    self.antonyms = ['prolonged','large','in favor off','block','clear','innocent','miracle','condemn','poor','compress','exciting','wonderfull','release','aquit','unproductive','cleanliness','reinforce'];
    
    self.gameOn = false;

    self.baloon = new Baloon();
    self.altitude=1;

    self.float=false;
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
                <span class="value">0</span></p>
        </div>
        <div class="test">
            <h1 class="word">Word</h1>
            <button class="upWord">Synonym</button>
            <button class="downWord">Antonym</button>
        </div>
        </div>`;

    
     //create the game state
    self.parentElement.html(self.gameScreenElement);
    self.gameOn =true;

}

Game.prototype.start = function () {
    var self=this;
    self.baloon.createCanvas();
  
//    self.baloon.draw();
//    self.float=true;
  
   self.moveDownBaloon();

    self.nextTurn();
    
}

Game.prototype.onEnded = function(cb) {
    var self = this;
    self.callback = cb;
}

//MAIN GAME
Game.prototype.nextTurn = function() {
    var self=this;
     
    //check lives, progress
    if (!self.checkContinuity()) {
        return;
    }

    //progress time for a turn
    self.time=5;
    self.altitude=1;

    //push the initial vallues of the status to the browser
    $('.score .value').html(self.score);
    $('.time .value').html(self.time);
    $('.lives .value').html(self.lives);
    $('.progress .value').html(self.progress+"%");

    //get a random index and store it - choosing the words
    self.getRandomIndex();

    //random the choice between the answer options
    self.getRandonOrderForAnswers(); 
    
    //change color of the pushed button back to normal
    $('canvas').css('background-color','rgba(233, 72, 88, 0)');
    $('.test button').css('background-color','rgba(223, 228, 224, 0.7)');

    //push the values on the screen
    $('.test .word').html(self.words[self.randomIndex]);
    
    //add event listener for the button push
    $('.test .upWord').html(self.upWord);
    $('.test .downWord').html(self.downWord);

    //start the interval for the timer
    self.intervalID = setInterval(checkTime, 1000);

    //the actual function of starting the interval for the timer
    function checkTime() {
        self.time--;
        $('.time .value').html(self.time);
        if (self.time<=0) {
            clearInterval(self.intervalID);
            self.progress+=10;
            self.lives--;
            $('canvas').css('background-color','rgba(233, 72, 88, 0.1)');
            self.nextTurn();
        }
    }

    //call function for click event up
    self.handleUpClick = function () {
        self.checkAnswer(self.upWord,'upWord');
        $('.test .upWord').off('click',self.handleUpClick);
        $('.test .downWord').off('click',self.handleDownClick);
        clearInterval(self.intervalID);
        setTimeout(function() { self.nextTurn(); }, 300);
    }

    //call function for click event up
    self.handleDownClick = function () {
        self.checkAnswer(self.downWord,'downWord');
        $('.test .upWord').off('click',self.handleUpClick);
        $('.test .downWord').off('click',self.handleDownClick);
        clearInterval(self.intervalID);
        setTimeout(function() { self.nextTurn(); }, 300);
    }

    //handle click events
    $('.test .upWord').on('click',self.handleUpClick);
    $('.test .downWord').on('click',self.handleDownClick);

}

Game.prototype.moveDownBaloon = function (){
    var self=this;

    self.baloon.clearCanvas();
    self.baloon.y+=self.altitude;
    if(self.baloon.y<Math.floor(self.baloon.canvas.height/9)) self.altitude=1;
    
    self.baloon.draw();
    
        requestAnimationFrame(function(){
            self.moveDownBaloon();
        });
    
        
}

Game.prototype.getRandonOrderForAnswers = function() {
    var self=this;
    var zeroOrOne=Math.round(Math.random());

    if (zeroOrOne===0) {
        self.upWord=self.synonims[self.randomIndex];
        self.downWord=self.antonyms[self.randomIndex];
    } else {
        self.upWord=self.antonyms[self.randomIndex];
        self.downWord=self.synonims[self.randomIndex];
    }
}

Game.prototype.checkContinuity = function (){
    var self=this;
    if ((self.lives<=0)||(self.progress===100)){
        self.gameOn=false;
        clearInterval(self.intervalID);
        self.callback();
        return false;
    }
    return true;
}

Game.prototype.checkAnswer = function (guess,which){
    var self=this;
    if (guess===self.synonims[self.randomIndex]) {
        $('.'+which).css('background-color','rgba(130, 191, 111, 0.7)');
        self.progress+=10;
        self.score+=400;
        self.altitude=-10;
        return true;
    } else {
        $('.'+which).css('background-color','rgba(233, 72, 88, 0.7)');
        self.lives--;
        $('canvas').css('background-color','rgba(233, 72, 88, 0.1)');
        self.progress+=10;
        self.altitude=2;
        return false;
    }
}

Game.prototype.destroy = function () {
    var self=this;

    self.parentElement.html('');
}

Game.prototype.getRandomIndex = function () {
    var self=this;
    var newIndex=Math.floor(Math.random()*self.words.length);

    while (self.pastIndexes.includes(newIndex)){
        newIndex=Math.floor(Math.random()*self.words.length);
    }

    self.randomIndex=newIndex;
    self.pastIndexes.push(newIndex);

}
