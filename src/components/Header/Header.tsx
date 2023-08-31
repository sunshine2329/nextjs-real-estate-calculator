'use client'
import Link from 'next/link'
import NavItem from './NavItem'
import { useAuthState } from '@/providers/AuthProvider'

const Header = () => {
  const { authenticated } = useAuthState()
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-10 mx-auto">
        <Link href={'/'}>
          <h1>Nextjs auth</h1>
        </Link>
        <div>
          <ul className="flex space-x-10">
            {!authenticated && <NavItem label="Login" route="/login" />}
            {!authenticated && <NavItem label="Register" route="/register" />}
            {authenticated && <NavItem label="Reports" route="/reports" />}
            {authenticated && <NavItem label="Profile" route="/profile" />}
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header
