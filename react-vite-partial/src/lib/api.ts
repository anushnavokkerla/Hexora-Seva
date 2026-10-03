// ALL data access lives here. Talks to the FastAPI backend; falls back to sample data if it is offline.
const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'
const wait = (ms: number) => new Promise(r => setTimeout(r, ms))
export type AppRec = { svc: string; name: string; st: number }
const SAMPLE: Record<string, AppRec> = {
  'HX-2026-10482': { svc: 'income', name: 'Lakshmi', st: 1 },
  'HX-2026-22017': { svc: 'pension', name: 'Ramaiah', st: 2 },
  'HX-2026-33590': { svc: 'ration', name: 'Fatima', st: 3 },
}
export const sampleIds = Object.keys(SAMPLE)

export async function track(id: string): Promise<AppRec | null> {
  try { const r = await fetch(`${BASE}/applications/${id}`); return r.ok ? await r.json() : null }
  catch { await wait(400); return SAMPLE[id] ?? null }
}
export async function ocr() {
  try { return await (await fetch(`${BASE}/ocr`, { method: 'POST' })).json() }
  catch { await wait(300); return { name: 'Ravi Kumar', no: 'INC-82931', inc: '₹80,000', date: '12/08/2026' } }
}
export async function submitToGovAPI(d: { svc: string; name: string }): Promise<{ ok: boolean; id: string }> {
  try { return await (await fetch(`${BASE}/applications`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })).json() }
  catch { await wait(1500); const id = 'HX-2026-' + Math.floor(10000 + Math.random() * 89999); SAMPLE[id] = { ...d, st: 0 }; return { ok: true, id } }
}
