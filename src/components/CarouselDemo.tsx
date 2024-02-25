import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

export function CarouselDemo() {
  return (
    <Carousel
      className="w-full max-w-xs"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 9992000,
        }),
      ]}
    >
      <CarouselContent>
        {Array.from({ length: 2 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="bg-[url(/carousel-location.png)] bg-cover py-4 px-5 rounded-xl">
              <h2 className="text-lg font-semibold">복권 판매점 쉽게 찾기</h2>
              <p className="text-xs mt-1">전국 1등 판매점</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
