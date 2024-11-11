const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUVGVFhkMVdQcnZiZExmSk9LSHlidzZSdzJkMWJuSUttSGFqZDRWUFBrND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaEI4MGl1QjVpM2kxZk9NMG94Q1ZPMDJMNW5yRXFEWDVWMTJXQ1kzKzBHQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFREx4c0ZRUTQ3d1RJUHA2eDFlRXBaWnlhTDBqai9vRXFmRlZzcVViZms0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3VEttZE13WE1WazdjWDlRYk5OZmJ0alM1bGZxa3NZWktMOHZFVGlCQm44PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNJRFI0TGVTTm4rSHBVTG4wTlphMjcwa1J4ZnB6LzlYbVM1QW9TOE5BRkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBrVXBtSnRGV1BnSGdvUEQ2Nm0rK3ZZbkhNcm1za3V5OXoyWFFFczFuQkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0x2bkJTZ0kvOCs0Qk1ObXdiaGlDeVA4a2pIa1pteEhSWGtnRjMwbkFHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUFKTjdNVkg0T2VyU2VWQkZTSm9UbHZBNGsxTHkzdDBBcCtoWDRoT0Uwbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRYR1Vzb0N0elhBRzhwM2QwQU1UR3hoZHNiUXQ1dDZIR09JMGNPZmNNeTZzVy8xQWhsM2RaWVp5c3JNblhsa2QwUjhiZUk0cHNYQm9xbjhTWStwdWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE0LCJhZHZTZWNyZXRLZXkiOiJ0b1Vxc0xDTHdjeDRmQS81ZG9DM1RHc3pBSUJQMjJTdWNsRzZJMWRjSmJrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJaLVlMNDZLeVQ4LTg1cEFkbDF6NWpRIiwicGhvbmVJZCI6IjQzMzQ0NGMwLWZjOGYtNDA3Ni05ODdiLTZmNTEwNzc0MzBlMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQMStBL09KanlWUWx4aW95djN4b1NDc000U1U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibjgxbDdpdUd6UEhlcVpyMHQ1cmtXVFFrVm5zPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJKWDZQTUs2IiwibWUiOnsiaWQiOiIyNjM3NzcyOTcxMjg6NTBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2QuvCdkZbwnZGm8J2RoiDwnZGH8J2RnPCdkZrwnZGW8J2RnPCdkZjwnZGOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPbUUzSzhCRUtEbXlia0dHQjBnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJaSVNXd2VSWXVocEQ0NWp5OFJNTkNIcWtDbXl6OWIzU1BLdVRHdmR6dEYwPSIsImFjY291bnRTaWduYXR1cmUiOiI5c2NHN2Z6ck9DQUdYcmdyL1M2cWlxNWtqalY0TXVWTkdWMnRkMVNiT1dxZFpyQ05wOFEzaWNaSTgxc3I1c0t5U2x0OGVrU3ZESFQ0aTdicmN6YVZBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTVpSRm5xcGtzbjN5Um9ZU0kvSTlnZk1tODVOdjR6UkFjSjJOQTF4bTg0cVlWL2hmdFRwMEhXcW5GRW1UU0VFaVl3NFBJSm9TNjQvUUIxd3ErVEZRaWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3NzcyOTcxMjg6NTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV1NFbHNIa1dMb2FRK09ZOHZFVERRaDZwQXBzcy9XOTBqeXJreHIzYzdSZCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMTM1OTUzNCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJMEYifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Giyu",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
