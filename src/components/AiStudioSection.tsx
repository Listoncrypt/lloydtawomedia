import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, Image as ImageIcon, Send, Download, RefreshCw, Trash2, Copy, Check, Camera, Aperture, SunMedium, Film, Bot, User, AlertCircle } from 'lucide-react';
import { ChatMessage, GeneratedImageRecord } from '../types';

export const AiStudioSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image-gen' | 'chat'>('image-gen');

  // ==========================================
  // 1. IMAGE GENERATION STATE
  // ==========================================
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [filmLook, setFilmLook] = useState('Kodak Vision3 500T 35mm Grain');
  const [camera, setCamera] = useState('Arri Alexa Mini LF');
  const [lens, setLens] = useState('Panavision Ultra Vista Anamorphic');
  const [lighting, setLighting] = useState('Low-Key Golden Hour with Negative Fill');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [historyImages, setHistoryImages] = useState<GeneratedImageRecord[]>([
    {
      id: 'default-1',
      url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop',
      prompt: 'Cinematic espionage night scene in Wellington rain, blue neon and amber sodium vapor street reflections.',
      originalPrompt: 'Wellington espionage rain scene',
      imageSize: '1K',
      aspectRatio: '16:9',
      filmLook: 'Kodak Vision3 500T',
      camera: 'Arri Alexa Mini LF',
      lens: 'Panavision Anamorphic',
      timestamp: 'Sample',
      model: 'gemini-3-pro-image-preview'
    },
    {
      id: 'default-2',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
      prompt: 'Aerochrome infrared surreal landscape in New Zealand Southern Alps, ruby red foliage against obsidian black sky.',
      originalPrompt: 'Aerochrome infrared New Zealand landscape',
      imageSize: '2K',
      aspectRatio: '16:9',
      filmLook: 'Aerochrome Infrared (LLoyd Tawo Films Style)',
      camera: 'Custom Infrared Full Frame',
      lens: 'Leica R Vintage',
      timestamp: 'Sample',
      model: 'gemini-3-pro-image-preview'
    }
  ]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImageRecord | null>(historyImages[0]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Preset prompts
  const samplePrompts = [
    {
      label: 'Espionage Noir',
      prompt: 'A solitary intelligence detective in a trenchcoat standing on a rain-slicked Wellington pier under amber sodium streetlights at midnight.',
      look: 'Kodak Vision3 500T 35mm Grain',
      cam: 'Arri Alexa Mini LF',
      glass: 'Panavision Ultra Vista Anamorphic',
      light: 'Low-Key Noir Chiaroscuro with Neon Reflections'
    },
    {
      label: 'Aerochrome Infrared',
      prompt: 'Surreal coastal New Zealand shoreline in aerochrome infrared: glowing scarlet crimson native trees, obsidian dark ocean waves, fine silver clouds.',
      look: 'Aerochrome Infrared (LLoyd Tawo Films Style)',
      cam: 'Custom Infrared Full Frame',
      glass: 'Leica R Vintage Primes',
      light: 'Direct Daylight High Contrast'
    },
    {
      label: 'Concert Spotlight',
      prompt: 'A solo folk musician singing with an acoustic guitar in an atmospheric timber auditorium, cut through by a single warm golden volumetric spotlight with rising stage haze.',
      look: 'Fujifilm Eterna 500 Cinema',
      cam: 'Canon Cinema C500 Mark II',
      glass: 'DZO Vespid Cinema Primes',
      light: 'Single Hard Tungsten Backlight with Haze'
    },
    {
      label: 'Commercial Fashion',
      prompt: 'Modern high-fashion editorial portrait against brutalist concrete architecture at dusk, soft cool twilight fill and subtle magenta rim lighting.',
      look: 'Cinematic 35mm Film Grain',
      cam: 'Sony Venice 2 6K',
      glass: 'Cooke Speed Panchro Vintage',
      light: 'Soft Twilight Ambient + Warm Practical Rim'
    }
  ];

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    setIsGeneratingImage(true);
    setImageError(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          model: 'gemini-3-pro-image-preview',
          imageSize,
          aspectRatio,
          filmLook,
          camera,
          lens,
          lighting
        })
      });

      const data = await response.json();

      if (!response.ok || !data.imageUrl) {
        throw new Error(data.error || 'Failed to generate frame. Please try again.');
      }

      const newRecord: GeneratedImageRecord = {
        id: `gen-${Date.now()}`,
        url: data.imageUrl,
        prompt: data.prompt,
        originalPrompt: prompt,
        imageSize: data.imageSize || imageSize,
        aspectRatio: data.aspectRatio || aspectRatio,
        filmLook,
        camera,
        lens,
        timestamp: new Date().toLocaleTimeString(),
        model: data.model || 'gemini-3-pro-image-preview'
      };

      setHistoryImages((prev) => [newRecord, ...prev]);
      setSelectedImage(newRecord);
    } catch (err: any) {
      console.error('Image gen error:', err);
      setImageError(err?.message || 'Error communicating with Gemini Image model.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // ==========================================
  // 2. GEMINI MULTI-TURN CHAT STATE
  // ==========================================
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Welcome! I'm Lloyd Tawo's AI Cinematography Assistant for LLoyd Tawo Films, powered by Gemini. 

Whether you're planning a feature film, television series, documentary, or commercial, I can help you with:
• Camera & Sensor packages (Arri LF vs Venice vs Canon C500 mk2)
• Optics & Character (Panavision Anamorphic, Cooke, DZO Vespid, Leica vintage)
• Lighting schematics & naturalistic mood design
• Infrared & experimental cinematography techniques
• Production inquiries & shooting in New Zealand

How can I assist your visual storytelling today?`,
      timestamp: 'Studio Bot',
      model: 'gemini-3.5-flash'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatModel, setChatModel] = useState<'gemini-3.1-pro-preview' | 'gemini-3.5-flash' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');
  const [chatRole, setChatRole] = useState<'cinematographer' | 'lighting_specialist' | 'director_collaborator' | 'booking_assistant'>('cinematographer');
  const [isChatSending, setIsChatSending] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatSending]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isChatSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsChatSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          model: chatModel,
          role: chatRole
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get answer from Gemini.');
      }

      const botMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply || 'No response received.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model || chatModel
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `Error: ${err.message || 'Unable to connect to Gemini API. Please verify the server setup.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: chatModel
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsChatSending(false);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const quickChatPrompts = [
    'How would you light a low-budget night exterior in the rain?',
    'Explain the visual difference between Panavision Anamorphic and spherical cinema primes.',
    'What camera setup would you recommend for an intimate cultural documentary in New Zealand?',
    'Give me a detailed lighting schematic for a car interior scene at dusk.'
  ];

  return (
    <section id="ai-studio" className="py-24 max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 bg-black text-white border-t border-zinc-900">
      <div className="flex gap-4 sm:gap-6 items-stretch">
        {/* Left Rotated Sidebar Label: `AI STUDIO` */}
        <div className="hidden md:flex flex-col items-center justify-center shrink-0 pr-2">
          <span className="vertical-text font-mono text-xs tracking-[0.35em] text-white uppercase select-none font-medium whitespace-nowrap">
            AI STUDIO
          </span>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-12">
          {/* Section Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white pb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-zinc-400 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI CINEMATOGRAPHY LAB • POWERED BY GEMINI</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-mono uppercase font-semibold text-white tracking-tight">
                AI CINEMA LAB & ASSISTANT
              </h2>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center bg-black border border-white p-1">
              <button
                id="ai-tab-image-gen"
                onClick={() => setActiveTab('image-gen')}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'image-gen'
                    ? 'bg-white text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>FRAME GENERATOR (GEMINI 3 PRO IMAGE)</span>
              </button>

              <button
                id="ai-tab-chat"
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-white text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>GEMINI CHATBOT</span>
              </button>
            </div>
          </div>

          {/* TAB 1: AI CINEMATIC FRAME GENERATOR */}
          {activeTab === 'image-gen' && (
            <div className="space-y-8">
              {/* Top Prompt Presets */}
              <div className="space-y-3">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400">
                  INSPIRATIONAL CINEMA PRESETS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPrompt(p.prompt);
                        setFilmLook(p.look);
                        setCamera(p.cam);
                        setLens(p.glass);
                        setLighting(p.light);
                      }}
                      className="p-4 bg-black hover:bg-zinc-950 border border-zinc-800 hover:border-white text-left transition-all group cursor-pointer font-mono"
                    >
                      <div className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-zinc-200">
                        {p.label}
                      </div>
                      <div className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                        {p.prompt}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Generator Grid: Controls + Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Form Controls (5 cols) */}
                <div className="lg:col-span-5 bg-black border border-white p-6 space-y-5 font-mono text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 flex items-center justify-between">
                      <span>SCENE DESCRIPTION / PROMPT</span>
                      <span className="text-zinc-500">gemini-3-pro-image-preview</span>
                    </label>
                    <textarea
                      rows={3}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g. A character running across a stormy black sand beach in Auckland at sunset, wet sand reflections, heavy ocean spray..."
                      className="w-full bg-zinc-950 border border-zinc-700 focus:border-white p-3 text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none font-mono text-xs leading-relaxed"
                    />
                  </div>

                  {/* RESOLUTION AFFORDANCE (1K, 2K, 4K) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>RESOLUTION / IMAGE SIZE</span>
                      </span>
                      <span className="text-amber-400 font-bold">gemini-3-pro-image</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['1K', '2K', '4K'] as const).map((size) => (
                        <button
                          key={size}
                          type="button"
                          id={`btn-size-${size}`}
                          onClick={() => setImageSize(size)}
                          className={`py-2 px-3 text-xs font-mono font-bold transition-all border cursor-pointer ${
                            imageSize === size
                              ? 'bg-white text-black border-white'
                              : 'bg-black text-zinc-400 hover:text-white border-zinc-800'
                          }`}
                        >
                          {size} RESOLUTION
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aspect Ratio */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                      ASPECT RATIO
                    </label>
                    <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                      {[
                        { id: '16:9', label: '16:9' },
                        { id: '4:3', label: '4:3' },
                        { id: '1:1', label: '1:1' },
                        { id: '9:16', label: '9:16' }
                      ].map((ar) => (
                        <button
                          key={ar.id}
                          type="button"
                          onClick={() => setAspectRatio(ar.id)}
                          className={`py-1.5 px-2 text-[11px] transition-colors border cursor-pointer ${
                            aspectRatio === ar.id
                              ? 'bg-white text-black font-bold border-white'
                              : 'bg-black text-zinc-400 hover:text-white border-zinc-800'
                          }`}
                        >
                          {ar.id}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Film Stock / Look */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-zinc-400" />
                      <span>FILM STOCK / COLOR TEXTURE</span>
                    </label>
                    <select
                      value={filmLook}
                      onChange={(e) => setFilmLook(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 focus:border-white px-3 py-2 text-white focus:outline-none font-mono"
                    >
                      <option value="Kodak Vision3 500T 35mm Grain">Kodak Vision3 500T (Organic 35mm Grain)</option>
                      <option value="Fujifilm Eterna 500 Cinema">Fujifilm Eterna 500 (Subtle Pastels)</option>
                      <option value="Aerochrome Infrared (LLoyd Tawo Films Style)">Aerochrome Infrared (LLoyd Tawo Films Crimson Spectrum)</option>
                      <option value="Eastman Double-X Monochrome">Eastman Double-X (Classic B&W Film)</option>
                      <option value="Arri Alexa Raw Clean Natural">Arri Alexa Raw (Pristine Organic Skin)</option>
                      <option value="16mm Vintage Halation">16mm Vintage Halation & Glow</option>
                    </select>
                  </div>

                  {/* Camera Body */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-zinc-400" />
                      <span>CAMERA BODY</span>
                    </label>
                    <select
                      value={camera}
                      onChange={(e) => setCamera(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 focus:border-white px-3 py-2 text-white focus:outline-none font-mono"
                    >
                      <option value="Arri Alexa Mini LF">Arri Alexa Mini LF (Large Format 4.5K)</option>
                      <option value="Canon Cinema EOS C500 Mark II">Canon Cinema EOS C500 Mark II (5.9K Full Frame)</option>
                      <option value="Sony Venice 2 6K Sensor">Sony Venice 2 (6K Dual ISO)</option>
                      <option value="Custom Infrared Full Frame">Custom Infrared Full Frame Sensor (720nm)</option>
                      <option value="Arriflex 435 35mm Film Camera">Arriflex 435 (35mm Motion Picture Film)</option>
                    </select>
                  </div>

                  {/* Optics / Lenses */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-1.5">
                      <Aperture className="w-3.5 h-3.5 text-zinc-400" />
                      <span>CINEMA OPTICS / LENS SET</span>
                    </label>
                    <select
                      value={lens}
                      onChange={(e) => setLens(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 focus:border-white px-3 py-2 text-white focus:outline-none font-mono"
                    >
                      <option value="Panavision Ultra Vista Anamorphic">Panavision Ultra Vista 1.65x Anamorphic</option>
                      <option value="DZO Vespid Cinema Primes (T2.1)">DZO Vespid Cinema Primes (Crisp Falloff)</option>
                      <option value="Cooke Speed Panchro Vintage Primes">Cooke Speed Panchro ("Cooke Look" Warmth)</option>
                      <option value="Kowa Evolution 2x Anamorphic">Kowa Evolution 2x Anamorphic (Vintage Flares)</option>
                      <option value="Leica R Summicron Cine-Mod">Leica R Summicron Cine-Mod (Smooth Bokeh)</option>
                    </select>
                  </div>

                  {/* Lighting Setup */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-1.5">
                      <SunMedium className="w-3.5 h-3.5 text-zinc-400" />
                      <span>LIGHTING ATMOSPHERE</span>
                    </label>
                    <select
                      value={lighting}
                      onChange={(e) => setLighting(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 focus:border-white px-3 py-2 text-white focus:outline-none font-mono"
                    >
                      <option value="Low-Key Golden Hour with Negative Fill">Low-Key Golden Hour with Negative Fill</option>
                      <option value="Moody Rain Night with Neon & Sodium Reflections">Moody Rain Night with Neon & Sodium Reflections</option>
                      <option value="Soft Diffused Overcast Daylight Through Window">Soft Diffused Overcast Daylight</option>
                      <option value="Dramatic Chiaroscuro Single Key Light">Dramatic Chiaroscuro Single Key Light</option>
                      <option value="Molten Industrial Tungsten & Fiery Sparks">Molten Industrial Tungsten & Sparks</option>
                    </select>
                  </div>

                  {/* Generate Button */}
                  <button
                    type="button"
                    id="generate-frame-btn"
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage || !prompt.trim()}
                    className="w-full py-3.5 px-5 bg-white hover:bg-zinc-200 disabled:opacity-50 text-black font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isGeneratingImage ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-black" />
                        <span>RENDERING {imageSize} CINEMATIC FRAME...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-black" />
                        <span>RENDER FRAME ({imageSize} / GEMINI 3 PRO IMAGE)</span>
                      </>
                    )}
                  </button>

                  {imageError && (
                    <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{imageError}</span>
                    </div>
                  )}
                </div>

                {/* Right: Rendered Frame Display & History (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Main Active Frame Card */}
                  {selectedImage && (
                    <div className="bg-black border border-white p-4 space-y-4 font-mono text-xs">
                      <div className="relative aspect-video bg-zinc-950 border border-zinc-800 overflow-hidden group">
                        <img
                          src={selectedImage.url}
                          alt={selectedImage.prompt}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 bg-black/90 text-white backdrop-blur-sm border border-white font-bold">
                            {selectedImage.imageSize} RESOLUTION
                          </span>
                          <span className="text-[9px] font-mono px-2 py-0.5 bg-black/80 text-zinc-300 backdrop-blur-sm border border-zinc-700">
                            {selectedImage.model}
                          </span>
                        </div>

                        {/* Bottom action bar */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                          <a
                            href={selectedImage.url}
                            download={`lloyd-tawo-cinematic-frame-${selectedImage.id}.png`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 bg-white text-black font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 hover:bg-zinc-200 transition-colors font-bold"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>DOWNLOAD HIGH-RES</span>
                          </a>
                        </div>
                      </div>

                      {/* Metadata breakdown */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                              RENDERED PROMPT
                            </span>
                            <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                              {selectedImage.prompt}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(selectedImage.prompt);
                              setCopiedPrompt(true);
                              setTimeout(() => setCopiedPrompt(false), 2000);
                            }}
                            className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs shrink-0 cursor-pointer border border-zinc-700"
                            title="Copy Prompt"
                          >
                            {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-zinc-900 text-[10px] font-mono text-zinc-400">
                          <div>
                            <span className="block text-zinc-600 text-[9px]">CAMERA</span>
                            <span className="text-white font-medium">{selectedImage.camera.split(' ')[0]}</span>
                          </div>
                          <div>
                            <span className="block text-zinc-600 text-[9px]">LENS</span>
                            <span className="text-white font-medium">{selectedImage.lens.split(' ')[0]}</span>
                          </div>
                          <div>
                            <span className="block text-zinc-600 text-[9px]">LOOK</span>
                            <span className="text-white font-medium truncate block">{selectedImage.filmLook.split(' ')[0]}</span>
                          </div>
                          <div>
                            <span className="block text-zinc-600 text-[9px]">SIZE</span>
                            <span className="text-white font-bold">{selectedImage.imageSize}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* History Gallery */}
                  <div className="space-y-3 font-mono">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 flex items-center justify-between">
                      <span>GENERATED FRAMES STREAM ({historyImages.length})</span>
                      <span className="text-zinc-600">Click to preview</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {historyImages.map((rec) => (
                        <div
                          key={rec.id}
                          onClick={() => setSelectedImage(rec)}
                          className={`relative aspect-video overflow-hidden border cursor-pointer group transition-all bg-zinc-950 ${
                            selectedImage?.id === rec.id
                              ? 'border-white ring-1 ring-white'
                              : 'border-zinc-800 hover:border-zinc-500'
                          }`}
                        >
                          <img
                            src={rec.url}
                            alt={rec.prompt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-1 right-1 px-1 py-0.2 text-[8px] font-mono bg-black/90 text-white font-bold">
                            {rec.imageSize}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GEMINI CINEMATOGRAPHY MULTI-TURN CHAT */}
          {activeTab === 'chat' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-mono">
              {/* Left Controls / Roles & Model selection (4 cols) */}
              <div className="lg:col-span-4 space-y-6 bg-black border border-white p-6 text-xs">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    ASSISTANT ROLES & CONFIGURATION
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Customize the AI persona and Gemini model tier
                  </p>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 block">
                    ASSISTANT ROLE / PERSONA
                  </label>
                  <div className="space-y-1.5">
                    {[
                      {
                        id: 'cinematographer',
                        label: 'Lloyd Tawo (LLoyd Tawo Films)',
                        desc: 'Natural light, lens character, artistic intuition'
                      },
                      {
                        id: 'lighting_specialist',
                        label: 'Chief Lighting Tech / Gaffer',
                        desc: 'Schematics, ratios, power, diffusion'
                      },
                      {
                        id: 'director_collaborator',
                        label: 'Director & Lookbook Partner',
                        desc: 'Shot lists, visual references, treatments'
                      },
                      {
                        id: 'booking_assistant',
                        label: 'Production & Booking Agent',
                        desc: 'Kit availability, rates, New Zealand locations'
                      }
                    ].map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setChatRole(r.id as any)}
                        className={`w-full p-3 text-left transition-all border cursor-pointer ${
                          chatRole === r.id
                            ? 'bg-zinc-900 border-white text-white'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
                        }`}
                      >
                        <div className={`font-bold ${chatRole === r.id ? 'text-white' : 'text-zinc-300'}`}>
                          {r.label}
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">
                          {r.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gemini Model Choice */}
                <div className="space-y-2 pt-3 border-t border-zinc-900">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 block">
                    GEMINI MODEL TIER
                  </label>
                  <div className="space-y-1.5">
                    {[
                      {
                        id: 'gemini-3.1-pro-preview',
                        label: 'gemini-3.1-pro-preview',
                        desc: 'Complex tasks (lighting math, scene breakdowns)'
                      },
                      {
                        id: 'gemini-3.5-flash',
                        label: 'gemini-3.5-flash',
                        desc: 'General tasks (visual ideas, treatments, advice)'
                      },
                      {
                        id: 'gemini-3.1-flash-lite',
                        label: 'gemini-3.1-flash-lite',
                        desc: 'Fast tasks (quick gear checks & specs)'
                      }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setChatModel(m.id as any)}
                        className={`w-full p-3 text-left transition-all border cursor-pointer ${
                          chatModel === m.id
                            ? 'bg-white text-black border-white font-bold'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{m.label}</span>
                          {chatModel === m.id && <span className="text-[9px] bg-black text-white px-1.5 py-0.5 font-bold">ACTIVE</span>}
                        </div>
                        <div className={`text-[10px] mt-0.5 ${chatModel === m.id ? 'text-zinc-700' : 'text-zinc-500'}`}>
                          {m.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Prompts */}
                <div className="space-y-2 pt-3 border-t border-zinc-900">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 block">
                    QUICK PROMPTS
                  </span>
                  <div className="space-y-1.5">
                    {quickChatPrompts.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="w-full text-left p-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-[11px] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        "{q}"
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMessages([
                      {
                        id: `reset-${Date.now()}`,
                        role: 'model',
                        content: 'Conversation history cleared. Ready for your next cinematography inquiry.',
                        timestamp: 'Now',
                        model: chatModel
                      }
                    ])
                  }
                  className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white text-xs font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-800"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>CLEAR THREAD HISTORY</span>
                </button>
              </div>

              {/* Right Chat Thread & Input (8 cols) */}
              <div className="lg:col-span-8 bg-black border border-white flex flex-col h-[650px] overflow-hidden text-xs">
                {/* Thread Header */}
                <div className="px-6 py-4 border-b border-white bg-zinc-950 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono font-bold text-white uppercase tracking-wider">
                      ACTIVE SESSION: {chatRole.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <span className="font-mono text-zinc-400 text-[10px]">
                    {chatModel}
                  </span>
                </div>

                {/* Scrollable Message List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black">
                  {messages.map((msg) => {
                    const isUser = msg.role === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isUser && (
                          <div className="w-7 h-7 bg-white text-black flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] sm:max-w-[75%] p-4 text-xs leading-relaxed border ${
                            isUser
                              ? 'bg-zinc-900 border-zinc-700 text-white'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-300'
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{msg.content}</div>

                          <div className="flex items-center justify-between gap-4 mt-3 pt-2 border-t border-zinc-800 text-[10px] text-zinc-500">
                            <span>{msg.timestamp}</span>
                            {!isUser && (
                              <button
                                onClick={() => handleCopyText(msg.content, msg.id)}
                                className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                {copiedMessageId === msg.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {isUser && (
                          <div className="w-7 h-7 bg-zinc-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {isChatSending && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-7 h-7 bg-white text-black flex items-center justify-center shrink-0 font-bold">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-zinc-950 border border-zinc-800 px-4 py-3 text-xs text-zinc-400 flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                        <span>{chatModel} is crafting cinematography breakdown...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Message Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-4 bg-zinc-950 border-t border-white flex items-center gap-3"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`Ask ${chatRole.replace('_', ' ')} anything (lighting, sensors, lenses, scripts)...`}
                    className="flex-1 bg-black border border-zinc-700 focus:border-white px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors font-mono"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isChatSending}
                    className="p-3 bg-white text-black font-bold hover:bg-zinc-200 disabled:opacity-50 transition-colors shrink-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
