import React, { useEffect, useState } from 'react';

function App() {
  const [socket, setSocket] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ws = new WebSocket('ws://https://test-unity-back.onrender.com:8080'); 
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPosition(data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket fechado');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMovement = (direction) => {
    if (socket) {
      socket.send(JSON.stringify({ action: 'move', direction }));
    }
  };

  return (
    <div>
      <h1>Movimento do Personagem</h1>
      <p>Status: {socket ? '✅ Conectado' : '❌ Desconectado'}</p>

      <div>
        <button onClick={() => sendMovement('up')} disabled={!socket}>↑</button>
        <button onClick={() => sendMovement('down')} disabled={!socket}>↓</button>
        <button onClick={() => sendMovement('left')} disabled={!socket}>←</button>
        <button onClick={() => sendMovement('right')} disabled={!socket}>→</button>
      </div>

      <div>
        <p>Posição do personagem: X: {position.x} Y: {position.y}</p>
      </div>
    </div>
  );
}

export default App;
// src/App.css