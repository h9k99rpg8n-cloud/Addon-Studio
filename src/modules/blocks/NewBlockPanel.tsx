import type { FormEvent } from 'react'
import type { AddonProject } from '../../core/project/projectTypes'
import { createStudioBlock } from './blockStore'
import type { StudioBlock } from './blockTypes'

type Props = {
  project: AddonProject
  block: StudioBlock | null
  onCreateBlock: (block: StudioBlock) => void
  onCreateTexture: () => void
}

export function NewBlockPanel({ project, block, onCreateBlock, onCreateTexture }: Props) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('blockName') ?? '')
    onCreateBlock(createStudioBlock(name, project.namespace))
  }

  return (
    <section className="studio-panel">
      <p className="eyebrow">Step 2</p>
      <h2>Create new block</h2>
      <p className="panel-copy">Project: {project.name}</p>

      <form className="studio-form compact" onSubmit={submit}>
        <label>
          Block name
          <input name="blockName" placeholder="Cartel Poppy" />
        </label>
        <button type="submit">Create block</button>
      </form>

      {block && (
        <div className="result-card">
          <p className="eyebrow">Current block</p>
          <h3>{block.name}</h3>
          <p>{block.identifier}</p>
          <p>Texture: {block.texture || 'pending'}</p>
          <button type="button" onClick={onCreateTexture}>{block.texture ? 'Update texture' : 'Create texture'}</button>
        </div>
      )}
    </section>
  )
}
