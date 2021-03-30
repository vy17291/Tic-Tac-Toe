
const fieldElements = document.querySelectorAll(".field");
const restartButton = document.querySelector(".restartBtn");
var modal = document.getElementById("myModal");
var showResult = document.getElementById("showResult")
var closeBtn = document.getElementById("Close");
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    gameBoard.reset();
    gameBoard.update();
})

let board = ["","","","","","","","",""];

    fieldElements.forEach((field) =>
        field.addEventListener("click", (e) => {
            if (e.target.textContent == "") {
                e.target.textContent = "o";
                gameBoard.setField(parseInt(e.target.dataset.index),e.target.textContent);

                gameBoard.thenShowResult();
                gameBoard.comPlay();
                gameBoard.thenShowResult();
                console.log(gameBoard.getEmtyField());  
            }
        })
    )
    

    restartButton.addEventListener("click", () => {
        gameBoard.reset();
        gameBoard.update();
    })

    

    const gameBoard = (() => {
        


        const setField = (index, sign) => {
            if (index > board.length) return;
            board[index] = sign;
          };
        
        const getField = (index) => {
            if (index > board.length) return;
            return board[index];
        };

        const reset = () => {
            for (let i = 0; i < board.length; i++) {
                board[i] = "";
            }
        }
        const update = () => {
            for (let i = 0; i < fieldElements.length; i++) {
              fieldElements[i].textContent = gameBoard.getField(i);
              
            }
        };
        const getPlayerIndex = () =>{   
            const playerFields = [];        
            for (let i = 0; i < board.length; i++) {
                const field = board[i];
                if (field == "o") {
                    playerFields.push(i);
                }
            }
            return playerFields;
        };
        const getComIndex = () =>{          
            const comFields = [];
            for (let i = 0; i < board.length; i++) {
                const field = board[i];
                if (field == "o") {
                    comFields.push(i);
                }
            }
            return comFields;
        };
        const getEmtyField = () =>{          
            const emtyFields = [];
            for (let i = 0; i < board.length; i++) {
                const field = board[i];
                if (field == "") {
                    emtyFields.push(i);
                }
            }
            return emtyFields.length;
        };

        const comPlay = () => {
            const emtyFields = [];
            for (let i = 0; i < board.length; i++) {
                const field = board[i];
                if (field == "") {
                    emtyFields.push(i);
                }
            }
            const chooseComField = emtyFields[Math.floor(Math.random() * emtyFields.length)];
            
            board[chooseComField]="x";
            setInterval(gameBoard.update,100);
        }
        
        const checkWinner = (symbol) => {
            if  (board[0] === symbol && board[1] === symbol && board[2] === symbol
                || board[3] === symbol && board[4] === symbol && board[5] === symbol
                || board[6] === symbol && board[7] === symbol && board[8] === symbol
                || board[0] === symbol && board[3] === symbol && board[6] === symbol
                || board[1] === symbol && board[4] === symbol && board[7] === symbol
                || board[2] === symbol && board[5] === symbol && board[8] === symbol
                || board[0] === symbol && board[4] === symbol && board[8] === symbol
                || board[2] === symbol && board[4] === symbol && board[6] === symbol)
                return true
            else
                return false
        };
        
        const thenShowResult = () => {
            if (gameBoard.checkWinner("o")) {
                modal.style.display = "block";
                showResult.innerHTML = "You Won";   
            }
            if (gameBoard.checkWinner("x")) {
                modal.style.display = "block";
                showResult.innerHTML = "You Lose"; 
            }
            if (gameBoard.getEmtyField() == "0") {
                modal.style.display = "block";
                showResult.innerHTML = "Pair"; 
            }
        }

        return {
            setField,
            getField,
            reset,
            update,
            getPlayerIndex,
            getComIndex,
            comPlay,
            getEmtyField,
            checkWinner,
            thenShowResult
        };
    })();




