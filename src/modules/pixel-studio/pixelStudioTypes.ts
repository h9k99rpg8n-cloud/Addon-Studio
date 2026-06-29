export type TextureSize = 16 | 32 | 64 | 128

export type PixelTool = 'brush' | 'eraser'

export type PixelTemplate = {
  id: string
  name: string
  category: 'block' | 'item' | 'entity' | 'particle'
  recommendedSize: TextureSize
  difficulty: 'easy' | 'medium' | 'advanced'
  description: string
  recommendation: string
}
