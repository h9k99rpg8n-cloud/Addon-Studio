import { useState } from 'react'
import { Blocks, Box, Bug, Download, FileCode2, PackagePlus, Sparkles } from 'lucide-react'
import type { AddonProject } from '../core/project/projectTypes'
import { NewProjectPanel } from '../modules/projects/NewProjectPanel'
import type { StudioBlock } from '../modules/blocks/blockTypes'
import { NewBlockPanel } from '../modules/blocks/NewBlockPanel'
import { PixelStudio } from '../modules/pixel-studio/PixelStudio'

const modules = [
  {
    name: 'Core Project System',
    status: 'Alpha 0.1',
    description: 'Creates projects, manages files and connects Behavior Pack with Resource Pack.',
    icon: PackagePlus,
  },
  {
    name: 'Block Studio',
    status: 'Alpha 0.1',
    description: 'Creates simple blocks with identifiers, textures, collision and generated JSON.',
    icon: Blocks,
  },
  {
    name: 'Item Studio',
    status: 'Alpha 0.1',
    description: 'Creates simple items with textures, stack sizes and generated JSON.',
    icon: Box,
  },
  {
    name: 'Test Lab',
    status: 'Alpha 0.1',
    description: 'Runs basic checks before export so broken files do not reach Minecraft.',
    icon: Bug,
  },
  {
    name: 'Export Center',
    status: 'Alpha 0.1',
    description: 'Packages projects into .mcaddon, .mcpack and future export formats.',
    icon: Download,
  },
  {
    name: 'Script Studio',
    status: 'Future',
    description: 'Advanced scripts, events, functions and creator automation.',
    icon: FileCode2,
  },
]

export function App() {
  const [project, setProject] = useState<AddonProject | null>(null)
  const [block, setBlock] = useState<StudioBlock | null>(null)
  const [showPixelStudio, setShowPixelStudio] = useState(false)

  function updateTexture(texture: string, pixels: string[], size: number) {
    setBlock((current) => current ? { ...current, texture, pixels, size } : current)
    setShowPixelStudio(false)
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-badge">
          <Sparkles size={18} />
          Modular Minecraft Bedrock Creator
        </div>
        <h1>Addon Studio</h1>
        <p>
          A professional modular suite for creating Minecraft Bedrock add-ons, worlds,
          resources and gameplay systems from one place.
        </p>
      </section>

      <section className="workflow-grid">
        {!project ? (
          <NewProjectPanel onCreateProject={setProject} />
        ) : (
          <NewBlockPanel
            block={block}
            onCreateBlock={setBlock}
            onCreateTexture={() => setShowPixelStudio(true)}
            project={project}
          />
        )}

        {block && showPixelStudio ? (
          <PixelStudio block={block} onUpdateTexture={updateTexture} />
        ) : null}
      </section>

      <section className="module-grid" aria-label="Addon Studio modules">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <article className="module-card" key={module.name}>
              <div className="module-icon"><Icon size={24} /></div>
              <div>
                <div className="module-header">
                  <h2>{module.name}</h2>
                  <span>{module.status}</span>
                </div>
                <p>{module.description}</p>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
