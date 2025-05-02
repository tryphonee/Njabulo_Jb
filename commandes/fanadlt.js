const { fana } = require(__dirname + "/../njabulo/fana");

// Function to convert text to fancy uppercase font
const toFancyUppercaseFont = (text) => {
    const fonts = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
        'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    };
    return typeof text === 'string' ? text.split('').map(char => fonts[char] || char).join('') : text;
}

// Function to convert text to fancy lowercase font
const toFancyLowercaseFont = (text) => {
    const fonts = {
        'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖',
        'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣'
    };
    return typeof text === 'string' ? text.split('').map(char => fonts[char] || char).join('') : text;
}

// Command to list all bot commands along with descriptions and aliases
fana({
    nomCom: "help",
    reaction: "💗",
    aliases: ["panelist", "commandlist", "cmdlist", "list"],
    desc: "Get bot command list.",
    categorie: "General"
}, async (dest, zk, context) => {
    const { respond, prefix, nomAuteurMessage } = context;
    const commands = require(__dirname + "/../njabulo/fana").cm;

    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    const img = 'https://files.catbox.moe/jcylyv.jpg';
    const imgs = 'https://files.catbox.moe/h4lxeb.jpg';

    let menu = 'list cmd react\n\n';
    let keithList = [];

    // Loop through all commands to fetch the relevant information (commands, description, and aliases)
    commands.forEach((command) => {
        const { nomCom, desc = 'No description available', aliases = 'No aliases', categorie, reaction } = command;

        // Ensure no command with undefined 'nomCom' gets added
        if (nomCom) {
            keithList.push({ nomCom, desc, aliases, categorie, reaction });
        }
    });

    // Sort the command list alphabetically by command name
    keithList.sort((a, b) => a.nomCom.localeCompare(b.nomCom));

    // Format and add each command, description, and alias to the menu
    keithList.forEach(({ nomCom, desc, aliases, categorie, reaction }, index) => {
        menu += `${index + 1}. ${toFancyUppercaseFont(nomCom.trim())}\n`;
        menu += `Description: ${toFancyLowercaseFont(desc)}\n`;
        menu += `Aliases: ${toFancyLowercaseFont(aliases)}\n`;
        menu += `Category: ${toFancyLowercaseFont(categorie)}\n`;
        menu += `Reaction: ${toFancyLowercaseFont(reaction)}\n\n`;
    });

    // Send the formatted menu as a message
    return await zk.sendMessage(dest, {
       image: conf.URL,
        caption: infoMsg + menuMsg,
      contextInfo: {
           isForwarded: true,
           forwardedNewsletterMessageInfo: {
           newsletterJid: '120363345407274799@newsletter',
             newsletterName: "╭••➤®Njabulo Jb",
              serverMessageId: 143,
                },
                forwardingScore: 999, // Score to indicate it has been forwarded
                 externalAdReply: {
                  title: "💬menu list react",
                  body: "📃menu help you react",
                  thumbnailUrl: conf.URL,
                  mediaType: 1,
                  renderSmallThumbnail: true // Small thumbnail rendering
            }
        }
    });
});
      
