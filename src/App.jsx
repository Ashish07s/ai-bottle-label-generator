// src/App.jsx
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LabelCard from './components/LabelCard'

const STYLES = [
  { id: 'Luxury', icon: '👑', desc: 'Opulent & refined' },
  { id: 'Minimal', icon: '◻', desc: 'Clean & modern' },
  { id: 'Wedding', icon: '🌸', desc: 'Romantic & soft' },
  { id: 'Modern', icon: '⬡', desc: 'Bold & vibrant' },
  { id: 'Hotel Premium', icon: '🏨', desc: 'Prestige & class' },
  { id: 'Traditional Indian', icon: '🪔', desc: 'Rich & cultural' },
]

const API_URL = '/api/generate'

export default function App() {
  const [form, setForm] = useState({
    brandName: '',
    eventName: '',
    themeColors: '',
    tagline: '',
    instructions: '',
    style: 'Luxury',
  })
  const [logoPreview, setLogoPreview] = useState(null)
  const [refPreview, setRefPreview] = useState(null)
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const resultsRef = useRef(null)

  const handleFile = (e, setter) => {
    const f = e.target.files[0]
    if (!f) return
    const r = new FileReader()
    r.onload = ev => setter(ev.target.result)
    r.readAsDataURL(f)
  }

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const generate = async () => {
    if (!form.brandName.trim()) {
      setError('Please enter your Brand Name to continue.')
      document.getElementById('brandName')?.focus()
      return
    }
    setError('')
    setLoading(true)
    setDesigns([])

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Generation failed')
      setDesigns(data.designs)
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const regenOne = async (idx) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, single: true, regenIndex: idx }),
      })
      const data = await res.json()
      if (data.success && data.designs?.[0]) {
        setDesigns(prev => {
          const next = [...prev]
          next[idx] = data.designs[0]
          return next
        })
      }
    } catch (e) {
      console.error('Regen failed:', e)
    }
  }

  return (
    <div className="relative min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Background effects */}
      <div className="noise-overlay" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 pb-20">

        {/* ── HERO ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-center pt-16 pb-12">
          <div className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-gold" style={{ background: '#C9A84C' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: '#C9A84C' }}>AI-Powered Design</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-5 tracking-tight">
            Generate Premium<br />
            <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Bottle Label</em> Designs
          </h1>

          <p className="text-base font-light max-w-md mx-auto leading-relaxed mb-8" style={{ color: '#666' }}>
            Transform your brand into stunning, professional bottle label mockups
            in seconds — powered by AI.
          </p>

          <div className="flex items-center gap-4 justify-center max-w-xs mx-auto">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,transparent,#9A7832)' }} />
            <span className="text-xs tracking-widest" style={{ color: '#C9A84C' }}>✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,#9A7832,transparent)' }} />
          </div>
        </motion.div>

        {/* ── STEP 1: BRAND DETAILS ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-xl font-light" style={{ color: '#E8CC7A' }}>Brand Details</span>
            <span className="text-xs tracking-widest uppercase" style={{ color: '#555' }}>— Step 01</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="gold-label" htmlFor="brandName">Brand Name *</label>
              <input id="brandName" className="gold-input" placeholder="e.g. Royal Palace Hotel"
                value={form.brandName} onChange={e => update('brandName', e.target.value)} />
            </div>
            <div>
              <label className="gold-label">Event / Product Name</label>
              <input className="gold-input" placeholder="e.g. Grand Wedding 2025"
                value={form.eventName} onChange={e => update('eventName', e.target.value)} />
            </div>
            <div>
              <label className="gold-label">Theme Colors</label>
              <input className="gold-input" placeholder="e.g. Gold, Ivory, Deep Navy"
                value={form.themeColors} onChange={e => update('themeColors', e.target.value)} />
            </div>
            <div>
              <label className="gold-label">Tagline (optional)</label>
              <input className="gold-input" placeholder="e.g. Crafted with elegance"
                value={form.tagline} onChange={e => update('tagline', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="gold-label">Special Instructions</label>
            <textarea className="gold-input" rows={3} style={{ resize: 'none', lineHeight: 1.7 }}
              placeholder="Any specific design notes, motifs, cultural elements, or requirements..."
              value={form.instructions} onChange={e => update('instructions', e.target.value)} />
          </div>
        </motion.div>

        {/* ── STEP 2: DESIGN STYLE ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-card p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-xl font-light" style={{ color: '#E8CC7A' }}>Design Style</span>
            <span className="text-xs tracking-widest uppercase" style={{ color: '#555' }}>— Step 02</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {STYLES.map(s => (
              <button key={s.id} onClick={() => update('style', s.id)}
                className="p-4 rounded-xl text-center transition-all duration-200 cursor-pointer"
                style={{
                  background: form.style === s.id ? 'rgba(201,168,76,0.1)' : '#1A1A1A',
                  border: `1px solid ${form.style === s.id ? '#C9A84C' : 'rgba(201,168,76,0.15)'}`,
                }}>
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-sm font-medium" style={{ color: form.style === s.id ? '#E8CC7A' : '#888' }}>{s.id}</div>
                <div className="text-xs mt-0.5" style={{ color: '#555' }}>{s.desc}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── STEP 3: ASSETS ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="glass-card p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-xl font-light" style={{ color: '#E8CC7A' }}>Upload Assets</span>
            <span className="text-xs tracking-widest uppercase" style={{ color: '#555' }}>— Step 03 (Optional)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Brand Logo', key: 'logo', setter: setLogoPreview, preview: logoPreview, hint: 'PNG, SVG or JPG' },
              { label: 'Reference Image', key: 'ref', setter: setRefPreview, preview: refPreview, hint: 'Existing label or inspiration' },
            ].map(u => (
              <div key={u.key}>
                <label className="gold-label">{u.label}</label>
                <label className="relative block cursor-pointer rounded-xl p-6 text-center transition-all duration-200"
                  style={{ background: '#1A1A1A', border: '1px dashed rgba(201,168,76,0.3)' }}>
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    onChange={e => handleFile(e, u.setter)} />
                  {u.preview
                    ? <img src={u.preview} className="max-h-20 mx-auto object-contain rounded" alt="preview" />
                    : <>
                        <div className="text-2xl mb-2" style={{ color: '#9A7832' }}>⬆</div>
                        <div className="text-sm font-medium mb-1" style={{ color: '#E8CC7A' }}>{u.label}</div>
                        <div className="text-xs" style={{ color: '#555' }}>{u.hint}</div>
                      </>
                  }
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── ERROR ── */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="rounded-xl p-4 mb-6 text-sm text-center"
              style={{ background: 'rgba(180,50,50,0.1)', border: '1px solid rgba(180,50,50,0.3)', color: '#e88' }}>
              ⚠ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── GENERATE BUTTON ── */}
        <button className="btn-primary mb-12" onClick={generate} disabled={loading}>
          {loading
            ? <span>✦ Crafting Your Designs…</span>
            : <><span className="shimmer" /><span>✦ Generate 5 Label Designs</span></>
          }
        </button>

        {/* ── LOADING STATE ── */}
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-16">
              <div className="w-12 h-12 rounded-full border-2 border-transparent mx-auto mb-5 animate-spin-slow"
                style={{ borderTopColor: '#C9A84C', borderRightColor: 'rgba(201,168,76,0.2)', borderBottomColor: 'rgba(201,168,76,0.2)', borderLeftColor: 'rgba(201,168,76,0.2)' }} />
              <div className="font-display text-2xl font-light mb-2" style={{ color: '#E8CC7A' }}>
                Crafting Your Designs
              </div>
              <div className="text-sm animate-pulse" style={{ color: '#555' }}>
                AI is generating 5 premium label concepts…
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RESULTS ── */}
        <AnimatePresence>
          {designs.length > 0 && !loading && (
            <motion.div ref={resultsRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="text-center mb-8">
                <h2 className="font-display text-4xl font-light mb-2">Your 5 Premium Designs</h2>
                <p className="text-sm" style={{ color: '#555' }}>
                  Download each concept · Share with your printer or designer
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {designs.map((d, i) => (
                  <LabelCard key={i} design={d} index={i} formData={form} onRegenerate={regenOne} />
                ))}
              </div>

              {/* Prompt tip */}
              <div className="mt-10 p-5 rounded-xl text-sm leading-relaxed" style={{ background: '#111', border: '1px solid rgba(201,168,76,0.15)', color: '#666' }}>
                <span style={{ color: '#C9A84C' }}>✦ Pro Tip:</span> Download the SVG files and share them with your label printer or graphic designer. Each file contains fully editable vector graphics.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FOOTER ── */}
        <div className="text-center pt-16 text-xs tracking-widest uppercase" style={{ color: '#333' }}>
          AI Bottle Label Generator · Premium Design Tool
        </div>
      </div>
    </div>
  )
}
