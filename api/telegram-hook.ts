import { VercelRequest, VercelResponse } from "@vercel/node";
import { Telegraf } from "telegraf";

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN; // Replace with your bot token
///api.telegram.org/bot{token}/setWebhook?url={url}/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180
//api.telegram.org/bot{token}setWebhook?url=https://mobile-proxies.vercel.app/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180

const bot = new Telegraf(BOT_TOKEN);

// Handle the /start command
export async function handleStartCommand(ctx) {
  const COMMAND = "/start";
  const channelUrl = "t.me/turbosbpns";
  const targetUrl = "t.me/+FLv8adwCG9Y5MWU0";

  // Welcome message with Markdown formatting
  const reply = `
[Tired of chasing rainbows and chasing fake money-making schemes? We're dropping the mic on real, effective ways to make cash flow like a river—no catch, no hassle! Whether you're a beginner or a seasoned pro, our clear, easy-to-follow guides will have you stacking those bills in record time.

Discover:

• 2025 Methods for Bank Logs, CashApp, & PayPal 
• Free Step-by-Step Transfer Guides
• Track 1 & 2 Dumps
• Clones & Exclusive Giveaways](${targetUrl})
`;

  try {
    await ctx.reply(reply, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Join Speed VPNS & Proxies",
              url: channelUrl,
            },
          ]
        ],
      },
    });
    console.log(`Reply to ${COMMAND} command sent successfully.`);
  } catch (error) {
    console.error(`Something went wrong with the ${COMMAND} command:`, error);
  }
}
export async function sendImageCommand(ctx) {
  const media = [
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/walterexer/speed_vpn/main/601e42e8d9a9d31943579187497f4646.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/walterexer/speed_vpn/main/647cfd1ae3b21e7e603179d6c7bc85e6.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/walterexer/speed_vpn/main/ce71aa3b742fa470390736f5418bac39.jpg",
    },
    
  ];
  // Send image first
  await ctx.replyWithMediaGroup(media);
}

// Register the /start command handler
bot.command("start", async (ctx) => {
  // Send image first
  await sendImageCommand(ctx);
  await handleStartCommand(ctx);
});

// Webhook handler
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body, query } = req;

    if (query.setWebhook === "true") {
      const webhookUrl = `${process.env.WEBHOOK_URL}`;
      const success = await bot.telegram.setWebhook(webhookUrl);
      // console.log("Webchook set:", webhookUrl, success);
      return res.status(200).send("OK");
    }

    await bot.handleUpdate(body);
    return res.status(200).send("OK");
  } catch (err) {
    return res.json({ error: "Internal server error" }, { status: 500 });
  }

  // res.status(200).send("OK");
};
