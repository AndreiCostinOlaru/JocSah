import './Pieces.css'
import Piece from '../Pieces/Piece'
import Modal from '../GameOverModal/Modal'
import { useState, useRef } from 'react'

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



function Pieces({ onPieceClick, resetHighlights }) {

    const [state, setState] = useState(createPosition())
    const [modal, setModal] = useState(false)
    const [winner, setWinner] = useState('')
    const [reason, setReason] = useState('')

    

    const checkGameOver = () => {
        fetch('chess/gameover')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                if (result != null) {
                    setModal(true)
                    setWinner(result.Winner == 1 ? "White" : "Black")
                    setReason(result.Reason == 0 ? "Checkmate" : "Stalemate")
                }
            })
            .catch(error => {
                console.error('Error fetching game result:', error);
            });
    };
    const ref = useRef()
    const onDrop = async (e) => {

        const { x, y } = calculateCoordinates(ref, e)

        try {

            const response = await fetch('/chess/move', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ row: 7-y, column: x })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            resetHighlights();
            setState(data);
            checkGameOver();
        }
        catch (error) {
            console.error('Error:', error);
        }
       
    }

    const onDragOver = (e) => e.preventDefault();

   

    const onDragStart = async (e) => {
        const { x, y } = calculateCoordinates(ref, e)
        console.log("yx drag", y, x)
        handlePieceClick(e, y, x)
    };


    const handlePieceClick = (e, rank, file) => {
        console.log("rf",rank,file)
        onPieceClick(e, rank, file);
    };
    
    
    return (
        <div ref={ref} onDrop={onDrop} onDragOver={onDragOver} onDragStart={onDragStart} className="pieces">
            {modal && <Modal winner={winner} reason={reason}/>}
            {state.map((r, rank) =>
                r.map((f, file) =>
                    <Piece key={rank + '-' + file} rank={rank} file={file} piece={state[rank][file]} onClick={handlePieceClick} />
                ))}

      </div>
  );
}

export default Pieces;