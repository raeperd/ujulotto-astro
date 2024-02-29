import { z } from 'astro/zod'

export const generationModeSchema = z.enum([
  'self',
  'random',
  'odd-even',
  'universe',
  'missing',
  'winner-based',
])

export const textFromMode = (mode: GenerationMode) => {
  switch (mode) {
    case 'self':
      return '직접조합'
    case 'random':
      return '랜덤뽑기'
    case 'odd-even':
      return '짝홀조합'
    case 'universe':
      return '우주추천'
    case 'missing':
      return '미출현 번호'
    case 'winner-based':
      return '1등 번호기반'
  }
}

export type GenerationMode = z.infer<typeof generationModeSchema>
