import React from "react"
import "./index.css";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './components/others/Layout'
import Home from "./components/pages/Home"
import Favorite from './components/pages/Favorite'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorite" element={<Favorite />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
