import { useEffect, useState, type SVGProps } from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'
import { reactClient } from '../lib/trpc/client'
import TRPCProvider from './TRPCProvider'

export default function Location() {
  return (
    <TRPCProvider>
      <LocationInner />
    </TRPCProvider>
  )
}

function LocationInner() {
  useKakaoLoader({
    appkey: '1c538c1f9ccefa9045092b33a2a57122',
    libraries: ['services'],
  })

  const [query, setQuery] = useState('복권')
  const { location, error, refresh } = useGeoLocation()
  const [infoPlace, setInfoPlace] = useState(-1)
  const [center, setCenter] = useState(location)
  const { data: places } = reactClient.getPlaces.useQuery({
    query: query,
    longitude: location.longitude,
    latitude: location.latitude,
  })
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setCenter(location)
  }, [location])

  return (
    <>
      <main className="min-h-[calc(100vh - 4.375rem)] relative">
        <Map // 로드뷰를 표시할 Container
          center={{
            lng: center.longitude,
            lat: center.latitude,
          }}
          style={{
            width: '100%',
            height: 'calc(100vh)',
          }}
          isPanto={true}
          level={4}
        >
          <MapMarker
            image={{
              src: '/marker-current.svg',
              size: {
                width: 22.5,
                height: 22.5,
              },
            }}
            position={{
              lng: location.longitude,
              lat: location.latitude,
            }}
            onClick={() => setInfoPlace(-1)}
          ></MapMarker>
          {places?.documents.map((p, i) => (
            <MapMarker
              image={{
                src: '/marker.png',
                size: {
                  width: 43,
                  height: 54,
                },
              }}
              key={i}
              position={{
                lng: p.x,
                lat: p.y,
              }}
              onClick={() => {
                setCenter({ longitude: p.x, latitude: p.y })
                setInfoPlace(i)
              }}
            >
              {infoPlace === i && (
                <div className="h-[21px] w-[150px] rounded-[2.88rem] bg-point pt-[3px] text-center text-xs text-white">
                  {p.place_name}
                </div>
              )}
            </MapMarker>
          ))}
          <div className="absolute left-1/2 top-5 z-10 flex h-[3.625rem] w-[calc(100%-2rem)] -translate-x-1/2 transform items-center justify-between rounded-[2.25rem] bg-point px-5 py-4 font-semibold text-white">
            <input
              className="w-full border-transparent bg-point text-white placeholder:text-white focus:border-transparent focus:ring-0"
              placeholder="검색 위치에 있는 판매점을 찾아드려요"
              onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
            <a href={`https://map.kakao.com/link/search/${searchQuery} 복권`}>
              <SearchIcon></SearchIcon>
            </a>
          </div>
          {0 <= infoPlace && (
            <div className="w-[calc(100% - 2rem)] relative bottom-[12.75rem] z-10 mx-[1rem] flex justify-between rounded-[0.88rem] bg-black_2 px-[1.25rem] pb-[2.25rem] pt-[1.25rem] text-white">
              <div>
                <p className="font-semibold">
                  {places?.documents.at(infoPlace)?.place_name}
                </p>
                <p className="text-sm font-normal text-gray-300">
                  {places?.documents.at(infoPlace)?.address_name}
                </p>
              </div>
              <a
                href={`https://map.kakao.com/link/map/${
                  places?.documents.at(infoPlace)?.id
                }`}
              >
                <IconShare></IconShare>
              </a>
            </div>
          )}
        </Map>
      </main>
    </>
  )
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  }>({ latitude: 33.450701, longitude: 126.570667 })
  const [error, setError] = useState<string | null>(null)

  const refresh = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ latitude, longitude })
        },
        (error) => {
          setError(error.message)
        },
      )
    } else {
      setError('Geolocation is not supported by this browser')
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return { location, error, refresh }
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_1030_152)">
        <path
          d="M10.2998 2.45566C14.6141 2.45566 18.1297 5.95089 18.1297 10.2401C18.1297 14.5293 14.6141 18.0246 10.2998 18.0246C5.98559 18.0246 2.46998 14.5293 2.46998 10.2401C2.46998 5.95089 5.98559 2.45566 10.2998 2.45566ZM10.2998 0C4.61064 0 0 4.5839 0 10.2401C0 15.8963 4.61064 20.4802 10.2998 20.4802C15.989 20.4802 20.5997 15.8963 20.5997 10.2401C20.5997 4.5839 15.989 0 10.2998 0Z"
          fill="white"
        />
        <path
          d="M20.1506 18.4326C19.6683 17.9531 18.8863 17.9531 18.404 18.4326C17.9217 18.9121 17.9217 19.6895 18.404 20.169L21.8971 23.6418C22.3794 24.1213 23.1614 24.1213 23.6437 23.6418C24.126 23.1623 24.126 22.3849 23.6437 21.9054L20.1506 18.4326Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1030_152">
          <rect
            width="24"
            height="24"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

const IconShare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M5.125 1a.55.55 0 0 1 .041 1.098l-.041.002H3.75a1.65 1.65 0 0 0-1.649 1.588L2.1 3.75v5.5c0 .89.705 1.616 1.588 1.649l.062.001h5.5a1.65 1.65 0 0 0 1.649-1.588l.001-.062v-1.1a.55.55 0 0 1 1.098-.041L12 8.15v1.1a2.75 2.75 0 0 1-2.673 2.749L9.25 12h-5.5a2.75 2.75 0 0 1-2.749-2.673L1 9.25v-5.5a2.75 2.75 0 0 1 2.673-2.749L3.75 1h1.375Zm5.959.275c.34 0 .617.264.64.597l.001.044v3.207a.641.641 0 0 1-1.281.043l-.002-.043V3.462L7.05 6.86a.641.641 0 0 1-.91 0 .641.641 0 0 1-.035-.873l.035-.037 3.398-3.392h-1.66a.641.641 0 0 1-.044-1.282l.043-.001h3.207Z"
    />
  </svg>
)
