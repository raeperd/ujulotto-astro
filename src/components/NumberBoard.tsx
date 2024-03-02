import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'
import { generateNumbersForTimes } from '../lib/number'
import { reactClient } from '../lib/trpc/client'
import { textFromMode, type GenerationMode } from '../lib/type'
import NumberBall from './NumberBall'
import TRPCProvider from './TRPCProvider'

export default function NumberBoard({
  mode,
  date,
  defaultNumbers,
}: {
  mode: GenerationMode
  date: string
  defaultNumbers: number[]
}) {
  return (
    <TRPCProvider>
      <NumberBoardInner
        mode={mode}
        date={date}
        defaultNumbers={defaultNumbers}
      />
    </TRPCProvider>
  )
}

export function NumberBoardById({ id }: { id: number }) {
  return (
    <TRPCProvider>
      <NumberBoardByIdInner id={id} />
    </TRPCProvider>
  )
}

function NumberBoardByIdInner({ id }: { id: number }) {
  const { data } = reactClient.getNumbersById.useQuery({ id })
  if (!data) {
    return <div>로딩중...</div>
  }
  return (
    <NumberBoard
      mode={data.mode as GenerationMode}
      date={format(data.createdAt)}
      defaultNumbers={data.numbers.split(',').map(Number)}
    />
  )
}

const format = (d: string | null) => {
  const date = new Date()
  if (d) {
    date.setTime(Date.parse(d))
  }
  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 생성`
}

function NumberBoardInner({
  mode,
  date,
  defaultNumbers,
}: {
  mode: GenerationMode
  date: string
  defaultNumbers: number[]
}) {
  const [numbers, setNumbers] = useState<number[]>(defaultNumbers)
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
      <article
        className={`w-full py-10 px-12 bg-gradient-to-r from-[#D6C3FF] from-[-5.85%] to-[#7C91FF] to-[80.85%] rounded-[20px] ${
          mode == 'universe'
            ? 'bg-[url(/cover-universe-pick-bg.png)] bg-cover'
            : ''
        }`}
      >
        <h1 className="text-white text-center font-semibold text-2xl">
          {textFromMode(mode)}
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
            handleClick: () => {
              if (mode == 'self') {
                location.href = `/numbers/create/self-board`
              } else {
                setNumbers([])
              }
            },
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
