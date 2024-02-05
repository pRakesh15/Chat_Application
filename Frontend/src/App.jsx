import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Chart from './components/Chart'
import Signup from './components/Signup'
import { ToastContainer } from 'react-toastify'

function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
      <Route  exact path="/" element={ <Home/>}/>
      <Route  exact path="/chart" element={ <Chart/>}/>
      <Route  exact path="/login" element={ <Home/>}/>
      <Route  exact path="/Signup" element={ <Signup/>}/>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
