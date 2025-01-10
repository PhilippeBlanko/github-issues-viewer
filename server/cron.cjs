// server/cron.js
const cron = require('node-cron');

// Planifier un cron job toutes les 2 minutes
cron.schedule('*/2 * * * *', () => {
  const currentHour = new Date().toLocaleString();  // Obtenir l'heure actuelle
  console.log(`[${currentHour}] - site analyser`);
});
