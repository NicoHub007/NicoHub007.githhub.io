import { Routes, Route } from 'react-router';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Forecast from './pages/Forecast';

import './App.css'

function App() {
  return (
    <>
    <Nav />
    <Routes>
      <Route path='/' element={<Home /> } />
      <Route path='/about' element={<About />} />
      <Route path='/forecast' element={<Forecast />} />
    </Routes>
    </>
  )
}

export default App
