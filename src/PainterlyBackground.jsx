// PainterlyBackground.jsx
import React, { useEffect, useRef } from "react";
import "./home.css";

// --- helpers (same painterly look as Home) ---
function hexToRgb(hex){const m=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);if(!m)return{r:11,g:15,b:26};return{r:parseInt(m[1],16),g:parseInt(m[2],16),b:parseInt(m[3],16)}}
const mix=(a,b,t)=>Math.round(a+(b-a)*t);
const toCss=({r,g,b},a=1)=>`rgba(${r|0},${g|0},${b|0},${a})`;
const darken=(rgb,t)=>({r:mix(rgb.r,0,t),g:mix(rgb.g,0,t),b:mix(rgb.b,0,t)});
const lighten=(rgb,t)=>({r:mix(rgb.r,255,t),g:mix(rgb.g,255,t),b:mix(rgb.b,255,t)});

function paint(ctx,W,H,baseHex){
  const base=hexToRgb(baseHex), bg=darken(base,.82), inkDark=darken(base,.6), inkDarker=darken(base,.86), chalk=lighten(base,.8);
  ctx.globalCompositeOperation="source-over"; ctx.fillStyle=toCss(bg,1); ctx.fillRect(0,0,W,H);
  ctx.globalCompositeOperation="overlay";
  for(let i=0;i<10;i++){const x=Math.random()*W,y=Math.random()*H,r=(Math.random()*.3+.25)*Math.max(W,H);
    const g=ctx.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,toCss(lighten(base,.12),.06)); g.addColorStop(1,toCss(darken(base,.92),0));
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();}
  ctx.globalCompositeOperation="overlay";
  for(let i=0;i<18;i++){const cx=Math.random()*W,cy=Math.random()*H; const radius=(Math.random()*.8+.25)*Math.max(W,H);
    const start=Math.random()*Math.PI*2; const end=start+(Math.random()*.8+.2)*(Math.random()<.5?1:-1);
    ctx.strokeStyle=toCss(chalk,.08+Math.random()*.07); ctx.lineWidth=10+Math.random()*30; ctx.lineCap="round"; ctx.beginPath(); ctx.arc(cx,cy,radius,start,end); ctx.stroke();}
  ctx.globalCompositeOperation="multiply";
  for(let b=0;b<3;b++){const count=220+Math.floor(Math.random()*130);
    for(let i=0;i<count;i++){const x=Math.random()*W,y=Math.random()*H; const r=Math.pow(Math.random(),2)*6.5+.6;
      ctx.fillStyle=Math.random()<.8?toCss(inkDarker,.54):toCss(inkDark,.34);
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
      if(Math.random()<.08){const len=7+Math.random()*48; ctx.strokeStyle=toCss(inkDarker,.45); ctx.lineWidth=.8+Math.random()*1.3; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+(Math.random()-.5)*5,y+len); ctx.stroke();}}}
  ctx.globalCompositeOperation="screen";
  for(let i=0;i<240;i++){const x=Math.random()*W,y=Math.random()*H,r=Math.random()*2+.4;
    ctx.fillStyle=toCss(chalk,.08+Math.random()*.06); ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();}
  ctx.globalCompositeOperation="screen"; ctx.strokeStyle=toCss(lighten(base,.92),.25);
  for(let i=0;i<160;i++){const segs=6+Math.floor(Math.random()*10); let px=Math.random()*W,py=Math.random()*H;
    ctx.lineWidth=.7+Math.random()*.8; ctx.beginPath(); ctx.moveTo(px,py);
    for(let s=0;s<segs;s++){px+=(Math.random()-.5)*34; py+=(Math.random()-.2)*22; ctx.lineTo(px,py);} ctx.stroke();}
}
// PainterlyBackground.jsx

export default function PainterlyBackground({ baseColor }) {
  const color = baseColor || (typeof window!=="undefined" && localStorage.getItem("ph.baseColor")) || "#0B0F1A";
  const ref = useRef(null);

  useEffect(() => {
    const cvs = ref.current; if (!cvs) return;
    const ctx = cvs.getContext("2d", { alpha: false });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const vv  = window.visualViewport;

    const getSize = () => {
      const w = Math.ceil(vv?.width  || window.innerWidth);
      const h = Math.ceil(vv?.height || window.innerHeight);
      return { w, h };
    };

    const resize = () => {
      const { w, h } = getSize();
      // buffer size
      cvs.width  = w * dpr;
      cvs.height = h * dpr;
      // CSS size — tie to dynamic viewport units so it visually covers even during toolbar animation
      cvs.style.width  = "100dvw";
      cvs.style.height = "100dvh";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(ctx, w, h, color);
    };

    resize();
    vv?.addEventListener("resize", resize);
    window.addEventListener("resize", resize);
    return () => {
      vv?.removeEventListener("resize", resize);
      window.removeEventListener("resize", resize);
    };
  }, [color]);

  return (
    <>
      {/* base layer (kept) */}
      <div
        className="pbg-layer fixed inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1200px 800px at 30% 20%, rgba(255,255,255,0.04), transparent 60%), radial-gradient(1000px 700px at 70% 70%, rgba(0,0,0,0.15), transparent 65%)",
          backgroundColor: "rgba(0,0,0,.9)",
        }}
      />
      {/* canvas layer */}
      <canvas ref={ref} className="pbg-canvas fixed inset-0 -z-10" />
      <div className="pulse-fill" />
      <div className="pulse-cracks" style={{ animationDelay: "160ms" }} />
    </>
  );
}
