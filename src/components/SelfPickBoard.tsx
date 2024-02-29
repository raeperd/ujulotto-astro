import { useState, type SVGProps } from 'react'
import type { NumberBallProps } from './NumberBall'
import NumberBall from './NumberBall'

export default function SelfPickBoard() {
  const [index, setIndex] = useState(0)
  const [numbers, setNumbers] = useState<number[][]>(
    Array.from({ length: 5 }, () => Array.from({ length: 6 }, () => 46)),
  )

  const sortedNumbers = numbers.map((row) =>
    [...row].sort((left, right) => left - right).slice(0, 6),
  )
  const rowLabels = ['A', 'B', 'C', 'D', 'E']
  return (
    <article>
      <div className="bg-white flex flex-col items-center pl-5 py-5 pr-4 rounded-[14px] gap-2.5">
        {rowLabels.map((label, i) => (
          <div
            className="flex items-center gap-3.5"
            key={i}
          >
            <button
              className="flex items-center gap-2.5"
              onClick={() => setIndex(i)}
            >
              <p
                className={`${
                  i == index
                    ? 'text-point font-bold'
                    : 'text-[#bcbdc1] font-medium'
                }`}
              >
                {label}
              </p>
              {sortedNumbers[i].map((number, j) => (
                <NumberBallOrEmpty
                  key={`${i}*${j}`}
                  number={number}
                  width={32}
                ></NumberBallOrEmpty>
              ))}
            </button>
            <button
              onClick={() =>
                setNumbers((prev) => {
                  const next = [...prev]
                  next[i] = Array.from({ length: 6 }, () => 46)
                  return next
                })
              }
              disabled={index != i}
            >
              <IconRefresh
                className={`${
                  index == i ? 'fill-[#474747]' : 'fill-[#f3f3f9]'
                }`}
              ></IconRefresh>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-2.5 relative bg-[#242429] px-5 pt-5 pb-[34px] rounded-[14px]">
        <div className=" grid grid-cols-7 gap-2">
          {Array.from({ length: 45 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const included = numbers[index].includes(i + 1)
                setNumbers((prev) => {
                  const next = [...prev]
                  next[index] = included
                    ? prev[index].filter((number) => number !== i + 1)
                    : [...prev[index], i + 1]
                  return next
                })
              }}
              disabled={
                numbers[index].length == 12 &&
                numbers[index].includes(i + 1) == false
              }
            >
              <NumberBall
                className="font-bold"
                width={34}
                number={i + 1}
                background={
                  numbers[index].includes(i + 1) ? 'white' : '#1b1c20'
                }
                color={numbers[index].includes(i + 1) ? '#1b1c20' : 'white'}
              ></NumberBall>
            </button>
          ))}
        </div>
        <div className="absolute flex gap-2.5 bottom-5 right-5">
          <button
            className="bg-[#474747] rounded-[4px] py-1.5 px-4"
            onClick={() => {
              setNumbers((prev) => {
                const next = [...prev]
                if (next[index].length == 12) {
                  next[index] = Array.from({ length: 6 }, () => 46)
                }
                next[index] = [
                  ...next[index],
                  ...Array.from(
                    { length: 12 - next[index].length },
                    () => Math.floor(Math.random() * 45) + 1,
                  ),
                ]
                return next
              })
              setIndex((prev) => (prev + 1) % 5)
            }}
          >
            자동
          </button>
          <button
            className={`flex items-center gap-3 bg-[#474747] rounded-[4px] py-1.5 px-4 ${
              numbers[index].length == 12 ? '' : 'opacity-40'
            }`}
            onClick={() => setIndex((prev) => (prev + 1) % rowLabels.length)}
            disabled={numbers[index].length != 12}
          >
            다음
            <IconNext></IconNext>
          </button>
        </div>
      </div>
    </article>
  )
}

function NumberBallOrEmpty(props: NumberBallProps) {
  const { number, ...rest } = props
  if (number === 46) {
    return (
      <div
        className="aspect-square rounded-full bg-[#d6d6d7] border border-dashed"
        style={{ width: rest.width }}
      ></div>
    )
  }
  return (
    <NumberBall
      number={number}
      {...rest}
    />
  )
}

const IconRefresh = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M7.97 0C12.405 0 16 3.582 16 8s-3.595 8-8.03 8a8.03 8.03 0 0 1-7.532-5.22.94.94 0 0 1 .558-1.21.946.946 0 0 1 1.214.555 6.142 6.142 0 0 0 5.76 3.993c3.391 0 6.14-2.74 6.14-6.118 0-3.379-2.749-6.118-6.14-6.118A6.136 6.136 0 0 0 3.12 4.25h2.077l.073.003c.488.037.871.443.871.938a.943.943 0 0 1-.877.94l-.067.001H2.662l-.11-.002a2.657 2.657 0 0 1-2.55-2.553L0 3.479V.955L.003.882A.943.943 0 0 1 .945.014c.499 0 .907.386.942.874l.002.067v1.82A8.027 8.027 0 0 1 7.97 0Z"
      clipRule="evenodd"
    />
  </svg>
)

const IconNext = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M.243 1.899c-.353-.322-.317-.816.08-1.102.38-.274.952-.26 1.31.025l.047.04L7.7 6.36c.4.364.4.914 0 1.278l-6.02 5.499c-.353.322-.96.351-1.357.065-.38-.274-.43-.737-.124-1.06l.044-.042 5.352-4.888a.278.278 0 0 0 0-.426L.243 1.899Z"
      clipRule="evenodd"
    />
  </svg>
)
