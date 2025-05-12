const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

fana({ nomCom: "pl", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo/fana");

    var commandsList = {};
    var mode = (s.MODE).toLocaleLowerCase() !== "yes" ? "private" : "public";

    cm.map((com) => {
        if (!commandsList[com.categorie]) commandsList[com.categorie] = [];
        commandsList[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');

    const time = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    const img = 'https://files.catbox.moe/jcylyv.jpg';
    const imageUrl = 'https://files.catbox.moe/at9zzt.jpg';

    let infoMsg = `
╭━━✧𝐂𝐑𝐈𝐒𝐒  𝐕𝐌𝐃✧━━❖
┊✺┌────••••────⊷
┃✇│◎ 𝙾𝚠𝚗𝚎𝚛 : ${s.OWNER_NAME}
┃✇│◎ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${s.PREFIXE} ]
┃✇│◎ 𝙼𝚘𝚍𝚎 : ${mode}
┃✇│◎ 𝚁𝚊𝚖  : 8/132 GB
┃✇│◎ 𝙳𝚊𝚝𝚎  : ${date}
┃✇│◎ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()}
┃✇│◎ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : 𝐂𝐑𝐈𝐒𝐒 
┃✇│◎ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : ${cm.length}
┃✇│ 𝚃𝚑𝚎𝚖𝚎 : 𝐕𝐄𝐕𝐎
┊   └────••••────⊷
╰━━✧𝐂𝐑𝐈𝐒𝐒  𝐕𝐌𝐃✧━━━◆ \n`;

    let menuMsg = ``;

    for (const category in commandsList) {
        menuMsg += `
╭━━━❂ ${category} ❂⁠⁠⁠⁠━━─••
║╭━━══••══━━••⊷ `;
        for (const cmd of commandsList[category]) {
            menuMsg += `          
║┊◆ ${s.PREFIXE}  *${cmd}*`;
        }
        menuMsg += `
║╰━━══••══━━••⊷
╰════────════◆◆◆`;
    }

    menuMsg += `\n> @𝐌𝐀𝐃𝐄 𝐁𝐘 𝐂𝐑𝐈𝐒𝐒 𝐕𝐄𝐕𝐎`;

  try {
        if (mediaUrl.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                video: { url: mediaUrl },
                caption: infoMsg + menuMsg,
                footer: "*CASEYRHODES-XMD*, developed by CASEYRHODES",
                gifPlayback: true,
                contextInfo: {
                    externalAdReply: {
                        title: "ᴄᴀsᴇʏʀʜᴏᴅᴇs ᴛᴇᴄʜ",
                        body: "Tap here to Join our official channel!",
                        mediaType: 1,
                        thumbnailUrl: conf.GURL,
                        sourceUrl: "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
                        showAdAttribution: true,
                        [renderType]: true, // Apply correct thumbnail size
                    },
                },
            }, { quoted: ms });
        } else {
            await zk.sendMessage(dest, {
                image: { url: mediaUrl },
                caption: infoMsg + menuMsg,
                footer: "*CASEYRHODES-XMD*, developed by CASEYRHODES",
                contextInfo: {
                    externalAdReply: {
                        title: "ᴄᴀsᴇʏʀʜᴏᴅᴇs ᴛᴇᴄʜ",
                        body: "Tap here to Join our official channel!",
                        mediaType: 1,
                        thumbnailUrl: conf.GURL,
                        sourceUrl: "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
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
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Error sending audio: " + e);
        repondre("🥵🥵 Error sending audio: " + e);
    }
});
