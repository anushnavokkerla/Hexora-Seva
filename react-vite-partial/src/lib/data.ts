// Single data file. Strings use "English|తెలుగు|हिन्दी"; missing parts fall back to English.
import { IndianRupee, Wheat, Baby, Fingerprint, HeartHandshake, Users } from 'lucide-react'
export type Lang = 'en' | 'te' | 'hi'
const idx = { en: 0, te: 1, hi: 2 }
export const tr = (s: string, l: Lang) => { const p = s.split('|'); return p[idx[l]] || p[0] }

export const SERVICES = [
  { id: 'income', icon: IndianRupee, kw: ['income', 'salary', 'ఆదాయ', 'आय'], name: 'Income Certificate|ఆదాయ ధృవీకరణ పత్రం|आय प्रमाण पत्र' },
  { id: 'ration', icon: Wheat, kw: ['ration', 'food', 'రేషన్', 'राशन'], name: 'Ration Card|రేషన్ కార్డు|राशन कार्ड' },
  { id: 'birth', icon: Baby, kw: ['birth', 'baby', 'జనన', 'जन्म'], name: 'Birth Certificate|జనన ధృవీకరణ పత్రం|जन्म प्रमाण पत्र' },
  { id: 'aadhaar', icon: Fingerprint, kw: ['aadhaar', 'aadhar', 'ఆధార్', 'आधार'], name: 'Aadhaar Update|ఆధార్ అప్‌డేట్|आधार अपडेट' },
  { id: 'pension', icon: HeartHandshake, kw: ['pension', 'old age', 'పింఛ', 'పెన్షన్', 'पेंशन'], name: 'Old-Age Pension|వృద్ధాప్య పింఛన్|वृद्धावस्था पेंशन' },
  { id: 'caste', icon: Users, kw: ['caste', 'community', 'కుల', 'जाति'], name: 'Caste Certificate|కుల ధృవీకరణ పత్రం|जाति प्रमाण पत्र' },
]
export const matchService = (q: string) => { q = q.toLowerCase(); return SERVICES.find(s => s.kw.some(k => q.includes(k))) }
export const STATUS = ['Submitted|సమర్పించారు', 'Documents Verified|పత్రాలు సరిచూశారు', 'Under Review|పరిశీలనలో ఉంది', 'Approved|ఆమోదించారు']
export const STATUS_MSG = ['We received your application.|మీ దరఖాస్తు అందింది.', 'Your documents look good.|మీ పత్రాలు సరిగ్గా ఉన్నాయి.', 'An officer is checking your application.|అధికారి పరిశీలిస్తున్నారు.', 'Done! Collect your certificate.|పూర్తయింది! మీ పత్రాన్ని తీసుకోండి.']
export const SMS_NUMBER = '56161', MISSED_CALL = '1800-000-0161' // sample numbers
