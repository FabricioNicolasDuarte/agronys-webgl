let ctx;

function context() {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

/** Soft UI tick — two short harmonics. */
export function playTap() {
  try {
    const ac = context();
    if (ac.state === "suspended") ac.resume();
    const now = ac.currentTime;
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    gain.connect(ac.destination);

    [640, 960].forEach((freq, i) => {
      const osc = ac.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.12, now + 0.08);
      osc.connect(gain);
      osc.start(now + i * 0.018);
      osc.stop(now + 0.15);
    });
  } catch {
    /* autoplay / unsupported */
  }
}
