const {SlashCommandBuilder, AttachmentBuilder} = require('discord.js');
const {createCanvas} = require('canvas')
const {makePosition} = require('./chess/drawBoard');
const {movePiece, getBoardState, resetGame} = require('./chess/boardData');
const fs = require('fs');


function validateInput(move){

    if(move.length != 4 && move.length != 5){
        return false;
    }

    for(let i=0; i<4; i++){
        if(i % 2 != 0){
            switch(move.charAt(i)){
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                    break;
                default:
                    return false;
            }
        }
        else{
            switch(move.charAt(i)){
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                case 'F':
                case 'G':
                case 'H':
                    break;
                default:
                    return false;
            }
        }
    }

    if(move.length == 5){
        switch(move.charAt(4)){
            case 'Q':
            case 'N':
            case 'N':
            case 'R':
                break;
            default:
                return false;
        }
    }

    return true;

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("move")
        .setDescription("moves a piece")
        .addStringOption((option)=>
            option.setName('move').setDescription("the move to make")
        ),
    async execute(interaction){

        if(!getBoardState()){
            await interaction.reply("no game has started");
            return;
        }

        let move = interaction.options.getString("move").toUpperCase();

        if(move.localeCompare("STOP") == 0){
            resetGame();
            await interaction.reply("game has been stopped");
            return;
        }


        if(!validateInput(move)){
            await interaction.reply(move + " is not a valid move command");
            return;
        }

        let outputResult = movePiece(move);
        let checkMateFlag = false;


        switch(outputResult){
            case 0:
                break;
            case 1:
                await interaction.reply("There is no piece at " + move.substring(0, 2));
                return;
            case 2:
                await interaction.reply("You can only move your own piece");
                return;
            case 3:
                await interaction.reply("You must specify a promotion piece");
                return;
            case 4:
                await interaction.reply("That piece cannot move that way");
                return;
            case 5:
                await interaction.reply("a piece is blocking movement");
                return;
            case 6:
                await interaction.reply("your king cannot be in check");
                return;
            case 7:
                checkMateFlag = true;
                break;

            default:
                interaction.reply("error code 521");
                return;
        }

        const canvas = createCanvas(425, 425);
        const ctx = canvas.getContext('2d');

        makePosition(ctx, getBoardState());

        const attachment = new AttachmentBuilder(canvas.toBuffer(), {name: 'board.png'});

        if(checkMateFlag){
            resetGame();
            await interaction.reply({content: "Checkmate! The game is over.", files: [attachment]});
        }
        else{
            await interaction.reply({files: [attachment]});
        }
  
    }
};