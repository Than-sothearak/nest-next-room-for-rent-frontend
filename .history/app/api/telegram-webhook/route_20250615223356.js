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

  await ctx.reply("សូមស្វាគមន៍»  គណនីរបស់លោកអ្នកបានភ្ជាប់ជាមួយ អគ្គិសនីកម្ពុជា!
លេខសំគាល់អតិថិជន ID ៖ 89896210
ឈ្មោះអតិថិជន ៖ មាស បូរ៉ារិទ្ធី (KHR)
លេខទូរស័ព្ទ ៖ 
អាសយដ្ឋាន ៖ បន្ទប់E108 ផ្ទះ1317 ផ្លូវលំ  ភូមិត្រពាំងល្វា២ សង្កាត់កាកាបទី១ ខណ្ឌពោធិ៍សែនជ័យ រាជធានីភ្នំពេញ
តាមរយៈសេវាកម្មនេះ លោកអ្នកនឹងទទួលបានព័ត៌មានដោយស្វ័យប្រវត្តិពីអគ្គិសនីកម្ពុជា
ដូចជា៖ ព័ត៌មានវិក្កយបត្រ,  ទឹកប្រាក់ដែលបានទូទាត់,  
ថ្ងៃផុតកំណត់របស់វិក្កយបត្រ, ការផ្អាកចរន្ត, សេចក្តីជូនដំណឹង និងព័ត៌មានផ្សេងៗ ។    
«សម្រាប់ព័ត៌មានបន្ថែម សូមទំនាក់ទំនងមកលេខ 1298 »  សូមអរគុណ!");
});

bot.command("stop", async (ctx) => {
  await mongoDb();
  await User.findOneAndUpdate(
    { telegramChatId: ctx.chat.id },
    { telegramChatId: null }
  );
  await ctx.reply("❌ You've unsubscribed from notifications.");
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
