const { fana } = require('../njabulo/fana');
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
    isForwarded: true,
      forwardedNewsletterMessageInfo: {
       newsletterJid: '120363345407274799@newsletter',
       newsletterName: "NJABULO JB",
       serverMessageId: 143,
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


// Command to check bot uptime
fana({
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
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
      newsletterJid: '120363345407274799@newsletter',
       newsletterName: "NJABULO JB",
        serverMessageId: 143,
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


    
