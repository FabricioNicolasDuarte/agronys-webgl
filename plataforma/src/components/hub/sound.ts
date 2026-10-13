let ctx: AudioContext | null = null;

function context() {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function tap(ac: AudioContext, down: boolean) {
  const now = ac.currentTime;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(down ? 0.032 : 0.045, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + (down ? 0.11 : 0.14));
  gain.connect(ac.destination);
  const base = down ? 420 : 640;
  [base, base * 1.5].forEach((freq, i) => {
    const osc = ac.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * (down ? 0.86 : 1.12), now + 0.08);
    osc.connect(gain);
    osc.start(now + i * 0.018);
    osc.stop(now + 0.16);
  });
}

function play(down: boolean) {
  try {
    const ac = context();
    const start = () => tap(ac, down);
    if (ac.state === "running") start();
    else void ac.resume().then(start);
  } catch {
    /* sin audio */
  }
}

export function playOpen() {
  play(false);
}

export function playClose() {
  play(true);
}
