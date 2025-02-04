import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashBored } from './pages/DashBored'
import { Home } from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element = {<Home />}/>
        <Route path="/" element={<Home />} />
        <Route path="/dashbored" element={<DashBored />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
