import { useMemo, useState } from 'react'
import type { StudioBlock } from '../blocks/blockTypes'
import './pixelStudio.css'

type Tool = 'brush' | 'eraser'

type PixelStudioProps = {
  block: StudioBlock
  onUpdateTexture: (textureName: string, pixels: string[], size: number) => void
}

const sizes = [16, 32, 64, 128]

function createPixels(size: number) {
  return Array.from({ length: size * size }, () => 'transparent')
}

export function PixelStudio({ block, onUpdateTexture }: PixelStudioProps) {
  const [size, setSize] = useState(32)
  const [color, setColor] = useState('#38bdf8')
  const [tool, setTool] = useState<Tool>('brush')
  const [pixels, setPixels] = useState(() => createPixels(32))

  const textureName = useMemo(() => `${block.identifier.split(':')[1]}_texture.png`, [block.identifier])

  function changeSize(nextSize: number) {
    setSize(nextSize)
    setPixels(createPixels(nextSize))
  }

  function paint(index: number) {
    setPixels((current) => {
      const copy = [...current]
      copy[index] = tool === 'brush' ? color : 'transparent'
      return copy
    })
  }

  function clearCanvas() {
    setPixels(createPixels(size))
  }

  return (
    <section className="pixel-studio studio-panel">
      <p className="eyebrow">Pixel Studio</p>
      <h2>Create texture</h2>
      <p className="panel-copy">Editing texture for {block.name}</p>

      <div className="pixel-toolbar">
        <label>
          Size
          <select value={size} onChange={(event) => changeSize(Number(event.target.value))}>
            {sizes.map((option) => (
              <option key={option} value={option}>{option}x{option}</option>
            ))}
          </select>
        </label>

        <label>
          Color
          <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
        </label>

        <button type="button" className={tool === 'brush' ? 'active-tool' : ''} onClick={() => setTool('brush')}>Brush</button>
        <button type="button" className={tool === 'eraser' ? 'active-tool' : ''} onClick={() => setTool('eraser')}>Eraser</button>
        <button type="button" className="secondary" onClick={clearCanvas}>Clear</button>
      </div>

      <div className="pixel-canvas" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {pixels.map((pixel, index) => (
          <button
            aria-label={`Pixel ${index + 1}`}
            className="pixel-cell"
            key={index}
            onClick={() => paint(index)}
            style={{ background: pixel === 'transparent' ? undefined : pixel }}
            type="button"
          />
        ))}
      </div>

      <div className="texture-actions">
        <p>{textureName}</p>
        <button type="button" onClick={() => onUpdateTexture(textureName, pixels, size)}>Update texture</button>
      </div>
    </section>
  )
}
