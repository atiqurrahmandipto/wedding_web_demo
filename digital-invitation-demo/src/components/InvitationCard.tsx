"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Music,
  VolumeX,
  RotateCcw,
  Sparkles,
  Share2,
  CheckCircle2,
  Compass,
  Utensils,
  Shirt,
  HelpCircle,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { weddingAudio } from "@/utils/audio";

interface InvitationCardProps {
  onReopenEnvelope: () => void;
}

export default function InvitationCard({ onReopenEnvelope }: InvitationCardProps) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // RSVP state
  const [rsvpData, setRsvpData] = useState({
    name: "",
    email: "",
    status: "attending",
    guests: "1",
    meal: "kacchi-biryani",
    dietary: "",
    song: "",
    message: "",
  });
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);

  // Active FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Target Wedding Date: October 24, 2026 18:00:00
  useEffect(() => {
    const targetDate = new Date("2026-10-24T18:00:00+06:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMusic = () => {
    if (weddingAudio) {
      const playing = weddingAudio.toggleAmbientMusic();
      setIsPlayingMusic(playing);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData.name || !rsvpData.email) return;

    setIsRsvpSubmitted(true);

    confetti({
      particleCount: 95,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#f3e5ab", "#aa7c11", "#ff4d6d", "#ffffff"],
    });

    weddingAudio?.playChime();
  };

  const generateCalendarLink = () => {
    const title = encodeURIComponent("Shakib & Bristy's Wedding Celebration");
    const details = encodeURIComponent(
      "Join us in celebrating the grand wedding of Shakib & Bristy at The Grand Palace Conservatory!"
    );
    const location = encodeURIComponent(
      "The Grand Palace Conservatory & Heritage Gardens, Dhaka"
    );
    const start = "20261024T120000Z";
    const end = "20261024T200000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#faf6ee] via-[#ffffff] to-[#f6f0e4] text-[#2c2217] pb-24 overflow-hidden">
      {/* Floating Ambient Atmosphere Bar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-2.5 rounded-full border border-[#d4af37]/40 bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_10px_35px_rgba(180,140,80,0.15)]">
        <button
          onClick={handleToggleMusic}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-sans-clean transition-all ${
            isPlayingMusic
              ? "bg-[#d4af37]/20 text-[#684a0b] border border-[#d4af37]/50 font-semibold"
              : "text-[#6b583f] hover:text-[#2c2217]"
          }`}
          title="Play / Pause Romantic Ambient Music"
        >
          {isPlayingMusic ? (
            <>
              <Music className="w-3.5 h-3.5 text-[#8c6514] animate-spin" style={{ animationDuration: "6s" }} />
              <span className="hidden sm:inline">Music Playing</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#a8822d]" />
              <span className="hidden sm:inline">Music</span>
            </>
          )}
        </button>

        <div className="h-4 w-px bg-[#d4af37]/30" />

        <button
          onClick={onReopenEnvelope}
          className="flex items-center gap-1.5 text-xs text-[#6b583f] hover:text-[#2c2217] px-2 py-1 transition-all uppercase tracking-wider font-sans-clean font-medium"
          title="Re-open Envelope Animation"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#8c6514]" />
          <span className="hidden sm:inline">Envelope</span>
        </button>

        <div className="h-4 w-px bg-[#d4af37]/30" />

        <a
          href="#rsvp-section"
          className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#2a1e09] font-bold text-xs tracking-wider uppercase hover:brightness-105 shadow-sm transition-all"
        >
          RSVP
        </a>
      </nav>

      {/* Hero Section / Master Invitation Card */}
      <section className="relative pt-24 sm:pt-28 pb-16 px-4 max-w-4xl mx-auto flex flex-col items-center">
        {/* Ornate Gold Bordered Invitation Card */}
        <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#fdfbf7] to-[#f9f3e6] border-2 border-[#d4af37]/60 p-6 sm:p-12 md:p-16 shadow-[0_25px_70px_rgba(180,140,80,0.18),0_0_25px_rgba(212,175,55,0.12)] text-center overflow-hidden animate-float">
          {/* Ornate Corner Accents */}
          <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-[#d4af37]/70 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-[#d4af37]/70 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-[#d4af37]/70 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-[#d4af37]/70 rounded-br-xl pointer-events-none" />

          {/* Inner Inset Shimmer Line */}
          <div className="absolute inset-4 rounded-2xl border border-[#d4af37]/25 pointer-events-none" />

          {/* Monogram Crest */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#d4af37] bg-gradient-to-b from-[#ffffff] to-[#f5ebd7] mb-6 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            <div className="absolute inset-1 rounded-full border border-[#d4af37]/40" />
            <span className="font-serif-luxury text-3xl sm:text-4xl italic font-bold text-[#8c6514]">
              S & B
            </span>
          </div>

          {/* Invitation Intro */}
          <div className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#96711d] font-heading-luxury font-bold mb-3">
            Together With Their Beloved Families
          </div>

          {/* Couple Names */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-normal tracking-wide text-[#231a10] mb-4 leading-tight">
            Shakib
            <span className="block text-2xl sm:text-4xl my-1 font-script-luxury text-[#9e7620] normal-case tracking-normal">
              &
            </span>
            Bristy
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base font-serif-luxury italic text-[#63513e] leading-relaxed mb-8">
            Cordially invite you to share in the joy and blessing as we unite our lives in marriage, celebrating our love and new beginning with family and cherished friends.
          </p>

          {/* Date & Time Highlight Box */}
          <div className="relative inline-flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-5 px-8 sm:px-12 rounded-2xl bg-[#faf6ed] border border-[#d4af37]/50 shadow-inner mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#96711d]" />
              <div className="text-left">
                <div className="text-[11px] uppercase tracking-widest text-[#826f59] font-sans-clean font-semibold">
                  Date
                </div>
                <div className="text-sm sm:text-base font-bold text-[#2b2014] font-heading-luxury">
                  Saturday, Oct 24, 2026
                </div>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-[#d4af37]/40" />

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#96711d]" />
              <div className="text-left">
                <div className="text-[11px] uppercase tracking-widest text-[#826f59] font-sans-clean font-semibold">
                  Time
                </div>
                <div className="text-sm sm:text-base font-bold text-[#2b2014] font-heading-luxury">
                  6:00 PM Onwards
                </div>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-[#d4af37]/40" />

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#96711d]" />
              <div className="text-left">
                <div className="text-[11px] uppercase tracking-widest text-[#826f59] font-sans-clean font-semibold">
                  Location
                </div>
                <div className="text-sm sm:text-base font-bold text-[#2b2014] font-heading-luxury">
                  Grand Palace Estate
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={generateCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#d4af37]/60 bg-[#ffffff] text-[#4d3c26] text-xs uppercase tracking-wider font-sans-clean font-semibold hover:bg-[#faf4e6] transition-all shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#96711d]" />
              <span>Add To Calendar</span>
              <ExternalLink className="w-3 h-3 text-[#96711d]" />
            </a>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#d4af37]/40 bg-[#faf6ed] text-[#4d3c26] text-xs uppercase tracking-wider font-sans-clean font-medium hover:text-[#000000] hover:bg-[#ffffff] transition-all"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#96711d]" />
                  <span>Share Invitation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Live Countdown Section */}
      <section className="max-w-3xl mx-auto px-4 py-8 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-[#96711d] font-heading-luxury font-bold mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#96711d]" />
          <span>Counting Down To The Big Day</span>
          <Sparkles className="w-3.5 h-3.5 text-[#96711d]" />
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#ffffff] border border-[#d4af37]/40 shadow-md"
            >
              <span className="font-heading-luxury text-2xl sm:text-4xl font-bold text-[#8c6514]">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#7a6a55] font-sans-clean font-semibold mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Couple Section & Love Story */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Portrait Photo Frame */}
          <div className="relative group">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#d4af37]/30 via-[#f3e5ab]/40 to-[#d4af37]/30 opacity-70 blur-lg group-hover:opacity-100 transition duration-1000" />
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/70 shadow-xl bg-[#ffffff]">
              <img
                src="/couple.jpg"
                alt="Shakib and Bristy"
                className="w-full h-auto object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#20160a]/70 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 text-center p-3 bg-[#ffffff]/90 backdrop-blur-md rounded-xl border border-[#d4af37]/40 shadow-sm">
                <span className="font-script-luxury text-2xl text-[#7a5308]">
                  "Two hearts, one soul, beginning our forever"
                </span>
              </div>
            </div>
          </div>

          {/* Story & Milestones */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#96711d] font-heading-luxury font-bold mb-1">
                Our Story
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#261d13]">
                Shakib & Bristy
              </h2>
            </div>

            <p className="text-sm sm:text-base font-serif-luxury italic text-[#594836] leading-relaxed">
              Every love story is beautiful, but ours is our absolute favorite. From our first heartfelt conversations under gentle evening breezes to discovering a lifelong best friend in each other, we are beyond grateful to celebrate this unforgettable milestone with you.
            </p>

            {/* Timeline Milestones */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#ffffff] border border-[#d4af37]/30 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#faf3e3] border-2 border-[#d4af37] flex items-center justify-center shrink-0 text-[#8c6514] font-bold text-xs">
                  1
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#96711d] font-sans-clean font-bold">
                    The Beginning
                  </div>
                  <div className="text-sm font-semibold text-[#2b2014]">When Paths Crossed</div>
                  <div className="text-xs text-[#6e5d48]">A chance introduction that quickly blossomed into an unbreakable bond.</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#ffffff] border border-[#d4af37]/30 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#faf3e3] border-2 border-[#d4af37] flex items-center justify-center shrink-0 text-[#8c6514] font-bold text-xs">
                  2
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#96711d] font-sans-clean font-bold">
                    The Promise
                  </div>
                  <div className="text-sm font-semibold text-[#2b2014]">She Said Yes!</div>
                  <div className="text-xs text-[#6e5d48]">A magical proposal filled with laughter, happy tears, and endless promises.</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#faf5eb] border-2 border-[#d4af37]/60 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#96711d] text-[#ffffff] flex items-center justify-center shrink-0 font-bold text-xs">
                  ★
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#96711d] font-sans-clean font-bold">
                    October 24, 2026
                  </div>
                  <div className="text-sm font-bold text-[#231a10]">The Royal Reception</div>
                  <div className="text-xs text-[#63523e]">Surrounded by beloved family and friends as we begin our new journey.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule of Events */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-[#96711d] font-heading-luxury font-bold mb-2">
          Event Flow
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#231a10] mb-12">
          Ceremony & Festivities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              time: "06:00 PM",
              title: "Guest Reception",
              desc: "Welcome drinks & traditional musical ensemble",
              icon: Sparkles,
            },
            {
              time: "07:00 PM",
              title: "The Grand Entrance",
              desc: "Bridal procession & exchange of garlands (Jaimala)",
              icon: Heart,
            },
            {
              time: "08:30 PM",
              title: "Royal Banquet",
              desc: "Traditional gourmet feast & celebratory toasts",
              icon: Utensils,
            },
            {
              time: "10:00 PM",
              title: "Music & Blessings",
              desc: "Live music, photography & farewell blessings",
              icon: Music,
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center p-6 rounded-2xl bg-[#ffffff] border border-[#d4af37]/35 shadow-md hover:border-[#d4af37] transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#faf5eb] border border-[#d4af37]/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  <Icon className="w-5 h-5 text-[#96711d]" />
                </div>
                <span className="text-xs font-bold text-[#96711d] uppercase tracking-widest font-sans-clean mb-1">
                  {item.time}
                </span>
                <h3 className="text-lg font-serif-luxury font-semibold text-[#2b2014] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6e5e4b] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Venue & Location Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#d4af37]/60 shadow-xl bg-[#ffffff]">
          <div className="relative h-72 sm:h-96 w-full">
            <img
              src="/venue.jpg"
              alt="The Botanical Estate & Conservatory"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d150b]/85 via-[#1d150b]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#f5d97f] font-heading-luxury font-bold">
                  The Venue
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif-luxury text-[#ffffff] font-normal">
                  The Grand Palace Conservatory & Heritage Pavilion
                </h3>
                <p className="text-xs sm:text-sm text-[#f0e4cc] mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#f5d97f]" />
                  <span>Grand Heritage Boulevard, Botanical Gardens</span>
                </p>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#2a1e09] font-bold text-xs uppercase tracking-wider hover:brightness-105 transition shadow-lg shrink-0"
              >
                <Compass className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#5c4a35] border-t border-[#d4af37]/30 bg-[#faf6ed]">
            <div>
              <div className="font-bold text-[#2a1f13] uppercase tracking-wider mb-1">
                Valet & Parking
              </div>
              <p>Dedicated complimentary valet parking available at the main palace gates.</p>
            </div>
            <div>
              <div className="font-bold text-[#2a1f13] uppercase tracking-wider mb-1">
                Photography & Memories
              </div>
              <p>Tag your lovely captures with our official hashtag <strong>#ShakibWedsBristy</strong>.</p>
            </div>
            <div>
              <div className="font-bold text-[#2a1f13] uppercase tracking-wider mb-1">
                Guest Assistance
              </div>
              <p>Dedicated hospitality desk available throughout the celebration evening.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Attire & Dress Code Guide */}
      <section className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="p-8 rounded-3xl bg-[#ffffff] border border-[#d4af37]/40 shadow-lg">
          <Shirt className="w-6 h-6 text-[#96711d] mx-auto mb-2" />
          <div className="text-xs uppercase tracking-[0.25em] text-[#96711d] font-heading-luxury font-bold mb-1">
            Dress Code & Theme
          </div>
          <h3 className="text-2xl font-serif-luxury text-[#261c12] mb-2">
            Traditional Formal & Royal Festive Wear
          </h3>
          <p className="text-xs sm:text-sm text-[#665440] max-w-lg mx-auto mb-6 leading-relaxed">
            We invite our esteemed guests to dress in formal ethnic or traditional festive attire. Sherwanis, suits, sarees, lehengas, and elegant gowns in celebratory tones are warmly welcomed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: "Royal Gold", hex: "#d4af37" },
              { name: "Crimson Red", hex: "#9e1b20" },
              { name: "Emerald Forest", hex: "#1b4332" },
              { name: "Pearl Cream", hex: "#f3e9d2" },
              { name: "Rose Gold", hex: "#b5838d" },
            ].map((color, idx) => (
              <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#faf5eb] border border-[#d4af37]/30 shadow-sm">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[11px] text-[#3e3020] font-sans-clean font-medium">{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive RSVP Section */}
      <section id="rsvp-section" className="max-w-3xl mx-auto px-4 py-16 scroll-mt-20">
        <div className="rounded-3xl bg-[#ffffff] border-2 border-[#d4af37]/70 p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(180,140,80,0.18)]">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-[0.3em] text-[#96711d] font-heading-luxury font-bold mb-1">
              Kindly Respond
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#231a10]">
              RSVP For The Celebration
            </h2>
            <p className="text-xs text-[#705e49] mt-1 font-sans-clean font-medium">
              Please let us know your presence by October 10, 2026
            </p>
          </div>

          {isRsvpSubmitted ? (
            <div className="text-center py-10 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#aa7c11] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 text-[#ffffff]" />
              </div>
              <h3 className="text-2xl font-serif-luxury text-[#261d13]">
                Thank You, {rsvpData.name}!
              </h3>
              <p className="text-sm font-serif-luxury italic text-[#5c4a35] max-w-md mx-auto">
                {rsvpData.status === "attending"
                  ? "We are delighted and truly honored that you will grace our wedding with your presence and blessings!"
                  : "We will miss your presence, but thank you warmly for your love and heartfelt prayers!"}
              </p>

              {/* VIP Invitation Pass Badge */}
              <div className="mt-6 p-5 rounded-2xl bg-[#faf6ed] border-2 border-[#d4af37]/60 max-w-md mx-auto text-left shadow-md">
                <div className="flex justify-between items-center border-b border-[#d4af37]/40 pb-2 mb-3">
                  <span className="text-[10px] font-heading-luxury uppercase tracking-widest text-[#8c6514] font-bold">
                    VIP Digital Guest Pass
                  </span>
                  <span className="text-[10px] font-mono text-[#7a6a55] font-semibold">#SB-2026-OCT</span>
                </div>
                <div className="text-sm font-bold text-[#231a10]">{rsvpData.name}</div>
                <div className="text-xs text-[#5c4c38] mt-0.5 font-medium">
                  Status: <span className="text-emerald-700 capitalize font-semibold">{rsvpData.status}</span> • Guests: {rsvpData.guests}
                </div>
                {rsvpData.status === "attending" && (
                  <div className="text-xs text-[#5c4c38] mt-0.5 font-medium">
                    Feast Preference: <span className="text-[#231a10] capitalize font-semibold">{rsvpData.meal.replace("-", " ")}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsRsvpSubmitted(false)}
                className="mt-6 text-xs text-[#96711d] underline tracking-wider uppercase font-sans-clean font-bold hover:text-[#000000]"
              >
                Edit Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8c6514] font-sans-clean font-bold mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full px-4 py-3 rounded-xl bg-[#faf6ed] border border-[#d4af37]/40 text-[#2a1e12] placeholder-[#8c7e6c] focus:outline-none focus:border-[#d4af37] focus:bg-[#ffffff] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8c6514] font-sans-clean font-bold mb-1">
                    Email or Mobile Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpData.email}
                    onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                    placeholder="yourname@domain.com or phone"
                    className="w-full px-4 py-3 rounded-xl bg-[#faf6ed] border border-[#d4af37]/40 text-[#2a1e12] placeholder-[#8c7e6c] focus:outline-none focus:border-[#d4af37] focus:bg-[#ffffff] text-sm"
                  />
                </div>
              </div>

              {/* Attendance Options */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8c6514] font-sans-clean font-bold mb-2">
                  Will You Be Attending? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      rsvpData.status === "attending"
                        ? "bg-[#faf3e3] border-[#d4af37] text-[#241a0f] shadow-sm font-semibold"
                        : "bg-[#faf6ed] border-[#d4af37]/30 text-[#695844] hover:border-[#d4af37]/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="attending"
                      checked={rsvpData.status === "attending"}
                      onChange={(e) => setRsvpData({ ...rsvpData, status: e.target.value })}
                      className="accent-[#96711d]"
                    />
                    <span className="text-sm">Joyfully Accepts With Family</span>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      rsvpData.status === "declining"
                        ? "bg-[#faf3e3] border-[#d4af37] text-[#241a0f] shadow-sm font-semibold"
                        : "bg-[#faf6ed] border-[#d4af37]/30 text-[#695844] hover:border-[#d4af37]/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="declining"
                      checked={rsvpData.status === "declining"}
                      onChange={(e) => setRsvpData({ ...rsvpData, status: e.target.value })}
                      className="accent-[#96711d]"
                    />
                    <span className="text-sm">Regretfully Declines</span>
                  </label>
                </div>
              </div>

              {rsvpData.status === "attending" && (
                <>
                  {/* Number of guests & Meal Choice */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8c6514] font-sans-clean font-bold mb-1">
                        Number of Attending Guests
                      </label>
                      <select
                        value={rsvpData.guests}
                        onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#faf6ed] border border-[#d4af37]/40 text-[#2a1e12] focus:outline-none focus:border-[#d4af37] text-sm font-medium"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests (Family)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8c6514] font-sans-clean font-bold mb-1">
                        Feast Preference
                      </label>
                      <select
                        value={rsvpData.meal}
                        onChange={(e) => setRsvpData({ ...rsvpData, meal: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#faf6ed] border border-[#d4af37]/40 text-[#2a1e12] focus:outline-none focus:border-[#d4af37] text-sm font-medium"
                      >
                        <option value="kacchi-biryani">Grand Mutton Kacchi Biryani & Roast</option>
                        <option value="beef-tehari">Spiced Beef Tehari & Kebabs</option>
                        <option value="vegetarian-delight">Royal Vegetarian Platter & Polao</option>
                      </select>
                    </div>
                  </div>

                  {/* Dietary notes */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8c6514] font-sans-clean font-bold mb-1">
                      Special Dietary / Allergies (Optional)
                    </label>
                    <input
                      type="text"
                      value={rsvpData.dietary}
                      onChange={(e) => setRsvpData({ ...rsvpData, dietary: e.target.value })}
                      placeholder="e.g. Mild spice, Vegetarian, Nut allergy"
                      className="w-full px-4 py-3 rounded-xl bg-[#faf6ed] border border-[#d4af37]/40 text-[#2a1e12] placeholder-[#8c7e6c] focus:outline-none focus:border-[#d4af37] text-sm"
                    />
                  </div>
                </>
              )}

              {/* Message / Duas / Blessings */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8c6514] font-sans-clean font-bold mb-1">
                  Dua, Blessings & Warm Wishes for Shakib & Bristy
                </label>
                <textarea
                  rows={3}
                  value={rsvpData.message}
                  onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                  placeholder="Share your prayers, warm blessings or favorite memories..."
                  className="w-full px-4 py-3 rounded-xl bg-[#faf6ed] border border-[#d4af37]/40 text-[#2a1e12] placeholder-[#8c7e6c] focus:outline-none focus:border-[#d4af37] text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#2a1e09] font-heading-luxury font-bold text-sm tracking-[0.2em] uppercase hover:brightness-105 transition-all shadow-md"
              >
                Confirm RSVP
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <HelpCircle className="w-5 h-5 text-[#96711d] mx-auto mb-1" />
          <div className="text-xs uppercase tracking-[0.25em] text-[#96711d] font-heading-luxury font-bold">
            Guest Information
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#261d13]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "What time should we arrive?",
              a: "Guests are warmly welcomed starting from 5:30 PM. Welcome drinks and live traditional instrumental melodies will be served before the bride and groom entrance at 7:00 PM.",
            },
            {
              q: "Is parking available at the venue?",
              a: "Yes, spacious secure parking and complimentary valet service are provided for all attending guests at the main entrance.",
            },
            {
              q: "What is the dress code?",
              a: "We invite you to wear your finest traditional attire (sherwanis, suits, sarees, lehengas) in festive colors.",
            },
            {
              q: "Can I bring my family?",
              a: "Yes! Family members included in your invitation count are warmly welcomed to join the celebration.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-[#ffffff] border border-[#d4af37]/35 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-4 text-left flex justify-between items-center text-sm font-semibold text-[#302417] hover:text-[#96711d] transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#96711d] transition-transform duration-300 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-[#665541] leading-relaxed border-t border-[#d4af37]/20 pt-3 bg-[#faf6ed]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-[#705e49] space-y-3">
        <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#d4af37]/60 flex items-center justify-center text-[#8c6514] font-serif-luxury italic text-lg bg-[#ffffff] shadow-sm">
          S & B
        </div>
        <p className="font-heading-luxury tracking-widest text-[#3b2e1f] font-bold">
          #ShakibWedsBristy • October 24, 2026
        </p>
        <p className="text-[11px] text-[#85735d]">
          Crafted with love for our beloved guests & families
        </p>
      </footer>
    </div>
  );
}
