import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Mic, MapPin, Smartphone } from 'lucide-react'
import { useApp } from '../context'
import { SERVICES, matchService, SMS_NUMBER } from '../lib/data'
export default function Home() {
  const { t, lang } = useApp(); const nav = useNavigate()
  const [q, setQ] = useState(''), [msg, setMsg] = useState('')
  const go = (text = q) => { const m = matchService(text); m ? nav(`/service/${m.id}`) : setMsg('nomatch') }
  const mic = () => {
    const R = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!R) return setMsg('nomic')
    const r = new R(); r.lang = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' }[lang]
    r.onresult = (e: any) => { const s = e.results[0][0].transcript; setQ(s); go(s) }; r.start()
  }
  return (<>
    <section className="rounded-3xl bg-primary text-white p-6">
      <h1 className="text-3xl font-extrabold">{t("Tell us what you need. We'll guide you step by step.|మీకు ఏం కావాలో చెప్పండి. మేము అడుగడుగునా తోడుంటాం.|आपको क्या चाहिए, बताइए। हम कदम-कदम पर मदद करेंगे।")}</h1>
      <input className="input mt-4" value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === 'Enter' && go()}
        aria-label={t('What do you need?|మీకు ఏం కావాలి?|आपको क्या चाहिए?')} placeholder={t('e.g. income certificate|ఉదా: ఆదాయ ధృవీకరణ పత్రం')} />
      <div className="flex gap-2 mt-3">
        <button className="btn" onClick={() => go()}><Search />{t('Search|వెతుకు|खोजें')}</button>
        <button className="btn !bg-accent !border-accent !text-ink" onClick={mic}><Mic />{t('Speak|మాట్లాడండి|बोलें')}</button>
      </div>
      {msg === 'nomic' && <p className="mt-2">{t('Voice input is not supported here. Please type instead.|ఇక్కడ వాయిస్ పనిచేయదు. టైప్ చేయండి.')}</p>}
      {msg === 'nomatch' && <div className="mt-2" role="status"><p>{t("We couldn't find that. Did you mean...?|అది దొరకలేదు. మీరు ఇది అనుకున్నారా...?")}</p>
        <div className="flex flex-wrap gap-2 mt-2">{SERVICES.slice(0, 4).map(s => <Link key={s.id} className="chip" to={`/service/${s.id}`}>{t(s.name)}</Link>)}</div></div>}
    </section>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
      {SERVICES.map(s => <Link key={s.id} to={`/service/${s.id}`} className="card flex flex-col items-center gap-2 text-center font-semibold min-h-[130px] justify-center">
        <s.icon size={36} className="text-primary" aria-hidden />{t(s.name)}</Link>)}
    </div>
    <div className="card flex items-center gap-4"><MapPin className="text-primary" /><b className="flex-1">{t('Track my application|నా దరఖాస్తును ట్రాక్ చేయండి')}</b><Link className="btn btn-pri" to="/track">{t('Track|ట్రాక్')}</Link></div>
    <div className="card flex items-center gap-4"><Smartphone className="text-primary" /><div className="flex-1"><b>{t('No smartphone? Use a button phone|స్మార్ట్‌ఫోన్ లేదా? బటన్ ఫోన్ వాడండి')}</b><p className="text-muted text-sm">SMS {SMS_NUMBER} (sample)</p></div><Link className="btn btn-pri" to="/phone">{t('See how|చూడండి')}</Link></div>
  </>)
}
