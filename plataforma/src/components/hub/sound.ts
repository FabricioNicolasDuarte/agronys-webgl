let ctx: AudioContext | null = null;

function context() {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function tick(ac: AudioContext, now: number, freq: number, peak: number, seconds: number) {
  const frames = Math.max(1, Math.floor(ac.sampleRate * seconds));
  const buffer = ac.createBuffer(1, frames, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  const noise = ac.createBufferSource();
  noise.buffer = buffer;
  const filter = ac.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = freq;
  filter.Q.value = 0.7;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(peak, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);
  noise.start(now);
  noise.stop(now + seconds);
}

function body(ac: AudioContext, now: number, start: number, end: number, peak: number, seconds: number) {
  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(start, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(40, end), now + seconds * 0.55);
  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);
  osc.start(now);
  osc.stop(now + seconds + 0.02);
}

function play(open: boolean) {
  try {
    const ac = context();
    if (ac.state === "suspended") void ac.resume();
    const now = ac.currentTime;
    if (open) {
      tick(ac, now, 1800, 0.03, 0.018);
      body(ac, now, 210, 246, 0.04, 0.09);
      return;
    }
    tick(ac, now, 900, 0.02, 0.016);
    body(ac, now, 196, 148, 0.032, 0.11);
  } catch {
    /* sin audio */
  }
}

export function playOpen() {
  play(true);
}

export function playClose() {
  play(false);
}
