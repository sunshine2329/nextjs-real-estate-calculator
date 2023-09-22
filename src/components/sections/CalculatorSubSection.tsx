'use client'

import classNames from 'classnames'
const CalculatorSubSection = ({
  className,
  label,
  checked,
  onChange,
  children
}: {
  className?: string
  label: string
  checked: boolean
  onChange: (value: boolean) => void
  children?: React.ReactNode
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }
  return (
    <div className="">
      <div className="w-full mb-4">
        <label className="cursor-pointer label space-x-2">
          <span className="label-text">{label}</span>
          <input
            type="checkbox"
            className="toggle toggle-info"
            checked={checked}
            onChange={handleChange}
          />
        </label>
      </div>
      {children && <div className={classNames('pl-8', className)}>{children}</div>}
    </div>
  )
}
export default CalculatorSubSection
