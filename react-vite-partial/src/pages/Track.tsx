import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Check, Loader2 } from 'lucide-react'
import { useApp } from '../context'
import { AppRec, sampleIds, track } from '../lib/api'
import { SERVICES, STATUS, STATUS_MSG } from '../lib/data'
export default function Track() {
  const { id } = useParams(); const nav = useNavigate(); const { t } = useApp()
  const [v, setV] = useState(id ?? ''), [rec, setRec] = useState<AppRec | null>(null), [busy, setBusy] = useState(false)
  useEffect(() => { if (!id) { setRec(null); return } setBusy(true); track(id.toUpperCase()).then(r => { setRec(r); setBusy(false) }) }, [id])
  const svc = SERVICES.find(s => s.id === rec?.svc)
  return (<>
    <h1 className="text-2xl font-extrabold">{t('Track my application|నా దరఖాస్తును ట్రాక్ చేయండి')}</h1>
    <div className="card">
      <label htmlFor="t" className="font-semibold">{t('Application ID|దరఖాస్తు ID')}</label>
      <input id="t" className="input mt-1" value={v} placeholder="HX-2026-12345" onChange={e => setV(e.target.value)} onKeyDown={e => e.key === 'Enter' && nav(`/track/${v.trim()}`)} />
      <button className="btn btn-pri mt-3" onClick={() => nav(`/track/${v.trim()}`)}>{t('Check|చూడండి')}</button>
      <p className="text-muted mt-3">{t('Try an example:|ఉదాహరణ:')}</p>
      <div className="flex flex-wrap gap-2">{sampleIds.map(s => <button key={s} className="chip" onClick={() => nav(`/track/${s}`)}>{s}</button>)}</div>
    </div>
    {busy && <p className="flex gap-2"><Loader2 className="animate-spin" />…</p>}
    {id && !busy && !rec && <div className="card text-bad font-semibold" role="alert">{t('We could not find that ID. Please check and try again.|ఆ ID దొరకలేదు. సరిచూసి మళ్లీ ప్రయత్నించండి.')}</div>}
    {rec && <div className="card" aria-live="polite"><h2 className="font-bold text-xl mb-2">{svc && t(svc.name)} · {rec.name}</h2>
      {STATUS.map((s, i) => <div key={s} className="flex items-center gap-3 py-2"><span className={`w-9 h-9 rounded-full grid place-items-center font-bold ${rec.st >= i ? 'bg-ok text-white' : 'bg-slate-300'}`}>{rec.st >= i ? <Check size={18} /> : i + 1}</span><b>{t(s)}</b></div>)}
      <p className="text-lg font-semibold mt-2">{t(STATUS_MSG[rec.st])}</p></div>}
  </>)
}
