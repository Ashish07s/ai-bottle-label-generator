// src/components/BottleSVG.jsx

const STYLE_PALETTES = {
  'Luxury':             [['#C9A84C','#0D0A00','#F5E6C0'],['#9A7832','#0D0D0D','#E8CC7A'],['#E8CC7A','#1A1200','#FFF8E1'],['#D4AF6A','#111','#C9A84C'],['#B8962E','#0A0A0A','#EDD97A']],
  'Minimal':            [['#E8E0D0','#1A1A1A','#888'],['#F0EBE0','#222','#BBB'],['#FFFFFF','#333','#AAA'],['#EAE5DB','#111','#999'],['#F5F0E8','#2A2A2A','#AAA']],
  'Wedding':            [['#F4D3D9','#3D1820','#E8A0AA'],['#FBE9EE','#2A0D15','#F0B8C2'],['#F9E0E6','#4A1F28','#DFA0AC'],['#FCEEF2','#350D17','#EBB0BC'],['#F7DCE2','#3A1A22','#E4A8B4']],
  'Modern':             [['#00C9FF','#050A10','#0080AA'],['#7B61FF','#08050F','#4A3AAA'],['#00FF87','#040F08','#00AA55'],['#FF6B35','#100805','#CC4422'],['#36D1DC','#030D10','#1A8A94']],
  'Hotel Premium':      [['#C9A84C','#0A0808','#8B0000'],['#B8860B','#0D0505','#960000'],['#DAA520','#0A0A0A','#8B0000'],['#CFB53B','#080808','#7B0000'],['#D4AF37','#0A0505','#900000']],
  'Traditional Indian': [['#FF6B1A','#1A0800','#CC3300'],['#CC0000','#1A0000','#FF9900'],['#9B1D1D','#150000','#D4830A'],['#E63000','#0F0500','#FF8800'],['#C41A00','#100000','#E8900A']],
}

const PATTERN_TYPES = ['grid','dots','cross','checker','diamond']

function renderPattern(type, accent, uid) {
  switch(type) {
    case 'dots':
      return <pattern id={`pat${uid}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1" fill={accent} opacity="0.3"/>
      </pattern>
    case 'cross':
      return <pattern id={`pat${uid}`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <path d="M0 0l12 12M12 0L0 12" stroke={accent} strokeWidth="0.4" opacity="0.25"/>
      </pattern>
    case 'checker':
      return <pattern id={`pat${uid}`} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="3" height="3" fill={accent} opacity="0.12"/>
      </pattern>
    case 'diamond':
      return <pattern id={`pat${uid}`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
        <polygon points="7,0 14,7 7,14 0,7" fill="none" stroke={accent} strokeWidth="0.4" opacity="0.3"/>
      </pattern>
    default: // grid
      return <pattern id={`pat${uid}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 4h8M4 0v8" stroke={accent} strokeWidth="0.3" opacity="0.4"/>
      </pattern>
  }
}

export default function BottleSVG({ style = 'Luxury', index = 0, brandName = 'Brand', eventName = '', tagline = '' }) {
  const palettes = STYLE_PALETTES[style] || STYLE_PALETTES['Luxury']
  const [accent, bg, secondary] = palettes[index % palettes.length]
  const patternType = PATTERN_TYPES[index % PATTERN_TYPES.length]
  const uid = `${index}`
  const label = (brandName || 'Brand').substring(0, 14).toUpperCase()
  const sub = (eventName || style).substring(0, 16)
  const tag = (tagline || '').substring(0, 20)

  return (
    <svg viewBox="0 0 140 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '144px', height: '288px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>
      <defs>
        {renderPattern(patternType, accent, uid)}
        <linearGradient id={`bbg${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={bg} stopOpacity="0.7"/>
          <stop offset="40%" stopColor={bg} stopOpacity="1"/>
          <stop offset="100%" stopColor={bg} stopOpacity="0.7"/>
        </linearGradient>
        <linearGradient id={`bsh${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)"/>
          <stop offset="35%" stopColor="rgba(255,255,255,0.18)"/>
          <stop offset="65%" stopColor="rgba(255,255,255,0)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.2)"/>
        </linearGradient>
        <linearGradient id={`bcap${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accent}/>
          <stop offset="100%" stopColor={accent} stopOpacity="0.5"/>
        </linearGradient>
      </defs>

      {/* Bottle body */}
      <path d="M44 60 C44 48 50 40 56 33 L56 16 L84 16 L84 33 C90 40 96 48 96 60 L96 258 C96 270 88 278 70 278 C52 278 44 270 44 258 Z"
        fill={`url(#bbg${uid})`} />
      <path d="M44 60 C44 48 50 40 56 33 L56 16 L84 16 L84 33 C90 40 96 48 96 60 L96 258 C96 270 88 278 70 278 C52 278 44 270 44 258 Z"
        fill={`url(#bsh${uid})`} />

      {/* Label background */}
      <rect x="47" y="95" width="46" height="130" rx="3" fill={accent} fillOpacity="0.1"/>
      <rect x="47" y="95" width="46" height="130" rx="3" fill={`url(#pat${uid})`}/>
      <rect x="47" y="95" width="46" height="130" rx="3" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.85"/>
      <rect x="50" y="99" width="40" height="122" rx="2" fill="none" stroke={accent} strokeWidth="0.35" opacity="0.5"/>

      {/* Top ornament */}
      <line x1="55" y1="108" x2="85" y2="108" stroke={accent} strokeWidth="0.5" opacity="0.65"/>
      <circle cx="70" cy="108" r="2.5" fill={accent} opacity="0.8"/>
      <circle cx="70" cy="108" r="1.2" fill={bg} opacity="0.9"/>

      {/* Brand name */}
      <text x="70" y="130" textAnchor="middle" fontFamily="serif" fontSize="7.5" fontWeight="700"
        fill={accent} letterSpacing="2.5" opacity="0.98">{label}</text>

      {/* Divider */}
      <text x="70" y="144" textAnchor="middle" fontFamily="serif" fontSize="7"
        fill={accent} opacity="0.7">{'— \u2726 —'}</text>

      {/* Event name */}
      <text x="70" y="160" textAnchor="middle" fontFamily="sans-serif" fontSize="5.5"
        fill={secondary} opacity="0.92" letterSpacing="0.5">{sub}</text>

      {/* Style indicator */}
      <text x="70" y="176" textAnchor="middle" fontFamily="sans-serif" fontSize="4"
        fill={accent} opacity="0.6" letterSpacing="2">{style.toUpperCase()}</text>

      {/* Tagline */}
      {tag ? (
        <text x="70" y="193" textAnchor="middle" fontFamily="serif" fontStyle="italic"
          fontSize="5" fill={secondary} opacity="0.7">{tag}</text>
      ) : null}

      {/* Bottom ornament */}
      <line x1="55" y1="210" x2="85" y2="210" stroke={accent} strokeWidth="0.5" opacity="0.65"/>
      <text x="70" y="216" textAnchor="middle" fontFamily="serif" fontSize="4" fill={accent} opacity="0.5">&#10022;</text>

      {/* Bottle cap */}
      <rect x="56" y="10" width="28" height="23" rx="3" fill={`url(#bcap${uid})`}/>
      <rect x="58" y="14" width="24" height="1.5" rx="0.75" fill="rgba(0,0,0,0.25)"/>
      <rect x="58" y="18" width="24" height="1.5" rx="0.75" fill="rgba(0,0,0,0.2)"/>
      <rect x="58" y="22" width="24" height="1.5" rx="0.75" fill="rgba(0,0,0,0.15)"/>

      {/* Shoulder shine */}
      <path d="M48 63 C48 54 52 47 57 40" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5"
        fill="none" strokeLinecap="round"/>
    </svg>
  )
}