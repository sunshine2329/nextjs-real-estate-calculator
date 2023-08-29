import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

export type TPageTitleProps = {
  className?: string
  title: string
  actions?: React.ReactNode
  toRedirect?: string
}

const PageTitle: React.FC<TPageTitleProps> = ({
  className,
  title,
  actions,
  toRedirect
}: TPageTitleProps) => {
  const renderTitle = () => <h1 className={classNames('text-4xl font-bold', className)}>{title}</h1>
  return (
    <cite className="flex justify-between mt-10 mb-6">
      {toRedirect && <Link href={toRedirect}>{renderTitle()}</Link>}
      {!toRedirect && renderTitle()}
      {actions}
    </cite>
  )
}

export default PageTitle
