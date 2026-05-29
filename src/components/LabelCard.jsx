// src/components/LabelCard.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import BottleSVG from './BottleSVG'

export default function LabelCard({ design, index, formData, onRegenerate }) {
  const [regenLoading, setRegenLoading] = useState(false)

  const handleDownload = () => {
    const svgEl = document.getElementById(`bottle-svg-${index}`)
    if (!svgEl) return
    const svgData = new XMLSerializer().serializeToString(svgEl)
    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.brandName || 'label'}-design-${index + 1}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleRegen = async () => {
    setRegenLoading(true)
    await onRegenerate(index)
    setRegenLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card group hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Bottle visual area */}
      <div className="relative h-80 flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#1A1A1A 0%,#111 100%)' }}>
        {/* Pattern bg */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)', backgroundSize: '12px 12px' }} />

        {/* Design number badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase"
          style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C' }}>
          #{index + 1}
        </div>

        {/* Bottle */}
        <div id={`bottle-svg-${index}`}>
          <BottleSVG
            style={formData.style}
            index={index}
            brandName={formData.brandName}
            eventName={formData.eventName}
            tagline={formData.tagline}
          />
        </div>
      </div>

      {/* Card footer */}
      <div className="p-4">
        <h3 className="font-display text-base font-normal mb-1 leading-snug" style={{ color: '#F5F0E8' }}>
          {design.name}
        </h3>
        <p className="text-xs leading-relaxed mb-4" style={{ color: '#666' }}>
          {design.description}
        </p>

        {/* Palette dots */}
        {design.palette && (
          <div className="flex gap-1.5 mb-4">
            {design.palette.map((hex, i) => (
              <div key={i} className="w-4 h-4 rounded-full border border-white/10"
                style={{ background: hex }} title={hex} />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={handleDownload}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200"
            style={{ background: 'linear-gradient(135deg,#9A7832,#C9A84C)', color: '#0A0A0A', border: 'none' }}>
            ⬇ Download
          </button>
          <button onClick={handleRegen} disabled={regenLoading}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200"
            style={{ background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>
            {regenLoading ? '...' : '↻ Regen'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
