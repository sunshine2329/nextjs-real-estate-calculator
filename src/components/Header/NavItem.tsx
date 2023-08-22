import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

type NavItemProps = {
  label: string
  route: string
}

const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  const { label, route } = props
  const pathname = usePathname()
  const isActive = useMemo(() => route === pathname, [route, pathname])
  return (
    <Link
      href={route}
      className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
        isActive ? 'border-b-red-500 text-black' : 'border-b-transparent text-gray-400'
      }`}
    >
      {label}
    </Link>
  )
}

export default NavItem
