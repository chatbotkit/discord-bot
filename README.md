# ChatBotKit Discord Bot

This is a [ChatBotKit](https://chatbotkit.com) and Discord Bot project. It is a simple example demonstrating how to build and customise your own Discord Bot.

## Getting Started

First, let's create our ChatBotKit API Key. To do so, go to [ChatBotKit](https://chatbotkit.com/tokens) and click on the **Create Token Button**. Copy and Save the newly created token.

Second, you will need to setup your discord application. Go to [Discord Developer Portal](https://discord.com/developers/applications) and click **New Application**. Follow the steps required to setup the integration.

1. Go to your Discord application and navigate to "General Information" to find your Application ID and Public Key.
2. Go to the **Bot** section and click **Reset Token** to obtain your Bot Token. If there is no "Reset Token" button then you may need to add a bot first. Click the **Add Button**.
3. Copy and save the Bot Token.

> Please remember to invite your Discord Bot the server you want the bot to be active

## Installation & Environment Variables

1. Install the dependancies by running

```bash
npm install
```

2. Create a file called `.env`

3. Add your [CHATBOTKIT_API_KEY](https://chatbotkit.com/tokens), [BOT_TOKEN](https://discord.com/developers/applications) like this:

```
CHATBOTKIT_API_KEY=<YOUR TOKEN HERE>
BOT_TOKEN= <YOUR DISCORD BOT TOKEN>
```

Then, run the development server:

```bash
node main.js
```

Open the Discord Server you invited your bot. The Bot should be online and you can start chating with it!
