import { CONFIG } from '../config.js'
import { toast } from '../lib/fx.js'

// A link driven by CONFIG. If the URL isn't set yet it falls back to `fallback`
// (an in-page anchor) or, with no fallback, shows a "dropping soon" toast.
export default function NicheLink({ k, fallback, className, children }) {
  const url = CONFIG[k]
  if (url) {
    const external = /^https?:/.test(url)
    return (
      <a className={className} href={url} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}
      </a>
    )
  }
  if (fallback) return <a className={className} href={fallback}>{children}</a>
  return (
    <a className={className} href="#" onClick={(e) => { e.preventDefault(); toast('🐾 dropping soon. stay niche.') }}>
      {children}
    </a>
  )
}
