// Kuwait Design System — Additional Component Pages
// Exports all new page components to window

const { useState, useEffect, useRef } = React;

// ── Shared mini-primitives (local copies) ────────────────────────
const BRAND2 = '#006C35';
const BLUE2  = '#1C64F2';

const I2 = ({ n, size = 16, color = 'currentColor' }) => {
  const paths = {
    x:       <><line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    check:   <polyline points="20,6 9,17 4,12" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    info:    <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/><line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill={color}/></>,
    warn:    <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth="2" fill="none"/><line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill={color}/></>,
    success: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/><polyline points="22,4 12,14.01 9,11.01" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    bell:    <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/></>,
    plus:    <><line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    minus:   <line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>,
    chevD:   <polyline points="6,9 12,15 18,9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    chevR:   <polyline points="9,18 15,12 9,6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    chevL:   <polyline points="15,18 9,12 15,6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    search:  <><circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    user:    <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" fill="none"/></>,
    star:    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    heart:   <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    trash:   <><polyline points="3,6 5,6 21,6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    edit:    <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    img:     <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill={color}/><polyline points="21,15 16,10 5,21" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    calendar:<><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none"/><line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    mail:    <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    mappin:  <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth="2" fill="none"/><circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" fill="none"/></>,
    clock:   <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/><polyline points="12,6 12,12 16,14" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    link:    <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    download:<><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="7,10 12,15 17,10" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="15" x2="12" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{ display:'block', flexShrink:0 }}>{paths[n]||null}</svg>;
};

const SH = ({ title, subtitle, category }) => (
  <div style={{ marginBottom: 36, paddingBottom: 24, borderBottom: '1px solid #E5E5E5' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      {category && <span style={{ display:'inline-flex', alignItems:'center', background: category==='Component'?'#EFF6FF':'#F0FDF4', color: category==='Component'?BLUE2:BRAND2, border:`1px solid ${category==='Component'?'#BFDBFE':'#BBF7D0'}`, borderRadius:999, padding:'2px 10px', fontSize:11, fontWeight:600 }}>{category}</span>}
    </div>
    <h1 style={{ fontSize:28, fontWeight:700, color:'#0A0A0A', lineHeight:1.2, marginBottom:8 }}>{title}</h1>
    {subtitle && <p style={{ fontSize:15, color:'#737373', lineHeight:1.65, maxWidth:600 }}>{subtitle}</p>}
  </div>
);

const DCard = ({ title, desc, dark=false, children }) => (
  <div style={{ background:dark?'#0A0A0A':'#FFF', border:`1px solid ${dark?'#262626':'#E5E5E5'}`, borderRadius:10, overflow:'hidden', marginBottom:20 }}>
    {title && <div style={{ padding:'11px 20px', borderBottom:`1px solid ${dark?'#262626':'#E5E5E5'}`, background:dark?'#141414':'#FAFAFA' }}>
      <span style={{ fontSize:12, fontWeight:600, color:dark?'#A1A1A1':'#525252', letterSpacing:'0.03em', textTransform:'uppercase' }}>{title}</span>
      {desc && <span style={{ fontSize:12, color:'#A1A1A1', marginLeft:8 }}>{desc}</span>}
    </div>}
    <div style={{ padding:24 }}>{children}</div>
  </div>
);

const CB = ({ code }) => {
  const [cp,setCp]=useState(false);
  return (
    <div style={{ position:'relative', background:'#0A0A0A', borderRadius:8, overflow:'hidden' }}>
      <pre style={{ margin:0, padding:'16px 48px 16px 20px', fontSize:13, color:'#E5E5E5', lineHeight:1.65, overflowX:'auto', whiteSpace:'pre-wrap', wordBreak:'break-all' }}>{code}</pre>
      <button onClick={()=>{navigator.clipboard?.writeText(code);setCp(true);setTimeout(()=>setCp(false),1500);}} style={{ position:'absolute',top:10,right:10,background:cp?'#006C35':'#262626',border:'none',borderRadius:6,padding:'4px 10px',color:'#E5E5E5',fontSize:11,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:4 }}>
        {cp?'✓ Copied':'Copy'}
      </button>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// CARDS PAGE
// ════════════════════════════════════════════════════════════════
function CardsPage() {
  const govCards = [
    { title:'Civil ID Renewal', meta:'Ministry of Interior', status:'Active', color:'#006C35', sbg:'#F0FDF4', sc:'#16A34A', icon:'user', desc:'Renew your Civil ID online. Processing takes 3-5 business days.' },
    { title:'Traffic Fine Payment', meta:'General Traffic Dept.', status:'Due', color:'#E02424', sbg:'#FDE8E8', sc:'#C81E1E', icon:'mappin', desc:'Pay outstanding traffic violations securely through the portal.' },
    { title:'Municipality Permit', meta:'Kuwait Municipality', status:'Pending', color:'#E3A008', sbg:'#FEFCE8', sc:'#A16207', icon:'link', desc:'Apply for construction and business operation permits.' },
  ];
  return (
    <div>
      <SH title="Cards" subtitle="Versatile content containers — horizontal, vertical, with imagery and status indicators." category="Component"/>

      <DCard title="Government Service Cards">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
          {govCards.map(({ title, meta, status, color, sbg, sc, icon, desc }) => (
            <div key={title} style={{ background:'#FFF', border:'1px solid #E5E5E5', borderRadius:10, overflow:'hidden', display:'flex', flexDirection:'column', transition:'box-shadow 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
              <div style={{ height:5, background:color }}/>
              <div style={{ padding:'16px 16px 12px' }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:10 }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <I2 n={icon} size={17} color={color}/>
                  </div>
                  <span style={{ background:sbg, color:sc, border:`1px solid ${sc}33`, borderRadius:999, padding:'2px 9px', fontSize:11, fontWeight:600 }}>{status}</span>
                </div>
                <div style={{ fontSize:14, fontWeight:700, color:'#0A0A0A', marginBottom:4 }}>{title}</div>
                <div style={{ fontSize:11, color:'#A1A1A1', marginBottom:10 }}>{meta}</div>
                <p style={{ fontSize:12, color:'#737373', lineHeight:1.55, marginBottom:14 }}>{desc}</p>
                <button style={{ width:'100%', height:32, background:color, color:'#FFF', border:'none', borderRadius:7, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Apply Now →</button>
              </div>
            </div>
          ))}
        </div>
      </DCard>

      <DCard title="Horizontal Cards">
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {[
            { title:'Passport Services', meta:'Ministry of Interior · 5 min read', desc:'All passport-related services including new applications, renewals, and emergency travel documents.', color:BLUE2 },
            { title:'Social Security', meta:'Ministry of Social Affairs · 3 min read', desc:'Pension, disability benefits, and social welfare support for Kuwaiti citizens and residents.', color:BRAND2 },
          ].map(({ title, meta, desc, color }) => (
            <div key={title} style={{ display:'flex', gap:0, background:'#FFF', border:'1px solid #E5E5E5', borderRadius:10, overflow:'hidden' }}>
              <div style={{ width:5, background:color, flexShrink:0 }}/>
              <div style={{ padding:'16px 18px', flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:'#0A0A0A', marginBottom:3 }}>{title}</div>
                <div style={{ fontSize:11, color:'#A1A1A1', marginBottom:8 }}>{meta}</div>
                <p style={{ fontSize:13, color:'#737373', lineHeight:1.55, margin:0 }}>{desc}</p>
              </div>
              <div style={{ display:'flex', alignItems:'center', padding:'0 16px', flexShrink:0 }}>
                <I2 n="chevR" size={16} color="#D4D4D4"/>
              </div>
            </div>
          ))}
        </div>
      </DCard>

      <DCard title="Dark Mode Cards" dark>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
          {[
            { t:'Civil ID', v:'2,341', label:'Applications today', c:'#4ADE80' },
            { t:'Passports', v:'847', label:'Renewed this week', c:'#76A9FA' },
            { t:'Permits', v:'156', label:'Approved this month', c:'#FACC15' },
          ].map(({ t, v, label, c }) => (
            <div key={t} style={{ background:'#141414', border:'1px solid #262626', borderRadius:10, padding:'20px 18px' }}>
              <div style={{ fontSize:11, fontWeight:600, color:'#525252', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>{t}</div>
              <div style={{ fontSize:32, fontWeight:800, color:c, letterSpacing:'-0.03em', marginBottom:4 }}>{v}</div>
              <div style={{ fontSize:12, color:'#525252' }}>{label}</div>
            </div>
          ))}
        </div>
      </DCard>

      <DCard title="Usage"><CB code={`<ServiceCard\n  title="Civil ID Renewal"\n  ministry="Ministry of Interior"\n  status="active"\n  onApply={handleApply}\n/>`}/></DCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// AVATARS PAGE
// ════════════════════════════════════════════════════════════════
function AvatarsPage() {
  const colors = ['#1C64F2','#006C35','#E02424','#9333EA','#E3A008','#0891B2'];
  const Avatar = ({ name, size=40, color, img, online=false }) => {
    const initials = name?.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase() || '?';
    const bg = color || colors[name?.charCodeAt(0)%colors.length || 0];
    return (
      <div style={{ position:'relative', flexShrink:0 }}>
        <div style={{ width:size, height:size, borderRadius:'50%', background:img?'transparent':bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:size*0.36, fontWeight:700, color:'#FFF', fontFamily:'Inter Tight,sans-serif', overflow:'hidden', border:'2px solid #FFF', boxShadow:'0 0 0 1px #E5E5E5' }}>
          {img ? <img src={img} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt={name}/> : initials}
        </div>
        {online && <div style={{ position:'absolute', bottom:1, right:1, width:size*0.28, height:size*0.28, borderRadius:'50%', background:'#22C55E', border:'2px solid #FFF' }}/>}
      </div>
    );
  };
  const people = ['Ahmed Al-Sabah','Fatima Hassan','Mohammed Jaber','Nour Al-Rashid','Sara Al-Ahmad','Khalid Mansour'];
  return (
    <div>
      <SH title="Avatars" subtitle="User representation with initials fallback, size variants, online indicators, and stacked groups." category="Component"/>

      <DCard title="Circle Avatars — Sizes">
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          {[24,32,40,48,56,72].map(s => <Avatar key={s} name="Ahmed Al-Sabah" size={s}/>)}
        </div>
      </DCard>

      <DCard title="With Online Indicator">
        <div style={{ display:'flex', gap:14 }}>
          {people.slice(0,4).map((n,i) => (
            <div key={n} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <Avatar name={n} size={48} online={i%2===0}/>
              <span style={{ fontSize:11, color:'#737373', maxWidth:60, textAlign:'center', lineHeight:1.3 }}>{n.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </DCard>

      <DCard title="Stacked Avatars">
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {[3,5,6].map(count => (
            <div key={count} style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ display:'flex' }}>
                {people.slice(0,count).map((n,i) => (
                  <div key={n} style={{ marginLeft: i===0?0:-12, zIndex:count-i }}>
                    <Avatar name={n} size={36}/>
                  </div>
                ))}
                {count >= 5 && <div style={{ marginLeft:-12, width:36, height:36, borderRadius:'50%', background:'#F5F5F5', border:'2px solid #FFF', boxShadow:'0 0 0 1px #E5E5E5', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#525252' }}>+3</div>}
              </div>
              <span style={{ fontSize:13, color:'#737373' }}>{count} members</span>
            </div>
          ))}
        </div>
      </DCard>

      <DCard title="Avatar with Text">
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {people.slice(0,4).map(n => (
            <div key={n} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background:'#FAFAFA', border:'1px solid #F0F0F0', borderRadius:9 }}>
              <Avatar name={n} size={40} online/>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:'#0A0A0A' }}>{n}</div>
                <div style={{ fontSize:12, color:'#A1A1A1' }}>Ministry of Interior</div>
              </div>
              <div style={{ marginLeft:'auto' }}><I2 n="chevR" size={14} color="#D4D4D4"/></div>
            </div>
          ))}
        </div>
      </DCard>

      <DCard title="Usage"><CB code={`<Avatar name="Ahmed Al-Sabah" size={40} online />\n<StackedAvatars users={teamMembers} max={5} />`}/></DCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// TOASTS PAGE
// ════════════════════════════════════════════════════════════════
function ToastsPage() {
  const [toasts, setToasts] = useState([]);
  const addToast = (type) => {
    const id = Date.now();
    const cfg = {
      success: { bg:'#FFF', brd:'#BBF7D0', icon:'success', ic:'#16A34A', ibg:'#F0FDF4', title:'Success', msg:'Your application was submitted successfully.' },
      error:   { bg:'#FFF', brd:'#F8B4B4', icon:'x',       ic:'#C81E1E', ibg:'#FDE8E8', title:'Error', msg:'Something went wrong. Please try again.' },
      warning: { bg:'#FFF', brd:'#FEF08A', icon:'warn',     ic:'#A16207', ibg:'#FEFCE8', title:'Warning', msg:'Your session will expire in 5 minutes.' },
      info:    { bg:'#FFF', brd:'#BFDBFE', icon:'info',     ic:'#1C64F2', ibg:'#EFF6FF', title:'Information', msg:'New policy update available for review.' },
    };
    setToasts(t => [...t, { id, type, ...cfg[type] }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  };
  const toastTypes = [
    { bg:'#FFF',    brd:'#BBF7D0', icon:'success', ic:'#16A34A', ibg:'#F0FDF4', title:'Application Submitted', msg:'Your Civil ID renewal has been submitted. Expected 3-5 business days.' },
    { bg:'#FFF',    brd:'#F8B4B4', icon:'x',       ic:'#C81E1E', ibg:'#FDE8E8', title:'Payment Failed', msg:'Your payment could not be processed. Please check your card details.' },
    { bg:'#FFF',    brd:'#FEF08A', icon:'warn',     ic:'#A16207', ibg:'#FEFCE8', title:'Document Expiring', msg:'Your passport expires in 30 days. Renew soon to avoid travel disruptions.' },
    { bg:'#FFF',    brd:'#BFDBFE', icon:'info',     ic:'#1C64F2', ibg:'#EFF6FF', title:'System Maintenance', msg:'Scheduled maintenance on Sunday 2–4 AM. Services may be unavailable.' },
    { bg:'#262626', brd:'#404040', icon:'bell',     ic:'#76A9FA', ibg:'#1E3A8A', title:'New Notification', msg:'Ahmed Al-Sabah sent you a message.', dark:true },
  ];
  return (
    <div>
      <SH title="Toasts" subtitle="Non-blocking notification overlays for success, error, warning, informational, and message states." category="Component"/>

      <DCard title="Toast Variants">
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {toastTypes.map(({ bg, brd, icon, ic, ibg, title, msg, dark }, i) => (
            <div key={i} style={{ background:bg, border:`1px solid ${brd}`, borderRadius:12, padding:'14px 16px', display:'flex', gap:12, alignItems:'flex-start', boxShadow:'0 2px 4px -2px rgba(0,0,0,0.05), 0 4px 6px -1px rgba(0,0,0,0.1)', position:'relative' }}>
              <div style={{ width:32, height:32, borderRadius:8, background:ibg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <I2 n={icon==='x'?'x':icon} size={16} color={ic}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:dark?'#FFF':'#0A0A0A', marginBottom:3 }}>{title}</div>
                <div style={{ fontSize:13, color:dark?'#A1A1A1':'#737373', lineHeight:1.5 }}>{msg}</div>
              </div>
              <button style={{ background:'none', border:'none', cursor:'pointer', color:dark?'#525252':'#A1A1A1', padding:2, marginTop:2 }}><I2 n="x" size={14} color={dark?'#525252':'#A1A1A1'}/></button>
            </div>
          ))}
        </div>
      </DCard>

      <DCard title="Live Toast Demo">
        <p style={{ fontSize:13, color:'#737373', marginBottom:16 }}>Click to trigger live toast notifications:</p>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:20 }}>
          {['success','error','warning','info'].map(t => {
            const cols = { success:'#006C35', error:'#C81E1E', warning:'#A16207', info:'#1C64F2' };
            return (
              <button key={t} onClick={()=>addToast(t)} style={{ height:36, padding:'0 16px', background:'#FFF', color:cols[t], border:`1.5px solid ${cols[t]}33`, borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter Tight,sans-serif', textTransform:'capitalize' }}>
                {t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            );
          })}
        </div>
        {/* Live toast area */}
        <div style={{ position:'fixed', bottom:24, right:24, display:'flex', flexDirection:'column', gap:8, zIndex:999 }}>
          {toasts.map(({ id, brd, icon, ic, ibg, title, msg }) => (
            <div key={id} style={{ background:'#FFF', border:`1px solid ${brd}`, borderRadius:12, padding:'14px 16px', display:'flex', gap:12, alignItems:'flex-start', boxShadow:'0 8px 24px rgba(0,0,0,0.12)', minWidth:300, maxWidth:360, animation:'slideIn 0.2s ease' }}>
              <div style={{ width:30,height:30,borderRadius:7,background:ibg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}><I2 n={icon==='x'?'x':icon} size={15} color={ic}/></div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:'#0A0A0A', marginBottom:2 }}>{title}</div>
                <div style={{ fontSize:12, color:'#737373' }}>{msg}</div>
              </div>
              <button onClick={()=>setToasts(t=>t.filter(x=>x.id!==id))} style={{ background:'none',border:'none',cursor:'pointer',color:'#A1A1A1',padding:2 }}><I2 n="x" size={13} color="#A1A1A1"/></button>
            </div>
          ))}
        </div>
      </DCard>

      <DCard title="Usage"><CB code={`toast.success("Application submitted successfully");\ntoast.error("Payment failed. Please retry.");\ntoast.warning("Session expiring soon.");\ntoast.info("New policy update available.");`}/></DCard>
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// TABLES PAGE
// ════════════════════════════════════════════════════════════════
function TablesPage() {
  const [sort, setSort] = useState({ col:'name', dir:'asc' });
  const [sel, setSel] = useState([]);
  const rows = [
    { id:1, name:'Ahmed Al-Sabah',   ministry:'Ministry of Interior',     status:'Active',   type:'Civil ID',   date:'12 Apr 2025' },
    { id:2, name:'Fatima Hassan',    ministry:'Kuwait Municipality',      status:'Pending',  type:'Permit',     date:'10 Apr 2025' },
    { id:3, name:'Mohammed Jaber',   ministry:'Ministry of Finance',      status:'Approved', type:'Tax Filing', date:'08 Apr 2025' },
    { id:4, name:'Nour Al-Rashid',   ministry:'Ministry of Education',    status:'Active',   type:'Scholarship',date:'05 Apr 2025' },
    { id:5, name:'Sara Al-Ahmad',    ministry:'General Traffic Dept.',    status:'Overdue',  type:'Fine Payment',date:'01 Apr 2025'},
    { id:6, name:'Khalid Mansour',   ministry:'Ministry of Health',       status:'Approved', type:'Medical Cert',date:'28 Mar 2025'},
  ];
  const statusCfg = { Active:{bg:'#F0FDF4',c:'#16A34A',brd:'#BBF7D0'}, Pending:{bg:'#FEFCE8',c:'#A16207',brd:'#FEF08A'}, Approved:{bg:'#EFF6FF',c:'#1C64F2',brd:'#BFDBFE'}, Overdue:{bg:'#FDE8E8',c:'#C81E1E',brd:'#F8B4B4'} };
  const sorted = [...rows].sort((a,b)=> sort.dir==='asc' ? a[sort.col]?.localeCompare?.(b[sort.col]) : b[sort.col]?.localeCompare?.(a[sort.col]));
  const cols = [{k:'name',l:'Name'},{k:'ministry',l:'Ministry'},{k:'type',l:'Service'},{k:'status',l:'Status'},{k:'date',l:'Date'}];
  const toggle = id => setSel(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id]);
  const allSel = sel.length === rows.length;
  return (
    <div>
      <SH title="Tables" subtitle="Sortable data tables with checkboxes, status badges, and pagination. Light and dark modes." category="Component"/>
      <DCard title="Data Table — Light">
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:'Inter Tight,sans-serif' }}>
            <thead>
              <tr style={{ background:'#FAFAFA', borderBottom:'2px solid #E5E5E5' }}>
                <th style={{ width:40, padding:'10px 14px' }}>
                  <input type="checkbox" checked={allSel} onChange={() => setSel(allSel ? [] : rows.map(r=>r.id))} style={{ width:15, height:15, cursor:'pointer', accentColor:BLUE2 }}/>
                </th>
                {cols.map(({ k, l }) => (
                  <th key={k} onClick={() => setSort(s => ({ col:k, dir:s.col===k && s.dir==='asc'?'desc':'asc' }))}
                    style={{ padding:'10px 14px', textAlign:'left', fontSize:12, fontWeight:700, color:'#525252', letterSpacing:'0.03em', textTransform:'uppercase', cursor:'pointer', whiteSpace:'nowrap', userSelect:'none' }}>
                    {l} {sort.col===k ? (sort.dir==='asc'?'↑':'↓') : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((r,i) => {
                const s = statusCfg[r.status];
                const on = sel.includes(r.id);
                return (
                  <tr key={r.id} style={{ background:on?'#F0F7FF':i%2===0?'#FFF':'#FAFAFA', borderBottom:'1px solid #F5F5F5', transition:'background 0.1s' }}
                    onMouseEnter={e=>{ if(!on) e.currentTarget.style.background='#F5F5F5'; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background=on?'#F0F7FF':i%2===0?'#FFF':'#FAFAFA'; }}>
                    <td style={{ padding:'10px 14px' }}><input type="checkbox" checked={on} onChange={()=>toggle(r.id)} style={{ width:15, height:15, cursor:'pointer', accentColor:BLUE2 }}/></td>
                    <td style={{ padding:'10px 14px', fontSize:13, fontWeight:600, color:'#0A0A0A', whiteSpace:'nowrap' }}>{r.name}</td>
                    <td style={{ padding:'10px 14px', fontSize:13, color:'#737373' }}>{r.ministry}</td>
                    <td style={{ padding:'10px 14px', fontSize:13, color:'#525252' }}>{r.type}</td>
                    <td style={{ padding:'10px 14px' }}><span style={{ background:s.bg, color:s.c, border:`1px solid ${s.brd}`, borderRadius:999, padding:'2px 9px', fontSize:11, fontWeight:600 }}>{r.status}</span></td>
                    <td style={{ padding:'10px 14px', fontSize:12, color:'#A1A1A1', whiteSpace:'nowrap' }}>{r.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:14, paddingTop:14, borderTop:'1px solid #F5F5F5' }}>
          <span style={{ fontSize:12, color:'#A1A1A1' }}>{sel.length > 0 ? `${sel.length} selected` : `${rows.length} total records`}</span>
          <div style={{ display:'flex', gap:6 }}>
            {[1,2,3].map(n => <button key={n} style={{ width:32, height:32, borderRadius:7, fontSize:12, fontWeight:500, background:n===1?BLUE2:'#FFF', color:n===1?'#FFF':'#525252', border:`1px solid ${n===1?BLUE2:'#E5E5E5'}`, cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>{n}</button>)}
          </div>
        </div>
      </DCard>
      <DCard title="Usage"><CB code={`<Table\n  columns={['Name', 'Ministry', 'Status', 'Date']}\n  rows={applications}\n  sortable selectable\n  onSelect={handleSelect}\n/>`}/></DCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// PROGRESS BARS PAGE
// ════════════════════════════════════════════════════════════════
function ProgressPage() {
  const [val, setVal] = useState(65);
  const Bar = ({ value, color='#1C64F2', dark=false, label, showVal=true, h=8 }) => (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      {(label || showVal) && <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        {label && <span style={{ fontSize:12, fontWeight:500, color:dark?'#A1A1A1':'#525252' }}>{label}</span>}
        {showVal && <span style={{ fontSize:11, fontWeight:700, color:dark?'#E5E5E5':'#0A0A0A' }}>{value}%</span>}
      </div>}
      <div style={{ height:h, background:dark?'#262626':'#F5F5F5', borderRadius:999, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${value}%`, background:color, borderRadius:999, transition:'width 0.5s ease' }}/>
      </div>
    </div>
  );
  const services = [
    { label:'Civil ID Applications', value:82, color:'#1C64F2' },
    { label:'Permit Approvals', value:61, color:'#006C35' },
    { label:'Traffic Fines Collected', value:94, color:'#22C55E' },
    { label:'Passport Renewals', value:47, color:'#E3A008' },
    { label:'Medical Certificates', value:33, color:'#9333EA' },
  ];
  return (
    <div>
      <SH title="Progress Bars" subtitle="Linear indicators for loading states, completion tracking, and quota visualization." category="Component"/>

      <DCard title="Color Variants">
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {[{c:'#1C64F2',l:'Blue — Default'},{c:'#006C35',l:'Green — Success'},{c:'#E02424',l:'Red — Critical'},{c:'#E3A008',l:'Yellow — Warning'},{c:'#9333EA',l:'Purple — Special'}].map(({c,l}) => (
            <Bar key={l} value={Math.floor(Math.random()*60)+30} color={c} label={l}/>
          ))}
        </div>
      </DCard>

      <DCard title="Government Service Completion">
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {services.map(({ label, value, color }) => (
            <Bar key={label} value={value} color={color} label={label} h={10}/>
          ))}
        </div>
      </DCard>

      <DCard title="Interactive — Drag to set value">
        <div style={{ marginBottom:16 }}>
          <Bar value={val} color={val > 80 ? '#006C35' : val > 50 ? '#1C64F2' : val > 25 ? '#E3A008' : '#E02424'} label="Service Completion Rate" h={14}/>
        </div>
        <input type="range" min={0} max={100} value={val} onChange={e=>setVal(+e.target.value)}
          style={{ width:'100%', accentColor:BLUE2, cursor:'pointer' }}/>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#A1A1A1', marginTop:4 }}>
          <span>0%</span><span>50%</span><span>100%</span>
        </div>
      </DCard>

      <DCard title="Dark Mode" dark>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {services.slice(0,3).map(({ label, value, color }) => (
            <Bar key={label} value={value} color={color} label={label} dark h={10}/>
          ))}
        </div>
      </DCard>

      <DCard title="Usage"><CB code={`<ProgressBar value={65} color="blue" label="Upload Progress" />\n<ProgressBar value={92} color="green" showValue />\n<ProgressBar value={28} color="red" label="Critical" />`}/></DCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// RADIO / CHECKBOX / TOGGLE PAGE
// ════════════════════════════════════════════════════════════════
function FormControlsPage() {
  const [radio, setRadio] = useState('english');
  const [checks, setChecks] = useState({ notifications:true, sms:false, email:true, newsletter:false });
  const [toggles, setToggles] = useState({ darkMode:false, rtl:false, accessibility:true, autoSave:true, twoFA:false });
  const Toggle2 = ({ on, onChange, label, sub, dark=false }) => (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom:`1px solid ${dark?'#1A1A1A':'#F5F5F5'}` }}>
      <div>
        <div style={{ fontSize:14, fontWeight:500, color:dark?'#FFF':'#0A0A0A' }}>{label}</div>
        {sub && <div style={{ fontSize:12, color:dark?'#525252':'#A1A1A1', marginTop:2 }}>{sub}</div>}
      </div>
      <div onClick={onChange} style={{ width:44, height:24, borderRadius:12, background:on?BLUE2:'#E5E5E5', cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
        <div style={{ position:'absolute', top:2, left:on?22:2, width:20, height:20, borderRadius:'50%', background:'#FFF', boxShadow:'0 1px 3px rgba(0,0,0,0.2)', transition:'left 0.2s' }}/>
      </div>
    </div>
  );
  return (
    <div>
      <SH title="Radio, Checkbox & Toggle" subtitle="Form selection controls in multiple sizes, states, and dark mode variants." category="Component"/>

      <DCard title="Radio Buttons">
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {[{v:'english',l:'English',sub:'Left-to-right'},{v:'arabic',l:'عربي',sub:'Right-to-left (RTL)'},{v:'bilingual',l:'Bilingual',sub:'Both Arabic and English'}].map(({v,l,sub}) => (
            <label key={v} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', padding:'10px 14px', borderRadius:8, border:`1.5px solid ${radio===v?BLUE2:'#E5E5E5'}`, background:radio===v?'#EFF6FF':'#FFF', transition:'all 0.14s' }}>
              <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${radio===v?BLUE2:'#D4D4D4'}`, background:'#FFF', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }} onClick={()=>setRadio(v)}>
                {radio===v && <div style={{ width:8, height:8, borderRadius:'50%', background:BLUE2 }}/>}
              </div>
              <div onClick={()=>setRadio(v)}>
                <div style={{ fontSize:14, fontWeight:500, color:'#0A0A0A' }}>{l}</div>
                <div style={{ fontSize:12, color:'#A1A1A1' }}>{sub}</div>
              </div>
            </label>
          ))}
        </div>
      </DCard>

      <DCard title="Checkboxes">
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {Object.entries(checks).map(([k,v]) => {
            const labels = { notifications:'Push Notifications', sms:'SMS Alerts', email:'Email Updates', newsletter:'Ministry Newsletter' };
            return (
              <label key={k} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', padding:'10px 14px', borderRadius:8, border:`1.5px solid ${v?BLUE2:'#E5E5E5'}`, background:v?'#EFF6FF':'#FFF' }}>
                <div onClick={()=>setChecks(c=>({...c,[k]:!c[k]}))} style={{ width:18, height:18, borderRadius:4, border:`2px solid ${v?BLUE2:'#D4D4D4'}`, background:v?BLUE2:'#FFF', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.14s' }}>
                  {v && <I2 n="check" size={11} color="#FFF"/>}
                </div>
                <span onClick={()=>setChecks(c=>({...c,[k]:!c[k]}))} style={{ fontSize:14, fontWeight:500, color:'#0A0A0A' }}>{labels[k]}</span>
              </label>
            );
          })}
        </div>
      </DCard>

      <DCard title="Toggles — Light">
        <div>
          {Object.entries(toggles).map(([k,v]) => {
            const cfg = { darkMode:{l:'Dark Mode',s:'Switch to dark theme'}, rtl:{l:'RTL Layout',s:'Enable Arabic right-to-left'}, accessibility:{l:'Accessibility Mode',s:'High contrast and larger text'}, autoSave:{l:'Auto-save',s:'Automatically save form progress'}, twoFA:{l:'Two-Factor Auth',s:'Extra security for your account'} };
            const { l, s } = cfg[k];
            return <Toggle2 key={k} on={v} onChange={()=>setToggles(t=>({...t,[k]:!t[k]}))} label={l} sub={s}/>;
          })}
        </div>
      </DCard>

      <DCard title="Toggles — Dark" dark>
        {Object.entries(toggles).slice(0,3).map(([k,v]) => {
          const cfg = { darkMode:{l:'Dark Mode',s:'Switch to dark theme'}, rtl:{l:'RTL Layout',s:'Arabic right-to-left'}, accessibility:{l:'Accessibility Mode',s:'High contrast text'} };
          const { l, s } = cfg[k];
          return <Toggle2 key={k} on={v} onChange={()=>setToggles(t=>({...t,[k]:!t[k]}))} label={l} sub={s} dark/>;
        })}
      </DCard>

      <DCard title="Usage"><CB code={`<RadioGroup value={lang} onChange={setLang}\n  options={[{value:'en',label:'English'},{value:'ar',label:'Arabic'}]}\n/>\n<Checkbox checked={enabled} onChange={setEnabled} label="Enable notifications" />\n<Toggle on={darkMode} onChange={setDarkMode} label="Dark Mode" />`}/></DCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// MODALS PAGE
// ════════════════════════════════════════════════════════════════
function ModalsPage() {
  const [modal, setModal] = useState(null);
  const Modal = ({ title, children, onClose, size='md' }) => {
    const w = size==='sm'?400:size==='lg'?720:560;
    return (
      <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:20 }} onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
        <div style={{ background:'#FFF', borderRadius:12, width:Math.min(w,window.innerWidth-40), maxHeight:'80vh', display:'flex', flexDirection:'column', boxShadow:'0 25px 50px rgba(0,0,0,0.25)', overflow:'hidden' }}>
          <div style={{ padding:'18px 22px', borderBottom:'1px solid #E5E5E5', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:16, fontWeight:700, color:'#0A0A0A' }}>{title}</span>
            <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4, borderRadius:6, color:'#A1A1A1' }}><I2 n="x" size={16} color="#A1A1A1"/></button>
          </div>
          <div style={{ padding:'20px 22px', overflowY:'auto', flex:1 }}>{children}</div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <SH title="Modals" subtitle="Focused overlay dialogs for confirmations, forms, alerts, and detailed content." category="Component"/>

      <DCard title="Modal Variants — Click to Preview">
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          {[
            { id:'confirm', label:'Confirmation', color:BLUE2 },
            { id:'delete',  label:'Delete Dialog', color:'#C81E1E' },
            { id:'form',    label:'Form Modal', color:BRAND2 },
            { id:'info',    label:'Information', color:'#525252' },
          ].map(({ id, label, color }) => (
            <button key={id} onClick={()=>setModal(id)} style={{ height:36, padding:'0 16px', background:'#FFF', color, border:`1.5px solid ${color}44`, borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>
              {label}
            </button>
          ))}
        </div>
      </DCard>

      {modal==='confirm' && (
        <Modal title="Confirm Submission" onClose={()=>setModal(null)}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:14, padding:'8px 0 16px' }}>
            <div style={{ width:56, height:56, borderRadius:'50%', background:'#EFF6FF', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <I2 n="info" size={26} color={BLUE2}/>
            </div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:'#0A0A0A', marginBottom:6 }}>Submit Application?</div>
              <p style={{ fontSize:14, color:'#737373', lineHeight:1.6 }}>You are about to submit your Civil ID renewal application. This cannot be undone. Processing takes 3–5 business days.</p>
            </div>
            <div style={{ display:'flex', gap:10, width:'100%', justifyContent:'center' }}>
              <button onClick={()=>setModal(null)} style={{ height:40, padding:'0 20px', background:'#FFF', color:'#525252', border:'1.5px solid #E5E5E5', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Cancel</button>
              <button onClick={()=>setModal(null)} style={{ height:40, padding:'0 20px', background:BLUE2, color:'#FFF', border:'none', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Confirm</button>
            </div>
          </div>
        </Modal>
      )}
      {modal==='delete' && (
        <Modal title="Delete Record" onClose={()=>setModal(null)} size="sm">
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:14, padding:'8px 0 16px' }}>
            <div style={{ width:56, height:56, borderRadius:'50%', background:'#FDE8E8', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <I2 n="trash" size={24} color="#C81E1E"/>
            </div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:'#0A0A0A', marginBottom:6 }}>Delete Application?</div>
              <p style={{ fontSize:14, color:'#737373', lineHeight:1.6 }}>This will permanently delete the application record. This action cannot be undone.</p>
            </div>
            <div style={{ display:'flex', gap:10, width:'100%', justifyContent:'center' }}>
              <button onClick={()=>setModal(null)} style={{ height:40, padding:'0 20px', background:'#FFF', color:'#525252', border:'1.5px solid #E5E5E5', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Cancel</button>
              <button onClick={()=>setModal(null)} style={{ height:40, padding:'0 20px', background:'#C81E1E', color:'#FFF', border:'none', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Delete</button>
            </div>
          </div>
        </Modal>
      )}
      {modal==='form' && (
        <Modal title="New Service Application" onClose={()=>setModal(null)} size="lg">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            {[{l:'Full Name',p:'Enter your full name'},{l:'Civil ID Number',p:'XXX-XXXXX-XX'},{l:'Email Address',p:'you@email.com'},{l:'Phone Number',p:'+965 XXXX XXXX'}].map(({l,p}) => (
              <div key={l} style={{ display:'flex', flexDirection:'column', gap:5 }}>
                <label style={{ fontSize:13, fontWeight:500, color:'#525252' }}>{l}</label>
                <input placeholder={p} style={{ height:40, padding:'0 12px', border:'1.5px solid #E5E5E5', borderRadius:8, fontSize:14, fontFamily:'Inter Tight,sans-serif', outline:'none' }}/>
              </div>
            ))}
            <div style={{ gridColumn:'span 2', display:'flex', flexDirection:'column', gap:5 }}>
              <label style={{ fontSize:13, fontWeight:500, color:'#525252' }}>Select Ministry</label>
              <select style={{ height:40, padding:'0 12px', border:'1.5px solid #E5E5E5', borderRadius:8, fontSize:14, fontFamily:'Inter Tight,sans-serif', outline:'none', background:'#FFF' }}>
                <option>Ministry of Interior</option>
                <option>Kuwait Municipality</option>
                <option>Ministry of Finance</option>
              </select>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'flex-end', gap:10, marginTop:20, paddingTop:16, borderTop:'1px solid #F5F5F5' }}>
            <button onClick={()=>setModal(null)} style={{ height:40, padding:'0 20px', background:'#FFF', color:'#525252', border:'1.5px solid #E5E5E5', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Cancel</button>
            <button onClick={()=>setModal(null)} style={{ height:40, padding:'0 20px', background:BRAND2, color:'#FFF', border:'none', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter Tight,sans-serif' }}>Submit Application</button>
          </div>
        </Modal>
      )}
      {modal==='info' && (
        <Modal title="Service Information" onClose={()=>setModal(null)}>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:8, padding:'12px 14px', display:'flex', gap:10 }}>
              <I2 n="success" size={18} color={BRAND2}/>
              <div style={{ fontSize:13, color:'#14532D', lineHeight:1.55 }}>Your Civil ID is valid and up to date. No action required at this time.</div>
            </div>
            {[{l:'Holder',v:'Ahmed Al-Sabah'},{l:'Civil ID',v:'299081234567'},{l:'Expiry',v:'15 December 2027'},{l:'Nationality',v:'Kuwaiti'},{l:'Status',v:'Active'}].map(({l,v}) => (
              <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #F5F5F5' }}>
                <span style={{ fontSize:13, color:'#A1A1A1' }}>{l}</span>
                <span style={{ fontSize:13, fontWeight:600, color:'#0A0A0A' }}>{v}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}

      <DCard title="Usage"><CB code={`<Modal title="Confirm" size="sm" onClose={handleClose}>\n  <p>Are you sure you want to proceed?</p>\n  <Button label="Confirm" color="blue" />\n</Modal>`}/></DCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// TIMELINES PAGE
// ════════════════════════════════════════════════════════════════
function TimelinesPage() {
  const events = [
    { date:'12 Apr 2025', time:'10:30 AM', title:'Application Submitted', desc:'Civil ID renewal request successfully submitted online.', status:'done', color:'#006C35' },
    { date:'13 Apr 2025', time:'09:15 AM', title:'Documents Verified', desc:'All submitted documents have been verified by the ministry.', status:'done', color:'#006C35' },
    { date:'14 Apr 2025', time:'02:00 PM', title:'Under Review', desc:'Your application is currently under review by an officer.', status:'active', color:'#1C64F2' },
    { date:'15 Apr 2025', time:'—', title:'Approval Pending', desc:'Awaiting final approval from the Civil ID Department.', status:'pending', color:'#A1A1A1' },
    { date:'16 Apr 2025', time:'—', title:'Ready for Collection', desc:'Your Civil ID will be ready for collection at the nearest branch.', status:'pending', color:'#A1A1A1' },
  ];
  return (
    <div>
      <SH title="Timelines" subtitle="Vertical event sequences for application tracking, audit logs, and process visualization." category="Component"/>

      <DCard title="Application Tracking">
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {events.map(({ date, time, title, desc, status, color }, i) => (
            <div key={i} style={{ display:'flex', gap:16, position:'relative' }}>
              {/* Line */}
              {i < events.length-1 && <div style={{ position:'absolute', left:19, top:38, width:2, height:'calc(100% + 0px)', background: status==='done' ? '#BBF7D0' : '#E5E5E5' }}/>}
              {/* Dot */}
              <div style={{ width:40, height:40, borderRadius:'50%', background: status==='done'?'#F0FDF4': status==='active'?'#EFF6FF':'#F5F5F5', border:`2px solid ${status==='done'?BRAND2:status==='active'?BLUE2:'#E5E5E5'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, zIndex:1 }}>
                {status==='done' ? <I2 n="check" size={15} color={BRAND2}/> : status==='active' ? <div style={{ width:10, height:10, borderRadius:'50%', background:BLUE2 }}/> : <div style={{ width:8, height:8, borderRadius:'50%', background:'#D4D4D4' }}/>}
              </div>
              {/* Content */}
              <div style={{ flex:1, paddingBottom:24 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                  <span style={{ fontSize:14, fontWeight:700, color: status==='pending'?'#A1A1A1':'#0A0A0A' }}>{title}</span>
                  {status==='active' && <span style={{ background:'#EFF6FF', color:BLUE2, border:'1px solid #BFDBFE', borderRadius:999, padding:'1px 8px', fontSize:10, fontWeight:700 }}>In Progress</span>}
                </div>
                <div style={{ fontSize:12, color:'#A1A1A1', marginBottom:6 }}>{date} · {time}</div>
                <p style={{ fontSize:13, color: status==='pending'?'#C4C4C4':'#737373', lineHeight:1.55, margin:0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DCard>

      <DCard title="Dark Mode Timeline" dark>
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {events.slice(0,3).map(({ date, title, desc, status }, i) => (
            <div key={i} style={{ display:'flex', gap:16, position:'relative' }}>
              {i < 2 && <div style={{ position:'absolute', left:19, top:38, width:2, height:'calc(100% + 0px)', background:'#2A2A2A' }}/>}
              <div style={{ width:40, height:40, borderRadius:'50%', background:status==='done'?'#052E16':status==='active'?'#1E3A8A':'#1A1A1A', border:`2px solid ${status==='done'?BRAND2:status==='active'?BLUE2:'#333'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, zIndex:1 }}>
                {status==='done' ? <I2 n="check" size={14} color="#4ADE80"/> : status==='active' ? <div style={{ width:10, height:10, borderRadius:'50%', background:BLUE2 }}/> : null}
              </div>
              <div style={{ flex:1, paddingBottom:20 }}>
                <div style={{ fontSize:14, fontWeight:600, color:'#E5E5E5', marginBottom:3 }}>{title}</div>
                <div style={{ fontSize:11, color:'#525252', marginBottom:5 }}>{date}</div>
                <p style={{ fontSize:13, color:'#737373', lineHeight:1.5, margin:0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DCard>

      <DCard title="Usage"><CB code={`<Timeline events={applicationSteps}\n  orientation="vertical"\n  showConnector\n  activeIndex={2}\n/>`}/></DCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// NUMBER INPUTS PAGE
// ════════════════════════════════════════════════════════════════
function NumberInputsPage() {
  const NumInput = ({ label, min=0, max=999, step=1, def=0, prefix, suffix, dark=false }) => {
    const [v, setV] = useState(def);
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
        {label && <label style={{ fontSize:13, fontWeight:500, color:dark?'#A1A1A1':'#525252' }}>{label}</label>}
        <div style={{ display:'flex', alignItems:'center', height:40, border:`1.5px solid ${dark?'#404040':'#E5E5E5'}`, borderRadius:8, overflow:'hidden', background:dark?'#141414':'#FFF' }}>
          {prefix && <span style={{ padding:'0 10px', fontSize:13, color:dark?'#737373':'#A1A1A1', background:dark?'#1A1A1A':'#FAFAFA', borderRight:`1px solid ${dark?'#333':'#E5E5E5'}`, height:'100%', display:'flex', alignItems:'center' }}>{prefix}</span>}
          <button onClick={()=>setV(n=>Math.max(min,n-step))} style={{ width:36, height:'100%', background:dark?'#1A1A1A':'#FAFAFA', border:'none', borderRight:`1px solid ${dark?'#333':'#E5E5E5'}`, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <I2 n="minus" size={14} color={dark?'#A1A1A1':'#525252'}/>
          </button>
          <input type="number" value={v} onChange={e=>setV(Math.min(max,Math.max(min,+e.target.value)))}
            style={{ flex:1, textAlign:'center', border:'none', outline:'none', fontSize:14, fontWeight:600, color:dark?'#FFF':'#0A0A0A', background:'transparent', fontFamily:'Inter Tight,sans-serif', minWidth:0 }}/>
          <button onClick={()=>setV(n=>Math.min(max,n+step))} style={{ width:36, height:'100%', background:dark?'#1A1A1A':'#FAFAFA', border:'none', borderLeft:`1px solid ${dark?'#333':'#E5E5E5'}`, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <I2 n="plus" size={14} color={dark?'#A1A1A1':'#525252'}/>
          </button>
          {suffix && <span style={{ padding:'0 10px', fontSize:13, color:dark?'#737373':'#A1A1A1', background:dark?'#1A1A1A':'#FAFAFA', borderLeft:`1px solid ${dark?'#333':'#E5E5E5'}`, height:'100%', display:'flex', alignItems:'center' }}>{suffix}</span>}
        </div>
      </div>
    );
  };
  return (
    <div>
      <SH title="Number Inputs" subtitle="Stepper controls for quantities, fees, and numeric form fields with increment/decrement buttons." category="Component"/>
      <DCard title="Default Variants">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <NumInput label="Number of Applicants" def={1} min={1} max={10}/>
          <NumInput label="Processing Fee (KWD)" def={5} min={0} max={500} step={5} suffix="KWD"/>
          <NumInput label="Documents Required" def={3} min={1} max={20}/>
          <NumInput label="Years of Residency" def={0} min={0} max={50} suffix="yrs"/>
        </div>
      </DCard>
      <DCard title="Dark Mode" dark>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <NumInput dark label="Quantity" def={1} min={0} max={99}/>
          <NumInput dark label="Amount (KWD)" def={50} min={0} max={9999} step={10} suffix="KWD"/>
        </div>
      </DCard>
      <DCard title="Usage"><CB code={`<NumberInput label="Applicants" min={1} max={10} step={1} />\n<NumberInput label="Fee (KWD)" min={0} max={500} step={5} suffix="KWD" />`}/></DCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// TAG INPUTS PAGE
// ════════════════════════════════════════════════════════════════
function TagInputsPage() {
  const [tags, setTags] = useState(['Kuwait City', 'Salmiya', 'Hawalli']);
  const [darkTags, setDarkTags] = useState(['Civil ID', 'Passport', 'Residency']);
  const [inp, setInp] = useState('');
  const [dInp, setDInp] = useState('');
  const addTag = (t, setT, v, setV) => { const trimmed=v.trim(); if(trimmed && !t.includes(trimmed)) setT([...t, trimmed]); setV(''); };
  const Tag = ({ label, onRemove, color='gray', dark=false }) => {
    const cfg = { gray:{bg:dark?'#262626':'#F5F5F5', c:dark?'#E5E5E5':'#525252', brd:dark?'#333':'#E5E5E5'}, blue:{bg:'#EFF6FF',c:'#1C64F2',brd:'#BFDBFE'}, green:{bg:'#F0FDF4',c:'#16A34A',brd:'#BBF7D0'} };
    const s = cfg[color]||cfg.gray;
    return (
      <span style={{ display:'inline-flex', alignItems:'center', gap:5, background:s.bg, color:s.c, border:`1px solid ${s.brd}`, borderRadius:6, padding:'3px 8px 3px 10px', fontSize:12, fontWeight:600 }}>
        {label}
        <button onClick={onRemove} style={{ background:'none', border:'none', cursor:'pointer', color:s.c, padding:0, display:'flex', lineHeight:1 }}><I2 n="x" size={11} color={s.c}/></button>
      </span>
    );
  };
  return (
    <div>
      <SH title="Tag Inputs" subtitle="Freeform multi-value tag fields for categories, locations, and filter selections." category="Component"/>
      <DCard title="Tag Input — Light">
        <div style={{ border:'1.5px solid #E5E5E5', borderRadius:8, padding:'8px 10px', background:'#FFF', display:'flex', flexWrap:'wrap', gap:6, alignItems:'center', minHeight:44, cursor:'text' }}>
          {tags.map(t => <Tag key={t} label={t} onRemove={()=>setTags(ts=>ts.filter(x=>x!==t))}/>)}
          <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'||e.key===',') { e.preventDefault(); addTag(tags,setTags,inp,setInp); }}} placeholder={tags.length===0?'Add locations…':''} style={{ border:'none', outline:'none', fontSize:13, fontFamily:'Inter Tight,sans-serif', minWidth:100, flex:1, color:'#0A0A0A', background:'transparent' }}/>
        </div>
        <p style={{ fontSize:11, color:'#A1A1A1', marginTop:6 }}>Press Enter or comma to add a tag</p>
      </DCard>
      <DCard title="Tag Input — Dark" dark>
        <div style={{ border:'1.5px solid #404040', borderRadius:8, padding:'8px 10px', background:'#141414', display:'flex', flexWrap:'wrap', gap:6, alignItems:'center', minHeight:44 }}>
          {darkTags.map(t => <Tag key={t} dark label={t} color="gray" onRemove={()=>setDarkTags(ts=>ts.filter(x=>x!==t))}/>)}
          <input value={dInp} onChange={e=>setDInp(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') { e.preventDefault(); addTag(darkTags,setDarkTags,dInp,setDInp); }}} placeholder="" style={{ border:'none', outline:'none', fontSize:13, fontFamily:'Inter Tight,sans-serif', minWidth:80, flex:1, color:'#FFF', background:'transparent' }}/>
        </div>
      </DCard>
      <DCard title="Preset Tag Categories">
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {['Ministry of Interior','Kuwait Municipality','Ministry of Finance','General Traffic','Ministry of Health','Ministry of Education','PACI','CITRA'].map(t => (
            <span key={t} style={{ background:'#EFF6FF', color:BLUE2, border:'1px solid #BFDBFE', borderRadius:6, padding:'4px 12px', fontSize:12, fontWeight:600, cursor:'pointer' }}>{t}</span>
          ))}
        </div>
      </DCard>
      <DCard title="Usage"><CB code={`<TagInput\n  tags={selectedLocations}\n  onChange={setSelectedLocations}\n  placeholder="Add location…"\n/>`}/></DCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// GALLERY PAGE
// ════════════════════════════════════════════════════════════════
function GalleryPage() {
  const [selected, setSelected] = useState(null);
  const govColors = ['#1C64F2','#006C35','#E02424','#9333EA','#E3A008','#0891B2','#BE185D','#525252','#006C35','#1C64F2','#E3A008','#9333EA'];
  const items = [
    { label:'National Assembly', sub:'Legislative Branch' },
    { label:'Kuwait Towers', sub:'National Monument' },
    { label:'Liberation Tower', sub:'Telecommunications' },
    { label:'Grand Mosque', sub:'Religious Site' },
    { label:'Scientific Center', sub:'Education' },
    { label:'Al-Hamra Tower', sub:'Business District' },
    { label:'Sief Palace', sub:'Government' },
    { label:'Kuwait Museum', sub:'Culture' },
    { label:'Failaka Island', sub:'Heritage' },
    { label:'Al-Shaheed Park', sub:'Recreation' },
    { label:'Marina Mall', sub:'Commerce' },
    { label:'Kuwait Airport', sub:'Transport' },
  ];
  return (
    <div>
      <SH title="Gallery" subtitle="Responsive image grid with lightbox overlay, hover states, and caption support." category="Component"/>

      <DCard title="3-Column Grid">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
          {items.map(({ label, sub }, i) => (
            <div key={label} onClick={()=>setSelected(i)} style={{ borderRadius:8, overflow:'hidden', cursor:'pointer', position:'relative', aspectRatio:'4/3', background:govColors[i], display:'flex', alignItems:'flex-end', transition:'transform 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.02)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <I2 n="img" size={32} color="rgba(255,255,255,0.3)"/>
              </div>
              <div style={{ width:'100%', background:'linear-gradient(transparent, rgba(0,0,0,0.65))', padding:'20px 10px 10px', position:'relative' }}>
                <div style={{ fontSize:12, fontWeight:700, color:'#FFF' }}>{label}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.7)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </DCard>

      {selected !== null && (
        <div onClick={()=>setSelected(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
          <div style={{ background:govColors[selected], width:560, aspectRatio:'16/9', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', flexDirection:'column', gap:12 }}>
            <I2 n="img" size={48} color="rgba(255,255,255,0.3)"/>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:18, fontWeight:700, color:'#FFF' }}>{items[selected].label}</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.7)' }}>{items[selected].sub}</div>
            </div>
            <button onClick={()=>setSelected(null)} style={{ position:'absolute', top:12, right:12, background:'rgba(0,0,0,0.4)', border:'none', borderRadius:'50%', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <I2 n="x" size={16} color="#FFF"/>
            </button>
            <div style={{ position:'absolute', bottom:12, right:12, display:'flex', gap:8 }}>
              <button onClick={e=>{e.stopPropagation();setSelected(s=>Math.max(0,s-1));}} style={{ width:32,height:32,borderRadius:'50%',background:'rgba(0,0,0,0.4)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}><I2 n="chevL" size={16} color="#FFF"/></button>
              <button onClick={e=>{e.stopPropagation();setSelected(s=>Math.min(items.length-1,s+1));}} style={{ width:32,height:32,borderRadius:'50%',background:'rgba(0,0,0,0.4)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}><I2 n="chevR" size={16} color="#FFF"/></button>
            </div>
          </div>
        </div>
      )}

      <DCard title="Usage"><CB code={`<Gallery\n  items={images}\n  columns={3}\n  lightbox\n  captions\n/>`}/></DCard>
    </div>
  );
}

// Export all pages to window
Object.assign(window, {
  CardsPage, AvatarsPage, ToastsPage, TablesPage,
  ProgressPage, FormControlsPage, ModalsPage,
  TimelinesPage, NumberInputsPage, TagInputsPage, GalleryPage,
});
