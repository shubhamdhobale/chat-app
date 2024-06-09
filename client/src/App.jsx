import { BrowserRouter , Route , Routes } from 'react-router-dom'
import { Register , Login , Chat } from './index.js'



export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Chat />} />

    </Routes>
    </BrowserRouter>
  )
}
