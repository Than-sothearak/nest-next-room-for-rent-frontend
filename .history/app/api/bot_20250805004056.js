import { Bot, webhookCallback } from "grammy";
import "dotenv/config";
import { mongoDb } from "../../utils/connectDB";
import { User } from "../..//models/User";

const token = process.env.TELEGRAM_BOT_TOKEN
if (!token) throw new Error("BOT_TOKEN is unset");
const bot = new Bot(token); // ✅ Now using env variable

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
bot.start();
// export const config = {
//   runtime: "edge",
// };
// export default webhookCallback(bot, "https");