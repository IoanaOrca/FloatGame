'use strict'
console.log('hey ya');

function Baloon() {
    var self=this;

    self.x = 0;
    self.y = 0;

    self.canvas = null;
    self.context = null;


    self.setupImage();

    self.baloonSize=0
}

Baloon.prototype.createCanvas = function(){
    var self=this;

    self.canvas = document.createElement("canvas");

    self.canvas.width = $('body').innerWidth();
    self.canvas.height = $('body').innerHeight();

    if (self.canvas.width<700) self.baloonSize=150;
        else if (self.canvas.width>1200) self.baloonSize=300;
            else self.baloonSize=210;

    self.x =Math.floor((self.canvas.width/2-self.baloonSize/2));
    self.y =Math.floor(self.canvas.height/6);

    self.context = self.canvas.getContext("2d");
    $( self.canvas).insertAfter( $( ".status" ) );


}

Baloon.prototype.setupImage = function () {
    var self=this;
    self.img = new Image();
    self.img.src = 'styles/placeholder-1.png';
    self.img.onload = function() { 
    }
}

Baloon.prototype.draw = function (){
    var self=this;
    
    self.context.drawImage(self.img, self.x, self.y, self.baloonSize, self.baloonSize); 
    self.context.fillStyle="#FF0000";
}

Baloon.prototype.clearCanvas = function () {
    var self=this;
    self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
}



