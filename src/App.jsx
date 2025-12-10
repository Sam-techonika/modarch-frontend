import './App.css'
import Home from './pages/Home'
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Layout from './pages/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProjectDetails from './pages/ProjectDetails'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="careers" element={<Careers />} />
            <Route path=":slug" element={<ProjectDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
