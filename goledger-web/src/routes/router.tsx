import { Route, Routes } from 'react-router-dom'
import App from '../App'
import TvShowDetails from '../pages/tv-shows/TvShowDetails'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tv-shows/:id" element={<TvShowDetails />} />
    </Routes>
  )
}

export default Router