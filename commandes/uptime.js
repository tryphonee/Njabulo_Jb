const { fana } = require('../njabulo/fana');
const s = require("../set");
const axios = require("axios");
const speed = require("performance-now");
const { exec } = require("child_process");
const conf = require(__dirname + "/../set");

// Format the uptime into a human-readable string
function runtime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = Math.floor(seconds % 60);
  return `*╭───────────────━⊷*\n*║0 ᴅᴀʏs*\n*║${hours} ʜᴏᴜʀs*\n*║${minutes} ᴍɪɴᴜᴛᴇs*\n*║${secondsLeft} sᴇᴄᴏɴᴅs*\n*╰───...*`;
}
// Command to check bot uptime
fana({
  nomCom: 'uptime',
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
