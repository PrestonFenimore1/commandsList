const {SlashCommandBuilder, AttachmentBuilder} = require('discord.js');
const {createCanvas} = require('canvas')
const {makePosition} = require('./chess/drawBoard');
const {startGame, getBoardState} = require('./chess/boardData');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("startchessgame")
        .setDescription("starts a chess game"),
    async execute(interaction){

        const canvas = createCanvas(425, 425);
        const ctx = canvas.getContext('2d');

        startGame();

        makePosition(ctx,  getBoardState());

        const attachment = new AttachmentBuilder(canvas.toBuffer(), {name: 'board.png'});

        await interaction.reply({files: [attachment]});
  
    }
};