/* Finite-state controller. Rendering is provided by app.js. */
window.createNavigation = function ({ render, onStart, reducedMotion, now = () => performance.now(), schedule = setTimeout }) {
  const scenes = ['hero', 'frameworks-1-2', 'frameworks-3-4', 'frameworks-5-6', 'frameworks-7-8', 'closing'];
  let current = 0;
  let lockedUntil = 0;
  let wheelQuietUntil = 0;
  let wheelTotal = 0;
  let wheelDirection = 0;
  function move(direction, source = 'keyboard') {
    const time = now();
    if (time < lockedUntil || (source !== 'wheel' && time < wheelQuietUntil)) return false;
    const next = Math.max(0, Math.min(scenes.length - 1, current + direction));
    if (next === current) return false;
    onStart();
    const previous = current;
    current = next;
    const duration = reducedMotion() ? 0 : (previous === 0 || next === 0 ? 900 : (previous === 5 || next === 5 ? 0 : 600));
    // Input cooldown also protects immediate overlays and reduced-motion changes.
    lockedUntil = time + Math.max(duration + 160, 350);
    render(current, previous, duration);
    schedule(() => { if (now() >= lockedUntil) wheelTotal = 0; }, Math.max(duration + 160, 350));
    return true;
  }
  function wheel(delta) {
    const time = now();
    const quiet = time >= wheelQuietUntil;
    wheelQuietUntil = time + 280;
    if (!delta || time < lockedUntil || !quiet && wheelTotal === 0) return false;
    const direction = Math.sign(delta);
    if (direction !== wheelDirection || quiet) wheelTotal = 0;
    wheelDirection = direction;
    wheelTotal += delta;
    if (Math.abs(wheelTotal) < 35) return false;
    wheelTotal = 0;
    return move(direction, 'wheel');
  }
  return { move, wheel, get current() { return current; }, scenes };
};
