import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'
import { generateNumbersForTimes } from '../lib/number'
import { reactClient } from '../lib/trpc/client'
import type { GenerationMode } from '../lib/type'
import NumberBall from './NumberBall'
import TRPCProvider from './TRPCProvider'

export default function NumberBoard({
  mode,
  date,
}: {
  mode: GenerationMode
  date: string
}) {
  return (
    <TRPCProvider>
      <NumberBoardInner
        mode={mode}
        date={date}
      />
    </TRPCProvider>
  )
}

function NumberBoardInner({
  mode,
  date,
}: {
  mode: GenerationMode
  date: string
}) {
  const [numbers, setNumbers] = useState<number[]>([])
  const [parent] = useAutoAnimate({ duration: 100 })

  useEffect(() => {
    if (numbers.length == 6 * 5) {
      return
    }
    const interval = setTimeout(() => {
      setNumbers((prev) => [...prev, ...generateNumbersForTimes(mode, 1)])
    }, 200)
    return () => clearTimeout(interval)
  }, [mode, numbers])

  const { mutate: createUserNumbers } =
    reactClient.createUserNumbers.useMutation()

  return (
    <>
      <article className="w-full py-10 px-12 bg-gradient-to-r from-[#D6C3FF] from-[-5.85%] to-[#7C91FF] to-[80.85%] rounded-[20px]">
        <h1 className="text-white text-center font-semibold text-2xl">
          {mode}
        </h1>
        <p className="text-center mt-4">{date}</p>
        <div className="flex justify-center">
          <div
            className="grid grid-cols-6 items-center grid-flow-row-dense min-h-[280px] mt-10 max-w-[232px] content-evenly gap-2"
            ref={parent}
          >
            {numbers.map((number, index) => (
              <NumberBall
                key={index}
                number={number}
                width={32}
              ></NumberBall>
            ))}
          </div>
        </div>
      </article>
      <div className="flex flex-col gap-2.5 mt-2.5">
        {[
          {
            text: '다시뽑기',
            className: 'bg-gray_5',
            handleClick: () => setNumbers([]),
          },
          {
            text: '번호 저장하기',
            className: 'bg-point',
            handleClick: () => {
              createUserNumbers({ mode, numbers })
              alert('저장되었습니다.')
            },
          },
        ].map((item, index) => (
          <button
            className={`${item.className} w-full rounded-[20px] font-semibold py-4`}
            onClick={item.handleClick}
            key={index}
          >
            {item.text}
          </button>
        ))}
      </div>
    </>
  )
}
