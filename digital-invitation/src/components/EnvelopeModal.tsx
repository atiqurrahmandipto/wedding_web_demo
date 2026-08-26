"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Music, VolumeX, MailOpen } from "lucide-react";
import { weddingAudio } from "@/utils/audio";

interface EnvelopeModalProps {
  isOpen: boolean;
  onOpenCard: () => void;
}

export default function EnvelopeModal({ isOpen, onOpenCard }: EnvelopeModalProps) {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isCardSliding, setIsCardSliding] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    weddingAudio?.playChime();
    if (!isMuted) {
      weddingAudio?.startAmbientMusic();
    }

    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#f3e5ab", "#aa7c11", "#ffb6c1", "#ffffff"],
    });

    setIsFlapOpen(true);

    setTimeout(() => {
      setIsCardSliding(true);
    }, 700);

    setTimeout(() => {
      onOpenCard();
    }, 1800);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      setIsMuted(false);
      weddingAudio?.startAmbientMusic();
    } else {
      setIsMuted(true);
      weddingAudio?.stopAmbientMusic();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#faf6ee]/90 backdrop-blur-xl px-4 transition-all duration-1000">
      {/* Background ambient warm sunlit aura */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#d4af37]/20 via-[#f9e8ba]/30 to-transparent blur-[140px] pointer-events-none animate-pulse-glow" />

      {/* Top right sound toggle button */}
      <button
        onClick={toggleSound}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/40 bg-[#ffffff]/90 text-[#8c6514] hover:bg-[#faf4e4] transition-all shadow-md backdrop-blur-md text-xs tracking-wider uppercase font-sans-clean font-medium"
        title="Toggle Music"
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-[#a8822d]" />
            <span>Music Off</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-[#8c6514] animate-bounce" />
            <span className="text-[#68490a] font-semibold">Music Playing</span>
          </>
        )}
      </button>

      {/* Main Envelope Stage */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg">
        {/* Header Invitation Text */}
        <div
          className={`text-center mb-8 transition-all duration-700 ${
            isOpening ? "opacity-0 -translate-y-4" : "opacity-100"
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-[#9a7218] text-xs uppercase tracking-[0.35em] font-heading-luxury mb-2 font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
            <span>Save The Date</span>
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury text-[#2a2015] tracking-wide font-normal">
            You Are Cordially Invited
          </h1>
          <p className="text-xs sm:text-sm text-[#7a6a54] font-sans-clean mt-1 font-medium">
            Tap the wax seal to unveil the invitation
          </p>
        </div>

        {/* 3D Envelope Container */}
        <div
          onClick={handleOpenEnvelope}
          className={`relative w-80 sm:w-96 h-56 sm:h-64 cursor-pointer perspective-1200 group transition-transform duration-700 ${
            isOpening ? "scale-105" : "hover:scale-[1.02]"
          }`}
        >
          {/* Envelope Back Body */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#faf5eb] to-[#f0e6d2] rounded-2xl border border-[#d4af37]/60 shadow-[0_20px_60px_rgba(180,140,80,0.25)] overflow-hidden">
            {/* Elegant Inner Lining Pattern */}
            <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-[#fcf9f2] via-[#f7efe0] to-[#ece0cb] border border-[#d4af37]/30 flex items-center justify-center">
              <div className="w-full h-full opacity-20 bg-[radial-gradient(#b89045_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>
          </div>

          {/* Invitation Card (Inside Envelope - slides up when opened) */}
          <div
            className={`absolute left-4 right-4 h-52 sm:h-56 bg-gradient-to-b from-[#ffffff] via-[#fdfbf6] to-[#f5edd9] rounded-xl p-5 shadow-2xl border-2 border-[#d4af37]/70 flex flex-col items-center justify-between text-center transition-all duration-1000 ease-out z-20 ${
              isCardSliding
                ? "-translate-y-48 scale-105 shadow-[0_30px_70px_rgba(180,140,80,0.35)] opacity-100"
                : isFlapOpen
                ? "-translate-y-8 opacity-100"
                : "top-4 opacity-70"
            }`}
          >
            {/* Card Filigree Header */}
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#96711d] font-heading-luxury font-bold">
              Wedding Celebration
            </div>

            {/* Couple Monogram */}
            <div className="my-1">
              <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#c59b27] flex items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#f4ecd8] shadow-sm">
                <span className="font-serif-luxury text-xl font-bold text-[#8c6514] italic">S & B</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-medium text-[#2b2116] mt-2 tracking-wide">
                Shakib & Bristy
              </h2>
              <div className="text-[11px] font-sans-clean text-[#705e49] mt-1 font-semibold">
                October 24, 2026 • Grand Celebration
              </div>
            </div>

            <div className="text-[9px] uppercase tracking-widest text-[#947228] font-sans-clean border-t border-[#d4af37]/40 pt-1 w-full flex items-center justify-center gap-1 font-semibold">
              <Sparkles className="w-2.5 h-2.5 text-[#a8822d]" />
              <span>Click to view full invitation</span>
              <Sparkles className="w-2.5 h-2.5 text-[#a8822d]" />
            </div>
          </div>

          {/* Envelope Pocket Front */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {/* Left triangle */}
            <div
              className="absolute left-0 bottom-0 top-0 w-1/2 bg-gradient-to-tr from-[#fbf8f0] to-[#f5ebd6] border-l border-b border-[#d4af37]/40 shadow-sm"
              style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
            />
            {/* Right triangle */}
            <div
              className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-tl from-[#fbf8f0] to-[#f5ebd6] border-r border-b border-[#d4af37]/40 shadow-sm"
              style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
            />
            {/* Bottom triangle pocket */}
            <div
              className="absolute left-0 right-0 bottom-0 h-[65%] bg-gradient-to-t from-[#ffffff] to-[#f7efe0] border-b-2 border-[#d4af37]/50 shadow-[0_-5px_15px_rgba(180,140,80,0.1)]"
              style={{ clipPath: "polygon(0 100%, 50% 30%, 100% 100%)" }}
            />
          </div>

          {/* Top Flap (Opens in 3D) */}
          <div
            className={`absolute top-0 left-0 right-0 h-1/2 origin-top transform-style-3d transition-transform duration-1000 ease-in-out z-40 ${
              isFlapOpen ? "[transform:rotateX(180deg)] z-10" : "[transform:rotateX(0deg)]"
            }`}
          >
            <div
              className="w-full h-full bg-gradient-to-b from-[#ffffff] via-[#faf4e7] to-[#f0e4cc] border-t-2 border-[#d4af37]/60 shadow-md"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            >
              <div
                className="w-full h-full opacity-40"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 48%, rgba(212,175,55,0.9) 50%, transparent 52%)",
                }}
              />
            </div>
          </div>

          {/* Wax Seal Button */}
          <div
            className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
              isFlapOpen
                ? "scale-150 opacity-0 pointer-events-none"
                : "scale-100 group-hover:scale-110"
            }`}
          >
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#9c1e14] via-[#751108] to-[#4a0803] border-2 border-[#f3e5ab] shadow-[0_8px_25px_rgba(160,30,20,0.4),0_0_15px_rgba(212,175,55,0.5)] flex items-center justify-center">
              <div className="absolute -inset-1 rounded-full border border-[#d4af37]/60 opacity-80 animate-pulse-glow" />

              <div className="w-12 h-12 rounded-full border border-[#f3e5ab]/40 flex flex-col items-center justify-center text-[#f8ecc2] shadow-inner bg-[#600f08]">
                <Heart className="w-3.5 h-3.5 text-[#f5d97f] fill-[#f5d97f] mb-0.5" />
                <span className="font-heading-luxury text-[10px] font-bold tracking-widest text-[#f5d97f]">
                  OPEN
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom helper prompt */}
        <div
          className={`mt-10 flex items-center gap-2 text-xs text-[#8c6514] uppercase tracking-widest font-sans-clean font-semibold transition-opacity duration-500 ${
            isOpening ? "opacity-0" : "opacity-100 animate-bounce"
          }`}
        >
          <MailOpen className="w-4 h-4 text-[#a8822d]" />
          <span>Click envelope or wax seal to unveil</span>
        </div>
      </div>
    </div>
  );
}
