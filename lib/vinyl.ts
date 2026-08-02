/**
 * The house record.
 *
 * Everything you hear here is generated in the browser at runtime. There is no
 * mp3 in /public, and there never should be. That is not a clever trick, it is
 * the same rule the rest of the site already follows: the grain is feTurbulence,
 * the turntable is a path, the cuckoo is a path. A 4MB audio file would be the
 * only asset on the page that isn't drawn.
 *
 * It also settles the licensing question permanently. This is an original piece
 * of music, composed as code, so there is nothing to attribute and nothing to
 * clear.
 *
 * What it plays: a slow four-chord loop in F, ~68bpm, on a Rhodes-ish FM voice
 * with an upright bass under it and brushes behind. The melody is sparse and
 * partly random, so the loop never lands the same way twice, which is the point
 * of a room like this. Nobody in a listening bar is following the tune.
 *
 * What makes it a *record*: the surface noise, the crackle, the thump once per
 * rotation, the pitch drifting a few cents because the platter isn't perfect,
 * the highs rolled off at 7k and the lows below 55. Without those it is just a
 * synth patch. With them it is a record playing in another room.
 */

/* -------------------------------------------------------------------------
 * who's listening
 * ---------------------------------------------------------------------- */

/**
 * Whether the house record is on, published to anyone who asks.
 *
 * The toggle lives in the nav and the "on the platter" chip lives in the hero,
 * and in app/page.tsx those are siblings under a server component, so a
 * context would mean wrapping the entire page in a client boundary to move one
 * boolean. A module-level store read through `useSyncExternalStore` costs
 * nothing and keeps the tree as it is.
 *
 * There is exactly one writer (the toggle). Everyone else reads.
 */
let recordIsOn = false;
const listeners = new Set<() => void>();

export const houseRecordState = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  get: () => recordIsOn,
  /** The server has never played a record. */
  getServerSnapshot: () => false,
  set(next: boolean) {
    if (next === recordIsOn) return;
    recordIsOn = next;
    listeners.forEach((listener) => listener());
  },
};

/* -------------------------------------------------------------------------
 * the composition
 * ---------------------------------------------------------------------- */

const BPM = 68;
const SECONDS_PER_BEAT = 60 / BPM;
const BEATS_PER_BAR = 4;
const BARS_PER_CHORD = 2;

/** 33⅓ rpm, in seconds. The warp thump keeps this exact clock. */
const ROTATION = 1.8;

type Chord = {
  /** upright bass root, midi */
  root: number;
  /** the fifth (or whatever the bass walks to on beat 3), midi */
  walk: number;
  /** rhodes voicing, midi, voiced in the octave either side of middle C */
  voicing: number[];
  /** notes the melody is allowed to pick from over this chord, midi */
  colour: number[];
};

/**
 * Fmaj9 → Dm9 → Bbmaj7#11 → C13sus. Two bars each, so the loop is 8 bars,
 * about 28 seconds. Long enough that you stop hearing the seam.
 *
 * The voicings deliberately keep a common tone or two between chords so the
 * Rhodes appears to move by an inner voice rather than jumping. This is the
 * whole reason it sounds like a bar and not an arpeggiator.
 */
const PROGRESSION: Chord[] = [
  {
    root: 41, // F2
    walk: 48, // C3
    voicing: [57, 60, 64, 67], // A3 C4 E4 G4
    colour: [69, 72, 74, 76, 79],
  },
  {
    root: 38, // D2
    walk: 45, // A2
    voicing: [57, 60, 62, 65], // A3 C4 D4 F4
    colour: [69, 72, 74, 77, 79],
  },
  {
    root: 34, // Bb1
    walk: 41, // F2
    voicing: [57, 62, 64, 65], // A3 D4 E4 F4  (the E is the #11)
    colour: [72, 74, 76, 79, 81],
  },
  {
    root: 36, // C2
    walk: 43, // G2
    voicing: [58, 62, 65, 69], // Bb3 D4 F4 A4
    colour: [70, 72, 74, 77, 79],
  },
];

const midi = (note: number) => 440 * 2 ** ((note - 69) / 12);

/* -------------------------------------------------------------------------
 * the room's own noises
 * ---------------------------------------------------------------------- */

export type Ping = "tick" | "shuffle" | "knock";

/**
 * The interface sounds.
 *
 * All three are filtered noise, and none of them has a pitch. That is the whole
 * design: a pitched click is in some key, and it will be the wrong one roughly
 * eleven times out of twelve against whatever chord the record happens to be
 * on. Noise is never out of tune with anything.
 *
 * They are also all under 160ms and under 0.07 gain, because a hover sound is
 * heard hundreds of times in a session and the threshold for "charming" and
 * "make it stop" is about two decibels apart.
 */
const PINGS: Record<
  Ping,
  { freq: number; q: number; gain: number; attack: number; dur: number }
> = {
  /** hovering a link: a fingernail catching the corner of a page */
  tick: { freq: 3000, q: 1.6, gain: 0.03, attack: 0.002, dur: 0.03 },
  /** hovering something on the shelf: card being lifted off a stack */
  shuffle: { freq: 1400, q: 0.8, gain: 0.045, attack: 0.03, dur: 0.16 },
  /** pressing: a knuckle on the bar */
  knock: { freq: 700, q: 2.2, gain: 0.065, attack: 0.003, dur: 0.09 },
};

/* -------------------------------------------------------------------------
 * the engine
 * ---------------------------------------------------------------------- */

/** How far ahead of the clock we schedule, and how often we top it up. */
const LOOKAHEAD = 0.4;
const TICK_MS = 60;

/** Needle down is slow and deliberate. Needle up is not. */
const FADE_IN = 1.4;
const FADE_OUT = 0.45;

export class HouseRecord {
  private ctx: AudioContext | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;

  /** master fader: everything, including the surface noise, hangs off this */
  private master!: GainNode;
  /** the music only, so the needle noise can survive a fade the music doesn't */
  private musicBus!: GainNode;
  private reverbSend!: GainNode;
  private surface!: GainNode;
  /** interface sounds: in the room, but not pressed onto the record */
  private ui!: GainNode;
  private analyser!: AnalyserNode;

  /** slow pitch drift, shared by every voice so they all warp together */
  private wow!: OscillatorNode;
  private wowDepth!: GainNode;
  private flutter!: OscillatorNode;
  private flutterDepth!: GainNode;

  private noiseBuffer!: AudioBuffer;

  /** next beat to be scheduled, in absolute context time */
  private nextNoteTime = 0;
  private beat = 0;
  /** next crackle / next rotation thump, also absolute */
  private nextCrackle = 0;
  private nextThump = 0;

  private frequencies: Uint8Array | null = null;

  playing = false;

  /* ---- lifecycle ------------------------------------------------------ */

  /**
   * Start, if the browser will allow it.
   *
   * Returns whether sound is actually coming out. Called from a user gesture
   * that is always true; called on page load it is usually false, because
   * every current browser hands back a suspended context to a page that nobody
   * has touched yet. That is a "not yet", not an error, so this bails without
   * scheduling anything and lets the caller try again on the first real
   * interaction.
   */
  async start(): Promise<boolean> {
    if (this.playing) return true;

    if (!this.ctx) this.build();
    const ctx = this.ctx!;

    if (ctx.state === "suspended") {
      /*
       * resume() must never be awaited on its own here.
       *
       * When Chrome blocks a context on autoplay policy it does not reject and
       * does not resolve. The promise simply stays pending until a gesture
       * eventually arrives, which may be never. Awaiting it bare means this
       * function hangs forever on page load, and every caller waiting on the
       * result hangs with it. Firefox rejects, Safari resolves while leaving
       * the state suspended; racing a timeout is the only shape that survives
       * all three.
       */
      await Promise.race([
        ctx.resume().catch(() => {}),
        new Promise((settle) => setTimeout(settle, 120)),
      ]);
    }

    // The state is the truth, not the promise. Safari resolves a resume() that
    // did not actually start anything.
    if (ctx.state !== "running") return false;

    this.playing = true;

    const now = ctx.currentTime;

    // Needle down: the surface noise arrives first and alone, then the music
    // comes up under it. A record you can hear before the music starts is the
    // single most convincing part of this whole file.
    this.needleDrop(now + 0.06);
    this.surface.gain.cancelScheduledValues(now);
    this.surface.gain.setValueAtTime(0, now);
    this.surface.gain.linearRampToValueAtTime(1, now + 0.5);

    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0.5, now + FADE_IN);

    // Start the bar on the downbeat, a beat after the needle lands.
    this.nextNoteTime = now + 0.85;
    this.nextCrackle = now + 0.2;
    this.nextThump = now + ROTATION;
    this.beat = 0;

    this.schedule();
    this.timer = setInterval(() => this.schedule(), TICK_MS);

    return true;
  }

  /**
   * Lift the needle. The context is suspended rather than closed, so pressing
   * play again is instant, because building an AudioContext takes long enough to be
   * felt, and this is a button people will toggle idly.
   */
  stop() {
    if (!this.ctx || !this.playing) return;
    const ctx = this.ctx;
    this.playing = false;

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    const now = ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + FADE_OUT);
    // the scrape of the stylus coming off the groove
    this.needleDrop(now + 0.02, 0.5);

    window.setTimeout(() => {
      // Only suspend if nobody pressed play again while we were fading.
      if (!this.playing && ctx.state === "running") void ctx.suspend();
    }, (FADE_OUT + 0.25) * 1000);
  }

  /** For tab-hide. Keeps the schedule intact, just silences the output. */
  suspend() {
    if (this.ctx?.state === "running") void this.ctx.suspend();
  }

  resume() {
    if (this.playing && this.ctx?.state === "suspended") void this.ctx.resume();
  }

  /*
   * There is deliberately no dispose(). The turntable is a singleton that
   * outlives every component on the site, and the only thing a teardown method
   * could realistically be wired to is an unmount, which is exactly the case
   * where closing the context is wrong. Leaving one here would be leaving a
   * loaded footgun for whoever next needs a cleanup function to call.
   */

  /* ---- the level meter ------------------------------------------------ */

  /**
   * Four numbers, 0..1, low band to high, one per bar of the meter in the
   * header. Those bars have been faking it since the site launched; once the
   * record is on they can tell the truth instead.
   */
  levels(): [number, number, number, number] {
    if (!this.ctx || !this.analyser || !this.playing) return [0, 0, 0, 0];

    if (!this.frequencies) {
      this.frequencies = new Uint8Array(this.analyser.frequencyBinCount);
    }
    this.analyser.getByteFrequencyData(this.frequencies);

    const data = this.frequencies;
    // Bins are linear and the ear isn't, so the bands widen as they go up.
    // Roughly: bass, low-mid, mid, air.
    const bands: [number, number][] = [
      [1, 4],
      [4, 12],
      [12, 34],
      [34, 90],
    ];

    return bands.map(([from, to]) => {
      let sum = 0;
      for (let i = from; i < to; i += 1) sum += data[i];
      const mean = sum / (to - from) / 255;
      // A little lift at the top end, which is quiet in this arrangement and
      // would otherwise leave two bars sitting flat all night.
      return Math.min(1, mean * (from > 12 ? 2.6 : 1.5));
    }) as [number, number, number, number];
  }

  /* ---- graph ---------------------------------------------------------- */

  private build() {
    const ctx = new AudioContext();
    this.ctx = ctx;

    this.noiseBuffer = makeNoise(ctx, 2);

    // Everything lands on a gentle compressor before the speakers, so a
    // melody note that happens to hit on a chord change doesn't jump.
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 12;
    comp.ratio.value = 3;
    comp.attack.value = 0.02;
    comp.release.value = 0.25;
    comp.connect(ctx.destination);

    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(comp);

    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 512;
    this.analyser.smoothingTimeConstant = 0.72;
    this.master.connect(this.analyser);

    /* the record's own frequency response: this is most of the character */
    const rolloff = ctx.createBiquadFilter();
    rolloff.type = "lowpass";
    rolloff.frequency.value = 7000;
    rolloff.Q.value = 0.6;

    const rumbleCut = ctx.createBiquadFilter();
    rumbleCut.type = "highpass";
    rumbleCut.frequency.value = 55;

    rolloff.connect(rumbleCut);
    rumbleCut.connect(this.master);

    this.musicBus = ctx.createGain();
    this.musicBus.gain.value = 0.85;
    this.musicBus.connect(rolloff);

    /* a small warm room, from a decaying-noise impulse */
    const convolver = ctx.createConvolver();
    convolver.buffer = makeImpulse(ctx, 2.4, 2.6);
    this.reverbSend = ctx.createGain();
    this.reverbSend.gain.value = 0.3;
    this.reverbSend.connect(convolver);
    convolver.connect(rolloff);

    /*
     * The interface bus. Deliberately not routed through `rolloff` with the
     * music: those filters are the record's frequency response, and a link you
     * hovered is not on the record. It gets a gentler lid and a little of the
     * same room instead, so it belongs to the space without being pressed into
     * the vinyl.
     */
    this.ui = ctx.createGain();

    const uiTone = ctx.createBiquadFilter();
    uiTone.type = "lowpass";
    uiTone.frequency.value = 9000;
    this.ui.connect(uiTone);
    uiTone.connect(this.master);

    const uiRoom = ctx.createGain();
    uiRoom.gain.value = 0.5;
    this.ui.connect(uiRoom);
    uiRoom.connect(this.reverbSend);

    /* wow and flutter: the platter is not perfectly round, and never was */
    this.wow = ctx.createOscillator();
    this.wow.frequency.value = 0.42;
    this.wowDepth = ctx.createGain();
    this.wowDepth.gain.value = 5.5; // cents
    this.wow.connect(this.wowDepth);
    this.wow.start();

    this.flutter = ctx.createOscillator();
    this.flutter.frequency.value = 6.2;
    this.flutterDepth = ctx.createGain();
    this.flutterDepth.gain.value = 1.6; // cents
    this.flutter.connect(this.flutterDepth);
    this.flutter.start();

    /* surface noise: a continuous bed, sitting under everything */
    this.surface = ctx.createGain();
    this.surface.gain.value = 0;
    this.surface.connect(this.master);

    const hiss = ctx.createBufferSource();
    hiss.buffer = this.noiseBuffer;
    hiss.loop = true;

    const hissBand = ctx.createBiquadFilter();
    hissBand.type = "bandpass";
    hissBand.frequency.value = 2600;
    hissBand.Q.value = 0.5;

    const hissGain = ctx.createGain();
    hissGain.gain.value = 0.02;

    hiss.connect(hissBand);
    hissBand.connect(hissGain);
    hissGain.connect(this.surface);
    hiss.start();
  }

  /* ---- scheduling ----------------------------------------------------- */

  /**
   * The lookahead scheduler. setInterval is far too coarse to place notes on,
   * so it does nothing but ask "what falls in the next 400ms" and hand those
   * events to the audio clock, which is sample-accurate.
   */
  private schedule() {
    const ctx = this.ctx;
    if (!ctx || !this.playing) return;

    const until = ctx.currentTime + LOOKAHEAD;

    while (this.nextNoteTime < until) {
      this.playBeat(this.beat, this.nextNoteTime);
      this.beat += 1;
      this.nextNoteTime += SECONDS_PER_BEAT;
    }

    // Crackle runs on its own clock. It has nothing to do with the tempo,
    // which is exactly why it convinces.
    while (this.nextCrackle < until) {
      this.crackle(this.nextCrackle);
      this.nextCrackle += 0.03 + Math.random() * 0.22;
    }

    while (this.nextThump < until) {
      this.thump(this.nextThump);
      this.nextThump += ROTATION;
    }
  }

  private playBeat(beat: number, time: number) {
    const beatInBar = beat % BEATS_PER_BAR;
    const bar = Math.floor(beat / BEATS_PER_BAR);
    const chordIndex = Math.floor(bar / BARS_PER_CHORD) % PROGRESSION.length;
    const chord = PROGRESSION[chordIndex];
    const barInChord = bar % BARS_PER_CHORD;

    /* ---- bass ---- */
    if (beatInBar === 0) {
      this.bass(midi(chord.root), time, 1.5, 0.5);
    } else if (beatInBar === 2) {
      this.bass(midi(chord.walk), time, 1.1, 0.34);
    } else if (beatInBar === 3 && barInChord === 1) {
      // walk into the next chord by a semitone from above, the one moment
      // in the loop where the bass gives away that it knows what comes next
      const next = PROGRESSION[(chordIndex + 1) % PROGRESSION.length];
      this.bass(midi(next.root + 1), time + SECONDS_PER_BEAT * 0.5, 0.5, 0.26);
    }

    /* ---- rhodes ---- */
    // Chords land on 1 of the first bar and on the "and of 3" of the second,
    // pushed slightly late both times. A chord exactly on the beat sounds
    // typed rather than played.
    if (beatInBar === 0 && barInChord === 0) {
      this.chord(chord.voicing, time + 0.02, 0.32);
    } else if (beatInBar === 2 && barInChord === 1) {
      this.chord(chord.voicing, time + SECONDS_PER_BEAT * 0.5 + 0.02, 0.2, true);
    }

    /* ---- brushes ---- */
    // Backbeat, plus a soft pulse on the offbeats so the bar has a floor.
    if (beatInBar === 1 || beatInBar === 3) this.brush(time, 0.055, 0.32);
    this.brush(time + SECONDS_PER_BEAT * 0.5, 0.02, 0.16);

    /* ---- melody ---- */
    // Sparse on purpose. Never on the downbeat (the chord has that), never
    // twice in a row, and silent altogether for whole bars at a time.
    if (beatInBar !== 0 && Math.random() < 0.22) {
      const note = chord.colour[Math.floor(Math.random() * chord.colour.length)];
      const swing = Math.random() < 0.4 ? SECONDS_PER_BEAT * 0.5 : 0;
      this.bell(midi(note), time + swing, 0.1 + Math.random() * 0.05);
    }
  }

  /* ---- voices --------------------------------------------------------- */

  /** Route an oscillator through the shared warp. */
  private warp(osc: OscillatorNode) {
    this.wowDepth.connect(osc.detune);
    this.flutterDepth.connect(osc.detune);
  }

  private send(node: AudioNode, dry = 1) {
    const gain = this.ctx!.createGain();
    gain.gain.value = dry;
    node.connect(gain);
    gain.connect(this.musicBus);
    node.connect(this.reverbSend);
    return gain;
  }

  /**
   * The Rhodes. Two-operator FM: a modulator at 3× the carrier with an index
   * that collapses in a third of a second, which is the tine being struck and
   * then getting out of the way. Everything after that is just a sine.
   */
  private tine(freq: number, time: number, dur: number, velocity: number) {
    const ctx = this.ctx!;

    const carrier = ctx.createOscillator();
    carrier.frequency.value = freq;
    this.warp(carrier);

    const mod = ctx.createOscillator();
    mod.frequency.value = freq * 3;

    const index = ctx.createGain();
    index.gain.setValueAtTime(freq * 2.4 * velocity, time);
    index.gain.exponentialRampToValueAtTime(freq * 0.03, time + 0.3);
    mod.connect(index);
    index.connect(carrier.frequency);

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(velocity, time + 0.012);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    carrier.connect(amp);

    // Spread the voicing across the stereo field a little, the way a real
    // instrument in a real room is never a point source.
    const pan = ctx.createStereoPanner();
    pan.pan.value = (Math.random() - 0.5) * 0.45;
    amp.connect(pan);
    this.send(pan, 0.85);

    carrier.start(time);
    mod.start(time);
    carrier.stop(time + dur + 0.1);
    mod.stop(time + dur + 0.1);
  }

  /**
   * A voicing, rolled rather than struck. ~18ms between notes low to high.
   * Below that it is a chord, above it is an arpeggio.
   */
  private chord(voicing: number[], time: number, velocity: number, thin = false) {
    const notes = thin ? voicing.slice(1) : voicing;
    notes.forEach((note, i) => {
      this.tine(
        midi(note),
        time + i * 0.018,
        3.4 + Math.random() * 0.6,
        // top of the voicing slightly quieter, like a hand that leans left
        velocity * (1 - i * 0.08)
      );
    });
  }

  /** Upright bass: a sine with a thump on the front and a very short tail. */
  private bass(freq: number, time: number, dur: number, velocity: number) {
    const ctx = this.ctx!;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    this.warp(osc);

    // the pitch falls into the note over 45ms, that's the finger pulling the
    // string down to the board, and it is most of what says "upright"
    osc.frequency.setValueAtTime(freq * 1.12, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.045);

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(velocity, time + 0.03);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    // takes the edge off, so it sits under the Rhodes instead of beside it
    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 420;

    osc.connect(amp);
    amp.connect(tone);
    this.send(tone, 0.9);

    osc.start(time);
    osc.stop(time + dur + 0.1);
  }

  /** The sparse melody voice: glassy, slow in, no attack transient. */
  private bell(freq: number, time: number, velocity: number) {
    const ctx = this.ctx!;

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;
    this.warp(osc);

    const vib = ctx.createOscillator();
    vib.frequency.value = 4.6;
    const vibDepth = ctx.createGain();
    vibDepth.gain.value = 3.5;
    vib.connect(vibDepth);
    vibDepth.connect(osc.detune);

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.linearRampToValueAtTime(velocity, time + 0.09);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + 2.2);

    const soften = ctx.createBiquadFilter();
    soften.type = "lowpass";
    soften.frequency.value = 2400;

    const pan = ctx.createStereoPanner();
    pan.pan.value = (Math.random() - 0.5) * 0.6;

    osc.connect(amp);
    amp.connect(soften);
    soften.connect(pan);
    // more room on the melody than on anything else, it's the furthest away
    this.send(pan, 0.6);

    osc.start(time);
    vib.start(time);
    osc.stop(time + 2.4);
    vib.stop(time + 2.4);
  }

  /** Brushes on a snare: filtered noise with a swell, not a hit. */
  private brush(time: number, velocity: number, dur: number) {
    const ctx = this.ctx!;

    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.playbackRate.value = 0.8 + Math.random() * 0.4;

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 3200 + Math.random() * 900;
    band.Q.value = 0.9;

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, time);
    // the swell is what makes it a brush. A sharp attack here is a stick
    amp.gain.linearRampToValueAtTime(velocity, time + dur * 0.45);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    src.connect(band);
    band.connect(amp);
    this.send(amp, 0.5);

    src.start(time, Math.random() * 1.5);
    src.stop(time + dur + 0.05);
  }

  /* ---- the record itself ---------------------------------------------- */

  /** One pop. Bandpassed noise, a few milliseconds long, randomly placed. */
  private crackle(time: number) {
    const ctx = this.ctx!;
    // Most pops are almost inaudible; every so often there's a real one.
    const loud = Math.random() < 0.07;
    const velocity = loud ? 0.07 + Math.random() * 0.06 : 0.012 + Math.random() * 0.025;
    const dur = loud ? 0.02 : 0.006;

    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 1200 + Math.random() * 2600;
    band.Q.value = 1.4;

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(velocity, time);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    const pan = ctx.createStereoPanner();
    pan.pan.value = (Math.random() - 0.5) * 1.2;

    src.connect(band);
    band.connect(amp);
    amp.connect(pan);
    pan.connect(this.surface);

    src.start(time, Math.random() * 1.8);
    src.stop(time + dur + 0.02);
  }

  /**
   * Once per revolution, 1.8s apart, forever. A low thump from the warp plus
   * a scuff on the same spot of the groove.
   *
   * This is the detail that does the most work in the whole file. A steady
   * clock underneath unsynced crackle is what a physical disc sounds like;
   * random noise alone just sounds like noise.
   */
  private thump(time: number) {
    const ctx = this.ctx!;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(62, time);
    osc.frequency.exponentialRampToValueAtTime(34, time + 0.12);

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(0.05, time + 0.01);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

    osc.connect(amp);
    amp.connect(this.surface);
    osc.start(time);
    osc.stop(time + 0.24);

    this.crackle(time + 0.004);
  }

  /**
   * One interface sound.
   *
   * Silently does nothing unless the record is actually on. That is the whole
   * consent model in one line: the toggle in the header is the site's sound
   * switch, not the music's, so somebody who turned it off does not start
   * getting clicked at because they moved the mouse.
   */
  ping(kind: Ping) {
    const ctx = this.ctx;
    if (!ctx || !this.playing || ctx.state !== "running") return;

    const spec = PINGS[kind];
    const time = ctx.currentTime + 0.005;

    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.playbackRate.value = 0.85 + Math.random() * 0.3;

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    // ±10% on the centre frequency, so twenty hovers in a row are twenty
    // slightly different sounds rather than one sound twenty times.
    band.frequency.value = spec.freq * (0.9 + Math.random() * 0.2);
    band.Q.value = spec.q;

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(spec.gain, time + spec.attack);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + spec.dur);

    const pan = ctx.createStereoPanner();
    pan.pan.value = (Math.random() - 0.5) * 0.3;

    src.connect(band);
    band.connect(amp);
    amp.connect(pan);
    pan.connect(this.ui);

    src.start(time, Math.random() * 1.5);
    src.stop(time + spec.dur + 0.03);
  }

  /** Stylus meeting (or leaving) the groove. */
  private needleDrop(time: number, velocity = 0.9) {
    const ctx = this.ctx!;

    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.setValueAtTime(2400, time);
    band.frequency.exponentialRampToValueAtTime(700, time + 0.12);
    band.Q.value = 0.9;

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(0.09 * velocity, time + 0.006);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);

    src.connect(band);
    band.connect(amp);
    // Straight to master: the needle is not in the room, it is on the record.
    amp.connect(this.master);

    src.start(time, Math.random());
    src.stop(time + 0.2);
  }
}

/* -------------------------------------------------------------------------
 * the one turntable
 * ---------------------------------------------------------------------- */

/**
 * There is one record player in this bar.
 *
 * A singleton rather than an instance per component, because two things now
 * need to reach it: the toggle in the header, and the interface sounds, which
 * are triggered from a document-level listener with no component near them.
 *
 * It deliberately outlives any one mount. Nav re-mounts on every client-side
 * route change, and an engine tied to that lifetime would tear the AudioContext
 * down and stop the music every time somebody clicked through to the blog.
 */
let turntable: HouseRecord | null = null;

export function getHouseRecord() {
  if (!turntable) turntable = new HouseRecord();
  return turntable;
}

/** Fire an interface sound, if there is anything to fire it through. */
export function ping(kind: Ping) {
  turntable?.ping(kind);
}

/* -------------------------------------------------------------------------
 * buffers
 * ---------------------------------------------------------------------- */

/** White noise, looped. One buffer, reused by every noise voice on the page. */
function makeNoise(ctx: AudioContext, seconds: number) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

/**
 * A reverb impulse, generated rather than sampled: decaying stereo noise.
 * It is not a real room, but at 30% wet on a Rhodes nobody is measuring.
 */
function makeImpulse(ctx: AudioContext, seconds: number, decay: number) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);

  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i += 1) {
      const t = i / length;
      // a few ms of near-silence first, so the room has a size
      const predelay = t < 0.012 ? t / 0.012 : 1;
      data[i] = (Math.random() * 2 - 1) * (1 - t) ** decay * predelay;
    }
  }

  return buffer;
}
