const { Bot } = require("grammy");

const bot = new Bot("8096550327:AAH2DT6QClmaM3EhuhD3h5zXrDbDaXjg41A"); 

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();