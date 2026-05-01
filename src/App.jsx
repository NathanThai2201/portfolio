import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { DashBored } from './pages/DashBored'
import { RingTrainer} from './pages/RingTrainer'
import { Signup } from './pages/signup'
import { Login } from './pages/login'
import { OtherProjects } from './pages/OtherProjects'
import { Home } from './pages/Home'
import { VexCalculator } from './pages/VexCalculator'
import { WatchParty } from './pages/WatchParty' 
function App() {
  return (
      <Routes>
        {/*  For testing, use "http://localhost:3000/#/dashbored" */}
        <Route path="/dashbored" element={<DashBored />} />
        <Route path="/ringtrainer" element={<RingTrainer />} />
        <Route path="/otherprojects" element={<OtherProjects />} />
        <Route path="/vexcalculator" element={<VexCalculator />} />
        <Route path="/watchparty" element={<WatchParty />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
  )
}

export default App

