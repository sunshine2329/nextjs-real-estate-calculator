import React from 'react'
import classNames from 'classnames'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string
  className?: string
  label?: string
  error?: string
  required?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, label, error, id, required, ...rest } = props
  return (
    <div className={classNames('flex flex-col w-full mb-4', className)}>
      {label && (
        <label htmlFor={id} className={classNames('text-sm', { 'text-red-500': error })}>
          {label}
          {required && '*'}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border_gray-600"
        {...rest}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
