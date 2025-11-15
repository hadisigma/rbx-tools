const express = require('express');
const axios = require('axios');
const router = express.Router();

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1439256970715725957/I9XBEgk59_ZG2GXpfHglmHAkPsBLP6MO4d02OqEYEi29LOtFzslMH4G2hl8kdvDnsYjA';

router.post('/send', async (req, res) => {
  try {
    const { gameId } = req.body;

    if (!gameId || !gameId.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Game-ID ist erforderlich!' 
      });
    }

    const payload = {
      content: "Neue Game Copier Einsendung:",
      embeds: [
        {
          title: "Game Copier Input",
          description: gameId,
          color: 5814783
        }
      ]
    };

    const response = await axios.post(WEBHOOK_URL, payload);

    if (response.status === 204 || response.status === 200) {
      res.json({ 
        success: true, 
        message: 'Webhook erfolgreich gesendet!' 
      });
    } else {
      throw new Error('Unerwartete Antwort vom Discord Webhook');
    }

  } catch (error) {
    console.error('Webhook Error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Fehler beim Senden des Webhooks' 
    });
  }
});

module.exports = router;