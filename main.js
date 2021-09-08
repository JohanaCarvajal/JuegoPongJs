
 //crear funcion anónima
(function(){
    //Creando clase, recibe por param largo y ancho del tablero
    self.Board = function (width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }
//modificar prototipo de la clase para colocar los metods  de la misma clase

    // metodo retorna barras y tableros
    self.Board.prototype = {
        get elements (){
            var elements = this.bars// Barras del juego que controlan al usuario
            elements.push (this.ball);
            return elements;
        }   
    }

})(); 


(function(){
    self.Bar = function (x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        //  Ingreso al board, luego al arreglo bars y le adiciono con push todo este objeto, esta barra
        this.board.bars.push(this);
        //dibujar las cosas
        this.kind = "rectangle";  
        this.speed = 10;
        
    }
    //moverlo
    self.Bar .prototype = {
        down: function (){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: " + this.x + "y: "+ this.y;
        }
    }

})();

(function(){
    self.BoardView =function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype = {
        //borra fillRect, lo va reiniciando
        clean: function(){
            this.ctx.clearRect(0,0,this.board.witdh,this.board.height) 
        },

        draw: function (){
            for (var i = this.board.elements.length -1; i >=0;i--){
                var el = this.board.elements[i];

                draw(this.ctx,el);
            };
        },
        play: function (){
            this.clean();
            this.draw();
        }
    }

    function draw (ctx,element){
        //hasOwnProperty Me dice si el objeto tiene una propiedad kind       
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect (element.x,element.y,element.width,element.height);
                    break;
                case "circle":
                    ctx.beginPath();
                    ctx.arc(element.x,element.y, element.radius,0,7);    
                    ctx.fill();
                    ctx.closePath();
                    break;
            
            
            
                }       


             
             
    }

})();

var board = new Board (800,400);   
var bar = new Bar (20,100,40,100,board);
var bar_2 = new Bar (700,100,40,100,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);
var ball =  new Ball (350,100,10,board);



document.addEventListener ("keydown",function (ev){
    ev.preventDefault();
    
    if (ev.KeyCode == 38) {
        bar.up ();
    }
    else if (ev.KeyCode== 40 ) {
        bar.down ();
    }else if (ev.KeyCode === 87) {
        //w
        bar_2.up();
    }else if (ev.KeyCode === 83) {
        //S
        bar_2.down();
    }
    console.log(""+bar_2);
});
//window.addEventListener("load",main);
//funcion que va a ejecutar todos los elementos

window.requestAnimationFrame(controller);
function controller (){
    board_view.play();    
    window.requestAnimationFrame(controller);
}