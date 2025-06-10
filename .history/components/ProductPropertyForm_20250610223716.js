 How to intergrate telegram bot to next js

Integrating a Telegram bot with Next.js typically involves using Next.js API Routes to handle incoming Telegram updates (webhooks) and a Telegram bot library to interact with the Telegram Bot API. Here's a breakdown of the general steps and considerations:

1. Create a Telegram Bot (BotFather)

    Go to Telegram and search for @BotFather. This is the official bot to create and manage your Telegram bots.
    Start a chat with BotFather and type /newbot.
    Follow the instructions to choose a name and username for your bot.
    BotFather will give you a Bot Token. This is crucial for interacting with the Telegram Bot API. Keep it secure and never expose it publicly.

2. Set Up Your Next.js Project

If you don't have one already, create a new Next.js project:
Bash

npx create-next-app@latest my-telegram-bot-app
cd my-telegram-bot-app

3. Install a Telegram Bot Library

A popular and recommended library for Node.js (and thus Next.js) is Grammy.js.
Bash

npm install grammy

4. Configure Next.js for Grammy.js (if using App Router)

If you're using Next.js App Router, you might need to add a configuration to next.config.mjs to allow Grammy to use Node.js specific features:
JavaScript

// file: next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This allows grammy to use Node.js specific features in Next.js App Router
    serverComponentsExternalPackages: ['grammy'],
  },
};

export default nextConfig;

5. Create a Telegram Webhook API Route

Next.js API Routes are perfect for handling webhooks. Create a file like app/api/bot/route.ts (for App Router) or pages/api/bot.ts (for Pages Router). This route will receive POST requests from Telegram when new updates occur.

Example using App Router (app/api/bot/route.ts):
TypeScript

// app/api/bot/route.ts
export const dynamic = 'force-dynamic'; // Ensures dynamic processing, no caching
export const fetchCache = 'force-no-store'; // Ensures no caching of responses

import { Bot, webhookCallback } from 'grammy';

const token = process.env.TELEGRAM_BOT_TOKEN; // Get your bot token from environment variables

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN environment variable is not set.');
}

const bot = new Bot(token);

// Example bot commands/handlers
bot.command('start', async (ctx) => {
  await ctx.reply('Hello! I am your Next.js Telegram bot.');
});

bot.on('message', async (ctx) => {
  await ctx.reply(`You said: ${ctx.message.text}`);
});

// Important: Handle errors
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error for ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error(e);
  }
});

// The webhook handler function
export async function POST(req: Request) {
  try {
    // Grammy's webhookCallback handles the incoming request and dispatches updates
    const handleUpdate = webhookCallback(bot, 'Next.js');
    return await handleUpdate(req);
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response('Error handling update', { status: 500 });
  }
}

6. Environment Variables

Store your TELEGRAM_BOT_TOKEN in a .env.local file (for local development) and configure it in your deployment environment (e.g., Vercel, Netlify).

# .env.local
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN_HERE

7. Deploy Your Next.js Application

To use webhooks, your Next.js application needs to be publicly accessible. Deploy it to a platform like Vercel, Netlify, or your own server.

8. Set the Telegram Bot Webhook

Once your Next.js application is deployed and your API route is live, you need to tell Telegram where to send updates. You can do this using the setWebhook method of the Telegram Bot API.

Replace <YOUR_TELEGRAM_BOT_TOKEN> with your actual token and https://<your-deployment.vercel>.app/api/bot with your deployed API route URL.
Bash

curl https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/setWebhook?url=https://<your-deployment.vercel>.app/api/bot

You should get a true response if it's successful.

Alternative: Polling (less common for production Next.js bots)

While webhooks are generally preferred for production bots due to efficiency, you can also use polling. However, this usually requires a long-running Node.js process, which doesn't align as well with the serverless nature of Next.js API Routes. If you need a persistent bot, you might consider a separate Node.js server for the bot and use Next.js for the frontend.

Key Concepts:

    Telegram Bot API: The interface for interacting with Telegram bots.
    Webhooks: Telegram sends updates directly to your specified URL (your Next.js API route) when there are new messages or events for your bot. This is generally more efficient than polling.
    Polling: Your bot repeatedly asks the Telegram API for new updates.
    API Routes (Next.js): Serverless functions within your Next.js application that can handle HTTP requests. Perfect for webhooks.
    Environment Variables: Securely store sensitive information like your bot token.

This detailed guide should help you get started with integrating your Telegram bot into your Next.js application!

I using next js javascript tell me step by step i alraedy have a project

It sounds like you're using Next.js with JavaScript, and you already have an existing project. Great! Let's walk through the steps to integrate a Telegram bot, focusing on JavaScript and the App Router (as it's the current default and recommended for new projects).

Before You Start (Prerequisites):

    Node.js and npm/yarn: Make sure you have Node.js installed on your system.
    Existing Next.js Project: You already have this, so you're good to go.
    Telegram Bot Token: As mentioned previously, you need to have created your bot via @BotFather on Telegram and have your bot token ready.

Step-by-Step Integration for Next.js (JavaScript, App Router Focus)

Step 1: Install the Telegram Bot Library

Open your terminal, navigate to your Next.js project's root directory, and install grammy.
Bash

npm install grammy
# or if you use yarn:
# yarn add grammy

Step 2: Configure Next.js for Server Components (if using App Router)

If you're using the App Router (the app directory), you need to tell Next.js to allow grammy to run on the server.

    Open your next.config.js file (it might be next.config.mjs if you started with a newer template).

    Add the serverComponentsExternalPackages option within the experimental object.
    JavaScript

    // next.config.js
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      experimental: {
        serverComponentsExternalPackages: ['grammy'],
      },
      // You might have other configurations here
    };

    module.exports = nextConfig;

    Self-correction: The previous answer used mjs, but since you specified JavaScript, js is more likely. The content of the config remains the same.

Step 3: Create an Environment Variable for Your Bot Token

It's crucial to keep your bot token secret. Next.js natively supports environment variables.

    In the root of your project, create a file named .env.local.

    Add your Telegram bot token to this file:

    # .env.local
    TELEGRAM_BOT_TOKEN=YOUR_ACTUAL_TELEGRAM_BOT_TOKEN_HERE

    Remember to replace YOUR_ACTUAL_TELEGRAM_BOT_TOKEN_HERE with the token you got from BotFather.

Step 4: Create the API Route for Your Telegram Webhook

This is where your Next.js application will receive updates from Telegram.

    For App Router:
        Create a directory structure like this: app/api/bot/.
        Inside the bot directory, create a file named route.js.

    my-telegram-bot-app/
    ├── app/
    │   └── api/
    │       └── bot/
    │           └── route.js  <-- This is your webhook API route
    ├── public/
    ├── .env.local
    ├── next.config.js
    ├── package.json
    └── ...

    Add the following code to app/api/bot/route.js:
    JavaScript

    // app/api/bot/route.js
    import { Bot, webhookCallback } from 'grammy';

    // Ensure this route is processed dynamically, not cached
    export const dynamic = 'force-dynamic';
    export const fetchCache = 'force-no-store';

    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN environment variable is not set.');
    }

    const bot = new Bot(token);

    // --- Define your bot's logic here ---

    // Example: Respond to the /start command
    bot.command('start', async (ctx) => {
      await ctx.reply('Hello there! I am your Next.js bot. What can I do for you?');
    });

    // Example: Respond to any text message
    bot.on('message:text', async (ctx) => {
      await ctx.reply(`You said: "${ctx.message.text}"`);
    });

    // Example: Handle unknown commands or messages
    bot.on('message', async (ctx) => {
      // If it's not a text message or a command we specifically handled
      if (!ctx.message.text) {
        await ctx.reply('I received something, but it was not a text message. Try sending some text!');
      } else if (!ctx.message.text.startsWith('/')) { // If it's text but not a command
         // Already handled by message:text, but good for fallback or specific non-text types
      }
    });


    // Optional: Error handling for your bot
    bot.catch((err) => {
      const ctx = err.ctx;
      console.error(`Error for update ${ctx.update.update_id}:`);
      const e = err.error;
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error(e);
      }
    });

    // --- Webhook handler ---

    // This function will be called by Next.js when Telegram sends an update
    export async function POST(req) {
      try {
        // grammy's webhookCallback handles the incoming request (req)
        // and dispatches it to your bot's defined listeners.
        // 'Next.js' is the adapter for Next.js.
        const handleUpdate = webhookCallback(bot, 'Next.js');
        return await handleUpdate(req);
      } catch (error) {
        console.error('Error processing Telegram webhook:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

Step 5: Run Your Next.js Project Locally (for testing)

You can test your API route locally, but you won't be able to set the webhook to localhost directly from Telegram. This step is mainly to ensure there are no syntax errors and the server starts.
Bash

npm run dev
# or:
# yarn dev

Your app will typically run on http://localhost:3000. Your API route will be at http://localhost:3000/api/bot.

Step 6: Deploy Your Next.js Application

For Telegram to send updates via webhook, your Next.js application needs to be publicly accessible on the internet.

    Vercel (Recommended for Next.js):
        Commit your changes to a Git repository (e.g., GitHub).
        Sign up for Vercel (if you haven't).
        Import your Git repository into Vercel.
        During deployment configuration, make sure to add your TELEGRAM_BOT_TOKEN as an Environment Variable in Vercel's project settings (under "Settings" -> "Environment Variables").
        Vercel will deploy your app, and you'll get a public URL (e.g., https://my-telegram-bot-app.vercel.app).

    Other Platforms (Netlify, etc.): The process is similar: connect your Git repo and configure environment variables.

Step 7: Set Your Telegram Bot Webhook

Once your Next.js application is deployed and has a public URL, you need to tell Telegram where to send updates.

    Get your deployed application's URL. For example, if it's deployed to Vercel, it might be https://my-telegram-bot-app.vercel.app.

    Your webhook endpoint will be YOUR_DEPLOYED_URL/api/bot. So, for the example, it would be https://my-telegram-bot-app.vercel.app/api/bot.

    Open your terminal or a web browser and make a GET request to the Telegram Bot API to set the webhook. Replace <YOUR_TELEGRAM_BOT_TOKEN> and <YOUR_WEBHOOK_URL> with your actual values:
    Bash

curl "https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/setWebhook?url=<YOUR_WEBHOOK_URL>"

Example:
Bash

    curl "https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-789_JklmnO/setWebhook?url=https://my-telegram-bot-app.vercel.app/api/bot"

    You should receive a JSON response from Telegram indicating success (e.g., {"ok":true,"result":true,"description":"Webhook was set"}).

Step 8: Test Your Bot!

    Open Telegram.
    Find your bot by its username (e.g., @YourAwesomeNextjsBot).
    Start a chat with it.
    Type /start or any other message you've configured your bot to respond to.
    Your Next.js API route should receive the update, process it, and send a reply back through Telegram.

Troubleshooting Tips:

    Check TELEGRAM_BOT_TOKEN: Double-check that your token in .env.local (and in your deployment environment variables) is correct and matches the one from BotFather.
    Logs: Check the logs of your deployed Next.js application (e.g., Vercel logs) for any errors in your API route.
    Webhook Status: You can check the current webhook information using:
    Bash

    curl "https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/getWebhookInfo"

    This will tell you if the webhook is set, if there are any pending updates, and if there are any last error messages.
    Grammy.js Docs: Refer to the official Grammy.js documentation for more advanced bot functionalities and error handling.

That's it! You now have a Telegram bot integrated with your Next.js application using API Routes and webhooks.

Why install grammy?

You install grammy (or any other Telegram bot framework/library) because it significantly simplifies the process of interacting with the Telegram Bot API. While you could make raw HTTP requests to the Telegram API yourself, grammy provides a high-level abstraction that handles many complexities for you.

Here's a breakdown of why grammy is a good choice, especially for a Next.js environment:

    Simplifies API Interaction:
        Abstraction: Instead of manually constructing URLs, JSON bodies, and handling HTTP requests for every action (sending messages, getting updates, setting webhooks, etc.), grammy provides intuitive methods like bot.reply(), bot.command(), ctx.api.sendMessage().
        Error Handling: It provides built-in mechanisms for handling API errors (e.g., rate limits, invalid tokens), which would be cumbersome to implement from scratch.

    Middleware System (Powerful Feature):
        grammy is built around a powerful middleware concept. This allows you to chain functions that process updates in a structured way. You can have middleware for authentication, logging, session management, command parsing, etc.
        This makes your bot's logic much more modular, readable, and maintainable, especially as your bot grows in complexity.

    Context Object (ctx):
        For every incoming update (message, callback query, etc.), grammy creates a Context object (ctx). This object encapsulates all the relevant information about the update, making it easy to access user data, message text, chat ID, and perform actions related to that specific update.
        This centralizes data and actions for a given interaction.

    Modern and Up-to-Date:
        grammy is actively maintained and quickly supports the latest features and changes in the Telegram Bot API. This is crucial as Telegram frequently updates its API.
        It embraces modern JavaScript/TypeScript practices, making it a joy to work with, especially for developers familiar with current web development standards.

    Excellent TypeScript Support (even for JavaScript users):
        Even if you're writing in JavaScript, grammy's strong TypeScript foundation provides excellent auto-completion and type hints in your IDE. This significantly reduces development errors and makes it easier to understand what methods and properties are available.

    Scalability and Performance:
        grammy is designed to be efficient and performant, which is important for bots that might handle a high volume of traffic.
        Its architecture is well-suited for serverless environments like Next.js API Routes, where fast startup times and efficient resource usage are beneficial.

    Ecosystem and Plugins:
        grammy has a growing ecosystem of official and community-contributed plugins (e.g., for sessions, conversations, interactive menus, auto-retry). These plugins extend the core functionality and save you a lot of development time.

    Community and Documentation:
        It boasts comprehensive and clear documentation, along with an active community where you can find help and examples.

Why not just use raw HTTP requests?

While theoretically possible, writing a Telegram bot without a library like grammy would involve:

    Manually parsing incoming JSON webhooks.
    Constructing correct JSON bodies for every API call (e.g., sendMessage, answerCallbackQuery).
    Handling URL encoding and authentication headers.
    Implementing retry logic for rate limits.
    Creating your own system for routing different types of updates (commands, text messages, inline queries, etc.) to the correct handler functions.
    Managing state and context across different user interactions.

grammy handles all of this boilerplate, allowing you to focus on your bot's unique logic and features, rather than the low-level communication details.

"use client";

import { BiTrash } from "react-icons/bi";

import ChooseImageFile from "./ChooseImageFile";

import { useActionState, useEffect, useState } from "react";

import ProductPropertyForm from "./ProductPropertyForm"; // You can rename this later if desired

import { addRoom, updateRoom } from "@/actions/rooms"; // Adjust import paths & function names accordingly

import Image from "next/image";

import { MdSmsFailed } from "react-icons/md";


export default function RoomForm({

  categories,      // e.g. Room Types, Buildings

  roomId,

  parentCategory,

  room,

}) {

  // State for description text area

  const [description, setDescription] = useState(room?.description || "");


  // Form state initialization with room properties

  const [formData, setFormData] = useState({

    roomName: room?.roomName || "",            // Changed from brandName/productName

    category: room?.category || "",

    description: description,

    parentCategory: room?.parentCategory || "",

    capacity: room?.capacity || "",            // Instead of stock, number of people room can hold

    price: room?.price || "",                  // e.g. rent price

    status: room?.status ? 0 : 1,              // 1 = available, 0 = unavailable

    imageUrls: room?.imageUrls || [],

    properties: room?.properties || [],       // Extra features or amenities

  });


  const [currentProperties, setCurrentProperties] = useState([]);

  const [files, setFiles] = useState([] || null);


  // Remove variants block since rooms usually don’t have variants like products

  // If you want features or amenities you can use properties instead


  const handleRemoveImage = (index) => {

    setFormData((prevFormData) => {

      const removedImage = prevFormData.imageUrls[index];


      return {

        ...prevFormData,

        imageUrls: prevFormData.imageUrls.filter((_, i) => i !== index),

        removedImages: [...(prevFormData.removedImages || []), removedImage],

      };

    });

  };


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({

      ...formData,

      [name]: name === "status" ? Number(value) : value,

    });

  };


  const handleCategoryChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

    const categoryId = e.target.value;

    setCurrentProperties(

      categories.find((category) => category._id === categoryId)?.properties

    );

  };


  const updateRoomWithId = updateRoom.bind(null, roomId);

  const [state, action, isPending] = useActionState(

    roomId ? updateRoomWithId : addRoom,

    undefined

  );


  useEffect(() => {

    setFormData({

      ...formData,

      imageUrls: room?.imageUrls || [],

    });

  }, [room]);


  useEffect(() => {

    if (state?.errors || state?.success) {

      setFiles([]);

    }

  }, [state]);

  console.log(parentCategory)

  return (

    <div className="mt-4 rounded-lg text-black relative">

      <form action={action} className="text-sm">

        <div className="flex max-lg:flex-wrap gap-4">

          <div className="space-y-4 w-full bg-primary rounded-lg">

            {state?.success && (

              <div className="text-sm flex items-center gap-2 p-2 justify-center text-center rounded-t-md bg-green-500 text-primary">

                <MdSmsFailed size={20} /> {state?.message}

              </div>

            )}

            {state?.errors && (

              <div className="text-sm flex items-center gap-2 p-2 justify-center text-center rounded-t-md bg-red-500 text-primary">

                <MdSmsFailed size={20} /> Failed to add room!

              </div>

            )}

            <div className="space-y-4 w-full p-4 bg-primary rounded-lg">

              <h1 className="font-bold text-lg">Basic Information</h1>

              <div className="space-y-4">

                <div>

                  <label className="block font-medium">Room Name/Number</label>

                  <input

                    defaultValue={formData?.roomName}

                    onChange={handleChange}

                    type="text"

                    name="roomName"

                    placeholder="Enter room name or number..."

                    className="w-full p-2 rounded-md mt-2 bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"

                  />

                  {state?.errors?.roomName && (

                    <p className="text-red-500 mt-2">{state.errors.roomName}</p>

                  )}

                </div>

                <div className="flex gap-4">

                  <div className="w-full">

                    <label className="mb-2 block font-medium">Category (Room Type)</label>

                    <select

                      name="category"

                      value={formData?.category}

                      onChange={handleCategoryChange}

                      className="w-full p-2 rounded-md bg-secondary border-none text-xs focus:ring-0 focus:outline-none"

                    >

                      {room?.category && (

                        <option value={room?.category._id}>

                          {formData?.category.category}

                        </option>

                      )}

                      <option value="">Select a category</option>

                      {categories?.map((category) => (

                        <option key={category._id} value={category._id}>

                          {category.category}

                        </option>

                      ))}

                    </select>

                    {state?.errors?.category && (

                      <p className="text-red-500 mt-2">{state.errors.category}</p>

                    )}

                  </div>


                  <div>

                    <label className="block font-medium">Price (per night)</label>

                    <input

                      name="price"

                      onChange={handleChange}

                      placeholder="Enter price"

                      type="number"

                      defaultValue={formData?.price}

                      className="w-full p-2 rounded-md mt-2 bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"

                    />

                    {state?.errors?.price && (

                      <p className="text-red-500 mt-2">{state.errors.price}</p>

                    )}

                  </div>

                </div>


                <div>

                  <label className="block font-medium">Capacity</label>

                  <input

                    onChange={handleChange}

                    defaultValue={formData?.capacity}

                    placeholder="Enter capacity (e.g., number of guests)"

                    name="capacity"

                    type="number"

                    className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"

                  />

                  {state?.errors?.capacity && (

                    <p className="text-red-500 mt-2">{state.errors.capacity}</p>

                  )}

                </div>

              </div>


              <div>

                <label className="block font-medium">Description</label>

                <textarea

                  name="description"

                  type="text"

                  defaultValue={description}

                  onChange={(e) => {

                    setDescription(e.target.value);

                    setFormData({

                      ...formData,

                      description: e.target.value,

                    });

                  }}

                  placeholder="Write a room description"

                  className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"

                  rows="4"

                ></textarea>

              </div>

             

               

       

              <div className="space-y-4 w-full bg-primary rounded-lg">

                <h1 className="text-lg font-bold">Parent Category</h1>

              </div>

              <select

                className=" w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"

                name="parentCategory"

                value={formData?.parentCategory ? formData.parentCategory : ""}

                onChange={handleCategoryChange}

              >

                {room?.parentCategory && (

                  <option value={product.parentCategory._id}>

                    {room?.parentCategory.category}

                  </option>

                )}

                <option value="">Select a category</option>

                {parentCategory?.map((category) => (

                  <option key={category._id} value={category._id}>

                    {category.category}

                  </option>

                ))}

              </select>

         

              <p className="text-xs text-slate-500">

                Select a category that will be the parent of the current one.

              </p>

                  {state?.errors?.parentCategory && (

                    <p className="text-red-500 mt-2">{state.errors.parentCategory}</p>

                  )}

           


              <ProductPropertyForm

                setCurrentProperties={setCurrentProperties}

                categoryProperties={currentProperties}

                productProperties={formData?.properties}

              />


              <ChooseImageFile files={files} setFiles={setFiles} />

            </div>

          </div>

          <div className="w-1/2 max-lg:w-full flex flex-col gap-4">

            <div className="bg-primary p-4 w-full flex flex-col gap-4 rounded-lg">

              <div className="space-y-4 w-full bg-primary rounded-lg">

                <h1 className="text-lg font-bold">Visibility</h1>

              </div>

              <div className="flex gap-4 items-center">

                <div className="flex gap-1 items-center">

                  <input

                    type="radio"

                    id="available"

                    name="status"

                    value={1}

                    checked={formData?.status === 1}

                    onChange={handleChange}

                  />

                  <label>Available</label>

                </div>

                <div className="flex items-center">

                  <input

                    onChange={handleChange}

                    checked={formData?.status === 0}

                    type="radio"

                    id="unavailable"

                    name="status"

                    value={0}

                  />

                  <label>Unavailable</label>

                </div>

              </div>

              <p className="text-xs text-slate-500">

                The room will be affected by the visibility choice.

              </p>

            </div>


            <div className="bg-primary p-4 w-full flex flex-col gap-4 rounded-lg">

              <div className="space-y-4 w-full bg-primary rounded-lg">

                <h1 className="text-lg font-bold">Room Images</h1>

                <div className="flex gap-4 flex-wrap">

                  {formData.imageUrls?.map((image, i) => (

                    <div

                      key={i}

                      className="relative overflow-hidden rounded-lg w-[200px] aspect-video"

                    >

                      <button

                        onClick={(e) => {

                          e.preventDefault();

                          handleRemoveImage(i);

                        }}

                        className="absolute top-2 right-2 rounded-lg bg-primary border border-red-600 hover:bg-red-600 p-1 text-red-600 hover:text-white transition-colors z-10"

                      >

                        <BiTrash />

                      </button>

                      <Image

                        src={image}

                        alt="room image"

                        fill

                        sizes="(max-width: 768px) 100vw, 50vw"

                        className="object-cover"

                      />

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>


        <button

          disabled={isPending}

          type="submit"

          className="bg-primary hover:bg-primary/70 transition-colors px-6 py-2 rounded-md mt-4 text-white text-sm"

        >

          {isPending ? "Saving..." : "Save Room"}

        </button>

      </form>

    </div>

  );

} 