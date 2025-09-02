import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'bg-black text-white hover:bg-gray-900',
  outline: 'border border-gray-300 hover:bg-gray-50',
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  children,
  variant = 'default',
  size = 'md',
  asChild = false,
  ...props
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-md transition-colors',
    sizeClasses[size],
    variantClasses[variant],
    className,
  ].join(' ')

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, {
      className: [children.props.className, classes].filter(Boolean).join(' '),
    })
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button


