
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {AuthProvide} from './context/AuthContext'
import ScrollToTop from './utils/ScrollToTop'


function App() {
  

  return (
    <>
    <AuthProvide>
    <ScrollToTop />
    <Navbar />
    <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
      <Outlet />
      </main>
    <Footer />
    </AuthProvide>
    </>
  )
}

export default App
