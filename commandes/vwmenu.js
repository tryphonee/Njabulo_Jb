const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

fana({ nomCom: "menu", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo/fana");
    let coms = {};
    let mode = "public";

    if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
    }

    cm.map((com) => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
╭━━━━━━━━━━━━━━━⊷
┃✇╭───────────⊷
┃✇│◎ 𝙾𝚠𝚗𝚎𝚛 : ${s.OWNER_NAME}
┃✇│◎ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${s.PREFIXE} ]
┃✇│◎ 𝙼𝚘𝚍𝚎 : ${mode}
┃✇│◎ 𝚁𝚊𝚖  : 8/132 GB
┃✇│◎ 𝙳𝚊𝚝𝚎  : ${date}
┃✇│◎ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()}
┃✇│◎ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : ɴᴊᴀʙᴜʟᴏ ᴊʙ
┃✇│◎ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : ${cm.length}
┃✇│◎ 𝚃𝚑𝚎𝚖𝚎 : JB
┃✇└───────────⊷
╰━━━━━━━━━━━━━━━⊷\n

🌆Good evening! time to relax

╰━━━••➤•••${readmore}
`;

    let menuMsg = `ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴄᴍᴅ`;
    
    for (const cat in coms) {
        menuMsg += `
⊷━〔 *${cat}* 〕━⊷
╭━━━━━━━━━━━⊷
║◎┊ `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
║◎┊ ${s.PREFIXE}  *${cmd}*`;    
        }
        menuMsg += `
║◎┊
╰━━━━━━━━━━━⊷`;
    }
    
    menuMsg += `
> @ᴍᴀᴅᴇ ʙʏ ɴᴊᴀʙᴜʟᴏ ᴊʙ 2025\n`;

    try {
        const senderName = nomAuteurMessage || message.from;  // Use correct variable for sender name
        await zk.sendMessage(dest, {
            text: infoMsg + menuMsg,
            contextInfo: {
             isForwarded: true,
             forwardedNewsletterMessageInfo: {
              newsletterJid: '120363345407274799@newsletter',
              newsletterName: "NJABULO JB",
              serverMessageId: 143,
               }
            }
        });
    } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});

                  
