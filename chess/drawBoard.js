function drawBoard(ctx){

    let even = false;
    for(let x=0; x<8; x++){
        for(let y=0; y<8; y++){
        
            ctx.fillStyle = even ? "#D18B47" : "#FFCE9E";
            ctx.fillRect(50*(x+1)-25,50*y, 50, 50);
            even = !even;
        
        }
        even = !even;
    }

    ctx.fillStyle = "#000000";
    ctx.font = "24px Times New Roman";

    for(let y=8; y>0; y--){
        ctx.fillText(y, 5, 435-y*50);
    }

    const letters = ["A","B","C","D","E","F","G","H"];

    for(let x=0; x<8; x++){
        ctx.fillText(letters[x], 44+(x*50), 420);
    }
}

function makePosition(ctx, board){

    drawBoard(ctx)

    for(let j=7; j>=0; j--){
        for(let i=0; i<8; i++){
            let piece = board[j][i];

            let isWhite = piece.charAt(0) === 'W';
            
            //j+1 is to correct y position
            switch(piece.charAt(1)){
                case 'P':
                    makePawn(ctx, isWhite, i+1, j+1);
                    break;
                case 'R':
                    makeRook(ctx, isWhite, i+1, j+1);
                    break;
                case 'N':
                    makeKnight(ctx, isWhite, i+1, j+1);
                    break;
                case 'B':
                    makeBishop(ctx, isWhite, i+1, j+1);
                    break;
                case 'Q':
                    makeQueen(ctx, isWhite, i+1, j+1);
                    break;
                case 'K':
                    makeKing(ctx, isWhite, i+1, j+1);
                    break;
            }
        }
    }
}

function makePawn(ctx, isWhite, column, row){

    ctx.beginPath();
    ctx.fillStyle = isWhite ? "#FFFFFF" : "#000000";
    ctx.strokeStyle = isWhite ? "#000000" : "#FFFFFF";
    
    const xPos = 50+(column-1) * 50;
    const yPos = 18+(-row+8) *50;
    
    ctx.moveTo(xPos, yPos);
    ctx.lineTo(xPos-20, yPos+30);
    ctx.lineTo(xPos+20, yPos+30);
    ctx.lineTo(xPos, yPos);
    ctx.stroke();
    ctx.fill();
    
    const radius = 10;
    
    ctx.closePath();
    
    
    ctx.beginPath();
    ctx.arc(xPos,yPos,radius,0,2*Math.PI);
    ctx.fill()
    ctx.stroke();
    
};

function makeRook(ctx, isWhite, column, row){

    ctx.beginPath();
    ctx.fillStyle = isWhite ? "#FFFFFF" : "#000000";
    ctx.strokeStyle = isWhite ? "#000000" : "#FFFFFF";
    
    const xPos = 30+(column-1) * 50;
    const yPos = 15+(-row+8) *50;
    
    ctx.moveTo(xPos, yPos);
    ctx.lineTo(xPos+10, yPos+5);
    ctx.lineTo(xPos+30, yPos+5);
    ctx.lineTo(xPos+40, yPos);
    ctx.lineTo(xPos, yPos);
    ctx.fill();
    ctx.stroke();   
    
    ctx.moveTo(xPos+30, yPos+5);
    ctx.lineTo(xPos+30, yPos+30);
    ctx.lineTo(xPos+10, yPos+30);
    ctx.lineTo(xPos+10, yPos+5);
    ctx.lineTo(xPos+30, yPos+5);
    ctx.fill();
    ctx.stroke();
    
    ctx.moveTo(xPos, yPos);
    ctx.lineTo(xPos, yPos-10);
    ctx.lineTo(xPos+10, yPos-10);
    ctx.lineTo(xPos+10, yPos);
    ctx.lineTo(xPos, yPos);
    ctx.fill();
    ctx.stroke();
    
    ctx.moveTo(xPos+40, yPos);
    ctx.lineTo(xPos+40, yPos-10);
    ctx.lineTo(xPos+30, yPos-10);
    ctx.lineTo(xPos+30, yPos);
    ctx.lineTo(xPos+40, yPos);
    ctx.fill();
    ctx.stroke();
    
    ctx.moveTo(xPos+15, yPos);
    ctx.lineTo(xPos+15, yPos-10);
    ctx.lineTo(xPos+25, yPos-10);
    ctx.lineTo(xPos+25, yPos);
    ctx.lineTo(xPos+15, yPos);
    ctx.fill();
    ctx.stroke();
    
    ctx.moveTo(xPos+10, yPos+30);
    ctx.lineTo(xPos, yPos+35);
    ctx.lineTo(xPos+40, yPos+35);
    ctx.lineTo(xPos+30, yPos+30);
    ctx.lineTo(xPos+10, yPos+30);
    ctx.fill();
    ctx.stroke();
    
}

function makeKing(ctx, isWhite, column, row){

    ctx.beginPath();
    ctx.fillStyle = isWhite ? "#FFFFFF" : "#000000";
    ctx.strokeStyle = isWhite ? "#000000" : "#FFFFFF";
    
    const xPos = 5+(column-1)*50;
    const yPos = 7+(-row+8) *50;

       /////left and right sides
    let start = { x: 30+xPos,   y: 30+yPos  };
    let cp1 =   { x:  6+xPos,   y: 12+yPos  };
    let cp2 =   { x: 45+xPos,   y: 9+yPos  };
    let end =   { x: 45+xPos,   y: 30+yPos };

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);

    start = { x: 45+xPos,   y: 30+yPos };
    cp1 =   { x: 45+xPos,   y: 9+yPos  };
    cp2 =   { x: 84+xPos,   y: 12+yPos };
    end =   { x: 60+xPos,   y: 30+yPos };
                
      ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    
    ctx.lineTo(30+xPos,30+yPos);
    ctx.fill();      
      ctx.stroke();
    /////////////
    
    
    ////crown
    const xShiftBase = 42.5;
    const yShiftBase = 11.5;
    
    ctx.moveTo(xShiftBase+xPos,    yShiftBase+yPos);
    ctx.lineTo(xShiftBase+xPos+5,  yShiftBase+yPos);
    ctx.lineTo(xShiftBase+xPos+5,  yShiftBase+yPos-5);
    ctx.lineTo(xShiftBase+xPos+10, yShiftBase+yPos-5);
    ctx.lineTo(xShiftBase+xPos+10, yShiftBase+yPos-5);
    ctx.lineTo(xShiftBase+xPos+10, yShiftBase+yPos-10);
    ctx.lineTo(xShiftBase+xPos+5,  yShiftBase+yPos-10);
    ctx.lineTo(xShiftBase+xPos+5,  yShiftBase+yPos-15);
    ctx.lineTo(xShiftBase+xPos,    yShiftBase+yPos-15);
    ctx.lineTo(xShiftBase+xPos,    yShiftBase+yPos-10);
    ctx.lineTo(xShiftBase+xPos-5,  yShiftBase+yPos-10);
    ctx.lineTo(xShiftBase+xPos-5,  yShiftBase+yPos-5);
    ctx.lineTo(xShiftBase+xPos,    yShiftBase+yPos-5);
    ctx.lineTo(xShiftBase+xPos,    yShiftBase+yPos);
    ctx.fill();
    ctx.stroke();
    /////
    
    /////middle section
    start = { x: 45+xPos,   y: 30+yPos  };
    cp1 =   { x: 35+xPos,   y: 25+yPos  };
    cp2 =   { x: 35+xPos,   y: 10+yPos  };
    end =   { x: 45+xPos,   y: 10+yPos  };

    
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    
    start = { x: 45+xPos,   y: 10+yPos  };
    cp1 =   { x: 55+xPos,   y: 10+yPos  };
    cp2 =   { x: 55+xPos,   y: 25+yPos  };
    end =   { x: 45+xPos,   y: 30+yPos  };
    

    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    ctx.fill();
    ctx.stroke();
    /////////////
    
    //bottom rectangle
    ctx.moveTo(30+xPos,30+yPos);
    ctx.lineTo(30+xPos, 40+yPos);
    ctx.lineTo(60+xPos, 40+yPos);
    ctx.lineTo(60+xPos, 30+yPos);
    ctx.lineTo(30+xPos,30+yPos);
    ctx.fill();
    ctx.stroke();
    ////////

}

function makeQueen(ctx, isWhite, column, row){
    
    ctx.beginPath();
    ctx.fillStyle = isWhite ? "#FFFFFF" : "#000000";
    ctx.strokeStyle = isWhite ? "#000000" : "#FFFFFF";
    
    const xPos = 50+(column-1) * 50;
    const yPos = 18+(-row+8) *50;
    
    ctx.moveTo(xPos,yPos);
    
    const radius = 3;
    
    //crown circles
    ctx.beginPath();
    ctx.arc(xPos-15,yPos,radius,0,2*Math.PI);
    ctx.fill()
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(xPos-5,yPos-5,radius,0,2*Math.PI);
    ctx.fill()
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(xPos+5,yPos-5,radius,0,2*Math.PI);
    ctx.fill()
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(xPos+15,yPos,radius,0,2*Math.PI);
    ctx.fill()
    ctx.stroke();
    //
    
    //crown spikes
    const circleCorner = Math.sqrt(radius*radius/2);
    
    ctx.moveTo(xPos-10,yPos+15); 
    ctx.lineTo(xPos+10,yPos+15);
    ctx.lineTo(xPos+15-circleCorner, yPos+circleCorner);
    ctx.lineTo(xPos+7,yPos+10);
    ctx.lineTo(xPos+5,yPos-2);
    ctx.lineTo(xPos, yPos+10);
    ctx.lineTo(xPos-5,yPos-2);
    ctx.lineTo(xPos-7,yPos+10);
    ctx.lineTo(xPos-15+circleCorner, yPos+circleCorner);
    ctx.lineTo(xPos-10,yPos+15);
    ctx.fill();
    ctx.stroke();
    //
    
    //bottom piece
    ctx.moveTo(xPos-10,yPos+15); 
    ctx.lineTo(xPos-10, yPos+25);
    ctx.lineTo(xPos+10, yPos+25);
    ctx.lineTo(xPos+10, yPos+15);
    ctx.fill();
    ctx.stroke();
    
}

function makeBishop(ctx, isWhite, column, row){
    
    ctx.beginPath();
    ctx.fillStyle = isWhite ? "#FFFFFF" : "#000000";
    ctx.strokeStyle = isWhite ? "#000000" : "#FFFFFF";
    
    const xPos = 40+(column-1) * 50;
    const yPos = 15+(-row+8) *50;
    
    const bottomOffset = 13; 

    let start = { x: 10+xPos,   y: 18+yPos };
    let cp1 =   { x: 15+xPos,   y: 28+yPos  };
    let cp2 =   { x: 30+xPos,   y: 20+yPos  };
    let end =   { x: 30+xPos,   y: 28+yPos  };

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    
    ctx.lineTo(30+xPos, 20+yPos+bottomOffset);
    
    start =   { x: 30+xPos,   y: 20+yPos+bottomOffset  };
    cp1 =   { x: 30+xPos,   y: 12+yPos+bottomOffset  };
    cp2 =   { x: 15+xPos,   y: 20+yPos+bottomOffset  };
    end = { x: 10+xPos,   y: 10+yPos+bottomOffset };
    
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    
    start = { x: 10+xPos,   y: 10+yPos+bottomOffset  };
    cp1 =   { x: 5+xPos,    y: 20+yPos+bottomOffset  };
    cp2 =   { x: -10+xPos,  y: 12+yPos+bottomOffset  };
    end =   { x: -10+xPos,  y: 20+yPos+bottomOffset };
    
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    
    ctx.lineTo(-10+xPos, 28+yPos);
    
    start =      { x: -10+xPos,  y: 28+yPos };
    cp1 =      { x: -10+xPos,  y: 20+yPos  };
    cp2 =      { x: 5+xPos,    y: 28+yPos  };
    end =    { x: 10+xPos,   y: 18+yPos  };
    
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    
    ctx.fill();
       
    ctx.stroke();
    
    
    start =      {x: 10+xPos,   y: 18+yPos  };
    cp1 =      { x: -10+xPos,  y: 10+yPos  };
    cp2 =      { x: -10+xPos,    y: 1+yPos  };
    end =    {x: 10+xPos,   y: -5+yPos  };
    
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    
    start =    {x: 10+xPos,   y: -5+yPos  };
    cp1 =      { x: 30+xPos,    y: 1+yPos  };
    cp2 =      { x: 30+xPos,  y: 10+yPos  };
    end =      {x: 10+xPos,   y: 18+yPos  };
    
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    
    ctx.fill();
    
    ctx.stroke();
    
    ctx.closePath();
    ctx.beginPath();
    
    const xShiftBase = 7.5;
    const yShiftBase = 14;
    
    ctx.fillStyle = isWhite ? "#000000":"#FFFFFF" ;
    
    ctx.moveTo(xShiftBase+xPos,    yShiftBase+yPos);
    ctx.lineTo(xShiftBase+xPos+5,  yShiftBase+yPos);
    ctx.lineTo(xShiftBase+xPos+5,  yShiftBase+yPos-5);
    ctx.lineTo(xShiftBase+xPos+10, yShiftBase+yPos-5);
    ctx.lineTo(xShiftBase+xPos+10, yShiftBase+yPos-5);
    ctx.lineTo(xShiftBase+xPos+10, yShiftBase+yPos-10);
    ctx.lineTo(xShiftBase+xPos+5,  yShiftBase+yPos-10);
    ctx.lineTo(xShiftBase+xPos+5,  yShiftBase+yPos-15);
    ctx.lineTo(xShiftBase+xPos,    yShiftBase+yPos-15);
    ctx.lineTo(xShiftBase+xPos,    yShiftBase+yPos-10);
    ctx.lineTo(xShiftBase+xPos-5,  yShiftBase+yPos-10);
    ctx.lineTo(xShiftBase+xPos-5,  yShiftBase+yPos-5);
    ctx.lineTo(xShiftBase+xPos,    yShiftBase+yPos-5);
    ctx.lineTo(xShiftBase+xPos,    yShiftBase+yPos);
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.fillStyle = isWhite ? "#FFFFFF" : "#000000";
    ctx.arc(xPos+10,yPos-10,4,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    
    
    
}

function makeKnight(ctx, isWhite, column, row){

    ctx.beginPath();
    ctx.fillStyle = isWhite ? "#FFFFFF" : "#000000";
    ctx.strokeStyle = isWhite ? "#000000" : "#FFFFFF";
    
    const xPos = 50+(column-1) * 50;
    const yPos = 18+(-row+8) *50;
    
    ctx.moveTo(xPos-10,yPos+30);
    ctx.lineTo(xPos+20,yPos+30);
    
    start =  { x:  20+xPos,  y: 30+yPos  };
    cp1 =    { x: 18+xPos,  y: 5+yPos  };
    cp2 =    { x: 20+xPos,  y: 9+yPos  };
    end =    { x: xPos,   y: yPos  };
    
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    
    ctx.lineTo(xPos-3,yPos-7);
    ctx.lineTo(xPos-6,yPos);
    ctx.lineTo(xPos-10, yPos+3);
    
    
    start =  { x: xPos-10,  y: yPos+3  };
    cp1 =    { x: -20+xPos,  y: yPos+7  };
    cp2 =    { x: -20+xPos,  y: yPos+15  };
    end =    { x: xPos-20,   y: yPos+20  };
    
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    
    start =  {x: xPos-20,   y: yPos+20  };
    cp1 =    { x: -10+xPos,  y: yPos+15  };
    cp2 =    { x: xPos,  y: yPos+15  };
    end =    { x: xPos,   y: yPos+10  };
    
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    
    
    start =  { x: xPos,   y: yPos+10  };
    cp1 =    { x: xPos,  y: yPos+15  };
    cp2 =    { x: xPos,  y: yPos+15  };
    end =    { x: xPos-10,   y: yPos+30  };
    
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    
    ctx.fill();
    
    ctx.moveTo(xPos-10, yPos+3);
    ctx.lineTo(xPos-7, yPos-7);
    ctx.lineTo(xPos-6,yPos);
    
    ctx.fill();
    
    ctx.moveTo(xPos-20,yPos+20);
    ctx.lineTo(xPos-15,yPos+15);
    
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    
    ctx.fillStyle = isWhite ? "#000000" : "#FFFFFF";
    
    if(ctx.fillStyle === "#000000"){
        ctx.arc(xPos-10,yPos+7,1,0,2*Math.PI);
    }
    else{
        ctx.arc(xPos-10,yPos+7,3,0,2*Math.PI);
    }
    
    
    ctx.fill();
    
    ctx.stroke();
    
};

module.exports ={
    makePosition : makePosition,
};


