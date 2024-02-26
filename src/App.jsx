import React from 'react'
import ReactDOM from "react-dom/client"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from './Home'
import Show from "./Show"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}>  
        </Route>
        <Route path="/:id" element={<Show/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
