// burnTransition.js — jagged burn FRONT, starts TOP-RIGHT ➜ sweeps to BOTTOM-RIGHT
// Returns a Promise that resolves with { overlay } (still attached).
// App.js will remove overlay after swapping routes to avoid any flash.

const easeCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// lightweight value-noise for edge jitter & flame movement
function makeNoise(seed = 1337) {
  const rand = () => (seed = (seed * 1664525 + 1013904223) | 0, ((seed >>> 0) % 100000) / 100000);
  const g = new Map();
  const key = (x, y) => `${x},${y}`;
  const dot = (ix, iy) => (g.has(key(ix, iy)) ? g.get(key(ix, iy)) : g.set(key(ix, iy), rand()).get(key(ix, iy)));
  return function n2(x, y) {
    const ix = Math.floor(x), iy = Math.floor(y);
    const fx = x - ix,       fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    const v00 = dot(ix, iy), v10 = dot(ix + 1, iy), v01 = dot(ix, iy + 1), v11 = dot(ix + 1, iy + 1);
    return ((v00 * (1 - sx) + v10 * sx) * (1 - sy)) + ((v01 * (1 - sx) + v11 * sx) * sy);
  };
}

export function playBurnTransition({ duration = 1250 } = {}) {
  return new Promise((resolve) => {
    const W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const DIAG = Math.hypot(W, H);

    // overlay container
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;z-index:999999;pointer-events:none;";
    document.body.appendChild(overlay);

    // char/cover + flame layers
    const char = document.createElement("canvas");
    const flame = document.createElement("canvas");
    char.width = flame.width = W; char.height = flame.height = H;
    Object.assign(char.style, {position:"absolute", inset:0, mixBlendMode:"normal"});
    Object.assign(flame.style,{position:"absolute", inset:0, mixBlendMode:"screen"});
    overlay.appendChild(char); overlay.appendChild(flame);

    const c = char.getContext("2d");
    const f = flame.getContext("2d");
    const noise = makeNoise();

    // rotate space so the FRONT is horizontal in rotated coords
    const theta = Math.PI / 4;                 // 45° sweep
    const cos = Math.cos(theta), sin = Math.sin(theta);
    const rot  = (x, y) => ({ x:  x * cos + y * sin, y: -x * sin + y * cos });
    const irot = (xp, yp) => ({ x: xp * cos - yp * sin, y: xp * sin + yp * cos });

    // bounds in rotated space
    const corners = [rot(0,0), rot(W,0), rot(0,H), rot(W,H)];
    const minXp = Math.min(...corners.map(p => p.x)) - 140;
    const maxXp = Math.max(...corners.map(p => p.x)) + 140;
    const maxYp = Math.max(...corners.map(p => p.y)) + 140;

    // >>> Start point = TOP-RIGHT (rotated coords of (W,0))
    const TR = rot(W, 0);
    const start = TR.y - 140;   // just above that corner
    const end   = maxYp;        // sweep to bottom-right

    // beefy fire look
    const N           = 260;  // samples along edge
    const EDGE_NOISE  = 0.018;
    const EDGE_AMP    = 52;   // jagged rim
    const BREAK_FREQ  = 0.09; // little gaps
    const FRONT_THK   = 72;   // thick fiery band

    const t0 = performance.now();
    let raf;

    function step(now) {
      let t = (now - t0) / duration;
      if (t > 1) t = 1;
      const e = easeCubic(t);

      // FRONT offset (perp to the edge) in rotated space
      const d = start + (end - start) * e;

      // === CHAR / BURNT REGION ===
      c.clearRect(0, 0, W, H);

      // smoky backdrop
      const smoke = c.createRadialGradient(W * .5, H * .5, 0, W * .5, H * .5, DIAG * .85);
      smoke.addColorStop(0.00, "rgba(50,25,10,0.07)");
      smoke.addColorStop(0.65, "rgba(20,10,5,0.34)");
      smoke.addColorStop(0.90, "rgba(0,0,0,0.72)");
      c.fillStyle = smoke; c.fillRect(0, 0, W, H);

      // jagged front points
      const pts = [];
      for (let i = 0; i <= N; i++) {
        const xp = minXp + (maxXp - minXp) * (i / N);
        const n = noise(xp * EDGE_NOISE, now * 0.0008);
        const gaps = Math.sin(xp * BREAK_FREQ) * Math.sin(xp * (BREAK_FREQ * 0.5)) * 0.6;
        const yp = d + (n - 0.5) * EDGE_AMP + gaps * 20;
        const { x, y } = irot(xp, yp);
        pts.push([x, y]);
      }

      // fill everything "behind" the edge (burnt area)
      const normal = { x: -sin, y: cos };
      const L = DIAG * 2.4;
      c.beginPath();
      c.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]);
      c.lineTo(pts[pts.length - 1][0] - normal.x * L, pts[pts.length - 1][1] - normal.y * L);
      c.lineTo(pts[0][0] - normal.x * L,           pts[0][1] - normal.y * L);
      c.closePath();
      c.fillStyle = "rgba(0,0,0,0.985)";
      c.fill();

      // ember glow hugging the edge
      c.save();
      c.globalCompositeOperation = "lighter";
      c.lineJoin = "round"; c.lineCap = "round";
      c.beginPath();
      c.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]);
      const edgeGrad = c.createLinearGradient(0, 0, normal.x * 1 + 1, normal.y * 1 + 1);
      edgeGrad.addColorStop(0, "rgba(255,140,42,0.42)");
      edgeGrad.addColorStop(1, "rgba(255,70,20,0.22)");
      c.strokeStyle = edgeGrad;
      c.lineWidth = FRONT_THK;
      c.stroke();
      c.restore();

      // === FLAME (rides the edge) ===
      f.clearRect(0, 0, W, H);
      f.save();
      f.globalCompositeOperation = "lighter";
      f.lineJoin = "round"; f.lineCap = "round";

      // broad glow band on the unburnt side
      f.beginPath();
      f.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) f.lineTo(pts[i][0], pts[i][1]);
      const band = f.createLinearGradient(0, 0, normal.x * (FRONT_THK * 1.2), normal.y * (FRONT_THK * 1.2));
      band.addColorStop(0.00, "rgba(255,160,46,0.42)");
      band.addColorStop(0.55, "rgba(255,105,26,0.28)");
      band.addColorStop(1.00, "rgba(0,0,0,0.0)");
      f.strokeStyle = band;
      f.lineWidth = FRONT_THK * 1.1;
      f.stroke();

      // dense tongues along edge
      const K = 8;
      for (let i = 0; i < pts.length; i += K) {
        const [bx, by] = pts[i];
        const amp = 140 + Math.random() * 210;
        const wid = 36 + Math.random() * 40;
        const jitter = (p) => (noise((i + p) * 0.09, now * 0.002) - 0.5) * 28;

        f.beginPath();
        f.moveTo(bx, by);
        for (let s = 1; s <= 6; s++) {
          const p = s / 6;
          const px = bx + (normal.x * amp * p) + jitter(p);
          const py = by + (normal.y * amp * p) + jitter(p) * 0.65;
          f.lineTo(px + (p - 0.5) * wid * 0.85, py);
        }
        for (let s = 6; s >= 0; s--) {
          const p = s / 6;
          const px = bx + (normal.x * amp * p) + jitter(p);
          const py = by + (normal.y * amp * p) + jitter(p) * 0.65;
          f.lineTo(px - (p - 0.5) * wid * 0.85, py);
        }

        const gx = bx + normal.x * amp, gy = by + normal.y * amp;
        const grad = f.createLinearGradient(bx, by, gx, gy);
        grad.addColorStop(0.00, "rgba(20,110,255,0.88)"); // blue root
        grad.addColorStop(0.22, "rgba(255,165,44,0.86)"); // orange
        grad.addColorStop(0.68, "rgba(232,58,24,0.64)");  // red
        grad.addColorStop(1.00, "rgba(232,42,15,0.00)");
        f.fillStyle = grad;
        f.fill();
      }

      // embers
      const emberCount = 42;
      for (let i = 0; i < emberCount; i++) {
        const tpos = i / emberCount;
        const idx = Math.floor(tpos * (pts.length - 1));
        const [ex, ey] = pts[idx];
        const off = (Math.random() - 0.5) * 28;
        const px = ex + normal.x * (34 + Math.random() * 90) + off;
        const py = ey + normal.y * (18 + Math.random() * 50) - (now - t0) * 0.027;
        const s = 1.6 + Math.random() * 2.4;
        const grd = f.createRadialGradient(px, py, 0, px, py, s * 6);
        grd.addColorStop(0, "rgba(255,155,60,0.92)");
        grd.addColorStop(1, "rgba(255,155,60,0.00)");
        f.fillStyle = grd;
        f.beginPath(); f.arc(px, py, s, 0, Math.PI * 2); f.fill();
      }

      f.restore();

      if (t < 1) requestAnimationFrame(step);
      else resolve({ overlay }); // <— leave overlay on for App.js to remove AFTER route swap
    }

    requestAnimationFrame(step);
  });
}
