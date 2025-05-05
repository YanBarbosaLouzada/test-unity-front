import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const handleClick = async () => {
    try {
      const response = await axios.post('https://test-unity-back.onrender.com/api/cadastrar', {
        msg: 'Olá backend!'
      });
      console.log(response.data);
    } catch (err) {
      console.error('Erro ao enviar:', err);
    }
  };

  return <button onClick={handleClick}>Enviar para o backend</button>;

}

export default App
