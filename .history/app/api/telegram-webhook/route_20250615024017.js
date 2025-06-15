// app/api/telegram/route.js

import { NextResponse } from 'next/server';
import { Bot, webhookCallback } from 'grammy';

// IMPORTANT: Ensure your TELEGRAM_BOT_TOKEN is set in your .env.local file
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN is not set in environment variables.');
  // In a real application, you might want to throw an error or handle this more gracefully
  // before the application starts, rather than just in the API route.
  // For this example, we'll return an error to highlight the missing token.
  throw new Error('TELEGRAM_BOT_TOKEN is not defined. Please set it in your .env.local file.');
}

// Initialize the grammy bot instance
const bot = new Bot(BOT_TOKEN);

// --- Bot Logic ---
// You define your bot's behavior here.

// Handle the '/start' command
bot.command('start', async (ctx) => {
  const userName = ctx.from?.first_name || 'User';
  await ctx.reply(`Welcome, ${userName}! I'm your Next.js Telegram bot powered by grammy. Send me a message!`);
});

// Handle any text messages
bot.on('message:text', async (ctx) => {
  const userName = ctx.from?.first_name || 'User';
  const messageText = ctx.message.text;

  let responseText = `Hello, ${userName}! You said: "${messageText}"`;

  if (messageText.toLowerCase().includes('hello')) {
    responseText = `Hi there, ${userName}! Nice to hear from you.`;
  }

  await ctx.reply(responseText);
});

// You can add more handlers here for other commands, inline queries, callbacks, etc.
// Example: Respond to a specific phrase
bot.hears('Next.js', async (ctx) => {
  await ctx.reply('Next.js is great for building web applications, including serverless functions like this Telegram bot webhook!');
});

// --- Error Handling (Good practice for grammy) ---
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof Error) {
    console.error(e.message);
    console.error(e.stack);
  } else {
    console.error(e);
  }
});


/**
 * Handles incoming POST requests from Telegram.
 * This function acts as the webhook endpoint for your Telegram bot.
 * grammy's webhookCallback handles the parsing and processing of the update.
 *
 * @param {Request} request The incoming HTTP request object.
 * @returns {Promise<Response>} A Next.js Response object.
 */
export async function POST(request) {
  try {
    // grammy's webhookCallback function takes the request and the Next.js standard http object
    // to process the update.
    // It returns a standard Response object from the Web API, which Next.js understands.
    const response = await webhookCallback(bot, 'std/http')(request);
    return response;
  } catch (error) {
    console.error('Error processing Telegram update with grammy:', error);
    // Even if an error occurs in your bot logic, grammy aims to return a 200 OK to Telegram
    // to prevent retries. However, if there's an error in the webhookCallback itself,
    // we ensure a 200 OK is returned here to avoid Telegram retrying.
    return NextResponse.json({ error: 'Internal server error processing webhook' }, { status: 200 });
  }
}

/**
 * Handles GET requests to the webhook URL.
 * This is usually for verification or testing.
 *
 * @returns {Response} A Next.js Response object.
 */
export async function GET() {
  return NextResponse.json({ message: 'Telegram bot webhook (grammy) is running. Send POST requests.' }, { status: 200 });
}

/*
To make this work with Next.js App Router, ensure your `next.config.js` or `next.config.mjs`
includes the following to allow grammy to use Node.js specific features in the serverless environment:

// next.config.mjs
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['grammy'],
  },
};
export default nextConfig;

*/
