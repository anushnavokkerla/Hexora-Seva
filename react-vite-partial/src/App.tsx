import { Route, Routes } from 'react-router-dom'
import Toolbar from './components/Toolbar'
import Home from './pages/Home'
import Track from './pages/Track'
import { useApp } from './context'
// TODO next: Service, Apply, Phone, Offices, Admin, Privacy pages (routes below are reserved)
const Soon = () => <p className="card">Coming in the next part.</p>
export default function App() {
  const { t } = useApp()
  return (<>
    <Toolbar />
    <main className="max-w-4xl mx-auto p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track/:id?" element={<Track />} />
        {['service/:id', 'apply/:id', 'phone', 'offices', 'admin', 'privacy'].map(p => <Route key={p} path={p} element={<Soon />} />)}
      </Routes>
    </main>
    <footer className="text-center text-muted text-sm p-6">{t('Illustrative prototype. Not an official government service.|ఇది ఉదాహరణ నమూనా మాత్రమే. అధికారిక ప్రభుత్వ సేవ కాదు.')}</footer>
  </>)
}
