"use client";

import React, { useState } from "react";
import EnvelopeModal from "@/components/EnvelopeModal";
import InvitationCard from "@/components/InvitationCard";
import FloatingPetals from "@/components/FloatingPetals";
import InteractiveParticles from "@/components/InteractiveParticles";

export default function Home() {
  const [showEnvelope, setShowEnvelope] = useState(true);

  return (
    <main className="relative min-h-screen">
      {/* Floating floral petals background */}
      <FloatingPetals />

      {/* Interactive Stardust & Golden Particles synced with Mouse Cursor */}
      <InteractiveParticles />

      {/* 3D Wax Seal Animated Envelope Intro */}
      <EnvelopeModal
        isOpen={showEnvelope}
        onOpenCard={() => setShowEnvelope(false)}
      />

      {/* Main Wedding Invitation Card & Interactive Experience */}
      <InvitationCard onReopenEnvelope={() => setShowEnvelope(true)} />
    </main>
  );
}
