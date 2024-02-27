import { z } from 'astro/zod'

export const generationModeSchema = z.enum([
  '직접조합',
  '랜덤뽑기',
  '짝홀조합',
  '우주추천',
  '미출현 번호',
  '1등 번호기반',
])

export type GenerationMode = z.infer<typeof generationModeSchema>
