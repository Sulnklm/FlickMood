import React from "react"
import "./index.css";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './components/others/Layout'
import Home from "./components/pages/Home"
import About from './components/pages/About'
import Projects from "./components/pages/Projects";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
