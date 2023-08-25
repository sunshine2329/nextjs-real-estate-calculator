import React from 'react'
import PageTitle, { TPageTitleProps } from '../titles/PageTitle'
import classNames from 'classnames'

const ContainerWithPageTitle = ({
  children,
  className,
  ...props
}: TPageTitleProps & { children: React.ReactNode; className?: string }) => {
  return (
    <div className={classNames('my-10 mx-16', className)}>
      <PageTitle {...props} />
      <hr className="mb-4" />
      {children}
    </div>
  )
}
export default ContainerWithPageTitle
