// code for selectors
const matrixRow = document.getElementsByTagName('tr');
const matrixCell = document.getElementsByTagName('td');
const tableCell = document.querySelectorAll('.cell');
const reset = document.querySelector('.reset');  
const playerChance = document.querySelector('.player-chance');

for(let i =0;i<matrixCell.length;i++){
    matrixCell[i].addEventListener('click',  (e) =>{
        console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
    })
}

if(!player1) var player1 = prompt('Player One: Please enter your name, your color is yellow');

player1Color = 'yellow';

if(!player2) var player2 = prompt('Player One: Please enter your name, your color is red');

player2Color = 'red';

var currentPlayer = 1;
playerChance.textContent = `${player1}'s turn`;

Array.prototype.forEach.call(matrixCell, (cell)=>{
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});

function changeColor(e){
    let column = e.target.cellIndex;
    for(let i=5;i>=0;i--){
        if(matrixRow[i].children[column].style.backgroundColor === 'white'){
            if(currentPlayer === 1){
                matrixRow[i].children[column].style.backgroundColor = player1Color;
                if(rowCheck() || columnCheck() || diagonalCheck()){
                    playerChance.textContent = `${player1} wins`;
                    return (alert(`winner ${player1}`));
                }else if(isDraw()){
                    playerChance.textContent = 'Oops! It\'s a draw game';
                    return alert('Draw');
                }
                playerChance.textContent = `${player2}'s turn`;
                return currentPlayer = 2;
            }else{
                matrixRow[i].children[column].style.backgroundColor = player2Color;
                playerChance.textContent = `${player1}'s turn`;
                if(rowCheck() || columnCheck() || diagonalCheck() ){
                    playerChance.textContent = `${player2} wins`;
                    return (alert(`winner ${player2}`));
                }else if(isDraw()){
                    playerChance.textContent = 'Oops! It\'s a draw game';
                    return alert('Draw');
                }
                playerChance.textContent = `${player1}'s turn`;
                return currentPlayer = 1;
            }
        } 

    }
}

function colorCheck(one, two, three, four){
    return (one === two && one === two && one === three && one === four && one !== 'white');
}

function rowCheck(){
    for(let row =0;row<matrixRow.length;row++){
        for(let col=0;col<4;col++){
            if(colorCheck(matrixRow[row].children[col].style.backgroundColor, 
                matrixRow[row].children[col+1].style.backgroundColor,
                matrixRow[row].children[col+2].style.backgroundColor, 
                matrixRow[row].children[col+3].style.backgroundColor)){
                    return true;
                } 
        }
    }
}

function columnCheck(){
    for(let col=0;col<7;col++){
        for(let row=0;row<3;row++){
            if(colorCheck(matrixRow[row].children[col].style.backgroundColor, 
                matrixRow[row+1].children[col].style.backgroundColor,
                matrixRow[row+2].children[col].style.backgroundColor, 
                matrixRow[row+3].children[col].style.backgroundColor)){
                    return true;
                } 
        }
    }
}

function diagonalCheck(){
    for(col=0;col<4;col++){
        for(row =0;row<3;row++){
            if(colorCheck(matrixRow[row].children[col].style.backgroundColor, 
                matrixRow[row+1].children[col+1].style.backgroundColor,
                matrixRow[row+2].children[col+2].style.backgroundColor, 
                matrixRow[row+3].children[col+3].style.backgroundColor)){
                    return true;
                } 
        }
        for(row=5;row>2;row--){
            if(colorCheck(matrixRow[row].children[col].style.backgroundColor, 
                matrixRow[row-1].children[col+1].style.backgroundColor,
                matrixRow[row-2].children[col+2].style.backgroundColor, 
                matrixRow[row-3].children[col+3].style.backgroundColor)){
                    return true;
                } 
        }
    }
}

function isDraw(){
    let counter = 0;
    for(let i=0;i<matrixCell.length;i++){
        if(matrixCell[i].style.backgroundColor !== 'white'){
            counter++;
        }
    }
    if(counter === matrixCell.length){
        return true;
    }
}

reset.addEventListener('click', () =>{
    tableCell.forEach(cell =>{
        cell.style.backgroundColor = 'white';
    });
    return currentPlayer = 1;
}) 