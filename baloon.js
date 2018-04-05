'use strict'


function Baloon() {
    var self=this;

    self.x = 0;
    
    self.y = 0;

    self.canvas = null;
    self.context = null;


    self.setupImage();
}

Baloon.prototype.createCanvas = function(){
    var self=this;

    self.canvas = document.createElement("canvas");
    self.canvas.width = $('body').innerWidth();
    self.x =Math.floor(self.canvas.width/2)-25;
    self.canvas.height = $('body').innerHeight();
    self.y =Math.floor(self.canvas.height/20);9
    self.context = self.canvas.getContext("2d");
    $( self.canvas).insertAfter( $( ".status" ) );

    // self.moveDown();
}

Baloon.prototype.setupImage = function () {
    var self=this;
    self.img = new Image();
    self.img.src = 'styles/hot-air-balloon-svgrepo-com.svg';
    self.img.onload = function() { 
    //    self.createCanvas();
    }
}

Baloon.prototype.draw = function (){
    var self=this;
    self.context.drawImage(self.img, self.x, self.y, 50, 50); 
}

Baloon.prototype.clearCanvas = function () {
    var self=this;
    self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
}

Baloon.prototype.moveDown = function (){
    var self=this;

    self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
    self.y+=1;

    
}

