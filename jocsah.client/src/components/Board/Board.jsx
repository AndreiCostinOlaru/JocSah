import './Board.css'
function Board() {

    const getClassName = (i, j) => {
        let c = 'tile'
        c += (i + j) % 2 === 0 ? ' tile--light' : ' tile--dark'
        return c
    }
    const ranks = Array(8).fill().map((x,i) => 8-i) // 8 7 6 ... 1
    const files = Array(8).fill().map((x, i) => String.fromCharCode(97 + i))// a b c ..h

    return (
      <div className="board">
            <div className="tiles">
                {ranks.map((rank, i) =>
                    files.map((file, j) =>
                        <div key={rank + "-" + file} className={getClassName(i, j)}>{rank}{file}</div>
                    )               
                )}
            </div>
      </div>
  );
}

export default Board;