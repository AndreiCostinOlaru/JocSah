import Pieces from '../Pieces/Pieces'
import './Board.css'
import { useState} from 'react'

function Board() {
    const [position, setPosition] = useState('');

    const piecesToBoard = (data) => {
        setPosition(data);
    }
    const getClassName = (i, j) => {
        let c = 'tile'
       
        c += (i + j) % 2 === 0 ? ' tile--dark' : ' tile--light'
        //get something from backend
        if (position) {
            if (true) {
                if (position[i][j]) {
                    c += 'attacking'
                }
                else {
                    c += 'highlight'
                }
            }
        }
        return c
    }
    const ranks = Array(8).fill().map((x,i) => 7-i) 
    const files = Array(8).fill().map((x, i) => i)

    return (
        <div className="board">

            <div className="tiles">
                {ranks.map((rank, i) =>
                    files.map((file, j) =>
                        <div key={rank + "-" + file} className={getClassName(9-i, j)}></div>
                    )               
                )}
            </div>
            <Pieces piecesToBoard={piecesToBoard} />
            
      </div>
  );
}

export default Board;