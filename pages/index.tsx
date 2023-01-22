import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { ThisState } from '../components/atoms/atoms'

const Home: NextPage = () => {
    const [showThis_, setShowThis_] = useRecoilState(ThisState);
    return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3x0RxMZbl6LRapAhKlegw6Xmp9rupr0g&libraries=places"></script>
      <main className="flex w-full h-full flex-col items-center justify-center text-center">
        <div className={`m-auto grid grid-cols-3 gap-4`}>
          {
            [0, 1, 2, 3, 4, 5].map((obj) => {
              return (
                <div className={`w-[350px] h-[200px] bg-white rounded-lg shadow-sm cursor-pointer`}
                onClick={() => {
                  setShowThis_('accom')
                }}
                key={obj}>

                </div>
              )
            })
          }
        </div>
      </main>
    </div>
  )
}

export default Home
