import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'inverse' | 'outlineInverse'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'bg-stone-950 text-white hover:bg-stone-800',
  outline: 'border border-stone-300 text-stone-900 hover:bg-stone-100',
  inverse: 'bg-white text-stone-950 hover:bg-stone-200',
  outlineInverse: 'border border-white/20 text-white hover:bg-white/10',
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
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500',
    sizeClasses[size],
    variantClasses[variant],
    className,
  ].join(' ')

  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, {
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


