var columns = document.querySelectorAll('.card');
var draggingClass = 'dragging';
var dragSource;
var addRowBtn = document.querySelector('#addRowBtn');
addRowBtn.addEventListener('click',addRow,false);


Array.prototype.forEach.call(columns, function (col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false)
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
  col.addEventListener('dragend', handleDragEnd, false);
});
function addRow(){
 // console.log(lastElement)
  const lastRow = document.createElement("tr");
  lastRow.classList.add('columns')
  let blocks = []
  let cards = []
  for(let i = 0; i <3; i++){
    blocks[i] = document.createElement('td');
    blocks[i].classList.add('block')
    cards[i] = document.createElement('div');
    cards[i].classList.add('card');
    var lastElement = getLastChild();
    if(i == 0){
      cards[i].innerHTML = lastElement;  
    }else{
      cards[i].innerHTML =Number(cards[i-1].innerHTML)+100 
    }
   
    cards[i].style.backgroundColor = getRandomColor();
   
    blocks[i].appendChild(cards[i]);
    lastRow.appendChild(blocks[i]);
    cards[i].setAttribute("draggable","true")
    cards[i].addEventListener('dragstart', handleDragStart, false);
    cards[i].addEventListener('dragenter', handleDragEnter, false)
    cards[i].addEventListener('dragover', handleDragOver, false);
    cards[i].addEventListener('dragleave', handleDragLeave, false);
    cards[i].addEventListener('drop', handleDrop, false);
    cards[i].addEventListener('dragend', handleDragEnd, false);
  }
 
  
  document.querySelector('#table1').appendChild(lastRow);


}
function handleDragStart (evt) {
  dragSource = this;
  evt.target.classList.add(draggingClass);
  evt.dataTransfer.effectAllowed = 'move';
}

function handleDragOver (evt) {
  evt.dataTransfer.dropEffect = 'move';
  evt.preventDefault();
}

function handleDragEnter (evt) {
  this.classList.add('over');
}

function handleDragLeave (evt) {
  this.classList.remove('over');
}

function handleDrop (evt) {
  evt.stopPropagation();
  
  if (dragSource !== this) {
   $(this).swap($(dragSource),300);  
   
  }
  evt.preventDefault();
}

function handleDragEnd (evt) {
  var columns = document.querySelectorAll('.card');
  Array.prototype.forEach.call(columns, function (col) {
    ['over', 'dragging'].forEach(function (className) {
      col.classList.remove(className);
    });
  });
}


(function( $ ){
    $.fn.swap = function(other,speed) {

     
        //get the position
        var position1 = $(this).offset();
        var position2 = other.offset();

        //position this where it is
        $(this).css({
            top: position1.top + 'px',
            left: position1.left + 'px',
            position: 'absolute'
        });

        //position the other element where it is
        other.css({
            top: position2.top + 'px',
            left: position2.left + 'px',
            position: 'absolute'
        });

        $(this).animate({
            'top': position2.top + 'px',
            'left': position2.left + 'px',
            position: 'absolute'
        }, speed, function() {
                // Animation complete.
        });

        other.animate({
            'top': position1.top + 'px',
            'left': position1.left + 'px',
            position: 'absolute'
        }, speed, function() {
            // Animation complete.
        });
       
    };
})( jQuery );

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getLastChild(){
  var columns = document.querySelectorAll('.card');
  let arr=[];
  let i = 0;
  for(let c of columns){
    arr[i] = c.innerHTML;
    i++;
  }
  let lastChild = Number(arr[arr.length - 1] )+100
  return lastChild;
}

