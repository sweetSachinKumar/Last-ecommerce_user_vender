import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="text-3xl font-bold underline text-gray-700/80">
    Hello world! this is sachin
  </h1>
  <p className='text-xl leading-tight tracking-tighter text-slate-700 font-semibold'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, quis! Repellat porro illum soluta nemo, quidem, magni hic inventore non nulla mollitia cupiditate impedit voluptates corrupti possimus voluptatibus rerum amet.</p>
  </>
  )
}

export default App
