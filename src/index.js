const { Telegraf } = require("telegraf");
const Markup = require("telegraf/markup");

const invoice = {
  provider_token: "https://www.liqpay.ua/checkout/sandbox_i73576075667",
  start_parameter: "Menu",
  title: "AK menu",
  description:
    "Want to visit your great-great-great-grandparents? Make a fortune at the races? Shake hands with Hammurabi and take a stroll in the Hanging Gardens? Order our Working Time Machine today!",
  currency: "uah",
  photo_url:
    "https://img.clipartfest.com/5a7f4b14461d1ab2caaa656bcee42aeb_future-me-fredo-and-pidjin-the-webcomic-time-travel-cartoon_390-240.png",
  is_flexible: true,
  prices: [
    { label: "espresso", amount: 24 },
    { label: "v60", amount: 44 },
  ],
  payload: {
    // coupon: 'BLACK FRIDAY'
  },
};

const shippingOptions = [
  {
    id: "espresso",
    title: "espresso",
    prices: [{ label: "Espresso", amount: 24 }],
  },
  {
    id: "v60",
    title: "v60",
    prices: [{ label: "V60", amount: 44 }],
  },
];

const replyOptions = Markup.inlineKeyboard([
  Markup.payButton("💸 Buy"),
  Markup.urlButton("❤️ @alterkava", "https://www.instagram.com/alterkava"),
]).extra();

// const bot = new Telegraf(process.env.BOT_TOKEN);
const bot = new Telegraf("1080651531:AAFenMl9ykQPq-OYD1bQ0AygoNep1YAYcrU");
// bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
// bot.on("sticker", (ctx) => ctx.reply("👍"));
// bot.hears("hi", (ctx) => ctx.reply("Hey there"));
// bot.launch();

bot.start((ctx) => {
  console.log(ctx, "param");

  // ctx.telegram.sendMessage(ctx.chat.id, "Alternative keybaord layout", {
  //   reply_markup: {
  //     keyboard: [["🔍 Menu", "⭐️Rate Us"]],
  //     resize_keyboard: true,
  //     force_reply: true,
  //   },
  // });

  // );
});

bot.command("buy", ({ replyWithInvoice }) =>
  replyWithInvoice(invoice, replyOptions)
);

// bot.telegram.repl({
//   keyboard: [["🔍 Menu", "⭐️Rate Us"]],
//   resize_keyboard: true,
//   force_reply: true,
// });

bot.on("successful_payment", () => console.log("Woohoo"));

const inlineMessageRatingKeyboard = Markup.inlineKeyboard([
  Markup.callbackButton("👍", "like"),
  Markup.callbackButton("👎", "dislike"),
]).extra();

bot.on("message", (ctx) =>
  ctx.telegram.sendMessage(ctx.from.id, "Like?", inlineMessageRatingKeyboard)
);

bot.launch();
