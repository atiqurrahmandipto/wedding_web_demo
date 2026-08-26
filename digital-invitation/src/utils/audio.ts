// Synthesizer for gentle romantic ambient music using Web Audio API

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: any = null;
  private noteIndex: number = 0;

  // Romantic pentatonic chord progression (Frequencies in Hz: F major / D minor romantic harp arpeggios)
  private arpeggios = [
    // Fmaj9
    [174.61, 220.00, 261.63, 329.63, 349.23, 440.00, 523.25, 659.25],
    // Dm9
    [146.83, 220.00, 261.63, 293.66, 349.23, 440.00, 523.25, 587.33],
    // Bbmaj7
    [116.54, 174.61, 233.08, 293.66, 349.23, 466.16, 587.33, 698.46],
    // C9sus4 -> C
    [130.81, 196.00, 261.63, 293.66, 349.23, 392.00, 523.25, 659.25],
  ];

  private currentChord = 0;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public playChime() {
    this.initContext();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const chimeNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    chimeNotes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.12);

      gain.gain.setValueAtTime(0.0001, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.18, now + i * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 2.2);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 2.4);
    });
  }

  public startAmbientMusic() {
    this.initContext();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.scheduleNextNote();
  }

  private playPluck(freq: number) {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Soft warm harp-like harmonic
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 1.8);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 3.0);
  }

  private scheduleNextNote = () => {
    if (!this.isPlaying) return;

    const chord = this.arpeggios[this.currentChord];
    const note = chord[this.noteIndex % chord.length];

    this.playPluck(note);

    this.noteIndex++;
    if (this.noteIndex >= chord.length) {
      this.noteIndex = 0;
      this.currentChord = (this.currentChord + 1) % this.arpeggios.length;
    }

    // Varied rhythm for natural acoustic flow
    const intervals = [420, 380, 500, 420, 600, 380, 450, 800];
    const delay = intervals[this.noteIndex % intervals.length];

    this.timerId = setTimeout(this.scheduleNextNote, delay);
  };

  public stopAmbientMusic() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggleAmbientMusic(): boolean {
    if (this.isPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = typeof window !== "undefined" ? new WeddingAudioPlayer() : null;
