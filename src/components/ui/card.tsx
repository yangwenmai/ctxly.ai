import React from 'react'

type BaseProps = React.HTMLAttributes<HTMLDivElement>

export const Card: React.FC<BaseProps> = ({ className = '', ...props }) => (
  <div className={[
    'rounded-xl border border-gray-200 bg-white',
    className,
  ].join(' ')} {...props} />
)

export const CardContent: React.FC<BaseProps> = ({ className = '', ...props }) => (
  <div className={[
    'p-4',
    className,
  ].join(' ')} {...props} />
)

export default Card


