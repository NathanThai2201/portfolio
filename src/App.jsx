import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { DashBored } from './pages/DashBored'
import { Signup } from './pages/signup'
import { Login } from './pages/login'
import { Home } from './pages/Home'

function App() {
  return (
      <Routes>
        {/*  For testing, use "http://localhost:3000/#/dashbored" */}
        <Route path="/dashbored" element={<DashBored />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
  )
}

export default App

