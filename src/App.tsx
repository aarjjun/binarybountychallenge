import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Wifi, Cpu, Download, AlertCircle } from 'lucide-react';

const MORSE_CODE: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', ' ': '/'
};

const MESSAGE = "THEGRID2025";

// Convert to Morse with proper word spacing
const MORSE_MESSAGE = MESSAGE.split('').map(char => {
  if (char === ' ') return '/';
  return MORSE_CODE[char.toUpperCase()] || char;
}).join(' ');

// Split message into chunks for better readability
const MORSE_CHUNKS = MORSE_MESSAGE.match(/.{1,15}/g) || [];

const SYSTEM_MESSAGES = [
  'INITIALIZING NEURAL NETWORK...',
  'BYPASSING SECURITY PROTOCOLS...',
  'ACCESSING MAINFRAME...',
  'DECRYPTING DATA STREAMS...',
  'SCANNING FOR VULNERABILITIES...',
  'INJECTING PAYLOAD...',
  'ESTABLISHING SECURE CONNECTION...'
];

const HINTS = [
  'PATTERN ANALYSIS: Signal contains repeating sequences',
  'DETECTED: Binary-like structure with two distinct symbols',
  'HISTORICAL CONTEXT: Pre-digital communication methods',
  'ANALYSIS: Dots and dashes detected in sequence',
  'WARNING: International signal patterns identified'
];

function App() {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [glitchLines, setGlitchLines] = useState<string[]>([]);
  const [systemMessage, setSystemMessage] = useState('');
  const [accessAttempts, setAccessAttempts] = useState(0);
  const [capturedData, setCapturedData] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const generateCrypticLines = () => {
      const lines = Array(20).fill('').map(() => {
        const random = Math.random();
        if (random < 0.2) { // Show Morse code with 20% probability
          const chunk = MORSE_CHUNKS[Math.floor(Math.random() * MORSE_CHUNKS.length)];
          
          if (isCapturing) {
            setCapturedData(prev => {
              const newData = [...prev, chunk];
              return newData.slice(-5); // Keep only last 5 entries
            });
          }
          
          return chunk;
        }
        // Generate noise that looks less like Morse code
        return Array(Math.floor(Math.random() * 40))
          .fill('')
          .map(() => {
            const type = Math.random();
            if (type < 0.3) return Math.random() < 0.5 ? '1' : '0';
            if (type < 0.6) return Math.random() < 0.5 ? '#' : '@';
            return Math.random() < 0.5 ? '|' : '/';
          })
          .join('');
      });
      setGlitchLines(lines);
    };

    const interval = setInterval(generateCrypticLines, 2000);
    return () => clearInterval(interval);
  }, [isCapturing]);

  useEffect(() => {
    const cycleSystemMessages = () => {
      const randomMessage = SYSTEM_MESSAGES[Math.floor(Math.random() * SYSTEM_MESSAGES.length)];
      setSystemMessage(randomMessage);
    };

    const interval = setInterval(cycleSystemMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAccessAttempts(prev => prev + 1);
    
    const cleanedUserAnswer = userAnswer.trim().toUpperCase();
    const cleanedMessage = MESSAGE.trim().toUpperCase();
    
    if (cleanedUserAnswer === cleanedMessage) {
      setFeedback('ACCESS GRANTED: SYSTEM COMPROMISED - AUTHENTICATION SUCCESSFUL');
      alert("calling....")
    } else {
      setFeedback(`ACCESS DENIED: INVALID DECRYPTION KEY - ATTEMPT ${accessAttempts + 1}/∞`);
      if (accessAttempts % 3 === 2) { // Show hint every 3 failed attempts
        setShowHint(true);
        setCurrentHint(prev => (prev + 1) % HINTS.length);
      }
    }
  };

  const toggleCapture = () => {
    setIsCapturing(!isCapturing);
    if (!isCapturing) {
      setCapturedData([]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 font-mono">
      <div className="max-w-5xl mx-auto">
        {/* Header with cyber elements */}
        <div className="border-b-2 border-green-500/30 pb-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Terminal className="w-6 h-6 animate-pulse" />
              <h1 className="text-2xl tracking-wider">SYSTEM.BREACH_PROTOCOL</h1>
            </div>
            <div className="flex gap-4">
              <Shield className="w-5 h-5 animate-spin" />
              <Wifi className="w-5 h-5 animate-pulse" />
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-500/70 animate-pulse">
            {systemMessage}
          </div>
        </div>

        {/* Main terminal display */}
        <div className="relative border border-green-500/30 bg-black rounded-lg mb-8 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,255,0,0.05)_0%,_rgba(0,0,0,0.2)_100%)]"></div>
          <div className="absolute inset-0" style={{
            background: 'repeating-linear-gradient(0deg, rgba(0, 255, 0, 0.03) 0px, rgba(0, 255, 0, 0.03) 1px, transparent 1px, transparent 2px)'
          }}></div>
          
          {/* Encrypted data stream */}
          <div className="relative p-6 overflow-hidden h-[500px]" style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}>
            {glitchLines.map((line, index) => (
              <div
                key={index}
                className="whitespace-nowrap font-mono"
                style={{
                  animation: `glitch ${Math.random() * 3 + 1}s infinite`,
                  opacity: Math.random() * 0.7 + 0.3,
                  transform: `translateX(${Math.random() * 10 - 5}px)`
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Data Capture Panel */}
        <div className="border border-green-500/30 rounded-lg p-4 mb-8 backdrop-blur-sm bg-black/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Download className={`w-5 h-5 ${isCapturing ? 'text-red-500 animate-pulse' : ''}`} />
              <span className="text-sm">DATA_STREAM_CAPTURE</span>
            </div>
            <button
              onClick={toggleCapture}
              className={`px-4 py-1 rounded border ${
                isCapturing 
                  ? 'border-red-500/50 text-red-500 bg-red-500/10' 
                  : 'border-green-500/30 hover:bg-green-500/10'
              }`}
            >
              {isCapturing ? 'STOP_CAPTURE' : 'START_CAPTURE'}
            </button>
          </div>
          <div className="font-mono text-sm space-y-2">
            {capturedData.map((line, index) => (
              <div key={index} className="p-2 border border-green-500/20 rounded bg-black/30 tracking-wider">
                {line}
              </div>
            ))}
            {!capturedData.length && (
              <div className="text-green-500/50 text-center py-4">
                NO_CAPTURED_DATA_AVAILABLE
              </div>
            )}
          </div>
        </div>

        {/* Interactive terminal */}
        <div className="border border-green-500/30 rounded-lg p-6 backdrop-blur-sm bg-black/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-sm mb-4">
              <span className="animate-pulse">◉</span>
              <span>DECRYPTION_MODULE.EXE</span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full bg-black/50 border border-green-500/30 rounded p-3 text-green-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder-green-500/30"
                placeholder="ENTER_DECRYPTION_KEY://"
                spellCheck="false"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500/30 text-sm">
                {userAnswer.length}/∞
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500/10 border border-green-500/30 text-green-500 py-2 px-4 rounded hover:bg-green-500/20 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">EXECUTE_DECRYPTION_SEQUENCE</span>
              <div className="absolute inset-0 bg-green-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
          </form>

          {feedback && (
            <div className={`mt-4 p-4 rounded border ${
              feedback.includes('GRANTED') ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
            }`}>
              <div className="flex items-center gap-2">
                <span className="animate-pulse">⚠</span>
                <span>{feedback}</span>
              </div>
              {showHint && !feedback.includes('GRANTED') && (
                <div className="mt-3 pt-3 border-t border-red-500/30 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm opacity-70">SYSTEM ANALYSIS:</div>
                    <div className="text-sm mt-1">{HINTS[currentHint]}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* System metrics */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-xs text-green-500/70">
          <div>CPU_LOAD: {Math.floor(Math.random() * 100)}%</div>
          <div>MEMORY_USAGE: {Math.floor(Math.random() * 100)}%</div>
          <div>NETWORK_LATENCY: {Math.floor(Math.random() * 100)}ms</div>
        </div>
      </div>
    </div>
  );
}

export default App;
