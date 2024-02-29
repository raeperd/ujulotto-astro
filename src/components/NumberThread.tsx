import type { inferRouterOutputs } from '@trpc/server'
import type { ComponentPropsWithoutRef } from 'react'

import { reactClient } from '../lib/trpc/client'
import type { AppRouter } from '../lib/trpc/route'
import NumberBall from './NumberBall'
import TRPCProvider from './TRPCProvider'

export default function NumberPickThread(
  props: ComponentPropsWithoutRef<'article'>,
) {
  return (
    <TRPCProvider>
      <NumberPickThreadInner {...props} />
    </TRPCProvider>
  )
}

function NumberPickThreadInner({
  className,
  ...rest
}: ComponentPropsWithoutRef<'article'>) {
  const { data, isFetched } = reactClient.getAllNumbers.useQuery()

  return (
    <article
      className={`mt-4 ${className}`}
      {...rest}
    >
      <h2 className="font-semibold text-lg">실시간 우주 생성 번호</h2>
      {isFetched ? (
        <ol className="flex flex-col gap-2.5 mt-5">
          {data?.map((num) => (
            <NumberThreadItem
              key={num.id}
              {...num}
            />
          ))}
        </ol>
      ) : null}
    </article>
  )
}

type NumberThreadItemProps = inferRouterOutputs<AppRouter>['getAllNumbers'][0]

function NumberThreadItem(props: NumberThreadItemProps) {
  return (
    <li className="bg-[#373843] flex items-center justify-between rounded-[4px] py-3 px-5">
      <div>
        <p className="font-medium">{props.createdBy.slice(0, 8)}</p>
        <time className="text-xs">{formatDate(props.createdAt)}</time>
      </div>
      <div className="flex gap-1.5">
        {props.numbers
          .filter((_, i) => i < 6)
          .map((n) => (
            <NumberBall
              key={n}
              width={24}
              number={n}
            />
          ))}
      </div>
    </li>
  )
}

const formatDate = (d: string) => {
  const date = new Date(d)
  return (
    date.getFullYear().toString().slice(2, 4) +
    '.' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '.' +
    date.getDate().toString().padStart(2, '0')
  )
}
