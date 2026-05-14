// Kuwait Design System — ds-pages3.jsx
// Tooltips, Spinners, Steppers, Navbar, File Upload, Datepicker, Breadcrumbs

const { useState, useRef, useEffect } = React;
const BRAND3 = '#006C35';
const BLUE3  = '#1C64F2';

// ── Shared helpers ───────────────────────────────────────────────
const I3 = ({ n, size = 16, color = 'currentColor' }) => {
  const p = {
    x:        <><line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    check:    <polyline points="20,6 9,17 4,12" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    chevR:    <polyline points="9,18 15,12 9,6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    chevL:    <polyline points="15,18 9,12 15,6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    chevD:    <polyline points="6,9 12,15 18,9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none"/><line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    upload:   <><polyline points="16,16 12,12 8,16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="12" x2="12" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    file:     <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14,2 14,8 20,8" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    trash:    <><polyline points="3,6 5,6 21,6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    search:   <><circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    bell:     <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/></>,
    menu:     <><line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    user:     <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" fill="none"/></>,
    warn:     <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth="2" fill="none"/><line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill={color}/></>,
    info:     <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/><line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill={color}/></>,
    globe:    <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/><line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={color} strokeWidth="2" fill="none"/></>,
    home:     <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9,22 9,12 15,12 15,22" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{ display:'block', flexShrink:0 }}>{p[n]||null}</svg>;
};

const SH3 = ({ title, subtitle, category }) => (
  <div style={{ marginBottom:36, paddingBottom:24, borderBottom:'1px solid #E5E5E5' }}>
    <div style={{ marginBottom:12 }}>
      {category && <span style={{ display:'inline-flex', alignItems:'center', background:category==='Component'?'#EFF6FF':'#F0FDF4', color:category==='Component'?BLUE3:BRAND3, border:`1px solid ${category==='Component'?'#BFDBFE':'#BBF7D0'}`, borderRadius:999, padding:'2px 10px', fontSize:11, fontWeight:600 }}>{category}</span>}
    </div>
    <h1 style={{ fontSize:28, fontWeight:700, color:'#0A0A0A', lineHeight:1.2, marginBottom:8 }}>{title}</h1>
    {subtitle && <p style={{ fontSize:15, color:'#737373', lineHeight:1.65, maxWidth:600 }}>{subtitle}</p>}
  </div>
);

const DC3 = ({ title, desc, dark=false, children }) => (
  <div style={{ background:dark?'#0A0A0A':'#FFF', border:`1px solid ${dark?'#262626':'#E5E5E5'}`, borderRadius:10, overflow:'hidden', marginBottom:20 }}>
    {title && <div style={{ padding:'11px 20px', borderBottom:`1px solid ${dark?'#262626':'#E5E5E5'}`, background:dark?'#141414':'#FAFAFA' }}>
      <span style={{ fontSize:12, fontWeight:600, color:dark?'#A1A1A1':'#525252', letterSpacing:'0.03em', textTransform:'uppercase' }}>{title}</span>
      {desc && <span style={{ fontSize:12, color:'#A1A1A1', marginLeft:8 }}>{desc}</span>}
    </div>}
    <div style={{ padding:24 }}>{children}</div>
  </div>
);

const CB3 = ({ code }) => {
  const [cp,setCp]=useState(false);
  return (
    <div style={{ position:'relative', background:'#0A0A0A', borderRadius:8, overflow:'hidden' }}>
      <pre style={{ margin:0, padding:'16px 48px 16px 20px', fontSize:13, color:'#E5E5E5', lineHeight:1.65, overflowX:'auto', whiteSpace:'pre-wrap', wordBreak:'break-all' }}>{code}</pre>
      <button onClick={()=>{navigator.clipboard?.writeText(code);setCp(true);setTimeout(()=>setCp(false),1500);}} style={{ position:'absolute',top:10,right:10,background:cp?'#006C35':'#262626',border:'none',borderRadius:6,padding:'4px 10px',color:'#E5E5E5',fontSize:11,fontWeight:600,cursor:'pointer' }}>
        {cp?'✓ Copied':'Copy'}
      </button>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// BREADCRUMBS
// ════════════════════════════════════════════════════════════════
function BreadcrumbsPage() {
  const Breadcrumb = ({ items, dark=false, separator='/' }) => (
    <nav style={{ display:'flex', alignItems:'center', gap:4, flexWrap:'wrap' }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color:dark?'#525252':'#D4D4D4', fontSize:13, userSelect:'none' }}>{separator}</span>}
          <span style={{ fontSize:13, fontWeight: i===items.length-1 ? 600 : 400, color: i===items.length-1 ? (dark?'#FFF':'#0A0A0A') : (dark?'#737373':'#737373'), cursor: i<items.length-1 ? 'pointer' : 'default' }}
            onMouseEnter={e=>{ if(i<items.length-1) e.currentTarget.style.color=dark?'#E5E5E5':BLUE3; }}
            onMouseLeave={e=>{ if(i<items.length-1) e.currentTarget.style.color=dark?'#737373':'#737373'; }}>
            {item.icon && <span style={{ marginRight:4 }}>{item.icon}</span>}
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );

  const govPaths = [
    { items:[{label:'Home'},{label:'Services'},{label:'Civil ID'}] },
    { items:[{label:'Home'},{label:'Ministry of Interior'},{label:'Passport Services'},{label:'New Application'}] },
    { items:[{label:'Home'},{label:'Municipality'},{label:'Permits'},{label:'Commercial'},{label:'Application Form'}] },
    { items:[{label:'⌂ Home', label:'Home'},{label:'Services'},{label:'Traffic Fines'},{label:'Payment'}] },
  ];

  return (
    <div>
      <SH3 title="Breadcrumbs" subtitle="Navigation trail showing the user's location within the site hierarchy." category="Component"/>

      <DC3 title="Default — Slash Separator">
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {govPaths.map((p, i) => (
            <div key={i} style={{ padding:'12px 16px', background:'#FAFAFA', border:'1px solid #F0F0F0', borderRadius:8 }}>
              <Breadcrumb items={p.items}/>
            </div>
          ))}
        </div>
      </DC3>

      <DC3 title="Chevron Separator">
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {govPaths.slice(0,3).map((p, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:4 }}>
              {p.items.map((item, j) => (
                <React.Fragment key={j}>
                  {j > 0 && <I3 n="chevR" size={14} color="#D4D4D4"/>}
                  <span style={{ fontSize:13, fontWeight:j===p.items.length-1?600:400, color:j===p.items.length-1?'#0A0A0A':'#737373', cursor:j<p.items.length-1?'pointer':'default' }}
                    onMouseEnter={e=>{ if(j<p.items.length-1) e.currentTarget.style.color=BLUE3; }}
                    onMouseLeave={e=>{ if(j<p.items.length-1) e.currentTarget.style.color='#737373'; }}>
                    {item.label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </DC3>

      <DC3 title="Dark Mode" dark>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {govPaths.slice(0,3).map((p, i) => (
            <Breadcrumb key={i} items={p.items} dark separator="›"/>
          ))}
        </div>
      </DC3>

      <DC3 title="With Home Icon">
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {[
            [{label:'Home', icon:'🏛️'},{label:'Services'},{label:'Civil ID Renewal'}],
            [{label:'Home', icon:'🏛️'},{label:'Ministry of Interior'},{label:'Passports'},{label:'Apply'}],
          ].map((items,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:6 }}>
              {items.map((item,j) => (
                <React.Fragment key={j}>
                  {j > 0 && <I3 n="chevR" size={13} color="#D4D4D4"/>}
                  <span style={{ fontSize:13, fontWeight:j===items.length-1?600:400, color:j===items.length-1?'#0A0A0A':'#737373', cursor:j<items.length-1?'pointer':'default', display:'flex', alignItems:'center', gap:4 }}>
                    {item.icon && <span>{item.icon}</span>}
                    {item.label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </DC3>

      <DC3 title="Usage"><CB3 code={`<Breadcrumb\n  items={[\n    { label: 'Home' },\n    { label: 'Services' },\n    { label: 'Civil ID Renewal' },\n  ]}\n  separator="chevron"\n/>`}/></DC3>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SPINNERS
// ════════════════════════════════════════════════════════════════
function SpinnersPage() {
  // Spinner uses CSS animation: a circle with a gap (conic-gradient trick)
  const Spinner = ({ size=40, color=BLUE3, trackColor='#F5F5F5', thickness=4, dark=false }) => (
    <div style={{ width:size, height:size, position:'relative', flexShrink:0 }}>
      <div style={{ width:size, height:size, borderRadius:'50%', border:`${thickness}px solid ${dark?'#333':trackColor}`, borderTopColor:color, animation:'spin 0.8s linear infinite' }}/>
    </div>
  );

  const sizes = [
    { label:'XL', size:112, thickness:8 },
    { label:'LG', size:80,  thickness:7 },
    { label:'MD', size:56,  thickness:5 },
    { label:'SM', size:24,  thickness:3 },
  ];

  return (
    <div>
      <SH3 title="Spinners" subtitle="Circular loading indicators for async operations, page loads, and form submissions." category="Component"/>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <DC3 title="Sizes — Light">
        <div style={{ display:'flex', alignItems:'center', gap:32, flexWrap:'wrap', padding:'8px 0' }}>
          {sizes.map(({ label, size, thickness }) => (
            <div key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
              <Spinner size={size} thickness={thickness}/>
              <span style={{ fontSize:12, fontWeight:600, color:'#525252' }}>{label}</span>
              <span style={{ fontSize:11, color:'#A1A1A1' }}>{size}px</span>
            </div>
          ))}
        </div>
      </DC3>

      <DC3 title="Color Variants">
        <div style={{ display:'flex', alignItems:'center', gap:28, flexWrap:'wrap' }}>
          {[{c:BLUE3,l:'Blue'},{c:BRAND3,l:'Green'},{c:'#E02424',l:'Red'},{c:'#9333EA',l:'Purple'},{c:'#E3A008',l:'Yellow'},{c:'#0891B2',l:'Cyan'}].map(({c,l}) => (
            <div key={l} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
              <Spinner size={40} color={c} thickness={4}/>
              <span style={{ fontSize:11, fontWeight:600, color:'#525252' }}>{l}</span>
            </div>
          ))}
        </div>
      </DC3>

      <DC3 title="Dark Mode" dark>
        <div style={{ display:'flex', alignItems:'center', gap:32, flexWrap:'wrap', padding:'8px 0' }}>
          {sizes.map(({ label, size, thickness }) => (
            <div key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
              <Spinner size={size} thickness={thickness} dark color="#3F83F8" trackColor="#262626"/>
              <span style={{ fontSize:12, fontWeight:600, color:'#A1A1A1' }}>{label}</span>
            </div>
          ))}
        </div>
      </DC3>

      <DC3 title="In Context — Button Loading States">
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
          {[
            { label:'Submitting...', color:'#0A0A0A', bg:'#F5F5F5', tc:'#525252' },
            { label:'Processing...', color:BLUE3,    bg:'#EFF6FF', tc:BLUE3 },
            { label:'Uploading...',  color:BRAND3,   bg:'#F0FDF4', tc:BRAND3 },
          ].map(({ label, color, bg, tc }) => (
            <div key={label} style={{ height:40, padding:'0 16px', background:bg, border:`1.5px solid ${color}33`, borderRadius:8, display:'flex', alignItems:'center', gap:8 }}>
              <Spinner size={16} color={color} thickness={2.5}/>
              <span style={{ fontSize:13, fontWeight:600, color:tc, fontFamily:'Inter Tight,sans-serif' }}>{label}</span>
            </div>
          ))}
        </div>
      </DC3>

      <DC3 title="Usage"><CB3 code={`<Spinner size="md" color="blue" />\n<Spinner size="lg" color="green" dark />\n\n// Inside a button:\n<Button loading label="Submitting..." />`}/></DC3>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// TOOLTIPS
// ════════════════════════════════════════════════════════════════
function TooltipsPage() {
  const Tooltip = ({ text, title, position='top', dark=false, children }) => {
    const [show, setShow] = useState(false);
    const bg   = dark ? '#0A0A0A' : '#FAFAFA';
    const brd  = dark ? '#262626' : '#E5E5E5';
    const tc   = dark ? '#FFF'    : '#0A0A0A';
    const stc  = dark ? '#A1A1A1' : '#737373';
    const shadow = '0 2px 4px -2px rgba(0,0,0,0.05), 0 4px 6px -1px rgba(0,0,0,0.1)';

    const Arrow = ({ pos }) => {
      const style = { position:'absolute', width:0, height:0, border:'6px solid transparent' };
      const arrows = {
        top:    { ...style, bottom:-12, left:'50%', transform:'translateX(-50%)', borderTopColor:bg },
        bottom: { ...style, top:-12,   left:'50%', transform:'translateX(-50%)', borderBottomColor:bg },
        left:   { ...style, right:-12, top:'50%',  transform:'translateY(-50%)', borderLeftColor:bg },
        right:  { ...style, left:-12,  top:'50%',  transform:'translateY(-50%)', borderRightColor:bg },
      };
      return <div style={arrows[pos]}/>;
    };

    const posStyle = {
      top:    { bottom:'calc(100% + 10px)', left:'50%', transform:'translateX(-50%)' },
      bottom: { top:'calc(100% + 10px)',    left:'50%', transform:'translateX(-50%)' },
      left:   { right:'calc(100% + 10px)',  top:'50%',  transform:'translateY(-50%)' },
      right:  { left:'calc(100% + 10px)',   top:'50%',  transform:'translateY(-50%)' },
    };

    return (
      <div style={{ position:'relative', display:'inline-flex' }}
        onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
        {children}
        {show && (
          <div style={{ position:'absolute', zIndex:100, minWidth:160, maxWidth:260, ...posStyle[position], background:bg, border:`1px solid ${brd}`, borderRadius:8, padding: title?'12px 14px':'10px 14px', boxShadow:shadow, whiteSpace:'nowrap' }}>
            {title && <div style={{ fontSize:13, fontWeight:700, color:tc, marginBottom:4 }}>{title}</div>}
            <div style={{ fontSize:12, color:title?stc:tc, lineHeight:1.5, whiteSpace:'normal' }}>{text}</div>
            <Arrow pos={position}/>
          </div>
        )}
      </div>
    );
  };

  const TriggerBtn = ({ label }) => (
    <button style={{ height:36, padding:'0 16px', background:'#FFF', border:'1.5px solid #E5E5E5', borderRadius:8, fontSize:13, fontWeight:500, color:'#525252', cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>{label}</button>
  );

  return (
    <div>
      <SH3 title="Tooltips" subtitle="Contextual info popups triggered on hover. Four positions, light and dark, with optional title." category="Component"/>

      <DC3 title="Positions — Hover to see">
        <div style={{ display:'flex', gap:20, flexWrap:'wrap', padding:'20px 0', alignItems:'center', justifyContent:'center' }}>
          {['top','bottom','left','right'].map(pos => (
            <Tooltip key={pos} position={pos} text={`Tooltip on the ${pos}`}>
              <TriggerBtn label={`Hover ${pos}`}/>
            </Tooltip>
          ))}
        </div>
      </DC3>

      <DC3 title="With Title">
        <div style={{ display:'flex', gap:20, flexWrap:'wrap', padding:'20px 0', alignItems:'center', justifyContent:'center' }}>
          <Tooltip position="top" title="Civil ID Service" text="Renew your civil ID online. Processing takes 3–5 business days.">
            <TriggerBtn label="Civil ID"/>
          </Tooltip>
          <Tooltip position="bottom" title="Passport Services" text="Apply for a new passport or renew an existing one.">
            <TriggerBtn label="Passports"/>
          </Tooltip>
          <Tooltip position="right" title="Municipality Permit" text="Commercial and construction permits for Kuwait Municipality.">
            <TriggerBtn label="Permits"/>
          </Tooltip>
        </div>
      </DC3>

      <DC3 title="Dark Tooltips — Hover to see">
        <div style={{ display:'flex', gap:20, flexWrap:'wrap', padding:'20px 0', alignItems:'center' }}>
          {['top','bottom','left','right'].map(pos => (
            <Tooltip key={pos} dark position={pos} text={`Dark tooltip — ${pos}`}>
              <TriggerBtn label={`Dark ${pos}`}/>
            </Tooltip>
          ))}
        </div>
      </DC3>

      <DC3 title="Usage"><CB3 code={`<Tooltip\n  text="Renew your Civil ID online."\n  title="Civil ID Service"\n  position="top"\n  dark\n>\n  <Button label="Civil ID" />\n</Tooltip>`}/></DC3>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// DATEPICKER
// ════════════════════════════════════════════════════════════════
function DatepickerPage() {
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const Datepicker = ({ dark=false, range=false }) => {
    const today = new Date();
    const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
    const [selected, setSelected] = useState(null);
    const [rangeStart, setRangeStart] = useState(null);
    const [rangeEnd, setRangeEnd]     = useState(null);
    const [open, setOpen] = useState(true);

    const bg   = dark ? '#262626' : '#FFF';
    const brd  = dark ? '#404040' : '#E5E5E5';
    const tc   = dark ? '#FFF'    : '#0A0A0A';
    const stc  = dark ? '#A1A1A1' : '#737373';
    const hov  = dark ? '#333'    : '#F5F5F5';

    const firstDay = new Date(view.year, view.month, 1).getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
    while (cells.length % 7 !== 0) cells.push(null);

    const fmt = (d) => d ? `${MONTHS[view.month].slice(0,3)} ${d}, ${view.year}` : '';
    const isToday = (d) => d === today.getDate() && view.month === today.getMonth() && view.year === today.getFullYear();
    const isSelected = (d) => !range && selected === d;
    const isStart = (d) => range && rangeStart === d;
    const isEnd   = (d) => range && rangeEnd === d;
    const isDuring = (d) => {
      if (!range || !rangeStart || !rangeEnd || !d) return false;
      return d > Math.min(rangeStart, rangeEnd) && d < Math.max(rangeStart, rangeEnd);
    };

    const handleDay = (d) => {
      if (!d) return;
      if (!range) { setSelected(d); return; }
      if (!rangeStart || (rangeStart && rangeEnd)) { setRangeStart(d); setRangeEnd(null); }
      else { setRangeEnd(d); }
    };

    return (
      <div style={{ width:340, fontFamily:'Inter Tight,sans-serif' }}>
        {/* Input trigger */}
        <div onClick={()=>setOpen(o=>!o)} style={{ height:42, border:`1.5px solid ${open?BLUE3:brd}`, borderRadius:8, padding:'0 12px', display:'flex', alignItems:'center', gap:8, background:dark?'#141414':'#FFF', cursor:'pointer', marginBottom:6 }}>
          <I3 n="calendar" size={16} color={dark?'#737373':'#A1A1A1'}/>
          <span style={{ fontSize:13, color:tc, flex:1 }}>
            {range ? (rangeStart ? `${fmt(rangeStart)}${rangeEnd ? ` → ${fmt(rangeEnd)}` : ''}` : 'Select date range') : (selected ? fmt(selected) : 'Select a date')}
          </span>
          <I3 n="chevD" size={14} color={dark?'#737373':'#A1A1A1'}/>
        </div>

        {open && (
          <div style={{ background:bg, border:`1.5px solid ${brd}`, borderRadius:10, padding:16, boxShadow:'0 4px 16px rgba(0,0,0,0.1)' }}>
            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
              <button onClick={()=>setView(v=>{ const d=new Date(v.year,v.month-1); return {year:d.getFullYear(),month:d.getMonth()}; })} style={{ width:28, height:28, borderRadius:6, background:'none', border:`1px solid ${brd}`, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <I3 n="chevL" size={14} color={tc}/>
              </button>
              <span style={{ fontSize:14, fontWeight:600, color:tc }}>{MONTHS[view.month]} {view.year}</span>
              <button onClick={()=>setView(v=>{ const d=new Date(v.year,v.month+1); return {year:d.getFullYear(),month:d.getMonth()}; })} style={{ width:28, height:28, borderRadius:6, background:'none', border:`1px solid ${brd}`, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <I3 n="chevR" size={14} color={tc}/>
              </button>
            </div>

            {/* Weekday headers */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginBottom:4 }}>
              {DAYS.map(d => <div key={d} style={{ textAlign:'center', fontSize:11, fontWeight:600, color:stc, padding:'4px 0' }}>{d}</div>)}
            </div>

            {/* Day grid */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2 }}>
              {cells.map((d, i) => {
                const sel = isSelected(d);
                const start = isStart(d);
                const end   = isEnd(d);
                const dur   = isDuring(d);
                const tod   = isToday(d);
                let bg2 = 'transparent', col = tc;
                if (sel || start || end) { bg2 = BLUE3; col = '#FFF'; }
                else if (dur) { bg2 = '#EFF6FF'; col = BLUE3; }
                else if (tod) { bg2 = dark?'#333':hov; }
                return (
                  <div key={i} onClick={()=>handleDay(d)}
                    style={{ height:36, borderRadius:sel||start||end?8:dur?0:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:sel||start||end?700:400, background:bg2, color:d?col:'transparent', cursor:d?'pointer':'default', transition:'background 0.1s' }}
                    onMouseEnter={e=>{ if(d && !sel && !start && !end && !dur) e.currentTarget.style.background=dark?'#333':'#F5F5F5'; }}
                    onMouseLeave={e=>{ if(d && !sel && !start && !end && !dur) e.currentTarget.style.background=tod?(dark?'#333':hov):'transparent'; }}>
                    {d}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{ display:'flex', justifyContent:'flex-end', gap:8, marginTop:12, paddingTop:12, borderTop:`1px solid ${brd}` }}>
              <button onClick={()=>{ setSelected(null); setRangeStart(null); setRangeEnd(null); }} style={{ height:32, padding:'0 12px', background:'none', border:`1px solid ${brd}`, borderRadius:7, fontSize:12, fontWeight:500, color:stc, cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Cancel</button>
              <button onClick={()=>setOpen(false)} style={{ height:32, padding:'0 14px', background:BLUE3, border:'none', borderRadius:7, fontSize:12, fontWeight:600, color:'#FFF', cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Apply</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <SH3 title="Datepicker" subtitle="Interactive calendar dropdown for single date and date range selection. Light and dark modes." category="Component"/>
      <DC3 title="Single Date — Light">
        <Datepicker/>
      </DC3>
      <DC3 title="Date Range — Light">
        <Datepicker range/>
      </DC3>
      <DC3 title="Single Date — Dark" dark>
        <div style={{ padding:4 }}><Datepicker dark/></div>
      </DC3>
      <DC3 title="Usage"><CB3 code={`<Datepicker\n  mode="single"\n  value={date}\n  onChange={setDate}\n  placeholder="Select a date"\n/>\n\n<Datepicker\n  mode="range"\n  value={[startDate, endDate]}\n  onChange={setRange}\n/>`}/></DC3>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// FILE UPLOAD
// ════════════════════════════════════════════════════════════════
function FileUploadPage() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const fmtSize = (b) => b > 1048576 ? `${(b/1048576).toFixed(1)} MB` : `${Math.round(b/1024)} KB`;

  const addFiles = (fl) => {
    const arr = Array.from(fl).map(f => ({ name:f.name, size:f.size, type:f.type, status:'uploading', progress:0, id:Date.now()+Math.random() }));
    setFiles(prev => [...prev, ...arr]);
    arr.forEach(f => {
      let p = 0;
      const t = setInterval(() => {
        p += Math.random() * 20 + 5;
        if (p >= 100) { p = 100; clearInterval(t); setFiles(prev => prev.map(x => x.id===f.id ? {...x, status:'done', progress:100} : x)); }
        else setFiles(prev => prev.map(x => x.id===f.id ? {...x, progress:Math.round(p)} : x));
      }, 180);
    });
  };

  const remove = (id) => setFiles(prev => prev.filter(x => x.id !== id));

  const getIcon = (type) => {
    if (type?.includes('image')) return '🖼️';
    if (type?.includes('pdf'))   return '📄';
    if (type?.includes('word') || type?.includes('document')) return '📝';
    if (type?.includes('sheet') || type?.includes('excel'))   return '📊';
    return '📎';
  };

  const mockFiles = [
    { name:'Civil_ID_Copy.pdf',    size:245760,  type:'application/pdf',  status:'done',       progress:100, id:1 },
    { name:'Passport_Scan.jpg',    size:1258291, type:'image/jpeg',        status:'uploading',  progress:67,  id:2 },
    { name:'Proof_of_Residence.docx',size:89088, type:'application/docx', status:'done',       progress:100, id:3 },
    { name:'Bank_Statement.pdf',   size:512000,  type:'application/pdf',  status:'error',      progress:0,   id:4 },
  ];

  return (
    <div>
      <SH3 title="File Upload" subtitle="Drag-and-drop and click-to-browse file uploaders with upload progress and file states." category="Component"/>

      <DC3 title="Drag & Drop — Live Demo">
        <div
          onDragOver={e=>{e.preventDefault();setDragging(true);}}
          onDragLeave={()=>setDragging(false)}
          onDrop={e=>{e.preventDefault();setDragging(false);addFiles(e.dataTransfer.files);}}
          onClick={()=>inputRef.current?.click()}
          style={{ border:`2px dashed ${dragging?BLUE3:'#D4D4D4'}`, borderRadius:12, padding:'36px 24px', textAlign:'center', cursor:'pointer', background:dragging?'#EFF6FF':'#FAFAFA', transition:'all 0.15s', marginBottom:16 }}>
          <input ref={inputRef} type="file" multiple style={{ display:'none' }} onChange={e=>addFiles(e.target.files)}/>
          <div style={{ width:48, height:48, borderRadius:12, background:dragging?'#BFDBFE':'#E5E5E5', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
            <I3 n="upload" size={22} color={dragging?BLUE3:'#737373'}/>
          </div>
          <div style={{ fontSize:14, fontWeight:600, color:dragging?BLUE3:'#0A0A0A', marginBottom:4 }}>
            {dragging ? 'Drop files here' : 'Drag & drop files, or click to browse'}
          </div>
          <div style={{ fontSize:12, color:'#A1A1A1' }}>Supports PDF, JPG, PNG, DOCX — max 10MB each</div>
        </div>

        {files.length > 0 && (
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {files.map(f => (
              <div key={f.id} style={{ border:'1px solid #E5E5E5', borderRadius:8, padding:'10px 14px', background:'#FFF', display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ fontSize:22, flexShrink:0 }}>{getIcon(f.type)}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:'#0A0A0A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.name}</span>
                    <span style={{ fontSize:11, color:'#A1A1A1', flexShrink:0, marginLeft:8 }}>{fmtSize(f.size)}</span>
                  </div>
                  {f.status==='uploading' && (
                    <div style={{ height:4, background:'#F5F5F5', borderRadius:999 }}>
                      <div style={{ height:'100%', width:`${f.progress}%`, background:BLUE3, borderRadius:999, transition:'width 0.2s' }}/>
                    </div>
                  )}
                  {f.status==='done' && <span style={{ fontSize:11, color:'#16A34A', fontWeight:600 }}>✓ Uploaded</span>}
                  {f.status==='error' && <span style={{ fontSize:11, color:'#C81E1E', fontWeight:600 }}>✕ Upload failed</span>}
                </div>
                <button onClick={()=>remove(f.id)} style={{ background:'none', border:'none', cursor:'pointer', color:'#A1A1A1', padding:4, flexShrink:0 }}>
                  <I3 n="x" size={15} color="#A1A1A1"/>
                </button>
              </div>
            ))}
          </div>
        )}
      </DC3>

      <DC3 title="File States — Preview">
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {mockFiles.map(f => {
            const stCfg = { done:{bg:'#F0FDF4',c:'#16A34A',label:'✓ Uploaded'}, uploading:{bg:'#EFF6FF',c:BLUE3,label:`${f.progress}%`}, error:{bg:'#FDE8E8',c:'#C81E1E',label:'✕ Failed'} };
            const st = stCfg[f.status];
            return (
              <div key={f.id} style={{ border:'1px solid #E5E5E5', borderRadius:8, padding:'10px 14px', display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ fontSize:22 }}>{getIcon(f.type)}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:f.status==='uploading'?5:0 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:'#0A0A0A' }}>{f.name}</span>
                    <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0, marginLeft:8 }}>
                      <span style={{ fontSize:11, color:'#A1A1A1' }}>{fmtSize(f.size)}</span>
                      <span style={{ background:st.bg, color:st.c, borderRadius:999, padding:'2px 8px', fontSize:11, fontWeight:600 }}>{st.label}</span>
                    </div>
                  </div>
                  {f.status==='uploading' && <div style={{ height:4, background:'#F5F5F5', borderRadius:999 }}><div style={{ height:'100%', width:`${f.progress}%`, background:BLUE3, borderRadius:999 }}/></div>}
                </div>
                <button style={{ background:'none', border:'none', cursor:'pointer', color:'#D4D4D4', padding:4 }}><I3 n="trash" size={14} color="#D4D4D4"/></button>
              </div>
            );
          })}
        </div>
      </DC3>

      <DC3 title="Dark Mode — Drag & Drop" dark>
        <div style={{ border:'2px dashed #333', borderRadius:12, padding:'32px 24px', textAlign:'center', cursor:'pointer', background:'#111' }}>
          <div style={{ width:44, height:44, borderRadius:10, background:'#222', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
            <I3 n="upload" size={20} color="#525252"/>
          </div>
          <div style={{ fontSize:14, fontWeight:600, color:'#E5E5E5', marginBottom:4 }}>Drag & drop files here</div>
          <div style={{ fontSize:12, color:'#525252' }}>PDF, JPG, PNG, DOCX — max 10MB</div>
          <button style={{ marginTop:16, height:36, padding:'0 18px', background:'#262626', border:'1px solid #404040', borderRadius:8, fontSize:13, fontWeight:500, color:'#E5E5E5', cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Browse Files</button>
        </div>
      </DC3>

      <DC3 title="Usage"><CB3 code={`<FileUpload\n  accept=".pdf,.jpg,.png,.docx"\n  maxSize={10485760}\n  multiple\n  onUpload={handleUpload}\n/>`}/></DC3>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// STEPPERS
// ════════════════════════════════════════════════════════════════
function SteppersPage() {
  const [step1, setStep1] = useState(1);
  const [step2, setStep2] = useState(2);

  const Stepper3 = ({ steps, current, dark=false, vertical=false }) => {
    const tc  = dark ? '#E5E5E5' : '#0A0A0A';
    const stc = dark ? '#525252' : '#A1A1A1';
    const lc  = (i) => i < current ? BRAND3 : '#E5E5E5';

    if (vertical) return (
      <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display:'flex', gap:16, position:'relative' }}>
            {i < steps.length-1 && <div style={{ position:'absolute', left:17, top:40, width:2, height:'calc(100% - 8px)', background:lc(i+1) }}/>}
            <div style={{ width:36, height:36, borderRadius:'50%', background:i<current?BRAND3:i===current?BLUE3:'transparent', border:`2px solid ${i<=current?'transparent':'#E5E5E5'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, zIndex:1 }}>
              {i < current ? <I3 n="check" size={16} color="#FFF"/> : <span style={{ fontSize:13, fontWeight:700, color:i===current?'#FFF':dark?'#525252':'#A1A1A1' }}>{i+1}</span>}
            </div>
            <div style={{ paddingBottom:24 }}>
              <div style={{ fontSize:13, fontWeight:600, color:i<=current?tc:stc, marginBottom:2, lineHeight:'36px' }}>{s.label}</div>
              {s.sub && i===current && <div style={{ fontSize:12, color:stc, marginTop:-8 }}>{s.sub}</div>}
            </div>
          </div>
        ))}
      </div>
    );

    return (
      <div style={{ display:'flex', alignItems:'flex-start' }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, flex:1 }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background:i<current?BRAND3:i===current?BLUE3:(dark?'#262626':'#F5F5F5'), border:`2px solid ${i<current?BRAND3:i===current?BLUE3:(dark?'#333':'#E5E5E5')}`, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>
                {i < current ? <I3 n="check" size={16} color="#FFF"/> : <span style={{ fontSize:13, fontWeight:700, color:i===current?'#FFF':(dark?'#525252':'#A1A1A1') }}>{i+1}</span>}
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:12, fontWeight:600, color:i<=current?tc:stc, whiteSpace:'nowrap' }}>{s.label}</div>
                {s.sub && <div style={{ fontSize:10, color:stc, marginTop:1 }}>{s.sub}</div>}
              </div>
            </div>
            {i < steps.length-1 && <div style={{ flex:1, height:2, background:i<current?BRAND3:'#E5E5E5', margin:'17px 0 0', transition:'background 0.3s' }}/>}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const govSteps = [
    { label:'Personal Info',   sub:'Name, Civil ID' },
    { label:'Documents',       sub:'Upload files' },
    { label:'Review',          sub:'Check details' },
    { label:'Submit',          sub:'Send application' },
  ];

  const passportSteps = [
    { label:'Eligibility' },
    { label:'Application Form' },
    { label:'Document Upload' },
    { label:'Appointment' },
    { label:'Confirmation' },
  ];

  return (
    <div>
      <SH3 title="Steppers" subtitle="Multi-step process indicators for forms, wizards, and application flows." category="Component"/>

      <DC3 title="Horizontal Stepper — Interactive">
        <Stepper3 steps={govSteps} current={step1}/>
        <div style={{ display:'flex', gap:8, marginTop:24 }}>
          <button onClick={()=>setStep1(s=>Math.max(0,s-1))} style={{ height:36, padding:'0 16px', background:'#FFF', border:'1.5px solid #E5E5E5', borderRadius:8, fontSize:13, fontWeight:500, color:'#525252', cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>← Back</button>
          <button onClick={()=>setStep1(s=>Math.min(govSteps.length,s+1))} style={{ height:36, padding:'0 16px', background:BLUE3, border:'none', borderRadius:8, fontSize:13, fontWeight:600, color:'#FFF', cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>{step1 >= govSteps.length ? '✓ Done' : 'Next →'}</button>
        </div>
      </DC3>

      <DC3 title="5-Step Application Flow">
        <Stepper3 steps={passportSteps} current={step2}/>
        <div style={{ display:'flex', gap:8, marginTop:24 }}>
          <button onClick={()=>setStep2(s=>Math.max(0,s-1))} style={{ height:36, padding:'0 16px', background:'#FFF', border:'1.5px solid #E5E5E5', borderRadius:8, fontSize:13, fontWeight:500, color:'#525252', cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>← Previous</button>
          <button onClick={()=>setStep2(s=>Math.min(passportSteps.length,s+1))} style={{ height:36, padding:'0 16px', background:BRAND3, border:'none', borderRadius:8, fontSize:13, fontWeight:600, color:'#FFF', cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Continue →</button>
        </div>
      </DC3>

      <DC3 title="Vertical Stepper">
        <Stepper3 steps={govSteps} current={2} vertical/>
      </DC3>

      <DC3 title="Dark Mode" dark>
        <div style={{ padding:4 }}><Stepper3 steps={passportSteps} current={3} dark/></div>
      </DC3>

      <DC3 title="Usage"><CB3 code={`<Stepper\n  steps={applicationSteps}\n  currentStep={activeStep}\n  orientation="horizontal"\n  onStepChange={setActiveStep}\n/>`}/></DC3>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// NAVBAR
// ════════════════════════════════════════════════════════════════
function NavbarPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const KWFlag = ({ h=20 }) => {
    const w = h * 1.7;
    return (
      <svg width={w} height={h} viewBox="0 0 170 100" style={{ borderRadius:3, flexShrink:0, display:'block' }}>
        <rect x="0" y="0" width="170" height="33" fill="#007A3D"/>
        <rect x="0" y="33" width="170" height="34" fill="#FFFFFF"/>
        <rect x="0" y="67" width="170" height="33" fill="#CE1126"/>
        <polygon points="0,0 60,50 0,100" fill="#000000"/>
      </svg>
    );
  };

  const NavLinks = ({ dark=false, mobile=false }) => {
    const links = ['Services','Ministries','Citizens','Developers','About'];
    const tc = dark ? '#A1A1A1' : '#525252';
    const ac = dark ? '#FFF' : '#0A0A0A';
    return (
      <div style={{ display:'flex', flexDirection:mobile?'column':'row', gap:mobile?2:2 }}>
        {links.map((l,i) => (
          <button key={l} style={{ height:mobile?44:36, padding:'0 12px', background:i===0?(dark?'#262626':'#F5F5F5'):'none', border:'none', borderRadius:7, fontSize:13, fontWeight:i===0?600:400, color:i===0?ac:tc, cursor:'pointer', fontFamily:'Inter Tight,sans-serif', textAlign:'left', transition:'all 0.1s' }}
            onMouseEnter={e=>{e.currentTarget.style.background=dark?'#262626':'#F5F5F5'; e.currentTarget.style.color=ac;}}
            onMouseLeave={e=>{e.currentTarget.style.background=i===0?(dark?'#262626':'#F5F5F5'):'none'; e.currentTarget.style.color=i===0?ac:tc;}}>
            {l}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <SH3 title="Navbar" subtitle="Top navigation bars for government digital services. Light, dark, and compact variants with search." category="Component"/>

      {/* Light Navbar */}
      <DC3 title="Default — Light">
        <div style={{ background:'#FFF', border:'1px solid #E5E5E5', borderRadius:10, overflow:'hidden' }}>
          <div style={{ height:60, padding:'0 20px', display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginRight:8 }}>
              <KWFlag h={20}/>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:'#0A0A0A', lineHeight:1.2 }}>Kuwait</div>
                <div style={{ fontSize:9, fontWeight:600, color:BRAND3, lineHeight:1.2 }}>Digital Gov</div>
              </div>
            </div>
            <div style={{ width:1, height:24, background:'#E5E5E5', flexShrink:0 }}/>
            <NavLinks/>
            <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
              <div style={{ height:34, display:'flex', alignItems:'center', gap:6, background:'#F5F5F5', borderRadius:8, padding:'0 12px', border:'1px solid #E5E5E5' }}>
                <I3 n="search" size={13} color="#A1A1A1"/>
                <span style={{ fontSize:12, color:'#A1A1A1', fontFamily:'Inter Tight,sans-serif' }}>Search services…</span>
              </div>
              <button style={{ height:34, padding:'0 14px', background:'#FFF', border:'1.5px solid #E5E5E5', borderRadius:8, fontSize:12, fontWeight:600, color:'#525252', cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>عربي</button>
              <button style={{ height:34, padding:'0 14px', background:BRAND3, border:'none', borderRadius:8, fontSize:12, fontWeight:600, color:'#FFF', cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Sign In</button>
            </div>
          </div>
        </div>
      </DC3>

      {/* Dark Navbar */}
      <DC3 title="Dark Variant">
        <div style={{ background:'#0A0A0A', borderRadius:10, overflow:'hidden' }}>
          <div style={{ height:60, padding:'0 20px', display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginRight:8 }}>
              <KWFlag h={20}/>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:'#FFF', lineHeight:1.2 }}>Kuwait</div>
                <div style={{ fontSize:9, fontWeight:600, color:'#4ADE80', lineHeight:1.2 }}>Digital Gov</div>
              </div>
            </div>
            <div style={{ width:1, height:24, background:'#262626', flexShrink:0 }}/>
            <NavLinks dark/>
            <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
              <button style={{ width:34, height:34, background:'#1A1A1A', border:'1px solid #262626', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <I3 n="search" size={15} color="#737373"/>
              </button>
              <button style={{ width:34, height:34, background:'#1A1A1A', border:'1px solid #262626', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative' }}>
                <I3 n="bell" size={15} color="#737373"/>
                <div style={{ position:'absolute', top:7, right:7, width:7, height:7, borderRadius:'50%', background:'#E02424', border:'1.5px solid #0A0A0A' }}/>
              </button>
              <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#006C35,#1C64F2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#FFF', cursor:'pointer' }}>A</div>
            </div>
          </div>
        </div>
      </DC3>

      {/* Compact Navbar */}
      <DC3 title="Compact with Active Indicators">
        <div style={{ background:'#FFF', border:'1px solid #E5E5E5', borderRadius:10, overflow:'hidden' }}>
          <div style={{ height:52, padding:'0 20px', display:'flex', alignItems:'center', gap:4 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginRight:12 }}>
              <KWFlag h={17}/>
              <span style={{ fontSize:12, fontWeight:700, color:'#0A0A0A' }}>Kuwait.Gov</span>
            </div>
            {['Home','Services','Track Application','Contact'].map((l,i) => (
              <button key={l} style={{ height:32, padding:'0 12px', background:'none', border:'none', borderBottom:i===1?`2px solid ${BLUE3}`:'2px solid transparent', borderRadius:0, fontSize:12, fontWeight:i===1?600:400, color:i===1?BLUE3:'#737373', cursor:'pointer', fontFamily:'Inter Tight,sans-serif', display:'flex', alignItems:'center', gap:5 }}>
                {i===0 && <I3 n="home" size={12} color="#737373"/>}{l}
              </button>
            ))}
            <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
              <button style={{ height:30, padding:'0 12px', background:'#F5F5F5', border:'none', borderRadius:7, fontSize:11, fontWeight:600, color:'#525252', cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>عربي</button>
              <button style={{ height:30, padding:'0 12px', background:BLUE3, border:'none', borderRadius:7, fontSize:11, fontWeight:600, color:'#FFF', cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Portal →</button>
            </div>
          </div>
        </div>
      </DC3>

      <DC3 title="Usage"><CB3 code={`<Navbar\n  logo={<KuwaitLogo />}\n  links={navLinks}\n  actions={[<SearchBar />, <LangToggle />, <SignInButton />]}\n  variant="light"\n/>`}/></DC3>
    </div>
  );
}

// Export all to window
Object.assign(window, {
  BreadcrumbsPage,
  SpinnersPage,
  TooltipsPage,
  DatepickerPage,
  FileUploadPage,
  SteppersPage,
  NavbarPage,
});
