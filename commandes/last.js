"use strict";
const { fana } = require("../njabulo/fana");
const moment = require("moment-timezone");
const os = require("os");
const s = require("../set");

fana({ 
    nomCom: "last", 
    categorie: "General", 
    reaction: "📜", 
    nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
    const { repondre, prefixe, nomAuteurMessage } = commandeOptions;
    const { cm } = require("../njabulo/fana");
    let coms = {};
    let mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Dar_es_Salaam");
    const hour = moment().hour();
    let greeting = "ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ";
    if (hour >= 12 && hour < 18) greeting = "ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ!";
    else if (hour >= 18) greeting = "ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ!";
    else if (hour >= 22 || hour < 5) greeting = "ɢᴏᴏᴅ ɴɪɢʜᴛ";

    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    const img = 'https://files.catbox.moe/iw6h5w.jpg';

    const infoMsg = `

 
*THANKS FOR USING NJABULO JB!* ✨`;

    try {
        await zk.sendMessage(dest, { 
            image: { url: img },
            caption: infoMsg + menuMsg,
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363288304618280@newsletter",
                    newsletterName: "NJABULO JB",
                    serverMessageId: -1
                },
                forwardingScore: 999,
                externalAdReply: {
                    title: "NJABULO JB MENU",
                    body: "Command List",
                    thumbnailUrl: img,
                    sourceUrl: "https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        await zk.sendMessage(dest, { 
            audio: { 
                url: "https://files.catbox.moe/raje26.mp3"
            }, 
            mimetype: 'audio/mp4', 
            ptt: true,
            caption: "NJABULO-JB SONG",
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363345407274799@newsletter",
                    newsletterName: "NJABULO JB",
                    serverMessageId: -1
                },
                forwardingScore: 999
            }
        });

    } catch (error) {
        console.log("Error:", error);
        repondre("❌ Error displaying menu. Please try again later.");
    }
});
