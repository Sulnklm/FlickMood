import React from "react"
import "./index.css";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import Home from "./components/pages/Home"
import Favorite from './components/pages/Favorite'
import MovieDetail from "./components/pages/MovieDetail";
import Search from "./components/pages/Search";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
