import React from 'react';
import './App.css';
import Board from './components/Board/Board';


function App() {
    return (
        <div className="app">
            <h1 id="tabelLabel">Sah</h1>
            <Board/>
        </div>
    );
    
   
}

export default App;