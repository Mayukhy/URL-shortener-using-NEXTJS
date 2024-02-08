
import { Inter } from 'next/font/google'
import './globals.css'
import AuthContext from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Providers} from '../redux/provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Url sorter",
  description: 'Advanced Url sorter',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      <AuthContext>
        {children} 
        </AuthContext>
        </Providers>
       </body>
    </html>
  )
}
