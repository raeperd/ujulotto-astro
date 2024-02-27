import type { GenerationMode } from './type'

export function generateNumbersForTimes(
  mode: GenerationMode,
  times: number,
): number[] {
  if (!mode) {
    return []
  }
  const numbers = []
  for (let i = 0; i < times; i++) {
    numbers.push(...generateNumbers(mode))
  }
  return numbers
}

export function generateNumbers(mode: GenerationMode) {
  switch (mode) {
    case '짝홀조합':
      return generateOddEvenNumbers()
    case '랜덤뽑기':
    case '직접조합':
    case '우주추천':
    case '미출현 번호':
    case '1등 번호기반':
      return generateRandomNumbers()
  }
}

function generateRandomNumbers() {
  return streamRandomNumbers()
    .filter((_, i) => i < 6)
    .sort((left, right) => left - right)
}

function generateOddEvenNumbers() {
  let oddLeft = 3
  let evenLeft = 3
  return streamRandomNumbers()
    .filter((v) => {
      if (oddLeft > 0 && v % 2 == 1) {
        oddLeft -= 1
        return true
      }
      if (evenLeft > 0 && v % 2 == 0) {
        evenLeft -= 1
        return true
      }
      if (oddLeft == 0 && evenLeft == 0) {
        return false
      }
    })
    .sort((left, right) => left - right)
}

function streamRandomNumbers() {
  return Array.from(Array(45), (_, i) => i + 1)
    .map((v) => ({ v: v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v: num }) => num)
}
