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
    const thumbnail = 'https://files.catbox.moe/jcylyv.jpg';
    const mediaUrl = 'https://files.catbox.moe/at9zzt.jpg';

    let infoMsg = `
╭━〔 *MENU CONTROL*〕━❁ 
│╭━━══─══━━⊛
┌┤ 
│║◆┊➻  *ᴀɴᴛɪᴄᴀʟʟ* 
│║◆┊➻  *ᴀʀᴇᴀᴄᴛ* 
│║◆┊➻  *ʀᴇᴀᴅsᴛᴀᴛᴜs* 
│║◆┊➻  *ᴀɴᴛɪᴅᴇʟᴇᴛᴇ* 
│║◆┊➻  *ᴅᴏᴡɴʟᴏᴀᴅsᴛᴀᴛᴜs* 
│║◆┊➻  *sᴛᴀʀᴛᴍᴇssᴀɢᴇ* 
│║◆┊➻  *ʀᴇᴀᴅᴍᴇssᴀɢᴇ* 
│║◆┊➻  *ᴄʜᴀᴛʙᴏᴛ* 
│║◆┊➻  *ᴘᴜʙʟɪᴄᴍᴏᴅᴇ* 
│║◆┊➻  *ᴀᴜᴛᴏʀᴇᴄᴏʀᴅ* 
│║◆┊➻  *ᴀᴜᴛᴏᴛʏᴘɪɴɢ* 
│║◆┊➻  *ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ* 
│║◆┊➻  *ᴘʀɪᴠᴀᴛᴇᴍᴏᴅᴇ* 
│║◆┊➻  *ᴀᴜᴛᴏʟɪᴋᴇsᴛᴀᴛᴜs* 
│║◆┊➻  *ᴄʜᴀᴛʙᴏᴛ* 
│║◆┊➻  *sᴇᴛᴛɪɴɢs* 
│║◆┊➻  *sᴇᴛᴘʀᴇғɪx* 
│║◆┊➻  *ᴍᴇɴᴜʟɪɴᴋs*
┌┤
┊╰─━━═••═━━⊛ 
╰⊷••@ᴍᴀᴅᴇ ʙʏ ɴᴊᴀʙᴜʟᴏ ᴊ`;
    menuMsg += `
> @ᴍᴀᴅᴇ ʙʏ ɴᴊᴀʙᴜʟᴏ ᴊʙ 2025\n`;
        
    try {
        if (mediaUrl.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                text: infoMsg + menuMsg,
                footer: "*CASEYRHODES-XMD*, developed by CASEYRHODES",
                gifPlayback: true,
                contextInfo: {
                    externalAdReply: {
                        title: "ᴄᴀsᴇʏʀʜᴏᴅᴇs ᴛᴇᴄʜ",
                        body: "Tap here to Join our official channel!",
                        mediaType: 1,
                        thumbnailUrl: mediaUrl,
                        sourceUrl: "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
                        showAdAttribution: true,
                    },
                },
            }, { quoted: ms });
        } else {
            await zk.sendMessage(dest, {
                caption: infoMsg + menuMsg,
                footer: "*CASEYRHODES-XMD*, developed by CASEYRHODES",
                contextInfo: {
                    externalAdReply: {
                        title: "ᴄᴀsᴇʏʀʜᴏᴅᴇs ᴛᴇᴄʜ",
                        body: "Tap here to Join our official channel!",
                        mediaType: 1,
                        thumbnailUrl: mediaUrl,
                        sourceUrl: "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
                        showAdAttribution: true,
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
