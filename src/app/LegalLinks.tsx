import { useState } from 'react'

export default function LegalLinks() {
  const [open, setOpen] = useState(false)
  const [license, setLicense] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function showLicense() {
    setOpen(true); setError('')
    if (license) return
    try {
      const response = await fetch('/api/legal/license')
      if (!response.ok) throw new Error('许可证尚未生成，请使用完整发行构建。')
      setLicense(await response.text())
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)) }
  }

  async function downloadSource() {
    setBusy(true); setError('')
    try {
      const response = await fetch('/api/legal/source', { method: 'HEAD' })
      if (!response.ok) throw new Error('对应源码包尚未生成，请使用完整发行构建。')
      const link = document.createElement('a')
      link.href = '/api/legal/source'; link.download = 'JSR-corresponding-source.zip'
      document.body.appendChild(link); link.click(); link.remove()
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)); setOpen(true) }
    finally { setBusy(false) }
  }

  return <div className="legal-links">
    <button onClick={() => void showLicense()}>源码与许可证</button>
    <button disabled={busy} onClick={() => void downloadSource()}>{busy ? '正在下载…' : '下载对应源码'}</button>
    {open && <div className="dialog-backdrop"><section className="dialog legal-dialog" role="dialog" aria-modal="true" aria-labelledby="legal-title">
      <header><h2 id="legal-title">源码与许可证</h2><button aria-label="关闭" onClick={() => setOpen(false)}>×</button></header>
      <p>JSR 代码采用 AGPL-3.0-or-later，按现状提供，不提供任何担保。第三方组件保留各自许可；音频和用户内容的版权另行处理。</p>
      <p>桌面运行时包含 LGPL-2.1-or-later 的 FFmpeg，以及 Blink、libusb 等组件。对应源码包包含匹配版本、上游补丁、构建配置与替换说明，允许为调试修改后的库进行逆向工程。</p>
      <button className="button" disabled={busy} onClick={() => void downloadSource()}>{busy ? '正在下载…' : '下载当前版本对应源码'}</button>
      {error && <p role="alert">{error}</p>}
      <pre className="legal-license-text">{license || '正在读取许可证…'}</pre>
    </section></div>}
  </div>
}
