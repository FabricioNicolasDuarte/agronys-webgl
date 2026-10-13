const KEY = "agronys-sound";
const FLIGHT = 2.8;

function air(ac: AudioContext, seconds: number) {
  const length = Math.floor(ac.sampleRate * seconds);
  const buffer = ac.createBuffer(1, length, ac.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    last = last * 0.97 + white * 0.03;
    data[i] = last * 4;
  }
  return buffer;
}

function curve(param: AudioParam, points: [number, number][], elapsed: number, now: number) {
  const pending = points.filter(([t]) => t + 0.02 > elapsed);
  if (!pending.length) return;
  let cursor = now;
  param.setValueAtTime(Math.max(0.0001, pending[0][1]), cursor);
  pending.slice(1).forEach(([t, value]) => {
    const when = now + Math.max(0.03, t - elapsed);
    if (when <= cursor) return;
    cursor = when;
    param.exponentialRampToValueAtTime(Math.max(0.0001, value), cursor);
  });
}

function schedule(ac: AudioContext, elapsed: number) {
  const now = ac.currentTime;
  const master = ac.createGain();
  master.gain.value = 0.85;
  master.connect(ac.destination);
  const at = (t: number) => now + Math.max(0, t - elapsed);

  if (elapsed < 0.7) {
    const bloom = ac.createOscillator();
    const bloomGain = ac.createGain();
    bloom.type = "sine";
    curve(bloom.frequency, [[0, 246], [0.7, 520]], elapsed, now);
    curve(bloomGain.gain, [[0, 0.0001], [0.18, 0.16], [0.85, 0.0001]], elapsed, now);
    bloom.connect(bloomGain);
    bloomGain.connect(master);
    bloom.start(at(0));
    bloom.stop(at(0.95));
  }

  if (elapsed < 2.5) {
    const src = ac.createBufferSource();
    src.buffer = air(ac, 2.2);
    const filter = ac.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 0.7;
    const whoosh = ac.createGain();
    curve(filter.frequency, [[0.75, 1400], [2.45, 280]], elapsed, now);
    curve(whoosh.gain, [[0.72, 0.0001], [1.35, 0.55], [2.35, 0.2], [2.7, 0.0001]], elapsed, now);
    src.connect(filter);
    filter.connect(whoosh);
    whoosh.connect(master);
    src.start(now);
    src.stop(at(2.75));
  }

  const land = ac.createOscillator();
  const landGain = ac.createGain();
  land.type = "sine";
  curve(land.frequency, [[2.48, 160], [2.78, 90]], elapsed, now);
  curve(landGain.gain, [[2.48, 0.0001], [2.52, 0.28], [2.85, 0.0001]], elapsed, now);
  land.connect(landGain);
  landGain.connect(master);
  land.start(at(2.48));
  land.stop(at(2.95));
}

export function playLogoFlight() {
  try {
    if (localStorage.getItem(KEY) === "off") return () => {};
  } catch {
    /* si no hay almacenamiento, el sonido sigue */
  }

  const ac = new AudioContext();
  const born = performance.now();
  let started = false;
  let dead = false;

  const start = () => {
    if (started || dead || ac.state !== "running") return;
    const elapsed = (performance.now() - born) / 1000;
    if (elapsed > FLIGHT) return;
    started = true;
    schedule(ac, elapsed);
  };

  const arm = () => {
    if (ac.state === "running") start();
    else void ac.resume().then(start);
  };

  arm();
  window.addEventListener("pointerdown", arm);
  window.addEventListener("keydown", arm);

  return () => {
    dead = true;
    window.removeEventListener("pointerdown", arm);
    window.removeEventListener("keydown", arm);
    void ac.close();
  };
}
