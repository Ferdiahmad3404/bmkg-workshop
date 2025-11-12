import { useState } from 'react'
import './App.css'

// Interface untuk props komponen Greeting
interface GreetingProps {
  name: string
}

// Komponen anak yang menerima props
function Greeting({ name }: GreetingProps) {
  return <h1>Hello, {name}!</h1>
}

function App() {
  // State untuk menyimpan nama
  const [name, setName] = useState('World')

  // Function untuk mengubah nama
  const changeName = () => {
    setName('React')
  }

  return (
    <div className="app">
      {/* Menggunakan komponen dengan props */}
      <Greeting name={name} />
      {/* Tombol yang memanggil function */}
      <button onClick={changeName}>Ubah Nama</button>
    </div>
  )
}

export default App
