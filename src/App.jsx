
import { Routes } from 'react-router'
import './App.css'
import { Route } from 'react-router'
import Root from './Components/Root'
import Home from './Components/Home'
import Login from './Components/Login'

function App() {


  return (
    <>

    <Routes>

      <Route path='/' element={<Root></Root>}>
          <Route index element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
      </Route>

    </Routes>
      
    </>
  )
}

export default App
