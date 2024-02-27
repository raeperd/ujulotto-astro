import { type CarouselApi } from '@/components/ui/carousel'
import { useEffect, useState, type ComponentPropsWithoutRef } from 'react'

import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

export default function NumberPickCarousel(
  props: ComponentPropsWithoutRef<'article'>,
) {
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<CarouselApi>()
  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <article {...props}>
      <nav className="bg-black py-3 flex gap-2 overflow-scroll [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
        {modes.map((v, i) => (
          <button
            className={`${current == i ? 'bg-point' : 'bg-black_2'} ${
              i == 0 ? 'border-[1px] border-dashed' : ''
            } p-2 rounded-[35px] font-semibold text-sm flex-shrink-0 `}
            disabled={current == i}
            onClick={() => api?.scrollTo(i)}
            key={i}
          >
            {v.name}
          </button>
        ))}
      </nav>
      <Carousel
        className="w-full mt-[30px] px-4"
        opts={{ loop: true }}
        setApi={setApi}
      >
        <CarouselContent>
          {modes.map((v, i) => (
            <CarouselItem key={i}>
              <article className="bg-black px-5 py-[30px] rounded-[14px]">
                <h2 className="font-bold text-xl">{v.name}</h2>
                <p className="mt-1.5 h-[2em]">{v.description}</p>
                <img
                  className="w-[calc(100%-20px)] mx-auto mt-9"
                  src={v.cover}
                  alt={`cover ${v.name}`}
                />
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </article>
  )
}

const modes = [
  {
    name: '직접조합',
    description: '6개의 모든 번호를 직접 뽑아 조합하는 방식이에요.',
    cover: '/cover-custom-pick.png',
  },
  {
    name: '랜덤뽑기',
    description: '최대 6개 번호를 무작위로 랜덤 추첨합니다.',
    cover: '/cover-random-pick.png',
  },
  {
    name: '우주추천',
    description: '당첨번호와 선호 번호 생성 데이터에 기반한 추천 방식이에요.',
    cover: '/cover-universe-pick.png',
  },
  {
    name: '미출현 번호',
    description: '한달 간 추첨되지 않은 번호 조합이에요.',
    cover: '/cover-missing-pick.png',
  },
  {
    name: '짝홀조합',
    description: '짝수, 홀수 조합으로 추첨해드려요.',
    cover: '/cover-odd-even-pick.png',
  },
  {
    name: '1등 번호기반',
    description: '1등 번호를 기반으로 추첨해드려요.',
    cover: '/cover-winner-pick.png',
  },
]
