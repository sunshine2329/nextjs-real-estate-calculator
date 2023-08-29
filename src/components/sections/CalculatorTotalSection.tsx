import classNames from 'classnames'
import { NumericFormat } from 'react-number-format'

const CalculatorTotalSection = ({
  className,
  label,
  value,
  prefix,
  suffix
}: {
  className?: string
  label: string
  value: number
  prefix?: string
  suffix?: string
}) => {
  return (
    <div
      className={classNames(
        'flex  flex-nowrap justify-between mb-6 font-semibold text-red-600 px-2 space-x-4',
        className
      )}
    >
      <span className="whitespace-nowrap">{label}</span>
      <NumericFormat
        prefix={prefix}
        suffix={suffix}
        value={value}
        displayType="text"
        decimalScale={2}
        fixedDecimalScale
        thousandSeparator=","
      />
    </div>
  )
}

export default CalculatorTotalSection
