import type { SVGProps } from 'react'
import { reactClient } from '../lib/trpc/client'
import TRPCProvider from './TRPCProvider'

export default function HelloUserBar() {
  return (
    <TRPCProvider>
      <HelloUserBarInner></HelloUserBarInner>
    </TRPCProvider>
  )
}

function HelloUserBarInner() {
  const { data, isLoading } = reactClient.getCurrentUser.useQuery()
  const loaded = !isLoading && data
  return (
    <div
      className={`flex items-center gap-2 mt-[30px] ${
        loaded ? 'justify-between' : ''
      }`}
      id="hello"
    >
      {loaded ? (
        <>
          <p>안녕하세요, {data.name}님</p>
          <a href="/settings">
            <IconSettings></IconSettings>
          </a>
        </>
      ) : (
        <>
          <a href="/login">로그인 해주세요</a>
          <IconLoginArrow></IconLoginArrow>
        </>
      )}
    </div>
  )
}

const IconLoginArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={16}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M.443 1.906a.953.953 0 0 1 .08-1.35.965.965 0 0 1 1.31.03l.047.05 6.021 6.738c.399.446.399 1.12 0 1.567l-6.02 6.738a.965.965 0 0 1-1.358.08.953.953 0 0 1-.124-1.298l.044-.053 5.352-5.99a.392.392 0 0 0 0-.522L.443 1.906Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          d="M0 0h9v16H0z"
        />
      </clipPath>
    </defs>
  </svg>
)

const IconSettings = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M10.328 7.951c-1.173 0-2.12.95-2.12 2.117 0 1.166.947 2.116 2.12 2.116 1.172 0 2.12-.95 2.12-2.116a2.118 2.118 0 0 0-2.12-2.117ZM6.66 10.068a3.667 3.667 0 1 1 7.335 0 3.667 3.667 0 0 1-7.335 0Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M6.844 1.725C6.844.772 7.642 0 8.625 0h3.192c.983 0 1.78.772 1.78 1.725v1.388c.37.15.727.323 1.068.518l1.074-.599c.85-.475 1.937-.192 2.43.63l1.593 2.668c.494.826.201 1.883-.652 2.359l-.436.243c-.05.028-.123.119-.101.27a7.19 7.19 0 0 1 .043 1.641c-.013.144.056.228.105.255l.39.218c.854.476 1.147 1.533.653 2.36l-1.594 2.666c-.492.823-1.579 1.105-2.43.63l-.604-.337c-.048-.026-.146-.04-.257.028-.417.255-.86.477-1.325.662-.133.053-.178.152-.178.21v.744c0 .953-.797 1.725-1.78 1.725H8.404c-.984 0-1.78-.772-1.78-1.725v-.912c0-.056-.04-.15-.164-.205a8.63 8.63 0 0 1-1.117-.61c-.112-.072-.214-.058-.263-.031l-.817.455c-.85.475-1.937.193-2.43-.63L.24 13.679c-.494-.826-.201-1.883.653-2.36l.768-.428c.047-.026.114-.107.106-.246A7.22 7.22 0 0 1 1.799 9.4c.017-.148-.053-.235-.103-.262L.894 8.69C.041 8.214-.252 7.157.242 6.33l1.594-2.667c.492-.823 1.579-1.105 2.43-.63l1.274.71a8.69 8.69 0 0 1 1.304-.649v-1.37ZM7.66 4.4a.77.77 0 0 1-.664-.332c.148.201.39.332.664.332Zm-1.398.654a.762.762 0 0 0 .037-.716.73.73 0 0 1-.037.716Zm6.516-.654a.83.83 0 0 0 .607-.26.775.775 0 0 1-.607.26ZM8.625 1.563a.165.165 0 0 0-.167.162v1.742a.775.775 0 0 1-.542.91 7.06 7.06 0 0 0-1.877.925.807.807 0 0 1-.969-.016l-1.61-.898a.17.17 0 0 0-.228.06L1.638 7.113a.16.16 0 0 0 .061.222l.802.447c.685.383.978 1.118.902 1.787a5.68 5.68 0 0 0-.026.984 1.801 1.801 0 0 1-.911 1.691l-.768.429a.16.16 0 0 0-.062.222l1.594 2.667a.17.17 0 0 0 .229.06l.816-.457c.647-.36 1.408-.272 1.963.086.286.185.589.35.906.494.617.28 1.092.884 1.092 1.62v.913c0 .09.075.162.168.162h3.192a.165.165 0 0 0 .167-.162v-.745c0-.771.52-1.393 1.178-1.655.378-.15.738-.33 1.076-.538.551-.337 1.293-.412 1.924-.06l.604.337a.17.17 0 0 0 .229-.059l1.594-2.667a.16.16 0 0 0-.062-.222l-.39-.218a1.802 1.802 0 0 1-.908-1.742 5.663 5.663 0 0 0-.034-1.295c-.096-.683.192-1.445.895-1.838l.436-.242a.16.16 0 0 0 .06-.222l-1.593-2.667a.17.17 0 0 0-.228-.06l-1.326.74a1.16 1.16 0 0 1-1.171-.029 7.095 7.095 0 0 0-1.533-.71.786.786 0 0 1-.53-.968V1.725a.165.165 0 0 0-.167-.162H8.625Z"
      clipRule="evenodd"
    />
  </svg>
)