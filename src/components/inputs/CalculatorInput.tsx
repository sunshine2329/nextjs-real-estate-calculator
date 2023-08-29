import React from 'react'
import classNames from 'classnames'
import { NumericFormatProps, NumericFormat } from 'react-number-format'

export type TCalculatorInputProps = NumericFormatProps & {
  id?: string
  className?: string
  label?: string
  labelClassName?: string
  inputClassName?: string
  error?: string
  required?: boolean
  prefix?: string
  suffix?: string
}

const CalculatorInput = React.forwardRef<JSX.Element, TCalculatorInputProps>((props, ref) => {
  const {
    className,
    label,
    error,
    id,
    required,
    labelClassName,
    inputClassName,
    prefix,
    suffix,
    ...rest
  } = props
  return (
    <div className={classNames('flex flex-col w-full mb-4', className)}>
      {label && (
        <label
          htmlFor={id}
          className={classNames('text-sm font-semibold', { 'text-red-500': error }, labelClassName)}
        >
          {label}
          {required && '*'}
        </label>
      )}
      <NumericFormat
        id={id}
        getInputRef={ref}
        className={classNames(
          'p-2 border border-gray-300 rounded-lg focus:outline-none focus:border_gray-600 text-right',
          { 'border-red-500 focus:border_red_600': error },
          inputClassName
        )}
        // format={format}
        prefix={prefix}
        suffix={suffix}
        decimalScale={2}
        fixedDecimalScale
        thousandSeparator=","
        {...rest}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
})

CalculatorInput.displayName = 'CalculatorInput'

export default CalculatorInput
