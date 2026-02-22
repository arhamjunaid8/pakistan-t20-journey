import { useRef, useEffect, useState } from "react";

// ─── UNSPLASH FREE IMAGES ────────────────────────────────────────────────────
const IMGS = {
  cricket:
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80',
  stadium:
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80',
  crowd:
    'https://images.unsplash.com/photo-1598550473359-6a08e7de1640?w=1200&q=80',
  srilanka:
    'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=1200&q=80',
  kandy:
    'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=1200&q=80',
  colombo:
    'https://images.unsplash.com/photo-1590123591070-8e9dac7e2f14?w=1200&q=80',
  rain: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1200&q=80',
  trophy:
    'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=1200&q=80',
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const T: Record<string, { g: string; acc: string; txt: string; glow: string }> =
  {
    PAK: {
      g: 'linear-gradient(135deg,#01411C,#025e28)',
      acc: '#10b981',
      txt: '#6ee7b7',
      glow: 'rgba(16,185,129,0.6)',
    },
    ENG: {
      g: 'linear-gradient(135deg,#1a2f6e,#1e3a8a)',
      acc: '#3b82f6',
      txt: '#93c5fd',
      glow: 'rgba(59,130,246,0.6)',
    },
    NZ: {
      g: 'linear-gradient(135deg,#111111,#27272a)',
      acc: '#a1a1aa',
      txt: '#e4e4e7',
      glow: 'rgba(161,161,170,0.4)',
    },
    SL: {
      g: 'linear-gradient(135deg,#1c1775,#2d27a0)',
      acc: '#818cf8',
      txt: '#c7d2fe',
      glow: 'rgba(129,140,248,0.5)',
    },
    NED: {
      g: 'linear-gradient(135deg,#7c2d12,#9a3412)',
      acc: '#f97316',
      txt: '#fed7aa',
      glow: 'rgba(249,115,22,0.5)',
    },
    USA: {
      g: 'linear-gradient(135deg,#172554,#1e3a8a)',
      acc: '#60a5fa',
      txt: '#bfdbfe',
      glow: 'rgba(96,165,250,0.5)',
    },
    IND: {
      g: 'linear-gradient(135deg,#78350f,#92400e)',
      acc: '#f59e0b',
      txt: '#fde68a',
      glow: 'rgba(245,158,11,0.5)',
    },
    NAM: {
      g: 'linear-gradient(135deg,#14532d,#166534)',
      acc: '#4ade80',
      txt: '#bbf7d0',
      glow: 'rgba(74,222,128,0.5)',
    },
  };

const GROUP = [
  {
    date: 'FEB 7',
    opp: 'NED',
    venue: 'SSC Ground · Colombo',
    pak: '148/7',
    osc: '147',
    margin: 'Won by 3 wickets',
    r: 'W',
    img: IMGS.cricket,
  },
  {
    date: 'FEB 10',
    opp: 'USA',
    venue: 'SSC Ground · Colombo',
    pak: '161/9',
    osc: '132/8',
    margin: 'Won by 29 runs',
    r: 'W',
    img: IMGS.crowd,
  },
  {
    date: 'FEB 13',
    opp: 'IND',
    venue: 'SSC Ground · Colombo',
    pak: '114',
    osc: '175',
    margin: 'Lost by 61 runs',
    r: 'L',
    img: IMGS.stadium,
  },
  {
    date: 'FEB 19',
    opp: 'NAM',
    venue: 'SSC Ground · Colombo',
    pak: '199/3',
    osc: '97',
    margin: 'Won by 102 runs',
    r: 'W',
    img: IMGS.cricket,
  },
];

const UPCOM = [
  {
    id: 'engPak',
    date: 'FEB 24',
    t1: 'ENG',
    t2: 'PAK',
    venue: 'Pallekele · Kandy',
    isPak: true,
  },
  {
    id: 'slNz',
    date: 'FEB 25',
    t1: 'SL',
    t2: 'NZ',
    venue: 'R.Premadasa · Colombo',
    isPak: false,
  },
  {
    id: 'engNz',
    date: 'FEB 27',
    t1: 'ENG',
    t2: 'NZ',
    venue: 'R.Premadasa · Colombo',
    isPak: false,
  },
  {
    id: 'slPak',
    date: 'FEB 28',
    t1: 'SL',
    t2: 'PAK',
    venue: 'Pallekele · Kandy',
    isPak: true,
  },
];

function calcStandings(picks: Record<string, string>) {
  const pts: Record<string, number> = { ENG: 2, PAK: 1, NZ: 1, SL: 0 };
  const wins: Record<string, number> = { ENG: 1, PAK: 0, NZ: 0, SL: 0 };
  UPCOM.forEach((m) => {
    const r = picks[m.id];
    if (!r) return;
    if (r === 'NR') {
      [m.t1, m.t2].forEach((t) => pts[t]++);
    } else {
      pts[r] += 2;
      wins[r]++;
    }
  });
  return Object.keys(pts)
    .map((t) => ({ team: t, pts: pts[t], wins: wins[t] }))
    .sort((a, b) => b.pts - a.pts || b.wins - a.wins);
}

// ─── SVG: CRICKET BALL ───────────────────────────────────────────────────────
function Ball({ sz = 40, spin = false }: { sz?: number; spin?: boolean }) {
  return (
    <svg
      width={sz}
      height={sz}
      viewBox="0 0 100 100"
      style={spin ? { animation: 'spinY 3s linear infinite' } : {}}
    >
      <defs>
        <radialGradient id="bg2" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="55%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#450a0a" />
        </radialGradient>
        <radialGradient id="shine2" cx="28%" cy="22%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="bshadow">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor="#b91c1c"
            floodOpacity="0.6"
          />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#bg2)" filter="url(#bshadow)" />
      <circle cx="50" cy="50" r="46" fill="url(#shine2)" />
      <path
        d="M8,50 Q30,36 50,50 Q70,64 92,50"
        fill="none"
        stroke="rgba(255,230,230,0.55)"
        strokeWidth="1.8"
      />
      <path
        d="M8,50 Q30,64 50,50 Q70,36 92,50"
        fill="none"
        stroke="rgba(255,230,230,0.55)"
        strokeWidth="1.8"
      />
      {[33, 40, 47, 54, 61].map((x, i) => (
        <g key={i}>
          <line
            x1={x}
            y1={i % 2 === 0 ? 40 : 43}
            x2={x + 3}
            y2={i % 2 === 0 ? 43 : 40}
            stroke="rgba(255,190,190,0.7)"
            strokeWidth="1"
          />
          <line
            x1={x}
            y1={i % 2 === 0 ? 58 : 55}
            x2={x + 3}
            y2={i % 2 === 0 ? 55 : 58}
            stroke="rgba(255,190,190,0.7)"
            strokeWidth="1"
          />
        </g>
      ))}
    </svg>
  );
}

// ─── SVG: PLAYER SILHOUETTE BATTING ─────────────────────────────────────────
function BatterSilhouette({
  color = '#10b981',
  size = 120,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 120 190"
      style={{ filter: `drop-shadow(0 0 20px ${color}60)` }}
    >
      {/* body */}
      <ellipse cx="60" cy="30" rx="14" ry="14" fill={color} opacity="0.9" />
      {/* torso */}
      <path
        d="M46 44 Q40 70 38 95 Q50 98 60 97 Q70 98 82 95 Q80 70 74 44 Z"
        fill={color}
        opacity="0.85"
      />
      {/* back leg */}
      <path
        d="M55 95 Q50 130 48 160"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      {/* front leg bent */}
      <path
        d="M65 95 Q72 120 85 135 Q90 140 88 155"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      {/* back arm */}
      <path
        d="M46 55 Q30 45 20 35"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      {/* front arm extended with bat */}
      <path
        d="M74 52 Q90 40 105 25"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      {/* bat blade */}
      <path
        d="M100 20 Q118 8 115 30 Q112 45 98 38 Z"
        fill="#d97706"
        opacity="0.95"
      />
      <path
        d="M100 20 Q118 8 115 30"
        stroke="#fbbf24"
        strokeWidth="1.5"
        fill="none"
      />
      {/* helmet */}
      <path d="M47 20 Q47 12 60 10 Q73 12 73 20" fill={color} opacity="0.95" />
      <rect
        x="44"
        y="28"
        width="5"
        height="8"
        rx="2"
        fill={color}
        opacity="0.9"
      />
      {/* glow under feet */}
      <ellipse cx="68" cy="162" rx="22" ry="5" fill={color} opacity="0.2" />
    </svg>
  );
}

// ─── SVG: STUMPS EXPLODING ───────────────────────────────────────────────────
function Stumps({
  explode = false,
  size = 60,
}: {
  explode?: boolean;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 80 104"
      style={explode ? { animation: 'shake 0.3s ease-in-out' } : {}}
    >
      <defs>
        <filter id="stglow">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="3"
            floodColor="#fbbf24"
            floodOpacity={explode ? '0.8' : '0'}
          />
        </filter>
      </defs>
      <ellipse cx="40" cy="100" rx="36" ry="4" fill="rgba(0,0,0,0.4)" />
      {[18, 40, 62].map((x, i) => (
        <rect
          key={i}
          x={x - 3}
          y={explode ? 40 - (i === 1 ? 8 : 4) : 34}
          width={6}
          height={explode ? 56 + (i === 1 ? 8 : 4) : 62}
          rx={3}
          fill={explode ? '#fde68a' : '#f5f0e8'}
          style={
            explode
              ? {
                  animation: `stump${i} 0.5s ease-out forwards`,
                  transformOrigin: `${x}px 98px`,
                }
              : {}
          }
          filter={explode ? 'url(#stglow)' : 'none'}
        />
      ))}
      <rect
        x={15}
        y={explode ? 28 : 30}
        width={50}
        height={6}
        rx={3}
        fill={explode ? '#fde68a' : '#f5f0e8'}
        filter={explode ? 'url(#stglow)' : 'none'}
      />
      {explode &&
        [...Array(8)].map((_, i) => (
          <circle
            key={i}
            cx={40 + Math.cos((i * 45 * Math.PI) / 180) * 20}
            cy={50 + Math.sin((i * 45 * Math.PI) / 180) * 20}
            r={2}
            fill="#fbbf24"
            style={{ animation: `spark${i % 3} 0.6s ease-out forwards` }}
          />
        ))}
    </svg>
  );
}

// ─── PARTICLE SYSTEM ─────────────────────────────────────────────────────────
function ParticleField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      green: Math.random() > 0.65,
    }));
    
    const animate = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = c.width;
        if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height;
        if (p.y > c.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.green
          ? `rgba(16,185,129,${p.alpha})`
          : `rgba(255,255,255,${p.alpha * 0.6})`;
        if (p.green)
          (ctx.shadowColor = 'rgba(16,185,129,0.8)'),
            (ctx.shadowBlur = p.r * 4);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x,
            dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16,185,129,${0.06 * (1 - d / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <canvas
      ref={canvas}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

// ─── ANIMATED NUMBER ─────────────────────────────────────────────────────────
function AnimNum({ n, dur = 1200 }: { n: number; dur?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let s = 0,
      t = 0,
      last = 0;
    const step = (ts: number) => {
      if (!last) last = ts;
      t += ts - last;
      last = ts;
      s = Math.min(t / dur, 1);
      setV(Math.round(n * s));
      if (s < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [n, dur]);
  return <>{v}</>;
}

// ─── PHOTO CARD ──────────────────────────────────────────────────────────────
function PhotoCard({
  img,
  title,
  sub,
  accent = '#10b981',
  overlay = 'rgba(0,0,0,0.55)',
}: {
  img: string;
  title: string;
  sub: string;
  accent?: string;
  overlay?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        height: 140,
        boxShadow: `0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px ${accent}30`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg,#020c04,#041508)',
          zIndex: 0,
        }}
      />
      <img
        src={img}
        alt=""
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 0.55 : 0,
          transition: 'opacity 1s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg,${overlay},rgba(0,0,0,0.2))`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 60%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          padding: 16,
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: 15,
            color: '#fff',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            lineHeight: 1.2,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
          {sub}
        </div>
      </div>
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: accent,
            boxShadow: `0 0 10px ${accent}`,
          }}
        />
      </div>
      {/* shimmer overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.04) 50%,transparent 60%)',
          animation: 'shimmerCard 3s ease-in-out infinite',
        }}
      />
    </div>
  );
}

// ─── MATCH SCORECARD ─────────────────────────────────────────────────────────
function ScoreCard({ m, idx }: { m: (typeof GROUP)[0]; idx: number }) {
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setVis(true), idx * 150);
  }, []);
  const isW = m.r === 'W';
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 22,
        overflow: 'hidden',
        marginBottom: 16,
        opacity: vis ? 1 : 0,
        transform: vis
          ? hov
            ? 'translateY(-4px) scale(1.015)'
            : 'translateY(0)'
          : 'translateY(32px)',
        transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
        boxShadow: hov
          ? isW
            ? '0 24px 64px rgba(16,185,129,0.25)'
            : '0 24px 64px rgba(239,68,68,0.2)'
          : '0 8px 32px rgba(0,0,0,0.5)',
      }}
    >
      {/* photo bg */}
      <div style={{ position: 'relative', height: 90, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg,#020c04,#041508)',
          }}
        />
        <img
          src={m.img}
          alt=""
          onLoad={() => setImgLoaded(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imgLoaded ? 0.4 : 0,
            transition: 'opacity 1.2s',
            filter: 'blur(2px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg,${
              isW ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.2)'
            },rgba(0,0,0,0.6))`,
          }}
        />
        {/* result stamp */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            padding: '5px 16px',
            borderRadius: 20,
            background: isW ? '#10b981' : '#ef4444',
            color: '#fff',
            fontWeight: 900,
            fontSize: 12,
            boxShadow: isW
              ? '0 4px 16px rgba(16,185,129,0.6)'
              : '0 4px 16px rgba(239,68,68,0.6)',
          }}
        >
          {isW ? 'WIN' : 'LOSS'}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 14,
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 10,
              fontWeight: 800,
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(0,0,0,0.5)',
              padding: '2px 8px',
              borderRadius: 4,
            }}
          >
            {m.date}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>
            {m.venue}
          </span>
        </div>
      </div>
      {/* scores */}
      <div
        style={{ background: 'rgba(4,8,6,0.97)', padding: '16px 16px 14px' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 40px 1fr',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: T.PAK.g,
                  border: '2px solid rgba(16,185,129,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: 10,
                  color: '#6ee7b7',
                  boxShadow: '0 0 16px rgba(16,185,129,0.4)',
                }}
              >
                PAK
              </div>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>
                Pakistan
              </span>
            </div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: '#fff',
                letterSpacing: -2,
                lineHeight: 1,
              }}
            >
              {m.pak}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column' as const,
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Ball sz={28} />
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: 1,
              }}
            >
              VS
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 6,
                justifyContent: 'flex-end',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>
                {m.opp}
              </span>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: T[m.opp]?.g || T.NZ.g,
                  border: `2px solid ${T[m.opp]?.acc || '#aaa'}60`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: 10,
                  color: T[m.opp]?.txt || '#ddd',
                  boxShadow: `0 0 16px ${T[m.opp]?.glow || 'rgba(0,0,0,0.3)'}`,
                }}
              >
                {m.opp}
              </div>
            </div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: -2,
                lineHeight: 1,
                textAlign: 'right',
              }}
            >
              {m.osc}
            </div>
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            padding: '9px 14px',
            borderRadius: 12,
            fontWeight: 800,
            fontSize: 13,
            background: isW ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
            border: `1px solid ${
              isW ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'
            }`,
            color: isW ? '#6ee7b7' : '#fca5a5',
          }}
        >
          {m.margin}
        </div>
      </div>
      {/* top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: isW
            ? 'linear-gradient(90deg,#10b981,#34d399,#10b981)'
            : 'linear-gradient(90deg,#ef4444,#f87171)',
        }}
      />
    </div>
  );
}

// ─── STANDINGS ───────────────────────────────────────────────────────────────
function Standings({ standings }: { standings: any[] }) {
  return (
    <div
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        background: 'rgba(4,8,6,0.95)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'grid',
          gridTemplateColumns: '40px 1fr 52px 40px 56px',
          gap: 8,
          color: 'rgba(255,255,255,0.2)',
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: 1.5,
          textTransform: 'uppercase' as const,
        }}
      >
        <span>#</span>
        <span>Team</span>
        <span style={{ textAlign: 'center' }}>Pts</span>
        <span style={{ textAlign: 'center' }}>W</span>
        <span style={{ textAlign: 'right' }}>SF</span>
      </div>
      {standings.map((row, i) => {
        const c = T[row.team];
        const top = i < 2;
        const isPak = row.team === 'PAK';
        return (
          <div
            key={row.team}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 52px 40px 56px',
              gap: 8,
              padding: '13px 16px',
              alignItems: 'center',
              background: isPak
                ? 'rgba(16,185,129,0.07)'
                : i % 2 === 0
                ? 'rgba(255,255,255,0.02)'
                : 'transparent',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              borderLeft: top
                ? '3px solid rgba(16,185,129,0.7)'
                : '3px solid transparent',
              transition: 'all 0.5s',
            }}
          >
            <div
              style={{
                fontWeight: 900,
                fontSize: 13,
                color: top ? '#10b981' : 'rgba(255,255,255,0.2)',
                textShadow: top ? '0 0 12px rgba(16,185,129,0.5)' : 'none',
              }}
            >
              {['①', '②', '③', '④'][i]}
            </div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '5px 12px',
                borderRadius: 9,
                background: c.g,
                border: `1.5px solid ${c.acc}`,
                color: c.txt,
                fontWeight: 900,
                fontSize: 12,
                boxShadow: `0 2px 12px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: c.acc,
                  boxShadow: `0 0 8px ${c.acc}`,
                  flexShrink: 0,
                }}
              />
              {row.team}
            </span>
            <div
              style={{
                textAlign: 'center',
                fontWeight: 900,
                fontSize: 26,
                color: top ? '#10b981' : 'rgba(255,255,255,0.25)',
                textShadow: top ? '0 0 20px rgba(16,185,129,0.6)' : 'none',
                transition: 'all 0.4s',
              }}
            >
              {row.pts}
            </div>
            <div
              style={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.2)',
                fontSize: 13,
              }}
            >
              {row.wins}W
            </div>
            <div
              style={{
                textAlign: 'right',
                fontSize: 12,
                fontWeight: 800,
                color: top ? '#10b981' : 'rgba(255,255,255,0.08)',
              }}
            >
              {top ? 'SF ✓' : '—'}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── MATCH PICKER ────────────────────────────────────────────────────────────
function Picker({
  m,
  value,
  onChange,
}: {
  m: (typeof UPCOM)[0];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const { t1, t2, isPak, date, venue } = m;
  const c1 = T[t1],
    c2 = T[t2];
  const opts = [
    {
      val: t1,
      label: `${t1} Win`,
      g: c1.g,
      brd: c1.acc,
      col: c1.txt,
      glow: c1.glow,
    },
    {
      val: 'NR',
      label: 'No Result',
      g: 'linear-gradient(135deg,#18181b,#27272a)',
      brd: '#52525b',
      col: '#a1a1aa',
      glow: 'rgba(82,82,91,0.4)',
    },
    {
      val: t2,
      label: `${t2} Win`,
      g: c2.g,
      brd: c2.acc,
      col: c2.txt,
      glow: c2.glow,
    },
  ];
  return (
    <div
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 12,
        background: 'rgba(4,8,6,0.95)',
        border: isPak
          ? '1px solid rgba(16,185,129,0.35)'
          : '1px solid rgba(255,255,255,0.07)',
        boxShadow: isPak
          ? '0 8px 32px rgba(16,185,129,0.15)'
          : '0 4px 16px rgba(0,0,0,0.4)',
      }}
    >
      {isPak && (
        <div
          style={{
            height: 3,
            background: 'linear-gradient(90deg,#10b981,#34d399,#10b981)',
          }}
        />
      )}
      <div
        style={{
          padding: '10px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 10,
              fontWeight: 800,
              color: 'rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.07)',
              padding: '2px 7px',
              borderRadius: 4,
            }}
          >
            {date}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
            {venue}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {isPak && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 900,
                padding: '2px 10px',
                borderRadius: 20,
                background: 'rgba(16,185,129,0.15)',
                border: '1px solid rgba(16,185,129,0.35)',
                color: '#6ee7b7',
                letterSpacing: 0.8,
                textTransform: 'uppercase' as const,
              }}
            >
              KEY MATCH
            </span>
          )}
          {value && (
            <button
              onClick={() => onChange(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                fontSize: 18,
                fontFamily: 'inherit',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>
      <div style={{ padding: '14px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
            marginBottom: 14,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '8px 14px',
              borderRadius: 10,
              background: c1.g,
              border: `1.5px solid ${c1.acc}`,
              color: c1.txt,
              fontWeight: 900,
              fontSize: 14,
              boxShadow: `0 4px 16px ${c1.glow}`,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: c1.acc,
                boxShadow: `0 0 8px ${c1.acc}`,
              }}
            />
            {t1}
          </span>
          <Ball sz={30} spin />
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '8px 14px',
              borderRadius: 10,
              background: c2.g,
              border: `1.5px solid ${c2.acc}`,
              color: c2.txt,
              fontWeight: 900,
              fontSize: 14,
              boxShadow: `0 4px 16px ${c2.glow}`,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: c2.acc,
                boxShadow: `0 0 8px ${c2.acc}`,
              }}
            />
            {t2}
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 8,
          }}
        >
          {opts.map((o) => {
            const sel = value === o.val;
            return (
              <button
                key={o.val}
                onClick={() => onChange(o.val)}
                style={{
                  padding: '12px 4px',
                  borderRadius: 12,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  background: sel ? o.g : 'rgba(0,0,0,0.5)',
                  border: `1.5px solid ${
                    sel ? o.brd : 'rgba(255,255,255,0.07)'
                  }`,
                  color: sel ? o.col : 'rgba(255,255,255,0.3)',
                  fontWeight: 800,
                  fontSize: 11,
                  transform: sel ? 'scale(1.06)' : 'scale(1)',
                  boxShadow: sel
                    ? `0 6px 24px ${o.glow}, inset 0 1px 0 rgba(255,255,255,0.12)`
                    : 'none',
                  transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                {o.val === 'NR' ? '☁ No Result' : o.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── QUAL BANNER ─────────────────────────────────────────────────────────────
function QualBanner({
  picks,
  standings,
}: {
  picks: Record<string, string>;
  standings: any[];
}) {
  const filled = Object.keys(picks).length;
  const pakRank = standings.findIndex((x) => x.team === 'PAK');
  const pakPts = standings.find((x) => x.team === 'PAK')?.pts ?? 1;

  if (filled === 0)
    return (
      <div
        style={{
          borderRadius: 20,
          padding: '28px 20px',
          textAlign: 'center',
          background: 'rgba(4,8,6,0.95)',
          border: '1px solid rgba(255,255,255,0.07)',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <Ball sz={48} spin />
        </div>
        <div
          style={{
            fontWeight: 900,
            fontSize: 16,
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Select match outcomes to simulate
        </div>
        <div
          style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 4 }}
        >
          Watch Pakistan's path to the semi-finals update in real time
        </div>
      </div>
    );

  const qual = pakRank < 2;
  const complete = filled === 4;
  return (
    <div
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
        boxShadow: qual
          ? '0 16px 64px rgba(16,185,129,0.25)'
          : '0 16px 64px rgba(239,68,68,0.2)',
      }}
    >
      <div
        style={{
          height: 4,
          background: qual
            ? 'linear-gradient(90deg,#10b981,#34d399,#06b6d4,#34d399,#10b981)'
            : 'linear-gradient(90deg,#ef4444,#f87171,#ef4444)',
          backgroundSize: '200% auto',
          animation: 'shimmer 3s linear infinite',
        }}
      />
      <div
        style={{
          padding: '24px 20px',
          background: qual ? 'rgba(4,8,6,0.97)' : 'rgba(6,4,4,0.97)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 12,
          }}
        >
          {complete && qual ? (
            <Stumps size={52} />
          ) : complete && !qual ? (
            <Ball sz={44} />
          ) : (
            <Ball sz={40} spin />
          )}
        </div>
        <div
          style={{
            fontWeight: 900,
            fontSize: 17,
            color: qual ? '#10b981' : '#ef4444',
            letterSpacing: 0.3,
            textShadow: qual
              ? '0 0 30px rgba(16,185,129,0.5)'
              : '0 0 30px rgba(239,68,68,0.4)',
          }}
        >
          {complete && qual
            ? 'PAKISTAN QUALIFY FOR SEMI-FINALS!'
            : complete && !qual
            ? 'Pakistan Eliminated'
            : qual
            ? 'Pakistan Currently in Top 2'
            : 'Pakistan Outside Top 2'}
        </div>
        <div
          style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 6 }}
        >
          {complete && qual
            ? `${pakPts} points · Semi-Final at R.Premadasa, Colombo`
            : complete && !qual
            ? `${pakPts} points · Outside top 2`
            : qual
            ? `${pakPts} pts — keep picking outcomes`
            : 'More results needed'}
        </div>
      </div>
    </div>
  );
}

// ─── TIMELINE ────────────────────────────────────────────────────────────────
function Timeline() {
  const items = [
    {
      icon: <span style={{ fontSize: 22 }}>✈</span>,
      phase: 'Arrive in Sri Lanka',
      date: 'Early Feb',
      st: 'done',
      venue: 'Colombo',
      r: '',
      rc: '',
      img: IMGS.colombo,
      desc: 'Pakistan lands in Colombo — their tournament home. No Indian leg. Every match on Sri Lankan soil.',
    },
    {
      icon: <Ball sz={24} />,
      phase: 'vs Netherlands',
      date: 'Feb 7',
      st: 'done',
      venue: 'SSC Ground, Colombo',
      r: 'WIN · 3 wickets',
      rc: '#10b981',
      img: IMGS.cricket,
      desc: 'Tournament opener. Nervy chase but Pakistan squeeze home with 3 balls to spare.',
    },
    {
      icon: <Ball sz={24} />,
      phase: 'vs USA',
      date: 'Feb 10',
      st: 'done',
      venue: 'SSC Ground, Colombo',
      r: 'WIN · 29 runs',
      rc: '#10b981',
      img: IMGS.crowd,
      desc: 'Comfortable. Farhan impresses. Pakistan finding their groove.',
    },
    {
      icon: <Ball sz={24} />,
      phase: 'vs India',
      date: 'Feb 13',
      st: 'done',
      venue: 'SSC Ground, Colombo',
      r: 'LOSS · 61 runs',
      rc: '#ef4444',
      img: IMGS.stadium,
      desc: 'India post 175. Kishan blazes 77 off 40. Pakistan collapse to 114. Survivable.',
    },
    {
      icon: <BatterSilhouette color="#fbbf24" size={36} />,
      phase: 'vs Namibia — Farhan 100*',
      date: 'Feb 19',
      st: 'star',
      venue: 'SSC Ground, Colombo',
      r: 'WIN · 102 runs',
      rc: '#fbbf24',
      img: IMGS.cricket,
      desc: "Farhan detonates 100* off 58 balls. Pakistan's biggest ever T20 WC win. Super 8 locked!",
    },
    {
      icon: <span style={{ fontSize: 18 }}>→</span>,
      phase: 'Short move across Colombo',
      date: 'Feb 20',
      st: 'travel',
      venue: 'SSC → R.Premadasa (~5km)',
      r: '',
      rc: '',
      img: '',
      desc: 'A quick drive across Colombo. No flights, no borders.',
    },
    {
      icon: <span style={{ fontSize: 22 }}>☁</span>,
      phase: 'Super 8: vs New Zealand',
      date: 'Feb 21',
      st: 'done',
      venue: 'R.Premadasa, Colombo',
      r: 'NO RESULT · Rain',
      rc: '#f59e0b',
      img: IMGS.rain,
      desc: 'Win the toss, elect to bat — heavens open immediately. Not a ball bowled. 1pt each.',
    },
    {
      icon: <span style={{ fontSize: 16 }}>→</span>,
      phase: 'Drive to Kandy',
      date: 'Feb 23',
      st: 'travel',
      venue: 'Colombo → Pallekele (~115km, ~2hrs)',
      r: '',
      rc: '',
      img: '',
      desc: "Longest journey — scenic drive north into Sri Lanka's hill country.",
    },
    {
      icon: <Ball sz={24} spin />,
      phase: 'Super 8: vs England',
      date: 'Feb 24',
      st: 'upcoming',
      venue: 'Pallekele, Kandy',
      r: 'UPCOMING · KEY MATCH',
      rc: '#fbbf24',
      img: IMGS.kandy,
      desc: 'The defining match. England lead the group. Win this and Pakistan flip everything.',
    },
    {
      icon: <Stumps size={26} />,
      phase: 'Super 8: vs Sri Lanka',
      date: 'Feb 28',
      st: 'upcoming',
      venue: 'Pallekele, Kandy',
      r: 'UPCOMING',
      rc: 'rgba(255,255,255,0.3)',
      img: IMGS.kandy,
      desc: 'Final group game on Sri Lankan home turf. Everything depends on the ENG result.',
    },
    {
      icon: <span style={{ fontSize: 22 }}>🏆</span>,
      phase: 'Semi-Final?',
      date: 'Mar 4/5',
      st: 'future',
      venue: 'R.Premadasa, Colombo (if PAK qualify)',
      r: '',
      rc: '',
      img: IMGS.trophy,
      desc: 'If Pakistan qualify, the semi-final moves from Kolkata → R.Premadasa Colombo. Pakistan NEVER travel to India.',
    },
  ];
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          left: 23,
          top: 8,
          bottom: 8,
          width: 2,
          background: 'linear-gradient(to bottom,#10b981,rgba(16,185,129,0.1))',
          borderRadius: 1,
        }}
      />
      {items.map((item, i) => {
        const done = item.st === 'done' || item.st === 'star',
          upcoming = item.st === 'upcoming',
          travel = item.st === 'travel',
          star = item.st === 'star';
        const [loaded, setLoaded] = useState(false);
        return (
          <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                flexShrink: 0,
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: star
                  ? 'rgba(245,158,11,0.15)'
                  : done
                  ? 'rgba(16,185,129,0.1)'
                  : upcoming
                  ? 'rgba(245,158,11,0.12)'
                  : 'rgba(255,255,255,0.03)',
                border: `2px solid ${
                  star
                    ? '#f59e0b'
                    : done
                    ? 'rgba(16,185,129,0.6)'
                    : upcoming
                    ? 'rgba(245,158,11,0.6)'
                    : 'rgba(255,255,255,0.1)'
                }`,
                boxShadow: upcoming
                  ? '0 0 24px rgba(245,158,11,0.4)'
                  : star
                  ? '0 0 24px rgba(245,158,11,0.3)'
                  : done
                  ? '0 0 16px rgba(16,185,129,0.2)'
                  : 'none',
              }}
            >
              {item.icon}
            </div>
            <div
              style={{
                flex: 1,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                border: travel
                  ? '1px dashed rgba(255,255,255,0.07)'
                  : done
                  ? '1px solid rgba(16,185,129,0.12)'
                  : upcoming
                  ? '1px solid rgba(245,158,11,0.25)'
                  : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* photo strip */}
              {item.img && (
                <div
                  style={{
                    position: 'relative',
                    height: 56,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(135deg,${
                        done
                          ? 'rgba(2,40,14,0.9)'
                          : upcoming
                          ? 'rgba(40,30,2,0.9)'
                          : 'rgba(4,8,6,0.9)'
                      },rgba(0,0,0,0.7))`,
                    }}
                  />
                  <img
                    src={item.img}
                    alt=""
                    onLoad={() => setLoaded(true)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: loaded ? 0.3 : 0,
                      transition: 'opacity 1.2s',
                      filter: 'blur(3px)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to right,rgba(4,8,6,0.8),transparent)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 6,
                      left: 12,
                      right: 12,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 800,
                          color: '#fff',
                          fontSize: 12,
                          textShadow: '0 1px 6px rgba(0,0,0,0.8)',
                        }}
                      >
                        {item.phase}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        fontWeight: 700,
                        color: 'rgba(255,255,255,0.4)',
                        background: 'rgba(0,0,0,0.5)',
                        padding: '2px 6px',
                        borderRadius: 4,
                      }}
                    >
                      {item.date}
                    </span>
                  </div>
                </div>
              )}
              <div
                style={{
                  padding: item.img ? '10px 12px' : '12px',
                  background: 'rgba(4,8,6,0.95)',
                }}
              >
                {!item.img && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{ fontWeight: 800, color: '#fff', fontSize: 12 }}
                    >
                      {item.phase}
                    </span>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        fontWeight: 700,
                        color: 'rgba(255,255,255,0.25)',
                        background: 'rgba(255,255,255,0.06)',
                        padding: '2px 6px',
                        borderRadius: 4,
                      }}
                    >
                      {item.date}
                    </span>
                  </div>
                )}
                <div
                  style={{
                    color: 'rgba(255,255,255,0.22)',
                    fontSize: 10,
                    marginBottom: item.r ? 4 : 5,
                  }}
                >
                  {item.venue}
                </div>
                {item.r && (
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 12,
                      color: item.rc,
                      marginBottom: 4,
                      textShadow:
                        item.rc !== 'rgba(255,255,255,0.3)'
                          ? `0 0 12px ${item.rc}60`
                          : 'none',
                    }}
                  >
                    {item.r}
                  </div>
                )}
                <p
                  style={{
                    color: 'rgba(255,255,255,0.38)',
                    fontSize: 11,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── VENUE CARDS ─────────────────────────────────────────────────────────────
function VenueCards() {
  const [open, setOpen] = useState<number | null>(0);
  const vs = [
    {
      name: 'SSC Ground',
      full: 'Sinhalese Sports Club Cricket Ground',
      city: 'Colombo',
      dist: 'City centre',
      c: '#10b981',
      img: IMGS.colombo,
      matches: [
        'vs NED · Feb 7 · WIN',
        'vs USA · Feb 10 · WIN',
        'vs IND · Feb 13 · LOSS',
        'vs NAM · Feb 19 · WIN 100*',
      ],
      count: '4 matches',
      note: "Pakistan's home for the entire group stage. Four matches, never left this ground.",
    },
    {
      name: 'R.Premadasa',
      full: 'R. Premadasa Stadium',
      city: 'Colombo',
      dist: '~5km from SSC',
      c: '#f59e0b',
      img: IMGS.rain,
      matches: ['vs NZ · Feb 21 · NO RESULT (Rain)'],
      count: '1 match',
      note: 'A short drive across Colombo. Not a ball bowled — completely washed out.',
    },
    {
      name: 'Pallekele',
      full: 'Pallekele International Cricket Stadium',
      city: 'Kandy',
      dist: '~115km north · ~2hr drive',
      c: '#3b82f6',
      img: IMGS.kandy,
      matches: ['vs ENG · Feb 24 · UPCOMING', 'vs SL · Feb 28 · UPCOMING'],
      count: '2 matches',
      note: 'Longest journey of the whole tournament. Two Super 8 deciders in the hill country.',
    },
    {
      name: 'R.Premadasa',
      full: 'R. Premadasa — Knockout Stage',
      city: 'Colombo',
      dist: 'Replaces Kolkata/Ahmedabad',
      c: '#c084fc',
      img: IMGS.stadium,
      matches: ['Semi-Final · Mar 4 or 5', 'Final · Mar 8'],
      count: 'SF + Final',
      note: 'Under the hybrid model, both semi-final and final shift to Colombo if Pakistan qualify. They NEVER travel to India.',
    },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
      {vs.map((v, i) => {
        const [imgL, setImgL] = useState(false);
        return (
          <div
            key={i}
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              cursor: 'pointer',
              border: `1px solid ${v.c}35`,
              boxShadow:
                open === i
                  ? `0 12px 40px ${v.c}20`
                  : '0 4px 16px rgba(0,0,0,0.3)',
              transition: 'all 0.3s',
            }}
          >
            {/* photo header */}
            <div
              style={{
                position: 'relative',
                height: open === i ? 100 : 70,
                overflow: 'hidden',
                transition: 'height 0.4s',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg,rgba(4,8,6,0.9),rgba(0,0,0,0.7))`,
                }}
              />
              <img
                src={v.img}
                alt=""
                onLoad={() => setImgL(true)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: imgL ? 0.45 : 0,
                  transition: 'opacity 1.2s',
                  filter: 'blur(1px)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg,${v.c}25,transparent)`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top,rgba(0,0,0,0.8),transparent)',
                }}
              />
              {open === i && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: v.c,
                  }}
                />
              )}
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 14,
                  right: 14,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 900,
                      color: '#fff',
                      fontSize: 14,
                      textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                    }}
                  >
                    {v.name}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>
                    {v.city} · {v.dist}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: 20,
                      background: `${v.c}25`,
                      border: `1px solid ${v.c}50`,
                      color: v.c,
                    }}
                  >
                    {v.count}
                  </span>
                  <span
                    style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}
                  >
                    {open === i ? '▲' : '▼'}
                  </span>
                </div>
              </div>
            </div>
            {/* expanded content */}
            {open === i && (
              <div
                style={{ background: 'rgba(4,8,6,0.97)', padding: '14px 16px' }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column' as const,
                    gap: 6,
                    marginBottom: 10,
                  }}
                >
                  {v.matches.map((m, j) => (
                    <div
                      key={j}
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: v.c,
                          flexShrink: 0,
                          boxShadow: `0 0 6px ${v.c}`,
                        }}
                      />
                      <span
                        style={{
                          color: 'rgba(255,255,255,0.55)',
                          fontSize: 12,
                        }}
                      >
                        {m}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    padding: '10px 12px',
                    background: `${v.c}08`,
                    borderRadius: 10,
                    borderLeft: `2px solid ${v.c}60`,
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: 11,
                    lineHeight: 1.6,
                  }}
                >
                  {v.note}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero({ onTab }: { onTab: (t: string) => void }) {
  const [imgL, setImgL] = useState(false);
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setAngle((a) => (a + 0.4) % 360), 16);
    return () => clearInterval(t);
  }, []);
  const orb = [
    [120, 0.8],
    [80, 1.4],
    [60, 2.1],
  ];
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: 500,
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px 40px',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* bg photo */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={IMGS.stadium}
          alt=""
          onLoad={() => setImgL(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imgL ? 0.18 : 0,
            transition: 'opacity 2s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center,rgba(2,12,4,0.3) 0%,rgba(2,12,4,0.95) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom,rgba(2,12,4,0.4) 0%,rgba(2,12,4,0) 30%,rgba(2,12,4,0) 60%,rgba(2,12,4,1) 100%)',
          }}
        />
      </div>

      {/* orbiting balls */}
      {orb.map(([r, spd], idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left:
                Math.cos(((angle * spd - idx * 60) * Math.PI) / 180) * r - 10,
              top:
                Math.sin(((angle * spd - idx * 60) * Math.PI) / 180) * r - 10,
              opacity: 0.15 + idx * 0.08,
            }}
          >
            <Ball sz={20 - idx * 4} />
          </div>
        </div>
      ))}

      {/* orbital rings */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }}
      >
        {[120, 80, 60].map((r, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: -r,
              top: -r,
              width: r * 2,
              height: r * 2,
              borderRadius: '50%',
              border: `1px solid rgba(16,185,129,${0.06 + i * 0.03})`,
              animation: `orbit ${4 + i * 2}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* live chip */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '5px 16px',
          borderRadius: 20,
          background: 'rgba(16,185,129,0.12)',
          border: '1px solid rgba(16,185,129,0.3)',
          marginBottom: 28,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 10px #10b981',
            animation: 'pulse 2s infinite',
          }}
        />
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: '#10b981',
            letterSpacing: 2,
            textTransform: 'uppercase' as const,
          }}
        >
          ICC Men's T20 World Cup 2026
        </span>
      </div>

      {/* player silhouette + badge */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 0,
          marginBottom: 8,
          animation: 'float 3.5s ease-in-out infinite',
        }}
      >
        <div style={{ opacity: 0.8, transform: 'scaleX(-1)' }}>
          <BatterSilhouette color="#10b981" size={70} />
        </div>
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: 32,
            background:
              'linear-gradient(135deg,#01411C 0%,#025e28 50%,#012e14 100%)',
            border: '3px solid rgba(16,185,129,0.7)',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow:
              '0 0 100px rgba(16,185,129,0.3),0 0 40px rgba(16,185,129,0.2),0 30px 80px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,255,255,0.15)',
            position: 'relative',
            zIndex: 3,
            margin: '0 -10px',
          }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: 38,
              color: '#6ee7b7',
              letterSpacing: 2,
              textShadow: '0 0 30px rgba(16,185,129,0.8)',
            }}
          >
            PAK
          </div>
          <div
            style={{
              width: 50,
              height: 2,
              background:
                'linear-gradient(90deg,transparent,rgba(16,185,129,0.9),transparent)',
              margin: '5px 0',
            }}
          />
          <div
            style={{
              fontSize: 10,
              color: 'rgba(16,185,129,0.6)',
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            PAKISTAN
          </div>
        </div>
        <div style={{ opacity: 0.8 }}>
          <BatterSilhouette color="#10b981" size={70} />
        </div>
      </div>

      {/* title */}
      <h1
        style={{
          position: 'relative',
          zIndex: 2,
          fontSize: 64,
          fontWeight: 900,
          letterSpacing: -3,
          lineHeight: 0.9,
          margin: '0 0 10px',
          background:
            'linear-gradient(90deg,#10b981,#34d399,#a7f3d0,#34d399,#10b981)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shimmer 4s linear infinite',
        }}
      >
        PAKISTAN
      </h1>
      <p
        style={{
          position: 'relative',
          zIndex: 2,
          color: 'rgba(255,255,255,0.4)',
          fontSize: 12,
          letterSpacing: 3,
          textTransform: 'uppercase' as const,
          margin: '0 0 6px',
        }}
      >
        T20 World Cup 2026 · Sri Lanka
      </p>
      <p
        style={{
          position: 'relative',
          zIndex: 2,
          color: 'rgba(255,255,255,0.18)',
          fontSize: 11,
          margin: '0 0 32px',
        }}
      >
        The only nation to play every match on Sri Lankan soil
      </p>

      {/* stat cards */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 10,
          width: '100%',
          maxWidth: 520,
        }}
      >
        {[
          { v: '7', l: 'Matches in SL', c: '#10b981', bad: false },
          { v: '0', l: 'Matches in India', c: '#ef4444', bad: true },
          { v: '3', l: 'Group Wins', c: '#10b981', bad: false },
          { v: '1', l: 'Super 8 Pts', c: '#f59e0b', bad: false },
        ].map((s, i) => (
          <div
            key={i}
            onClick={() => (s.bad ? null : onTab('super8'))}
            style={{
              background: 'rgba(4,8,6,0.85)',
              border: `1px solid ${s.c}25`,
              borderRadius: 16,
              padding: '14px 8px',
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
              boxShadow: `0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`,
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: s.c,
                boxShadow: `0 0 8px ${s.c}`,
              }}
            />
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: s.c,
                lineHeight: 1,
                marginBottom: 4,
                textShadow: `0 0 20px ${s.c}70`,
              }}
            >
              <AnimNum n={parseInt(s.v)} />
            </div>
            <div
              style={{
                fontSize: 10,
                color: 'rgba(255,255,255,0.3)',
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [tab, setTab] = useState('journey');
  const standings = calcStandings(picks);
  const setPick = (id: string, val: string | null) =>
    setPicks((p) => {
      if (val === null) {
        const n = { ...p };
        delete n[id];
        return n;
      }
      return { ...p, [id]: val };
    });
  const TABS = [
    { id: 'journey', label: 'Journey' },
    { id: 'group', label: 'Group Stage' },
    { id: 'venues', label: 'Venues' },
    { id: 'super8', label: 'Super 8' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#020c04',
        color: '#fff',
        fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif",
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes shimmerCard{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0.7)}50%{box-shadow:0 0 0 20px rgba(16,185,129,0)}}
        @keyframes spinY{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}
        @keyframes stump0{to{transform:rotate(-35deg) translateY(-10px)}}
        @keyframes stump1{to{transform:rotate(0deg) translateY(-20px)}}
        @keyframes stump2{to{transform:rotate(35deg) translateY(-10px)}}
        @keyframes spark0{to{transform:translate(-15px,-20px);opacity:0}}
        @keyframes spark1{to{transform:translate(15px,-20px);opacity:0}}
        @keyframes spark2{to{transform:translate(0,-25px);opacity:0}}
        *{box-sizing:border-box} button{font-family:inherit}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(16,185,129,0.3);border-radius:4px}
        html{scroll-behavior:smooth}
      `}</style>
      <ParticleField />

      {/* deep gradient bg */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(16,185,129,0.08) 0%,transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%,rgba(16,185,129,0.05) 0%,transparent 50%), #020c04',
        }}
      />

      <Hero onTab={setTab} />

      {/* sticky nav */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          padding: '10px 12px',
          background: 'rgba(2,12,4,0.98)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(16,185,129,0.1)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
        }}
      >
        {TABS.map((t) => {
          const isA = t.id === tab;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '9px 18px',
                borderRadius: 10,
                fontSize: 11,
                fontWeight: 800,
                cursor: 'pointer',
                letterSpacing: 0.5,
                textTransform: 'uppercase' as const,
                background: isA ? 'rgba(16,185,129,0.15)' : 'transparent',
                border: isA
                  ? '1px solid rgba(16,185,129,0.5)'
                  : '1px solid rgba(255,255,255,0.07)',
                color: isA ? '#6ee7b7' : 'rgba(255,255,255,0.35)',
                boxShadow: isA ? '0 0 24px rgba(16,185,129,0.2)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: '32px 16px 80px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* ── JOURNEY ── */}
        {tab === 'journey' && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <div style={{ marginBottom: 20 }}>
              <PhotoCard
                img={IMGS.colombo}
                title="Pakistan's World Cup Journey"
                sub="Group stage through Super 8 — entirely in Sri Lanka"
                accent="#10b981"
                overlay="rgba(1,30,10,0.7)"
              />
            </div>
            {/* boycott */}
            <div
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                marginBottom: 24,
                boxShadow: '0 8px 32px rgba(245,158,11,0.12)',
              }}
            >
              <div
                style={{
                  height: 3,
                  background: 'linear-gradient(90deg,#f59e0b,#fbbf24)',
                }}
              />
              <div
                style={{
                  padding: '16px',
                  background: 'rgba(4,6,2,0.97)',
                  border: '1px solid rgba(245,158,11,0.2)',
                  borderTop: 'none',
                  borderRadius: '0 0 20px 20px',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ fontSize: 28, flexShrink: 0 }}>🚫</div>
                <div>
                  <div
                    style={{
                      fontWeight: 900,
                      color: '#fbbf24',
                      fontSize: 13,
                      marginBottom: 5,
                    }}
                  >
                    THE INDIA BOYCOTT
                  </div>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: 12,
                      margin: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    Pakistan initially announced they would boycott the India
                    fixture. After calls from Sri Lanka's President, they
                    reversed course — but played it in{' '}
                    <strong style={{ color: 'rgba(255,255,255,0.8)' }}>
                      Colombo, not India
                    </strong>
                    . Under the hybrid model, every Pakistan match — including
                    any knockouts — stays in Sri Lanka.
                  </p>
                </div>
              </div>
            </div>
            {/* stat meters */}
            <div
              style={{
                borderRadius: 20,
                padding: '20px',
                background: 'rgba(4,8,6,0.95)',
                border: '1px solid rgba(255,255,255,0.06)',
                marginBottom: 24,
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <div
                style={{
                  color: 'rgba(255,255,255,0.2)',
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase' as const,
                  marginBottom: 16,
                  textAlign: 'center' as const,
                }}
              >
                Pakistan Group Stage · At A Glance
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  gap: 12,
                  textAlign: 'center' as const,
                }}
              >
                {[
                  { n: 3, l: 'Wins', c: '#10b981' },
                  { n: 1, l: 'Losses', c: '#ef4444' },
                  { n: 102, l: 'Best Margin', c: '#f59e0b' },
                  { n: 100, l: 'Farhan 100*', c: '#a78bfa' },
                ].map((s) => (
                  <div key={s.l}>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: s.c,
                        lineHeight: 1,
                        textShadow: `0 0 20px ${s.c}60`,
                      }}
                    >
                      <AnimNum n={s.n} />
                    </div>
                    <div
                      style={{
                        color: 'rgba(255,255,255,0.3)',
                        fontSize: 10,
                        marginTop: 3,
                      }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Timeline />
          </div>
        )}

        {/* ── GROUP STAGE ── */}
        {tab === 'group' && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <div style={{ marginBottom: 20 }}>
              <PhotoCard
                img={IMGS.cricket}
                title="Group Stage Results"
                sub="All 4 matches at SSC Ground, Colombo · Sri Lanka"
                accent="#10b981"
                overlay="rgba(1,20,8,0.65)"
              />
            </div>
            <div
              style={{
                borderRadius: 16,
                padding: '12px 14px',
                border: '1px solid rgba(245,158,11,0.2)',
                background: 'rgba(4,6,2,0.97)',
                marginBottom: 20,
                display: 'flex',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: 'rgba(245,158,11,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  color: '#fbbf24',
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                !
              </div>
              <p
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: 11,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Pakistan's entire group stage was played at SSC Colombo —
                including the India fixture moved from India.
              </p>
            </div>
            {/* Group A table */}
            <div
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.07)',
                marginBottom: 24,
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              }}
            >
              <div
                style={{
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.2)',
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase' as const,
                }}
              >
                Group A · Final Standing
              </div>
              {[
                { t: 'India', c: T.IND, pts: 8, q: true, hi: false },
                { t: 'Pakistan', c: T.PAK, pts: 6, q: true, hi: true },
                { t: 'Netherlands', c: T.NED, pts: 2, q: false, hi: false },
                { t: 'USA', c: T.USA, pts: 2, q: false, hi: false },
                { t: 'Namibia', c: T.NAM, pts: 0, q: false, hi: false },
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '11px 16px',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    background: r.hi ? 'rgba(16,185,129,0.06)' : 'transparent',
                    borderLeft:
                      i < 2 ? `3px solid ${r.c.acc}` : '3px solid transparent',
                  }}
                >
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.2)',
                      fontSize: 12,
                      width: 20,
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: r.c.acc,
                      boxShadow: `0 0 8px ${r.c.acc}`,
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      fontSize: 13,
                      fontWeight: r.hi ? 800 : 500,
                      color: r.hi ? '#6ee7b7' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {r.t}
                  </span>
                  <span
                    style={{
                      fontWeight: 900,
                      fontSize: 18,
                      color: r.hi ? '#10b981' : 'rgba(255,255,255,0.35)',
                      textShadow: r.hi
                        ? '0 0 16px rgba(16,185,129,0.5)'
                        : 'none',
                    }}
                  >
                    {r.pts}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: '2px 10px',
                      borderRadius: 20,
                      fontWeight: 700,
                      background: r.q
                        ? 'rgba(16,185,129,0.12)'
                        : 'rgba(239,68,68,0.12)',
                      color: r.q ? '#6ee7b7' : '#fca5a5',
                      border: `1px solid ${
                        r.q ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'
                      }`,
                    }}
                  >
                    {r.q ? 'Qualified' : 'Out'}
                  </span>
                </div>
              ))}
            </div>
            {GROUP.map((m, i) => (
              <ScoreCard key={i} m={m} idx={i} />
            ))}
            {/* farhan card */}
            <div
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                marginTop: 8,
                boxShadow: '0 16px 48px rgba(251,191,36,0.2)',
              }}
            >
              <div
                style={{
                  height: 3,
                  background:
                    'linear-gradient(90deg,#10b981,#34d399,#fbbf24,#34d399,#10b981)',
                  backgroundSize: '200% auto',
                  animation: 'shimmer 3s linear infinite',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  padding: '28px 20px 24px',
                  background: 'rgba(4,6,2,0.97)',
                  textAlign: 'center',
                  border: '1px solid rgba(251,191,36,0.15)',
                  borderTop: 'none',
                  borderRadius: '0 0 20px 20px',
                  overflow: 'hidden',
                }}
              >
                {/* bg glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background:
                      'radial-gradient(rgba(251,191,36,0.08),transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 12,
                      marginBottom: 14,
                      alignItems: 'flex-end',
                    }}
                  >
                    <BatterSilhouette color="#fbbf24" size={60} />
                    <div>
                      <div
                        style={{
                          fontSize: 52,
                          fontWeight: 900,
                          color: '#fbbf24',
                          lineHeight: 1,
                          textShadow: '0 0 40px rgba(251,191,36,0.6)',
                        }}
                      >
                        ★
                      </div>
                    </div>
                    <div style={{ transform: 'scaleX(-1)' }}>
                      <BatterSilhouette color="#fbbf24" size={60} />
                    </div>
                  </div>
                  <div
                    style={{
                      color: '#fbbf24',
                      fontWeight: 800,
                      fontSize: 11,
                      letterSpacing: 2,
                      textTransform: 'uppercase' as const,
                      marginBottom: 6,
                    }}
                  >
                    Standout Performance
                  </div>
                  <div
                    style={{
                      color: '#fff',
                      fontWeight: 900,
                      fontSize: 26,
                      marginBottom: 4,
                      textShadow: '0 0 30px rgba(251,191,36,0.4)',
                    }}
                  >
                    Sahibzada Farhan
                  </div>
                  <div
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 15,
                      marginBottom: 16,
                    }}
                  >
                    100* off 58 balls vs Namibia
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 8,
                      flexWrap: 'wrap' as const,
                    }}
                  >
                    {[
                      '102-run margin',
                      '2nd PAK WC century',
                      '14th WC century ever',
                      "Pakistan's biggest WC win",
                    ].map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: 10,
                          padding: '4px 12px',
                          borderRadius: 20,
                          background: 'rgba(251,191,36,0.1)',
                          border: '1px solid rgba(251,191,36,0.2)',
                          color: '#fbbf24',
                          fontWeight: 700,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── VENUES ── */}
        {tab === 'venues' && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <div style={{ marginBottom: 20 }}>
              <PhotoCard
                img={IMGS.kandy}
                title="Venues in Sri Lanka"
                sub="Every match. One country. Three stadiums. Tap to explore."
                accent="#3b82f6"
                overlay="rgba(0,8,30,0.6)"
              />
            </div>
            <VenueCards />
          </div>
        )}

        {/* ── SUPER 8 ── */}
        {tab === 'super8' && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <div style={{ marginBottom: 20 }}>
              <PhotoCard
                img={IMGS.stadium}
                title="Super 8 Qualification Simulator"
                sub="Pick outcomes · Watch standings update live"
                accent="#10b981"
                overlay="rgba(1,20,8,0.6)"
              />
            </div>
            <QualBanner picks={picks} standings={standings} />
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  color: 'rgba(255,255,255,0.18)',
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase' as const,
                  marginBottom: 8,
                }}
              >
                Live Standings · Group 2
              </div>
              <Standings standings={standings} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 6,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 2,
                    background: 'rgba(16,185,129,0.6)',
                    borderRadius: 1,
                  }}
                />
                <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 11 }}>
                  Top 2 → Semi-Finals · Colombo (if PAK qualify)
                </span>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  color: 'rgba(255,255,255,0.18)',
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase' as const,
                  marginBottom: 8,
                }}
              >
                Completed
              </div>
              {[
                {
                  date: 'FEB 21',
                  match: 'PAK vs NZ',
                  venue: 'R.Premadasa · Colombo',
                  badge: 'Washed Out',
                  bc: 'rgba(82,82,91,0.15)',
                  tc: '#a1a1aa',
                  brd: 'rgba(82,82,91,0.3)',
                },
                {
                  date: 'FEB 22',
                  match: 'SL vs ENG',
                  venue: 'Pallekele · Kandy',
                  badge: 'ENG Win · 51 runs',
                  bc: 'rgba(59,130,246,0.12)',
                  tc: '#93c5fd',
                  brd: 'rgba(59,130,246,0.3)',
                },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 14px',
                    borderRadius: 14,
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(4,8,6,0.95)',
                    marginBottom: 8,
                    flexWrap: 'wrap' as const,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 10,
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.3)',
                      background: 'rgba(255,255,255,0.06)',
                      padding: '2px 7px',
                      borderRadius: 4,
                    }}
                  >
                    {m.date}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontWeight: 700, color: '#fff', fontSize: 13 }}
                    >
                      {m.match}
                    </div>
                    <div
                      style={{ color: 'rgba(255,255,255,0.22)', fontSize: 11 }}
                    >
                      {m.venue}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 20,
                      background: m.bc,
                      color: m.tc,
                      border: `1px solid ${m.brd}`,
                    }}
                  >
                    {m.badge}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  color: 'rgba(255,255,255,0.18)',
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase' as const,
                  marginBottom: 8,
                }}
              >
                Pick Outcomes
              </div>
              {UPCOM.map((m) => (
                <Picker
                  key={m.id}
                  m={m}
                  value={picks[m.id] ?? null}
                  onChange={(v) => setPick(m.id, v)}
                />
              ))}
            </div>
            {Object.keys(picks).length > 0 && (
              <button
                onClick={() => setPicks({})}
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 14,
                  cursor: 'pointer',
                  marginBottom: 20,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: 12,
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                }}
              >
                Reset All Picks
              </button>
            )}
            <div
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                background: 'rgba(4,8,6,0.95)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <div
                style={{
                  padding: '10px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  color: 'rgba(255,255,255,0.18)',
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase' as const,
                }}
              >
                Key Scenarios
              </div>
              <div style={{ padding: '14px 16px' }}>
                {[
                  {
                    icon: <Stumps size={22} />,
                    t: 'Win both → 5 pts → GUARANTEED semi-final in Colombo',
                    c: '#10b981',
                  },
                  {
                    icon: <BatterSilhouette color="#6ee7b7" size={22} />,
                    t: 'Beat England → caps ENG, puts PAK firmly in control',
                    c: '#6ee7b7',
                  },
                  {
                    icon: <Ball sz={18} />,
                    t: "Lose ENG, beat SL → 3 pts → need NZ results to go PAK's way",
                    c: '#fbbf24',
                  },
                  {
                    icon: <span style={{ fontSize: 16 }}>☁</span>,
                    t: 'Two no results → 3 pts → NRR decides everything',
                    c: '#a1a1aa',
                  },
                  {
                    icon: (
                      <span style={{ fontSize: 16, fontWeight: 900 }}>✗</span>
                    ),
                    t: 'Lose both → Pakistan eliminated',
                    c: '#ef4444',
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'flex-start',
                      marginBottom: 10,
                      padding: '10px 12px',
                      borderRadius: 12,
                      background: `${s.c}08`,
                      border: `1px solid ${s.c}18`,
                    }}
                  >
                    <div style={{ flexShrink: 0, marginTop: 1 }}>{s.icon}</div>
                    <span
                      style={{
                        fontSize: 12,
                        color: s.c,
                        lineHeight: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      {s.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          textAlign: 'center',
          paddingBottom: 32,
          color: 'rgba(255,255,255,0.1)',
          fontSize: 11,
          position: 'relative',
          zIndex: 10,
        }}
      >
        Data accurate as of Feb 22, 2026 · ICC Men's T20 World Cup 2026
      </div>
    </div>
  );
}
