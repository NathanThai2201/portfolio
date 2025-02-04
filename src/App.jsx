import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { DashBored } from './pages/DashBored'
import { Home } from './pages/Home'

function App() {
  return (
      <Routes>
        {/*  For testing, use "http://localhost:3000/#/dashbored" */}
        <Route path="/dashbored" element={<DashBored />} />
        <Route path="/" element={<Home />} />
      </Routes>
  )
}

export default App

