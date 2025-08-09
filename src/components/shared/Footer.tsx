import { ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constant'

export const Footer = () => {
  return (
    <footer className='bg-black text-white w-full'>
      <div className='w-full'>
        <Button
          variant='ghost'
          className='bg-gray-800 w-full rounded-none'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label='Back to top'
        >
          <ChevronUp className='w-4 h-4 mr-2' />
          Back to top
        </Button>
      </div>

      <nav className='p-4' aria-label='Footer navigation'>
        <ul className='flex justify-center gap-3 text-sm'>
          <li>
            <Link to='/pages/conditions-of-use' className='hover:underline'>
              Conditions of Use
            </Link>
          </li>
          <li>
            <Link to='/pages/privacy-policy' className='hover:underline'>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to='/pages/help' className='hover:underline'>
              Help
            </Link>
          </li>
        </ul>
      </nav>

      <div className='px-4 pb-6 text-center text-sm'>
        <p>&copy; {new Date().getFullYear()} {APP_NAME}</p>
        <p className='text-gray-400 mt-6'>
          9193, 2nd Floor, 5th Cross, Sector 1, HSR Layout, Bangalore - 560102
        </p>
      </div>
    </footer>
  )
}