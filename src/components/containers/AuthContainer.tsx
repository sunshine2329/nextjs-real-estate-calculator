import React from 'react'
import classNames from 'classnames'

type ContainerProps = {
  className?: string
  title: string
  children: React.ReactNode
}

const AuthContainer: React.FC<ContainerProps> = (props: ContainerProps) => {
  const { className, title, children } = props
  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-start min-h-screen py-6 pt-32 mx-auto',
        className
      )}
    >
      <h1>{title}</h1>
      <hr className="mb-4" />
      {children}
    </div>
  )
}

export default AuthContainer
