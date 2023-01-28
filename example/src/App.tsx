import React, { useState } from 'react';
import { TextController } from '@Leandroswq/react-text-controller';

function App() {
  const [states, setStates] = useState([
    {
      key: 'header',
      value: 'Meu titulo',
      isActive: false,
    },
    {
      key: 'paragrafo',
      value: 'meu paragrafo',
      isActive: false,
    },
  ]);

  function sendSate() {
    console.log('Enviando para o servidor', states);
  }

  return (
    <div className="App">
      <TextController
        states={states}
        updateStates={setStates}
        sendButtonFunction={sendSate}
      />
      {states.map((state) => (
        <div key={state.key} style={state.isActive ?{
          border: '3px solid red',
          width: '30%',
          margin: '30px'
        }:
        {
          border: '3px solid black',
          width: '30%',
          margin: '30px'
        }
        }>
          <span>{state.key}</span>:
          <span style={{ color: 'red' }}>{state.value}</span>:
          <span>{state.isActive ? 'true' : 'false'}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
