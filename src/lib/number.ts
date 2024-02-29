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
    case 'odd-even':
      return generateOddEvenNumbers()
    case 'self':
    case 'random':
    case 'universe':
    case 'missing':
    case 'winner-based':
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
