import { type CarouselApi } from '@/components/ui/carousel'
import { useEffect, useState, type ComponentPropsWithoutRef } from 'react'

import { textFromMode, type GenerationMode } from '../lib/type'
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
      <nav className="bg-black py-3 flex gap-2 overflow-scroll [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden px-4">
        {modes.map((v, i) => (
          <button
            className={`${current == i ? 'bg-point' : 'bg-black_2'} ${
              i == 0 ? 'border-[1px] border-dashed' : ''
            } p-2 rounded-[35px] font-semibold text-sm flex-shrink-0 `}
            disabled={current == i}
            onClick={() => api?.scrollTo(i)}
            key={i}
          >
            {textFromMode(v.mode)}
          </button>
        ))}
      </nav>
      <Carousel
        className="w-full my-[30px] px-4"
        opts={{ loop: true }}
        setApi={setApi}
      >
        <CarouselContent>
          {modes.map((v, i) => (
            <CarouselItem key={i}>
              <article className="bg-black px-5 py-[30px] rounded-[14px]">
                <h2 className="font-bold text-xl">{textFromMode(v.mode)}</h2>
                <p className="mt-1.5 h-[2em]">{v.description}</p>
                <img
                  className="w-[calc(100%-20px)] mx-auto mt-9 mb-4"
                  src={v.cover}
                  alt={`cover ${v.mode}`}
                />
                <a
                  href={`/numbers/${v.mode == 'self' ? 'create-self' : v.mode}`}
                >
                  <div className="text-black bg-white text-center w-full font-bold text-base py-[14px] rounded-[4px]">
                    {v.mode == 'self' ? '직접 뽑기' : '번호 뽑기'}
                  </div>
                </a>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </article>
  )
}

const modes: { mode: GenerationMode; description: string; cover: string }[] = [
  {
    mode: 'self',
    description: '6개의 모든 번호를 직접 뽑아 조합하는 방식이에요.',
    cover: '/cover-custom-pick.png',
  },
  {
    mode: 'random',
    description: '최대 6개 번호를 무작위로 랜덤 추첨합니다.',
    cover: '/cover-random-pick.png',
  },
  {
    mode: 'universe',
    description: '당첨번호와 선호 번호 생성 데이터에 기반한 추천 방식이에요.',
    cover: '/cover-universe-pick.png',
  },
  {
    mode: 'missing',
    description: '한달 간 추첨되지 않은 번호 조합이에요.',
    cover: '/cover-missing-pick.png',
  },
  {
    mode: 'odd-even',
    description: '짝수, 홀수 조합으로 추첨해드려요.',
    cover: '/cover-odd-even-pick.png',
  },
  {
    mode: 'winner-based',
    description: '1등 번호를 기반으로 추첨해드려요.',
    cover: '/cover-winner-pick.png',
  },
]
