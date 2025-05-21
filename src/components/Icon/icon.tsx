import * as React from 'react'
import { cn } from '@/lib/utils'

type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  component?: SVGIcon
  alt?: string
  size?: number | string
  className?: string
}

export const Icon: React.FC<IconProps> = ({
  src,
  component: SVGComponent,
  alt,
  size = 24,
  className,
  ...props
}) => {
  const dimension = typeof size === 'number' ? `${size}px` : size

  if (SVGComponent) {
    return (
      <SVGComponent
        width={dimension}
        height={dimension}
        className={cn('inline-block', className)}
        {...(props as React.SVGProps<SVGSVGElement>)}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={typeof size === 'number' ? size : undefined}
      height={typeof size === 'number' ? size : undefined}
      style={typeof size === 'string' ? { width: dimension, height: dimension } : undefined}
      className={cn('object-contain', className)}
      {...props}
    />
  )
}
