import { useEffect, useState } from 'react'

export default function NotificationHeader() {
  const { timeStr, stopped } = useCountdown(nextPickDate())
  return (
    <header className="bg-point flex items-center justify-between rounded-[33px] px-4 py-2">
      <p className="flex gap-1 items-center">
        <IconClock></IconClock>
        <time>{timeStr}</time>
      </p>
      <IconBell></IconBell>
    </header>
  )
}

function IconClock() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0ZM9 16.2C5.02355 16.2 1.8 12.9764 1.8 9C1.8 5.02355 5.02355 1.8 9 1.8C12.9764 1.8 16.2 5.02355 16.2 9C16.2 10.9096 15.4414 12.7409 14.0912 14.0912C12.7409 15.4414 10.9096 16.2 9 16.2ZM12.6 10.188C12.4713 10.5708 12.1033 10.8211 11.7 10.8C11.6025 10.7976 11.5056 10.7824 11.412 10.755L8.712 9.855C8.34542 9.73118 8.099 9.38692 8.1 9V4.5C8.1 4.00294 8.50294 3.6 9 3.6C9.49706 3.6 9.9 4.00294 9.9 4.5V8.352L11.988 9.045C12.2234 9.11141 12.4216 9.27075 12.5371 9.48636C12.6525 9.70197 12.6752 9.95528 12.6 10.188Z"
        fill="white"
      />
    </svg>
  )
}

function IconBell() {
  return (
    <svg
      width="34"
      height="18"
      viewBox="0 0 34 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M30.1214 6.71065C29.945 6.53446 29.9629 6.26467 30.1614 6.10806C30.3512 5.95826 30.6374 5.96627 30.8163 6.12144L30.84 6.14351L33.8505 9.15065C34.0498 9.34982 34.0498 9.65067 33.8505 9.84984L30.84 12.857C30.6636 13.0332 30.3598 13.049 30.1614 12.8924C29.9715 12.7426 29.9469 12.4893 30.0995 12.3133L30.1214 12.2898L32.7974 9.61677C32.8639 9.55039 32.8639 9.4501 32.7974 9.38371L30.1214 6.71065Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.1214 6.71065C25.945 6.53446 25.9629 6.26467 26.1614 6.10806C26.3512 5.95826 26.6374 5.96627 26.8163 6.12144L26.84 6.14351L29.8505 9.15065C30.0498 9.34982 30.0498 9.65067 29.8505 9.84984L26.84 12.857C26.6636 13.0332 26.3598 13.049 26.1614 12.8924C25.9715 12.7426 25.9469 12.4893 26.0995 12.3133L26.1214 12.2898L28.7974 9.61677C28.8639 9.55039 28.8639 9.4501 28.7974 9.38371L26.1214 6.71065Z"
        fill="white"
      />
      <g clip-path="url(#clip0_205_1536)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9 0C13.0874 0 16.4009 3.31836 16.4009 7.41176L16.4006 12.7056L16.9427 12.7059C17.5266 12.7059 18 13.1799 18 13.7647C18 14.3495 17.5266 14.8235 16.9427 14.8235H12.1718C12.1718 16.5778 10.7517 18 9 18C7.24826 18 5.82819 16.5778 5.82819 14.8235H1.05727C0.473355 14.8235 0 14.3495 0 13.7647C0 13.1799 0.473355 12.7059 1.05727 12.7059L1.59891 12.7056L1.59912 7.41176C1.59912 3.31836 4.91261 0 9 0ZM10.0573 14.8235H7.94273C7.94273 15.4083 8.41609 15.8824 9 15.8824C9.58391 15.8824 10.0573 15.4083 10.0573 14.8235ZM9 2.11765C6.08043 2.11765 3.71366 4.4879 3.71366 7.41176V12.7059H14.2863V7.41176C14.2863 4.4879 11.9196 2.11765 9 2.11765Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_205_1536">
          <rect
            width="18"
            height="18"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

function useCountdown(targetDate: Date) {
  const targetDateTime = new Date(targetDate).getTime()

  const [countDown, setCountDown] = useState(
    targetDateTime - new Date().getTime(),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((countDown) => countDown - 1000)
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDateTime])

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

  const formatStr = `${days}일 ${hours}:${minutes
    ?.toString()
    .padStart(2, '0')}:${seconds?.toString().padStart(2, '0')}`

  return {
    timeStr: formatStr,
    stopped: seconds < 0,
  }
}

function nextPickDate() {
  const now = new Date()
  const nextPickDate = new Date(now)
  nextPickDate.setDate(now.getDate() + ((7 + 6 - now.getDay()) % 7))
  nextPickDate.setHours(20, 0, 0, 0)
  return nextPickDate
}
