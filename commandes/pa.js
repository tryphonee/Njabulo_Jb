const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { fana } = require(__dirname + "/../njabulo/fana");
const os = require("os");
const moment = require("moment-timezone");
const set = require(__dirname + "/../set");

const AUDIO_URL = "https://files.catbox.moe/o6d4l7.mp3"; // New audio URL
const THUMBNAIL_URL = "https://files.catbox.moe/omgszj.jpg"; // New image URL

moment.tz.setDefault(`${set.TZ}`);

const getTimeAndDate = () => {
    return {
        time: moment().format('HH:mm:ss'),
        date: moment().format('DD/MM/YYYY')
    };
};

// Ping Command
fana({ nomCom: "pin", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms } = commandeOptions;
    const { time, date } = getTimeAndDate();
    const ping = Math.floor(Math.random() * 100) + 1; // Generate a random ping between 1ms - 100ms

    try {
        await zk.sendMessage(dest, { 
            audio: { url: AUDIO_URL }, 
            mimetype: 'audio/mp4', 
            ptt: true, // Voice note form
            contextInfo: {
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
              newsletterJid: '120363345407274799@newsletter',
                  newsletterName: "╭••➤®Njabulo Jb",
                  serverMessageId: 143,
                   },
                   forwardingScore: 999, // Score to indicate it has been forwarded
                   externalAdReply: {
                    title: "awlayonline 24/7",
                    body: `online: ${ping}ms\n📅 *Date:* ${date}\n⏰ *Time:* ${time}`,
                    thumbnailUrl: THUMBNAIL_URL,
                    mediaType: 1,
                    renderSmallThumbnail: true // Small thumbnail rendering
                }
            }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Ping Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});

        
