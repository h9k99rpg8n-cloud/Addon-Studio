import { Blocks, Box, Bug, Download, FileCode2, PackagePlus, Sparkles } from 'lucide-react'

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
        <div className="hero-actions">
          <button type="button">Create Project</button>
          <button type="button" className="secondary">Open Test Lab</button>
        </div>
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
