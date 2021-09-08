
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
        draw: function (){
            for (var i = this.board.elements.length -1; i >=0;i--){
                var el = this.board.elements[i];

                draw(this.ctx,el);
            }
        }
    }

    function draw (ctx,element){
        //hasOwnProperty Me dice si el objeto tiene una propiedad kind
        if (element !== null && element.hasOwnProperty ("kind")) {
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect (element.x,element.y,element.width,element.height);
                    break;
            }
            
        }
        
    }

})();
document.addEventListener ("keydown",function (ev){
    
    if (ev.keyCode == 38) {
        bar.up ();
    }
    else if (ev.keyCode== 40 ) {
        bar.down ();
    }
    console.log(""+bar);
});
window.addEventListener("load",main);

//funcion que va a ejecutar todos los elementos
function main (){
    var board = new Board (800,400);   
    var bar = new Bar (20,100,40,100,board);
    var bar = new Bar (700,100,40,100,board);
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas,board);
    console.log(board); 
    board_view.draw();
}