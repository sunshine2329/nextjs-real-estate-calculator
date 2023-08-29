import Link from 'next/link'
import NavItem from './NavItem'
import useAuth from '@/context/useAuth'

const Header = () => {
  const { isAuthenticated } = useAuth()
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-10 mx-auto">
        <Link href={'/'}>
          <h1>Nextjs auth</h1>
        </Link>
        <div>
          <ul className="flex space-x-10">
            {!isAuthenticated && <NavItem label="Sign in" route="/signin" />}
            {!isAuthenticated && <NavItem label="Sign up" route="/signup" />}
            {isAuthenticated && <NavItem label="Calculator" route="/calculations" />}
            {isAuthenticated && <NavItem label="Profile" route="/profile" />}
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header
