const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const router = express.Router();

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1439256970715725957/I9XBEgk59_ZG2GXpfHglmHAkPsBLP6MO4d02OqEYEi29LOtFzslMH4G2hl8kdvDnsYjA';

// Funktion um Text für Discord zu escapen
function escapeDiscordText(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

router.post('/send', async (req, res) => {
  try {
    const { gameId } = req.body;

    if (!gameId || !gameId.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Game-ID ist erforderlich!' 
      });
    }

    // Wenn länger als 2000 Zeichen oder spezielle Zeichen enthält -> als Datei senden
    if (gameId.length > 2000) {
      const form = new FormData();
      
      form.append('file', Buffer.from(gameId, 'utf-8'), {
        filename: 'game-input.txt',
        contentType: 'text/plain'
      });

      const payload = {
        content: "Neue Game Copier Einsendung (als Datei, da zu lang):"
      };

      form.append('payload_json', JSON.stringify(payload));

      const response = await axios.post(WEBHOOK_URL, form, {
        headers: form.getHeaders()
      });

      if (response.status === 204 || response.status === 200) {
        res.json({ 
          success: true, 
          message: 'Als Datei erfolgreich gesendet! ✓' 
        });
      } else {
        throw new Error('Webhook-Anfrage fehlgeschlagen');
      }

    } else {
      // Normale Nachricht - aber mit escapten Zeichen
      const payload = {
        content: "Neue Game Copier Einsendung:",
        embeds: [
          {
            title: "Game Copier Input",
            description: gameId.substring(0, 4096), // Discord Embed-Limit
            color: 5814783
          }
        ]
      };

      const response = await axios.post(WEBHOOK_URL, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 204 || response.status === 200) {
        res.json({ 
          success: true, 
          message: 'Webhook erfolgreich gesendet! ✓' 
        });
      } else {
        throw new Error('Unerwartete Antwort vom Discord Webhook');
      }
    }

  } catch (error) {
    console.error('Webhook Error:', error.message);
    console.error('Full error:', error.response?.data || error);
    res.status(500).json({ 
      success: false, 
      message: 'Fehler beim Senden. Bitte versuche es erneut.' 
    });
  }
});

module.exports = router;