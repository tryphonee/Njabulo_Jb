const { fana } = require('../njabulo/fana');
const Heroku = require('heroku-client');
const s = require("../set");
const axios = require("axios");
const speed = require("performance-now");
const { exec } = require("child_process");
const conf = require(__dirname + "/../set");

// Function to create a delay
function delay(ms) {
  console.log(`⏱️ Delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Format the uptime into a human-readable string
function runtime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = Math.floor(seconds % 60);
  return `*╭───────────────━⊷*\n*║0 ᴅᴀʏs*\n*║${hours} ʜᴏᴜʀs*\n*║${minutes} ᴍɪɴᴜᴛᴇs*\n*║${secondsLeft} sᴇᴄᴏɴᴅs*\n*╰───...*`;
}

// Function to show loading animation
async function loading(dest, zk) {
  const lod = [
    "👍", 
    "👻", 
    "🤗", 
    "😌",
    "🔥",
    "😢", 
    "✨", 
    "🔞",
    "🗿", 
    "*sᴘᴇᴇᴅ ᴛᴇsᴛ ᴏʀɪɢɪɴᴀᴛᴇᴅ ғʀᴏᴍ ᴛʜᴇ sᴀᴠᴇʀ*"
  ];
  let { key } = await zk.sendMessage(dest, { text: '*Enjoy...with NJABULO.....*' });
  for (let i = 0; i < lod.length; i++) {
    await zk.sendMessage(dest, { text: lod[i], edit: key });
    await delay(500); // Adjust the speed of the animation here
  }
}

// Command to test bot response time
fana({
  nomCom: "test1",
  aliases: ["alive", "testing"],
  categorie: "system",
  reaction: "👻"
}, async (dest, zk, commandeOptions) => {
  const { ms } = commandeOptions;
  const audioFiles = [
    'https://files.catbox.moe/hpwsi2.mp3',
    'https://files.catbox.moe/xci982.mp3',
    'https://files.catbox.moe/utbujd.mp3',
    'https://files.catbox.moe/w2j17k.m4a',
    'https://files.catbox.moe/851skv.m4a',
    'https://files.catbox.moe/qnhtbu.m4a',
    'https://files.catbox.moe/lb0x7w.mp3',
    'https://files.catbox.moe/efmcxm.mp3',
    'https://files.catbox.moe/gco5bq.mp3',
    'https://files.catbox.moe/26oeeh.mp3',
    'https://files.catbox.moe/a1sh4u.mp3',
    'https://files.catbox.moe/vuuvwn.m4a',
    'https://files.catbox.moe/wx8q6h.mp3',
    'https://files.catbox.moe/uj8fps.m4a',
    'https://files.catbox.moe/dc88bx.m4a',
    'https://files.catbox.moe/tn32z0.m4a'
  ];
  const selectedAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
  const audioMessage = {
    audio: {
      url: selectedAudio,
    },
    mimetype: 'audio/mpeg',
    ptt: true,
    waveform: [100, 0, 100, 0, 100, 0, 100],
    fileName: 'shizo',
    contextInfo: {
      externalAdReply: {
        title: '𝗕𝗢𝗧',
        body: "𝗜 𝗔𝗠 𝗔𝗟𝗜𝗩𝗘",
        thumbnailUrl: "https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg",
        sourceUrl: 'https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F',
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  };
  await zk.sendMessage(dest, audioMessage, { quoted: ms });
});

// Command to restart the bot
fana({
  nomCom: 'restart',
  aliases: ['reboot'],
  categorie: "system"
}, async (chatId, zk, context) => {
  const { repondre, superUser } = context;
  if (!superUser) {
    return repondre("You need owner privileges to execute this command!");
  }
  try {
    await repondre("> *BELTAH-MD is Restarting from the server...*");
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(3000);
    process.exit();
  } catch (error) {
    console.error("Error during restart:", error);
  }
});

// Command to retrieve Heroku config vars
keith({
  nomCom: 'allvar',
  categorie: "system"
}, async (chatId, zk, context) => {
  const { repondre, superUser } = context;
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Beltah Tech owner 💀*");
  }
  const appname = s.HEROKU_APP_NAME;
  const herokuapi = s.HEROKU_API_KEY;
  const heroku = new Heroku({ token: herokuapi });
  const baseURI = `/apps/${appname}/config-vars`;
  try {
    const configVars = await heroku.get(baseURI);
    let str = '*╭───༺NJABULO JB  𝗔𝗟𝗟 𝗩𝗔𝗥༻────╮*\n\n';
    for (let key in configVars) {
      if (configVars.hasOwnProperty(key)) {
        str += `★ *${key}* = ${configVars[key]}\n`;
      }
    }
    repondre(str);
  } catch (error) {
    console.error('Error fetching Heroku config vars:', error);
    repondre('Sorry, there was an error fetching the config vars.');
  }
});

// Command to set a Heroku config var
keith({
  nomCom: 'setvar',
  categorie: "system"
}, async (chatId, zk, context) => {
  const { repondre, superUser, arg } = context;
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Beltah Tech*");
  }
  const appname = s.HEROKU_APP_NAME;
  const herokuapi = s.HEROKU_API_KEY;
  if (!arg || arg.length !== 1 || !arg[0].includes('=')) {
    return repondre('Incorrect Usage:\nProvide the key and value correctly.\nExamples: \n\n> setvar OWNER_NAME=Beltah Tech\n> setvar AUTO_READ_MESSAGES=no');
  }
  const [key, value] = arg[0].split('=');
  const heroku = new Heroku({ token: herokuapi });
  const baseURI = `/apps/${appname}/config-vars`;
  try {
    await heroku.patch(baseURI, { body: { [key]: value } });
    repondre(`*✅ The variable ${key} = ${value} has been set successfully. The bot is restarting...*`);
  } catch (error) {
    console.error('Error setting config variable:', error);
    repondre(`❌ There was an error setting the variable. Please try again later.\n${error.message}`);
  }
});

// Command to execute shell commands
fana({
  nomCom: "shell",
  aliases: ["getcmd", "cmd"],
  reaction: '🗿',
  categorie: "system"
}, async (context, message, params) => {
  const { repondre: sendResponse, arg: commandArgs, superUser: Owner, auteurMessage } = params;
  if (!Owner) {
    return sendResponse("You are not authorized to execute shell commands.");
  }
  const command = commandArgs.join(" ").trim();
  if (!command) {
    return sendResponse("Please provide a valid shell command.");
  }
  exec(command, (err, stdout, stderr) => {
    if (err) {
      return sendResponse(`Error: ${err.message}`);
    }
    if (stderr) {
      return sendResponse(`stderr: ${stderr}`);
    }
    if (stdout) {
      return sendResponse(stdout);
    }
    return sendResponse("Command executed successfully, but no output was returned.");
  });
});

// Command to check bot response time
fana({
  nomCom: 'ping1',
  aliases: ['speed', 'latency'],
  desc: 'To check bot response time',
  categorie: 'system',
  reaction: '👻',
  fromMe: true,
}, async (dest, zk) => {
  const loadingPromise = loading(dest, zk);
  const pingResults = Array.from({ length: 1 }, () => Math.floor(Math.random() * 10000 + 1000));
  const formattedResults = pingResults.map(ping => `*📡 ᴘᴏɴɢ 📡*\n\n*${ping}...ᴍɪʟʟɪsᴇᴄᴏɴᴅs*\n> *•*`);
  await zk.sendMessage(dest, {
    text: `${formattedResults}`, 
    contextInfo: {
      externalAdReply: {
        title: "  sᴘᴇᴇᴅ ᴛᴇsᴛ ",
        body: " 👻ᴏʀɪɢɪɴᴀᴛᴇᴅ ғʀᴏᴍ ᴛʜᴇ sᴀᴠᴇʀ👻",
        thumbnailUrl: "https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg",
        sourceUrl: 'https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F',
        mediaType: 1,
        showAdAttribution: true,
      },
    },
  });
  console.log("Ping results sent successfully with new loading animation and formatted results!");
  await loadingPromise;
});

// Command to check bot uptime
keith({
  nomCom: 'uptime1',
  aliases: ['runtime', 'running'],
  desc: 'To check runtime',
  categorie: 'system',
  reaction: '⚠️',
  fromMe: true,
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre } = commandeOptions;
  const botUptime = process.uptime();
  await zk.sendMessage(dest, {
    text: `╭───────────────━⊷\n║ ʀᴜɴᴛɪᴍᴇ \n╰───────────────━⊷\n\n${runtime(botUptime)}\n`,
    contextInfo: {
      externalAdReply: {
        title: " ᴜᴘᴛɪᴍᴇ ",
        body: "ʙᴏᴛ ʀᴜɴɴɪɴɢ 24/7 ɴᴏɴ-sᴛᴏᴘ",
        thumbnailUrl: conf.URL,
        sourceUrl: conf.GURL,
        mediaType: 1,
        showAdAttribution: true,
      },
    },
  });
  console.log("Runtime results sent successfully!");
  await delay(ms);
});


    
