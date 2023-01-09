let boardState = null;
let isWhitesTurn = true;
let whiteCanCastleKingside = true;
let whiteCanCastleQueenside = true;
let blackCanCastleKingside = true;
let blackCanCastleQueenside = true;

//the position that a piece can enpassant capture to. the format is (XPosition, YPosition)
let enPassantPossible = "99";

function getBoardState(){
    return boardState;
}

function resetGame(){
    boardState = null;
    isWhitesTurn = true;
    whiteCanCastleKingside = true;
    whiteCanCastleQueenside = true;
    blackCanCastleKingside = true;
    blackCanCastleQueenside = true;
    enPassantPossible = "99";
}

function startGame(){
    boardState = [
        ["WR","WN","WB","WQ","WK","WB","WN","WR"],
        ["WP","WP","WP","WP","WP","WP","WP","WP"],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["BP","BP","BP","BP","BP","BP","BP","BP"],
        ["BR","BN","BB","BQ","BK","BB","BN","BR"]
        
    ];
}

/**
 * converts rank to x coordinate
 * @param {char} character 
 * @returns {number}
 */
function letterToNumber(character){

    switch(character){
        case 'A':
            return 0;
        case 'B':
            return 1;
        case 'C':
            return 2;
        case 'D':
            return 3;
        case 'E':
            return 4;
        case 'F':
            return 5;
        case 'G':
            return 6;
        case 'H':
            return 7;
        default: 
            console.log("incorrect character " + character +" found");
            return -1;
    }
}

/**
 * finds knights of the provided color that can go to position (xpos, ypos)
 * 
 * @param {number} xPos the target x position for knights
 * @param {number} yPos the target y position for knights
 * @param {array} proposalBoard the board to be analized
 * @param {char} color the color of the knights to be considered
 * @param {array} piecesArray an array to append the found knights to
 * @returns {boolean} whether any knights of the given color can go to (xPos, yPos)
 */
function findKnightsThatCanGoToXPosYPos(xPos, yPos, proposalBoard, color, piecesArray){

    const appendToArray = piecesArray !== undefined;
    const oldLength = appendToArray ? piecesArray.length:0;

    if(xPos + 1 < 8 && yPos + 2 < 8 && proposalBoard[yPos + 2][xPos + 1] == color + "N"){
        if(!appendToArray) return true;
        piecesArray.push({xPos:xPos + 1, yPos:yPos + 2, piece:color + "N"});
    }

    if(xPos - 1 >= 0 && yPos + 2 < 8 && proposalBoard[yPos + 2][xPos - 1] == color + "N"){
        if(!appendToArray) return true;
        piecesArray.push({xPos:xPos - 1, yPos:yPos + 2, piece:color + "N"});
    }

    if(xPos + 2 < 8 && yPos + 1 < 8 && proposalBoard[yPos + 1][xPos + 2] == color + "N"){
        if(!appendToArray) return true;
        piecesArray.push({xPos:xPos + 2, yPos:yPos + 1, piece:color + "N"});
    }

    if(xPos - 2 >= 0 && yPos + 1 < 8 && proposalBoard[yPos + 1][xPos - 2] == color + "N"){
        if(!appendToArray) return true;
        piecesArray.push({xPos:xPos - 2, yPos:yPos + 1, piece:color + "N"});
    }

    if(xPos + 1 < 8 && yPos - 2 >= 0 && proposalBoard[yPos - 2][xPos + 1] == color + "N"){
        if(!appendToArray) return true;
        piecesArray.push({xPos:xPos + 1, yPos:yPos - 2, piece:color + "N"});
    }

    if(xPos - 1 >= 0 && yPos - 2 >= 0 && proposalBoard[yPos - 2][xPos - 1] == color + "N"){
        if(!appendToArray) return true;
        piecesArray.push({xPos:xPos - 1, yPos:yPos - 2, piece:color + "N"});
    }

    if(xPos + 2 < 8 && yPos - 1 >= 0 && proposalBoard[yPos - 1][xPos + 2] == color + "N"){
        if(!appendToArray) return true;
        piecesArray.push({xPos:xPos + 2, yPos:yPos - 1, piece:color + "N"});
    }

    if(xPos - 2 >= 0 && yPos - 1 >= 0 && proposalBoard[yPos - 1][xPos - 2] == color + "N"){
        if(!appendToArray) return true;
        piecesArray.push({xPos:xPos - 2, yPos:yPos - 1, piece:color + "N"});
    }

    if(!appendToArray) return false;
    return oldLength != piecesArray.length;
}

/**
 * finds pieces of the provided color that can get to position (xPos, yPos) diagonally
 * 
 * @param {number} xPos the target x position for diagonal pieces
 * @param {number} yPos the target y position for diagonal pieces
 * @param {array} proposalBoard the board to be analized
 * @param {char} color the color of the diagonal pieces to be considered
 * @param {array} piecesArray an array to append the found diagonal pieces to
 * @returns {boolean} whether any diagonal pieces of the given color can go to (xPos, yPos)
 */
function findBishopAndQueenThatCanGoToXPosYPos(xPos, yPos, proposalBoard, color, piecesArray){

    const appendToArray = piecesArray !== undefined;
    const oldLength = appendToArray ? piecesArray.length:0;

    //bottom left
    for(let i=xPos-1, j=yPos-1; i >= 0 && j >=0; i--, j--){

        let pieceAtIJ = proposalBoard[j][i]
        if(pieceAtIJ === color + "B" || pieceAtIJ === color + "Q"){

            if(!appendToArray) return true;
            piecesArray.push({xPos:i, yPos:j, piece:pieceAtIJ});
            break;
        }
        else if(pieceAtIJ !== ""){
            break;
        }
    }

    //bottom right
    for(let i=xPos+1, j=yPos-1; i <8 && j >=0; i++, j--){

        let pieceAtIJ = proposalBoard[j][i]
        if(pieceAtIJ === color + "B" || pieceAtIJ === color + "Q"){

            if(!appendToArray) return true;
            piecesArray.push({xPos:i, yPos:j, piece:pieceAtIJ});
            break;
        }
        else if(pieceAtIJ !== ""){
            break;
        }
    }

    //top left
    for(let i=xPos-1, j=yPos+1; i >= 0 && j <8; i--, j++){

        let pieceAtIJ = proposalBoard[j][i]
        if(pieceAtIJ === color + "B" || pieceAtIJ === color + "Q"){

            if(!appendToArray) return true;
            piecesArray.push({xPos:i, yPos:j, piece:pieceAtIJ});
            break;
            
        }
        else if(pieceAtIJ !== ""){
            break;
        }
    }

    //top right
    for(let i=xPos+1, j=yPos+1; i <8 && j <8; i++, j++){

        let pieceAtIJ = proposalBoard[j][i]
        if(pieceAtIJ === color + "B" || pieceAtIJ === color + "Q"){

            if(!appendToArray) return true;
            piecesArray.push({xPos:i, yPos:j, piece:pieceAtIJ});
            break;
        }
        else if(pieceAtIJ !== ""){
            break;
        }
    }
    
    if(!appendToArray) return false;
    return oldLength != piecesArray.length;

}

/**
 * finds pieces of the provided color that can get to position (xPos, yPos) vertically and horizontally
 * 
 * @param {number} xPos the target x position for vertical and horizontal pieces
 * @param {number} yPos the target y position for vertical and horizontal pieces
 * @param {array} proposalBoard the board to be analized
 * @param {char} color the color of the vertical and horizontal pieces to be considered
 * @param {array} piecesArray an array to append the found vertical and horizontal pieces to
 * @returns {boolean} whether any vertical and horizontal pieces of the given color can go to (xPos, yPos)
 */
function findRookAndQueenThatCanGoToXPosYPos(xPos, yPos, proposalBoard, color, piecesArray){

    const appendToArray = piecesArray !== undefined;
    const oldLength = appendToArray ? piecesArray.length:0;

    //right of king
    for(let i=xPos+1; i <8; i++){

        let pieceAtIJ = proposalBoard[yPos][i]
        if(pieceAtIJ === color + "R" || pieceAtIJ === color + "Q"){

            if(!appendToArray) return true;
            piecesArray.push({xPos:i, yPos:yPos, piece:pieceAtIJ});
            break;
        }
        else if(pieceAtIJ !== ""){
            break;
        }
    }

    //left of king
    for(let i=xPos-1; i >=0; i--){

        let pieceAtIJ = proposalBoard[yPos][i]
        if(pieceAtIJ === color + "R" || pieceAtIJ === color + "Q"){

            if(!appendToArray) return true;
            piecesArray.push({xPos:i, yPos:yPos, piece:pieceAtIJ});
            break;
        }
        else if(pieceAtIJ !== ""){
            break;
        }
    }

    //below king
    for(let j=yPos-1; j >=0; j--){

        let pieceAtIJ = proposalBoard[j][xPos]
        if(pieceAtIJ === color + "R" || pieceAtIJ === color + "Q"){

            if(!appendToArray) return true;
            piecesArray.push({xPos:xPos, yPos:j, piece:pieceAtIJ});
            break;
        }
        else if(pieceAtIJ !== ""){
            break;
        }
    }

    //above king
    for(let j=yPos+1; j <8; j++){

        let pieceAtIJ = proposalBoard[j][xPos]
        if(pieceAtIJ === color + "R" || pieceAtIJ === color + "Q"){

            if(!appendToArray) return true;
            piecesArray.push({xPos:xPos, yPos:j, piece:pieceAtIJ});
            break;
        }
        else if(pieceAtIJ !== ""){
            break;
        }
    }

    if(!appendToArray) return false;
    return oldLength != piecesArray.length;
}

/**
 * finds king of the provided color that can go to position (xpos, ypos)
 * 
 * @param {number} xPos the target x position for the target king
 * @param {number} yPos the target y position for the target king
 * @param {array} proposalBoard the board to be analized
 * @param {char} color the color of the target king
 * @returns {boolean} weather the king ws found
 */
function findKingThatCanGoToXPosYPos(xPos, yPos, proposalBoard, color){

    for(let j = (yPos == 0 ? 0:yPos-1); j < yPos+1 && j<8; j++){
        for(let i = (xPos == 0 ? 0:xPos-1); i< xPos+1 && i<8; i++){
            if(proposalBoard[j][i] == color + "K"){
                possiblePieces.push({xPos:i, yPos:j, piece: color + "K"});
                return true;
            }
        }
    }

    return false;
}

/**
 * finds pawns of the provided color that can get to position (xPos, yPos)
 * 
 * @param {number} xPos the target x position for pawns
 * @param {number} yPos the target y position for pawns
 * @param {array} proposalBoard the board to be analized
 * @param {char} color the color of the pawns to be considered
 * @param {array} piecesArray an array to append the found pawns to
 * @returns {boolean} whether any pawns of the given color can go to (xPos, yPos)
 */
function findPawnThatCanGoToXPosYPos(xPos, yPos, proposalBoard, color, piecesArray){

    const appendToArray = piecesArray !== undefined;
    const oldLength = appendToArray ? piecesArray.length:0;
    const captureFlag = proposalBoard[yPos][xPos] != "" && proposalBoard[yPos][xPos].charAt(0) != color;
    const isWhite = color == 'W';

    if(captureFlag){
        if(isWhite && yPos != 0){
            if(xPos +1 < 8 && proposalBoard[yPos-1][xPos +1] == "WP"){
                if(!appendToArray) return true;
                piecesArray.push({xPos:xPos + 1, yPos:yPos - 1, piece:"WP"});
            }
            else if(xPos -1 >= 0 && proposalBoard[yPos-1][xPos -1] == "WP"){
                if(!appendToArray) return true;
                piecesArray.push({xPos:xPos - 1, yPos:yPos - 1, piece:"WP"});
            }
        }
        else if(yPos != 7){
            if(xPos +1 < 8 && proposalBoard[yPos+1][xPos +1] == "BP"){
                if(!appendToArray) return true;
                piecesArray.push({xPos:xPos + 1, yPos:yPos + 1, piece:"BP"});
            }
            else if(xPos -1 >= 0 && proposalBoard[yPos+1][xPos -1] == "BP"){
                if(!appendToArray) return true;
                piecesArray.push({xPos:xPos - 1, yPos:yPos + 1, piece:"BP"});
            }
        }
    }
    else{
        if(isWhite && yPos != 0 && proposalBoard[yPos-1][xPos] == "WP"){
            if(!appendToArray) return true;
            piecesArray.push({xPos:xPos, yPos:yPos - 1, piece:"WP"});
        }
        else if(yPos != 7 && proposalBoard[yPos+1][xPos] == "BP") {
            if(!appendToArray) return true;
            piecesArray.push({xPos:xPos, yPos:yPos + 1, piece:"BP"});
        }
    }

    if(!appendToArray) return false;
    return oldLength != piecesArray.length;

}

/**
 * finds all pieces of the provided color that can get to position (xPos, yPos)
 * 
 * @param {number} xPos the target x position for pieces
 * @param {number} yPos the target y position for pieces
 * @param {array} proposalBoard the board to be analized
 * @param {char} color the color of the pieces to be considered
 * @param {array} piecesArray an array to append the found pieces to
 * @returns {boolean} whether any pieces of the given color can go to (xPos, yPos)
 */
function piecesThatCanGoToXPosYPos(xPos, yPos, proposalBoard, color, piecesArray){
   
    findKnightsThatCanGoToXPosYPos(xPos, yPos, proposalBoard, color, piecesArray);
    findBishopAndQueenThatCanGoToXPosYPos(xPos, yPos, proposalBoard, color, piecesArray);
    findRookAndQueenThatCanGoToXPosYPos(xPos, yPos, proposalBoard, color, piecesArray);
    findPawnThatCanGoToXPosYPos(xPos, yPos, proposalBoard, color, piecesArray);
    
    return piecesArray.length > 0;
}

/**
 * finds whether the king at (kingXPos, kingYPos) is in check
 * 
 * @param {number} kingXPos the kings x position
 * @param {number} kingYPos the kings y position
 * @param {array} proposalBoard the board to be analized
 * @returns {boolean} whether the king is in check
 */
function kingIsInCheck(kingXPos, kingYPos, proposalBoard){
    const enemyColor = proposalBoard[kingYPos][kingXPos].charAt(0) == 'W' ? 'B':'W';

    if(findKnightsThatCanGoToXPosYPos(kingXPos, kingYPos, proposalBoard, enemyColor)){
        return true;
    }

    if(findBishopAndQueenThatCanGoToXPosYPos(kingXPos, kingYPos, proposalBoard, enemyColor)){
        return true;
    }

    if(findRookAndQueenThatCanGoToXPosYPos(kingXPos, kingYPos, proposalBoard, enemyColor)){
        return true;
    }

    if(findKingThatCanGoToXPosYPos(kingXPos, kingYPos, proposalBoard, enemyColor)){
        return true;
    }

    return  findPawnThatCanGoToXPosYPos(kingXPos, kingYPos, proposalBoard, enemyColor);
}

/**
 * checks if the diagonal moving piece at (initialX, initialY) can move to (targetX, targetY) without any pieces getting in the way
 * 
 * @param {number} initialX 
 * @param {number} initialY 
 * @param {number} targetX 
 * @param {number} targetY 
 * @returns {boolean} wether the given piece at (initialX, initialY) can move to (targetX, targetY) without any pieces getting in the way
 */
function diagonalBlocked(initialX, initialY, targetX, targetY){

    if(initialX < targetX){
        //movement towards top-right
        if(initialY < targetY){
            for(let i = initialX+1, j = initialY+1; i < targetX; i++, j++){
                if(boardState[j][i] != ""){
                    return true;
                }
            }
        }
        //movement towards bottom-right
        else{
            for(let i = initialX+1, j = initialY-1; i < targetX; i++, j--){
                if(boardState[j][i] != ""){
                    return true;
                }
            }

        }
    }
    else{
        //movement towards top-left
        if(initialY < targetY){
            for(let i = initialX-1, j = initialY+1; i > targetX; i--, j++){
                if(boardState[j][i] != ""){
                    return true;
                }
            }
        }
        //movement towards bottom-left
        else{
            for(let i = initialX-1, j = initialY-1; i > targetX; i--, j--){
                if(boardState[j][i] != ""){
                    return true;
                }
            }
        }
    }

    return false;
}

/**
 * checks if the horizontally or vertically moving piece at (initialX, initialY) can move to (targetX, targetY) without any pieces getting in the way
 * 
 * @param {number} initialX 
 * @param {number} initialY 
 * @param {number} targetX 
 * @param {number} targetY 
 * @returns {boolean} wether the given piece at (initialX, initialY) can move to (targetX, targetY) without any pieces getting in the way
 */
function cardinalDirectionBlocked(initialX, initialY, targetX, targetY){

    //check for vertical movement
    if(initialX == targetX){
        //checks movement direction
        if(initialY < targetY){
            //check if piece is in the way
            for(let i=initialY+1; i<targetY; i++){
                if(boardState[i][targetX] != ""){
                    return true;
                }
            }
        }
        else{
            //check if piece is in the way
            for(let i=initialY-1; i>targetY; i--){
                if(boardState[i][targetX] != ""){
                    return true;
                }
            }
        }
    }
    else{
        if(initialX < targetX){
            
            for(let i=initialX+1; i<targetX; i++){
                if(boardState[targetY][i] != ""){
                    return true;
                }
            }
        }
        else{
            for(let i=initialX-1; i>targetX; i--){
                if(boardState[targetY][i] != ""){
                    return true;
                }
            }                    
        }
    }
    return false;
}

/**
 * check if a pices movment from (initialX, initialY) to (targetX, targetY) is blocked
 * 
 * @param {number} initialX 
 * @param {number} initialY 
 * @param {char} piece 
 * @param {number} targetX 
 * @param {number} targetY 
 * @returns {boolean} whether movment from (initialX, initialY) to (targetX, targetY) is blocked
 */
function pieceIsBeingBlocked(initialX, initialY, piece, targetX, targetY){

    switch(piece){
        case 'Q':
            if(initialX == targetX || initialY == targetY) return cardinalDirectionBlocked(initialX, initialY, targetX, targetY);
            return diagonalBlocked(initialX, initialY, targetX, targetY);
        case 'R':
            return cardinalDirectionBlocked(initialX, initialY, targetX, targetY);
        case 'B':
            return diagonalBlocked(initialX, initialY, targetX, targetY);
        default:
            return false;
    }
}

/**
 * checks if movement from (initialX, initialY) to (targetX, targetY) is movement in a cardinal direction
 * 
 * @param {number} initialX 
 * @param {number} initialY 
 * @param {number} targetX 
 * @param {number} targetY 
 * @returns {boolean} whether movement from (initialX, initialY) to (targetX, targetY) is movement in a cardinal direction
 */
function goesInCardinalDirection(initialX, initialY, targetX, targetY){
    return initialX == targetX || initialY == targetY;
}

/**
 * checks if movement from (initialX, initialY) to (targetX, targetY) is movement in a diagonal
 * 
 * @param {number} initialX 
 * @param {number} initialY 
 * @param {number} targetX 
 * @param {number} targetY 
 * @returns {boolean} whether movement from (initialX, initialY) to (targetX, targetY) is movement in a diagonal
 */
function goesInDiagonal(initialX, initialY, targetX, targetY){

    return Math.abs(initialX - targetX) == Math.abs(initialY - targetY);
   
}

/**
 * checks if the king at (kingXPos, kingYPos) going to (targetX, targetY) is castling 
 * 
 * @param {number} kingXPos 
 * @param {number} kingYPos 
 * @param {number} targetX 
 * @param {number} targetY 
 * @param {boolean} isWhite whether the king at (kingXPos, kingYPos) is white
 * @returns {boolean} if the king at (kingXPos, kingYPos) going to (targetX, targetY) is castling and the king can castle
 */
function tryToCastle(kingXPos, kingYPos, targetX, targetY, isWhite){

    if(kingIsInCheck(kingXPos, kingYPos, boardState)){
        return false;
    }

    if(isWhite && kingXPos == 4 && kingYPos == 0){
        if(targetX ==6 && targetY == 0 && whiteCanCastleKingside && boardState[0][targetX] == "" && boardState[0][targetX -1] == "" ){

            //check for castling through check
            let inbetweenBoardState = boardState.map((arr)=>arr.slice());
            inbetweenBoardState[0][kingXPos] = "WK";
            inbetweenBoardState[0][targetX -1] = "";

            if(!kingIsInCheck(inbetweenBoardState)){
                return true;
            }
            
        }
        else if(targetX ==2 && targetY == 0 && whiteCanCastleQueenside && boardState[targetX][0] == "" && boardState[targetX +1][0] == ""){

            let inbetweenBoardState = boardState.map((arr)=>arr.slice());
            inbetweenBoardState[0][kingXPos] = "WK";
            inbetweenBoardState[0][targetX +1] = "";

            if(!kingIsInCheck(inbetweenBoardState)){
                return true;
            }
        }

    }
    else if(!isWhitesTurn && kingXPos == 4 && kingYPos == 7){
        if(targetX ==6 && targetY == 7 && blackCanCastleKingside && boardState[7][targetX] == "" && boardState[7][targetX -1] == ""){

            let inbetweenBoardState = boardState.map((arr)=>arr.slice());
            inbetweenBoardState[7][kingXPos] = "BK";
            inbetweenBoardState[7][targetX -1] = "";

            if(!kingIsInCheck(inbetweenBoardState)){
                return true;
            }
        }
        else if(targetX ==2 && targetY == 7 && blackCanCastleQueenside && boardState[7][targetX] == "" && boardState[7][targetX +1] == ""){

            let inbetweenBoardState = boardState.map((arr)=>arr.slice());
            inbetweenBoardState[7][kingXPos] = "BK";
            inbetweenBoardState[7][targetX +1] = "";

            if(!kingIsInCheck(inbetweenBoardState)){
                return true;
            }
        }
    }
    return false;
}

/**
 * checks if the piece moving from (initialX, initialY) to (targetX, targetY) is going in a dirrection the piece is allowed to move
 * 
 * @param {number} initialX 
 * @param {number} initialY 
 * @param {char} piece 
 * @param {number} targetX 
 * @param {number} targetY 
 * @param {boolean} isWhite whether the piece at (kingXPos, kingYPos) is white
 * @returns {boolean} if the piece moving from (initialX, initialY) to (targetX, targetY) is going in a dirrection the piece is allowed to move
 */
function movesInThatDirection(initialX, initialY, piece, targetX, targetY, isWhite){

    //exits if piece does not move
    if(initialX == targetX && initialY == targetY){
        return false;
    }

    //checks if intended move location has a piece of the same color
    if(boardState[targetY][targetX].charAt(0) ===  (isWhite ? 'W':'B')){
        return false;
    }

    switch(piece){
        case 'K':

            if(Math.abs(initialX - targetX) < 2 && Math.abs(initialY - targetY) < 2){
                return true;
            }

            return tryToCastle(initialX, initialY, targetX, targetY, isWhite)


        case 'Q':

            return goesInCardinalDirection(initialX, initialY, targetX, targetY) || goesInDiagonal(initialX, initialY, targetX, targetY);

        case 'R':

            return goesInCardinalDirection(initialX, initialY, targetX, targetY);

        case 'N':

            if(Math.abs(initialX - targetX) == 1 && Math.abs(initialY - targetY) == 2){
                return true;
            }
            else if(Math.abs(initialX - targetX) == 2 && Math.abs(initialY - targetY) == 1){
                return true;
            }
            return false;

        case 'B':

            return goesInDiagonal(initialX, initialY, targetX, targetY);
            
        case 'P':

            if(isWhite){     

                //pawn up 1
                if(initialX == targetX && initialY +1 == targetY &&  boardState[targetY][targetX] == ""){
                    return true;
                }

                //pawn capture
                if(Math.abs(initialX - targetX) == 1 && initialY +1 == targetY &&  boardState[targetY][targetX].charAt(0) == "B"){
                    return true;
                }

                //moveing pawn up 2
                if(initialX == targetX && initialY == 1 && targetY == 3 && boardState[2][targetX] == "" && boardState[3][targetX] == ""){
                    return true;
                }

                //check enpassant
                if(targetX + "" + targetY == enPassantPossible && initialY+1 == targetY && Math.abs(initialX -targetX) == 1){
                    return true;
                }

            }
            else{
                if(initialX == targetX && initialY -1 == targetY &&  boardState[targetY][targetX] == ""){
                    return true;
                }

                if(Math.abs(initialX - targetX) == 1 && initialY -1 == targetY &&  boardState[targetY][targetX].charAt(0) == "W"){
                    return true;
                }

                if(initialX == targetX && initialY == 6 && targetY == 4 && boardState[5][targetX] == "" && boardState[4][targetX] == ""){
                    return true;
                }
     
                if(targetX + "" + targetY == enPassantPossible && initialY-1 == targetY && Math.abs(initialX -targetX) == 1){
                    return true;
                }
            }
            return false;
        default:
            console.log("wrong piece " + piece);
            return false;
    }
}

/**
 * updates castling and enpassant flags
 * 
 * @param {number} initialX 
 * @param {number} initialY 
 * @param {char} piece 
 * @param {number} targetX 
 * @param {number} targetY 
 * @param {boolean} isWhite whether the piece at (kingXPos, kingYPos) is white
 */
function updateCastlingandEnpassant(initialX, initialY, piece, targetX, targetY, isWhite){

    //update castling for King and Rook moves
    if(piece == "K"){
        isWhite ? (whiteCanCastleKingside = false, whiteCanCastleQueenside = false) : (blackCanCastleKingside = false, blackCanCastleQueenside = false);
    }
    else if(piece == "R"){
        if(isWhite && initialY == 0){
            if(initialX == 0){
                whiteCanCastleQueenside = false;
            }
            else if(initialX == 7){
                whiteCanCastleKingside = false;
            }
        }
        else if(!isWhite && initialY == 7){
            if(initialX == 0){
                blackCanCastleQueenside = false; 
            }
            else if(initialX == 7){
                blackCanCastleKingside = false;
            }
        }
    }

    //update castling if rook is captured
    if(targetX == 0 && targetY == 0){
        whiteCanCastleQueenside = false;
    }
    else if(targetX == 7 && targetY == 0){
        whiteCanCastleKingside = false;
    }
    else if(targetX == 0 && targetY == 7){
        blackCanCastleQueenside = false; 
    }
    else if(targetX == 7 && targetY == 7){
        blackCanCastleKingside = false;
    }

    //update enPassant
    if(piece == "P" && Math.abs(initialY - targetY) == 2){
        enPassantPossible = isWhite ? targetX +""+ (targetY-1) :targetX +""+ (targetY+1);

    }
    else{
        enPassantPossible = "99";
    }
}

/**
 * Updates the board for castling and enpassant
 * 
 * @param {number} initialX 
 * @param {number} initialY 
 * @param {char} piece 
 * @param {number} targetX 
 * @param {number} targetY 
 * @param {array} proposalBoard 
 * @param {bool} isWhite if the piece at (initialX, initialY) is white
 * @param {string} move the move provided by the user
 * @returns {boolean} if a special move was made
 */
function updateBoardForSpecialMove(initialX, initialY, piece, targetX, targetY, proposalBoard, isWhite, move){

    //checks for white castling
    if(isWhite && initialX == 4 && initialY == 0 && targetY == 0){
        if(targetX == 6){

            //moves king
            proposalBoard[targetY][targetX] = "WK";
            proposalBoard[initialY][initialX] = "";

            //moves rook
            proposalBoard[targetY][targetX-1] = "WR";
            proposalBoard[targetY][targetX+1] = "";

            return true;
            
        }
        else if(targetX == 2){

            //moves king
            proposalBoard[targetY][targetX] = "WK";
            proposalBoard[initialY][initialX] = "";

            //moves rook
            proposalBoard[targetY][targetX+1] = "WR";
            proposalBoard[targetY][targetX-2] = "";

            return true;

        }
    }
    //checks for black castling
    else if(!isWhite && initialX == 4 && initialY == 7 && targetY == 7){
        if(targetX == 6){

            //moves king
            proposalBoard[targetY][targetX] = "BK";
            proposalBoard[initialY][initialX] = "";

            //moves rook
            proposalBoard[targetY][targetX-1] = "BR";
            proposalBoard[targetY][targetX+1] = "";

            return true;
            
        }
        else if(targetX == 2){

            //moves king
            proposalBoard[targetY][targetX] = "BK";
            proposalBoard[initialY][initialX] = "";

            //moves rook
            proposalBoard[targetY][targetX+1] = "BR";
            proposalBoard[targetY][targetX-2] = "";

            return true;

        }
    }
    else if(piece == "P"){

        if(isWhitesTurn){

            //checks for pawn promotion
            if(targetY == 7){
                proposalBoard[targetY][targetX] = "W" + move.charAt(4);
                proposalBoard[initialY][initialX] = ""
                return true;
            }
            //checks for enpassant
            else if(targetX + "" + targetY == enPassantPossible){
                proposalBoard[targetY][targetX] = "WP";
                proposalBoard[targetY-1][targetX] = "";
                proposalBoard[initialY][initialX] = "";
                return true;
            }
        }
        else{

            if(targetY == 0){
                proposalBoard[targetY][targetX] = "B" + move.charAt(4);
                proposalBoard[initialY][initialX] = ""
                return true;
            }
            else if(targetX + "" + targetY == enPassantPossible){
                proposalBoard[targetY][targetX] = "BP";
                proposalBoard[targetY+1][targetX] = ""
                proposalBoard[initialY][initialX] = ""
                return true;
            }
        }
    }

    return false;
}

/**
 * checks if there is a legal king move
 * 
 * @param {number} kingXPos 
 * @param {number} kingYPos 
 * @returns {boolean} if there is a legal king move
 */
function kingCanMove(kingXPos, kingYPos){

    let proposalBoard = boardState.map((arr)=> arr.slice());
    const sameColor = isWhitesTurn ? "W":"B";
    const kingToFind = proposalBoard[kingYPos][kingXPos];

    proposalBoard[kingYPos][kingXPos] = "";

    for(let targetX = (kingXPos == 0 ? 0:kingXPos-1); targetX<kingXPos+1 && targetX<8; targetX++){
        for(let targetY = (kingYPos == 0 ? 0:kingYPos-1); targetY< kingYPos+1 && targetY<8; targetY++){
            
            if(proposalBoard[targetY][targetX].charAt(0) != sameColor){

                let wasAtTargetSquare = proposalBoard[targetY][targetX];
                proposalBoard[targetY][targetX] = kingToFind;
                
                if(!kingIsInCheck(kingXPos, kingYPos, proposalBoard)){
                    return true;
                }

                proposalBoard[targetY][targetX] = wasAtTargetSquare;
            }
        }
    }

    return false;

}

/**
 * checks if a piece can capture the attacking piece and get the king at (kingXPos, kingYPos) out of check
 * 
 * @param {Object} attackingPiece the attacking piece in the form {piece:value, xPos:value, yPos:value}
 * @param {number} kingXPos 
 * @param {number} kingYPos 
 * @param {char} sameColor the color of the king
 * @returns {boolean}if a piece can capture the attacking piece and get the king at (kingXPos, kingYPos) out of check
 */
function canCaptureAttackingPiece(attackingPiece, kingXPos, kingYPos, sameColor){

    let proposalBoard = boardState.map((arr)=> arr.slice());
    let counterAttackingPieces = [];

    if(!piecesThatCanGoToXPosYPos(attackingPiece.xPos, attackingPiece.yPos, proposalBoard, sameColor, counterAttackingPieces)){
        return false;
    }

    for(let i=0; icounterAttackingPieces.length; i++){
        proposalBoard[attackingPiece.xPos][attackingPiece.yPos] = attackingPieces[i].piece;
        proposalBoard[counterAttackingPieces[i].xPos][counterAttackingPieces[i].yPos] = "";

        if(!kingIsInCheck(kingXPos, kingYPos, proposalBoard)){
            return true;
        }

        proposalBoard[attackingPiece.xPos][attackingPiece.yPos] = attackingPiece.piece;
        proposalBoard[counterAttackingPieces[i].xPos][counterAttackingPieces[i].yPos] = counterAttackingPieces.piece;

    }

    return false;

}

/**
 * checks if there is a pice that can go to (xPos, yPos) and stop the king at (kingXPos, kingYPos) from being in check
 * 
 * @param {array} proposalBoard 
 * @param {number} xPos x position of the tile to block to stop check
 * @param {number} yPos y position of the tile to block to stop check
 * @param {number} kingXPos 
 * @param {number} kingYPos 
 * @param {char} sameColor color of the king
 * @returns {boolean} if there is a pice that can go to (xPos, yPos) and stop the king at (kingXPos, kingYPos) from being in check
 */
function attemptToBlock(proposalBoard, xPos, yPos, kingXPos, kingYPos, sameColor){

    let possibleBlockingPieces = []
    if(!piecesThatCanGoToXPosYPos(xPos, yPos, proposalBoard, sameColor, possibleBlockingPieces)){
        return false;
    }

    for(let i=0; i<possibleBlockingPieces; i++){
        proposalBoard[yPos][xPos] = possibleBlockingPieces[i].piece;
        proposalBoard[possibleBlockingPieces[i].yPos][possibleBlockingPieces[i].xPos] = ""
        
        if(!kingIsInCheck(kingXPos, kingYPos, proposalBoard)){
            return true;
        }

        proposalBoard[yPos][xPos] = ""
        proposalBoard[possibleBlockingPieces[i].yPos][possibleBlockingPieces[i].xPos] = possibleBlockingPieces[i].piece;

    }

    return false;

}

/**
 * checks if there is a piece that can legally block the piece causing check 
 * 
 * @param {number} kingXPos 
 * @param {number} kingYPos 
 * @param {Object} pieceCausingCheck 
 * @param {char} sameColor color of king
 * @returns {boolean}  if there is a piece that can legally block the piece causing check 
 */
function canBlockCheck(kingXPos, kingYPos, pieceCausingCheck, sameColor){

    let proposalBoard = boardState.map((arr)=> arr.slice());

    if(pieceCausingCheck.xPos == kingXPos && pieceCausingCheck.yPos < kingYPos){

        for(let j = pieceCausingCheck.yPos+1; j < kingYPos; j++){
            
            if(attemptToBlock(proposalBoard, kingXPos, j, kingXPos, kingYPos, sameColor)){
                return true;
            }
        }
    }
    else if(pieceCausingCheck.xPos == kingXPos && pieceCausingCheck.yPos > kingYPos){

        for(let j = pieceCausingCheck.yPos-1; j > kingYPos; j--){

            if(attemptToBlock(proposalBoard, kingXPos, j, kingXPos, kingYPos, sameColor)){
                return true;
            }
        }
    }
    else if(pieceCausingCheck.xPos < kingXPos && pieceCausingCheck.yPos == kingYPos){

        for(let i = pieceCausingCheck.xPos+1; i < kingXPos; i++){

            if(attemptToBlock(proposalBoard, i, kingYPos, kingXPos, kingYPos, sameColor)){
                return true;
            }
        }
    }
    else if(pieceCausingCheck.xPos > kingXPos && pieceCausingCheck.yPos == kingYPos){

        for(let i = pieceCausingCheck.xPos-1; i > kingXPos; i--){

            if(attemptToBlock(proposalBoard, i, kingYPos, kingXPos, kingYPos, sameColor)){
                return true;
            }
        }
    }
    else if(pieceCausingCheck.xPos < kingXPos && pieceCausingCheck.yPos < kingYPos){

        for(let i = pieceCausingCheck.xPos+1, j = pieceCausingCheck.yPos+1; i < kingXPos; i++, j++){

            if(attemptToBlock(proposalBoard, i, j, kingXPos, kingYPos, sameColor)){
                return true;
            }
        }
    }
    else if(pieceCausingCheck.xPos < kingXPos && pieceCausingCheck.yPos > kingYPos){

        for(let i = pieceCausingCheck.xPos+1, j = pieceCausingCheck.yPos-1; i < kingXPos; i++, j--){

            if(attemptToBlock(proposalBoard, i, j, kingXPos, kingYPos, sameColor)){
                return true;
            }
        }
    }
    else if(pieceCausingCheck.xPos > kingXPos && pieceCausingCheck.yPos < kingYPos){

        for(let i = pieceCausingCheck.xPos-1, j = pieceCausingCheck.yPos+1; i > kingXPos; i--, j++){

            if(attemptToBlock(proposalBoard, i, j, kingXPos, kingYPos, sameColor)){
                return true;
            }
        }
    }
    else{// if(pieceCausingCheck.xPos > kingXPos && pieceCausingCheck.yPos > kingYPos)

        for(let i = pieceCausingCheck.xPos-1, j = pieceCausingCheck.yPos-1; i > kingXPos; i--, j--){

            if(attemptToBlock(proposalBoard, i, j, kingXPos, kingYPos, sameColor)){
                return true;
            }
        }
    }
    return false;



}

/**
 * checks if the current player is in checkmate
 * @returns {boolean} if the current player is in checkmate
 */
function isCheckmate(){

    let kingXPos;
    let kingYPos; 
    const isWhite = isWhitesTurn;
    const sameColor = (isWhite ? "W":"B");
    const oppositeColor = (isWhite ? "B":"W");
    const kingToFind = sameColor + "K";

    for(let j=0; j<8; j++){
        for(let i=0; i<8; i++){
            if(boardState[j][i] === kingToFind){
                kingXPos = i;
                kingYPos = j;
            }
        }
    }

    let attackingPieces = [];
    if(!piecesThatCanGoToXPosYPos(kingXPos, kingYPos, boardState, oppositeColor, attackingPieces)){
        return false;
    }

    if(kingCanMove(kingXPos, kingYPos)){
        return false;
    }

    if(attackingPieces.length > 1){
        return true;
    }

    const attackingPiece = attackingPieces[0];

    if(canCaptureAttackingPiece(attackingPiece, kingXPos, kingYPos, sameColor)){
        return false;
    }

    if(attackingPiece.piece == 'P' || attackingPiece.piece == "N"){
        return true;
    }

    return !canBlockCheck(kingXPos, kingYPos, attackingPiece, sameColor);

}

/**
 * moves the piece provided to the target
 * 
 * @param {string} move the move to perform in the format (initialRank, initialRow, targetRank, targetRow, promotionPiece (optional))
 * @returns 
 * 0 if the move was successfully made
 * 1 if there is no piece at initialRank, initialRow
 * 2 if it is not that players turn
 * 3 if the pawn promotion piece is not specified when it is needed
 * 4 if the piece at (initialRank, initialRow) does not move in the dirrection provided
 * 5 if a piece is blocking movment to (targetRank, targetRow)
 * 6 if the players king would be in check from that move
 * 0 if the position is checkmate
 */
function movePiece(move){

    const initialX = letterToNumber(move.charAt(0));
    const initialY = parseInt(move.charAt(1))-1;

    //exits if no piece is at [initialY][initialX]
    if(boardState[initialY][initialX] == ""){
        return 1;
    }

    const isWhite = boardState[initialY][initialX].charAt(0) == 'W';

    //exits if it is not the current players turn
    if(isWhite!= isWhitesTurn){
        return 2;
    }

    const targetX = letterToNumber(move.charAt(2));
    const targetY = parseInt(move.charAt(3))-1;

    const piece = boardState[initialY][initialX].charAt(1)

    //exits of pawn promotion piece is not specified
    if(piece == 'P' && (targetY == 0 || targetY == 7) && move.length == 4){
        return 3;
    }

    //checks if piece can move to [targetX][targetY]
    if(!movesInThatDirection(initialX, initialY, piece, targetX, targetY, isWhite)){
        return 4;
    }

    if(pieceIsBeingBlocked(initialX, initialY, piece, targetX, targetY)){
        return 5;
    }

    let proposalBoard = boardState.map((arr)=> arr.slice());

    if(!updateBoardForSpecialMove(initialX, initialY, piece, targetX, targetY, proposalBoard, isWhite, move)){
        proposalBoard[targetY][targetX] = proposalBoard[initialY][initialX];
        proposalBoard[initialY][initialX] = "";
    }

    let kingXPos;
    let kingYPos; 
    const kingToFind = (isWhite ? "W":"B") + "K";

    for(let j=0; j<8; j++){
        for(let i=0; i<8; i++){
            if(boardState[j][i] === kingToFind){
                kingXPos = i;
                kingYPos = j;
            }
        }
    }

    if(kingIsInCheck(kingXPos, kingYPos, proposalBoard)){
        return 6;
    }

    updateCastlingandEnpassant(initialX, initialY, piece, targetX, targetY, isWhite);

    isWhitesTurn = !isWhitesTurn;
    boardState = proposalBoard.map((arr)=>arr.slice());

    if(isCheckmate()){
        return 7;
    }

    return 0;
}

module.exports ={
    movePiece : movePiece,
    getBoardState : getBoardState,
    resetGame: resetGame,
    startGame : startGame,
};