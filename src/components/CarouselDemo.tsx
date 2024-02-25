import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

export function CarouselDemo() {
  return (
    <Carousel
      className="w-full max-w-xs mt-5"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 9992000,
        }),
      ]}
    >
      <CarouselContent>
        {[LocationCarouselItem, WeeklyWinnerCarousel].map((Item, index) => (
          <Item key={index} />
        ))}
      </CarouselContent>
    </Carousel>
  )
}

function LocationCarouselItem() {
  return (
    <CarouselItem>
      <div className="bg-[url(/carousel-location.png)] bg-cover py-4 px-5 rounded-xl">
        <h2 className="text-lg font-semibold">복권 판매점 쉽게 찾기</h2>
        <p className="text-xs mt-1">전국 1등 판매점</p>
      </div>
    </CarouselItem>
  )
}

function WeeklyWinnerCarousel() {
  return (
    <CarouselItem>
      <div className="bg-[url(/carousel-location.png)] bg-cover py-4 px-5 rounded-xl">
        <h2 className="text-lg font-semibold">복권 판매점 쉽게 찾기</h2>
        <p className="text-xs mt-1">전국 1등 판매점</p>
      </div>
    </CarouselItem>
  )
}
