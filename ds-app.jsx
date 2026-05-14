// Kuwait Government Design System — ds-app.jsx
const { useState, useEffect } = React;

// ── Design Tokens ────────────────────────────────────────────────
const BRAND = '#006C35';
const BLUE  = '#1C64F2';

const PALETTE = {
  gray:   {50:'#FAFAFA',100:'#F5F5F5',200:'#E5E5E5',300:'#D4D4D4',400:'#A1A1A1',500:'#737373',600:'#525252',700:'#404040',800:'#262626',900:'#0A0A0A'},
  blue:   {50:'#EFF6FF',100:'#DBEAFE',200:'#BFDBFE',300:'#93C5FD',400:'#76A9FA',500:'#3B82F6',600:'#1C64F2',700:'#1A56DB',800:'#1E429F',900:'#233876'},
  red:    {50:'#FDE8E8',100:'#FBD5D5',200:'#F8B4B4',300:'#F98080',400:'#F05252',500:'#E02424',600:'#C81E1E',700:'#9B1C1C',800:'#771D1D',900:'#69100D'},
  green:  {50:'#F0FDF4',100:'#DCFCE7',200:'#BBF7D0',300:'#86EFAC',400:'#4ADE80',500:'#22C55E',600:'#16A34A',700:'#006C35',800:'#14532D',900:'#052E16'},
  yellow: {50:'#FEFCE8',100:'#FEF9C3',200:'#FEF08A',300:'#FDE047',400:'#FACC15',500:'#E3A008',600:'#CA8A04',700:'#A16207',800:'#854D0E',900:'#713F12'},
  purple: {50:'#FAF5FF',100:'#F3E8FF',200:'#E9D5FF',300:'#D8B4FE',400:'#C084FC',500:'#9747FF',600:'#9333EA',700:'#7E22CE',800:'#6B21A8',900:'#4A1772'},
  pink:   {50:'#FDF2F8',100:'#FCE7F3',200:'#FBCFE8',300:'#F9A8D4',400:'#F472B6',500:'#EC4899',600:'#DB2777',700:'#BE185D',800:'#9D174D',900:'#831843'},
};

// ── Minimal SVG Icons ────────────────────────────────────────────
const Icon = ({ n, size = 16, color = 'currentColor', style: st }) => {
  const d = {
    'chevron-right': <polyline points="9,18 15,12 9,6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    'chevron-down':  <polyline points="6,9 12,15 18,9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    'arrow-right':   <><line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/><polyline points="12,5 19,12 12,19" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    'search':        <><circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    'copy':          <><rect x="9" y="9" width="13" height="13" rx="2" stroke={color} strokeWidth="2" fill="none"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke={color} strokeWidth="2" fill="none"/></>,
    'external':      <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke={color} strokeWidth="2" fill="none"/><polyline points="15,3 21,3 21,9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    'github':        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    'palette':       <><circle cx="13.5" cy="6.5" r="1.5" fill={color}/><circle cx="17.5" cy="10.5" r="1.5" fill={color}/><circle cx="9.5" cy="6.5" r="1.5" fill={color}/><circle cx="6.5" cy="10.5" r="1.5" fill={color}/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.66 0 3-.89 3-2.18v-.39c-.2-.57-.2-1.04 0-1.54.18-.46.8-1.89.8-1.89H17c2.21 0 4-1.79 4-4 0-5.52-4.03-10-9-10z" stroke={color} strokeWidth="2" fill="none"/></>,
    'type':          <><polyline points="4,7 4,4 20,4 20,7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="9" y1="20" x2="15" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="4" x2="12" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    'layers':        <><polygon points="12,2 2,7 12,12 22,7 12,2" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="2,17 12,22 22,17" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="2,12 12,17 22,12" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    'grid':          <><rect x="3" y="3" width="7" height="7" stroke={color} strokeWidth="2" fill="none" rx="1"/><rect x="14" y="3" width="7" height="7" stroke={color} strokeWidth="2" fill="none" rx="1"/><rect x="14" y="14" width="7" height="7" stroke={color} strokeWidth="2" fill="none" rx="1"/><rect x="3" y="14" width="7" height="7" stroke={color} strokeWidth="2" fill="none" rx="1"/></>,
    'check':         <polyline points="20,6 9,17 4,12" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    'sun':           <><circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" fill="none"/><line x1="12" y1="1" x2="12" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    'moon':          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    'menu':          <><line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    'close':         <><line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    'book':          <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    'box':           <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="22.08" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    'sliders':       <><line x1="4" y1="21" x2="4" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="4" y1="10" x2="4" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="21" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="8" x2="12" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="20" y1="21" x2="20" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="20" y1="12" x2="20" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="14" x2="7" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="8" x2="15" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="17" y1="16" x2="23" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0, ...st }}>
      {d[n] || null}
    </svg>
  );
};

// ── Kuwait Flag SVG ──────────────────────────────────────────────
const KuwaitFlag = ({ h = 28 }) => {
  const w = h * 1.7;
  return (
    <svg width={w} height={h} viewBox="0 0 170 100" style={{ borderRadius: 4, flexShrink: 0, display: 'block' }}>
      <rect x="0" y="0" width="170" height="33" fill="#007A3D"/>
      <rect x="0" y="33" width="170" height="34" fill="#FFFFFF"/>
      <rect x="0" y="67" width="170" height="33" fill="#CE1126"/>
      <polygon points="0,0 60,50 0,100" fill="#000000"/>
    </svg>
  );
};

// ── Code Block ───────────────────────────────────────────────────
const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div style={{ position: 'relative', background: '#0A0A0A', borderRadius: 8, overflow: 'hidden' }}>
      <pre style={{ margin: 0, padding: '16px 48px 16px 20px', fontSize: 13, color: '#E5E5E5', lineHeight: 1.65, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{code}</pre>
      <button onClick={copy} style={{ position: 'absolute', top: 10, right: 10, background: copied ? '#006C35' : '#262626', border: 'none', borderRadius: 6, padding: '4px 10px', color: '#E5E5E5', fontSize: 11, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, transition: 'background 0.2s' }}>
        {copied ? <><Icon n="check" size={11} color="#FFF"/> Copied</> : <><Icon n="copy" size={11} color="#A1A1A1"/> Copy</>}
      </button>
    </div>
  );
};

// ── Badge ────────────────────────────────────────────────────────
const Chip = ({ label, color = 'gray', size = 'md' }) => {
  const map = {
    gray:   { bg: '#F5F5F5', text: '#525252', border: '#E5E5E5' },
    blue:   { bg: '#EFF6FF', text: '#1C64F2', border: '#BFDBFE' },
    green:  { bg: '#F0FDF4', text: '#006C35', border: '#BBF7D0' },
    red:    { bg: '#FDE8E8', text: '#C81E1E', border: '#F8B4B4' },
    yellow: { bg: '#FEFCE8', text: '#A16207', border: '#FEF08A' },
    purple: { bg: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF' },
    dark:   { bg: '#262626', text: '#FFFFFF', border: '#404040' },
    pink:   { bg: '#FDF2F8', text: '#BE185D', border: '#FBCFE8' },
  };
  const s = map[color] || map.gray;
  const p = size === 'sm' ? '2px 8px' : size === 'lg' ? '5px 14px' : '3px 10px';
  const fs = size === 'sm' ? 11 : size === 'lg' ? 13 : 12;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', background: s.bg, color: s.text, border: `1px solid ${s.border}`, borderRadius: 999, padding: p, fontSize: fs, fontWeight: 600, whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>
      {label}
    </span>
  );
};

// ── Button ───────────────────────────────────────────────────────
const Btn = ({ label = 'Button', color = 'dark', size = 'md', outline = false, disabled = false, iconL, iconR, onClick }) => {
  const [hov, setHov] = useState(false);
  const cfg = {
    dark:   { bg: '#262626', hov: '#0A0A0A', text: '#FFF', brd: '#262626' },
    blue:   { bg: '#1C64F2', hov: '#1A56DB', text: '#FFF', brd: '#1C64F2' },
    red:    { bg: '#E02424', hov: '#C81E1E', text: '#FFF', brd: '#E02424' },
    green:  { bg: '#006C35', hov: '#14532D', text: '#FFF', brd: '#006C35' },
    light:  { bg: '#F5F5F5', hov: '#E5E5E5', text: '#262626', brd: '#E5E5E5' },
  };
  const c = cfg[color] || cfg.dark;
  const sz = { sm: { h: 32, px: 12, fs: 12, r: 7 }, md: { h: 40, px: 16, fs: 14, r: 8 }, lg: { h: 48, px: 22, fs: 15, r: 9 } }[size] || { h: 40, px: 16, fs: 14, r: 8 };
  const bg = disabled ? '#F5F5F5' : outline ? (hov ? c.bg : 'transparent') : hov ? c.hov : c.bg;
  const col = disabled ? '#A1A1A1' : outline ? (hov ? '#FFF' : c.brd) : c.text;
  const brd = disabled ? '#E5E5E5' : c.brd;
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, height: sz.h, padding: `0 ${sz.px}px`, background: bg, color: col, border: `1.5px solid ${brd}`, borderRadius: sz.r, fontSize: sz.fs, fontWeight: 500, fontFamily: 'Inter Tight,sans-serif', cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.14s ease', letterSpacing: '0.005em' }}>
      {iconL && <Icon n={iconL} size={sz.fs + 2} color={col}/>}
      {label}
      {iconR && <Icon n={iconR} size={sz.fs + 2} color={col}/>}
    </button>
  );
};

// ── Section Header ───────────────────────────────────────────────
const SecHead = ({ title, subtitle, badge, category }) => (
  <div style={{ marginBottom: 36, paddingBottom: 24, borderBottom: '1px solid #E5E5E5' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      {category && <Chip label={category} color={category === 'Foundation' ? 'green' : category === 'Component' ? 'blue' : 'gray'} size="sm"/>}
    </div>
    <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A0A0A', lineHeight: 1.2, marginBottom: 8 }}>{title}</h1>
    {subtitle && <p style={{ fontSize: 15, color: '#737373', lineHeight: 1.65, maxWidth: 600 }}>{subtitle}</p>}
  </div>
);

// ── Component Card ───────────────────────────────────────────────
const Card = ({ title, desc, dark = false, noPad = false, children }) => (
  <div style={{ background: dark ? '#0A0A0A' : '#FFF', border: `1px solid ${dark ? '#262626' : '#E5E5E5'}`, borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
    {title && (
      <div style={{ padding: '11px 20px', borderBottom: `1px solid ${dark ? '#262626' : '#E5E5E5'}`, background: dark ? '#141414' : '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: dark ? '#A1A1A1' : '#525252', letterSpacing: '0.03em', textTransform: 'uppercase' }}>{title}</span>
        {desc && <span style={{ fontSize: 12, color: '#A1A1A1' }}>{desc}</span>}
      </div>
    )}
    <div style={{ padding: noPad ? 0 : 24 }}>{children}</div>
  </div>
);

// ── Color Swatch ─────────────────────────────────────────────────
const Swatch = ({ hex, shade }) => {
  const [cp, setCp] = useState(false);
  const light = parseInt(shade) <= 200;
  const tc = light ? '#262626' : '#FFF';
  return (
    <div onClick={() => { navigator.clipboard?.writeText(hex); setCp(true); setTimeout(() => setCp(false), 1200); }} title={`${shade} — ${hex}`}
      style={{ flex: '1 0 0', minWidth: 56, cursor: 'pointer' }}>
      <div style={{ height: 52, background: hex, borderRadius: 6, marginBottom: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.06)', transition: 'transform 0.1s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        {cp && <Icon n="check" size={14} color={tc}/>}
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#404040' }}>{shade}</div>
      <div style={{ fontSize: 10, color: '#A1A1A1', fontFamily: 'monospace', marginTop: 1 }}>{hex}</div>
    </div>
  );
};

const PaletteRow = ({ name, scale }) => (
  <div style={{ marginBottom: 28 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 10, textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 12, height: 12, borderRadius: 3, background: scale[600] || scale[500] }}/>
      {name}
    </div>
    <div style={{ display: 'flex', gap: 6 }}>
      {Object.entries(scale).map(([s, h]) => <Swatch key={s} shade={s} hex={h}/>)}
    </div>
  </div>
);

// ── Accordion Item ───────────────────────────────────────────────
const AccItem = ({ q, a, dark = false }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderRadius: 8, overflow: 'hidden', border: `1px solid ${dark ? '#333' : '#E5E5E5'}`, marginBottom: 8 }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', background: open ? (dark ? '#262626' : '#F5F5F5') : (dark ? '#141414' : '#FFF'), border: 'none', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: dark ? '#FFF' : '#0A0A0A', textAlign: 'left', fontFamily: 'Inter Tight, sans-serif' }}>{q}</span>
        <Icon n={open ? 'chevron-down' : 'chevron-right'} size={16} color={dark ? '#A1A1A1' : '#737373'}/>
      </button>
      {open && (
        <div style={{ padding: '12px 16px 16px', background: dark ? '#0A0A0A' : '#FFF', borderTop: `1px solid ${dark ? '#333' : '#E5E5E5'}` }}>
          <p style={{ fontSize: 14, color: dark ? '#A1A1A1' : '#737373', lineHeight: 1.7, margin: 0, fontFamily: 'Inter Tight,sans-serif' }}>{a}</p>
        </div>
      )}
    </div>
  );
};

// ── Input Field ──────────────────────────────────────────────────
const DSInput = ({ label, placeholder, type = 'text', error, hint, dark = false, disabled = false }) => {
  const [val, setVal] = useState('');
  const [foc, setFoc] = useState(false);
  const brd = error ? '#E02424' : foc ? BLUE : dark ? '#404040' : '#E5E5E5';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 500, color: dark ? '#A1A1A1' : '#525252' }}>{label}</label>}
      <input type={type} value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder} disabled={disabled}
        onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
        style={{ height: 40, padding: '0 12px', fontSize: 14, fontFamily: 'Inter Tight,sans-serif', background: dark ? '#141414' : '#FFF', color: dark ? '#FFF' : '#0A0A0A', border: `1.5px solid ${brd}`, borderRadius: 8, outline: 'none', transition: 'border-color 0.14s', opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'text' }}/>
      {(error || hint) && <span style={{ fontSize: 12, color: error ? '#E02424' : '#A1A1A1', display: 'flex', alignItems: 'center', gap: 4 }}>{error || hint}</span>}
    </div>
  );
};

// ── Skeleton ─────────────────────────────────────────────────────
const Skel = ({ w = '100%', h = 16, r = 6 }) => (
  <div style={{ width: w, height: h, borderRadius: r, background: 'linear-gradient(90deg,#F5F5F5 25%,#EBEBEB 50%,#F5F5F5 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }}/>
);

// ── Stepper ──────────────────────────────────────────────────────
const Stepper = ({ steps, current }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {steps.map((s, i) => (
      <React.Fragment key={i}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: i < current ? BRAND : i === current ? BLUE : '#F5F5F5', border: `2px solid ${i < current ? BRAND : i === current ? BLUE : '#E5E5E5'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
            {i < current ? <Icon n="check" size={16} color="#FFF"/> : <span style={{ fontSize: 13, fontWeight: 600, color: i === current ? '#FFF' : '#A1A1A1' }}>{i + 1}</span>}
          </div>
          <span style={{ fontSize: 11, fontWeight: 500, color: i <= current ? '#262626' : '#A1A1A1', whiteSpace: 'nowrap' }}>{s}</span>
        </div>
        {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < current ? BRAND : '#E5E5E5', margin: '0 8px', marginTop: -16, transition: 'background 0.2s' }}/>}
      </React.Fragment>
    ))}
  </div>
);

// ── Pagination ───────────────────────────────────────────────────
const Pagination = ({ total = 7 }) => {
  const [pg, setPg] = useState(3);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <button onClick={() => setPg(p => Math.max(1, p - 1))} style={{ width: 36, height: 36, borderRadius: 8, background: pg === 1 ? '#F5F5F5' : '#FFF', border: '1.5px solid #E5E5E5', cursor: pg === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pg === 1 ? 0.4 : 1 }}>
        <Icon n="chevron-right" size={14} color="#525252" style={{ transform: 'rotate(180deg)' }}/>
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map(n => (
        <button key={n} onClick={() => setPg(n)} style={{ width: 36, height: 36, borderRadius: 8, fontSize: 13, fontWeight: 500, background: n === pg ? BLUE : '#FFF', color: n === pg ? '#FFF' : '#525252', border: `1.5px solid ${n === pg ? BLUE : '#E5E5E5'}`, cursor: 'pointer', fontFamily: 'Inter Tight,sans-serif', transition: 'all 0.14s' }}>
          {n}
        </button>
      ))}
      <button onClick={() => setPg(p => Math.min(total, p + 1))} style={{ width: 36, height: 36, borderRadius: 8, background: pg === total ? '#F5F5F5' : '#FFF', border: '1.5px solid #E5E5E5', cursor: pg === total ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pg === total ? 0.4 : 1 }}>
        <Icon n="chevron-right" size={14} color="#525252"/>
      </button>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// PAGE SECTIONS
// ════════════════════════════════════════════════════════════════

const HomePage = ({ go }) => {
  const quickLinks = [
    { id: 'colors', title: 'Colors', desc: 'Structured 7-scale palette with accessibility ratios', cat: 'Foundation', icon: 'palette' },
    { id: 'typography', title: 'Typography', desc: 'Inter Tight type scale — 10 sizes, 9 weights', cat: 'Foundation', icon: 'type' },
    { id: 'spacing', title: 'Spacing & Shadows', desc: 'Spacing scale, shadows, and border-radius tokens', cat: 'Foundation', icon: 'layers' },
    { id: 'buttons', title: 'Buttons', desc: 'Full variants: solid, outline, sizes, states', cat: 'Component', icon: 'box' },
    { id: 'accordion', title: 'Accordion', desc: 'Collapsible panels in light and dark modes', cat: 'Component', icon: 'sliders' },
    { id: 'inputs', title: 'Input Fields', desc: 'Form inputs, validations, search, and select', cat: 'Component', icon: 'grid' },
  ];
  return (
    <div>
      {/* Hero Banner — image top, text bottom, no overlay */}
      <div style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 28, border: '1px solid #E5E5E5', background: '#FFF' }}>
        {/* Image */}
        <div style={{ width: '100%', height: 220, overflow: 'hidden' }}>
          <img src="uploads/ChatGPT Image Apr 25, 2026, 10_48_27 PM.png" alt="Kuwait Skyline" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block' }}/>
        </div>

        {/* Text block — clean white, no overlay */}
        <div style={{ padding: '28px 32px 32px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <KuwaitFlag h={18}/>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#A1A1A1', letterSpacing: '0.07em', textTransform: 'uppercase' }}>State of Kuwait · دولة الكويت</span>
            <div style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 999, padding: '3px 10px' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }}/>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#16A34A', letterSpacing: '0.05em' }}>Now Live · 2025</span>
            </div>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A0A0A', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 10 }}>
            Kuwait Design System
          </h1>
          <p style={{ fontSize: 15, color: '#737373', lineHeight: 1.65, marginBottom: 24, maxWidth: 520 }}>
            A unified design language for Kuwait government digital services — accessible, consistent, and bilingual.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => go('getting-started')}
              style={{ height: 40, padding: '0 20px', background: '#0A0A0A', color: '#FFF', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'Inter Tight, sans-serif' }}>
              Get Started <Icon n="arrow-right" size={13} color="#FFF"/>
            </button>
            <button onClick={() => go('buttons')}
              style={{ height: 40, padding: '0 20px', background: '#FFF', color: '#525252', border: '1.5px solid #E5E5E5', borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter Tight, sans-serif' }}>
              View Components
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
        {[
          { n: '50+', label: 'Components', sub: 'Production-ready' },
          { n: '7',   label: 'Color Palettes', sub: 'Full 10-step scales' },
          { n: 'AA',  label: 'WCAG 2.1', sub: 'Accessibility ready' },
          { n: 'RTL', label: 'Bilingual', sub: 'Arabic + English' },
        ].map(({ n, label, sub }) => (
          <div key={label} style={{ background: '#FFF', border: '1px solid #E5E5E5', borderRadius: 10, padding: '20px 18px' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 3 }}>{n}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 11, color: '#A1A1A1' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ── SECTION 1: Manifesto ── */}
      <div style={{ background: '#0A0A0A', borderRadius: 14, padding: '52px 48px', marginBottom: 12, position: 'relative', overflow: 'hidden' }}>
        {/* Subtle green glow top-right */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,108,53,0.25) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        {/* Faint Kuwait flag strip */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 3, background: 'linear-gradient(90deg, #000 25%, #fff 25% 50%, #CE1126 50% 75%, #007A3D 75%)' }}/>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#006C35' }}/>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#737373', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Kuwait Design System — 2025 Launch</span>
        </div>

        <div style={{ maxWidth: 620 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#525252', marginBottom: 16, lineHeight: 1.6 }}>
            The UAE built theirs. &nbsp;The UK built theirs. &nbsp;The US just made it a White House priority.
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 20 }}>
            Today,<br/>
            <span style={{ color: '#006C35' }}>Kuwait</span> builds its own.
          </h2>
          <p style={{ fontSize: 15, color: '#737373', lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
            Sahel proved it: 111 million transactions, 2.9 million Kuwaitis, 460+ services — unified in one place. Kuwaitis chose it because it felt like <em style={{ color: '#A1A1A1', fontStyle: 'normal' }}>one government</em>. This design system brings that same unity to every screen, every ministry, every citizen interaction — on the web.
          </p>

          {/* Three country comparisons */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 32, borderRadius: 10, overflow: 'hidden', border: '1px solid #1A1A1A' }}>
            {[
              { flag: '🇬🇧', country: 'United Kingdom', year: '2012', note: 'Replaced 1,882 gov sites with one system. Built a critical COVID service in 4 days.' },
              { flag: '🇦🇪', country: 'UAE', year: '2023', note: 'Published open-source Design Language System. WCAG 2.2 compliant. On GitHub now.' },
              { flag: '🇺🇸', country: 'United States', year: '2025', note: 'White House Executive Order. National Design Studio. Chief Design Officer appointed.' },
            ].map(({ flag, country, year, note }, i) => (
              <div key={country} style={{ flex: 1, padding: '18px 16px', background: i % 2 === 0 ? '#111' : '#0D0D0D', borderRight: i < 2 ? '1px solid #1A1A1A' : 'none' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{flag}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#E5E5E5', marginBottom: 2 }}>{country}</div>
                <div style={{ fontSize: 10, color: '#006C35', fontWeight: 600, marginBottom: 8 }}>Since {year}</div>
                <div style={{ fontSize: 11, color: '#525252', lineHeight: 1.55 }}>{note}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 20px', background: 'rgba(0,108,53,0.1)', border: '1px solid rgba(0,108,53,0.25)', borderRadius: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#006C35', flexShrink: 0 }}/>
            <span style={{ fontSize: 13, color: '#86EFAC', fontWeight: 500, lineHeight: 1.5 }}>
              Kuwait has Sahel. Now it needs the web layer. This is it.
            </span>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Adoption Pitch ── */}
      <div style={{ background: '#FFF', border: '1px solid #E5E5E5', borderRadius: 14, padding: '44px 40px', marginBottom: 20 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#1C64F2' }}/>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#A1A1A1', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Who this is for</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>
            Built for everyone who builds Kuwait.
          </h2>
          <p style={{ fontSize: 14, color: '#737373', lineHeight: 1.65, maxWidth: 500 }}>
            Whether you sit inside a ministry, win government contracts, or design the interfaces citizens depend on — this system was made for you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 36 }}>
          {[
            {
              icon: '🏛️',
              title: 'Ministries & Government Entities',
              color: '#006C35',
              bg: '#F0FDF4',
              brd: '#BBF7D0',
              points: [
                'Stop paying to rebuild the same button 12 times',
                'Ship new services faster with ready-made components',
                'Meet WCAG 2.1 accessibility by default — no extra effort',
                'One consistent experience across all your platforms',
              ],
              cta: 'Read the Guidelines',
            },
            {
              icon: '💻',
              title: 'Vendors & Agencies',
              color: '#1C64F2',
              bg: '#EFF6FF',
              brd: '#BFDBFE',
              points: [
                'Win government projects with a compliant head start',
                'Reduce scope, reduce risk — components are pre-approved',
                'Bilingual RTL/LTR support baked in from day one',
                'Fewer revision rounds. Happier clients. Faster delivery.',
              ],
              cta: 'View Components',
            },
            {
              icon: '🎨',
              title: 'Designers & Developers',
              color: '#7E22CE',
              bg: '#FAF5FF',
              brd: '#E9D5FF',
              points: [
                'One Figma library for every Kuwait government project',
                'Design tokens — colors, spacing, type — all mapped to code',
                'Open-source. Fork it. Extend it. Contribute back.',
                'Every Kuwait gov project speaks your design language.',
              ],
              cta: 'Download Figma Kit',
            },
          ].map(({ icon, title, color, bg, brd, points, cta }) => (
            <div key={title} style={{ border: `1.5px solid ${brd}`, borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: bg, padding: '20px 20px 16px', borderBottom: `1px solid ${brd}` }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0A0A0A', lineHeight: 1.3 }}>{title}</div>
              </div>
              <div style={{ padding: '16px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {points.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: color, marginTop: 6, flexShrink: 0 }}/>
                    <span style={{ fontSize: 12, color: '#525252', lineHeight: 1.55 }}>{p}</span>
                  </div>
                ))}
                <button style={{ marginTop: 12, height: 36, background: color, color: '#FFF', border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter Tight,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {cta} <span style={{ fontSize: 14 }}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#E5E5E5', borderRadius: 10, overflow: 'hidden' }}>
          {[
            { n: '76%', label: 'of Kuwait e-gov services were rated impossible to use for people with disabilities', c: '#E02424', bg: '#FDE8E8' },
            { n: '111M', label: 'transactions on Sahel — proof a unified Kuwait digital experience works', c: '#006C35', bg: '#F0FDF4' },
            { n: 'Next?', label: 'The UAE launched theirs. Kuwait\'s design system is the natural next step.', c: '#1C64F2', bg: '#EFF6FF' },
          ].map(({ n, label, c, bg }) => (
            <div key={n} style={{ background: bg, padding: '20px 22px' }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: c, letterSpacing: '-0.03em', marginBottom: 6 }}>{n}</div>
              <div style={{ fontSize: 12, color: '#525252', lineHeight: 1.55 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links grid */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0A0A0A', marginBottom: 14 }}>Explore the system</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {quickLinks.map(({ id, title, desc, cat, icon }) => (
            <button key={id} onClick={() => go(id)}
              style={{ background: '#FFF', border: '1px solid #E5E5E5', borderRadius: 10, padding: '18px 18px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', display: 'flex', flexDirection: 'column', gap: 8 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(28,100,242,0.07)`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 7, background: cat === 'Foundation' ? '#F0FDF4' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon n={icon} size={15} color={cat === 'Foundation' ? BRAND : BLUE}/>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A' }}>{title}</span>
                </div>
                <Chip label={cat} color={cat === 'Foundation' ? 'green' : 'blue'} size="sm"/>
              </div>
              <span style={{ fontSize: 12, color: '#737373', lineHeight: 1.5 }}>{desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const GettingStartedPage = () => (
  <div>
    <SecHead title="Getting Started" subtitle="Start building Kuwait government digital services with a unified, accessible design language." category="Overview"/>
    <Card title="Installation">
      <p style={{ fontSize: 14, color: '#525252', marginBottom: 14, lineHeight: 1.7 }}>Add the design system to your project:</p>
      <CodeBlock code="npm install @kw-gov/design-system"/>
      <div style={{ marginTop: 10 }}><CodeBlock code="yarn add @kw-gov/design-system"/></div>
    </Card>
    <Card title="Import">
      <CodeBlock code={`import '@kw-gov/design-system/dist/styles.css';\nimport { Button, Input, Accordion } from '@kw-gov/design-system';`}/>
    </Card>
    <Card title="Basic Example">
      <CodeBlock code={`import { Button, Input } from '@kw-gov/design-system';\n\nexport function ContactForm() {\n  return (\n    <form>\n      <Input label="Full Name" placeholder="Enter your name" />\n      <Input label="Email" type="email" placeholder="you@gov.kw" />\n      <Button label="Submit" color="green" size="md" />\n    </form>\n  );\n}`}/>
    </Card>
    <Card title="Design Principles">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { t: 'Accessible', d: 'WCAG 2.1 AA compliant. Every component is keyboard-navigable and screen-reader friendly.', c: BRAND },
          { t: 'Bilingual', d: 'Full Arabic (RTL) and English (LTR) support built into every component from day one.', c: BLUE },
          { t: 'Consistent', d: 'A shared design language ensuring visual unity across all Kuwait government digital platforms.', c: '#9333EA' },
          { t: 'Open', d: 'Open-source and freely available for all approved Kuwait government entities and their vendors.', c: '#E02424' },
        ].map(({ t, d, c }) => (
          <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid #F5F5F5' }}>
            <div style={{ width: 4, height: 40, background: c, borderRadius: 2, flexShrink: 0, marginTop: 2 }}/>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A', marginBottom: 3 }}>{t}</div>
              <div style={{ fontSize: 13, color: '#737373', lineHeight: 1.6 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const ColorsPage = () => (
  <div>
    <SecHead title="Colors" subtitle="Seven structured color palettes, each with 10 accessible shades. Click any swatch to copy its hex value." category="Foundation"/>
    <div style={{ background: '#FFF', border: '1px solid #E5E5E5', borderRadius: 10, padding: 24 }}>
      {Object.entries(PALETTE).map(([name, scale]) => <PaletteRow key={name} name={name} scale={scale}/>)}
    </div>
    <Card title="Usage">
      <CodeBlock code={`/* CSS custom properties */\n--color-blue-600: #1C64F2;\n--color-green-700: #006C35; /* Kuwait brand */\n--color-gray-900: #0A0A0A;\n\n/* Tailwind-style tokens */\nbg-blue-600   text-green-700   border-gray-200`}/>
    </Card>
  </div>
);

const TypographyPage = () => (
  <div>
    <SecHead title="Typography" subtitle="Built on Inter Tight — a modern, high-legibility typeface. Available in 9 weights with a 10-step size scale." category="Foundation"/>
    <Card title="Type Scale">
      {[
        { l: 'text-xs',   s: 12 }, { l: 'text-sm',   s: 14 },
        { l: 'text-base', s: 16 }, { l: 'text-lg',   s: 18 },
        { l: 'text-xl',   s: 20 }, { l: 'text-2xl',  s: 24 },
        { l: 'text-3xl',  s: 30 }, { l: 'text-4xl',  s: 36 },
        { l: 'text-5xl',  s: 48 }, { l: 'text-6xl',  s: 60 },
      ].map(({ l, s }) => (
        <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 20, padding: '10px 0', borderBottom: '1px solid #F5F5F5' }}>
          <code style={{ minWidth: 92, fontSize: 11, color: '#A1A1A1', fontFamily: 'monospace' }}>{l}</code>
          <code style={{ minWidth: 36, fontSize: 11, color: '#A1A1A1', fontFamily: 'monospace' }}>{s}px</code>
          <span style={{ fontSize: s, fontWeight: 500, color: '#0A0A0A', lineHeight: 1.2 }}>The quick brown fox</span>
        </div>
      ))}
    </Card>
    <Card title="Font Weights">
      {[
        { l: 'Thin', w: 100 }, { l: 'Extra Light', w: 200 }, { l: 'Light', w: 300 },
        { l: 'Regular', w: 400 }, { l: 'Medium', w: 500 }, { l: 'SemiBold', w: 600 },
        { l: 'Bold', w: 700 }, { l: 'Extra Bold', w: 800 }, { l: 'Black', w: 900 },
      ].map(({ l, w }) => (
        <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 20, padding: '10px 0', borderBottom: '1px solid #F5F5F5' }}>
          <code style={{ minWidth: 92, fontSize: 11, color: '#A1A1A1', fontFamily: 'monospace' }}>{l}</code>
          <code style={{ minWidth: 36, fontSize: 11, color: '#A1A1A1', fontFamily: 'monospace' }}>{w}</code>
          <span style={{ fontSize: 20, fontWeight: w, color: '#0A0A0A' }}>Inter Tight</span>
        </div>
      ))}
    </Card>
  </div>
);

const SpacingPage = () => {
  const spaces = [0,4,8,12,16,20,24,32,40,48,64,80,96];
  const shadows = [
    { l: 'shadow-sm',  v: '0 1px 2px rgba(0,0,0,0.05)' },
    { l: 'shadow',     v: '0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)' },
    { l: 'shadow-md',  v: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)' },
    { l: 'shadow-lg',  v: '0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05)' },
    { l: 'shadow-xl',  v: '0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04)' },
    { l: 'shadow-2xl', v: '0 25px 50px rgba(0,0,0,0.25)' },
  ];
  const radii = [
    { l: 'rounded-sm',   v: 4 },  { l: 'rounded',     v: 6 },
    { l: 'rounded-md',   v: 8 },  { l: 'rounded-lg',  v: 12 },
    { l: 'rounded-xl',   v: 16 }, { l: 'rounded-2xl', v: 24 },
    { l: 'rounded-3xl',  v: 32 }, { l: 'rounded-full',v: 9999 },
  ];
  return (
    <div>
      <SecHead title="Spacing & Shadows" subtitle="4px-base spacing scale, elevation shadows, and border-radius tokens for consistent layout and depth." category="Foundation"/>
      <Card title="Spacing Scale">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {spaces.map(v => (
            <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <code style={{ minWidth: 80, fontSize: 11, color: '#A1A1A1', fontFamily: 'monospace' }}>spacing-{v === 0 ? '0' : v / 4}</code>
              <code style={{ minWidth: 36, fontSize: 11, color: '#A1A1A1', fontFamily: 'monospace' }}>{v}px</code>
              <div style={{ height: 14, background: BLUE, width: Math.max(v, 2), borderRadius: 3, opacity: 0.75 }}/>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Box Shadows">
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', paddingTop: 8 }}>
          {shadows.map(({ l, v }) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 72, height: 72, background: '#FFF', borderRadius: 10, boxShadow: v, border: '1px solid #FAFAFA' }}/>
              <code style={{ fontSize: 10, fontWeight: 600, color: '#525252', fontFamily: 'monospace' }}>{l}</code>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Border Radius">
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end', paddingTop: 8 }}>
          {radii.map(({ l, v }) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 56, height: 56, background: BLUE, borderRadius: Math.min(v, 28) }}/>
              <code style={{ fontSize: 10, fontWeight: 600, color: '#525252', textAlign: 'center', fontFamily: 'monospace' }}>{l}</code>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const ButtonsPage = () => (
  <div>
    <SecHead title="Buttons" subtitle="Solid and outline variants across 4 brand colors, 3 sizes, and interactive states." category="Component"/>
    <Card title="Solid Variants">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {['dark', 'blue', 'green', 'red'].map(c => (
          <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <code style={{ minWidth: 44, fontSize: 11, color: '#A1A1A1', fontFamily: 'monospace' }}>{c}</code>
            <Btn label="Small" color={c} size="sm"/> <Btn label="Medium" color={c} size="md"/> <Btn label="Large" color={c} size="lg"/>
            <Btn label="Disabled" color={c} disabled/>
          </div>
        ))}
      </div>
    </Card>
    <Card title="Outline Variants">
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {['dark', 'blue', 'green', 'red'].map(c => <Btn key={c} label={c.charAt(0).toUpperCase() + c.slice(1)} color={c} outline/>)}
        <Btn label="Disabled" color="blue" outline disabled/>
      </div>
    </Card>
    <Card title="With Icons">
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Btn label="Get Started" color="green" iconR="arrow-right"/>
        <Btn label="Search" color="blue" iconL="search"/>
        <Btn label="Go Back" color="dark" iconL="chevron-right" outline/>
        <Btn label="Open Link" color="light" iconR="external"/>
      </div>
    </Card>
    <Card title="Usage">
      <CodeBlock code={`<Button label="Submit" color="green" size="md" />\n<Button label="Cancel" color="dark" outline />\n<Button label="Delete" color="red" size="sm" iconL="trash" />`}/>
    </Card>
  </div>
);

const AccordionPage = () => (
  <div>
    <SecHead title="Accordion" subtitle="Collapsible question-and-answer panels. Available in simple and separated styles, with dark mode." category="Component"/>
    <Card title="Light Mode">
      <AccItem q="What is the Kuwait Design System?" a="A comprehensive collection of reusable components, guidelines, and design tokens that help government teams build consistent, accessible digital services for Kuwait citizens."/>
      <AccItem q="Who can use the design system?" a="Any team building digital services for Kuwait government entities. The system is open-source and freely available for all approved government digital projects."/>
      <AccItem q="Is it available in Arabic (RTL)?" a="Yes. Every component fully supports Arabic right-to-left layouts alongside English, with correct typography direction, mirroring, and text handling built in."/>
      <AccItem q="What accessibility standards are followed?" a="The design system targets WCAG 2.1 Level AA compliance. All interactive components are keyboard navigable and include appropriate ARIA attributes."/>
    </Card>
    <Card title="Dark Mode" dark>
      <div style={{ padding: 4 }}>
        <AccItem dark q="What is the Kuwait Design System?" a="A comprehensive collection of reusable components, guidelines, and design tokens that help government teams build consistent, accessible digital services."/>
        <AccItem dark q="Who can use the design system?" a="Any team building digital services for Kuwait government entities. Open-source and freely available."/>
        <AccItem dark q="Is it available in Arabic?" a="Yes. Full RTL and LTR support is baked into every component from the ground up."/>
      </div>
    </Card>
    <Card title="Usage">
      <CodeBlock code={`<Accordion>\n  <AccordionItem\n    question="How do I install it?"\n    answer="Run npm install @kw-gov/design-system"\n  />\n</Accordion>`}/>
    </Card>
  </div>
);

const InputsPage = () => (
  <div>
    <SecHead title="Input Fields" subtitle="Form inputs with labels, placeholder text, validation states, hints, and dark mode support." category="Component"/>
    <Card title="Default Inputs">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <DSInput label="Full Name" placeholder="Enter your full name"/>
        <DSInput label="Email Address" placeholder="you@gov.kw" type="email"/>
        <DSInput label="Password" placeholder="Enter password" type="password"/>
        <DSInput label="Phone Number" placeholder="+965 XXXX XXXX"/>
      </div>
    </Card>
    <Card title="Validation States">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <DSInput label="With Error" placeholder="Enter value" error="This field is required"/>
        <DSInput label="With Hint" placeholder="At least 8 characters" hint="Tip: use a mix of letters and numbers"/>
        <DSInput label="Disabled" placeholder="Not editable" disabled/>
        <DSInput label="Type: Number" placeholder="0" type="number"/>
      </div>
    </Card>
    <Card title="Dark Mode" dark>
      <div style={{ padding: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <DSInput dark label="Full Name" placeholder="Enter your full name"/>
        <DSInput dark label="Email" placeholder="you@gov.kw" type="email"/>
        <DSInput dark label="Error State" placeholder="Enter value" error="Required field"/>
        <DSInput dark label="With Hint" placeholder="Enter value" hint="Optional field"/>
      </div>
    </Card>
    <Card title="Usage">
      <CodeBlock code={`<Input label="Email" placeholder="you@gov.kw" type="email" />\n<Input label="Field" error="This field is required" />\n<Input label="Notes" hint="Optional — up to 500 characters" />`}/>
    </Card>
  </div>
);

const BadgesPage = () => (
  <div>
    <SecHead title="Badges" subtitle="Status indicators, category labels, and notification tags in semantic and neutral colors." category="Component"/>
    <Card title="Color Variants">
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        {['gray','blue','green','red','yellow','purple','pink','dark'].map(c => (
          <Chip key={c} label={c.charAt(0).toUpperCase()+c.slice(1)} color={c}/>
        ))}
      </div>
    </Card>
    <Card title="Sizes">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <Chip label="Small" color="blue" size="sm"/>
        <Chip label="Medium" color="blue" size="md"/>
        <Chip label="Large" color="blue" size="lg"/>
      </div>
    </Card>
    <Card title="Semantic Use">
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Chip label="New" color="green"/> <Chip label="Beta" color="yellow"/> <Chip label="Deprecated" color="red"/>
        <Chip label="v1.0" color="gray"/> <Chip label="Foundation" color="purple"/> <Chip label="Component" color="blue"/>
        <Chip label="RTL" color="pink"/> <Chip label="WCAG AA" color="dark"/>
      </div>
    </Card>
    <Card title="Usage">
      <CodeBlock code={`<Badge label="New" color="green" />\n<Badge label="Beta" color="yellow" size="sm" />\n<Badge label="Deprecated" color="red" size="lg" />`}/>
    </Card>
  </div>
);

const MorePage = () => {
  const [step, setStep] = useState(1);
  return (
    <div>
      <SecHead title="More Components" subtitle="Steppers, pagination, skeleton loaders, and more interactive patterns." category="Component"/>
      <Card title="Stepper">
        <div style={{ marginBottom: 20 }}>
          <Stepper steps={['Personal Info', 'Documents', 'Review', 'Submit']} current={step}/>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Btn label="Previous" color="light" size="sm" onClick={() => setStep(s => Math.max(0, s - 1))}/>
          <Btn label="Next" color="blue" size="sm" onClick={() => setStep(s => Math.min(3, s + 1))}/>
          <Btn label="Reset" color="dark" size="sm" outline onClick={() => setStep(0)}/>
        </div>
      </Card>
      <Card title="Pagination">
        <Pagination total={7}/>
      </Card>
      <Card title="Skeleton Loader">
        <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <Skel w={48} h={48} r={24}/>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Skel w="60%" h={14}/>
            <Skel w="40%" h={12}/>
            <Skel h={12}/>
            <Skel h={12}/>
            <Skel w="80%" h={12}/>
          </div>
        </div>
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Skel h={80} r={8}/>
              <Skel w="70%" h={12}/>
              <Skel w="50%" h={10}/>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Badge + Button Combos">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'View Documentation', badge: 'Updated', bc: 'green', color: 'blue' },
            { label: 'Component Status', badge: 'Beta', bc: 'yellow', color: 'dark', outline: true },
            { label: 'Deprecated API', badge: 'Deprecated', bc: 'red', color: 'light' },
          ].map(({ label, badge, bc, color, outline }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Btn label={label} color={color} outline={outline} iconR="arrow-right"/>
              <Chip label={badge} color={bc} size="sm"/>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════════════════════════════

const NAV_ITEMS = [
  { id: 'home', label: 'Overview' },
  { id: 'getting-started', label: 'Getting Started' },
  { sep: true },
  { group: 'Foundation' },
  { id: 'colors',     label: 'Colors',            icon: 'palette' },
  { id: 'typography', label: 'Typography',         icon: 'type' },
  { id: 'spacing',    label: 'Spacing & Shadows',  icon: 'layers' },
  { sep: true },
  { group: 'Components' },
  { id: 'buttons',       label: 'Buttons',          icon: 'box' },
  { id: 'badges',        label: 'Badges' },
  { id: 'inputs',        label: 'Input Fields',     icon: 'grid' },
  { id: 'number-inputs', label: 'Number Inputs' },
  { id: 'tag-inputs',    label: 'Tag Inputs' },
  { id: 'accordion',     label: 'Accordion',        icon: 'sliders' },
  { id: 'cards',         label: 'Cards' },
  { id: 'avatars',       label: 'Avatars' },
  { id: 'toasts',        label: 'Toasts' },
  { id: 'modals',        label: 'Modals' },
  { id: 'tables',        label: 'Tables' },
  { id: 'gallery',       label: 'Gallery' },
  { id: 'progress',      label: 'Progress Bars' },
  { id: 'form-controls', label: 'Radio / Checkbox / Toggle' },
  { id: 'timelines',     label: 'Timelines' },
  { id: 'more',          label: 'More Components' },
  { sep: true },
  { group: 'Navigation' },
  { id: 'navbar',        label: 'Navbar' },
  { id: 'breadcrumbs',   label: 'Breadcrumbs' },
  { id: 'steppers',      label: 'Steppers' },
  { sep: true },
  { group: 'Feedback & Overlay' },
  { id: 'tooltips',      label: 'Tooltips' },
  { id: 'spinners',      label: 'Spinners' },
  { sep: true },
  { group: 'Forms' },
  { id: 'datepicker',    label: 'Datepicker' },
  { id: 'file-upload',   label: 'File Upload' },
];

const Sidebar = ({ active, go, open, setOpen }) => {
  return (
    <div style={{ width: 248, flexShrink: 0, height: '100vh', background: '#FFF', borderRight: '1px solid #E5E5E5', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, overflowY: 'auto' }}>
      {/* Logo */}
      <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid #E5E5E5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <KuwaitFlag h={24}/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0A0A0A', lineHeight: 1.2 }}>Kuwait</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: BRAND, lineHeight: 1.2 }}>Design System</div>
          </div>
        </div>
        <Chip label="v1.0 — Beta" color="gray" size="sm"/>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
        {NAV_ITEMS.map((item, i) => {
          if (item.sep) return <div key={i} style={{ height: 1, background: '#F5F5F5', margin: '6px 8px' }}/>;
          if (item.group) return <div key={i} style={{ padding: '8px 10px 4px', fontSize: 10, fontWeight: 700, color: '#A1A1A1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.group}</div>;
          const on = active === item.id;
          return (
            <button key={item.id} onClick={() => go(item.id)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: on ? 600 : 400, background: on ? '#F0FDF4' : 'transparent', color: on ? BRAND : '#525252', transition: 'all 0.1s', position: 'relative' }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = '#F5F5F5'; }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
              {on && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 16, background: BRAND, borderRadius: '0 2px 2px 0' }}/>}
              {item.icon && <Icon n={item.icon} size={14} color={on ? BRAND : '#A1A1A1'}/>}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #E5E5E5' }}>
        <div style={{ fontSize: 11, color: '#A1A1A1', lineHeight: 1.6 }}>© 2025 State of Kuwait</div>
        <div style={{ fontSize: 11, color: '#C4C4C4', marginTop: 2 }}>Ministry of Digital Transformation</div>
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #F5F5F5', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #006C35, #1C64F2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: '#FFF' }}>G</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#525252', lineHeight: 1.3 }}>Gokul</div>
            <div style={{ fontSize: 9, color: '#C4C4C4', lineHeight: 1.4 }}>Conceptual project</div>
          </div>
        </div>
        <p style={{ fontSize: 9, color: '#D4D4D4', lineHeight: 1.5, marginTop: 8 }}>
          An exploration of a unified design system for Kuwait government digital services.
        </p>
      </div>
    </div>
  );
};

const TopBar = ({ section, go }) => {
  const [lang, setLang] = useState('EN');
  const breadcrumb = section === 'home' ? null : (NAV_ITEMS.find(n => n.id === section)?.label || section);
  return (
    <div style={{ height: 52, background: '#FFF', borderBottom: '1px solid #E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#A1A1A1' }}>
        <span style={{ cursor: 'pointer', color: '#737373' }} onClick={() => go('home')}>Design System</span>
        {breadcrumb && <><Icon n="chevron-right" size={13} color="#D4D4D4"/><span style={{ color: '#0A0A0A', fontWeight: 500 }}>{breadcrumb}</span></>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setLang(l => l === 'EN' ? 'عربي' : 'EN')} style={{ height: 32, padding: '0 12px', background: '#F5F5F5', border: '1px solid #E5E5E5', borderRadius: 7, fontSize: 12, fontWeight: 600, color: '#525252', cursor: 'pointer', fontFamily: 'Inter Tight, sans-serif' }}>
          {lang === 'EN' ? 'عربي' : 'English'}
        </button>
        <a href="https://github.com" target="_blank" style={{ height: 32, padding: '0 12px', background: '#0A0A0A', borderRadius: 7, fontSize: 12, fontWeight: 600, color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon n="github" size={13} color="#FFF"/> GitHub
        </a>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════════════════════════

const PAGES = {
  'home':          (go) => <HomePage go={go}/>,
  'getting-started': () => <GettingStartedPage/>,
  'colors':        () => <ColorsPage/>,
  'typography':    () => <TypographyPage/>,
  'spacing':       () => <SpacingPage/>,
  'buttons':       () => <ButtonsPage/>,
  'accordion':     () => <AccordionPage/>,
  'inputs':        () => <InputsPage/>,
  'badges':        () => <BadgesPage/>,
  'more':          () => <MorePage/>,
  'cards':         () => { const P = window.CardsPage;        return P ? <P/> : null; },
  'avatars':       () => { const P = window.AvatarsPage;      return P ? <P/> : null; },
  'toasts':        () => { const P = window.ToastsPage;       return P ? <P/> : null; },
  'tables':        () => { const P = window.TablesPage;       return P ? <P/> : null; },
  'progress':      () => { const P = window.ProgressPage;     return P ? <P/> : null; },
  'form-controls': () => { const P = window.FormControlsPage; return P ? <P/> : null; },
  'modals':        () => { const P = window.ModalsPage;       return P ? <P/> : null; },
  'timelines':     () => { const P = window.TimelinesPage;    return P ? <P/> : null; },
  'number-inputs': () => { const P = window.NumberInputsPage; return P ? <P/> : null; },
  'tag-inputs':    () => { const P = window.TagInputsPage;    return P ? <P/> : null; },
  'gallery':       () => { const P = window.GalleryPage;      return P ? <P/> : null; },
  'breadcrumbs':   () => { const P = window.BreadcrumbsPage;  return P ? <P/> : null; },
  'spinners':      () => { const P = window.SpinnersPage;     return P ? <P/> : null; },
  'tooltips':      () => { const P = window.TooltipsPage;     return P ? <P/> : null; },
  'datepicker':    () => { const P = window.DatepickerPage;   return P ? <P/> : null; },
  'file-upload':   () => { const P = window.FileUploadPage;   return P ? <P/> : null; },
  'steppers':      () => { const P = window.SteppersPage;     return P ? <P/> : null; },
  'navbar':        () => { const P = window.NavbarPage;       return P ? <P/> : null; },
};

function App() {
  const [section, setSection] = useState('home');
  const go = (s) => { setSection(s); document.querySelector('main')?.scrollTo(0, 0); };
  const PageComponent = PAGES[section];
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter Tight,sans-serif', background: '#FAFAFA' }}>
      <Sidebar active={section} go={go}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <TopBar section={section} go={go}/>
        <main style={{ flex: 1, overflowY: 'auto', padding: '36px 44px' }}>
          <div style={{ maxWidth: 860 }}>
            {PageComponent ? PageComponent(go) : <HomePage go={go}/>}
          </div>
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
