import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { SITE, HAS_DIRECT_CONTACT, telHref } from '../data/siteConfig';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(!HAS_DIRECT_CONTACT);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Feature Film / Narrative',
    budget: '$50k — $150k NZD',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to send inquiry.');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: 'Feature Film / Narrative',
        budget: '$50k — $150k NZD',
        message: '',
      });
    } catch (err: any) {
      setError(err?.message || 'Error sending message. Please email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const galleryStills = [
    { url: '/assets/1.webp', alt: 'Fufua Brand Ad' },
    { url: '/assets/travel_akoso.webp', alt: 'Travel — Akosombo' },
    { url: '/assets/podcast_tyrone.webp', alt: 'Podcast Studio Setup' },
    { url: '/assets/corporate_africa.webp', alt: 'Corporate Documentation' },
    { url: '/assets/selected_work_montage_poster.webp', alt: 'Selected Work Montage' },
    { url: '/assets/FUFUA_collection_full_poster.webp', alt: 'Fufua Collection' }
  ];

  return (
    <section id="contact" className="pt-28 pb-24 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 bg-black text-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        <div className="lg:col-span-5 border border-white p-8 sm:p-12 bg-black flex flex-col justify-between space-y-12">
          <div className="space-y-8 font-mono">
            <p className="text-sm sm:text-base tracking-wide text-zinc-300 uppercase leading-relaxed">
              For new projects, questions or any further information please do not hesitate to reach out:
            </p>

            <div className="space-y-6 pt-4 text-base sm:text-lg font-mono">
              {SITE.contact.phone && (
                <div className="flex items-center justify-between group">
                  <a href={telHref(SITE.contact.phone)} className="text-white hover:text-zinc-300 transition-colors font-medium">
                    {SITE.contact.phone}
                  </a>
                  <button
                    onClick={() => handleCopy(SITE.contact.phone, 'phone')}
                    className="text-zinc-600 group-hover:text-zinc-400 p-1 hover:text-white transition-colors cursor-pointer"
                    title="Copy phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {SITE.contact.email && (
                <div className="flex items-center justify-between group">
                  <a href={`mailto:${SITE.contact.email}`} className="text-white hover:text-zinc-300 transition-colors font-medium underline underline-offset-4">
                    {SITE.contact.email}
                  </a>
                  <button
                    onClick={() => handleCopy(SITE.contact.email, 'email')}
                    className="text-zinc-600 group-hover:text-zinc-400 p-1 hover:text-white transition-colors cursor-pointer"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {SITE.contact.instagram && (
                <div>
                  <a
                    href={`https://instagram.com/${SITE.contact.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-zinc-300 transition-colors uppercase tracking-widest text-sm"
                  >
                    IG: @{SITE.contact.instagram}
                  </a>
                </div>
              )}

              {SITE.contact.linkedin && (
                <div>
                  <a
                    href={SITE.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-zinc-300 transition-colors uppercase tracking-widest text-sm"
                  >
                    LINKEDIN
                  </a>
                </div>
              )}
            </div>

            {HAS_DIRECT_CONTACT && (
              <div className="pt-8 border-t border-zinc-900">
                <button
                  onClick={() => setShowInquiryForm(!showInquiryForm)}
                  className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-400 hover:text-white border border-zinc-800 hover:border-white px-4 py-2.5 transition-colors cursor-pointer"
                >
                  {showInquiryForm ? '← HIDE BRIEF FORM' : 'SEND DIRECT PROJECT BRIEF →'}
                </button>
              </div>
            )}

            {showInquiryForm && (
              <form onSubmit={handleSubmit} className="pt-4 space-y-4 text-xs font-mono animate-fadeIn">
                {submitted && (
                  <div className="p-3 bg-emerald-950/50 border border-emerald-500 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Inquiry logged successfully. Lloyd will review shortly.</span>
                  </div>
                )}
                {error && (
                  <div className="p-3 bg-red-950/50 border border-red-500 text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1 uppercase">YOUR NAME</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-white focus:border-white outline-none" placeholder="Name / Production Studio" />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1 uppercase">EMAIL</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-white focus:border-white outline-none" placeholder="email@studio.com" />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1 uppercase">MESSAGE / PRODUCTION DETAILS</label>
                  <textarea rows={3} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-white focus:border-white outline-none" placeholder="Project dates, script summary, shooting format..." />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-white text-black py-2.5 font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  <Send className="w-3 h-3" />
                  <span>{isSubmitting ? 'SENDING...' : 'DISPATCH INQUIRY'}</span>
                </button>
              </form>
            )}
          </div>

          <div className="text-[11px] font-mono text-zinc-600 tracking-widest pt-8 border-t border-zinc-900">
            <span>{SITE.location ? `${SITE.location} • ` : ''}WORLDWIDE AVAILABILITY</span>
          </div>
        </div>

        <div className="lg:col-span-7 border border-white p-4 sm:p-6 bg-black">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 h-full">
            {galleryStills.map((still, idx) => (
              <div key={idx} className="relative aspect-16/10 sm:aspect-auto sm:h-44 md:h-52 lg:h-48 xl:h-56 overflow-hidden border border-zinc-900 group">
                <img src={still.url} alt={still.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 pointer-events-none">
                  <span className="text-[9px] font-mono text-white tracking-widest uppercase truncate bg-black/80 px-1.5 py-0.5">{still.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
