import './Pieces.css'
import Piece from '../Pieces/Piece'
import { useState,useRef } from 'react'

const position = new Array(8).fill(' ').map(() => new Array(8).fill(' '))


const calculateCoordinates = (ref,e) => {
    const { left, top } = ref.current.getBoundingClientRect()
    const size = 650 / 8
    const x = Math.floor((e.clientX - left) / size)
    const y = 7 - Math.floor((e.clientY - top) / size)
    return { x, y }
}

const createPosition = () => {
    
    for (let i = 0; i < 8; i++) {
        position[1][i] = 'wp'
        position[6][i] = 'bp'
    }
    position[0][0] = 'wr'
    position[0][1] = 'wn'
    position[0][2] = 'wb'
    position[0][3] = 'wq'
    position[0][4] = 'wk'
    position[0][5] = 'wb'
    position[0][6] = 'wn'
    position[0][7] = 'wr'
    position[7][0] = 'br'
    position[7][1] = 'bn'
    position[7][2] = 'bb'
    position[7][3] = 'bq'
    position[7][4] = 'bk'
    position[7][5] = 'bb'
    position[7][6] = 'bn'
    position[7][7] = 'br'

    return position
}

const copyPosition = (position) => {
    const newPosition = new Array(8).fill(' ').map(() => new Array(8).fill(' '))
    for (let rank = 0; rank < 8; rank++)
        for (let file = 0; file < 8; file++) {
            newPosition[rank][file] = position[rank][file]
        }
    return newPosition
}
function Pieces() {

    const [state, setState] = useState(createPosition())
    const ref = useRef()
    const onDrop = (e) => {

        const newPosition = copyPosition(state)
        
        const { x, y } = calculateCoordinates(ref,e)

        const [piece, rank, file] = e.dataTransfer.getData('text').split(',');

        //contact backend to see if valid
        if (piece != ' ' && true) {
            newPosition[file][rank] = ' '
            newPosition[y][x] = piece
            setState(newPosition)
        }
       
    }

    const onDragOver = (e) => e.preventDefault();
    
    
    return (

        <div ref={ref} onDrop={onDrop} onDragOver={onDragOver} className="pieces">
            {state.map((r, rank) =>
                r.map((f, file) =>
                    <Piece key={rank + '-' + file} rank={rank} file={file} piece={state[rank][file]}/>
                ))}

      </div>
  );
}

export default Pieces;