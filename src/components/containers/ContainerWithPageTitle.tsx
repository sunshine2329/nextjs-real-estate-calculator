import React from 'react'
import PageTitle, { TPageTitleProps } from '../titles/PageTitle'

const ContainerWithPageTitle = ({
  children,
  className,
  ...props
}: TPageTitleProps & { children: React.ReactNode; className?: string }) => {
  return (
    <div className={className}>
      <PageTitle {...props} />
      <hr className="mb-4" />
      {children}
    </div>
  )
}
export default ContainerWithPageTitle
