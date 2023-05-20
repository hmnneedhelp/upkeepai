import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Login from './Login'
import Register from './Register'
import MainPage from './MainPage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main >
      <MainPage />
      
    </main>
  )
}
