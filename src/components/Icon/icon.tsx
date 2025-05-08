import * as React from 'react'
import { cn } from '@/lib/utils'

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  size?: number | string // size를 숫자(px) 또는 문자열(예: 2rem)로 받음
}

const Icon = ({ src, alt, size = 24, className, ...props }: IconProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={typeof size === 'number' ? size : undefined}
      height={typeof size === 'number' ? size : undefined}
      style={typeof size === 'string' ? { width: size, height: size } : undefined}
      className={cn('object-contain', className)}
      {...props}
    />
  )
}

export { Icon }
