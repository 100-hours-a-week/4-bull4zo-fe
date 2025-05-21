declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
  const src: string
  export default src
}

declare module '*.svg?component' {
  import * as React from 'react'
  const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default Component
}

declare module '*.svg?react' {
  import * as React from 'react'
  const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default Component
}
