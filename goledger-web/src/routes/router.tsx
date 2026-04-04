import { Route, Routes } from 'react-router-dom'
import App from '../App'
import TvShowDetails from '../pages/tv-shows/TvShowDetails'
import Watchlist from '../pages/watchlist/Watchlist'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tv-shows/:id" element={<TvShowDetails />} />
      <Route path="/watchlist" element={<Watchlist />} />
    </Routes>
  )
}

export default Router