import { type ComponentPropsWithoutRef } from 'react'

export default function NumberBall(props: NumberBallProps) {
  const { number, width, background, color, className, ...rest } = props
  const colorFromNumber = (num: number) => {
    if (num < 11) {
      return 'linear-gradient(143deg, #FFCD12 16.55%, #FFF2AB 71.22%)'
    }
    if (num < 21) {
      return 'linear-gradient(143deg, #5F88F1 16.55%, #9BB2FB 71.22%)'
    }
    if (num < 31) {
      return 'linear-gradient(143deg, #FF6969 16.55%, #FEB1B1 71.22%)'
    }
    if (num < 41) {
      return 'linear-gradient(143deg, #636262 16.55%, #949494 71.22%)'
    }
    return 'linear-gradient(143deg, #3CE038 16.55%, #9BFA98 70.85%)'
  }
  return (
    <div
      className={`${className} aspect-square rounded-full text-center leading-loose`}
      style={{
        width: width,
        fontSize: width / 2,
        background: background ?? colorFromNumber(number),
        color: color ?? 'black',
      }}
      {...rest}
    >
      {number}
    </div>
  )
}

export interface NumberBallProps extends ComponentPropsWithoutRef<'div'> {
  number: number
  width: number
  background?: string
  color?: string
}
