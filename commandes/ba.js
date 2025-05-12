const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

fana({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo//fana");
    var coms = {};
    var mode = s.MODE.toLowerCase() !== "yes" ? "private" : "public";

    cm.map(async (com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Nairobi");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Generate greeting based on time of day
    const hour = moment().hour();
    let greeting = "Good Morning";
    if (hour >= 12 && hour < 18) {
        greeting = "Good afternnon!";
    } else if (hour >= 18) {
        greeting = "Good Everning!";
    } else if (hour >= 22 || hour < 5) {
        greeting = "Good Night 🌌";
    }

    let infoMsg = `*╭⊷•━━═━〔 Njabulo_Jb 〕━━═━❁ 𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭*
*┊╭⊷•━━══─══━━⊛*
*┌┤*          
*│║❖┊➻ʙᴏᴛ ɴᴀᴍᴇ :  ɴᴊᴀʙᴜʟᴏ ᴊʙ*
*│║❖┊➻ᴘʀᴇғɪx : [ ${s.PREFIXE} ]*
*│║❖┊➻ᴍᴏᴅᴇ : ${mode}*
*│║❖┊➻ᴅᴀᴛᴇ  : ${date}*          
*│║❖┊➻1𝗠𝗘𝗡𝗨-𝗔𝗜*
*│║❖┊➻2𝗠𝗘𝗡𝗨-𝗚𝗘𝗡𝗘𝗥𝗔𝗟*
*│║❖┊➻3𝗠𝗘𝗡𝗨-𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗*
*│║❖┊➻4𝗠𝗘𝗡𝗨-𝗨𝗦𝗘*
*│║❖┊➻5𝗠𝗘𝗡𝗨-𝗠𝗢𝗗*
*│║❖┊➻6𝗠𝗘𝗡𝗨-𝗙𝗨𝗡*
*│║❖┊➻7𝗠𝗘𝗡𝗨-𝗕𝗢𝗢𝗞𝗦*
*│║❖┊➻8𝗠𝗘𝗡𝗨-𝗦𝗘𝗔𝗥𝗖𝗛*
*│║❖┊➻9𝗠𝗘𝗡𝗨-𝗚𝗥𝗢𝗨𝗣*
*│║❖┊➻10𝗠𝗘𝗡𝗨-𝗖𝗢𝗡𝗧𝗥𝗢𝗟*
*┌┤*
*┊╰─━━═••═━━⊛*
*╰⊷••ɴנαʙυʟσ ᴊв••* `;

    // Two sets of images to display randomly
    const extraImages1 = [
        "https://files.catbox.moe/ihr36r.jpg",
        "https://files.catbox.moe/de5as2.jpg",
        "https://files.catbox.moe/2bpymq.jpg"
    ];

    const extraImages2 = [
        "https://files.catbox.moe/ihr36r.jpg",
        "https://files.catbox.moe/de5as2.jpg",
        "https://files.catbox.moe/2bpymq.jpg"
    ];

    // Randomly select which menu to show
    const isOriginalMenu = Math.random() > 0.5; // 50% chance for either menu

    let mediaUrl, thumbnail, renderType;
    if (isOriginalMenu) {
        mediaUrl = mybotpic(); // Use bot’s original picture
        thumbnail = extraImages1[Math.floor(Math.random() * extraImages1.length)];
        renderType = "renderLargerThumbnail";
    } else {
        mediaUrl = extraImages2[Math.floor(Math.random() * extraImages2.length)];
        thumbnail = mediaUrl; // Use the same image as media
        renderType = "renderSmallThumbnail";
    }

    try {
        if (mediaUrl.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                video: { url: mediaUrl },
                caption: infoMsg,
                footer: "*Njabulo Jb*, developed by Njabulo",
                gifPlayback: true,
                contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                newsletterJid: '120363345407274799@newsletter',
                newsletterName: "╭••➤®Njabulo Jb",
               serverMessageId: 143,
               },
               forwardingScore: 999, // Score to indicate it has been forwarded
                    externalAdReply: {
                        title: "Njabulo Jb menu list",
                        body: "ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ",
                        mediaType: 1,
                        thumbnailUrl: thumbnail,
                        sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
                        showAdAttribution: true,
                        [renderType]: true, // Apply correct thumbnail size
                    },
                },
            }, { quoted: ms });
        } else {
            await zk.sendMessage(dest, {
                image: { url: mediaUrl },
                caption: infoMsg,
                footer: "*Njabulo_Jb*, developed by Njabulo",
                contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                 newsletterJid: '120363345407274799@newsletter',
                 newsletterName: "╭••➤®Njabulo Jb",
                serverMessageId: 143,
                },
                 forwardingScore: 999, // Score to indicate it has been forwarded
                    externalAdReply: {
                        title: "Njabulo Jb menu list",
                        body: "ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ",
                        mediaType: 1,
                        thumbnailUrl: thumbnail,
                        sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
                        showAdAttribution: true,
                        [renderType]: true, // Apply correct thumbnail size
                    },
                },
            }, { quoted: ms });
        }
    } catch (e) {
        console.log("🥵🥵 Error sending menu: " + e);
        repondre("🥵🥵 Error sending menu: " + e);
    }

    // List of audio URLs
    const audioUrls = [
        "https://files.catbox.moe/wsyxi0.mp3",
        "https://files.catbox.moe/w2k8g2.mp3",
        "https://files.catbox.moe/cpjbnl.mp3",
        "https://files.catbox.moe/y6fph9.mp3",
        "https://files.catbox.moe/moctzu.mp3" // New song added
    ];

    // Select a random audio file
    const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

    try {
        await zk.sendMessage(dest, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mpeg',
            ptt: true, // Send as a voice note
             contextInfo: {
             isForwarded: true,
             forwardedNewsletterMessageInfo: {
             newsletterJid: '120363345407274799@newsletter',
             newsletterName: "╭••➤®Njabulo Jb",
             serverMessageId: 143,
           },
         },
       }, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Error sending audio: " + e);
        repondre("🥵🥵 Error sending audio: " + e);
    }
});
  
