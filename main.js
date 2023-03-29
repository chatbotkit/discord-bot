require("dotenv/config");

const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Create a new conversation
async function createConversation() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CHATBOTKIT_API_KEY}`,
  };

  const createConversationRes = await fetch(
    "https://api.chatbotkit.com/v1/conversation/create",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        backstory: "This is a friendly chat bot.",
        // model:""
        // datasetId: "",
        // skillsetId:"",
      }),
    }
  );

  if (!createConversationRes.ok) {
    const message = (await createConversationRes.json()).message;
    throw new Error(message);
  }

  const conversationId = (await createConversationRes.json()).id;

  const createTokenRes = await fetch(
    `https://api.chatbotkit.com/v1/conversation/${conversationId}/token/create`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        durationInSeconds: 3600, // in seconds
      }),
    }
  );

  if (!createTokenRes.ok) {
    const message = (await createTokenRes.json()).message;
    throw new Error(message);
  }

  const token = (await createTokenRes.json()).token;

  return { conversationId, token };
}

let conversationId;
let token;

client.on("ready", async () => {
  const res = await createConversation();
  conversationId = res.conversationId;
  token = res.token;
});

client.on("messageCreate", async (message) => {
  // Check if the message was sent by the bot itself
  if (message.author.bot) return;
  // if (message.channel.id !== process.env.CHANNEL_ID) return;  --> Uncomment if you want the chatbot to answer only to certain channels
  // if (message.content.startsWith("-")) return; --> Uncomment if you want the chatbot to answer to every message apart from the ones that start with "-". You can change this to whichever value you want

  await message.channel.sendTyping();

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const sendMessageRes = await fetch(
      `https://api.chatbotkit.com/v1/conversation/${conversationId}/send`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          text: message.content,
        }),
      }
    );

    if (sendMessageRes.ok) {
      const recieveMessageRes = await fetch(
        `https://api.chatbotkit.com/v1/conversation/${conversationId}/receive`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            parse: true,
          }),
        }
      );

      if (recieveMessageRes.ok) {
        const data = await recieveMessageRes.json();
        const botReply = data.text.stripped;

        await message.reply(botReply);
      } else {
        await message.reply(
          `Sorry ${message.author}, I am not quite sure at the moment!`
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.BOT_TOKEN);
