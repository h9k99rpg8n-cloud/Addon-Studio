import type { FormEvent } from 'react'
import { createAddonProject } from '../../core/project/projectStore'
import type { AddonProject } from '../../core/project/projectTypes'

type NewProjectPanelProps = {
  onCreateProject: (project: AddonProject) => void
}

export function NewProjectPanel({ onCreateProject }: NewProjectPanelProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    const name = String(form.get('name') ?? '').trim() || 'My Addon'
    const namespace = String(form.get('namespace') ?? '').trim() || 'studio'
    const author = String(form.get('author') ?? '').trim() || 'Addon Creator'
    const description = String(form.get('description') ?? '').trim() || 'Created with Addon Studio.'

    onCreateProject(createAddonProject({ name, namespace, author, description }))
  }

  return (
    <section className="studio-panel">
      <div>
        <p className="eyebrow">Step 1</p>
        <h2>Create new project</h2>
        <p className="panel-copy">Start a clean Minecraft Bedrock add-on project.</p>
      </div>

      <form className="studio-form" onSubmit={handleSubmit}>
        <label>
          Project name
          <input name="name" placeholder="Poppy Factory Addon" />
        </label>
        <label>
          Namespace
          <input name="namespace" placeholder="doctor" />
        </label>
        <label>
          Author
          <input name="author" placeholder="Doctor Gamer Studios" />
        </label>
        <label>
          Description
          <textarea name="description" placeholder="A Minecraft Bedrock add-on project." />
        </label>
        <button type="submit">Create project</button>
      </form>
    </section>
  )
}
