import './App.css';
import Board from './components/Board/Board';


const handleCreate = () => {
    fetch('chess/initialize')
        .then(response => {
            if (response.ok) {
                console.log("Game state initialized successfully!");
            } else {
                throw new Error('Failed to initialize game state');
            }
        })
        .catch(error => {
            console.error('Error initializing game state:', error);
        });
};

function App() {

    handleCreate();
    return (
        <div className="app">
            <div id="container">
                <img src="/src/assets/icon.png" alt="icon" />
                <h1 id="title">CHESS</h1>
                <img src="/src/assets/icon.png" alt="icon" />
            </div>
            <Board />
        </div>
    );
    
   
}

export default App;