import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Lang, tr } from './lib/data'
type Ctx = { lang: Lang; setLang: (l: Lang) => void; size: number; setSize: (n: number) => void; hc: boolean; setHc: (b: boolean) => void; t: (s: string) => string }
const C = createContext<Ctx>(null as unknown as Ctx)
export const useApp = () => useContext(C)
export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en'), [size, setSize] = useState(1), [hc, setHc] = useState(false)
  useEffect(() => { const h = document.documentElement; h.lang = lang; h.dataset.z = String(size); h.dataset.hc = hc ? '1' : '0' }, [lang, size, hc])
  return <C.Provider value={{ lang, setLang, size, setSize, hc, setHc, t: s => tr(s, lang) }}>{children}</C.Provider>
}
