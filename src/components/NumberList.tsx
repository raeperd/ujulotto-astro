import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState, type SVGProps } from 'react'
import { reactClient } from '../lib/trpc/client'
import { textFromMode, type GenerationMode } from '../lib/type'
import TRPCProvider from './TRPCProvider'
import { Checkbox } from './ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function NumberList() {
  return (
    <TRPCProvider>
      <NumberListInner></NumberListInner>
    </TRPCProvider>
  )
}

function NumberListInner() {
  const [toggle, setToggle] = useState(false)
  const [toggleDelete, setToggleDelete] = useState(false)
  const [idsToDelete, setIdsToDelete] = useState<number[]>([])
  const { data, refetch } = reactClient.getUserNumbers.useQuery()
  const { mutate: deleteNumbersByIds } =
    reactClient.deleteNumbersByIds.useMutation()

  const [parent] = useAutoAnimate({ duration: 100 })

  return (
    <article className={`${toggle ? 'opacity-60' : ''}`}>
      <h1 className="font-medium text-xl h-[50px] py-[15px]">{`번호저장함 ${
        data ? data.length : '0'
      }`}</h1>
      <DropdownMenu onOpenChange={(v) => setToggle(v)}>
        <DropdownMenuTrigger asChild>
          <button className="translate-x-[calc(100%-25px)] w-full">
            <IconSettings></IconSettings>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-center font-semibold">
          <DropdownMenuItem onSelect={() => setToggleDelete((v) => !v)}>
            선택 삭제하기
          </DropdownMenuItem>
          <DropdownMenuItem>전체삭제</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ol
        ref={parent}
        className="flex gap-2.5 flex-col w-full mt-5"
      >
        {data?.map((v, i) => (
          <li
            key={v.id}
            className={`${
              v.mode == 'universe'
                ? 'bg-[url(/cover-number-universe-item.svg)]'
                : 'bg-[url(/cover-number-item.svg)]'
            } relative cursor-pointer bg-cover bg-center rounded-[20px] bg-no-repeat pt-5 pb-10 pl-5`}
            onClick={() => (location.href = `/numbers/${v.id}`)}
          >
            <h2 className="font-semibold text-2xl">
              {textFromMode(v.mode as GenerationMode)}
            </h2>
            <time>{formatDate(v.createdAt)} 생성</time>
            {toggleDelete && (
              <Checkbox
                className="absolute top-2.5 right-2.5 data-[state=checked]:bg-point bg-white rounded-full w-6 h-6"
                onCheckedChange={(c) =>
                  setIdsToDelete((prev) => {
                    if (c) {
                      return [...prev, v.id]
                    }
                    return prev.filter((id) => id !== v.id)
                  })
                }
              />
            )}
          </li>
        ))}
      </ol>
      {idsToDelete.length > 0 && (
        <button
          onClick={() => {
            deleteNumbersByIds({ ids: idsToDelete })
            refetch()
          }}
          className="w-[calc(100%-32px)] lg:max-w-[calc(430px-32px)] fixed bottom-[90px] inset-x-0 mx-auto font-semibold rounded-[20px] py-[14px] bg-point"
        >{`삭제하기 (${idsToDelete.length})`}</button>
      )}
    </article>
  )
}

const formatDate = (date: string | null) => {
  let d = new Date()
  if (date) {
    d = new Date(date)
  }
  return `${d.getFullYear().toString().slice(2, 4)}년 ${
    d.getMonth() + 1
  }월 ${d.getDate()}일`
}

const IconSettings = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M16.2 0c2.088 0 3.78 1.737 3.78 3.88 0 2.144-1.692 3.88-3.78 3.88s-3.78-1.736-3.78-3.88C12.42 1.737 14.112 0 16.2 0Zm0 1.601c-1.226 0-2.22 1.02-2.22 2.28 0 1.258.994 2.278 2.22 2.278 1.226 0 2.22-1.02 2.22-2.279 0-1.258-.994-2.279-2.22-2.279Zm-4.026 1.047a4.42 4.42 0 0 0 0 2.465H1.2C.537 5.112 0 4.56 0 3.88 0 3.2.537 2.65 1.2 2.65l10.974-.001Zm8.052 0H22.8c.663 0 1.2.552 1.2 1.232 0 .68-.537 1.232-1.2 1.232l-2.574.001a4.418 4.418 0 0 0 0-2.465ZM7.2 9.239c2.088 0 3.78 1.737 3.78 3.88C10.98 15.264 9.288 17 7.2 17s-3.78-1.737-3.78-3.88S5.112 9.24 7.2 9.24Zm0 1.602c-1.226 0-2.22 1.02-2.22 2.279 0 1.258.994 2.279 2.22 2.279 1.226 0 2.22-1.02 2.22-2.28 0-1.258-.994-2.278-2.22-2.278Zm-4.026 1.046a4.418 4.418 0 0 0 0 2.465H1.2c-.663 0-1.2-.552-1.2-1.232 0-.68.537-1.232 1.2-1.232l1.974-.001Zm8.052 0H22.8c.663 0 1.2.552 1.2 1.233 0 .68-.537 1.231-1.2 1.231l-11.574.001a4.419 4.419 0 0 0 0-2.465Z"
      clipRule="evenodd"
    />
  </svg>
)
