import { Bot } from "grammy";
import { mongoDb } from "@/utils/connectDB";
import { User } from "@/models/User";

export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

bot.command("start", async (ctx) => {
  const userIdFromPayload = ctx.message.text.split(" ")[1]; // /start <userId>

  if (!userIdFromPayload) {
    return ctx.reply("❗Please connect from the dashboard.");
  }

  await mongoDb();

  const user = await User.findByIdAndUpdate(
    userIdFromPayload,
    { telegramChatId: ctx.chat.id },
    { new: true }
  );

  if (!user) {
    return ctx.reply("❌ User not found in database.");
  }


  if (user.isAdmin) {
    return await ctx.reply("សូមស្វាគមន៍ អ្នកគ្រប់គ្រង!");
  } else {
    await ctx.reply(`សូមស្វាគមន៍ គណនីរបស់លោកអ្នកបានភ្ជាប់ជាមួយ WBC Logment 
លេខសំគាល់អតិថិជន ID "${user._id}
ឈ្មោះអតិថិជន ៖ ${user.username}"
លេខទូរស័ព្ទ ៖ ${user.phone} 
តាមរយៈសេវាកម្មនេះ លោកអ្នកនឹងទទួលបានព័ត៌មានដោយស្វ័យប្រវត្តិពី WBC Logment

សម្រាប់ព័ត៌មានបន្ថែម សូមទំនាក់ទំនងមកលេខ 086643253  សូមអរគុណ!

ដើម្បីផ្តាច់សេវាកម្មនេះ សូមលោកអ្នកចុច​ /stop`);
  }
});

bot.command("stop", async (ctx) => {
  await mongoDb();
  await User.findOneAndUpdate(
    { telegramChatId: ctx.chat.id },
    { telegramChatId: null }
  );
  await ctx.reply(`លោកអ្នកនឹងមិនទទួលបានព័ត៌មានដោយស្វ័យប្រវត្តិពី WBC Logment ទៀតទេ!

  សម្រាប់ព័ត៌មានបន្ថែម សូមទំនាក់ទំនងមកលេខ 086643253  សូមអរគុណ!
    `);
});

export async function POST(request) {
  const body = await request.json();
  try {
    // 🔧 Ensure the bot is initialized
    if (!bot.isInited()) {
      await bot.init();
    }

    await bot.handleUpdate(body);
  } catch (err) {
    console.error("Telegram bot error:", err);
  }

  // Respond quickly to Telegram with 200 OK
  return new Response("OK", { status: 200 });
}

bot.start();