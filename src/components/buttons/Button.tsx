import classNames from 'classnames'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary' | 'secondary' | 'default' | 'selected'
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className,
  color = 'primary',
  children,
  loading = false,
  disabled,
  ...rest
}: ButtonProps) => {
  const btnClass =
    'relative flex items-center justify-center px-7 py-3 text-sm font-medium uppercase rounded transition duration-150 ease-in-out shadow-md hover:shadow-lg active:shadow-lg whitespace-nowrap'

  const primaryClass = 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
  const secondaryClass = 'bg-red-700 text-white hover:bg-red-800 active:bg-red-900'
  const defaultClass =
    'bg-white text-black hover:bg-gray-50 active:bg-gray-100 shadow hover:shadow-md active:shadow-md'
  const selectedClass = 'bg-slate-600 hover:bg-slate-700 active:bg-slate-800 text-white '
  return (
    <button
      type={type}
      className={classNames(
        btnClass,
        { [primaryClass]: color === 'primary' },
        { [secondaryClass]: color === 'secondary' },
        { [defaultClass]: color === 'default' },
        { [selectedClass]: color === 'selected' },
        className
      )}
      {...rest}
      disabled={disabled || loading}
    >
      {children}
      {loading && (
        <svg
          className="absolute animate-spin -ml-1 mr-3 h-5 w-5 text-white-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </button>
  )
}

export default Button
