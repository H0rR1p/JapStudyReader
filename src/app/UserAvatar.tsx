import type { CurrentUser } from '../types'

export default function UserAvatar({ user, className = '' }: { user: CurrentUser; className?: string }) {
  const fallback = user.display_name.trim().slice(0, 1).toUpperCase() || 'U'
  const avatarUrl = user.avatar_url?.split(/[?#]/, 1)[0] === '/bingdu-logo.png' ? null : user.avatar_url
  return <span className={`user-avatar ${className}`.trim()} aria-hidden="true">
    {avatarUrl ? <img src={avatarUrl} alt="" /> : fallback}
  </span>
}
