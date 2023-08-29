import React from 'react'
import classNames from 'classnames'

export type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string
  className?: string
  label?: string
  labelClassName?: string
  inputClassName?: string
  error?: string
  required?: boolean
}

const Input = React.forwardRef<HTMLInputElement, TInputProps>((props, ref) => {
  const { className, label, error, id, required, labelClassName, inputClassName, ...rest } = props

  return (
    <div className={classNames('flex flex-col w-full', className)}>
      {label && (
        <label
          htmlFor={id}
          className={classNames('text-sm font-semibold', { 'text-red-500': error }, labelClassName)}
        >
          {label}
          {required && '*'}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={classNames(
          'p-2 border border-gray-300 rounded-lg focus:outline-none focus:border_gray-600',
          { 'border-red-500 focus:border_red_600': error },
          inputClassName
        )}
        {...rest}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
