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

fana({ nomCom: "nu", categorie: "General" }, async (dest, zk, commandeOptions) => {
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
                caption: infoMsg,
                footer: "*CASEYRHODES-XMD*, developed by CASEYRHODES",
                gifPlayback: true,
            }, { quoted: ms });
        } else {
            await zk.sendMessage(dest, {
                caption: infoMsg,
                footer: "*CASEYRHODES-XMD*, developed by CASEYRHODES",
            }, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Error sending menu: " + e);
        repondre("🥵🥵 Error sending menu: " + e);
    }
});
