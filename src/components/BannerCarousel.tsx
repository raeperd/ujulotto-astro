import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import type { ComponentPropsWithoutRef } from 'react'
import NumberBall from './NumberBall'

export default function BannerCarousel() {
  return (
    <Carousel
      className="w-full max-w-xs mt-5"
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent>
        {[LocationCarouselItem, WeeklyWinnerCarousel].map((Item, index) => (
          <Item key={index}>
            <CarouselPageNumber
              className="text-white"
              page={index + 1}
              lastPage={2}
            ></CarouselPageNumber>
          </Item>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

function LocationCarouselItem(props: ComponentPropsWithoutRef<'article'>) {
  return (
    <CarouselItem>
      <article className="relative bg-[url(/carousel-location.png)] bg-cover py-4 px-5 rounded-xl h-[90px]">
        <h2 className="text-lg font-semibold">복권 판매점 쉽게 찾기</h2>
        <p className="text-xs mt-1">전국 1등 판매점</p>
        {props.children}
      </article>
    </CarouselItem>
  )
}

function WeeklyWinnerCarousel(props: ComponentPropsWithoutRef<'article'>) {
  return (
    <CarouselItem>
      <article className="relative bg-[#e2e3ff] h-[90px] rounded-[14px] py-3 px-5 text-black">
        <h2 className="font-semibold  text-base">
          <p className="inline mr-1 bg-point text-white rounded-[14px] font-bold text-sm py-1 px-3">
            1089회
          </p>
          이번주 추첨 번호
        </h2>
        <div className="flex items-center gap-1.5 mt-2.5">
          {[1, 11, 22, 33, 44, 33].map((num, index) => (
            <NumberBall
              key={index}
              number={num}
              width={24}
            />
          ))}
          +
          <NumberBall
            number={44}
            width={24}
          ></NumberBall>
        </div>
        {props.children}
      </article>
    </CarouselItem>
  )
}

function CarouselPageNumber({
  className,
  page,
  lastPage,
}: {
  className?: string
  page: number
  lastPage: number
}) {
  return (
    <div
      className={`absolute bottom-[0.63rem] right-[1rem] rounded-[1.1875rem] bg-black bg-opacity-30 px-[0.62rem] py-[0.19rem] text-center text-[0.625rem] ${className}`}
    >
      {`${page} / ${lastPage}`}
    </div>
  )
}
