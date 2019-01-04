var chess = {
  	board: document.getElementById('chessBoard'),
  	imagePath: 'chess/',
  	horizontalLetters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  	verticalNumbers: ['8', '7', '6', '5', '4', '3', '2', '1'],
	blackFigures: [
      	'black-rook',
      	'black-knight',
    	'black-bishop',
      	'black-king',
      	'black-queen',
        'black-bishop',
      	'black-knight',
        'black-rook',
      	'black-pawn',
    ],
  	whiteFigures: [
      	'white-rook',
      	'white-knight',
    	'white-bishop',
    	'white-king',
      	'white-queen',
        'white-bishop',
      	'white-knight',
      	'white-rook',
      	'white-pawn',
    ],
  
  	// initialize methods
  	initBoard: function() {
      	var classes = ['odd','even'];
      	var element;
      	var vK = 8;
      	var hK = 8;
        
      	for (let i = 0; i < 64; i++) {
          	if (i % 8 == 0) {
              	vK--;
              	hK = 8;
            	classes.reverse();
            }
        	
          	element = document.createElement('span');
          
          	if (i % 2 == 0) { 
          		element.setAttribute('class', classes[0]);
            } else {
            	element.setAttribute('class', classes[1]);
            }
          
          	element.setAttribute('data-h-id', 8 - hK);
          	element.setAttribute('data-v-id', vK+1);
            element.setAttribute('data-id', (8-hK) + (vK)*8 + 1);
            element.setAttribute('id', this.horizontalLetters[8-hK] + this.verticalNumbers[7-vK]);
          	this.board.appendChild(element);
          	hK--;
        }
    },
  	initFigures: function() {
        for(i=1;i<9;i++){
        var position = 64 -i;
      	var figureName     = this.whiteFigures[i-1%9];
      	var figureElement = document.createElement('img');
      	figureElement.setAttribute('src', this.imagePath + "/" + figureName + '.png');
      	this.board.children[position].appendChild(figureElement);
        figureElement.setAttribute('class', figureName + ' draggable');
      	this.checkHorseSteps(figureElement, this.board.children[position]);
        }
        for(i=57;i<65;i++){
        var position = 64 -i;
      	var figureName     = this.blackFigures[(i-1)%8];
      	var figureElement = document.createElement('img');
      	figureElement.setAttribute('src', this.imagePath + "/" + figureName + '.png');
      	this.board.children[position].appendChild(figureElement);
        figureElement.setAttribute('class', figureName + ' draggable');
      	this.checkHorseSteps(figureElement, this.board.children[position]);
        }
        for(i=49;i<57;i++){
        var position = 64 -i;
      	var figureName     = this.blackFigures[8];
      	var figureElement = document.createElement('img');
      	figureElement.setAttribute('src', this.imagePath + "/" + figureName + '.png');
      	this.board.children[position].appendChild(figureElement);
        figureElement.setAttribute('class', figureName + ' draggable');
      	this.checkHorseSteps(figureElement, this.board.children[position]);
        }
        for(i=9;i<17;i++){
        var position = 64 -i;
      	var figureName     = this.whiteFigures[8];
      	var figureElement = document.createElement('img');
      	figureElement.setAttribute('src', this.imagePath + "/" + figureName + '.png');
      	this.board.children[position].appendChild(figureElement);
        figureElement.setAttribute('class', figureName + ' draggable');
      	this.checkHorseSteps(figureElement, this.board.children[position]);
        }
    }, // homework
  
  	// bootstrap
	init: function() {
    	this.initBoard();
    	this.initFigures();
    },
  
  	// horse functionality
  	checkHorseSteps: function(figure, positionElement) {
    	var steps = [
        	[1, 2], 
          	[2, 1],
        ];
      
        for (var j = 0; j < steps.length; j++) {
			var hS = steps[j][0];
          	var vS = steps[j][1]; 
        }
      
      	//var positionIndex = positionElement.getAttribute('data-id');
      	//var topRightIndex = positionIndex + 1 - 16;
      	//var topLeftIndex   = positionIndex - 1 - 16;
      	//var leftTopIndex    = positionIndex - 2 - 8;
      	//var rightTopIndex  = positionIndex + 2 - 8;
    }
};
var helper;
var container;
chess.init();
$('.draggable').draggable({
    cursorAt: { left: 30, top: 30 },
    start: function(){
        helper = $( ".poop" ).draggable( "widget" );;
    },
    stop: function(){
        for(i=1;i<65;i++){
            if($('[data-id='+i+']').offset().left < $(helper).offset().left && ($('[data-id='+i+']').offset().left +60 > $(helper).offset().left  ) && $('[data-id='+i+']').offset().top < $(helper).offset().top && ($('[data-id='+i+']').offset().top +60 > $(helper).offset().top  )){
                console.log($('[data-id='+i+']')[0],$('[data-id='+i+']').offset().left);
                container = $('[data-id='+i+']')[0];
                $(container).children('img').detach();
            }
        }
        helper.detach();
        console.log(helper[0]);
        console.log($(helper).offset().left)
        container.appendChild(helper[0]);
        $(helper).css({'position':'relative','left': '0', 'top': '0'});
        
    }
});
$('img').mousedown(function(){
               $(this).addClass('poop');
               });
$('img').mouseup(function(){
    $(this).removeClass('poop');
})
