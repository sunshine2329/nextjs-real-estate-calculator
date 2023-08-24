import React from 'react'
import classNames from 'classnames'

export type TPageTitleProps = {
  className?: string
  title: string
}

const PageTitle: React.FC<TPageTitleProps> = ({ className, title }: TPageTitleProps) => {
  return (
    <cite>
      <h1 className={classNames('text-4xl font-bold mt-10 mb-6', className)}>{title}</h1>
    </cite>
  )
}

export default PageTitle
