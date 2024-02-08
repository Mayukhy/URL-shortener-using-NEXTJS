
import Sidebar from '@/components/sidebar/Sidebar';

export default async function FeedLayout({ children }) {
  return (

        <div className=' flex'>
          <Sidebar/>
        {children}
        </div>
  )
}
