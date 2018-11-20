(function (){
  var
     canv = document.getElementById("myCanvas"),
     ctx = canv.getContext("2d"),

     w = canv.width  = window.innerWidth,
     h = canv.height = window.innerHeight,

     options = {
       particlesAmount: 15,

       backgroundColor: "#222",
       particleColor: "yellow",
       defaultRadius: 3,
       addedRadius: 2,

       comunicationRadius: 170,
       lineWidth:1,
       lineColor: "rgba(255, 255, 255, opacity)",


       defaultSpeed: 1,
       addedSpeed: 3
     },

     particles = [],
     Particle = function(posX,posY){
       this.x = posX ? posX : Math.random()*w;
       this.y = posY ? posY : Math.random()*h

       this.speed = options.defaultSpeed + Math.random()*options.addedSpeed;
       this.directionAngle = Math.floor(Math.random()*360);
       this.color = options.particleColor;
       this.radius = options.defaultRadius + Math.random()*options.addedRadius;
       this.d = {
         x: Math.cos(this.directionAngle)*this.speed,
         y: Math.sin(this.directionAngle)*this.speed
       };

       this.update = function(){
         this.border();
         this.x += this.d.x;
         this.y += this.d.y;
       };

       this.border = function(){
         if(this.x >= w || this.x <= 0){
           this.d.x *= -1;
         };
         if(this.y >= h || this.y <= 0){
           this.d.y *= -1;
         };

         this.x > w ? this.x = w : this.x;
         this.y > h ? this.y = h : this.y;
         this.x < 0 ? this.x = 0 : this.x;
         this.y < 0 ? this.y = 0 : this.y;

       };

       this.draw = function(){
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
         ctx.closePath();
         ctx.fillStyle = this.color;
         ctx.fill();

       };


     },

     checkDistance = function(x1,y1,x2,y2){
       return Math.sqrt( Math.pow(x2-x1, 2) + Math.pow(y2-y2, 2));
     },

     comunicatePoints = function(point1, otherPoints){
       for(var i = 0; i < otherPoints.length; i++){
         var distance = checkDistance(point1.x, point1.y, otherPoints[i].x, otherPoints[i].y)
         var opacity = 1 - distance/options.comunicationRadius;
         if(opacity > 0){
           ctx.lineWidth = options.lineWidth;
           ctx.strokeStyle = options.lineColor.replace("opacity", opacity);
           ctx.beginPath();
           ctx.moveTo(point1.x, point1.y);
           ctx.lineTo(otherPoints[i].x, otherPoints[i].y)
           ctx.closePath();
           ctx.stroke();
         }
       }
     }



// Code ===================================================================


 window.addEventListener("resize", function(){
   w = canv.width  = window.innerWidth;
   h = canv.height = window.innerHeight;
 })
 canv.addEventListener("click", function(e){
   particles.push( new Particle(e.pageX, e.pageY))
 })
 canv.addEventListener("contextmenu", function(e){
   e.preventDefault();
   particles.splice(particles.length -1,1);
 })



  setup();





















// functions
  function setup(){
    for(var i = 0; i < options.particlesAmount; i++){
      particles.push( new Particle() );
    }
    console.log(particles);
    window.requestAnimationFrame(loop);
  }

  function loop(){
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0,0,w,h);

    for(var i = 0; i < particles.length; i++){
      particles[i].update();
      particles[i].draw();
    }
    for(var a = 0; a < particles.length; a++){
      comunicatePoints(particles[a], particles);
    }

    window.requestAnimationFrame(loop);
  }
})();
