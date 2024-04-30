import Pieces from '../Pieces/Pieces'
import './Board.css'
function Board() {

    const getClassName = (i, j) => {
        let c = 'tile'
        c += (i + j) % 2 === 0 ? ' tile--dark' : ' tile--light'
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
            <Pieces />
            
      </div>
  );
}

export default Board;