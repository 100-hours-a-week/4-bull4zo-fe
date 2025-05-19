export {}

declare global {
  interface Window {
    dataLayer: Record<string, any>[]
  }
}

export const trackEvent = (params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'cta_click',
      ...params,
    })
  }
}
