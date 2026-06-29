import type { AddonProject } from './projectTypes'

export function createAddonProject(input: Omit<AddonProject, 'id' | 'version'>): AddonProject {
  return {
    ...input,
    id: crypto.randomUUID(),
    version: '1.0.0',
  }
}
