import { Link } from 'react-router-dom'
import { Contrast, Volume2, HelpCircle } from 'lucide-react'
import { useApp } from '../context'
export default function Toolbar() {
  const { lang, setLang, size, setSize, hc, setHc, t } = useApp()
  const speak = () => {
    if (!('speechSynthesis' in window)) return alert('Read-aloud is not supported in this browser.')
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(document.querySelector('main')?.innerText ?? '')
    u.lang = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' }[lang]; speechSynthesis.speak(u)
  }
  return (
    <div role="toolbar" aria-label="Accessibility tools" className="bar sticky top-0 z-10 flex flex-wrap items-center gap-2 bg-surface border-b border-slate-300 p-2 shadow">
      <Link to="/" className="mr-auto font-extrabold text-primary text-lg">Hexora Seva</Link>
      {([['en', 'English'], ['te', 'తెలుగు'], ['hi', 'हिन्दी']] as const).map(([c, n]) =>
        <button key={c} className="chip" aria-pressed={lang === c} onClick={() => setLang(c)}>{n}</button>)}
      <button className="chip" aria-label="Smaller text" onClick={() => setSize(Math.max(0, size - 1))}>A-</button>
      <button className="chip" aria-label="Normal text" onClick={() => setSize(1)}>A</button>
      <button className="chip" aria-label="Larger text" onClick={() => setSize(Math.min(2, size + 1))}>A+</button>
      <button className="chip" aria-pressed={hc} onClick={() => setHc(!hc)}><Contrast size={16} />{t('High contrast|హై కాంట్రాస్ట్|उच्च कंट्रास्ट')}</button>
      <button className="chip" onClick={speak}><Volume2 size={16} />{t('Read aloud|చదివి వినిపించు|सुनें')}</button>
      <Link to="/privacy" className="chip"><HelpCircle size={16} />{t('Help|సహాయం|मदद')}</Link>
    </div>)
}
