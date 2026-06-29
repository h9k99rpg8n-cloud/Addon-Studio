import { useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { Brush, Check, Eraser, RotateCcw, Sparkles, Trash2 } from 'lucide-react'
import { pixelTemplates } from './pixelTemplates'
import type { PixelTemplate, PixelTool, TextureSize } from './pixelStudioTypes'
import './pixelStudio.css'

type PixelStudioProps = {
  onUpdateTexture?: (textureName: string, pixels: string[], size: number) => void
}

const textureSizes: TextureSize[] = [16, 32, 64, 128]

function createBlankPixels(size: TextureSize) {
  return Array<string | null>(size * size).fill(null)
}

function getPixelIndex(event: PointerEvent<HTMLCanvasElement>, size: TextureSize) {
  const canvas = event.currentTarget
  const rect = canvas.getBoundingClientRect()
  const x = Math.floor(((event.clientX - rect.left) / rect.width) * size)
  const y = Math.floor(((event.clientY - rect.top) / rect.height) * size)

  if (x < 0 || y < 0 || x >= size || y >= size) {
    return null
  }

  return y * size + x
}

export function PixelStudio({ onUpdateTexture }: PixelStudioProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [size, setSize] = useState<TextureSize>(32)
  const [tool, setTool] = useState<PixelTool>('brush')
  const [color, setColor] = useState('#38bdf8')
  const [pixels, setPixels] = useState<Array<string | null>>(() => createBlankPixels(32))
  const [selectedTemplateId, setSelectedTemplateId] = useState('detailed-block')
  const [isDrawing, setIsDrawing] = useState(false)

  const selectedTemplate = useMemo<PixelTemplate>(() => {
    return pixelTemplates.find((template) => template.id === selectedTemplateId) ?? pixelTemplates[0]
  }, [selectedTemplateId])

  useEffect(() => {
    const nextSize = selectedTemplate.recommendedSize
    setSize(nextSize)
    setPixels(createBlankPixels(nextSize))
  }, [selectedTemplate])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = size
    canvas.height = size

    const context = canvas.getContext('2d')
    if (!context) return

    context.clearRect(0, 0, size, size)

    pixels.forEach((pixelColor, index) => {
      if (!pixelColor) return
      const x = index % size
      const y = Math.floor(index / size)
      context.fillStyle = pixelColor
      context.fillRect(x, y, 1, 1)
    })

    context.strokeStyle = 'rgba(148, 163, 184, 0.28)'
    context.lineWidth = 0.03

    for (let line = 0; line <= size; line += 1) {
      context.beginPath()
      context.moveTo(line, 0)
      context.lineTo(line, size)
      context.stroke()

      context.beginPath()
      context.moveTo(0, line)
      context.lineTo(size, line)
      context.stroke()
    }
  }, [pixels, size])

  function paintPixel(event: PointerEvent<HTMLCanvasElement>) {
    const index = getPixelIndex(event, size)
    if (index === null) return

    setPixels((currentPixels) => {
      if (currentPixels[index] === color && tool === 'brush') return currentPixels
      if (currentPixels[index] === null && tool === 'eraser') return currentPixels

      const nextPixels = [...currentPixels]
      nextPixels[index] = tool === 'brush' ? color : null
      return nextPixels
    })
  }

  function handlePointerDown(event: PointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDrawing(true)
    paintPixel(event)
  }

  function handlePointerMove(event: PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return
    paintPixel(event)
  }

  function handlePointerUp(event: PointerEvent<HTMLCanvasElement>) {
    event.currentTarget.releasePointerCapture(event.pointerId)
    setIsDrawing(false)
  }

  function handleManualSizeChange(nextSize: TextureSize) {
    setSize(nextSize)
    setPixels(createBlankPixels(nextSize))
  }

  function clearCanvas() {
    setPixels(createBlankPixels(size))
  }

  function applyTexture() {
    onUpdateTexture?.('pixel_studio_texture', pixels.map((pixel) => pixel ?? 'transparent'), size)
  }

  const paintedPixels = pixels.filter(Boolean).length

  return (
    <section className="pixel-studio" aria-label="Pixel Studio texture engine">
      <header className="pixel-studio__header">
        <div>
          <p className="pixel-studio__eyebrow">Texture engine</p>
          <h2>Pixel Studio</h2>
          <p className="pixel-studio__subtitle">
            Create Minecraft Bedrock textures with smart templates, pixel tools and a mobile-friendly workspace.
          </p>
        </div>
        <span className="pixel-studio__badge">Alpha 0.1</span>
      </header>

      <div className="pixel-studio__layout">
        <aside className="pixel-studio__panel">
          <h3>Workspace</h3>

          <label className="pixel-studio__field">
            Template
            <select value={selectedTemplateId} onChange={(event) => setSelectedTemplateId(event.target.value)}>
              {pixelTemplates.map((template) => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </label>

          <label className="pixel-studio__field">
            Texture size
            <select value={size} onChange={(event) => handleManualSizeChange(Number(event.target.value) as TextureSize)}>
              {textureSizes.map((textureSize) => (
                <option key={textureSize} value={textureSize}>{textureSize}x{textureSize}</option>
              ))}
            </select>
          </label>

          <label className="pixel-studio__field">
            Color
            <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
          </label>

          <div className="pixel-studio__tools" aria-label="Pixel Studio tools">
            <button className={tool === 'brush' ? 'is-active' : ''} type="button" onClick={() => setTool('brush')}>
              <Brush size={16} /> Brush
            </button>
            <button className={tool === 'eraser' ? 'is-active' : ''} type="button" onClick={() => setTool('eraser')}>
              <Eraser size={16} /> Eraser
            </button>
          </div>

          <div className="pixel-studio__actions">
            <button type="button" className="secondary" onClick={clearCanvas}>
              <Trash2 size={16} /> Clear
            </button>
            <button type="button" className="secondary" onClick={() => handleManualSizeChange(size)}>
              <RotateCcw size={16} /> Reset
            </button>
            {onUpdateTexture ? (
              <button type="button" onClick={applyTexture}>
                <Check size={16} /> Apply
              </button>
            ) : null}
          </div>

          <article className="pixel-studio__template-card">
            <strong>{selectedTemplate.name}</strong>
            <p>{selectedTemplate.description}</p>
            <p><Sparkles size={14} /> {selectedTemplate.recommendation}</p>
          </article>
        </aside>

        <div className="pixel-studio__workspace">
          <div className="pixel-studio__canvas-wrap">
            <canvas
              ref={canvasRef}
              aria-label="Pixel texture canvas"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => setIsDrawing(false)}
            />
          </div>

          <div className="pixel-studio__status">
            <span>{size}x{size} workspace</span>
            <span>{paintedPixels} painted pixels</span>
            <span>{selectedTemplate.category} template</span>
            <span>{selectedTemplate.difficulty} difficulty</span>
          </div>
        </div>
      </div>
    </section>
  )
}
