This is a repository containing all the discord bot commands I have created for Discord.js. Currently only chess is implemented.

How to run:
Download the command files and drop them into an existing Discord bot. The commands will need to be registered to the bot through Discords API before they can be ran.
See https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration for details

How it works:

/startchessgame
is used to initiate the starting board position and allow for the usage of the /move command

/move
is used to move pieces on the board
it accepts a 4 or 5 character string in the form (rank of piece to move, row of pices to move, target rank, target row, promotion piece (optional))

the commands work as follows
/move e4e5 
  will move the piece at e4 to e5 
/move e7e8q 
  will move the pawn on e7 to e8 and promote it to a queen
/move stop
  will stop the chess game


currently only one chess game can be played at a time and any user can move the pieces on the board
