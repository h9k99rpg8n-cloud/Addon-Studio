import type { StudioBlock } from './blockTypes'

export function createStudioBlock(name: string, namespace: string): StudioBlock {
  const safeName = name.trim() || 'New Block'
  const slug = safeName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'new_block'

  return {
    id: crypto.randomUUID(),
    name: safeName,
    identifier: `${namespace}:${slug}`,
    texture: null,
    pixels: null,
    size: null,
  }
}
